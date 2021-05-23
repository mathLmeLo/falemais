import { object, string } from 'zod';

const schema = object({
  ddd: string().nonempty().max(3),
  uf: string().nonempty().max(2),
});

export default schema;
