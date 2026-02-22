import { XmlGenerator } from "@/components/XmlGenerator";
import { Code2, Braces } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML Tag Generator",
  description:
    "Generate structured, professional prompts for Claude using XML tags.",
};

export default function XmlGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-6">
          <Braces className="h-3.5 w-3.5 text-primary" />
          The single highest-impact prompting technique
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          XML Tag Generator
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Claude is explicitly trained to recognize XML tags. Using them removes
          ambiguity, separates context from instructions, and allows you to
          create complex, multi-step prompts that yield deterministic results.
        </p>
      </div>

      {/* Main Tool */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm mb-16">
        <XmlGenerator />
      </div>

      {/* Explanation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl pt-8 border-t border-border">
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Code2 className="h-5 w-5 text-violet-500" />
            Why use XML tags?
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • Prevents Claude from confusing instructions with injected
              context code.
            </li>
            <li>
              • Allows you to reference specific sections later (e.g., "Refer to
              the variables defined in &lt;context&gt;...").
            </li>
            <li>
              • Makes complex prompts modular and much easier for humans to read
              and maintain.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Braces className="h-5 w-5 text-emerald-500" />
            Common Tags
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded font-mono text-xs">
              &lt;context&gt;
            </span>
            <span className="px-2 py-1 bg-muted rounded font-mono text-xs">
              &lt;task&gt;
            </span>
            <span className="px-2 py-1 bg-muted rounded font-mono text-xs">
              &lt;example&gt;
            </span>
            <span className="px-2 py-1 bg-muted rounded font-mono text-xs">
              &lt;constraints&gt;
            </span>
            <span className="px-2 py-1 bg-muted rounded font-mono text-xs">
              &lt;instructions&gt;
            </span>
            <span className="px-2 py-1 bg-muted rounded font-mono text-xs">
              &lt;thinking&gt;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
