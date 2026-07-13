import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SCHEMA_VERSION = 'team-os.opportunity-review.v1';
const FIELD_STATUSES = new Set(['accepted', 'conflicting', 'unresolved']);
const GATE_STATUSES = new Set(['approved', 'pending', 'rejected']);
const CRITICAL_FIELDS = [
  'submission_deadline_utc',
  'mode',
  'eligibility',
  'allowed_preexisting_work',
  'required_technology',
  'deliverables',
  'ip_and_license_summary',
];
const AUTHORIZATION_FIELDS = [
  'may_create_branch',
  'may_create_public_repository',
  'may_deploy_preview',
  'may_deploy_production',
  'may_use_paid_api',
  'may_register_event',
  'may_accept_terms',
  'may_submit_entry',
  'may_contact_people',
];

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateReviewDecision(value) {
  const errors = [];
  if (!isObject(value)) return ['review decision must be an object'];
  if (value.schema_version !== SCHEMA_VERSION) errors.push(`schema_version must be ${SCHEMA_VERSION}`);
  for (const field of ['opportunity_id', 'title', 'producer', 'reviewer', 'next_action']) {
    if (typeof value[field] !== 'string' || !value[field].trim()) errors.push(`${field} must be non-empty`);
  }
  if (!isHttpUrl(value.official_url)) errors.push('official_url must be HTTP(S)');
  if (typeof value.reviewed_at !== 'string' || !Number.isFinite(Date.parse(value.reviewed_at))) {
    errors.push('reviewed_at must be an ISO-8601 date-time');
  }
  if (!['go', 'conditional_go', 'watch', 'no_go'].includes(value.recommendation)) {
    errors.push('recommendation is invalid');
  }

  if (!isObject(value.field_decisions)) {
    errors.push('field_decisions must be an object');
  } else {
    for (const field of CRITICAL_FIELDS) {
      const decision = value.field_decisions[field];
      if (!isObject(decision)) {
        errors.push(`field_decisions.${field} is required`);
        continue;
      }
      if (!FIELD_STATUSES.has(decision.status)) errors.push(`field_decisions.${field}.status is invalid`);
      if (!Array.isArray(decision.evidence) || decision.evidence.length === 0 || decision.evidence.some((item) => !isHttpUrl(item))) {
        errors.push(`field_decisions.${field}.evidence must include official HTTP(S) URLs`);
      }
      if (typeof decision.note !== 'string') errors.push(`field_decisions.${field}.note must be a string`);
    }
  }

  if (!isObject(value.authorization)) {
    errors.push('authorization must be an object');
  } else {
    for (const field of AUTHORIZATION_FIELDS) {
      if (typeof value.authorization[field] !== 'boolean') errors.push(`authorization.${field} must be boolean`);
    }
    if (typeof value.authorization.max_external_spend !== 'number' || value.authorization.max_external_spend < 0) {
      errors.push('authorization.max_external_spend must be non-negative');
    }
  }

  if (!isObject(value.human_gates)) {
    errors.push('human_gates must be an object');
  } else {
    for (const field of ['participation', 'registration_terms', 'submission']) {
      if (!GATE_STATUSES.has(value.human_gates[field])) errors.push(`human_gates.${field} is invalid`);
    }
  }
  return errors;
}

export function deriveWorkspaceMode(decision) {
  const allCriticalAccepted = CRITICAL_FIELDS.every(
    (field) => decision.field_decisions?.[field]?.status === 'accepted',
  );
  return allCriticalAccepted && decision.human_gates?.participation === 'approved'
    ? 'campaign'
    : 'evaluation';
}

function fieldTable(decision) {
  return CRITICAL_FIELDS.map((field) => {
    const item = decision.field_decisions[field];
    return `| ${field} | ${item.status} | ${item.note || ''} | ${item.evidence.join('<br>')} |`;
  }).join('\n');
}

export async function createCampaignWorkspace(decision, outputDirectory) {
  const errors = validateReviewDecision(decision);
  if (errors.length) throw new Error(`invalid review decision: ${errors.join('; ')}`);
  const mode = deriveWorkspaceMode(decision);
  await mkdir(outputDirectory, { recursive: false });
  await mkdir(join(outputDirectory, 'docs'));

  const metadata = {
    schema_version: 'team-os.campaign-workspace.v1',
    mode,
    opportunity_id: decision.opportunity_id,
    title: decision.title,
    official_url: decision.official_url,
    recommendation: decision.recommendation,
    created_at: new Date().toISOString(),
    human_gates: decision.human_gates,
    authorization: decision.authorization,
    source_review: 'review-decision.json',
  };
  const readme = `# ${decision.title}\n\nWorkspace mode: **${mode}**\n\nOfficial event: ${decision.official_url}\n\n${mode === 'evaluation'
    ? 'This workspace may evaluate feasibility only. It does not authorize registration, terms acceptance, spend, publication, or submission.'
    : 'Participation was approved. Every account-bound or public action must still follow the recorded authorization envelope and remaining human gates.'}\n\nNext action: ${decision.next_action}\n`;
  const rules = `# Rules Review\n\nProducer: ${decision.producer}\nReviewer: ${decision.reviewer}\nReviewed: ${decision.reviewed_at}\n\n| Field | Decision | Note | Evidence |\n| --- | --- | --- | --- |\n${fieldTable(decision)}\n`;
  const ledger = `# Campaign Task Ledger\n\nOpportunity: ${decision.opportunity_id}\nMode: ${mode}\nStatus: ${mode === 'campaign' ? 'ready' : 'in_review'}\n\n## Active Tasks\n\n| ID | Owner | Reviewer | Task | Close Condition | Status |\n| --- | --- | --- | --- | --- | --- |\n| C-001 | Product Agent | Hermes | Confirm judging thesis and acceptance criteria | Product Gate evidence exists | ready |\n| C-002 | Architecture Agent | Code Review Agent | Validate required technology boundary | Reproducible spike evidence exists | ${mode === 'campaign' ? 'ready' : 'in_progress'} |\n| C-003 | Operator Agent | Human owner | Close unresolved eligibility and terms | Human decision recorded | ${mode === 'campaign' ? 'done' : 'blocked'} |\n`;
  const checklist = `# Submission Checklist\n\n- [ ] Human Gate A participation approval\n- [ ] Registration and terms completed by authorized human\n- [ ] Rules snapshot refreshed\n- [ ] Pre-existing work disclosure reviewed\n- [ ] Working application URL verified\n- [ ] Repository access and README verified\n- [ ] Demo video under event limit\n- [ ] Provider/model disclosures complete\n- [ ] E2E and fallback demo evidence complete\n- [ ] Human Gate B final submission approval\n- [ ] Platform confirmation captured before status becomes SUBMITTED\n`;

  await Promise.all([
    writeFile(join(outputDirectory, 'campaign.json'), `${JSON.stringify(metadata, null, 2)}\n`),
    writeFile(join(outputDirectory, 'review-decision.json'), `${JSON.stringify(decision, null, 2)}\n`),
    writeFile(join(outputDirectory, 'README.md'), readme),
    writeFile(join(outputDirectory, 'docs', 'rules-review.md'), rules),
    writeFile(join(outputDirectory, 'docs', 'task-ledger.md'), ledger),
    writeFile(join(outputDirectory, 'docs', 'submission-checklist.md'), checklist),
  ]);
  return { mode, output_directory: outputDirectory, files: 6 };
}

async function main(args) {
  const decisionArg = args.find((value) => value.startsWith('--decision='));
  const outArg = args.find((value) => value.startsWith('--out='));
  if (!decisionArg || !outArg) {
    console.error('Usage: node scripts/create-campaign-workspace.mjs --decision=review.json --out=campaign-dir');
    process.exitCode = 2;
    return;
  }
  try {
    const decisionPath = decisionArg.slice('--decision='.length);
    const decision = JSON.parse(await readFile(decisionPath, 'utf8'));
    const result = await createCampaignWorkspace(decision, outArg.slice('--out='.length));
    console.log(`PASS ${basename(result.output_directory)} mode=${result.mode} files=${result.files}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
