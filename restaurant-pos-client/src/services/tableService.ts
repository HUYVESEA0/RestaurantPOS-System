import apiClient from './api';
import { Table } from '../types';

export const tableService = {
  getAll: async (): Promise<Table[]> => {
    const response = await apiClient.get<Table[]>('/Tables');
    return response.data;
  },

  getAvailable: async (): Promise<Table[]> => {
    const response = await apiClient.get<Table[]>('/Tables/Available');
    return response.data;
  },

  getById: async (id: number): Promise<Table> => {
    const response = await apiClient.get<Table>(`/Tables/${id}`);
    return response.data;
  },

create: async (table: Omit<Table, 'id'>): Promise<Table> => {
    const response = await apiClient.post<Table>('/Tables', table);
    return response.data;
  },

  update: async (id: number, table: Table): Promise<void> => {
    await apiClient.put(`/Tables/${id}`, table);
  },

  updateAvailability: async (id: number, isAvailable: boolean): Promise<void> => {
    await apiClient.patch(`/Tables/${id}/Availability`, isAvailable);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Tables/${id}`);
  },
};
