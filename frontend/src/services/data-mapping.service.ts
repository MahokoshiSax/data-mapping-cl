import axios from 'axios';
import { DataMapping, CreateDataMappingDto, UpdateDataMappingDto } from "@/types/data-mapping";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_VERSION = 'v1';

const api = axios.create({
  baseURL: `${API_URL}/api/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dataMappingService = {
  async getAll(): Promise<DataMapping[]> {
    const response = await api.get<DataMapping[]>('/data-mappings');
    return response.data;
  },

  async getById(id: string): Promise<DataMapping> {
    const response = await api.get<DataMapping>(`/data-mappings/${id}`);
    return response.data;
  },

  async create(data: CreateDataMappingDto): Promise<DataMapping> {
    const response = await api.post<DataMapping>('/data-mappings', data);
    return response.data;
  },

  async update(id: string, data: UpdateDataMappingDto): Promise<DataMapping> {
    const response = await api.patch<DataMapping>(`/data-mappings/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/data-mappings/${id}`);
  },
}; 