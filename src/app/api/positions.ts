import { TPosition } from '@/types/positionTypes';
import axios from 'axios';
const API_URL = 'http://localhost:3001/positions';

export const getPositions = async () => {
    return await axios.get(API_URL);
};

export const getPosition = async (id : string) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createPosition = async (position : TPosition) => {
    return await axios.post(API_URL, position);
};

export const updatePosition = async (id : string, position : TPosition) => {
    return await axios.put(`${API_URL}/${id}`, position);
};

export const deletePosition = async (id : string) => {
    return await axios.delete(`${API_URL}/${id}`);
};
