import { z } from "zod";

export const CreateCampaignsRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional()
})

export const UpdateCampaignsRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
})