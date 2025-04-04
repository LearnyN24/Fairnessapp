import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ModelTrainingForm from "@/components/models/ModelTrainingForm";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useDatasets, Dataset } from "@/context/DatasetsContext";

// Extended Dataset type with training-specific properties
interface TrainingDataset extends Dataset {
  targetVariables: string[];
  recommendedAlgorithms: string[];
}

const TrainModel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { datasets } = useDatasets();
  const datasetId = searchParams.get("dataset");
  const [dataset, setDataset] = useState<TrainingDataset | null>(null);

  useEffect(() => {
    if (datasetId) {
      const foundDataset = datasets.find(d => d.id === datasetId);
      if (foundDataset) {
        // Add training-specific properties to the dataset
        const trainingDataset: TrainingDataset = {
          ...foundDataset,
          targetVariables: ["readmission", "mortality", "complications"], // Default target variables
          recommendedAlgorithms: ["rf", "xgb", "nn"], // Default recommended algorithms
        };
        setDataset(trainingDataset);
      } else {
        toast({
          title: "Error",
          description: "Invalid dataset selected. Redirecting to datasets page.",
          variant: "destructive",
        });
        navigate("/datasets");
      }
    } else {
      toast({
        title: "Error",
        description: "No dataset selected. Redirecting to datasets page.",
        variant: "destructive",
      });
      navigate("/datasets");
    }
  }, [datasetId, datasets, navigate, toast]);

  if (!dataset) {
    return (
      <Layout activePage="models">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activePage="models">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/datasets")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Train Model with {dataset.name}
            </h1>
            <p className="text-muted-foreground">
              Configure and train a fairness-aware model using this dataset
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dataset Information</CardTitle>
            <CardDescription>
              Overview of the selected dataset and its characteristics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Dataset Statistics</h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Records:</span>{" "}
                    {dataset.recordCount.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Features:</span>{" "}
                    {dataset.features}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Protected Attributes</h4>
                <div className="flex flex-wrap gap-1">
                  {dataset.protectedAttrs.map((attr) => (
                    <span
                      key={attr}
                      className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ModelTrainingForm 
          defaultDataset={dataset.id}
          defaultTargetVariables={dataset.targetVariables}
          recommendedAlgorithms={dataset.recommendedAlgorithms}
        />
      </div>
    </Layout>
  );
};

export default TrainModel; 