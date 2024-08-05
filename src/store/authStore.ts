export const getToken = () => {
    const token = localStorage.getItem('accessToken');
    return token;
};

export const removeToken = () => {
    localStorage.removeItem('token');
}