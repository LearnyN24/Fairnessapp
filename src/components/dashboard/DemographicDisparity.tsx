
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

const ageData = [
  { group: "18-30", fpRate: 0.12, fnRate: 0.09, accuracy: 0.87 },
  { group: "31-45", fpRate: 0.08, fnRate: 0.06, accuracy: 0.91 },
  { group: "46-60", fpRate: 0.07, fnRate: 0.10, accuracy: 0.89 },
  { group: "61-75", fpRate: 0.14, fnRate: 0.15, accuracy: 0.84 },
  { group: "75+", fpRate: 0.18, fnRate: 0.20, accuracy: 0.78 },
];

const genderData = [
  { group: "Female", fpRate: 0.09, fnRate: 0.11, accuracy: 0.88 },
  { group: "Male", fpRate: 0.11, fnRate: 0.08, accuracy: 0.89 },
  { group: "Non-binary", fpRate: 0.10, fnRate: 0.12, accuracy: 0.87 },
];

const raceData = [
  { group: "Asian", fpRate: 0.07, fnRate: 0.08, accuracy: 0.91 },
  { group: "Black", fpRate: 0.15, fnRate: 0.14, accuracy: 0.82 },
  { group: "Hispanic", fpRate: 0.13, fnRate: 0.12, accuracy: 0.85 },
  { group: "White", fpRate: 0.08, fnRate: 0.07, accuracy: 0.90 },
  { group: "Other", fpRate: 0.11, fnRate: 0.10, accuracy: 0.87 },
];

const DemographicDisparity = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Demographic Performance Disparities</CardTitle>
        <CardDescription>
          Model performance across different demographic groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="race">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="race">Race</TabsTrigger>
            <TabsTrigger value="gender">Gender</TabsTrigger>
            <TabsTrigger value="age">Age</TabsTrigger>
          </TabsList>
          <TabsContent value="race" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={raceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#0d9488"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="fpRate" name="False Positive Rate" stroke="#ef4444" />
                <Line type="monotone" dataKey="fnRate" name="False Negative Rate" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="gender" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={genderData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#0d9488"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="fpRate" name="False Positive Rate" stroke="#ef4444" />
                <Line type="monotone" dataKey="fnRate" name="False Negative Rate" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="age" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={ageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#0d9488"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="fpRate" name="False Positive Rate" stroke="#ef4444" />
                <Line type="monotone" dataKey="fnRate" name="False Negative Rate" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DemographicDisparity;
