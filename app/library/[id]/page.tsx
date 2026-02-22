import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { practices } from "@/data/practices";
import { CodeBlock } from "@/components/CodeBlock";
import { PracticeCard } from "@/components/PracticeCard";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return practices.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const practice = practices.find((p) => p.id === params.id);
  if (!practice) return { title: "Not Found" };

  return {
    title: practice.title,
    description: practice.description,
  };
}

const categoryColors: Record<string, string> = {
  Prompting: "text-violet-500",
  "Code Review": "text-blue-500",
  "Project Context": "text-emerald-500",
  "Iterative Debugging": "text-orange-500",
};

export default function PracticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const practice = practices.find((p) => p.id === params.id);

  if (!practice) {
    notFound();
  }

  const relatedPractices = practice.relatedIds
    ?.map((id) => practices.find((p) => p.id === id))
    .filter(Boolean) as typeof practices;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/library"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-sm font-semibold ${categoryColors[practice.category]}`}
          >
            {practice.category}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <span className="text-sm font-medium text-muted-foreground">
            {practice.difficulty}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {practice.title}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {practice.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {practice.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-mono text-muted-foreground"
            >
              <Tag className="h-3.5 w-3.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Core Snippet */}
        <section>
          <div className="flex border-b border-border mb-4 pb-2">
            <h2 className="text-lg font-semibold text-foreground">
              The Strategy
            </h2>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-foreground leading-relaxed">
              {practice.explanation}
            </p>
          </div>
          <div className="bg-card shadow-sm rounded-xl overflow-hidden mt-6">
            <CodeBlock
              code={practice.snippet}
              language="xml"
              filename="prompt.txt"
            />
          </div>
        </section>

        {/* Related Practices */}
        {relatedPractices && relatedPractices.length > 0 && (
          <section className="pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">
              You might also need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPractices.map((related) => (
                <PracticeCard key={related.id} practice={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
