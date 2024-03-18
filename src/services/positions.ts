import { TPosition } from '@/types/positionTypes';
import axios from 'axios';
const API_URL = 'http://localhost:3001';

export const searchPositionCatalog = async (query: string) => {
    return await axios.get(`${API_URL}/samples`);
}

export const getPositions = async (orderBy = 'desc') => {
    return await axios.get(`${API_URL}/positions`);
};

export const getPosition = async (id : string) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createPosition = async (position : TPosition) => {
    return await axios.post(`${API_URL}/positions`, position);
};

export const updatePosition = async (id : string, position : TPosition) => {
    return await axios.put(`${API_URL}/positions/${id}`, position);
};

export const deletePosition = async (id : string) => {
    return await axios.delete(`${API_URL}/positions/${id}`);
};
