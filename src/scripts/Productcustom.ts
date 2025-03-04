export interface Product {
  id: number;
  product_title: string;
  category: string;
  price: number;
  status: number;
  description: string;
  product_image: string;
  rating: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProductsResponse {
  message: string;
  products: {
      current_page: number;
      data: Product[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: PaginationLinks[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
  };
}

