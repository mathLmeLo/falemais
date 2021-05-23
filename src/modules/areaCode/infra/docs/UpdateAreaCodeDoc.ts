const UpdateAreaCodeDoc = {
  tags: ['AreaCode'],
  description: 'Updates a specific AreaCode',
  operationId: 'updateAreaCodesDoc',
  parameters: [{
    in: 'path',
    name: 'ddd',
    schema: {
      type: 'string',
    },
    required: true,
    description: 'ddd',
  }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            enabled: { type: 'boolean' },
          },
          example: {
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
      description: 'AreaCode updated',
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find AreaCode',
    },
  },
};

export default UpdateAreaCodeDoc;
