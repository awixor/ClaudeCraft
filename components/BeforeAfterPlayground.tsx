"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { type PlaygroundEntry } from "@/data/playground";
import { ChevronDown, ChevronUp } from "lucide-react";

type TabKey = "naive" | "optimized" | "result";

const tabs: { key: TabKey; label: string; emoji: string; color: string }[] = [
  {
    key: "naive",
    label: "Naive Prompt",
    emoji: "😬",
    color: "text-orange-500",
  },
  {
    key: "optimized",
    label: "Claude-Optimized",
    emoji: "✨",
    color: "text-violet-500",
  },
  { key: "result", label: "Result", emoji: "🎯", color: "text-emerald-500" },
];

interface BeforeAfterPlaygroundProps {
  entries: PlaygroundEntry[];
}

function PlaygroundItem({ entry }: { entry: PlaygroundEntry }) {
  const [activeTab, setActiveTab] = useState<TabKey>("naive");

  const content: Record<TabKey, string> = {
    naive: entry.naivePrompt,
    optimized: entry.optimizedPrompt,
    result: entry.result,
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Entry header */}
      <div className="p-5 border-b border-border">
        <h3 className="font-semibold text-foreground text-lg">{entry.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">
          {entry.description}
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-border bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.key
                ? `border-primary ${tab.color} bg-background`
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span className="hidden sm:inline">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="animate-in">
        <CodeBlock
          code={content[activeTab]}
          language={activeTab === "result" ? entry.language : "text"}
          showCopy={true}
        />
      </div>

      {/* Insight strip */}
      {activeTab === "optimized" && (
        <div className="px-5 py-3 bg-violet-50 dark:bg-violet-900/20 border-t border-violet-200/50 dark:border-violet-800/50">
          <p className="text-xs text-violet-700 dark:text-violet-300">
            <span className="font-semibold">Why this works:</span> XML tags
            create unambiguous sections, role assignment activates domain
            expertise, and explicit constraints prevent unwanted defaults.
          </p>
        </div>
      )}
    </div>
  );
}

export function BeforeAfterPlayground({ entries }: BeforeAfterPlaygroundProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {entries.map((entry, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={entry.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <div>
                <h3 className="font-semibold text-foreground">{entry.title}</h3>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {entry.description}
                </p>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
              )}
            </button>

            {isOpen && (
              <div className="border-t border-border">
                {/* Tab bar */}
                <PlaygroundItem entry={entry} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
