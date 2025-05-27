"use client";

import type { DataMappingFilters } from "@/types/data-mapping";

interface DataMappingFiltersProps {
  departments: string[];
  dataSubjectTypes: string[];
  filters: DataMappingFilters;
  onFilterChange: (filters: DataMappingFilters) => void;
}

export function DataMappingFilters({
  departments,
  dataSubjectTypes,
  filters,
  onFilterChange,
}: DataMappingFiltersProps) {
  const handleChange = (
    field: keyof DataMappingFilters,
    value: string
  ) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label htmlFor="filter-title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="filter-title"
          value={filters.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Filter by title..."
        />
      </div>

      <div>
        <label htmlFor="filter-department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          id="filter-department"
          value={filters.department || ""}
          onChange={(e) => handleChange("department", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-dataSubjectType" className="block text-sm font-medium text-gray-700">
          Data Subject Type
        </label>
        <select
          id="filter-dataSubjectType"
          value={filters.dataSubjectType || ""}
          onChange={(e) => handleChange("dataSubjectType", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {dataSubjectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="filter-description"
          value={filters.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Filter by description..."
        />
      </div>
    </div>
  );
} 