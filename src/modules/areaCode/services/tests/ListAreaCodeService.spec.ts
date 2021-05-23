import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';
import ListAreaCodeService from '@modules/areaCode/services/ListAreaCodeService';

import Container from '@common/container';

let createAreaCode: CreateAreaCodeService;
let listAllAreaCode: ListAreaCodeService;

describe('ListAllAreaCode', () => {

  beforeEach(() => {
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
    listAllAreaCode = Container.resolve<ListAreaCodeService>(ListAreaCodeService);
  });

  it('Should be able to list all AreaCodes for a filter', async () => {
    const areaCode1 = await createAreaCode.execute({
      data: {
        ddd: '027',
        uf: 'ES',
      },
    });

    const areaCode2 = await createAreaCode.execute({
      data: {
        ddd: '028',
        uf: 'ES',
      },
    });

    const areaCodes = await listAllAreaCode.execute({
      data: {
        filter: {
          ddd: areaCode1.ddd,
        },
      },
    });

    const areaCodesPks = areaCodes.results.map((each) => each.areaCode.ddd);

    expect(areaCodesPks).toContainEqual(areaCode1.ddd);
    expect(areaCodesPks).not.toContainEqual(areaCode2.ddd);

  }, 50000);
});
