"use client";

import { useState, useMemo } from "react";
import { type Practice, type Category } from "@/data/practices";
import { PracticeCard } from "@/components/PracticeCard";
import { FilterChips } from "@/components/FilterChips";
import { SearchBar } from "@/components/SearchBar";
import { FileQuestion } from "lucide-react";

export function LibraryClient({ practices }: { practices: Practice[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const filteredPractices = useMemo(() => {
    return practices.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = category === "All" || p.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [practices, search, category]);

  const counts = useMemo(() => {
    const acc: Partial<Record<Category | "All", number>> = {
      All: practices.length,
    };
    practices.forEach((p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
    });
    return acc;
  }, [practices]);

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full md:w-96">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <FilterChips
            selected={category}
            onChange={setCategory}
            counts={counts}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredPractices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPractices.map((practice) => (
            <PracticeCard key={practice.id} practice={practice} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-card/50">
          <FileQuestion className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            No practices found
          </h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn't find any practices matching your search or filter
            criteria. Try adjusting your terms.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-6 text-sm font-medium text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
