import CreatePricingService from '@modules/pricing/services/CreatePricingService';
import DeletePricingService from '@modules/pricing/services/DeletePricingService';
import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';

import Container from '@common/container';

let createPricing: CreatePricingService;
let deletePricing: DeletePricingService;
let createAreaCode: CreateAreaCodeService;

describe('DeletePricing', () => {

  beforeEach(() => {
    createPricing = Container.resolve<CreatePricingService>(CreatePricingService);
    deletePricing = Container.resolve<DeletePricingService>(DeletePricingService);
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
  });

  it('Should be able to delete a Pricing', async () => {

    const areaCode1 = await createAreaCode.execute({
      data: {
        ddd: '034',
        uf: 'MG',
      },
    });

    const areaCode2 = await createAreaCode.execute({
      data: {
        ddd: '035',
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

    const res = await deletePricing.execute({
      orig: pricingRecord.origin,
      dest: pricingRecord.destination,
    });

    expect(res).toBe(true);

  }, 30000);
});
