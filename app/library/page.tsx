import type { Metadata } from "next";
import { LibraryClient } from "./LibraryClient";
import { practices } from "@/data/practices";

export const metadata: Metadata = {
  title: "Library",
  description:
    "Browse every Claude best practice, filtered by category and difficulty.",
};

export default function LibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Best Practice Library
        </h1>
        <p className="text-muted-foreground text-lg mt-2 max-w-2xl">
          Every technique you need to get production-quality output from Claude,
          organized by skill level and development lifecycle stage.
        </p>
      </div>

      <LibraryClient practices={practices} />
    </div>
  );
}
