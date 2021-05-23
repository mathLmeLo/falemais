import { object, string, number, enum as a, boolean } from 'zod';

const schema = object({
  pageOffSet: number().optional(),
  pageCount: number().optional(),
  pageSize: number().optional(),
  orderAttribute: string().optional(),
  orderType: a(['ASC', 'DESC']).optional(),
  filter: object({
    origin: string().nonempty().max(3).optional(),
    destination: string().nonempty().max(3).optional(),
    price: number().nonnegative().optional(),
    enabled: boolean().optional(),
  }).optional(),
});

export default schema;
