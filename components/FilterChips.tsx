"use client";

import { type Category } from "@/data/practices";

const categoryColors: Record<string, string> = {
  All: "bg-foreground text-background border-foreground",
  Prompting:
    "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800 dark:hover:bg-violet-900/50",
  "Code Review":
    "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50",
  "Project Context":
    "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-900/50",
  "Iterative Debugging":
    "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800 dark:hover:bg-orange-900/50",
};

const inactiveBase =
  "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground";

interface FilterChipsProps {
  selected: Category | "All";
  onChange: (category: Category | "All") => void;
  counts?: Partial<Record<Category | "All", number>>;
}

export function FilterChips({ selected, onChange, counts }: FilterChipsProps) {
  const categories: (Category | "All")[] = [
    "All",
    "Prompting",
    "Code Review",
    "Project Context",
    "Iterative Debugging",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
              isActive ? categoryColors[cat] : inactiveBase
            }`}
          >
            {cat}
            {counts && counts[cat] !== undefined && (
              <span
                className={`text-xs font-mono rounded-full px-1.5 py-0.5 ${
                  isActive ? "bg-white/20" : "bg-muted-foreground/10"
                }`}
              >
                {counts[cat]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
