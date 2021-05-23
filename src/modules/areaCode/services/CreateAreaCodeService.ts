import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import Types from '@common/container/Types';

import AreaCode from '@entities/AreaCode';

import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';
import CreateAreaCodeValidator from '@modules/areaCode/infra/http/validators/CreateAreaCodeValidator';
import AppError from '@common/errors/AppError';

interface IRequest {
  data: Z.infer<typeof CreateAreaCodeValidator>;
}

@injectable()
class CreateAreaCodeService {

  constructor(
    @inject(Types.AreaCodeRepository) private areaCodeRepository: IAreaCodeRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<AreaCode> {

    // check if already exists
    const exists = await this.areaCodeRepository.find({ ddd: data.ddd });
    if (exists) throw new AppError('A AreaCode record already exists for this ddd', 409);

    return this.areaCodeRepository.create({ ddd: data.ddd, uf: data.uf });
  }
}

export default CreateAreaCodeService;
