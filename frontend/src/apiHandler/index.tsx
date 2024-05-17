import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Assuming your API is served on port 3000
});

export default api;


export const signup = (userData:any) => api.post('/signup', userData);
export const login = (userData:any) => api.post('/login', userData);
export const postArticle = (articleData:any, token:any) =>
  api.post('/post', articleData, { headers: { Authorization: `${token}` } });
export const getAllPosts = () => api.get('/post');
export const getPostById = (authorId:any) => api.get(`/post/${authorId}`);
