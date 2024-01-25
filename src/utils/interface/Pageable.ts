export type SearchParams = Record<string, string | undefined>;

export interface Pageable extends SearchParams{
    page?: string;
    size?: string;
}