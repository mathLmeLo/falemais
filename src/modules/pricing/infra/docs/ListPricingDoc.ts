const ListPricingDoc = {
  tags: ['Pricing'],
  description: 'Lists Pricings records for given search parameters',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            pageOffSet: { type: 'integer' },
            pageCount: { type: 'integer' },
            pageSize: { type: 'integer' },
            orderAttribute: { type: 'string' },
            orderType: { type: 'string' },
            filter: {
              type: 'object',
              properties: {
                origin: { type: 'string' },
                destination: { type: 'string' },
                price: { type: 'number' },
                enabled: { type: 'boolean' },
              },
            },
          },
          example: {
            orderAttribute: 'price',
            orderType: 'DESC',
            filter: {
              origin: '083',
              destination: '082',
              price: 1.2,
            },
          },
        },
      },
    },
  },
  operationId: 'listPricingDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Pricings',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              pageSize: { type: 'integer' },
              totalItems: { type: 'integer' },
              results: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    pricing: {
                      type: 'object',
                      properties: {
                        price: { type: 'number' },
                        created: { type: 'string' },
                        enabled: { type: 'boolean' },
                      },
                    },
                    origin: {
                      type: 'object',
                      properties: {
                        ddd: { type: 'string' },
                        uf: { type: 'string' },
                      },
                    },
                    destination: {
                      type: 'object',
                      properties: {
                        ddd: { type: 'string' },
                        uf: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find any Pricings',
    },
  },
};

export default ListPricingDoc;
