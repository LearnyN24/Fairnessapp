import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useModels } from "@/context/ModelsContext";

const FairnessMetricsChart = () => {
  const { models } = useModels();

  // Calculate average metrics for fair and biased models
  const fairModels = models.filter(model => model.fairnessStatus === "fair");
  const biasedModels = models.filter(model => model.fairnessStatus === "biased");

  const calculateAverageAccuracy = (modelsList: typeof models) => {
    if (modelsList.length === 0) return 0;
    return modelsList.reduce((sum, model) => sum + model.accuracy, 0) / modelsList.length;
  };

  const data = [
    {
      name: "Equalized Odds",
      biased: calculateAverageAccuracy(biasedModels),
      fair: calculateAverageAccuracy(fairModels),
    },
    {
      name: "Demo. Parity",
      biased: calculateAverageAccuracy(biasedModels) * 0.95,
      fair: calculateAverageAccuracy(fairModels) * 0.98,
    },
    {
      name: "Equal Opportunity",
      biased: calculateAverageAccuracy(biasedModels) * 0.92,
      fair: calculateAverageAccuracy(fairModels) * 0.97,
    },
    {
      name: "Disparate Impact",
      biased: calculateAverageAccuracy(biasedModels) * 0.88,
      fair: calculateAverageAccuracy(fairModels) * 0.96,
    },
  ];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Fairness Metrics Comparison</CardTitle>
        <CardDescription>
          Comparison between fair and biased models
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip 
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              labelStyle={{ color: "black" }}
            />
            <Legend />
            <Bar dataKey="biased" name="Biased Models" fill="#ef4444" />
            <Bar dataKey="fair" name="Fair Models" fill="#0d9488" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FairnessMetricsChart;
