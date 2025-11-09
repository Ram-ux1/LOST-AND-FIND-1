'use server';

/**
 * @fileOverview This file defines a Genkit flow for evaluating a submitted claim and suggesting an appropriate workflow based on the claim's attributes.
 *
 * - evaluateClaimWorkflow - The main function that evaluates the claim and suggests a workflow.
 * - EvaluateClaimInput - The input type for the evaluateClaimWorkflow function.
 * - EvaluateClaimOutput - The output type for the evaluateClaimWorkflow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateClaimInputSchema = z.object({
  claimDetails: z
    .string()
    .describe('Details of the claim submitted by the user.'),
  itemDetails: z
    .string()
    .describe('Details of the item for which the claim is submitted.'),
  userDetails: z
    .string()
    .describe('Details of the user submitting the claim.'),
});
export type EvaluateClaimInput = z.infer<typeof EvaluateClaimInputSchema>;

const EvaluateClaimOutputSchema = z.object({
  suggestedWorkflow: z
    .string()
    .describe(
      'A suggested workflow for handling the claim, based on the provided details. Options include: MANUAL_REVIEW, AUTO_APPROVE, AUTO_REJECT, ESCALATE.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested workflow.'),
});
export type EvaluateClaimOutput = z.infer<typeof EvaluateClaimOutputSchema>;

export async function evaluateClaim(input: EvaluateClaimInput): Promise<EvaluateClaimOutput> {
  return evaluateClaimWorkflow(input);
}

const evaluateClaimPrompt = ai.definePrompt({
  name: 'evaluateClaimPrompt',
  input: {schema: EvaluateClaimInputSchema},
  output: {schema: EvaluateClaimOutputSchema},
  prompt: `You are an AI assistant helping to automate the claim evaluation process for a lost and found items application.
  Based on the claim details, item details, and user details provided, suggest the most appropriate workflow for handling the claim.
  The possible workflows are:
  - MANUAL_REVIEW: Requires manual review by an administrator.
  - AUTO_APPROVE: Can be automatically approved without manual intervention.
  - AUTO_REJECT: Should be automatically rejected.
  - ESCALATE: Requires escalation to a higher authority due to potential fraud or other issues.

  Claim Details: {{{claimDetails}}}
  Item Details: {{{itemDetails}}}
  User Details: {{{userDetails}}}

  Provide a suggested workflow and a brief explanation of your reasoning.
  Ensure the suggestedWorkflow field contains only one of the allowed values.
  Output should be in JSON format.
  `,
});

const evaluateClaimFlow = ai.defineFlow(
  {
    name: 'evaluateClaimFlow',
    inputSchema: EvaluateClaimInputSchema,
    outputSchema: EvaluateClaimOutputSchema,
  },
  async input => {
    const {output} = await evaluateClaimPrompt(input);
    return output!;
  }
);
