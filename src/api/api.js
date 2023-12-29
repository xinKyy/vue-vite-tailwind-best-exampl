import axios from './axios_instance';
export const APIGetUSerList = (params) => {
  return axios.get('/get_user_list', { params });
};
export const APIAddUSer = (params) => {
  return axios.post('/add_user',  params );
};
export const APIEditUSer = (params) => {
  return axios.post('/edit_user',  params );
};
