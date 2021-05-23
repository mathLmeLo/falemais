import CreatePricingService from '@modules/pricing/services/CreatePricingService';
import ListPricingService from '@modules/pricing/services/ListPricingService';
import CreateAreaCodeService from '@modules/areaCode/services/CreateAreaCodeService';

import Container from '@common/container';

let createPricing: CreatePricingService;
let listAllPricing: ListPricingService;
let createAreaCode: CreateAreaCodeService;

describe('ListAllPricing', () => {

  beforeEach(() => {
    createPricing = Container.resolve<CreatePricingService>(CreatePricingService);
    listAllPricing = Container.resolve<ListPricingService>(ListPricingService);
    createAreaCode = Container.resolve<CreateAreaCodeService>(CreateAreaCodeService);
  });

  it('Should be able to list all Pricings for a filter', async () => {
    const areaCode1 = await createAreaCode.execute({
      data: {
        ddd: '041',
        uf: 'PR',
      },
    });

    const areaCode2 = await createAreaCode.execute({
      data: {
        ddd: '042',
        uf: 'PR',
      },
    });

    const pricing1 = await createPricing.execute({
      data: {
        origin: areaCode1.ddd,
        destination: areaCode2.ddd,
        price: 1.2,
      },
    });

    const pricing2 = await createPricing.execute({
      data: {
        origin: areaCode2.ddd,
        destination: areaCode1.ddd,
        price: 2.2,
      },
    });

    const pricings = await listAllPricing.execute({
      data: {
        filter: {
          origin: pricing1.origin,
          destination: pricing1.destination,
        },
      },
    });

    const pricingsPks = pricings.results.map((each) => ({ origin: each.origin.ddd, destination: each.destination.ddd }));

    expect(pricingsPks).toContainEqual({ origin: pricing1.origin, destination: pricing1.destination });
    expect(pricingsPks).not.toContainEqual({ origin: pricing2.origin, destination: pricing2.destination });

  }, 50000);
});
