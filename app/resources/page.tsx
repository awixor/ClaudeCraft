import { resources } from "@/data/resources";
import {
  ExternalLink,
  BookText,
  Code,
  GraduationCap,
  Users,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Curated links to Anthropic documentation, UI tools, and community learning resources.",
  openGraph: {
    title: "Resources | ClaudeCraft",
    description:
      "Curated links to Anthropic documentation, UI tools, and community learning resources.",
  },
  twitter: {
    title: "Resources | ClaudeCraft",
    description:
      "Curated links to Anthropic documentation, UI tools, and community learning resources.",
  },
};

const categoryIcons = {
  "Official Docs": <BookText className="h-5 w-5 text-blue-500" />,
  Guides: <GraduationCap className="h-5 w-5 text-emerald-500" />,
  Tools: <Code className="h-5 w-5 text-violet-500" />,
  Community: <Users className="h-5 w-5 text-orange-500" />,
} as const;

export default function ResourcesPage() {
  const categories = Array.from(new Set(resources.map((r) => r.category)));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Ecosystem Resources
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The best external resources to level up your Claude skills—ranging
          from official API reference docs to community workflows and CLI tools.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-16">
        {categories.map((category) => {
          const catResources = resources.filter((r) => r.category === category);

          return (
            <section key={category}>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-6">
                {categoryIcons[category]}
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {catResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 rounded-xl border border-border bg-card hover:bg-muted/50 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">
                        {new URL(resource.url).hostname.replace("www.", "")}
                      </span>
                      {resource.free && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                          Free
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
