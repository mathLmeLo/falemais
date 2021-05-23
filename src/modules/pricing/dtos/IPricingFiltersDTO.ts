interface IPricingFiltersDTO {
  where?: {
    origin?: string;
    destination?: string;
    price?: number;
    enabled?: boolean;
  };
  order: {
    by: string;
    dsc: boolean;
  };
  page?: {
    size: number;
    offset: number;
    count: number;
  };
}

export default IPricingFiltersDTO;
