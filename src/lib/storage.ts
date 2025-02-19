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

export const setProducts = (products: StorageProduct[]) => {
    localStorage.setItem('products', JSON.stringify(products));
};

export const getProduct = (id: string): StorageProduct | null => {
    const products = localStorage.getItem('products');
    if (!products) return null;

    const parsedProducts: StorageProduct[] = JSON.parse(products);
    return parsedProducts.find(product => product._id === id) || null;
};
