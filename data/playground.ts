export interface PlaygroundEntry {
  id: string;
  title: string;
  description: string;
  naivePrompt: string;
  optimizedPrompt: string;
  result: string;
  language: string;
}

export const playgroundEntries: PlaygroundEntry[] = [
  {
    id: "refactor-function",
    title: "Refactoring a Messy Function",
    description:
      "See how adding structure transforms a vague refactoring request into clean, targeted output.",
    naivePrompt: `Refactor this function:

function processData(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].status == 'active' && d[i].age > 18) {
      r.push({ name: d[i].firstName + ' ' + d[i].lastName, age: d[i].age });
    }
  }
  return r;
}`,
    optimizedPrompt: `<role>
You are a senior TypeScript engineer focused on readability and type safety.
</role>

<task>
Refactor the following JavaScript function. Preserve all behavior exactly.
</task>

<goals>
1. Convert to TypeScript with proper interfaces
2. Replace var with const/let
3. Use array methods instead of for loops
4. Extract magic values into named constants
</goals>

<constraints>
- Do NOT change the function signature semantics
- Do NOT add external libraries
- Do NOT add comments or JSDoc
</constraints>

<code lang="javascript">
function processData(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].status == 'active' && d[i].age > 18) {
      r.push({ name: d[i].firstName + ' ' + d[i].lastName, age: d[i].age });
    }
  }
  return r;
}
</code>`,
    result: `interface RawUser {
  status: string;
  age: number;
  firstName: string;
  lastName: string;
}

interface ProcessedUser {
  name: string;
  age: number;
}

const MINIMUM_AGE = 18;
const ACTIVE_STATUS = "active";

function processData(users: RawUser[]): ProcessedUser[] {
  return users
    .filter(user => user.status === ACTIVE_STATUS && user.age > MINIMUM_AGE)
    .map(user => ({
      name: \`\${user.firstName} \${user.lastName}\`,
      age: user.age,
    }));
}`,
    language: "typescript",
  },
  {
    id: "generate-tests",
    title: "Generating Unit Tests",
    description:
      "Compare a vague test request versus a structured prompt that produces immediately runnable, comprehensive tests.",
    naivePrompt: `Write tests for this function:

export function calculateDiscount(price: number, coupon: string): number {
  if (coupon === 'SAVE10') return price * 0.9;
  if (coupon === 'SAVE20') return price * 0.8;
  if (coupon === 'HALFOFF') return price * 0.5;
  return price;
}`,
    optimizedPrompt: `<role>
You are a test engineer specializing in Vitest and edge case analysis.
</role>

<task>
Write comprehensive unit tests for the function below.
</task>

<requirements>
- Use Vitest (describe, it, expect)
- Cover: all valid coupons, invalid coupon, zero price, negative price, floating point price
- Use descriptive test names (behavior, not implementation)
- Group tests logically in describe blocks
- Include at least one boundary value test
</requirements>

<constraints>
- No external test utilities beyond Vitest
- No mocking required (pure function)
- Return ONLY the test file—no explanation
</constraints>

<code>
export function calculateDiscount(price: number, coupon: string): number {
  if (coupon === 'SAVE10') return price * 0.9;
  if (coupon === 'SAVE20') return price * 0.8;
  if (coupon === 'HALFOFF') return price * 0.5;
  return price;
}
</code>`,
    result: `import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./discount";

describe("calculateDiscount", () => {
  describe("valid coupons", () => {
    it("applies 10% discount for SAVE10", () => {
      expect(calculateDiscount(100, "SAVE10")).toBe(90);
    });

    it("applies 20% discount for SAVE20", () => {
      expect(calculateDiscount(100, "SAVE20")).toBe(80);
    });

    it("applies 50% discount for HALFOFF", () => {
      expect(calculateDiscount(100, "HALFOFF")).toBe(50);
    });
  });

  describe("invalid or missing coupon", () => {
    it("returns original price for unknown coupon", () => {
      expect(calculateDiscount(100, "INVALID")).toBe(100);
    });

    it("returns original price for empty string coupon", () => {
      expect(calculateDiscount(100, "")).toBe(100);
    });
  });

  describe("edge case prices", () => {
    it("handles zero price", () => {
      expect(calculateDiscount(0, "SAVE10")).toBe(0);
    });

    it("handles floating point price", () => {
      expect(calculateDiscount(49.99, "SAVE20")).toBeCloseTo(39.99);
    });

    it("handles negative price (no guard)", () => {
      expect(calculateDiscount(-50, "HALFOFF")).toBe(-25);
    });

    it("handles very large price", () => {
      expect(calculateDiscount(1_000_000, "SAVE10")).toBe(900_000);
    });
  });
});`,
    language: "typescript",
  },
  {
    id: "api-design",
    title: "API Design Advice",
    description:
      "A context-rich prompt with constraints produces opinionated, actionable API design recommendations vs generic patterns.",
    naivePrompt: `How should I design my REST API for a todo app?`,
    optimizedPrompt: `<context>
<project>
- B2C todo app, targeting developers
- Next.js App Router with Route Handlers
- PostgreSQL + Prisma ORM
- Users can have multiple workspaces, each with multiple lists, each with multiple todos
- Team of 2, needs to move fast
</project>
</context>

<task>
Design the REST API for the todo domain. Be opinionated.
</task>

<constraints>
- Follow REST conventions strictly (no RPC-style endpoints)
- Use resource nesting only where it meaningfully reduces ambiguity
- Include HTTP methods, status codes, and example payloads for each endpoint
- Flag any design decisions that require a trade-off discussion
</constraints>

<output_format>
Provide endpoints as a table, then discuss the top 3 trade-offs.
</output_format>`,
    result: `| Method | Endpoint | Description | Success Code |
|--------|----------|-------------|--------------|
| GET | /workspaces | List all workspaces | 200 |
| POST | /workspaces | Create workspace | 201 |
| GET | /workspaces/:id | Get workspace | 200 |
| PATCH | /workspaces/:id | Update workspace name | 200 |
| DELETE | /workspaces/:id | Delete workspace | 204 |
| GET | /workspaces/:id/lists | List all lists | 200 |
| POST | /workspaces/:id/lists | Create list | 201 |
| GET | /lists/:id/todos | List todos | 200 |
| POST | /lists/:id/todos | Create todo | 201 |
| PATCH | /todos/:id | Update todo | 200 |
| DELETE | /todos/:id | Delete todo | 204 |
| PATCH | /todos/:id/complete | Toggle completion | 200 |

**Trade-offs:**

1. **Nesting depth** — Lists are nested under workspaces for creation/listing (clear ownership), but todos are listed under lists and mutated top-level. This avoids /workspaces/:w/lists/:l/todos/:t URLs.

2. **PATCH /todos/:id/complete** — A dedicated sub-resource for completion avoids ambiguity about partial updates. Trade-off: two endpoints instead of one.

3. **Batch operations** — Not included. Add POST /todos/batch-complete for bulk actions once you hit demand.`,
    language: "markdown",
  },
];
