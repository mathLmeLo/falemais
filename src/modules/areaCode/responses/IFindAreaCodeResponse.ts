interface IFindAreaCodeResponse {
  areaCode: {
    ddd: string;
    uf: string;
    created: Date;
    enabled: boolean;
  };
}

export default IFindAreaCodeResponse;
