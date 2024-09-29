import api from "./api";
const VITE_PRODUCT_API = import.meta.env.VITE_PRODUCT_API;

const getAllProducts = async () => {
    return await api.get(`${VITE_PRODUCT_API}`);
};

const getProductById = async (id) => {
    return await api.get(`${VITE_PRODUCT_API}/${id}`);
};

const createProduct = async (product) => {
    return await api.post(`${VITE_PRODUCT_API}`, product);
};

const updateProduct = async (id, product) => {
    try {
        const response = await api.put(`${VITE_PRODUCT_API}/${id}`, product);
        console.log("Update response data:", response.data); 
        return response; 
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`${VITE_PRODUCT_API}/${id}`);
        if (response.status === 200 || response.status === 204) {
            return response; 
        } else {
            throw new Error(`Failed to delete product. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

const ProductService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    
};

export default ProductService;