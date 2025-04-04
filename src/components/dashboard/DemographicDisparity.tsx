import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useModels } from "@/context/ModelsContext";
import { useDatasets } from "@/context/DatasetsContext";

const DemographicDisparity = () => {
  const { models } = useModels();
  const { datasets } = useDatasets();

  // Get all unique protected attributes from datasets
  const allProtectedAttrs = new Set<string>();
  datasets.forEach(dataset => {
    dataset.protectedAttrs.forEach(attr => allProtectedAttrs.add(attr));
  });

  // Calculate performance metrics for each demographic group
  const calculateMetrics = (attribute: string) => {
    const fairModels = models.filter(m => m.fairnessStatus === "fair");
    const biasedModels = models.filter(m => m.fairnessStatus === "biased");

    // For this demo, we'll generate synthetic data based on real model counts
    const generateGroupData = (groupName: string, baseFairAccuracy: number, baseBiasedAccuracy: number) => {
      const totalModels = models.length || 1;
      const fairWeight = fairModels.length / totalModels;
      const biasedWeight = biasedModels.length / totalModels;
      
      return {
        group: groupName,
        accuracy: (fairWeight * baseFairAccuracy + biasedWeight * baseBiasedAccuracy),
        fpRate: Math.max(0.05, 0.15 - fairWeight * 0.1),
        fnRate: Math.max(0.05, 0.15 - fairWeight * 0.1),
      };
    };

    // Define demographic groups based on the attribute
    switch (attribute.toLowerCase()) {
      case "age":
        return [
          generateGroupData("18-30", 0.87, 0.82),
          generateGroupData("31-45", 0.91, 0.85),
          generateGroupData("46-60", 0.89, 0.83),
          generateGroupData("61-75", 0.84, 0.78),
          generateGroupData("75+", 0.78, 0.72),
        ];
      case "gender":
        return [
          generateGroupData("Female", 0.88, 0.82),
          generateGroupData("Male", 0.89, 0.83),
          generateGroupData("Non-binary", 0.87, 0.81),
        ];
      case "race":
      case "ethnicity":
        return [
          generateGroupData("Asian", 0.91, 0.85),
          generateGroupData("Black", 0.82, 0.76),
          generateGroupData("Hispanic", 0.85, 0.79),
          generateGroupData("White", 0.90, 0.84),
          generateGroupData("Other", 0.87, 0.81),
        ];
      default:
        return [
          generateGroupData("Group 1", 0.85, 0.80),
          generateGroupData("Group 2", 0.88, 0.82),
          generateGroupData("Group 3", 0.90, 0.84),
        ];
    }
  };

  // Get the first protected attribute or default to "race"
  const defaultAttr = allProtectedAttrs.size > 0 ? Array.from(allProtectedAttrs)[0] : "race";

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Demographic Performance Disparities</CardTitle>
        <CardDescription>
          Model performance across different demographic groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultAttr}>
          <TabsList className="grid w-full grid-cols-3">
            {Array.from(allProtectedAttrs).map(attr => (
              <TabsTrigger key={attr} value={attr}>
                {attr.charAt(0).toUpperCase() + attr.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {Array.from(allProtectedAttrs).map(attr => (
            <TabsContent key={attr} value={attr} className="pt-4">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={calculateMetrics(attr)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis 
                    domain={[0, 1]} 
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} 
                  />
                  <Tooltip 
                    formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                    labelStyle={{ color: "black" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy"
                    stroke="#0d9488"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fpRate" 
                    name="False Positive Rate" 
                    stroke="#ef4444" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fnRate" 
                    name="False Negative Rate" 
                    stroke="#f59e0b" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DemographicDisparity;
