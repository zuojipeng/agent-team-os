#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

required_files=(
  "AGENT-TEAM-CHARTER.md"
  "README.md"
  "agents/product-agent.md"
  "agents/ue-agent.md"
  "agents/architecture-agent.md"
  "agents/engineering-agent.md"
  "agents/code-review-agent.md"
  "agents/test-agent.md"
  "agents/devops-agent.md"
  "agents/operator-agent.md"
  "principles/product-taste.md"
  "principles/ue-taste.md"
  "principles/software-design.md"
  "principles/agent-review-rubric.md"
  "workflows/zero-to-one-product.md"
  "workflows/stage-gate-delivery.md"
  "workflows/hackathon-48h.md"
  "workflows/client-delivery.md"
  "workflows/code-review.md"
  "workflows/ui-redesign.md"
  "workflows/release-ops.md"
  "playbooks/project-takeover.md"
  "playbooks/okr-cascade.md"
  "playbooks/product-mvp.md"
  "playbooks/ue-redesign-sprint.md"
  "playbooks/architecture-review.md"
  "playbooks/hackathon-kit.md"
  "playbooks/client-intake.md"
  "templates/prd.md"
  "templates/ue-spec.md"
  "templates/architecture-note.md"
  "templates/adr.md"
  "templates/code-review-report.md"
  "templates/test-report.md"
  "templates/release-runbook.md"
  "templates/agent-run-log.md"
  "templates/project-scorecard.md"
  "templates/okr-cascade.md"
  "templates/stage-gate-run.md"
  "adapters/codex.md"
  "adapters/claude.md"
  "adapters/cursor.md"
  "adapters/openclaw.md"
  "adapters/github-copilot.md"
  "prompts/codex-start.md"
  "prompts/claude-start.md"
  "prompts/cursor-start.md"
  "prompts/openclaw-start.md"
  "prompts/client-quote-start.md"
  "scripts/install-to-project.sh"
  "scripts/new-scorecard.sh"
  "operating-system/team-governance.md"
  "operating-system/communication-protocol.md"
  "operating-system/loop-engineering.md"
  "operating-system/supervision-matrix.md"
  "operating-system/team-memory.md"
  "operating-system/autonomy-loop.md"
  "operating-system/maturity-model.md"
)

missing=0
for file in "${required_files[@]}"; do
  if [[ ! -f "$root/$file" ]]; then
    echo "MISSING $file"
    missing=1
  fi
done

if [[ ! -x "$root/scripts/install-to-project.sh" ]]; then
  echo "NOT_EXECUTABLE scripts/install-to-project.sh"
  missing=1
fi

if ! grep -q "Product -> UE -> Architecture -> Engineering" "$root/scripts/install-to-project.sh"; then
  echo "INSTALL_POINTER_MISSING_GATE_SEQUENCE"
  missing=1
fi

if ! grep -q "Architecture Agent" "$root/AGENT-TEAM-CHARTER.md"; then
  echo "CHARTER_MISSING_ARCHITECTURE_AGENT"
  missing=1
fi

if ! grep -q "UEAgent" "$root/AGENT-TEAM-CHARTER.md"; then
  echo "CHARTER_MISSING_UEAGENT"
  missing=1
fi

if [[ "$missing" -ne 0 ]]; then
  echo "Agent Team OS validation failed"
  exit 1
fi

echo "Agent Team OS validation passed"
