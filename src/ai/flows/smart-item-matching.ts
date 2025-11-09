'use server';

/**
 * @fileOverview A smart item matching AI agent.
 *
 * - smartItemMatching - A function that handles the item matching process.
 * - SmartItemMatchingInput - The input type for the smartItemMatching function.
 * - SmartItemMatchingOutput - The return type for the smartItemMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartItemMatchingInputSchema = z.object({
  lostItemDescription: z.string().describe('The description of the lost item.'),
  lostItemLocation: z.string().describe('The location where the item was lost.'),
  foundItemDescription: z.string().describe('The description of the found item.'),
  foundItemLocation: z.string().describe('The location where the item was found.'),
});
export type SmartItemMatchingInput = z.infer<typeof SmartItemMatchingInputSchema>;

const SmartItemMatchingOutputSchema = z.object({
  matchProbability: z
    .number()
    .describe(
      'The probability that the lost item and found item are the same, on a scale of 0 to 1.'
    ),
  reasoning: z.string().describe('The reasoning behind the match probability.'),
});
export type SmartItemMatchingOutput = z.infer<typeof SmartItemMatchingOutputSchema>;

export async function smartItemMatching(
  input: SmartItemMatchingInput
): Promise<SmartItemMatchingOutput> {
  return smartItemMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartItemMatchingPrompt',
  input: {schema: SmartItemMatchingInputSchema},
  output: {schema: SmartItemMatchingOutputSchema},
  prompt: `You are an AI expert in determining if a lost item and a found item are the same.

You will be given the description and location of a lost item, and the description and location of a found item.

You will output a matchProbability from 0 to 1, where 1 is a perfect match, and 0 is not a match at all.

You will also output reasoning that explains why you chose that matchProbability.

Lost Item Description: {{{lostItemDescription}}}
Lost Item Location: {{{lostItemLocation}}}
Found Item Description: {{{foundItemDescription}}}
Found Item Location: {{{foundItemLocation}}}`,
});

const smartItemMatchingFlow = ai.defineFlow(
  {
    name: 'smartItemMatchingFlow',
    inputSchema: SmartItemMatchingInputSchema,
    outputSchema: SmartItemMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
