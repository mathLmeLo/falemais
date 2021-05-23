import CreatePricingService from '@modules/pricing/services/CreatePricingService';
import UpdatePricingService from '@modules/pricing/services/UpdatePricingService';
import FindPricingService from '@modules/pricing/services/FindPricingService';
import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';

import Container from '@common/container';

let createPricing: CreatePricingService;
let updatePricing: UpdatePricingService;
let getPricing: FindPricingService;
let createAreaCode: CreateAreaCodeService;

describe('UpdatePricing', () => {

  beforeEach(() => {
    createPricing = Container.resolve<CreatePricingService>(CreatePricingService);
    getPricing = Container.resolve<FindPricingService>(FindPricingService);
    updatePricing = Container.resolve<UpdatePricingService>(UpdatePricingService);
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
  });

  it('Should be able to update a Pricing', async () => {
    const areaCode1 = await createAreaCode.execute({
      data: {
        ddd: '043',
        uf: 'PR',
      },
    });

    const areaCode2 = await createAreaCode.execute({
      data: {
        ddd: '044',
        uf: 'PR',
      },
    });

    const pricingRecord = await createPricing.execute({
      data: {
        origin: areaCode1.ddd,
        destination: areaCode2.ddd,
        price: 1.2,
      },
    });

    await updatePricing.execute({
      orig: pricingRecord.origin,
      dest: pricingRecord.destination,
      data: {
        price: 2.2,
      },
    });

    const pricing = await getPricing.execute({
      orig: pricingRecord.origin,
      dest: pricingRecord.destination,
    });

    expect(pricing.pricing.price).toStrictEqual(2.2);

  }, 30000);
});
