export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "Official Docs" | "Guides" | "Tools" | "Community";
  free: boolean;
}

export const resources: Resource[] = [
  {
    id: "anthropic-docs",
    title: "Anthropic Claude Documentation",
    description:
      "Official documentation covering Claude's capabilities, API reference, and best practices directly from Anthropic.",
    url: "https://docs.anthropic.com",
    category: "Official Docs",
    free: true,
  },
  {
    id: "prompt-library",
    title: "Anthropic Prompt Library",
    description:
      "A curated collection of optimized prompts for common tasks, maintained by Anthropic's team.",
    url: "https://docs.anthropic.com/en/prompt-library/library",
    category: "Official Docs",
    free: true,
  },
  {
    id: "anthropic-cookbook",
    title: "Anthropic Cookbook",
    description:
      "Code recipes and examples demonstrating best practices for building with Claude—includes RAG, tool use, and multi-agent patterns.",
    url: "https://github.com/anthropics/anthropic-cookbook",
    category: "Official Docs",
    free: true,
  },
  {
    id: "claude-api-ref",
    title: "Claude API Reference",
    description:
      "Complete API reference for the Claude API including Messages, streaming, tool use, and vision capabilities.",
    url: "https://docs.anthropic.com/en/api/getting-started",
    category: "Official Docs",
    free: true,
  },
  {
    id: "prompt-engineering-guide",
    title: "Anthropic Prompt Engineering Guide",
    description:
      "Anthropic's official guide covering XML tags, system prompts, chain-of-thought, and advanced prompting techniques.",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    category: "Guides",
    free: true,
  },
  {
    id: "learnprompting",
    title: "Learn Prompting",
    description:
      "Open-source guide to prompt engineering concepts applicable across all LLMs, with Claude-specific sections.",
    url: "https://learnprompting.org",
    category: "Guides",
    free: true,
  },
  {
    id: "promptingguide",
    title: "Prompt Engineering Guide (DAIR.AI)",
    description:
      "Comprehensive research-backed guide covering techniques from zero-shot to chain-of-thought and beyond.",
    url: "https://www.promptingguide.ai",
    category: "Guides",
    free: true,
  },
  {
    id: "claude-dev",
    title: "Claude Dev (Cline)",
    description:
      "Open-source VS Code extension that integrates Claude into your IDE for autonomous coding tasks.",
    url: "https://github.com/cline/cline",
    category: "Tools",
    free: true,
  },
  {
    id: "aider",
    title: "Aider",
    description:
      "AI pair programming in your terminal. Works with Claude 3.5 Sonnet and supports multi-file edits with git integration.",
    url: "https://aider.chat",
    category: "Tools",
    free: true,
  },
  {
    id: "anthropic-discord",
    title: "Anthropic Discord",
    description:
      "Official Anthropic community Discord server for developers building with Claude.",
    url: "https://discord.gg/anthropic",
    category: "Community",
    free: true,
  },
  {
    id: "claude-reddit",
    title: "r/ClaudeAI",
    description:
      "Community subreddit for Claude users sharing tips, prompts, and use cases.",
    url: "https://reddit.com/r/ClaudeAI",
    category: "Community",
    free: true,
  },
];
