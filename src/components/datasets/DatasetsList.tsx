
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Eye, BarChart3, Trash } from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  recordCount: number;
  features: number;
  protectedAttrs: string[];
  dateAdded: string;
}

const mockDatasets: Dataset[] = [
  {
    id: "dataset-1",
    name: "MIMIC-III Heart Failure",
    recordCount: 12000,
    features: 19,
    protectedAttrs: ["Age", "Gender", "Race"],
    dateAdded: "2023-12-10",
  },
  {
    id: "dataset-2",
    name: "Diabetes Readmission",
    recordCount: 8500,
    features: 24,
    protectedAttrs: ["Age", "Gender", "Income"],
    dateAdded: "2023-11-28",
  },
  {
    id: "dataset-3",
    name: "COVID-19 ICU Prediction",
    recordCount: 5200,
    features: 31,
    protectedAttrs: ["Age", "Race", "Insurance"],
    dateAdded: "2023-10-15",
  }
];

const DatasetsList = () => {
  return (
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
              {mockDatasets.map((dataset) => (
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
                      <Button size="icon" variant="ghost" title="View Dataset">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Train Model">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Delete Dataset">
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
  );
};

export default DatasetsList;
