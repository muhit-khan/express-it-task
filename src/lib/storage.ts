interface StorageProduct {
    _id: string;
    name: string;
    price: string;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    images: {
        public_id: string;
        secure_url: string;
        optimizeUrl: string;
    }[];
    video: {
        public_id: string;
        secure_url: string;
    };
    status: boolean;
}

// Helper function to create URL-friendly slugs
export const createSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

export const setProducts = (products: StorageProduct[]) => {
    localStorage.setItem('products', JSON.stringify(products));
};

export const getProductBySlug = (slug: string): StorageProduct | null => {
    try {
        const products = localStorage.getItem('products');
        if (!products) return null;

        const parsedProducts: StorageProduct[] = JSON.parse(products);
        return parsedProducts.find(product => createSlug(product.name) === slug) || null;
    } catch {
        return null;
    }
};
