import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';
import DeleteAreaCodeService from '@modules/areaCode/services/DeleteAreaCodeService';

import Container from '@common/container';

let createAreaCode: CreateAreaCodeService;
let deleteAreaCode: DeleteAreaCodeService;

describe('DeleteAreaCode', () => {

  beforeEach(() => {
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
    deleteAreaCode = Container.resolve<DeleteAreaCodeService>(DeleteAreaCodeService);
  });

  it('Should be able to delete a AreaCode', async () => {

    const areaCodeRecord = await createAreaCode.execute({
      data: {
        ddd: '022',
        uf: 'RJ',
      },
    });

    const res = await deleteAreaCode.execute({
      ddd: areaCodeRecord.ddd,
    });

    expect(res).toBe(true);

  }, 30000);
});
