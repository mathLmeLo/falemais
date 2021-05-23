import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';
import FindAreaCodeService from '@modules/areaCode/services/FindAreaCodeService';

import Container from '@common/container';

let createAreaCode: CreateAreaCodeService;
let getAreaCode: FindAreaCodeService;

describe('GetAreaCode', () => {

  beforeEach(() => {
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
    getAreaCode = Container.resolve<FindAreaCodeService>(FindAreaCodeService);
  });

  it('Should be able to find a AreaCode', async () => {
    const areaCodeRecord = await createAreaCode.execute({
      data: {
        ddd: '024',
        uf: 'RJ',
      },
    });

    const areaCode = await getAreaCode.execute({
      ddd: areaCodeRecord.ddd,
    });

    expect(areaCode.areaCode).toStrictEqual({
      ddd: areaCodeRecord.ddd,
      uf: areaCodeRecord.uf,
      created: areaCodeRecord.created,
      enabled: areaCodeRecord.enabled,
    });

  }, 30000);
});
