import { object, string, number, enum as a, boolean } from 'zod';

const schema = object({
  pageOffSet: number().optional(),
  pageCount: number().optional(),
  pageSize: number().optional(),
  orderAttribute: string().optional(),
  orderType: a(['ASC', 'DESC']).optional(),
  filter: object({
    ddd: string().nonempty().max(3).optional(),
    uf: string().nonempty().max(2).optional(),
    enabled: boolean().optional(),
  }).optional(),
});

export default schema;
