import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useModels } from "@/context/ModelsContext";
import { useDatasets } from "@/context/DatasetsContext";

interface ModelTrainingFormProps {
  defaultDataset: string;
  defaultTargetVariables: string[];
  recommendedAlgorithms: string[];
}

const ModelTrainingForm = ({ defaultDataset, defaultTargetVariables, recommendedAlgorithms }: ModelTrainingFormProps) => {
  const [modelName, setModelName] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(recommendedAlgorithms[0]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addModel } = useModels();
  const { datasets } = useDatasets();

  const dataset = datasets.find(d => d.id === defaultDataset);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isTraining) {
      progressInterval = setInterval(() => {
        setTrainingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isTraining]);

  const handleTrainModel = async () => {
    if (!modelName) {
      toast({
        title: "Error",
        description: "Please provide a model name.",
        variant: "destructive"
      });
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      // Simulate training process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Add the trained model to the context
      addModel({
        name: modelName,
        algorithm: selectedAlgorithm === "lr" ? "Logistic Regression" :
                 selectedAlgorithm === "rf" ? "Random Forest" :
                 selectedAlgorithm === "xgb" ? "XGBoost" :
                 selectedAlgorithm === "nn" ? "Neural Network" : selectedAlgorithm,
        datasetId: defaultDataset,
        datasetSize: dataset?.recordCount.toString() || "0",
        accuracy: 0.85 + Math.random() * 0.1, // Simulated accuracy between 0.85 and 0.95
        fairnessStatus: Math.random() > 0.3 ? "fair" : "biased", // 70% chance of being fair
      });

      // Show success message
      toast({
        title: "Success",
        description: `Model "${modelName}" trained successfully with fairness constraints.`,
      });

      // Reset form state
      setModelName("");
      setIsTraining(false);
      setTrainingProgress(0);

      // Navigate to models page with replace to prevent back navigation
      navigate("/models", { replace: true });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to train model. Please try again.",
        variant: "destructive"
      });
      setIsTraining(false);
      setTrainingProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Train Fairness-Aware Model</CardTitle>
        <CardDescription>
          Configure and train a model with fairness constraints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Basic Settings */}
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Input 
                  id="model-name" 
                  placeholder="e.g., Heart Disease Classifier" 
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  disabled={isTraining}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataset">Dataset</Label>
                <Input 
                  id="dataset" 
                  value={defaultDataset}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="algorithm">Algorithm</Label>
                <Select 
                  defaultValue={recommendedAlgorithms[0]}
                  onValueChange={setSelectedAlgorithm}
                  disabled={isTraining}
                >
                  <SelectTrigger id="algorithm">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {recommendedAlgorithms.map((algo) => (
                      <SelectItem key={algo} value={algo}>
                        {algo === "lr" ? "Logistic Regression" :
                         algo === "rf" ? "Random Forest" :
                         algo === "xgb" ? "XGBoost" :
                         algo === "nn" ? "Neural Network" : algo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target">Target Variable</Label>
                <Select 
                  defaultValue={defaultTargetVariables[0]}
                  disabled={isTraining}
                >
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultTargetVariables.map((target) => (
                      <SelectItem key={target} value={target}>
                        {target.charAt(0).toUpperCase() + target.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Training Progress */}
          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
            </div>
          )}

          {/* Advanced Settings */}
          <Accordion type="single" collapsible>
            <AccordionItem value="fairness-constraints">
              <AccordionTrigger>Fairness Constraints</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-fairness">Enable Fairness Constraints</Label>
                      <p className="text-sm text-muted-foreground">
                        Apply fairness constraints during model training
                      </p>
                    </div>
                    <Switch id="enable-fairness" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fairness-method">Fairness Method</Label>
                    <Select defaultValue="reweighing">
                      <SelectTrigger id="fairness-method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reweighing">Reweighing</SelectItem>
                        <SelectItem value="adversarial">Adversarial Debiasing</SelectItem>
                        <SelectItem value="prejudice">Prejudice Remover</SelectItem>
                        <SelectItem value="calibrated">Calibrated Equalized Odds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fairness-weight">Fairness-Accuracy Tradeoff</Label>
                      <span className="text-sm text-muted-foreground">0.7</span>
                    </div>
                    <Slider defaultValue={[0.7]} min={0} max={1} step={0.1} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Higher values prioritize fairness over accuracy
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Protected Attributes to Consider</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="attr-race" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="attr-race">Race</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="attr-gender" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="attr-gender">Gender</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="attr-age" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="attr-age">Age</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="attr-income" className="rounded border-gray-300" />
                        <Label htmlFor="attr-income">Income</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="model-params">
              <AccordionTrigger>Model Parameters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-depth">Max Depth</Label>
                      <Input id="max-depth" type="number" defaultValue="8" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="n-estimators">Number of Estimators</Label>
                      <Input id="n-estimators" type="number" defaultValue="100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="learning-rate">Learning Rate</Label>
                      <Input id="learning-rate" type="number" defaultValue="0.1" step="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-samples">Min Samples Split</Label>
                      <Input id="min-samples" type="number" defaultValue="2" />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="evaluation">
              <AccordionTrigger>Evaluation Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="validation-method">Validation Method</Label>
                    <Select defaultValue="cv">
                      <SelectTrigger id="validation-method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cv">Cross-Validation (5-fold)</SelectItem>
                        <SelectItem value="split">Train/Test Split (80/20)</SelectItem>
                        <SelectItem value="holdout">Holdout Validation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fairness Metrics to Report</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-eqodds" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="metric-eqodds">Equalized Odds</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-dp" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="metric-dp">Demographic Parity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-eo" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="metric-eo">Equal Opportunity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-di" defaultChecked className="rounded border-gray-300" />
                        <Label htmlFor="metric-di">Disparate Impact</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleTrainModel}
          disabled={!modelName || isTraining}
          className="w-full"
        >
          {isTraining ? "Training..." : "Train Model"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModelTrainingForm;
