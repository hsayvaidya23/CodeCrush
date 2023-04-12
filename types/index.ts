export interface  ICategory {
    id: number;
    attributes: ICategoryAttribute;
}

export interface ICategoryAttribute {
    Title: string;
    Slug: string;
}

export interface ICollectionResponse<T>{
    data: T;
    meta: IResourceMeta;
}

export interface IResourceMeta {
    paignation: IPagination;
}

export interface IPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}