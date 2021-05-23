import * as PricingDocs from '@modules/pricing/infra/docs';
import * as AreaCodeDocs from '@modules/areaCode/infra/docs';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'REST API FaleMais',
    version: '1.0.0.',
    description: 'FaleMais',
    hosts: 'localhost:5555/api',
    contact: {
      name: 'Matheus Melo',
      email: 'math.li.melo@gmail.com',
      url: 'https://www.linkedin.com/in/mathlmelo/',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
};

const options = {
  openapi: swaggerDefinition.openapi,
  info: swaggerDefinition.info,
  servers: [{
    url: 'http://localhost:5555/api/',
    description: 'Local server',
  }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'BearerAuthtentication',
      },
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
  tags: [{
    name: 'AreaCode',
    description: 'CRUD para AreaCodes',
  }, {
    name: 'Pricing',
    description: 'CRUD para Pricings',
  }],
  paths: {
    // Pricing paths
    '/pricings/': { post: PricingDocs.CreatePricingDoc },
    '/pricings/list': { post: PricingDocs.ListPricingDoc },
    '/pricings/{orig}/{dest}': { get: PricingDocs.FindPricingDoc, patch: PricingDocs.UpdatePricingDoc, delete: PricingDocs.DeletePricingDoc },
    // AreaCode paths
    '/areaCodes/': { post: AreaCodeDocs.CreateAreaCodeDoc },
    '/areaCodes/list': { post: AreaCodeDocs.ListAreaCodeDoc },
    '/areaCodes/{ddd}': { get: AreaCodeDocs.FindAreaCodeDoc, patch: AreaCodeDocs.UpdateAreaCodeDoc, delete: AreaCodeDocs.DeleteAreaCodeDoc },
  },
};

export default options;
