<div align="right"><b>English</b> | <a href="README.zh.md">中文</a></div>

# Examples — before / after

Each example shows the **same kind of raw prompt** refined for a **different host model**.
Notice the structure changes with the *model running the skill*, not the topic — and the
user's **original language is always preserved**.

---

## 1. Host model: Claude — XML structure, Chinese kept

**Before**
> 帮我分析一下这个市场的竞争格局

**After** (`strategies/anthropic.md`)
```xml
<role>你是一位资深市场分析师，擅长竞争情报。</role>
<task>
分析该市场的竞争格局，覆盖：
1. 主要玩家及其市场地位
2. 竞争动态与趋势
3. 进入壁垒与转换成本
4. 战略建议
</task>
<format>以结构化报告呈现，分节清晰，尽量给出具体数据。</format>
```

---

## 2. Host model: GPT-5.6 — lean outcome and output contract

**Before**
> figure out the time complexity of this function and whether it can be improved

**After** (`strategies/openai.md`)
> Goal: Analyze whether the function's time or space complexity can be improved.
>
> Input:
> ```
> [function]
> ```
>
> Output contract:
> - Define the variables used in the complexity analysis.
> - State current time and space complexity.
> - If an improvement exists, give its complexity and key idea.
> - State any assumption that could change the result.

> Why this shape? GPT-5.6 does not need a chain-of-thought request by default. Keep the
> prompt focused on the outcome and required output. If the surface exposes
> **reasoning effort**, configure it separately based on measured task needs.

---

## 3. Host model: Qwen — natural Chinese, no force-translation

**Before**
> 写个正则匹配中国大陆手机号

**After** (`strategies/qwen.md`)
> 你是一位正则表达式专家。请编写一个匹配中国大陆手机号的正则表达式。
> 要求：
> 1. 匹配 11 位、以 1 开头、第二位为 3–9 的号码
> 2. 给出 Python 和 JavaScript 两种写法
> 3. 附 2 个匹配示例与 2 个不匹配示例
> 输出：每种语言一个代码块，附简要说明。

---

## 4. Host model: Phi (SLM) — stripped down, strict output

**Before**
> can you help me write a function that checks if a string is a palindrome, with comments

**After** (`strategies/microsoft-phi.md`)
> Language: Python 3
> Task: function `is_palindrome(s: str) -> bool`, ignoring case and non-alphanumerics.
> Input example: "A man, a plan, a canal: Panama" → True
> Output: ONLY the function, with brief inline comments.

---

## 5. Host model: Cohere Command — RAG grounding + citations

**Before**
> based on these release notes, what changed in the auth module?

**After** (`strategies/cohere.md`)
> [release notes pasted here, clearly delimited]
>
> Using only the release notes above, summarize what changed in the auth module.
> Cite the specific line(s) you used for each point. If something isn't covered, say so.

## 6. Host model: GPT on Codex — outcome + self-verification

**Before**
> add rate limiting to the API

**After** (`strategies/openai.md`)
> Goal: add rate limiting to the public API endpoints.
> Context: inspect existing middleware and project conventions before editing.
> Success criteria: over-limit requests return HTTP 429; existing behavior still passes;
> targeted tests cover the limit, a burst, and the reset window.
> Authorization: make the requested in-scope local edits and run non-destructive validation.
> Boundaries: preserve unrelated behavior. Do not deploy, publish, or modify external configuration.
> Verification: run the smallest relevant test and lint commands; report the commands and results.

> Why this shape? Codex prompts should name the requested behavior, relevant context,
> constraints, and verification. A plan is useful when the approach itself needs review;
> it is not a required preamble for every implementation.

---

## 7. Host model: Grok — time-bound, multi-perspective analysis

**Before**
> AI startup growth feels like a bubble. Is this real or hype?

**After** (`strategies/xai-grok.md`)
> As of 2026-06-08, evaluate whether current AI startup momentum appears speculative.
>
> Separate your response into: evidence, interpretation, and uncertainty.
>
> Use 3 perspectives:
>
> 1. Business traction (user growth, retention, retention quality)
> 2. Product defensibility (moat, switching costs, unit economics signal)
> 3. Capital efficiency (burn, runway, dilution, and financing quality)
>
> For each perspective:
> - list what is clearly supported by observable facts
> - list what is inference
> - list what is opinion
>
> End with:
> - most-likely scenario
> - bubble-risk scenario
> - key indicators to watch in the next 90 days

---

## 8. Host model: Kimi — Chinese long-context extraction

**Before**
> 帮我看下这份合同哪里有风险

**After** (`strategies/kimi.md`)
> 你是一名合同审阅顾问。请仅基于下方合同文本，提取对我方不利或需要确认的条款。
>
> 重点关注：
> 1. 付款、交付、验收和违约责任
> 2. 单方解除、自动续约、排他或竞业限制
> 3. 模糊表述、缺失定义、缺失期限
>
> 输出为表格：`条款位置 | 风险点 | 为什么有风险 | 建议修改方向`。
> 如果合同文本没有覆盖某项，请写“未见明确约定”，不要补猜。
>
> ```text
> [合同全文]
> ```

---

## 9. Host model: Z.ai GLM - long-horizon coding agent boundaries

**Before**
> build a crawler and dashboard for these supplier pages

**After** (`strategies/zai-glm.md`)
> Goal: build a supplier-page crawler and a small dashboard from the URLs below.
>
> GLM surface: coding agent with tool use and thinking mode enabled.
>
> Done criteria:
> 1. crawler extracts supplier name, product category, price signal, and contact URL
> 2. dashboard groups suppliers by category and flags missing fields
> 3. tests cover one valid page, one missing-price page, and one unreachable page
>
> Tool boundaries: use only the provided URLs and local repo files. Do not invent supplier
> data; mark missing values as `null`.
>
> Stop after implementation and report: changed files, test command, and remaining risks.
>
> ```text
> [supplier URLs]
> ```

---

## 10. Host model: MiniMax M3 - long-context agent with cache-aware layout

**Before**
> review this huge support export and tell me what we should fix

**After** (`strategies/minimax.md`)
> Stable context for cache reuse:
> - Product: B2B analytics dashboard
> - Review goal: find support issues that can reduce enterprise renewal risk
> - Output language: English
>
> Source:
> ```text
> [support ticket export]
> ```
>
> Task: first extract the 10 most relevant ticket clusters with short evidence
> quotes. Then synthesize the top fixes.
>
> Tool policy: use tools only if ticket metadata is missing or inconsistent.
> Do not invent customer facts; mark unknown fields as `null`.
>
> Output format:
> 1. Priority fixes - table with Area, Evidence, Fix, Owner, Risk
> 2. Open questions - bullets, only where source evidence is insufficient
> 3. Verification notes - what was checked and what remains uncertain

---

## 11. Host model: AI21 Jamba - IDH, bounded data, JSON contract

**Before**
> classify these refund messages and put them in a spreadsheet-friendly format

**After** (`strategies/ai21-jamba.md`)
> System: You are a precise customer-support operations analyst.
>
> Instruction: classify each message as `Refund eligible`, `Needs review`, or
> `Not eligible`. If the message lacks enough evidence, use `Needs review`.
>
> Data:
> ```text
> [refund messages]
> ```
> - End of messages -
>
> Hint: return spreadsheet-ready JSON only.
>
> Output JSON fields:
> `{ "message_id": "", "label": "", "reason": "", "missing_evidence": "" }`

---

> These are illustrative. In normal (non-verbose) mode the user never sees the "after" -
> the model answers the refined version directly. Run `/refine verbose` to see the diff
> for your own prompts.
