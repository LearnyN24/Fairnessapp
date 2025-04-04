import { Activity, Users, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModels } from "@/context/ModelsContext";
import { useDatasets } from "@/context/DatasetsContext";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatsCard = ({ title, value, description, icon, iconColor }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className={`rounded-full p-2 ${iconColor}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  const { models } = useModels();
  const { datasets } = useDatasets();

  // Calculate total unique protected attributes across all datasets
  const uniqueProtectedAttrs = new Set(
    datasets.flatMap(dataset => dataset.protectedAttrs)
  ).size;

  // Count biased models
  const biasedModels = models.filter(model => model.fairnessStatus === "biased").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Models Trained"
        value={models.length.toString()}
        description="Active fairness-aware models"
        icon={<Activity className="h-4 w-4 text-white" />}
        iconColor="bg-teal-500"
      />
      <StatsCard
        title="Demographics"
        value={uniqueProtectedAttrs.toString()}
        description="Protected attributes monitored"
        icon={<Users className="h-4 w-4 text-white" />}
        iconColor="bg-blue-500"
      />
      <StatsCard
        title="Datasets"
        value={datasets.length.toString()}
        description="Healthcare datasets analyzed"
        icon={<FileText className="h-4 w-4 text-white" />}
        iconColor="bg-violet-500"
      />
      <StatsCard
        title="Bias Alerts"
        value={biasedModels.toString()}
        description="Models with fairness issues"
        icon={<AlertCircle className="h-4 w-4 text-white" />}
        iconColor="bg-red-500"
      />
    </div>
  );
};

export default DashboardStats;
