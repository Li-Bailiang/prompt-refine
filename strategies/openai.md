# OpenAI GPT-5.6 Prompt Strategy

> You are running as **an OpenAI GPT-5.6-family model**. Restructure your own input using these principles.
> Source: [GPT-5.6 prompting](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6) · [Model guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6) · [ChatGPT/Codex prompting](https://learn.chatgpt.com/docs/prompting) · [Images and vision](https://developers.openai.com/api/docs/guides/images-vision)

## What is distinctive for OpenAI models

The family spans `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`. Codex can run
the same models, but Codex tools and modes are surface capabilities, not universal GPT behavior.
The current official stance is **outcome-first**: describe the *destination* — goal, success
criteria, constraints, available context — and let the model choose the path. Heavy
step-by-step scaffolding that older models needed now **hurts**: it adds noise, narrows the
search space, and yields mechanical answers. Do not inject "think step by step"; use the
surface's **reasoning effort** control when available.

## Restructuring rules

1. **Lead with the outcome, not the procedure.** State the goal, what "done/correct" looks
   like (success criteria + required output fields), and the hard constraints — then stop.
   Don't transcribe every step.
2. **Reserve absolutes for true invariants.** Use `MUST` / `NEVER` only for real rules
   (safety, format contracts); for judgment calls, give the decision criteria instead.
3. **Separate instructions from content** with delimiters (` ``` `, `###`, or XML), and
   **specify the output contract** exactly ("Return JSON with keys …").
4. **Agentic / multi-step asks**: set a stopping rule ("stop when you can answer the core
   request") and allow persistence ("don't stop early if another tool call improves
   correctness"); ask for a short verification pass before high-impact output.
5. **Coding on Codex**: have it **verify its own work** — include repro steps, how to
   validate, and run lint/tests; split large work into smaller reviewable steps (ask it to
   propose a plan first if decomposition is unclear). Put durable, repo-wide rules in
   **`AGENTS.md`**, not in every prompt.
6. **Grounding**: never fabricate citations, URLs, or IDs; separate confident facts from
   uncertainty; don't turn missing evidence into a confident "no".
7. **Don't over-format.** Plain prose unless structure genuinely aids comprehension — avoid
   reflexive cards and nested bullets.
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
