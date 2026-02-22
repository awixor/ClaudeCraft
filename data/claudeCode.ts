export interface CommandEntry {
  id: string;
  command: string;
  description: string;
  usage: string;
  category: "Initialization" | "Context" | "Tools" | "System";
}

export interface ShortcutEntry {
  id: string;
  keys: string[];
  action: string;
  description: string;
}

export interface CustomInstructionEntry {
  id: string;
  title: string;
  filename: string;
  content: string;
  description: string;
}

export const commands: CommandEntry[] = [
  {
    id: "cmd-init",
    command: "/init",
    usage: "/init",
    description:
      "Initializes Claude Code in the current directory, generating a .claudecode file for project context.",
    category: "Initialization",
  },
  {
    id: "cmd-compact",
    command: "/compact",
    usage: "/compact",
    description:
      "Compacts the current conversation to save on context window and token usage. Useful for long sessions.",
    category: "Context",
  },
  {
    id: "cmd-clear",
    command: "/clear",
    usage: "/clear",
    description:
      "Clears the terminal output and conversation history, resetting the context window for a new task.",
    category: "Context",
  },
  {
    id: "cmd-bug",
    command: "/bug",
    usage: "/bug",
    description:
      "Reports a bug or issue directly to the Anthropic team with your recent conversation context.",
    category: "System",
  },
  {
    id: "cmd-help",
    command: "/help",
    usage: "/help",
    description:
      "Displays available commands, shortcuts, and general information about using Claude Code.",
    category: "System",
  },
  {
    id: "cmd-cost",
    command: "/cost",
    usage: "/cost",
    description:
      "Shows the token usage and estimated cost of the current Claude Code session.",
    category: "System",
  },
  {
    id: "cmd-login",
    command: "/login",
    usage: "/login",
    description: "Authenticates your terminal with your Anthropic account.",
    category: "System",
  },
  {
    id: "cmd-logout",
    command: "/logout",
    usage: "/logout",
    description:
      "Logs out from your Anthropic account in the current terminal.",
    category: "System",
  },
  {
    id: "cmd-terminal-setup",
    command: "/terminal-setup",
    usage: "/terminal-setup",
    description:
      "Configures terminal-specific settings for Claude Code, optimizing rendering and shortcuts.",
    category: "System",
  },
  {
    id: "cmd-pr",
    command: "/pr",
    usage: "/pr [optional description]",
    description:
      "Automatically analyzes your recent changes, writes a PR description, and pushes it to a new branch.",
    category: "Tools",
  },
  {
    id: "cmd-review",
    command: "/review",
    usage: "/review",
    description:
      "Reviews your uncommitted code changes and provides constructive AI feedback.",
    category: "Tools",
  },
];

export const shortcuts: ShortcutEntry[] = [
  // General Controls
  {
    id: "sc-accept",
    keys: ["Enter"],
    action: "Send Message",
    description: "Sends the current message to Claude.",
  },
  {
    id: "sc-newline",
    keys: ["Shift", "Enter"],
    action: "New Line",
    description: "Inserts a new line in the input box without sending.",
  },
  {
    id: "sc-escape",
    keys: ["Esc"],
    action: "Stop Action",
    description: "Stops Claude's current generation or action.",
  },
  {
    id: "sc-escape-twice",
    keys: ["Esc", "Esc"],
    action: "Rewind Menu",
    description:
      "Opens history to rewind, undo changes, or revert to checkpoints.",
  },
  {
    id: "sc-interrupt",
    keys: ["Ctrl", "C"],
    action: "Interrupt",
    description: "Cancels current input. Pressing twice exits Claude Code.",
  },
  {
    id: "sc-exit",
    keys: ["Ctrl", "D"],
    action: "Exit",
    description: "Exits the Claude Code session.",
  },
  {
    id: "sc-clear",
    keys: ["Ctrl", "L"],
    action: "Clear Terminal",
    description:
      "Clears the terminal screen while keeping the conversation history.",
  },
  {
    id: "sc-paste-img",
    keys: ["Ctrl", "V"],
    action: "Paste Image",
    description:
      "Pastes images, screenshots, or diagrams directly into the terminal.",
  },
  {
    id: "sc-editor",
    keys: ["Ctrl", "G"],
    action: "Open Editor",
    description:
      "Opens the current prompt in your default text editor for easier editing.",
  },
  {
    id: "sc-bg",
    keys: ["Ctrl", "B"],
    action: "Background Task",
    description: "Backgrounds running tasks like bash commands or agents.",
  },

  // History & Modes
  {
    id: "sc-history-up",
    keys: ["↑"],
    action: "Previous Message",
    description: "Navigates up through your command history.",
  },
  {
    id: "sc-history-down",
    keys: ["↓"],
    action: "Next Message",
    description: "Navigates down through your command history.",
  },
  {
    id: "sc-history-search",
    keys: ["Ctrl", "R"],
    action: "Reverse Search",
    description: "Reverse searches through your command history.",
  },
  {
    id: "sc-tab-complete",
    keys: ["Tab"],
    action: "Autocomplete",
    description: "Autocompletes commands and file paths.",
  },
  {
    id: "sc-mode-switch",
    keys: ["Shift", "Tab"],
    action: "Switch Mode",
    description:
      "Cycles through permission modes (Normal, Auto-Accept/YOLO, Plan).",
  },
  {
    id: "sc-verbose",
    keys: ["Ctrl", "O"],
    action: "Toggle Verbose",
    description: "Toggles verbose mode to display Claude's internal reasoning.",
  },

  // Text Editing
  {
    id: "sc-jump-word",
    keys: ["Option", "→/←"],
    action: "Jump Word",
    description: "Jumps through words in the prompt. (Ctrl + Arrow on Windows)",
  },
  {
    id: "sc-jump-start",
    keys: ["Ctrl", "A"],
    action: "Jump to Start",
    description: "Jumps to the beginning of the line.",
  },
  {
    id: "sc-jump-end",
    keys: ["Ctrl", "E"],
    action: "Jump to End",
    description: "Jumps to the end of the line.",
  },
  {
    id: "sc-del-word",
    keys: ["Ctrl", "W"],
    action: "Delete Word",
    description: "Deletes the preceding word.",
  },
  {
    id: "sc-del-line",
    keys: ["Ctrl", "U"],
    action: "Delete Line",
    description: "Deletes the entire line.",
  },
  {
    id: "sc-del-end",
    keys: ["Ctrl", "K"],
    action: "Delete to End",
    description: "Deletes text from the cursor to the end of the line.",
  },
];

export const customInstructions: CustomInstructionEntry[] = [
  {
    id: "ci-general",
    title: "Project Guidelines",
    filename: ".claudecode",
    description:
      "Create a .claudecode file in the root of your project to set persistent rules, tech stack details, and coding standards for Claude to follow across all sessions.",
    content: `# .claudecode
You are an expert Next.js developer.
Our tech stack:
- Next.js 14 App Router
- Tailwind CSS
- TypeScript strict mode
- React Server Components by default

Rules:
- Never use 'any'. Always type parameters.
- Avoid modifying core configuration unless instructed.
- Always include loading and error states for network calls.`,
  },
  {
    id: "ci-testing",
    title: "Testing Standards",
    filename: ".claudecode",
    description:
      "You can append specific testing requirements to ensure Claude writes tests that match your standard.",
    content: `Testing Rules:
- All new components must have a co-located .test.tsx file using Vitest.
- Include data-testid attributes for interactable elements.
- Mock all network requests using MSW.`,
  },
];
