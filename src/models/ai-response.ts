import { z } from 'zod';

const AiResponseSchema = z.object({
	subject: z.string(),
	body: z.string().optional(),
});

export default AiResponseSchema;
