const CreateAreaCodeDoc = {
  tags: ['AreaCode'],
  description: 'Creates a AreaCode',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            ddd: { type: 'string' },
            uf: { type: 'string' },
          },
          required: ['ddd', 'uf'],
          example: {
            ddd: '083',
            uf: 'PB',
          },
        },
      },
    },
  },
  operationId: 'createAreaCodeDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    201: {
      description: 'AreaCode created',
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find Origin or Destination',
    },
    409: {
      description: 'A AreaCode record already exists for this ddd',
    },
  },
};

export default CreateAreaCodeDoc;
