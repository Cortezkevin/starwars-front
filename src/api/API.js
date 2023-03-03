import { AXIOS_INTANCE } from './AxiosConfig';

export const getAll = async ( resource, page ) => {
    try {
        const { data } = await AXIOS_INTANCE.get(`/${resource}?page=${page}`);
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false
        }
    }
}

export const getById = async ( resource, id ) => {
    try {
        const { data } = await AXIOS_INTANCE.get(`/${resource}/${id}`);
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false
        }
    }
}

export const getByManyIds = async ( resource, ids ) => {
    try {
        const { data } = await AXIOS_INTANCE.get(`/${resource}/getMany/${ids}`);
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false
        }
    }
}