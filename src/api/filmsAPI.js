import { AXIOS_INTANCE } from './AxiosConfig';

export const getAll = async ( ) => {
    const { data } = await AXIOS_INTANCE.get("/film");
    return data;
}

export const getById = async ( id ) => {
    try {
        const { data } = await AXIOS_INTANCE.get(`/film/${id}`);
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}

export const getByManyIds = async ( id ) => {
    const { data } = await AXIOS_INTANCE.get(`/film/getMany/${id}`);
    return data;
}