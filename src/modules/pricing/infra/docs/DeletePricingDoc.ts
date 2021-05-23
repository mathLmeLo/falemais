const DeletePricingDoc = {
  tags: ['Pricing'],
  description: 'Deletes a given pricing logically',
  operationId: 'deletePricingsDoc',
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
    204: {
      description: 'Pricing deleted',
    },
    404: {
      description: 'Could not find Pricing',
    },
    502: {
      description: 'Could not delete Pricing',
    },
  },
};

export default DeletePricingDoc;
