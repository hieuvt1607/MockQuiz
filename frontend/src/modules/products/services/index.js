import axios from '../../../plugins/axios';

export const searchProduct = async (keywords, categoryId, sortConditions, limit, offset) => {
    const res = await axios.get(`/api/products/search-products/?keywords=${keywords}&categoryId=${categoryId}&sortBy=${sortConditions.sortBy}`
        + `&sortTypes=${sortConditions.sortTypes}&limit=${limit}&offset=${offset}`);
    if (!res) {
        console.log('error');
    }
    return res.data?.data?.listOfProduct;
};

export const getProducts = async (offset, limit, sortConditions) => {
    const res = await axios.get(`/api/products/get-products/?offset=${offset}&limit=${limit}&sortBy=${sortConditions.sortBy}`
        + `&sortTypes=${sortConditions.sortTypes}`);
    if (!res) {
        console.log('error');
    }
    return res.data?.data?.listOfProduct;
};

export const getCategories = async () => {
    const res = await axios.get('/api/categories/get-all-categories');
    if (!res) {
        console.log('error');
    }
    return res.data?.data?.listOfCate;
};

export const createNewProduct = async ({ categoryId, productName, image }) => {
    console.log('service', image);
    const res = await axios.post('/api/products/create-new-product', { categoryId, productName, image });
    if (!res) {
        console.log('error');
    }
    return res.data;
};

export const updateProduct = async ({ id, categoryId, productName }) => {
    const res = await axios.put('/api/products/update-product', { id, categoryId, productName });
    if (!res) {
        console.log('error');
    }
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axios.get(`/api/products/delete-product/${id}`);
    if (!res) {
        console.log('error');
    }
    return res.data;
};

export const testimg = async (img) => {
    const res = await axios.post('/api/products/image', img);
    if (!res) {
        console.log('error');
    }
    return res;
};
