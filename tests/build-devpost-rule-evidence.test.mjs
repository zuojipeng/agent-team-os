import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

import { buildDevpostRuleEvidence, fetchDevpostRuleEvidence } from '../scripts/build-devpost-rule-evidence.mjs';

const homeUrl = new URL('./fixtures/devpost-rule-home.html', import.meta.url);
const rulesUrl = new URL('./fixtures/devpost-rule-rules.html', import.meta.url);

test('builds an evidence draft without claiming verified opportunity status', async () => {
  const [homeHtml, rulesHtml] = await Promise.all([readFile(homeUrl, 'utf8'), readFile(rulesUrl, 'utf8')]);
  const evidence = buildDevpostRuleEvidence({
    homeHtml,
    rulesHtml,
    officialUrl: 'https://example-ai.devpost.com/?ref=listing',
    checkedAt: '2026-07-12T00:00:00Z',
  });

  assert.equal(evidence.official_url, 'https://example-ai.devpost.com/');
  assert.equal(evidence.event_facts.submission_deadline, '2026-08-17T16:00:00-04:00');
  assert.equal(evidence.event_facts.attendance_mode, 'online');
  assert.match(evidence.rule_evidence.eligibility.text, /Teams are allowed/);
  assert.match(evidence.rule_evidence.submission_requirements.text, /repository URL/);
  assert.doesNotMatch(evidence.rule_evidence.submission_requirements.text, /Open source is allowed/);
  assert.equal(evidence.verified_opportunity_status, null);
  assert.equal(evidence.review_state, 'needs_human_and_operator_review');
});

test('marks absent rule sections as not found instead of inferring them', async () => {
  const homeHtml = await readFile(homeUrl, 'utf8');
  const evidence = buildDevpostRuleEvidence({
    homeHtml,
    rulesHtml: '<html><body><h4 id="3-eligibility">Eligibility</h4></body></html>',
    officialUrl: 'https://example-ai.devpost.com/',
  });
  assert.equal(evidence.rule_evidence.eligibility.status, 'not_found');
  assert.equal(evidence.rule_evidence.intellectual_property.status, 'not_found');
});

test('fetches only the event root and rules page with read-only settings', async () => {
  const [homeHtml, rulesHtml] = await Promise.all([readFile(homeUrl, 'utf8'), readFile(rulesUrl, 'utf8')]);
  const calls = [];
  const evidence = await fetchDevpostRuleEvidence('https://example-ai.devpost.com/details', async (url, options) => {
    calls.push({ url, options });
    return new Response(url.endsWith('/rules') ? rulesHtml : homeHtml, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  });
  assert.deepEqual(calls.map((call) => call.url), [
    'https://example-ai.devpost.com/',
    'https://example-ai.devpost.com/rules',
  ]);
  assert.ok(calls.every((call) => /read-only rule verification/.test(call.options.headers['User-Agent'])));
  assert.equal(evidence.kind, 'devpost-rule-evidence-draft');
});

test('rejects non-Devpost event URLs before fetching', async () => {
  await assert.rejects(fetchDevpostRuleEvidence('https://example.com/event'), /Devpost event subdomain/);
});
