export interface Combination {
  id: string;
  combinationName: string;
}

export interface CombinationItem {
  code: string;
  name: string;
  escrowRows: string;
  tranche: number;
  source: string;
  selfInvestment: string;
  combinationId?: string;
}

export interface CombinationDetail {
  unBound: CombinationItem[];
  bound: CombinationItem[];
}
