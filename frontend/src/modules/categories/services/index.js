import axios from '../../../plugins/axios';

export const searchCategories = async (keywords, sortConditions, limit, offset) => {
    const res = await axios.get(`/api/categories/search-categories/?keywords=${keywords}&sortBy=${sortConditions.sortBy}`
        + `&sortTypes=${sortConditions.sortTypes}&limit=${limit}&offset=${offset}`);
    if (!res) {
        console.log('error');
    }
    return res.data?.data?.listOfCate;
};

export const getCategories = async (offset, limit, sortConditions) => {
    const res = await axios.get(`/api/categories/get-categories/?offset=${offset}&limit=${limit}&sortBy=${sortConditions.sortBy}`
        + `&sortTypes=${sortConditions.sortTypes}`);
    if (!res) {
        console.log('error');
    }
    return res.data?.data?.listOfCate;
};

// export const getCategories = async () => {
//     const res = await axios.get('/api/categories/get-categories');
//     if (!res) {
//         console.log('error');
//     }
//     return res.data?.data?.listOfCate;
// };

export const createNewCategory = async ({ categoryName }) => {
    const res = await axios.post('/api/categories/create-new-category', { categoryName });
    if (!res) {
        console.log('error');
    }
    return res.data;
};

export const updateCategory = async ({ id, categoryName }) => {
    const res = await axios.put('/api/categories/update-category', { id, categoryName });
    if (!res) {
        console.log('error');
    }
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await axios.get(`/api/categories/delete-category/${id}`);
    if (!res) {
        console.log('error');
    }
    return res.data;
};
