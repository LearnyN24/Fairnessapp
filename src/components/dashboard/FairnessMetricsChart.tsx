
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockData = [
  {
    name: "Equalized Odds",
    before: 0.68,
    after: 0.92,
  },
  {
    name: "Demo. Parity",
    before: 0.72,
    after: 0.94,
  },
  {
    name: "Equal Opportunity",
    before: 0.65,
    after: 0.91,
  },
  {
    name: "Disparate Impact",
    before: 0.75,
    after: 0.97,
  },
];

const FairnessMetricsChart = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Fairness Metrics Comparison</CardTitle>
        <CardDescription>
          Before vs. after applying fairness constraints
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={mockData}
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
            <Bar dataKey="before" name="Before Mitigation" fill="#94a3b8" />
            <Bar dataKey="after" name="After Mitigation" fill="#0d9488" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FairnessMetricsChart;
