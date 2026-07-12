import { pathToFileURL } from 'node:url';

import { canonicalizeDevpostEventUrl } from './discover-devpost-events.mjs';

const MAX_HTML_BYTES = 2_000_000;
const MAX_SECTION_CHARS = 4_000;

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function htmlToText(html) {
  return decodeHtml(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/p>|<\/li>|<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function eventJsonLd(html) {
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const records = Array.isArray(value) ? value : [value];
      const event = records.find((record) => record?.['@type'] === 'Event');
      if (event) return event;
    } catch {
      // A page may contain unrelated malformed JSON-LD; continue to the next block.
    }
  }
  throw new Error('event page is missing Event JSON-LD');
}

function sectionEvidence(html, id, sourceUrl) {
  const headingPattern = new RegExp(`<h([1-6])\\b[^>]*id=["']${id}["'][^>]*>[\\s\\S]*?<\\/h\\1>`, 'i');
  const heading = headingPattern.exec(html);
  if (!heading) return { status: 'not_found', source_url: sourceUrl, text: '' };
  const level = Number(heading[1]);
  const rest = html.slice(heading.index + heading[0].length);
  const nextHeading = new RegExp(`<h([1-${level}])\\b`, 'i').exec(rest);
  const body = nextHeading ? rest.slice(0, nextHeading.index) : rest;
  const text = htmlToText(body).slice(0, MAX_SECTION_CHARS);
  return { status: text ? 'evidence_found' : 'not_found', source_url: `${sourceUrl}#${id}`, text };
}

export function buildDevpostRuleEvidence({ homeHtml, rulesHtml, officialUrl, checkedAt = new Date().toISOString() }) {
  const canonicalUrl = canonicalizeDevpostEventUrl(officialUrl);
  if (!canonicalUrl) throw new Error('official URL must be an HTTPS Devpost event subdomain');
  const event = eventJsonLd(homeHtml);
  const rulesUrl = new URL('rules', canonicalUrl).toString();
  const attendanceMode = event.eventAttendanceMode ?? null;

  return {
    kind: 'devpost-rule-evidence-draft',
    official_url: canonicalUrl,
    checked_at: checkedAt,
    event_facts: {
      title: typeof event.name === 'string' ? event.name : null,
      starts_at: typeof event.startDate === 'string' ? event.startDate : null,
      submission_deadline: typeof event.endDate === 'string' ? event.endDate : null,
      attendance_mode: typeof attendanceMode === 'string' && attendanceMode.includes('OnlineEventAttendanceMode')
        ? 'online'
        : null,
      source_url: canonicalUrl,
    },
    rule_evidence: {
      dates_and_timing: sectionEvidence(rulesHtml, '1-dates-and-timing', rulesUrl),
      eligibility: sectionEvidence(rulesHtml, '3-eligibility', rulesUrl),
      how_to_enter: sectionEvidence(rulesHtml, '4-how-to-enter', rulesUrl),
      submission_requirements: sectionEvidence(rulesHtml, 'submission-requirements', rulesUrl),
      intellectual_property: sectionEvidence(rulesHtml, 'intellectual-property', rulesUrl),
      intellectual_property_rights: sectionEvidence(rulesHtml, '7-intellectual-property-rights', rulesUrl),
    },
    review_state: 'needs_human_and_operator_review',
    verified_opportunity_status: null,
    warnings: [
      'Evidence extraction is not legal advice or participation approval.',
      'Missing sections remain not_found and must not be inferred.',
      'A reviewer must compare excerpts with the live official pages before changing opportunity status.',
    ],
  };
}

async function fetchHtml(url, fetchImpl) {
  const response = await fetchImpl(url, {
    redirect: 'follow',
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'AgentTeamOS-OpportunityScout/0.1 (read-only rule verification)',
    },
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`unsupported content type: ${contentType || 'unknown'}`);
  const html = await response.text();
  if (new TextEncoder().encode(html).byteLength > MAX_HTML_BYTES) throw new Error(`${url} exceeds 2 MB limit`);
  return html;
}

export async function fetchDevpostRuleEvidence(officialUrl, fetchImpl = fetch) {
  const canonicalUrl = canonicalizeDevpostEventUrl(officialUrl);
  if (!canonicalUrl) throw new Error('official URL must be an HTTPS Devpost event subdomain');
  const rulesUrl = new URL('rules', canonicalUrl).toString();
  const [homeHtml, rulesHtml] = await Promise.all([
    fetchHtml(canonicalUrl, fetchImpl),
    fetchHtml(rulesUrl, fetchImpl),
  ]);
  return buildDevpostRuleEvidence({ homeHtml, rulesHtml, officialUrl: canonicalUrl });
}

async function main(args) {
  const urlArg = args.find((value) => value.startsWith('--url='));
  if (!urlArg) {
    console.error('Usage: node scripts/build-devpost-rule-evidence.mjs --url=https://event.devpost.com/');
    process.exitCode = 2;
    return;
  }
  try {
    console.log(JSON.stringify(await fetchDevpostRuleEvidence(urlArg.slice('--url='.length)), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
