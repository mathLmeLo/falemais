const FindAreaCodeDoc = {
  tags: ['AreaCode'],
  description: 'Finds a given AreaCode',
  operationId: 'FindAreaCodesDoc',
  parameters: [{
    in: 'path',
    name: 'ddd',
    schema: {
      type: 'string',
    },
    required: true,
    description: 'ddd',
  }],
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'AreaCode',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              areaCode: {
                type: 'object',
                properties: {
                  ddd: { type: 'string' },
                  uf: { type: 'string' },
                  created: { type: 'string' },
                  enabled: { type: 'boolean' },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Could not find AreaCode',
    },
  },
};

export default FindAreaCodeDoc;
