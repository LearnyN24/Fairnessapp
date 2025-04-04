import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Eye, BarChart3, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDatasets, Dataset } from "@/context/DatasetsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useState } from "react";

const DatasetsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { datasets, deleteDataset } = useDatasets();
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsViewDialogOpen(true);
  };

  const handleTrainModel = (dataset: Dataset) => {
    navigate(`/models/train?dataset=${dataset.id}`);
  };

  const handleDeleteDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDataset) {
      deleteDataset(selectedDataset.id);
      toast({
        title: "Dataset Deleted",
        description: `${selectedDataset.name} has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedDataset(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Available Datasets</CardTitle>
          <CardDescription>
            Healthcare datasets available for training fairness-aware models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Records</TableHead>
                  <TableHead className="hidden md:table-cell">Features</TableHead>
                  <TableHead>Protected Attributes</TableHead>
                  <TableHead className="hidden md:table-cell">Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasets.map((dataset) => (
                  <TableRow key={dataset.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="text-muted-foreground h-4 w-4" />
                        {dataset.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{dataset.recordCount.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{dataset.features}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {dataset.protectedAttrs.map((attr) => (
                          <Badge key={attr} variant="outline">{attr}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{dataset.dateAdded}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          title="View Dataset"
                          onClick={() => handleViewDataset(dataset)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          title="Train Model"
                          onClick={() => handleTrainModel(dataset)}
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          title="Delete Dataset"
                          onClick={() => handleDeleteDataset(dataset)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dataset Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDataset?.name}</DialogTitle>
            <DialogDescription>
              Detailed information about the dataset
            </DialogDescription>
          </DialogHeader>
          {selectedDataset && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Dataset Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                    <p className="font-medium">{selectedDataset.recordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Features</p>
                    <p className="font-medium">{selectedDataset.features}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Protected Attributes</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedDataset.protectedAttrs.map((attr) => (
                    <Badge key={attr} variant="outline">{attr}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Added On</h4>
                <p>{selectedDataset.dateAdded}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Dataset</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedDataset?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DatasetsList;
