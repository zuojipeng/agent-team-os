import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { test } from 'node:test';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

import { validateOpportunity } from '../scripts/validate-opportunity.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const validOpportunity = {
  id: 'event-1',
  title: 'Verified event',
  source: 'official',
  official_url: 'https://example.com/event',
  organizer: 'Organizer',
  status: 'verified',
  discovered_at: '2026-07-10T12:00:00Z',
  verified_at: '2026-07-10T13:00:00Z',
  registration_deadline_utc: null,
  submission_deadline_utc: '2026-08-10T12:00:00Z',
  mode: 'online',
  location: null,
  languages: ['English'],
  eligibility: ['Global'],
  team_size: { min: 1, max: 4 },
  tracks: ['AI'],
  required_technology: [],
  allowed_preexisting_work: 'unknown',
  deliverables: ['repository'],
  ip_and_license_summary: '',
  prize_and_network_value: '',
  estimated_cost: 0,
  estimated_team_hours: 48,
  fit_assets: ['agent-team-os'],
  hard_filter: 'pass',
  score: 80,
  confidence: 'medium',
  evidence: ['https://example.com/event/rules'],
  human_gates: ['registration', 'submission'],
};

test('accepts a complete verified opportunity', () => {
  assert.deepEqual(validateOpportunity(validOpportunity), []);
});

test('accepts an unverified discovered opportunity with a null verification time', () => {
  assert.deepEqual(
    validateOpportunity({
      ...validOpportunity,
      status: 'discovered',
      verified_at: null,
      mode: null,
      hard_filter: 'needs_review',
      score: null,
    }),
    [],
  );
});

test('rejects missing, malformed, and contradictory fields', () => {
  const errors = validateOpportunity({
    ...validOpportunity,
    title: '',
    verified_at: '2026-07-10',
    team_size: { min: 5, max: 2 },
    hard_filter: 'needs_review',
    score: 75,
    status: 'shortlisted',
    evidence: [''],
    unexpected: true,
  });

  assert.ok(errors.includes('title must be a non-empty string'));
  assert.ok(errors.includes('verified_at must be null or an ISO-8601 date-time with timezone'));
  assert.ok(errors.includes('team_size min cannot exceed max'));
  assert.ok(errors.includes('score must remain null until hard_filter passes'));
  assert.ok(errors.includes('shortlisted opportunities must pass hard_filter'));
  assert.ok(errors.includes('evidence entries must be non-empty strings'));
  assert.ok(errors.includes('unexpected is not allowed'));
});

test('CLI validates the checked-in sample', () => {
  const result = spawnSync(
    process.execPath,
    ['scripts/validate-opportunity.mjs', 'examples/opportunities/sample-opportunity.json'],
    { cwd: root, encoding: 'utf8' },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /PASS examples\/opportunities\/sample-opportunity.json/);
});

test('CLI exits non-zero and explains an invalid record', () => {
  const directory = mkdtempSync(join(tmpdir(), 'team-os-opportunity-'));
  const filePath = join(directory, 'invalid.json');
  writeFileSync(filePath, JSON.stringify({ id: 'incomplete' }));

  try {
    const result = spawnSync(process.execPath, ['scripts/validate-opportunity.mjs', filePath], {
      cwd: root,
      encoding: 'utf8',
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /FAIL/);
    assert.match(result.stderr, /title is required/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
