"use client";

import { useState } from "react";

export default function TerminalComponent() {
  const [lines, setLines] = useState<string[]>(["Welcome to Wonderland Terminal"]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setLines(prev => [...prev, `> ${cmd}`]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });

      const data = await res.json();
      setLines(prev => [...prev, data.output || "No response"]);
    } catch (err) {
      setLines(prev => [...prev, "Error connecting to agent"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono h-full p-2 overflow-y-auto rounded-lg">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}

      <div className="flex mt-2">
        <span className="mr-2">$</span>
        <input
          className="flex-1 bg-transparent outline-none text-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
          placeholder={loading ? "Running..." : "Enter command"}
          disabled={loading}
        />
      </div>
    </div>
  );
}
