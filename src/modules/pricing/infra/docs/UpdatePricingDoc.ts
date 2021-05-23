const UpdatePricingDoc = {
  tags: ['Pricing'],
  description: 'Updates a specific Pricing',
  operationId: 'updatePricingsDoc',
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
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            price: { type: 'number' },
            enabled: { type: 'boolean' },
          },
          example: {
            price: 1.2,
            enabled: true,
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    204: {
      description: 'Pricing updated',
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find Pricing',
    },
  },
};

export default UpdatePricingDoc;
