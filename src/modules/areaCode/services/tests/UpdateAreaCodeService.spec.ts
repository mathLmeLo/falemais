import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';
import UpdateAreaCodeService from '@modules/areaCode/services/UpdateAreaCodeService';
import FindAreaCodeService from '@modules/areaCode/services/FindAreaCodeService';
import DeleteAreaCodeService from '@modules/areaCode/services/DeleteAreaCodeService';

import Container from '@common/container';

let createAreaCode: CreateAreaCodeService;
let deleteAreaCode: DeleteAreaCodeService;
let updateAreaCode: UpdateAreaCodeService;
let getAreaCode: FindAreaCodeService;

describe('UpdateAreaCode', () => {

  beforeEach(() => {
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
    getAreaCode = Container.resolve<FindAreaCodeService>(FindAreaCodeService);
    updateAreaCode = Container.resolve<UpdateAreaCodeService>(UpdateAreaCodeService);
    deleteAreaCode = Container.resolve<DeleteAreaCodeService>(DeleteAreaCodeService);
  });

  it('Should be able to update a AreaCode', async () => {
    const areaCodeRecord = await createAreaCode.execute({
      data: {
        ddd: '031',
        uf: 'MG',
      },
    });

    await deleteAreaCode.execute({
      ddd: areaCodeRecord.ddd,
    });

    await updateAreaCode.execute({
      ddd: areaCodeRecord.ddd,
      data: {
        enabled: true,
      },
    });

    const areaCode = await getAreaCode.execute({
      ddd: areaCodeRecord.ddd,
    });

    expect(areaCode.areaCode.enabled).toBeTruthy();

  }, 30000);
});
