'use server';
/**
 * @fileOverview A consultation summary generator AI agent.
 *
 * - generateConsultationSummary - A function that generates a consultation summary.
 * - GenerateConsultationSummaryInput - The input type for the generateConsultationSummary function.
 * - GenerateConsultationSummaryOutput - The return type for the generateConsultationSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConsultationSummaryInputSchema = z.object({
  notes: z.string().describe('The notes from the patient consultation.'),
});
export type GenerateConsultationSummaryInput = z.infer<
  typeof GenerateConsultationSummaryInputSchema
>;

const GenerateConsultationSummaryOutputSchema = z.object({
  summary: z.string().describe('The summary of the patient consultation.'),
});
export type GenerateConsultationSummaryOutput = z.infer<
  typeof GenerateConsultationSummaryOutputSchema
>;

export async function generateConsultationSummary(
  input: GenerateConsultationSummaryInput
): Promise<GenerateConsultationSummaryOutput> {
  return generateConsultationSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConsultationSummaryPrompt',
  input: {schema: GenerateConsultationSummaryInputSchema},
  output: {schema: GenerateConsultationSummaryOutputSchema},
  prompt: `You are an expert medical summarizer.  You will generate a concise and accurate summary of a patient consultation based on the provided notes.\n\nNotes: {{{notes}}}`,
});

const generateConsultationSummaryFlow = ai.defineFlow(
  {
    name: 'generateConsultationSummaryFlow',
    inputSchema: GenerateConsultationSummaryInputSchema,
    outputSchema: GenerateConsultationSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
