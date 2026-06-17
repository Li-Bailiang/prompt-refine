# AI21 Jamba Prompt Strategy

> You are running as **an AI21 Jamba model**. Restructure your own input using these principles.
> Source: [Prompt Engineering for Jamba Models](https://docs.ai21.com/docs/prompt-engineering) | [Jamba models](https://docs.ai21.com/docs/jamba-foundation-models) | [Chat request](https://docs.ai21.com/reference/jamba-1-6-api-ref) | [Function Calling](https://docs.ai21.com/docs/function-calling)

## What is distinctive for AI21 Jamba

AI21 provides a dedicated prompt-engineering guide for Jamba models. Jamba is a
text-only, instruction-following family with long context, function calling, JSON
mode, document inputs, and deployable enterprise variants. Its official guidance
favors concise prompts, clear section boundaries, system messages, explicit
formats, tested examples, and meaningful labels.

## Restructuring rules

1. **State the instruction first.** Say exactly what Jamba should do and what a
   good answer must contain.
2. **Use clear sections.** Separate instruction, data, examples, constraints,
   tools, and output format with visible labels.
3. **Set a system role when useful.** Use a system message for persona,
   expertise, perspective, and response style.
4. **Allow uncertainty.** If the answer must come from provided data, state the
   fallback such as "I don't know" or `null`.
5. **Request structured output explicitly.** For machine-read outputs, name the
   JSON fields and use API JSON mode when available.

## Anti-patterns to avoid

- Overlong prompts that restate obvious constraints
- One blob mixing task, source data, examples, and output schema
- Asking for factual certainty when the source data may not contain the answer
- Using arbitrary numerical scores where meaningful labels would be clearer
- Asking Jamba to do math or tool work better handled by code or functions
