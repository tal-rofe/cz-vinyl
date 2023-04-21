import type { z } from 'zod';

import type AiResponseSchema from '../models/ai-response';

export type AiResponseResult = z.infer<typeof AiResponseSchema> | null;
