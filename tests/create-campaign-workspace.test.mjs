import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import {
  createCampaignWorkspace,
  deriveWorkspaceMode,
  validateReviewDecision,
} from '../scripts/create-campaign-workspace.mjs';

const fixtureUrl = new URL('../examples/opportunities/backblaze-review-decision.json', import.meta.url);

async function fixture() {
  return JSON.parse(await readFile(fixtureUrl, 'utf8'));
}

test('validates the checked-in review decision', async () => {
  assert.deepEqual(validateReviewDecision(await fixture()), []);
});

test('keeps unresolved or unapproved opportunities in evaluation mode', async () => {
  const decision = await fixture();
  assert.equal(deriveWorkspaceMode(decision), 'evaluation');
  const parent = await mkdtemp(join(tmpdir(), 'team-os-campaign-'));
  const output = join(parent, 'backblaze');
  try {
    const result = await createCampaignWorkspace(decision, output);
    assert.equal(result.mode, 'evaluation');
    const metadata = JSON.parse(await readFile(join(output, 'campaign.json'), 'utf8'));
    const readme = await readFile(join(output, 'README.md'), 'utf8');
    assert.equal(metadata.mode, 'evaluation');
    assert.match(readme, /does not authorize registration/);
    assert.equal(metadata.authorization.may_register_event, false);
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});

test('requires all critical reviews and participation approval for campaign mode', async () => {
  const decision = await fixture();
  decision.field_decisions.eligibility.status = 'accepted';
  decision.human_gates.participation = 'approved';
  assert.equal(deriveWorkspaceMode(decision), 'campaign');
});

test('rejects incomplete authorization and missing official evidence', async () => {
  const decision = await fixture();
  delete decision.authorization.may_submit_entry;
  decision.field_decisions.deliverables.evidence = [];
  const errors = validateReviewDecision(decision);
  assert.ok(errors.includes('authorization.may_submit_entry must be boolean'));
  assert.ok(errors.includes('field_decisions.deliverables.evidence must include official HTTP(S) URLs'));
});
