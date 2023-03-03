import { AXIOS_INTANCE } from './AxiosConfig';

export const getAll = async ( page ) => {
    const { data } = await AXIOS_INTANCE.get(`/people?page=${page}`);
    return data;
}

export const getById = async ( id ) => {
    try {
        const { data } = await AXIOS_INTANCE.get(`/people/${id}`);
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

export const getByManyIds = async ( ids ) => {
    const { data } = await AXIOS_INTANCE.get(`/people/getMany/${ids}`);
    return data;
}