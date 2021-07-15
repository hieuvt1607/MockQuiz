export default {
    get(key) {
        if (!key) return null;
        return localStorage.getItem(key);
    },
    set(key, data) {
        if (!key) return false;
        if (typeof data === 'string') {
            localStorage.setItem(key, data);
            return true;
        }
        try {
            const content = JSON.stringify(data);
            localStorage.setItem(key, content);
            return true;
        } catch (error) {
            return false;
        }
    },
};
