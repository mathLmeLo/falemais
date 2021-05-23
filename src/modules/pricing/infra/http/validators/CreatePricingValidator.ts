import { number, object, string } from 'zod';

const schema = object({
  origin: string().nonempty().max(3),
  destination: string().nonempty().max(3),
  price: number().nonnegative(),
});

export default schema;
