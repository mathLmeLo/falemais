const FindPricingDoc = {
  tags: ['Pricing'],
  description: 'Finds a given pricing',
  operationId: 'FindPricingsDoc',
  parameters: [{
    in: 'path',
    name: 'orig',
    schema: {
      type: 'string',
    },
    required: true,
    description: 'origin ddd',
  }, {
    in: 'path',
    name: 'dest',
    schema: {
      type: 'string',
    },
    required: true,
    description: 'destination ddd',
  }],
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Pricing',
      content: {
        'application/json': {
          schema: {
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
    404: {
      description: 'Could not find Pricing',
    },
  },
};

export default FindPricingDoc;
