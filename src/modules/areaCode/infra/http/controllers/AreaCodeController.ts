import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import AppError from '@common/errors/AppError';
import AppContainer from '@common/container';

import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';
import ListAreaCodeService from '@modules/areaCode/services/ListAreaCodeService';
import FindAreaCodeService from '@modules/areaCode/services/FindAreaCodeService';
import DeleteAreaCodeByIdService from '@modules/areaCode/services/DeleteAreaCodeService';
import UpdateAreaCodeService from '@modules/areaCode/services/UpdateAreaCodeService';

import CreateAreaCodeSchema from '@modules/areaCode/infra/http/validators/CreateAreaCodeValidator';
import UpdateAreaCodeSchema from '@modules/areaCode/infra/http/validators/UpdateAreaCodeValidator';
import ListAreaCodeSchema from '@modules/areaCode/infra/http/validators/ListAreaCodeValidator';

class AreaCodeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try { CreateAreaCodeSchema.parse(data); } catch (err) {
      throw new AppError(`Validation error: ${err.message}`, 400);
    }

    const createAreaCode = AppContainer.resolve<CreateAreaCodeService>(CreateAreaCodeService);
    const areaCode = await createAreaCode.execute({ data });

    return res.status(201).json(classToPlain(areaCode));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const ddd = req.params.ddd as unknown as string;
    const data = req.body;

    try { UpdateAreaCodeSchema.parse(data); } catch (err) {
      throw new AppError(`Validation error: ${err.message}`, 400);
    }

    const updateAreaCode = AppContainer.resolve<UpdateAreaCodeService>(UpdateAreaCodeService);
    await updateAreaCode.execute({ ddd, data });

    return res.status(204).json({});
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const ddd = req.params.ddd as unknown as string;

    const getAreaCodeById = AppContainer.resolve<FindAreaCodeService>(FindAreaCodeService);
    const areaCode = await getAreaCodeById.execute({ ddd });

    return res.status(200).json(areaCode);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const ddd = req.params.ddd as unknown as string;

    const deleteAreaCode = AppContainer.resolve<DeleteAreaCodeByIdService>(DeleteAreaCodeByIdService);
    await deleteAreaCode.execute({ ddd });

    return res.status(204).json({});
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try { ListAreaCodeSchema.parse(data); } catch (err) {
      throw new AppError(`Validation error: ${err.message}`, 400);
    }

    const listAreaCode = AppContainer.resolve<ListAreaCodeService>(ListAreaCodeService);
    const areaCodes = await listAreaCode.execute({ data });

    return res.status(200).json(areaCodes);
  }
}

export default AreaCodeController;
