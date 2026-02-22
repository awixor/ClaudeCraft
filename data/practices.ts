export type Category =
  | "Prompting"
  | "Code Review"
  | "Project Context"
  | "Iterative Debugging";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Practice {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  snippet: string;
  tags: string[];
  explanation: string;
  relatedIds?: string[];
}

export const practices: Practice[] = [
  {
    id: "xml-tagging",
    title: "Use XML Tags for Structure",
    category: "Prompting",
    difficulty: "Beginner",
    description:
      "Claude is specifically trained to recognize and parse XML tags to separate instructions from content. Wrapping your prompt in named sections removes ambiguity.",
    snippet: `<context>
[Paste your code or relevant background here]
</context>

<task>
Refactor this for readability. Focus on:
- Extracting magic numbers into named constants
- Improving function naming
- Adding JSDoc comments
</task>`,
    tags: ["xml", "structure", "clarity"],
    explanation:
      "Without XML tags, Claude must guess where context ends and instructions begin. With tags like `<context>`, `<task>`, and `<constraints>`, you create an unambiguous contract that dramatically improves output quality.",
    relatedIds: ["system-prompts", "chain-of-thought"],
  },
  {
    id: "system-prompts",
    title: "Write Effective System Prompts",
    category: "Prompting",
    difficulty: "Beginner",
    description:
      "A well-crafted system prompt defines Claude's role, output format, and constraints before any user turn—ensuring consistent, high-quality responses.",
    snippet: `You are an expert TypeScript engineer specializing in React and Next.js.

Rules:
- Always use functional components with TypeScript generics
- Prefer composition over inheritance
- Include error boundaries where applicable
- Output only the requested code—no preamble or postamble
- Use Tailwind CSS for styling unless told otherwise`,
    tags: ["system-prompt", "role", "constraints"],
    explanation:
      "System prompts anchor every response to your standards. Define the persona, output format, constraints, and style guide once—and Claude will apply them consistently across the conversation.",
    relatedIds: ["xml-tagging", "output-format"],
  },
  {
    id: "chain-of-thought",
    title: "Elicit Chain-of-Thought Reasoning",
    category: "Prompting",
    difficulty: "Intermediate",
    description:
      'Tell Claude to "think step by step" or use `<thinking>` tags to get more accurate answers for complex problems.',
    snippet: `<task>
Analyze the following algorithm and determine its time complexity.
Think through each step carefully before giving your final answer.
</task>

<code>
function findDuplicates(arr: number[]): number[] {
  const seen = new Set<number>();
  const duplicates: number[] = [];
  for (const n of arr) {
    if (seen.has(n)) duplicates.push(n);
    else seen.add(n);
  }
  return duplicates;
}
</code>

<output_format>
1. Step-by-step reasoning
2. Final complexity (Big-O)
3. Space complexity
</output_format>`,
    tags: ["reasoning", "chain-of-thought", "analysis"],
    explanation:
      "Complex analytical tasks benefit enormously from explicit reasoning chains. Forcing step-by-step output reduces hallucinations because each step is constrained by the previous one.",
    relatedIds: ["xml-tagging", "constraints"],
  },
  {
    id: "output-format",
    title: "Specify Output Format Explicitly",
    category: "Prompting",
    difficulty: "Beginner",
    description:
      "Tell Claude exactly what structure you want: JSON, Markdown, TypeScript types, numbered lists—avoid post-processing by baking format into the prompt.",
    snippet: `<task>
Extract all action items from the meeting notes below.
</task>

<notes>
[Paste notes here]
</notes>

<output_format>
Return a JSON array. Each item must have:
- "owner": string (name of the person responsible)
- "action": string (what they need to do)
- "due": string (due date, or "unspecified")
- "priority": "high" | "medium" | "low"

Return ONLY the JSON array—no markdown fences, no explanation.
</output_format>`,
    tags: ["json", "format", "structured-output"],
    explanation:
      "Unspecified output formats force you to write parsing code. Explicit format instructions mean Claude's output slots directly into your application or workflow.",
    relatedIds: ["xml-tagging", "constraints"],
  },
  {
    id: "constraints",
    title: "Use Negative Constraints",
    category: "Prompting",
    difficulty: "Beginner",
    description:
      'Tell Claude what NOT to do. "Do not add comments", "Do not use any external libraries" — negative constraints are just as powerful as positive ones.',
    snippet: `<task>
Implement a debounce function in plain JavaScript.
</task>

<constraints>
- Do NOT use lodash or any external library
- Do NOT use class syntax
- Do NOT include JSDoc or comments
- DO make it work with TypeScript generics
- DO return the debounced function with a .cancel() method
</constraints>`,
    tags: ["constraints", "guardrails", "focused-output"],
    explanation:
      "Claude's default behavior is often to add comments, import helpers, and explain what it did. Negative constraints prune these default behaviors when you need clean, precise output.",
    relatedIds: ["xml-tagging", "output-format"],
  },
  {
    id: "few-shot",
    title: "Provide Few-Shot Examples",
    category: "Prompting",
    difficulty: "Intermediate",
    description:
      "Giving 2–3 examples of input → output pairs is the fastest way to calibrate Claude's style, tone, and format without lengthy explanations.",
    snippet: `<task>
Write a Git commit message for the diff below.
Follow the examples exactly.
</task>

<examples>
<example>
<diff>Added null check before user.profile access</diff>
<commit>fix(auth): guard against null user profile on login</commit>
</example>
<example>
<diff>Extracted color tokens into design-tokens.ts</diff>
<commit>refactor(design): centralize color tokens into dedicated file</commit>
</example>
</examples>

<diff>
[Your diff here]
</diff>`,
    tags: ["few-shot", "examples", "calibration"],
    explanation:
      'Few-shot prompting is more reliable than lengthy instructions for style calibration. The model "pattern matches" against your examples rather than interpreting abstract rules.',
    relatedIds: ["output-format", "xml-tagging"],
  },
  {
    id: "bug-finding",
    title: "Ask Claude to Find Bugs (Not Just Review)",
    category: "Code Review",
    difficulty: "Beginner",
    description:
      "Separate your code review asks. Instead of a vague 'review this', ask specifically for security vulnerabilities, logical errors, or race conditions.",
    snippet: `<role>
You are a security-focused code reviewer.
</role>

<task>
Analyze the following code for security vulnerabilities only.
Do NOT suggest style improvements or refactors.
</task>

<focus_areas>
- SQL/NoSQL injection
- Authentication bypasses
- Insecure deserialization
- Exposed secrets
- Path traversal
</focus_areas>

<code>
[Paste code here]
</code>

<output_format>
For each vulnerability found:
1. Severity: Critical | High | Medium | Low
2. Location: line number and function name
3. Issue: one sentence description
4. Fix: minimal code patch
</output_format>`,
    tags: ["security", "code-review", "bugs"],
    explanation:
      "A single 'review this code' prompt gets you a mix of style notes and actual bugs. Focused prompts with explicit review criteria yield actionable, prioritized findings.",
    relatedIds: ["refactoring", "output-format"],
  },
  {
    id: "refactoring",
    title: "Structure Refactoring Requests",
    category: "Code Review",
    difficulty: "Intermediate",
    description:
      "Good refactoring prompts specify goals (readability, performance, testability), preserve behavior explicitly, and constrain scope.",
    snippet: `<task>
Refactor the following function. Preserve all existing behavior.
</task>

<goals>
1. Improve readability—extract complex conditions into named variables
2. Improve testability—avoid hidden side effects
3. Reduce nesting depth to max 2 levels
</goals>

<do_not>
- Do not change the function signature
- Do not add new dependencies
- Do not change error handling behavior
</do_not>

<code>
[Paste code here]
</code>`,
    tags: ["refactoring", "readability", "testability"],
    explanation:
      "Without explicit goals and constraints, refactoring requests produce rewrites that change behavior or introduce new patterns. Anchoring to specific goals keeps Claude focused.",
    relatedIds: ["bug-finding", "constraints"],
  },
  {
    id: "code-explanation",
    title: "Get Layered Code Explanations",
    category: "Code Review",
    difficulty: "Beginner",
    description:
      "Request explanations at multiple levels of abstraction in a single prompt—from high-level purpose down to specific implementation details.",
    snippet: `<task>
Explain the following code at three levels:
</task>

<code>
[Paste code here]
</code>

<output_format>
## Level 1: ELI5 (one paragraph, no jargon)
## Level 2: Technical Summary (for a mid-level engineer)
## Level 3: Implementation Details (line-by-line for critical sections)
</output_format>`,
    tags: ["explanation", "understanding", "documentation"],
    explanation:
      "A single explanation level rarely satisfies all readers. Requesting layered explanations in one prompt saves round-trips and makes the output useful for different audiences.",
    relatedIds: ["chain-of-thought", "output-format"],
  },
  {
    id: "pr-description",
    title: "Generate Pull Request Descriptions",
    category: "Code Review",
    difficulty: "Beginner",
    description:
      "Feed Claude a diff and a PR template to generate structured, high-quality PR descriptions that actually help reviewers.",
    snippet: `<task>
Generate a pull request description from the git diff below.
</task>

<template>
## What changed
[bullet list of changes]

## Why
[business or technical motivation]

## How to test
[step-by-step testing instructions]

## Screenshots (if UI change)
[placeholder]

## Checklist
- [ ] Tests added or updated
- [ ] Documentation updated
- [ ] No secrets committed
</template>

<diff>
[Paste git diff here]
</diff>`,
    tags: ["git", "pull-request", "documentation"],
    explanation:
      "Consistently great PR descriptions improve review velocity. Using a template forces Claude to produce structured output that matches your team's review process.",
    relatedIds: ["output-format", "code-explanation"],
  },
  {
    id: "repo-map",
    title: "Provide a Repo Map for Large Codebases",
    category: "Project Context",
    difficulty: "Intermediate",
    description:
      "When your codebase is too large to paste, generate a file tree and include it as context so Claude understands your project structure.",
    snippet: `<context>
<repo_map>
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # Route handlers
│   ├── (auth)/            # Auth-related pages (grouped route)
│   └── dashboard/         # Dashboard feature
├── components/
│   ├── ui/                # Generic UI primitives
│   └── features/          # Feature-specific components
├── lib/
│   ├── db.ts              # Prisma client singleton
│   └── auth.ts            # NextAuth configuration
└── types/
    └── index.ts           # Shared TypeScript types
</repo_map>
</context>

<task>
Given this structure, where should I put a new
"NotificationService" class that sends emails?
</task>`,
    tags: ["repo-map", "file-tree", "architecture"],
    explanation:
      "Without structural context, Claude defaults to generic patterns. A repo map grounds its suggestions in your actual conventions, making recommendations actionable and idiomatic.",
    relatedIds: ["incremental-context", "multi-file"],
  },
  {
    id: "incremental-context",
    title: "Feed Context Incrementally",
    category: "Project Context",
    difficulty: "Intermediate",
    description:
      "For very large codebases, add files one by one per round-trip rather than dumping everything at once—this reduces noise and token waste.",
    snippet: `// Round 1: Establish the goal
<task>
I need to add JWT refresh token rotation to my Express API.
Ask me for the files you need to see before suggesting changes.
</task>

// Round 2 (after Claude asks): Provide auth middleware
<file name="middleware/auth.ts">
[File contents here]
</file>

// Round 3: Provide the user model
<file name="models/User.ts">
[File contents here]
</file>`,
    tags: ["context-management", "incremental", "token-efficiency"],
    explanation:
      "Dumping an entire codebase wastes tokens on irrelevant files. Asking Claude what it needs and providing files on demand produces more focused, accurate suggestions.",
    relatedIds: ["repo-map", "multi-file"],
  },
  {
    id: "multi-file",
    title: "Reference Multiple Files in Context",
    category: "Project Context",
    difficulty: "Intermediate",
    description:
      "Use named `<file>` tags to pass multiple files at once, making cross-file relationships explicit for Claude.",
    snippet: `<context>
<file name="types/User.ts">
export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}
</file>

<file name="services/UserService.ts">
[File contents here]
</file>

<file name="routes/users.ts">
[File contents here]
</file>
</context>

<task>
Identify all places where the User type is used inconsistently
and suggest fixes.
</task>`,
    tags: ["multi-file", "context", "type-consistency"],
    explanation:
      "Named file tags let Claude track the origin of each piece of code, making cross-file analysis accurate. Without names, Claude loses track of which code came from where.",
    relatedIds: ["repo-map", "incremental-context"],
  },
  {
    id: "architecture-advice",
    title: "Get Architecture Advice with Trade-offs",
    category: "Project Context",
    difficulty: "Advanced",
    description:
      "Frame architecture questions with your constraints to get opinionated, trade-off-aware recommendations instead of generic patterns.",
    snippet: `<context>
<project>
- B2B SaaS, ~50 enterprise customers
- Next.js frontend, Node.js API, PostgreSQL
- Team of 4 engineers, strong TypeScript skills
- Must support multi-tenancy (row-level security)
</project>
</context>

<task>
We need to add a real-time notification system.
Evaluate these options given our constraints:
1. Server-Sent Events (SSE)
2. WebSockets with Socket.io
3. Long polling
4. Dedicated service (Pusher/Ably)
</task>

<output_format>
For each option: pros, cons, fit for our constraints (1-10), recommendation.
End with a single clear recommendation with reasoning.
</output_format>`,
    tags: ["architecture", "trade-offs", "decision"],
    explanation:
      "Generic architecture advice is useless. Embedding your specific constraints (team size, stack, scale) forces Claude to reason about your situation rather than giving textbook answers.",
    relatedIds: ["repo-map", "chain-of-thought"],
  },
  {
    id: "error-fix-verify",
    title: "The Error → Fix → Verify Loop",
    category: "Iterative Debugging",
    difficulty: "Beginner",
    description:
      "Structure debugging sessions as a tight loop: paste the error, get a fix, verify with the exact command, repeat.",
    snippet: `// Step 1: Paste the full error
<error>
TypeError: Cannot read properties of undefined (reading 'map')
  at ProductList (/app/components/ProductList.tsx:12:25)
  at renderWithHooks (react-dom.development.js:14985)
</error>

<code>
// ProductList.tsx
export function ProductList({ products }) {
  return products.map(p => <div key={p.id}>{p.name}</div>);
}
</code>

// Step 2: Claude provides fix
// Step 3: You run: npm run dev — paste any new error
// Repeat until clean`,
    tags: ["debugging", "errors", "loop"],
    explanation:
      "Describing bugs in prose is imprecise. Pasting exact error messages with stack traces gives Claude the ground truth it needs to produce correct fixes rather than guesses.",
    relatedIds: ["hypothesis-driven", "test-debug"],
  },
  {
    id: "hypothesis-driven",
    title: "Hypothesis-Driven Debugging",
    category: "Iterative Debugging",
    difficulty: "Intermediate",
    description:
      "Ask Claude to generate a ranked list of hypotheses for a bug before jumping to fixes—this avoids treating symptoms instead of root causes.",
    snippet: `<task>
Generate a ranked list of hypotheses for why this bug might occur.
Do NOT suggest fixes yet.
</task>

<symptom>
Users report that the "Save" button occasionally does nothing
when clicking rapidly. Network tab shows no request is sent.
Console is clean. Happens ~20% of the time.
</symptom>

<code>
[Paste relevant handler code]
</code>

<output_format>
For each hypothesis:
- Likelihood: High | Medium | Low
- Root cause: one sentence
- How to verify: a specific test or log statement
</output_format>`,
    tags: ["debugging", "root-cause", "hypothesis"],
    explanation:
      "Jumping to fixes without understanding the root cause leads to whack-a-mole debugging. Forcing a hypothesis phase makes Claude reason about the problem space before proposing solutions.",
    relatedIds: ["error-fix-verify", "test-debug"],
  },
  {
    id: "test-debug",
    title: "Generate Tests to Isolate Bugs",
    category: "Iterative Debugging",
    difficulty: "Intermediate",
    description:
      "Ask Claude to generate a failing unit test that reproduces a bug before fixing it—this creates a regression guard and clarifies the exact failure mode.",
    snippet: `<task>
Write a failing unit test that reproduces this bug.
Use Vitest. Do NOT fix the bug—only reproduce it.
</task>

<bug_description>
The formatCurrency function returns "$NaN" when the input
is a string-formatted number like "1234.56" instead of 1234.56.
</bug_description>

<code>
export function formatCurrency(amount: number): string {
  return "$" + amount.toFixed(2);
}
</code>`,
    tags: ["testing", "tdd", "regression"],
    explanation:
      'Writing a failing test before a fix is classical TDD. With Claude, this two-step process is fast and ensures you have a regression guard. The test also clarifies the "done" criterion.',
    relatedIds: ["error-fix-verify", "hypothesis-driven"],
  },
  {
    id: "prompt-iteration",
    title: "Iterate on Prompts, Not Outputs",
    category: "Iterative Debugging",
    difficulty: "Advanced",
    description:
      "When Claude's output is wrong, most people re-run or rephrase the same prompt. Instead, diagnose WHY it failed and add a targeted constraint.",
    snippet: `// Bad iteration (repeating yourself):
"Try again but make it better"

// Good iteration (targeted fix):

// Observation: Claude added unnecessary comments
// Targeted constraint added:
<constraints>
<add>Do NOT include any inline comments or JSDoc</add>
</constraints>

// Observation: Claude used a class instead of a function
// Targeted constraint added:
<constraints>
<add>Use only arrow function expressions—no class keyword permitted</add>
</constraints>`,
    tags: ["iteration", "debugging-prompts", "refinement"],
    explanation:
      "Vague re-runs produce random variation. Diagnosing exactly what went wrong and adding a precise negative constraint gives you deterministic improvement, not a slot machine.",
    relatedIds: ["constraints", "error-fix-verify"],
  },
  {
    id: "context-window-mgmt",
    title: "Manage Context Window Strategically",
    category: "Project Context",
    difficulty: "Advanced",
    description:
      "Long conversations degrade Claude's attention to early context. Use summarization checkpoints to reset while preserving key decisions.",
    snippet: `<task>
Summarize everything we've decided so far in this session
so I can start a fresh conversation with full context.
</task>

<output_format>
## Decisions Made
[bullet list of architectural/technical decisions]

## Code Written
[key snippets or function signatures decided on]

## Open Questions
[unresolved items]

## Next Steps
[what we planned to do next]
</output_format>`,
    tags: ["context-window", "summarization", "long-sessions"],
    explanation:
      "Context window degradation is real. Periodically summarizing the session state lets you start a fresh conversation without losing decisions—especially critical in long debugging sessions.",
    relatedIds: ["incremental-context", "repo-map"],
  },
  {
    id: "persona-assignment",
    title: "Assign Expert Personas",
    category: "Prompting",
    difficulty: "Beginner",
    description:
      'Telling Claude to act as a specific expert (e.g., "You are a senior database architect") consistently improves response depth and accuracy.',
    snippet: `You are a senior database architect with 15 years of experience
designing high-scale PostgreSQL systems.

Your communication style:
- Lead with the trade-off, not just the recommendation
- Cite PostgreSQL version-specific behavior where relevant
- Push back if the user's approach has fundamental flaws
- Be concise—no introductory fluff

<question>
Should I use JSONB or a normalized schema for user preferences
that vary per customer?
</question>`,
    tags: ["persona", "role", "depth"],
    explanation:
      "Persona assignment activates domain-specific knowledge patterns in Claude's training. Combined with explicit communication style rules, it produces expert-level responses rather than generic Wikipedia-level explanations.",
    relatedIds: ["system-prompts", "constraints"],
  },
];

export const categories: (Category | "All")[] = [
  "All",
  "Prompting",
  "Code Review",
  "Project Context",
  "Iterative Debugging",
];

export const topFiveIds = [
  "xml-tagging",
  "system-prompts",
  "error-fix-verify",
  "repo-map",
  "few-shot",
];
