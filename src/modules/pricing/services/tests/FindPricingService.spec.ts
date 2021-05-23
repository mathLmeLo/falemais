import CreatePricingService from '@modules/pricing/services/CreatePricingService';
import FindPricingService from '@modules/pricing/services/FindPricingService';
import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';

import Container from '@common/container';

let createPricing: CreatePricingService;
let getPricing: FindPricingService;
let createAreaCode: CreateAreaCodeService;

describe('GetPricing', () => {

  beforeEach(() => {
    createPricing = Container.resolve<CreatePricingService>(CreatePricingService);
    getPricing = Container.resolve<FindPricingService>(FindPricingService);
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
  });

  it('Should be able to find a Pricing', async () => {
    const areaCode1 = await createAreaCode.execute({
      data: {
        ddd: '037',
        uf: 'MG',
      },
    });

    const areaCode2 = await createAreaCode.execute({
      data: {
        ddd: '038',
        uf: 'MG',
      },
    });

    const pricingRecord = await createPricing.execute({
      data: {
        origin: areaCode1.ddd,
        destination: areaCode2.ddd,
        price: 1.2,
      },
    });

    const pricing = await getPricing.execute({
      orig: pricingRecord.origin,
      dest: pricingRecord.destination,
    });

    expect(pricing.pricing).toStrictEqual({
      price: pricingRecord.price,
      created: pricingRecord.created,
      enabled: pricingRecord.enabled,
    });

  }, 30000);
});
