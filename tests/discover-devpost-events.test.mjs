import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import {
  buildDevpostCandidateIndex,
  canonicalizeDevpostEventUrl,
  discoverDevpostEvents,
} from '../scripts/discover-devpost-events.mjs';

const fixtureUrl = new URL('./fixtures/devpost-hackathons.json', import.meta.url);

test('canonicalizes event roots and rejects non-event hosts', () => {
  assert.equal(
    canonicalizeDevpostEventUrl('https://Example-Hack.devpost.com/rules?ref=list#ip'),
    'https://example-hack.devpost.com/',
  );
  assert.equal(canonicalizeDevpostEventUrl('https://secure.devpost.com/users/login'), null);
  assert.equal(canonicalizeDevpostEventUrl('http://example-hack.devpost.com/'), null);
  assert.equal(canonicalizeDevpostEventUrl('https://example.com/'), null);
});

test('builds a bounded candidate index and deduplicates canonical URLs', async () => {
  const payload = JSON.parse(await readFile(fixtureUrl, 'utf8'));
  const index = buildDevpostCandidateIndex(payload, {
    listingUrl: 'https://devpost.com/api/hackathons?page=1',
    discoveredAt: '2026-07-12T00:00:00Z',
    limit: 10,
  });

  assert.equal(index.candidate_count, 2);
  assert.deepEqual(index.candidates.map((candidate) => candidate.official_url), [
    'https://xprize.devpost.com/',
    'https://api-cloud-ai-hackathon-2026.devpost.com/',
  ]);
  assert.equal(index.candidates[0].source_event_id, '29541');
  assert.equal(index.candidates[0].discovered_at, '2026-07-12T00:00:00Z');
});

test('uses bounded read-only fetch settings and validates JSON content', async () => {
  const body = await readFile(fixtureUrl, 'utf8');
  let observedOptions;
  const index = await discoverDevpostEvents({
    limit: 1,
    discoveredAt: '2026-07-12T00:00:00Z',
    fetchImpl: async (_url, options) => {
      observedOptions = options;
      return new Response(body, {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });
    },
  });

  assert.equal(observedOptions.redirect, 'follow');
  assert.match(observedOptions.headers['User-Agent'], /read-only opportunity discovery/);
  assert.equal(index.candidate_count, 1);
});

test('rejects malformed payloads and unsafe limits', () => {
  assert.throws(() => buildDevpostCandidateIndex({}), /missing hackathons/);
  assert.throws(() => buildDevpostCandidateIndex({ hackathons: [] }, { limit: 101 }), /between 1 and 100/);
});

test('rejects non-official listing endpoints before fetching', async () => {
  await assert.rejects(
    discoverDevpostEvents({ url: 'https://example.com/api/hackathons' }),
    /must use https:\/\/devpost\.com\/api\/hackathons/,
  );
});
