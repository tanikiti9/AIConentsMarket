export interface product_type{
    id: number;
    title: string;
    description: string;
    creator_name: string | null;
    download_url: string;
}

export interface product {
    price: number;
    is_free: boolean;
    file_name: string;
    file_size: number;
    status: string;
    created_at: string;
}