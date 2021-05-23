import 'reflect-metadata';
import { Container } from 'inversify';

import Types from '@common/container/Types';

import IPricingRepository from '@modules/pricing/repositories/IPricingRepository';
import PricingRepository from '@modules/pricing/infra/typeorm/repositories/PricingRepository';

import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';
import AreaCodeRepository from '@modules/areaCode/infra/typeorm/repositories/AreaCodeRepository';

const container = new Container();

// repositories
container.bind<IPricingRepository>(Types.PricingRepository).to(PricingRepository);
container.bind<IAreaCodeRepository>(Types.AreaCodeRepository).to(AreaCodeRepository);
// providers

export default container;
