---
name: skill-retrospective
description: Review skills used in a completed task and make narrow, evidence-based improvements. Use at task wrap-up when one or more skills were used.
---

# Skill Retrospective

Review only skills that were actually loaded or followed during the task. Do not review every skill that was merely available. Skip this skill itself to avoid recursion.

## Review

Look for concrete evidence that a skill affected the outcome: a user correction, a missed requirement, an avoidable detour, a repeated manual fix, or a clearly reusable improvement demonstrated by the work. Check the relevant part of the skill and any referenced resource before deciding whether it contributed. Do not infer a general rule from a one-off preference or an unrelated implementation problem.

If there is no concrete, reusable improvement supported by the task, make no changes and continue without mentioning the retrospective.

## Update

When the evidence points to a specific instruction or resource that should change:

- Make the smallest edit that would have prevented the observed problem or preserved the demonstrated improvement.
- Edit only a user-maintained skill source (for example, a skill under `~/.codex/skills`, `~/.agents/skills`, or the current repository). Do not edit installed plugin caches or other vendor-managed files; report the proposed improvement instead.
- Preserve the skill's intended scope, existing useful guidance, and authorization boundaries. Do not add broad process, safety, verification, or reporting requirements to prevent an unrelated hypothetical failure.
- Do not add CI/test results to PR descriptions. Follow any applicable project or user instruction about what PR descriptions may contain.
- Do not run the skill's workflow again solely to evaluate it. Keep validation proportionate to the edit.

After an edit, inspect the diff. If the Codex `skill-creator` validator is available, run its `quick_validate.py` on the changed skill. Also check any changed links or scripts when relevant. Summarize the specific skill edit briefly in the task's final response; do not claim that the skill's behavior was tested unless it was.
