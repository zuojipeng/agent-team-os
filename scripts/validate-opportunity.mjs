import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const schema = JSON.parse(
  readFileSync(new URL('../schemas/hackathon-opportunity.schema.json', import.meta.url), 'utf8'),
);
const REQUIRED_FIELDS = schema.required;
const ALLOWED_FIELDS = new Set(Object.keys(schema.properties));
const ENUMS = Object.fromEntries(
  ['status', 'mode', 'allowed_preexisting_work', 'hard_filter', 'confidence'].map((field) => [
    field,
    schema.properties[field].enum ?? schema.properties[field].oneOf.find((option) => option.enum)?.enum,
  ]),
);
const STRING_ARRAY_FIELDS = [
  'languages',
  'eligibility',
  'tracks',
  'required_technology',
  'deliverables',
  'fit_assets',
  'evidence',
  'human_gates',
];
const CAMPAIGN_STATUSES = new Set(['shortlisted', 'approved', 'active', 'submitted']);

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isIsoDateTime(value) {
  return typeof value === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value));
}

function isHttpUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function validateOpportunity(value) {
  const errors = [];
  if (!isRecord(value)) return ['record must be a JSON object'];

  for (const field of REQUIRED_FIELDS) {
    if (!(field in value)) errors.push(`${field} is required`);
  }
  for (const field of Object.keys(value)) {
    if (!ALLOWED_FIELDS.has(field)) errors.push(`${field} is not allowed`);
  }

  for (const field of ['id', 'title', 'source', 'organizer']) {
    if (typeof value[field] !== 'string' || !value[field].trim()) errors.push(`${field} must be a non-empty string`);
  }

  if (!isHttpUrl(value.official_url)) errors.push('official_url must be an HTTP(S) URL');

  for (const [field, allowed] of Object.entries(ENUMS)) {
    if (field === 'mode' && value[field] === null) continue;
    if (!allowed.includes(value[field])) errors.push(`${field} must be one of: ${allowed.join(', ')}`);
  }

  if (!isIsoDateTime(value.discovered_at)) {
    errors.push('discovered_at must be an ISO-8601 date-time with timezone');
  }
  if (value.verified_at !== null && !isIsoDateTime(value.verified_at)) {
    errors.push('verified_at must be null or an ISO-8601 date-time with timezone');
  }
  if (value.status !== 'discovered' && !isIsoDateTime(value.verified_at)) {
    errors.push(`${value.status} opportunities require verified_at`);
  }
  if (value.status !== 'discovered' && value.mode === null) {
    errors.push(`${value.status} opportunities require mode`);
  }

  for (const field of ['registration_deadline_utc', 'submission_deadline_utc']) {
    if (value[field] !== null && !isIsoDateTime(value[field])) {
      errors.push(`${field} must be null or an ISO-8601 date-time with timezone`);
    }
  }

  if (value.location !== null && typeof value.location !== 'string') {
    errors.push('location must be a string or null');
  }
  for (const field of ['ip_and_license_summary', 'prize_and_network_value']) {
    if (typeof value[field] !== 'string') errors.push(`${field} must be a string`);
  }

  for (const field of STRING_ARRAY_FIELDS) {
    if (!Array.isArray(value[field]) || value[field].some((item) => typeof item !== 'string')) {
      errors.push(`${field} must be an array of strings`);
    }
  }
  if (Array.isArray(value.evidence) && value.evidence.length === 0) {
    errors.push('evidence must include at least one source or artifact');
  }
  if (Array.isArray(value.evidence) && value.evidence.some((item) => typeof item === 'string' && !item.trim())) {
    errors.push('evidence entries must be non-empty strings');
  }

  if (value.team_size !== null) {
    if (!isRecord(value.team_size)) {
      errors.push('team_size must be null or an object');
    } else {
      const { min, max } = value.team_size;
      if (!Number.isInteger(min) || min < 1 || !Number.isInteger(max) || max < 1) {
        errors.push('team_size min and max must be positive integers');
      } else if (min > max) {
        errors.push('team_size min cannot exceed max');
      }
    }
  }

  for (const field of ['estimated_cost', 'estimated_team_hours']) {
    if (value[field] !== null && (typeof value[field] !== 'number' || value[field] < 0)) {
      errors.push(`${field} must be null or a non-negative number`);
    }
  }

  if (value.hard_filter === 'pass') {
    if (typeof value.score !== 'number' || value.score < 0 || value.score > 100) {
      errors.push('score must be between 0 and 100 after hard_filter passes');
    }
  } else if (value.score !== null) {
    errors.push('score must remain null until hard_filter passes');
  }

  if (CAMPAIGN_STATUSES.has(value.status) && value.hard_filter !== 'pass') {
    errors.push(`${value.status} opportunities must pass hard_filter`);
  }

  return errors;
}

export async function validateOpportunityFile(filePath) {
  let value;
  try {
    value = JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    return [`cannot read valid JSON: ${error instanceof Error ? error.message : String(error)}`];
  }
  return validateOpportunity(value);
}

async function main(filePaths) {
  if (filePaths.length === 0) {
    console.error('Usage: node scripts/validate-opportunity.mjs <opportunity.json> [...]');
    process.exitCode = 2;
    return;
  }

  let failed = false;
  for (const filePath of filePaths) {
    const errors = await validateOpportunityFile(filePath);
    if (errors.length === 0) {
      console.log(`PASS ${filePath}`);
      continue;
    }

    failed = true;
    console.error(`FAIL ${filePath}`);
    for (const error of errors) console.error(`  - ${error}`);
  }
  if (failed) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
