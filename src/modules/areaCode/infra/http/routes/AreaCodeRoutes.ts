import { Router } from 'express';

import AreaCodeController from '@modules/areaCode/infra/http/controllers/AreaCodeController';

const areaCodeRouter = Router();
const areaCodeController = new AreaCodeController();

areaCodeRouter.post('/', areaCodeController.create);
areaCodeRouter.post('/list', areaCodeController.list);
areaCodeRouter.get('/:ddd', areaCodeController.find);
areaCodeRouter.patch('/:ddd', areaCodeController.update);
areaCodeRouter.delete('/:ddd', areaCodeController.delete);

export default areaCodeRouter;
