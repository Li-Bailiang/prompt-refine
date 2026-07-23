# OpenAI GPT Prompt Strategy (GPT-5.6 guidance)

> You are running as **an OpenAI GPT-family model**. Preserve the runtime's actual model
> identity; apply GPT-5.6-specific guidance only when the host identifies itself as GPT-5.6.
> Source: [GPT-5.6 prompting](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6) · [Model guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6) · [ChatGPT/Codex prompting](https://learn.chatgpt.com/docs/prompting) · [Images and vision](https://developers.openai.com/api/docs/guides/images-vision)

## What is distinctive for OpenAI models

GPT-5.6 spans `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`. Codex tools and modes
remain surface-specific. Favor lean, **outcome-first** prompts:
destination, evidence, constraints, and completion bar; let the model choose the path.
State each instruction once. Keep examples only when they encode a product requirement or
fix a measured gap. Do not inject "think step by step"; use a surfaced reasoning-effort control.

## Restructuring rules

1. **Lead with the outcome.** State the goal, useful context, success criteria, required
   evidence, hard constraints, and output contract; delimit pasted content. Add process only
   when it matters.
2. **Protect invariants.** Preserve explicit user values and use `MUST` / `NEVER` only for
   real rules such as safety or format contracts; for judgment calls, give decision criteria.
3. **Set authorization once.** For answer, explain, review, diagnose, or plan, inspect and
   report only. For change, build, or fix, make in-scope local changes and run non-destructive
   validation. Require confirmation for external, destructive, costly, or scope-expanding actions.
4. **Set an evidence-aware stop rule.** Stop when the core request meets its evidence and
   output bar. If evidence is missing, name the smallest missing fact and use the smallest
   useful fallback; never let loop minimization outrank correctness or required citations.
5. **Coding on Codex**: have it **verify its own work** — include repro steps, how to
   validate, and run lint/tests; split large work into smaller reviewable steps (ask it to
   propose a plan first if decomposition is unclear). Put durable, repo-wide rules in
   **`AGENTS.md`**, not in every prompt.
6. **Ground retrieval.** Bound sources, dates, and the stop condition. Cite only retrieved
   support; label inference, assumptions, source conflicts, and missing evidence. Never
   fabricate citations or turn absence into a confident "no".
7. **Route tools.** Resolve prerequisites; parallelize independent reads and sequence
   dependent calls. For empty or partial results, try a bounded fallback; report the
   gap. Expose only relevant tools.
8. **Handle images explicitly.** Pair each image with its task; use higher detail for small
   text. Verify exact counts and spatial layout instead of trusting them.
9. **Prioritize response content.** Keep required facts, caveats, and next steps; trim
   repetition and optional background first. Define tone with concrete writing choices, not labels.

## Anti-patterns to avoid

- Repeated or process-heavy legacy prompt stacks
- `ALWAYS` / `NEVER` / `must` on judgment calls instead of on true invariants
- Forcing "think step by step" instead of using an available reasoning-effort control
- Loading durable, repo-wide rules into every Codex prompt instead of `AGENTS.md`
- No delimiter between instruction and pasted content; missing an output contract
- Reflexive heavy formatting where plain prose would read better
