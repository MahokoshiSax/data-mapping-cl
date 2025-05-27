"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataMappingDialog } from "@/components/data-mapping/data-mapping-dialog";
import { dataMappingService } from "@/services/data-mapping.service";
import { DataMapping, CreateDataMappingDto, UpdateDataMappingDto } from "@/types/data-mapping";
import { toast } from "sonner";
import { departments, dataSubjectTypes } from "@/data/mock-data";
import { Filter, Download, Upload, Edit, Trash2, Home as HomeIcon } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataMappingFilter } from "@/components/data-mapping/DataMappingFilter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DataMappingPage() {
  const [filteredMappings, setFilteredMappings] = useState<DataMapping[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    departments: string[];
    dataSubjectTypes: string[];
    searchQuery: string;
  }>({ departments: [], dataSubjectTypes: [], searchQuery: "" });
  const [editingMapping, setEditingMapping] = useState<DataMapping | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mappingToDeleteId, setMappingToDeleteId] = useState<string | null>(null);

  const fetchMappings = async () => {
    try {
      const data = await dataMappingService.getAll();
      const allFiltered = data.filter(mapping => {
        const departmentMatch = activeFilters.departments.length === 0 || activeFilters.departments.includes(mapping.department);
        const searchMatch = activeFilters.searchQuery === "" || mapping.title.toLowerCase().includes(activeFilters.searchQuery.toLowerCase());
        return departmentMatch && searchMatch;
      });
      setFilteredMappings(allFiltered);
    } catch (error) {
      toast.error("Failed to fetch data mappings");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMappings();
  }, [activeFilters]);

  const handleSubmit = async (values: CreateDataMappingDto, id?: string) => {
    try {
      if (id) {
        await dataMappingService.update(id, values as UpdateDataMappingDto);
        toast.success("Data mapping updated successfully");
      } else {
        await dataMappingService.create(values);
        toast.success("Data mapping created successfully");
      }
      setIsDialogOpen(false);
      fetchMappings();
    } catch (error) {
      toast.error(`Failed to ${id ? 'update' : 'create'} data mapping`);
      console.error(error);
    }
  };

  const handleEditClick = (mapping: DataMapping) => {
    setEditingMapping(mapping);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (mappingId: string) => {
    setMappingToDeleteId(mappingId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (mappingToDeleteId) {
      try {
        await dataMappingService.delete(mappingToDeleteId);
        toast.success("Data mapping deleted successfully");
        fetchMappings();
      } catch (error) {
        toast.error("Failed to delete data mapping");
        console.error(error);
      } finally {
        setMappingToDeleteId(null);
        setIsDeleteDialogOpen(false);
      }
    }
  };

  const handleApplyFilter = (filters: { departments: string[]; dataSubjectTypes: string[]; searchQuery: string }) => {
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingMapping(null);
    }
    setIsDialogOpen(open);
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find(d => d === departmentId);
    return department || departmentId;
  };

  const getDataSubjectTypeNames = (typeIds: string[]) => {
    return typeIds.map(id => {
      const type = dataSubjectTypes.find(t => t === id);
      return type || id;
    }).join(", ");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <AppHeader />
      <div className="flex flex-grow">
        <AppSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <HomeIcon className="h-4 w-4" />
            <span>/</span>
            <span>Current path</span>
            <span>/</span>
            <span className="font-medium text-foreground">Data Mapping</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Data Mapping</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFilterOpen(true)}>
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button disabled variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button disabled variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <DataMappingDialog
                open={isDialogOpen}
                onOpenChange={handleDialogClose}
                onSubmit={handleSubmit}
                initialData={editingMapping}
              />
            </div>
          </div>
          <Tabs defaultValue="data-mapping">
              <TabsList>
                <TabsTrigger value="data-mapping">Data Mapping</TabsTrigger>
                <TabsTrigger value="collection-sources">Collection Sources</TabsTrigger>
              </TabsList>
            </Tabs>
          <Card className="w-full">
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="px-4 bg-slate-50 hover:bg-slate-50">
                        <TableHead className="min-w-[200px] text-slate-700">Title</TableHead>
                        <TableHead className="min-w-[250px] text-slate-700">Description</TableHead>
                        <TableHead className="min-w-[150px] text-slate-700">Departments</TableHead>
                        <TableHead className="min-w-[200px] text-slate-700">Data Subject Types</TableHead>
                        <TableHead className="min-w-[100px] text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMappings.map((mapping) => (
                        <TableRow key={mapping._id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-slate-900">{mapping.title}</TableCell>
                          <TableCell className="text-slate-700">{mapping.description}</TableCell>
                          <TableCell className="text-slate-700">{getDepartmentName(mapping.department)}</TableCell>
                          <TableCell className="text-slate-700">
                            {getDataSubjectTypeNames(mapping.dataSubjectTypes)}
                          </TableCell>
                          <TableCell className="text-slate-700 flex items-center gap-2">
                            <Edit className="h-4 w-4 text-blue-500 cursor-pointer" onClick={() => handleEditClick(mapping)}/>
                            <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => handleDeleteClick(mapping._id)}/>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredMappings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                            No mappings found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <DataMappingFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilter={handleApplyFilter}
        initialFilters={activeFilters}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the data mapping.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 