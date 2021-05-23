interface IAreaCodeFiltersDTO {
  where?: {
    ddd?: string;
    uf?: string;
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

export default IAreaCodeFiltersDTO;
