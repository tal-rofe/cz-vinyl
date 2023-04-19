import type { z } from 'zod';

import type ConfigurationSchema from '../models/configuration';

export type FinalConfiguration = Required<z.infer<typeof ConfigurationSchema>>;
