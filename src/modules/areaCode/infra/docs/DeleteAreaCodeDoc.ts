const DeleteAreaCodeDoc = {
  tags: ['AreaCode'],
  description: 'Deletes a given AreaCode logically',
  operationId: 'deleteAreaCodesDoc',
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
    204: {
      description: 'AreaCode deleted',
    },
    404: {
      description: 'Could not find AreaCode',
    },
    502: {
      description: 'Could not delete AreaCode',
    },
  },
};

export default DeleteAreaCodeDoc;
