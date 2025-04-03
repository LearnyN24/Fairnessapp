
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, FileText, AlertCircle } from "lucide-react";

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  description,
  iconColor
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  description: string;
  iconColor: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${iconColor}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Models Trained"
        value="4"
        description="Active fairness-aware models"
        icon={<Activity className="h-4 w-4 text-white" />}
        iconColor="bg-teal-500"
      />
      <StatsCard
        title="Demographics"
        value="8"
        description="Protected attributes monitored"
        icon={<Users className="h-4 w-4 text-white" />}
        iconColor="bg-blue-500"
      />
      <StatsCard
        title="Datasets"
        value="3"
        description="Healthcare datasets analyzed"
        icon={<FileText className="h-4 w-4 text-white" />}
        iconColor="bg-violet-500"
      />
      <StatsCard
        title="Bias Alerts"
        value="2"
        description="Fairness metrics below threshold"
        icon={<AlertCircle className="h-4 w-4 text-white" />}
        iconColor="bg-red-500"
      />
    </div>
  );
};

export default DashboardStats;
