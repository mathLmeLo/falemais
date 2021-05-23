import { Router } from 'express';

import PricingController from '@modules/pricing/infra/http/controllers/PricingController';

const pricingRouter = Router();
const pricingController = new PricingController();

pricingRouter.post('/', pricingController.create);
pricingRouter.post('/list', pricingController.list);
pricingRouter.get('/:orig/:dest', pricingController.find);
pricingRouter.patch('/:orig/:dest', pricingController.update);
pricingRouter.delete('/:orig/:dest', pricingController.delete);

export default pricingRouter;
