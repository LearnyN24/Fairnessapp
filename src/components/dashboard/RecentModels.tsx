import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  AlertCircle 
} from "lucide-react";
import { useModels } from "@/context/ModelsContext";
import DeleteModelButton from "@/components/models/DeleteModelButton";

const RecentModels = () => {
  const { models, deleteModel } = useModels();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recently Trained Models</CardTitle>
        <CardDescription>
          Overview of your latest fairness-aware models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Algorithm</TableHead>
              <TableHead className="hidden md:table-cell">Dataset Size</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Fairness Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Updated</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell className="font-medium">{model.name}</TableCell>
                <TableCell>{model.algorithm}</TableCell>
                <TableCell className="hidden md:table-cell">{model.datasetSize}</TableCell>
                <TableCell>{(model.accuracy * 100).toFixed(1)}%</TableCell>
                <TableCell>
                  {model.fairnessStatus === "fair" ? (
                    <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Fair
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Biased
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">{model.lastUpdated}</TableCell>
                <TableCell>
                  <DeleteModelButton
                    modelId={model.id}
                    modelName={model.name}
                    onDelete={deleteModel}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentModels;
