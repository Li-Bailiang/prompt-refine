# MiniMax M-series Prompt Strategy

> You are running as **a MiniMax M-series model, especially MiniMax-M3**. Restructure your own input using these principles.
> Source: [M-series Usage Tips](https://platform.minimax.io/docs/token-plan/prompting-best-practices) | [Model Invocation](https://platform.minimax.io/docs/guides/text-generation) | [Tool Use & Interleaved Thinking](https://platform.minimax.io/docs/guides/text-m3-function-call) | [Prompt Caching](https://platform.minimax.io/docs/api-reference/text-prompt-caching) | [Model releases](https://platform.minimax.io/docs/release-notes/models)

## What is distinctive for MiniMax

MiniMax-M3 is positioned for agentic reasoning, coding, tool use, multimodal
chat input, and long-context work. The official guidance emphasizes direct
tasks, explicit constraints, examples for difficult patterns, clear sections,
language control, source delimiters, and API-aware handling for interleaved
thinking and prompt caching.

MiniMax's own model invocation docs make the Anthropic-compatible API the
recommended path for MiniMax-M3 because it exposes thinking blocks and
interleaved thinking. The OpenAI-compatible API is still useful for existing
clients, and it supports text, image, and video content parts for multimodal
chat input.

## Restructuring rules

1. **Name the task and success contract.** State what to build, decide, extract,
   or verify, plus the constraints and output shape that make the answer usable.
2. **Explain why important constraints exist.** Add short context for formatting,
   safety, accessibility, audience, or workflow constraints when literal
   compliance could miss the real use case.
3. **Use clear sections.** Separate task, context, source material, constraints,
   examples, tool rules, and output format with short labels.
4. **Preserve the intended output language.** When inputs mix languages, say the
   answer language explicitly and keep code, identifiers, and API names intact.
5. **Make role and format verifiable.** If a role is useful, define its
   expertise, scope, and decision criteria; define output sections, fields, and
   length limits that can be checked.
6. **Delimit long context and put the task near the end.** Place long source
   documents in clear blocks, then restate the exact task after the source so it
   stays closest to the model's response.
7. **Ask for extraction before synthesis.** For very large inputs, require the
   model to quote, list, or summarize the relevant parts first, then answer from
   that grounded subset.
8. **Define tool-use triggers.** For agentic workflows, state when tools should
   be used, when they should not be used, what each call must accomplish, and
   how tool results should be combined into the final answer.
9. **Preserve interleaved-thinking history in API workflows.** When the refined
   prompt is for a MiniMax-M3 tool loop, tell the caller to append the complete
   assistant response, including tool calls and thinking/reasoning fields, to
   the next turn's message history.
10. **Arrange repeated context for prompt caching.** Put stable tool lists,
   system instructions, reusable corpora, and repeated history before dynamic
   per-turn user details so MiniMax's prefix-based cache can be effective.
11. **Bind multimodal inputs to inspection tasks.** For image or video content
   parts, state what to inspect, compare, extract, or verify for each attachment
   instead of merely attaching media and asking for a general summary.
12. **Make examples concrete and diverse.** For classification, extraction,
   style, or edge-case handling, include 3-5 compact examples that mirror the
   real inputs and cover at least one ambiguous or failure case.

## Anti-patterns to avoid

- Relying on vague requests such as "make it better" without success criteria
- Mixing instructions, examples, source text, and output format in one paragraph
- Asking for long-context analysis without saying what to extract or ignore
- Letting mixed-language input decide the output language by accident
- Treating tool use or cache behavior as if it were only prompt prose
- Dropping MiniMax-M3 thinking, reasoning details, or tool calls from multi-turn
  API history, which breaks interleaved-thinking continuity
- Placing changing user details before stable tool lists, system prompts, or
  reusable corpora, which defeats prefix-based prompt caching
