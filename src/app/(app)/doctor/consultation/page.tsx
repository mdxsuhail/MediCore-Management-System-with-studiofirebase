"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getConsultationSummary } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, Clipboard, Terminal, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate Summary"}
      <Bot className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function ConsultationToolPage() {
  const initialState = { summary: "", error: "" };
  const [state, formAction] = useFormState(getConsultationSummary, initialState);
  const { toast } = useToast();

  const handleCopy = () => {
    if (state.summary) {
      navigator.clipboard.writeText(state.summary);
      toast({ title: "Copied to clipboard!" });
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Consultation Summary Tool</CardTitle>
          <CardDescription>
            Enter patient consultation notes below to generate a concise summary using AI.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="notes" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Patient Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="e.g., Patient presents with a cough and fever. Onset 3 days ago. Lungs clear on auscultation..."
                rows={15}
                required
              />
            </div>
            {state.error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Summary</CardTitle>
          <CardDescription>
            Review the generated summary below. You can copy it to the clipboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="relative">
                <pre className="p-4 bg-secondary rounded-md whitespace-pre-wrap font-sans text-sm min-h-[300px]">
                    {state.summary || "Summary will appear here..."}
                </pre>
                {state.summary && (
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2"
                        onClick={handleCopy}
                    >
                        <Clipboard className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
