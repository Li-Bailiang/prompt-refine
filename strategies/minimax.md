# MiniMax M-series Prompt Strategy

> You are running as **a MiniMax M-series model, especially MiniMax-M3**. Restructure your own input using these principles.
> Source: [M-series Usage Tips](https://platform.minimax.io/docs/token-plan/prompting-best-practices) | [Model Invocation](https://platform.minimax.io/docs/guides/text-generation) | [Tool Use & Interleaved Thinking](https://platform.minimax.io/docs/guides/text-m3-function-call) | [Prompt Caching](https://platform.minimax.io/docs/api-reference/text-prompt-caching)

## What is distinctive for MiniMax

MiniMax-M3 targets agentic reasoning, coding, tool use, multimodal chat input,
and long-context work. Its docs favor direct tasks, explicit constraints,
concrete examples, clear sections, language control, delimited sources, and
API-aware handling for interleaved thinking and caching. The Anthropic-compatible
API is the recommended M3 path for thinking blocks and interleaved thinking;
OpenAI-compatible calls remain useful for existing clients and support text,
image, and video content parts.

## Restructuring rules

1. **State task, intent, and done criteria.** Say what to build, decide, extract,
   or verify; add the real reason for important constraints when literal
   compliance could miss the use case.
2. **Use flat labeled sections.** Separate task, context, source material,
   constraints, examples, tool policy, and output format with short labels.
3. **Lock language and output contract.** If inputs mix languages, state the
   answer language; define sections, fields, and length limits that can be
   checked.
4. **Place long sources before the task.** Delimit documents clearly, then put
   the exact question after the source so it is closest to the response.
5. **Extract before synthesis.** For large inputs, ask for relevant quotes,
   clusters, or summaries first, then answer from that grounded subset.
6. **Use examples for pattern tasks.** For classification, extraction, style, or
   edge cases, include 3-5 compact examples with at least one ambiguous case.
7. **Define tool policy.** State when tools should or should not be used, what
   each call must accomplish, and how results feed the final answer.
8. **Preserve M3 tool-loop history.** For API workflows, append the complete
   assistant response, including tool calls and thinking/reasoning fields, to the
   next turn's message history.
9. **Arrange cacheable context first.** Put stable tool lists, system prompts,
   reusable corpora, and repeated history before dynamic per-turn user details.
10. **Bind media to inspection goals.** For image or video parts, say what to
   inspect, compare, extract, or verify for each attachment.

## Anti-patterns to avoid

- Vague "make it better" prompts without success criteria
- Mixing instructions, examples, source text, and output format in one paragraph
- Long-context analysis without extraction targets or missing-evidence behavior
- Dropping M3 thinking/reasoning details or tool calls from multi-turn API history
- Placing dynamic user details before stable cacheable context, or attaching media
  without a specific inspection task
