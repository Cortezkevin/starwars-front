import { AXIOS_INTANCE } from './AxiosConfig';

export const getAll = async () => {
    const { data } = await AXIOS_INTANCE.get("/film");
    return data;
}

export const getById = async ( id ) => {
    const { data } = await AXIOS_INTANCE.get(`/film/${id}`);
    return data;
}