# OpenAI GPT Prompt Strategy (GPT-5.6 guidance)

> You are an **OpenAI GPT-family model**. Preserve the host's actual identity; apply GPT-5.6
> guidance only when the host identifies itself as GPT-5.6.
> Source: [Prompting](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6) · [Models](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6) · [ChatGPT/Codex](https://learn.chatgpt.com/docs/prompting) · [Vision](https://developers.openai.com/api/docs/guides/images-vision)

## OpenAI specifics

GPT-5.6 spans `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`. Codex tools and modes
are surface-specific. Use lean, **outcome-first** prompts: destination, evidence,
constraints, and completion bar; let the model choose the path.
State each instruction once. Keep examples only when they encode a product requirement or
fix a measured gap. Do not inject "think step by step"; use reasoning effort only when surfaced.

## Restructuring rules

1. **Lead with outcome.** State goal, context, success criteria, required evidence,
   constraints, and output contract; delimit pasted content. Add process only when it matters.
2. **Protect invariants.** Preserve explicit user values. Reserve `MUST` / `NEVER` for safety
   or format contracts; for judgment calls, give decision criteria.
3. **Set authorization once.** For answer, explain, review, diagnose, or plan, inspect and
   report only. For change, build, or fix, make in-scope local changes and run non-destructive
   validation. Require confirmation for external writes, destructive actions, purchases, or
   a material expansion of scope.
4. **Stop on the evidence bar.** Stop when the core request meets its evidence/output
   contract. If evidence is missing, name the smallest missing fact and smallest useful
   fallback; never trade correctness or citations for fewer loops.
5. **Verify Codex work.** For long or multi-step work, name the current phase: research, plan,
   implementation, or review. Follow repo patterns; run the smallest relevant repro, tests,
   lint, or build. For visual deliverables, render and inspect output. Put durable rules in
   `AGENTS.md`; request a plan only when the approach matters.
6. **Ground retrieval.** Bound sources and the stop condition; bound dates when relevant.
   Cite only retrieved support; label inference, assumptions, source conflicts, and missing
   evidence. Never fabricate citations or turn absence into "no".
7. **Route tools.** Expose only relevant tools; resolve prerequisites; parallelize independent
   reads and sequence dependent calls. For empty or partial results, set a task-level retry or
   fallback limit and stop condition; report the gap when exhausted.
8. **Handle images explicitly.** Pair each image with its task. If the surface exposes detail
   controls, choose `original` for dense text or spatially sensitive work; account for token
   cost and latency. Verify counts and layout.
9. **Prioritize response content.** Keep required facts, caveats, and next steps; trim
   repetition and optional background first. Define tone with concrete writing choices, not labels.

## Anti-patterns to avoid

- Repeated, conflicting, or process-heavy instruction stacks; absolutes on judgment calls
- Generic "be concise", "be thorough", or "think step by step" instead of content contracts
- Ask-first loops that block authorized local work; repeating a failing tool route
- Assuming optional API modes (Pro, PTC, persisted reasoning, explicit caching, multi-agent)
  exist on every surface
