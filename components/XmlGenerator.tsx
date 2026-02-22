"use client";

import { useState } from "react";
import { Check, Copy, Wand2 } from "lucide-react";

const TAG_FIELDS = [
  {
    key: "context",
    label: "Context",
    placeholder: "Background information, existing code, or relevant files…",
    rows: 4,
  },
  {
    key: "instructions",
    label: "Instructions",
    placeholder: "What should Claude do? Be specific and action-oriented…",
    rows: 3,
  },
  {
    key: "constraints",
    label: "Constraints",
    placeholder: "Restrictions, rules, or things to avoid (one per line)…",
    rows: 3,
  },
  {
    key: "example",
    label: "Example",
    placeholder: "An example of the expected input or output…",
    rows: 3,
  },
  {
    key: "output_format",
    label: "Output Format",
    placeholder: "Describe how Claude should format its response…",
    rows: 2,
  },
] as const;

type FieldKey = (typeof TAG_FIELDS)[number]["key"];

function buildXml(fields: Partial<Record<FieldKey, string>>): string {
  const parts: string[] = [];
  for (const { key } of TAG_FIELDS) {
    const value = fields[key]?.trim();
    if (value) {
      parts.push(`<${key}>\n${value}\n</${key}>`);
    }
  }
  return parts.join("\n\n");
}

export function XmlGenerator() {
  const [fields, setFields] = useState<Partial<Record<FieldKey, string>>>({});
  const [copied, setCopied] = useState(false);

  const generatedXml = buildXml(fields);

  const handleCopy = async () => {
    if (!generatedXml) return;
    await navigator.clipboard.writeText(generatedXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFields({});
    setCopied(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            Fill in your prompt sections
          </h2>
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>

        {TAG_FIELDS.map(({ key, label, placeholder, rows }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <span className="font-mono text-primary text-xs mr-1">
                &lt;{key}&gt;
              </span>
              {label}
            </label>
            <textarea
              rows={rows}
              value={fields[key] ?? ""}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, [key]: e.target.value }))
              }
              placeholder={placeholder}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
            />
          </div>
        ))}
      </div>

      {/* Output Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Generated XML
          </h2>
          <button
            onClick={handleCopy}
            disabled={!generatedXml}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border font-medium transition-all
              ${
                generatedXml
                  ? "border-primary/40 text-primary hover:bg-primary/10"
                  : "border-border text-muted-foreground cursor-not-allowed opacity-50"
              }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy XML
              </>
            )}
          </button>
        </div>

        <div className="code-container min-h-[400px] lg:sticky lg:top-24">
          <div className="flex items-center px-4 py-2 border-b border-white/10 bg-[#161b22]">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-3">
              prompt.xml
            </span>
          </div>
          <pre className="p-4 text-sm leading-relaxed overflow-auto min-h-[350px] text-gray-300 font-mono whitespace-pre-wrap break-words">
            {generatedXml || (
              <span className="text-gray-600 italic">
                {
                  "// Your generated XML will appear here…\n// Start filling in the fields on the left."
                }
              </span>
            )}
          </pre>
        </div>

        {generatedXml && (
          <p className="text-xs text-muted-foreground">
            💡 Paste this directly into Claude's message box or as part of your
            system prompt.
          </p>
        )}
      </div>
    </div>
  );
}
