import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';
import CreatePricingService from '@modules/pricing/services/CreatePricingService';

import Container from '@common/container';

let createPricing: CreatePricingService;
let createAreaCode: CreateAreaCodeService;

describe('CreatePricing', () => {

  beforeEach(async () => {
    createPricing = Container.resolve<CreatePricingService>(CreatePricingService);
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
  });

  it('Should be able to create a new Pricing', async () => {

    const areaCode1 = await createAreaCode.execute({
      data: {
        ddd: '032',
        uf: 'MG',
      },
    });

    const areaCode2 = await createAreaCode.execute({
      data: {
        ddd: '033',
        uf: 'MG',
      },
    });

    const pricing = await createPricing.execute({
      data: {
        origin: areaCode1.ddd,
        destination: areaCode2.ddd,
        price: 1.2,
      },
    });

    expect(pricing).toHaveProperty('origin');

  }, 30000);
});
