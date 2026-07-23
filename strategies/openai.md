# OpenAI GPT Prompt Strategy (GPT-5.6 guidance)

> You are running as **an OpenAI GPT-family model**. Preserve the runtime's actual model
> identity; apply GPT-5.6-specific guidance only when the host identifies itself as GPT-5.6.
> Source: [GPT-5.6 prompting](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6) · [Model guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6) · [ChatGPT/Codex prompting](https://learn.chatgpt.com/docs/prompting) · [Images and vision](https://developers.openai.com/api/docs/guides/images-vision)

## What is distinctive for OpenAI models

For GPT-5.6, the family spans `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`.
Codex can run the same models, but Codex tools and modes are surface capabilities, not
universal GPT behavior. GPT-5.6 favors lean, **outcome-first** prompts: define the
destination, useful context or evidence, hard constraints, and completion bar, then let the
model choose the path. State each instruction once. Keep examples only when they encode a
product requirement or fix a measured gap. Do not inject "think step by step"; use the
surface's reasoning-effort control when available.

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
6. **Grounding**: never fabricate citations, URLs, or IDs; separate confident facts from
   uncertainty; don't turn missing evidence into a confident "no".
7. **Route tools.** Resolve prerequisites; parallelize independent reads and sequence
   dependent calls. For empty or partial results, try a bounded fallback; report the
   gap. Expose only relevant tools.
8. **Multimodal (vision)**: say exactly what to do with each image and keep the question with
   it; raise image detail for small or low-quality text. Don't rely on the model for
   **precise spatial layout or exact counts** (documented weak spots).

## Anti-patterns to avoid

- Carrying over a legacy prompt stack that **over-specifies the process** (now counter-productive)
- `ALWAYS` / `NEVER` / `must` on judgment calls instead of on true invariants
- Forcing "think step by step" instead of using an available reasoning-effort control
- Loading durable, repo-wide rules into every Codex prompt instead of `AGENTS.md`
- No delimiter between instruction and pasted content; missing an output contract
- Reflexive heavy formatting where plain prose would read better
