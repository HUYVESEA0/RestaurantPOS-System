import apiClient from './api';
import { Order } from '../types';

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/Orders');
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/Orders/${id}`);
    return response.data;
  },

  getByTable: async (tableId: number): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>(`/Orders/Table/${tableId}`);
    return response.data;
  },

  create: async (order: Omit<Order, 'id' | 'orderDate' | 'totalAmount'>): Promise<Order> => {
    const response = await apiClient.post<Order>('/Orders', order);
    return response.data;
  },

  updateStatus: async (id: number, status: string): Promise<void> => {
    await apiClient.patch(`/Orders/${id}/Status`, JSON.stringify(status));
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Orders/${id}`);
  },
};
