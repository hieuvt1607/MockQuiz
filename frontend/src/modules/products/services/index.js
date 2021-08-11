import axios from '../../../plugins/axios';
import { fb } from '../../../config/firebase';

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

export const createNewProduct = async (formData) => {
    const storageRef = fb.storage().ref();
    const metadata = {
        contentType: 'image/jpeg',
    };

    const fileRef = storageRef
        .child(`products/${formData?.file?.name}`);

    const uploadTaskSnapshot = await fileRef.put(formData.file, metadata);

    const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
    if (downloadURL) {
        formData.file = downloadURL;
        const res = await axios.post('/api/products/create-new-product', formData);
        if (!res) {
            console.log('error');
        }
        return res.data;
    }
    return null;
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
