import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

import { validateOpportunity } from './validate-opportunity.mjs';

const MAX_HTML_BYTES = 2_000_000;

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function readTagAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gis)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[3].trim());
  }
  return attributes;
}

function extractPageMetadata(html) {
  const metadata = new Map();
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = readTagAttributes(match[0]);
    const key = (attributes.property ?? attributes.name ?? '').toLowerCase();
    if (key && attributes.content && !metadata.has(key)) metadata.set(key, attributes.content);
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return {
    title: metadata.get('og:title') ?? (titleMatch ? decodeHtml(titleMatch[1].trim()) : ''),
    description: metadata.get('og:description') ?? metadata.get('description') ?? '',
    canonicalUrl: metadata.get('og:url') ?? '',
  };
}

function stableOpportunityId(url) {
  const hostname = new URL(url).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-');
  const digest = createHash('sha256').update(url).digest('hex').slice(0, 12);
  return `${hostname}-${digest}`;
}

export function buildDiscoveredOpportunity({ html, requestedUrl, discoveredAt = new Date().toISOString() }) {
  const metadata = extractPageMetadata(html);
  const officialUrl = new URL(metadata.canonicalUrl || requestedUrl).toString();
  const hostname = new URL(officialUrl).hostname.replace(/^www\./, '');
  if (!metadata.title) throw new Error('official page is missing a title');

  const opportunity = {
    id: stableOpportunityId(officialUrl),
    title: metadata.title,
    source: `official-page:${hostname}`,
    official_url: officialUrl,
    organizer: `Unknown (${hostname})`,
    status: 'discovered',
    discovered_at: discoveredAt,
    verified_at: null,
    registration_deadline_utc: null,
    submission_deadline_utc: null,
    mode: null,
    location: null,
    languages: [],
    eligibility: [],
    team_size: null,
    tracks: [],
    required_technology: [],
    allowed_preexisting_work: 'unknown',
    deliverables: [],
    ip_and_license_summary: '',
    prize_and_network_value: metadata.description,
    estimated_cost: null,
    estimated_team_hours: null,
    fit_assets: [],
    hard_filter: 'needs_review',
    score: null,
    confidence: 'low',
    evidence: [officialUrl],
    human_gates: ['rules_review', 'registration', 'terms', 'submission'],
  };
  const errors = validateOpportunity(opportunity);
  if (errors.length > 0) throw new Error(`import produced an invalid record: ${errors.join('; ')}`);
  return opportunity;
}

export async function importOfficialEvent(url, fetchImpl = fetch) {
  const response = await fetchImpl(url, {
    redirect: 'follow',
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'AgentTeamOS-OpportunityScout/0.1 (read-only opportunity discovery)',
    },
  });
  if (!response.ok) throw new Error(`official page returned HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`unsupported content type: ${contentType || 'unknown'}`);
  const html = await response.text();
  if (new TextEncoder().encode(html).byteLength > MAX_HTML_BYTES) throw new Error('official page exceeds 2 MB limit');
  return buildDiscoveredOpportunity({ html, requestedUrl: response.url || url });
}

async function main(args) {
  const urlArg = args.find((value) => value.startsWith('--url='));
  if (!urlArg) {
    console.error('Usage: node scripts/import-official-event.mjs --url=https://official.example/event');
    process.exitCode = 2;
    return;
  }
  try {
    console.log(JSON.stringify(await importOfficialEvent(urlArg.slice('--url='.length)), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
