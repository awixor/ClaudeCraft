import { commands, shortcuts, customInstructions } from "@/data/claudeCode";
import { Terminal, Keyboard, FileText, Command } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code in Action",
  description:
    "Best practices, commands, shortcuts, and custom instructions for Claude Code.",
};

export default function ClaudeCodePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-6">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          Terminal Integration
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Claude Code in Action
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Integrate Claude Code directly into your development workflow. Learn
          the essential slash commands, keyboard shortcuts, and configuration
          files to master terminal-based AI pair programming.
        </p>
      </div>

      <div className="space-y-16">
        {/* Commands Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <Command className="h-6 w-6 text-violet-500" />
            Slash Commands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commands.map((cmd) => (
              <div
                key={cmd.id}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <code className="text-sm font-bold text-primary px-2 py-1 bg-primary/10 rounded">
                    {cmd.command}
                  </code>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {cmd.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cmd.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Shortcuts Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <Keyboard className="h-6 w-6 text-orange-500" />
            Keyboard Shortcuts
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Shortcut</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {shortcuts.map((sc) => (
                  <tr key={sc.id} className="text-foreground">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1.5">
                        {sc.keys.map((key, i) => (
                          <kbd
                            key={i}
                            className="px-2 py-1 rounded border border-border bg-muted/80 text-xs font-mono font-medium shadow-sm"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{sc.action}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {sc.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Custom Instructions Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-emerald-500" />
            Custom Instructions
          </h2>
          <p className="text-muted-foreground mb-6">
            Help Claude understand your project by providing persistent
            instructions.
          </p>
          <div className="space-y-6">
            {customInstructions.map((ci) => (
              <div
                key={ci.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="p-5 border-b border-border bg-muted/20">
                  <h3 className="font-semibold text-foreground text-lg">
                    {ci.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ci.description}
                  </p>
                </div>
                <div className="p-4 bg-card">
                  <CodeBlock
                    code={ci.content}
                    filename={ci.filename}
                    language="markdown"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
