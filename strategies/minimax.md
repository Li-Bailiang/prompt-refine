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
2. **Use clear sections.** Separate task, context, source material, constraints,
   examples, tool rules, and output format with short labels.
3. **Preserve the intended output language.** When inputs mix languages, say the
   answer language explicitly and keep code, identifiers, and API names intact.
4. **Delimit long context and put the task near the end.** Place long source
   documents in clear blocks, then restate the exact task after the source so it
   stays closest to the model's response.
5. **Make examples concrete.** For classification, extraction, style, or edge
   cases, include compact examples that match the real task.

## Anti-patterns to avoid

- Relying on vague requests such as "make it better" without success criteria
- Mixing instructions, examples, source text, and output format in one paragraph
- Asking for long-context analysis without saying what to extract or ignore
- Letting mixed-language input decide the output language by accident
- Treating tool use or cache behavior as if it were only prompt prose
