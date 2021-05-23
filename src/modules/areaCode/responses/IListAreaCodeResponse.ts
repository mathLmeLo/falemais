interface IListAreaCodeResponse {
  pageSize: number;
  totalItems: number;
  results: {
    areaCode: {
      ddd: string;
      uf: string;
      created: Date;
      enabled: boolean;
    };
  }[];
}

export default IListAreaCodeResponse;
