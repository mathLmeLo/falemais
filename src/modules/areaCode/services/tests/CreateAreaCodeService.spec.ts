import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';

import Container from '@common/container';

let createAreaCode: CreateAreaCodeService;

describe('CreateAreaCode', () => {

  beforeEach(async () => {
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
  });

  it('Should be able to create a new AreaCode', async () => {

    const areaCode = await createAreaCode.execute({
      data: {
        ddd: '021',
        uf: 'RJ',
      },
    });

    expect(areaCode).toHaveProperty('ddd');

  }, 30000);
});
