"use server";

import { generateConsultationSummary } from "@/ai/flows/consultation-summary-generator";
import { z } from "zod";

const ConsultationNotesSchema = z.object({
  notes: z.string().min(10, "Notes must be at least 10 characters long."),
});

type State = {
  summary?: string;
  error?: string;
};

export async function getConsultationSummary(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = ConsultationNotesSchema.safeParse({
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.notes?.join(", "),
    };
  }

  try {
    const result = await generateConsultationSummary({
      notes: validatedFields.data.notes,
    });
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate summary. Please try again." };
  }
}
