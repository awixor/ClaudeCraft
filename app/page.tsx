import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  FlaskConical,
  Layers,
  Wand2,
} from "lucide-react";
import { PracticeCard } from "@/components/PracticeCard";
import { practices, topFiveIds } from "@/data/practices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClaudeCraft — Claude Best Practices Gallery",
  description:
    "A curated, interactive gallery of best practices for prompting and collaborating with Claude for software engineering.",
};

const features = [
  {
    icon: BookOpen,
    title: "Best Practice Catalog",
    description:
      "19 carefully crafted entries covering the full development lifecycle.",
    href: "/library",
    color: "text-violet-500",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: FlaskConical,
    title: "Before & After Playground",
    description:
      "See how structured prompts transform naive requests into quality output.",
    href: "/playground",
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Wand2,
    title: "XML Tag Generator",
    description:
      "Generate Claude-optimized XML-structured prompts from your requirements.",
    href: "/xml-generator",
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: Layers,
    title: "Resources",
    description:
      "Official Anthropic docs, guides, and community tools in one place.",
    href: "/resources",
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
];

const topPractices = topFiveIds
  .map((id) => practices.find((p) => p.id === id))
  .filter(Boolean) as typeof practices;

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background gradient orbs */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-400/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-indigo-400/15 to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-8">
            <Code2 className="h-3.5 w-3.5 text-primary" />
            Built for developers who use Claude daily
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Craft better prompts{" "}
            <span className="gradient-text">for Claude</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
            A curated, interactive gallery of engineering best practices—XML
            tagging, system prompts, debugging loops, and more. Stop guessing.
            Start shipping.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              Browse the Library
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/xml-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-muted transition-all"
            >
              <Wand2 className="h-4 w-4 text-primary" />
              XML Generator
            </Link>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.bg}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <div>
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top 5 practices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Top Practices
            </h2>
            <p className="text-muted-foreground mt-1">
              The highest-impact techniques to learn first.
            </p>
          </div>
          <Link
            href="/library"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topPractices.map((practice) => (
            <PracticeCard key={practice.id} practice={practice} featured />
          ))}
        </div>
      </section>
    </div>
  );
}
