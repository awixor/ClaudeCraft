import { BeforeAfterPlayground } from "@/components/BeforeAfterPlayground";
import { playgroundEntries } from "@/data/playground";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "See exactly how structured prompts transform naive requests into high-quality code generation.",
};

export default function PlaygroundPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-violet-500" />
          Interactive Playground
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The difference between a "good enough" LLM response and a
          production-grade one usually comes down to prompt structure. Expand
          the examples below to compare approach and output.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 mb-16">
        <BeforeAfterPlayground entries={playgroundEntries} />
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-10 text-center sm:px-12 sm:py-16">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Ready to structure your own prompts?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Use our XML Tag Generator to wrap your tasks, context, and examples in
          Claude-native XML boundaries.
        </p>
        <Link
          href="/xml-generator"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20"
        >
          Open XML Generator
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
