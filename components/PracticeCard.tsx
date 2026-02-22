import Link from "next/link";
import { ArrowRight, Tag, Star } from "lucide-react";
import { type Practice } from "@/data/practices";

const categoryColors: Record<string, string> = {
  Prompting:
    "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
  "Code Review":
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  "Project Context":
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  "Iterative Debugging":
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
};

const difficultyColors: Record<string, string> = {
  Beginner:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  Intermediate:
    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
  Advanced:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

interface PracticeCardProps {
  practice: Practice;
  featured?: boolean;
}

export function PracticeCard({
  practice,
  featured = false,
}: PracticeCardProps) {
  return (
    <Link href={`/library/${practice.id}`} className="group block h-full">
      <div
        className={`h-full flex flex-col p-5 rounded-xl border border-border bg-card card-hover
          ${featured ? "shadow-sm ring-1 ring-primary/20" : ""}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className={`tag border ${categoryColors[practice.category]}`}>
              {practice.category}
            </span>
            <span
              className={`tag border ${difficultyColors[practice.difficulty]}`}
            >
              {practice.difficulty}
            </span>
          </div>
          {featured && (
            <Star className="h-4 w-4 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors">
          {practice.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
          {practice.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {practice.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs text-muted-foreground font-mono"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          View snippet
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
