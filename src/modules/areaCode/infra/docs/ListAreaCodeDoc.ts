const ListAreaCodeDoc = {
  tags: ['AreaCode'],
  description: 'Lists AreaCodes records for given search parameters',
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
                ddd: { type: 'string' },
                uf: { type: 'string' },
                enabled: { type: 'boolean' },
              },
            },
          },
          example: {
            orderAttribute: 'created',
            orderType: 'DESC',
            filter: {
              ddd: '083',
              uf: 'PB',
            },
          },
        },
      },
    },
  },
  operationId: 'listAreaCodeDoc',
  security: [
    {
      BearerAuth: [],
      BasicAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'AreaCodes',
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
        },
      },
    },
    400: {
      description: 'Problem on the request body',
    },
    404: {
      description: 'Could not find any AreaCodes',
    },
  },
};

export default ListAreaCodeDoc;
