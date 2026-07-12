import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import { buildDiscoveredOpportunity, importOfficialEvent } from '../scripts/import-official-event.mjs';
import { validateOpportunity } from '../scripts/validate-opportunity.mjs';

const fixtureUrl = new URL('./fixtures/devpost-event.html', import.meta.url);

test('converts official page metadata into an unverified opportunity', async () => {
  const html = await readFile(fixtureUrl, 'utf8');
  const opportunity = buildDiscoveredOpportunity({
    html,
    requestedUrl: 'https://api-cloud-ai-hackathon-2026.devpost.com/',
    discoveredAt: '2026-07-12T00:00:00Z',
  });

  assert.equal(opportunity.title, 'DevNetwork [API + Cloud + AI] Hackathon 2026');
  assert.equal(opportunity.status, 'discovered');
  assert.equal(opportunity.verified_at, null);
  assert.equal(opportunity.mode, null);
  assert.equal(opportunity.hard_filter, 'needs_review');
  assert.equal(opportunity.score, null);
  assert.deepEqual(validateOpportunity(opportunity), []);
});

test('uses bounded read-only fetch settings and validates the response type', async () => {
  const html = await readFile(fixtureUrl, 'utf8');
  let observedOptions;
  const opportunity = await importOfficialEvent('https://official.example/event', async (_url, options) => {
    observedOptions = options;
    return new Response(html, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  });

  assert.equal(observedOptions.redirect, 'follow');
  assert.match(observedOptions.headers['User-Agent'], /read-only opportunity discovery/);
  assert.equal(opportunity.official_url, 'https://api-cloud-ai-hackathon-2026.devpost.com/');
});

test('rejects pages without event identity metadata', () => {
  assert.throws(
    () => buildDiscoveredOpportunity({ html: '<html></html>', requestedUrl: 'https://official.example/event' }),
    /missing a title/,
  );
});
