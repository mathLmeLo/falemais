const CreatePricingDoc = {
  tags: ['Pricing'],
  description: 'Creates a Pricing',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            origin: { type: 'string' },
            destination: { type: 'string' },
            price: { type: 'number' },
          },
          required: ['origin', 'destination', 'price'],
          example: {
            origin: '083',
            destination: '082',
            price: 1.2,
          },
        },
      },
    },
  },
  operationId: 'createPricingDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    201: {
      description: 'Pricing created',
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find Origin or Destination',
    },
    409: {
      description: 'Pricing Already Exists',
    },
  },
};

export default CreatePricingDoc;
