import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Idea {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  tech_stack: string[];
  architecture: string;
  roadmap: Array<{ phase: string; tasks: string[] }>;
  feasibility: {
    technical: number;
    time_days: number;
    market_fit: number;
  };
  persona: string;
  monetization: string;
  task_breakdown: Array<{
    area: string;
    tasks: string[];
    estimated_hours: number;
  }>;
}

interface IdeaCardProps {
  idea: Idea;
  index: number;
}

export const IdeaCard = ({ idea, index }: IdeaCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
# ${idea.title}
${idea.tagline}

## Problem
${idea.problem}

## Solution
${idea.solution}

## Features
${idea.features.map(f => `- ${f}`).join('\n')}

## Tech Stack
${idea.tech_stack.join(', ')}

## Architecture
${idea.architecture}

## Roadmap
${idea.roadmap.map(r => `### ${r.phase}\n${r.tasks.map(t => `- ${t}`).join('\n')}`).join('\n\n')}

## Feasibility
- Technical Difficulty: ${idea.feasibility.technical}/10
- Estimated Time: ${idea.feasibility.time_days} days
- Market Fit Score: ${idea.feasibility.market_fit}/10

## Target Persona
${idea.persona}

## Monetization
${idea.monetization}

## Task Breakdown
${idea.task_breakdown.map(tb => `### ${tb.area.toUpperCase()} (${tb.estimated_hours}h)\n${tb.tasks.map(t => `- ${t}`).join('\n')}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Idea copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(idea, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("JSON downloaded!");
  };

  return (
    <Card className="p-8 space-y-6 animate-fade-in border-primary/20 shadow-glow hover:shadow-xl transition-all">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Idea #{index + 1}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{idea.title}</h2>
            <p className="text-lg text-muted-foreground italic">{idea.tagline}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Feasibility Metrics */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{idea.feasibility.technical}/10</div>
          <div className="text-sm text-muted-foreground">Technical</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{idea.feasibility.time_days} days</div>
          <div className="text-sm text-muted-foreground">Time Est.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{idea.feasibility.market_fit}/10</div>
          <div className="text-sm text-muted-foreground">Market Fit</div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Problem</h3>
          <p className="text-muted-foreground">{idea.problem}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Solution</h3>
          <p className="text-muted-foreground">{idea.solution}</p>
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
        <ul className="space-y-2">
          {idea.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-primary mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {idea.tech_stack.map((tech, idx) => (
            <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Architecture */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Architecture</h3>
        <pre className="bg-secondary/50 p-4 rounded-lg text-sm text-foreground overflow-x-auto">
          {idea.architecture}
        </pre>
      </div>

      {/* Roadmap */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Development Roadmap</h3>
        <div className="space-y-4">
          {idea.roadmap.map((phase, idx) => (
            <div key={idx} className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold text-foreground mb-2">{phase.phase}</h4>
              <ul className="space-y-1">
                {phase.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="text-sm text-muted-foreground">
                    • {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Task Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Task Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {idea.task_breakdown.map((breakdown, idx) => (
            <div key={idx} className="bg-secondary/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground uppercase text-sm">{breakdown.area}</h4>
                <Badge variant="outline" className="text-xs">{breakdown.estimated_hours}h</Badge>
              </div>
              <ul className="space-y-1">
                {breakdown.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="text-sm text-muted-foreground">
                    • {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Persona & Monetization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Target Persona</h3>
          <p className="text-sm text-muted-foreground">{idea.persona}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Monetization</h3>
          <p className="text-sm text-muted-foreground">{idea.monetization}</p>
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopy} variant="outline" className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy All"}
        </Button>
        <Button onClick={handleDownloadJSON} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download JSON
        </Button>
      </div>
    </Card>
  );
};
