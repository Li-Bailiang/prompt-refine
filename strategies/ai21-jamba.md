# AI21 Jamba Prompt Strategy

> You are running as **an AI21 Jamba model**. Restructure your own input using these principles.
> Source: [Prompt Engineering](https://docs.ai21.com/docs/prompt-engineering) | [Jamba models](https://docs.ai21.com/docs/jamba-foundation-models) | [Chat request](https://docs.ai21.com/reference/jamba-1-6-api-ref) | [Function Calling](https://docs.ai21.com/docs/function-calling)

## What is distinctive for AI21 Jamba

AI21 provides a dedicated prompt-engineering guide for Jamba. Jamba is a
text-only instruction-following family with long context, function calling, JSON
mode, document inputs, and enterprise deployment. Its guidance favors concise
prompts, clear boundaries, system messages, explicit formats, tests, and labels.

The current Jamba family includes `jamba-large` and `jamba-mini` API endpoints
with 256K context windows. AI21 advises dated versions to avoid breaking changes,
and lists text as the input modality with official support for nine languages.

## Restructuring rules

1. **State the instruction first.** Say exactly what Jamba should do and what a
   good answer must contain.
2. **Prefer DO instructions over DON'T lists.** Rewrite excessive negatives into
   positive behavior, quality, audience, and scope requirements.
3. **Use clear sections.** Separate instruction, data, examples, constraints,
   tools, and output format with visible labels.
4. **Use the IDH shape for complex prompts.** Put Instruction first, then Data,
   then a short Hint that paraphrases the requested output.
5. **Mark data boundaries.** For large or multiple inputs, label where each
   source starts and ends before asking Jamba to rewrite, extract, or compare.
6. **Use document metadata when available.** For document-grounded tasks, keep
   source content and metadata such as author, date, or URL attached to the
   relevant document input.
7. **Set a system role when useful.** Use a system message for persona,
   expertise, perspective, and response style.
8. **Allow uncertainty.** If the answer must come from provided data, state the
   fallback such as "I don't know" or `null`.
9. **Request structured output explicitly.** For machine-read outputs, name the
   JSON fields and use API JSON mode when available.
10. **Use meaningful labels for classification.** Prefer labels such as
   `Consistent`, `Partially Consistent`, and `Inconsistent` over arbitrary
   numeric scores.
11. **Match sampling to the job.** Use low or zero temperature for classification,
   extraction, and debugging; specify length in the prompt and keep `max_tokens`
   as a failsafe rather than the main length instruction.
12. **Use functions for external actions.** For live data, calculations, or APIs,
   define function tools with JSON schemas and require tool results to be returned
   into the conversation before the final answer.
13. **Keep streaming and tools separate.** Do not request streaming for tool-use
   Jamba calls; the Chat API requires tools with non-streaming responses.
14. **For reusable prompts, add test cases.** Ask for common, edge, and bad
   inputs plus ideal outputs before calling production prompts done.

## Anti-patterns to avoid

- Overlong prompts or long "do not" lists instead of positive target behavior
- One blob mixing task, source data, examples, and output schema
- Asking for certainty or reliable citations without provided/retrieved sources
- Using arbitrary numerical scores where meaningful labels would be clearer
- Asking Jamba to do math or tool work better handled by code or functions
