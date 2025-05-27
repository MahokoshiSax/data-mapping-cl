"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { departments, dataSubjectTypes } from "@/data/mock-data"; // Assuming mock data is suitable for filter options
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"; // Import Drawer components

interface DataMappingFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: { departments: string[]; dataSubjectTypes: string[]; searchQuery: string }) => void;
  initialFilters: { departments: string[]; dataSubjectTypes: string[] };
}

export function DataMappingFilter({
  isOpen,
  onClose,
  onApplyFilter,
  initialFilters,
}: DataMappingFilterProps) {
  const [selectedDepartments, setSelectedDepartments] = React.useState<string[]>(
    initialFilters.departments
  );
  const [selectedDataSubjectTypes, setSelectedDataSubjectTypes] = React.useState<string[]>(
    initialFilters.dataSubjectTypes
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setSelectedDepartments(initialFilters.departments);
    setSelectedDataSubjectTypes(initialFilters.dataSubjectTypes);
    // We might want to set initial searchQuery here if it's part of initialFilters
  }, [initialFilters]);

  const handleDepartmentChange = (department: string, isChecked: boolean) => {
    setSelectedDepartments((prev) =>
      isChecked ? [...prev, department] : prev.filter((d) => d !== department)
    );
  };

  const handleDataSubjectTypeChange = (type: string, isChecked: boolean) => {
    setSelectedDataSubjectTypes((prev) =>
      isChecked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const handleApply = () => {
    onApplyFilter({
      departments: selectedDepartments,
      dataSubjectTypes: selectedDataSubjectTypes,
      searchQuery: searchQuery,
    });
    onClose(); // Close drawer on apply
  };

  const handleReset = () => {
    setSelectedDepartments([]);
    setSelectedDataSubjectTypes([]);
    setSearchQuery("");
    // Note: We are not applying the filter immediately on reset here.
    // If you want reset to also trigger filter application with empty values,
    // uncomment the onApplyFilter call below.
    // onApplyFilter({
    //     departments: [],
    //     dataSubjectTypes: [],
    //     searchQuery: ""
    // });
    // Optionally close the filter after reset
    // onClose();
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right" > 
      <DrawerContent>
        <DrawerHeader> 
          <DrawerTitle>Filter</DrawerTitle> 
        </DrawerHeader>
        <div className="h-full p-4 space-y-6 overflow-y-auto flex-grow"> 
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search filter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Department Filter */}
          <div>
            <h3 className="text-md font-medium mb-2">DEPARTMENT</h3>
            <div className="space-y-2">
              {departments.map((department) => (
                <div key={department} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dept-${department}`}
                    checked={selectedDepartments.includes(department)}
                    onCheckedChange={(isChecked) =>
                      handleDepartmentChange(department, isChecked as boolean)
                    }
                  />
                  <Label htmlFor={`dept-${department}`}>{department}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Data Subject Filter */}
          <div>
            <h3 className="text-md font-medium mb-2">DATA SUBJECT</h3>
            <div className="space-y-2">
              {dataSubjectTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedDataSubjectTypes.includes(type)}
                    onCheckedChange={(isChecked) =>
                      handleDataSubjectTypeChange(type, isChecked as boolean)
                    }
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DrawerFooter> 
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button onClick={handleApply}>Apply Filter</Button>
          </div>
        </DrawerFooter>
      </DrawerContent> 
    </Drawer> 
  );
} 