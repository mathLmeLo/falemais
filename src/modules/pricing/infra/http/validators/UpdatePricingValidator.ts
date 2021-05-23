import { boolean, number, object } from 'zod';

const schema = object({
  price: number().nonnegative().optional(),
  enabled: boolean().optional(),
});

export default schema;
