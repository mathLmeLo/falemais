import { Router } from 'express';

import PricingRoutes from '@modules/pricing/infra/http/routes/PricingRoutes';
import AreaCodeRoutes from '@modules/areaCode/infra/http/routes/AreaCodeRoutes';

const routes = Router();

routes.use('/pricings', PricingRoutes);
routes.use('/areaCodes', AreaCodeRoutes);

export default routes;
