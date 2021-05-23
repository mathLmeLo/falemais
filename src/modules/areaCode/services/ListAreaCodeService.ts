import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';

import ListAreaCodesValidator from '@modules/areaCode/infra/http/validators/ListAreaCodeValidator';
import IResponse from '@modules/areaCode/responses/IListAreaCodeResponse';

interface IRequest {
  data: Z.infer<typeof ListAreaCodesValidator>;
}

@injectable()
class ListAreaCodeService {

  constructor(
    @inject(Types.AreaCodeRepository) private AreaCodeRepository: IAreaCodeRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<IResponse> {
    const { filter, pageSize, pageOffSet, pageCount, orderAttribute, orderType } = data;

    const areaCodes = await this.AreaCodeRepository.filter({
      where: filter,
      page: { size: pageSize, count: pageCount, offset: pageOffSet },
      order: { by: orderAttribute, dsc: orderType === 'DESC' },
    });

    if (!areaCodes) throw new AppError('Could not find any AreaCodes', 404);

    const results = areaCodes.map((areaCode, i) => {

      const index = {
        page: Math.trunc((i / (data.pageSize || 30)) + (data.pageOffSet || 0)),
        index: (i % (data.pageSize || 30)),
      };

      return {
        index,
        areaCode: {
          ddd: areaCode.ddd,
          uf: areaCode.uf,
          created: areaCode.created,
          enabled: areaCode.enabled,
        },
      };
    });

    const response: IResponse = {
      pageSize: data.pageSize || 30,
      totalItems: results.length,
      results,
    };

    return response;
  }

}

export default ListAreaCodeService;
