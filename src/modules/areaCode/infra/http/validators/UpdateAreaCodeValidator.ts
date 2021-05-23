import { object, boolean } from 'zod';

const schema = object({
  enabled: boolean().optional(),
});

export default schema;
