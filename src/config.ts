import type { z } from 'zod';

import type ConfigurationSchema from './models/configuration';

export type CzVinylConfig = z.infer<typeof ConfigurationSchema>;
