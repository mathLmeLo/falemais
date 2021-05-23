import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import AppError from '@common/errors/AppError';
import AppContainer from '@common/container';

import CreatePricingService from '@modules/pricing/services/CreatePricingService';
import ListPricingService from '@modules/pricing/services/ListPricingService';
import FindPricingService from '@modules/pricing/services/FindPricingService';
import DeletePricingByIdService from '@modules/pricing/services/DeletePricingService';
import UpdatePricingService from '@modules/pricing/services/UpdatePricingService';

import CreatePricingSchema from '@modules/pricing/infra/http/validators/CreatePricingValidator';
import UpdatePricingSchema from '@modules/pricing/infra/http/validators/UpdatePricingValidator';
import ListPricingSchema from '@modules/pricing/infra/http/validators/ListPricingValidator';

class PricingController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try { CreatePricingSchema.parse(data); } catch (err) {
      throw new AppError(`Validation error: ${err.message}`, 400);
    }

    const createPricing = AppContainer.resolve<CreatePricingService>(CreatePricingService);
    const pricing = await createPricing.execute({ data });

    return res.status(201).json(classToPlain(pricing));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const orig = req.params.orig as unknown as string;
    const dest = req.params.dest as unknown as string;
    const data = req.body;

    try { UpdatePricingSchema.parse(data); } catch (err) {
      throw new AppError(`Validation error: ${err.message}`, 400);
    }

    const updatePricing = AppContainer.resolve<UpdatePricingService>(UpdatePricingService);
    await updatePricing.execute({ orig, dest, data });

    return res.status(204).json({});
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const orig = req.params.orig as unknown as string;
    const dest = req.params.dest as unknown as string;

    const getPricingById = AppContainer.resolve<FindPricingService>(FindPricingService);
    const pricing = await getPricingById.execute({ orig, dest });

    return res.status(200).json(pricing);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const orig = req.params.orig as unknown as string;
    const dest = req.params.dest as unknown as string;

    const deletePricing = AppContainer.resolve<DeletePricingByIdService>(DeletePricingByIdService);
    await deletePricing.execute({ orig, dest });

    return res.status(204).json({});
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try { ListPricingSchema.parse(data); } catch (err) {
      throw new AppError(`Validation error: ${err.message}`, 400);
    }

    const listPricing = AppContainer.resolve<ListPricingService>(ListPricingService);
    const pricings = await listPricing.execute({ data });

    return res.status(200).json(pricings);
  }
}

export default PricingController;
