export interface DataMapping {
  _id: string;
  title: string;
  description?: string;
  department: string;
  dataSubjectTypes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateDataMappingDto {
  title: string;
  description?: string;
  department: string;
  dataSubjectTypes: string[];
}

export type UpdateDataMappingDto = Partial<CreateDataMappingDto>;

export interface DataMappingFilters {
  title?: string;
  department?: string;
  dataSubjectType?: string;
  description?: string;
} 