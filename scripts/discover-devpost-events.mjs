import { pathToFileURL } from 'node:url';

const DEFAULT_LISTING_URL = 'https://devpost.com/api/hackathons?page=1';
const MAX_RESPONSE_BYTES = 2_000_000;
const MAX_CANDIDATES = 100;
const EXCLUDED_HOSTS = new Set([
  'api.devpost.com',
  'devpost.com',
  'help.devpost.com',
  'info.devpost.com',
  'secure.devpost.com',
  'www.devpost.com',
]);

function assertOfficialListingUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Devpost listing URL is invalid');
  }
  if (url.protocol !== 'https:' || url.hostname !== 'devpost.com' || url.pathname !== '/api/hackathons') {
    throw new Error('Devpost listing URL must use https://devpost.com/api/hackathons');
  }
}

export function canonicalizeDevpostEventUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  if (url.protocol !== 'https:' || !hostname.endsWith('.devpost.com') || EXCLUDED_HOSTS.has(hostname)) return null;

  url.protocol = 'https:';
  url.hostname = hostname;
  url.username = '';
  url.password = '';
  url.port = '';
  url.pathname = '/';
  url.search = '';
  url.hash = '';
  return url.toString();
}

export function buildDevpostCandidateIndex(payload, {
  listingUrl = DEFAULT_LISTING_URL,
  discoveredAt = new Date().toISOString(),
  limit = 25,
} = {}) {
  if (!payload || !Array.isArray(payload.hackathons)) throw new Error('Devpost response is missing hackathons[]');
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_CANDIDATES) {
    throw new Error(`limit must be an integer between 1 and ${MAX_CANDIDATES}`);
  }

  const candidates = [];
  const seen = new Set();
  for (const event of payload.hackathons) {
    if (!event || typeof event !== 'object') continue;
    const officialUrl = canonicalizeDevpostEventUrl(event.url);
    if (!officialUrl || seen.has(officialUrl)) continue;
    seen.add(officialUrl);
    candidates.push({
      source_event_id: event.id == null ? null : String(event.id),
      title: typeof event.title === 'string' ? event.title.trim() : '',
      official_url: officialUrl,
      source_url: listingUrl,
      discovered_at: discoveredAt,
    });
    if (candidates.length >= limit) break;
  }

  return {
    source: 'devpost-official-listing',
    listing_url: listingUrl,
    discovered_at: discoveredAt,
    candidate_count: candidates.length,
    candidates,
  };
}

export async function discoverDevpostEvents({
  url = DEFAULT_LISTING_URL,
  limit = 25,
  fetchImpl = fetch,
  discoveredAt,
} = {}) {
  assertOfficialListingUrl(url);
  const response = await fetchImpl(url, {
    redirect: 'follow',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'AgentTeamOS-OpportunityScout/0.1 (read-only opportunity discovery)',
    },
  });
  if (!response.ok) throw new Error(`Devpost listing returned HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(`unsupported content type: ${contentType || 'unknown'}`);
  }
  const body = await response.text();
  if (new TextEncoder().encode(body).byteLength > MAX_RESPONSE_BYTES) {
    throw new Error('Devpost listing exceeds 2 MB limit');
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error('Devpost listing returned invalid JSON');
  }
  return buildDevpostCandidateIndex(payload, {
    listingUrl: response.url || url,
    discoveredAt,
    limit,
  });
}

async function main(args) {
  const urlArg = args.find((value) => value.startsWith('--url='));
  const limitArg = args.find((value) => value.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : 25;
  try {
    const result = await discoverDevpostEvents({
      url: urlArg?.slice('--url='.length) || DEFAULT_LISTING_URL,
      limit,
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
