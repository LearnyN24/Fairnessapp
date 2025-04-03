
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

const models = [
  {
    id: "m1",
    name: "Diabetes Risk Prediction",
    algorithm: "Random Forest",
    datasetSize: "5,428",
    accuracy: 0.91,
    fairnessStatus: "fair",
    lastUpdated: "2 days ago",
  },
  {
    id: "m2",
    name: "Heart Disease Classifier",
    algorithm: "Neural Network",
    datasetSize: "2,190",
    accuracy: 0.88,
    fairnessStatus: "biased",
    lastUpdated: "5 days ago",
  },
  {
    id: "m3",
    name: "Stroke Risk Assessment",
    algorithm: "Gradient Boosting",
    datasetSize: "3,976",
    accuracy: 0.85,
    fairnessStatus: "fair",
    lastUpdated: "1 week ago",
  },
  {
    id: "m4",
    name: "Cancer Recurrence Prediction",
    algorithm: "Logistic Regression",
    datasetSize: "1,842",
    accuracy: 0.82,
    fairnessStatus: "biased",
    lastUpdated: "2 weeks ago",
  },
];

const RecentModels = () => {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentModels;
