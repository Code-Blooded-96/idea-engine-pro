import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";

interface FormData {
  domain: string;
  audience: string;
  difficulty: string;
  time_available_days: string;
  skills: string;
  mode: string;
  constraints: string;
}

interface IdeaGeneratorFormProps {
  onGenerate: (data: FormData) => void;
  isLoading: boolean;
}

export const IdeaGeneratorForm = ({ onGenerate, isLoading }: IdeaGeneratorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    domain: "",
    audience: "",
    difficulty: "beginner",
    time_available_days: "2",
    skills: "",
    mode: "Hackathon",
    constraints: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl shadow-glow border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain / Industry</Label>
          <Input
            id="domain"
            placeholder="e.g., education, healthcare, fintech"
            value={formData.domain}
            onChange={(e) => updateField("domain", e.target.value)}
            required
            className="transition-all focus:shadow-glow"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience</Label>
          <Input
            id="audience"
            placeholder="e.g., college students, small businesses"
            value={formData.audience}
            onChange={(e) => updateField("audience", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={formData.difficulty} onValueChange={(value) => updateField("difficulty", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time Available (days)</Label>
          <Input
            id="time"
            type="number"
            min="1"
            max="365"
            value={formData.time_available_days}
            onChange={(e) => updateField("time_available_days", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mode">Project Mode</Label>
          <Select value={formData.mode} onValueChange={(value) => updateField("mode", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hackathon">Hackathon</SelectItem>
              <SelectItem value="Startup">Startup</SelectItem>
              <SelectItem value="Academic">Academic</SelectItem>
              <SelectItem value="Beginner">Beginner Project</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Your Skills</Label>
          <Input
            id="skills"
            placeholder="e.g., React, Python, ML"
            value={formData.skills}
            onChange={(e) => updateField("skills", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="constraints">Constraints / Requirements</Label>
        <Textarea
          id="constraints"
          placeholder="Any specific requirements or constraints? (e.g., no hardware, must use AI, mobile-first)"
          value={formData.constraints}
          onChange={(e) => updateField("constraints", e.target.value)}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 text-lg shadow-glow"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Ideas...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate 3 Project Ideas
          </>
        )}
      </Button>
    </form>
  );
};
