export interface IProject {
    id: number;
    thumbnail: string;
    title: string;
    description: string;
    legal_contract: string;
    funding_requested: number;
    funding_raised: number;
    lockup_period: number;
    denom: string;
    minimum_backers: string;
    minimum_budget: string;
}
