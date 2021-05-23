interface IFindPricingResponse {
  pricing: {
    price: number;
    created: Date;
    enabled: boolean;
  };
  origin: {
    ddd: string;
    uf: string;
  };
  destination: {
    ddd: string;
    uf: string;
  };
}

export default IFindPricingResponse;
