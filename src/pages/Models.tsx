import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import RecentModels from "@/components/dashboard/RecentModels";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Models = () => {
  const navigate = useNavigate();

  return (
    <Layout activePage="models">
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Models
            </h1>
            <p className="text-muted-foreground">
              View and manage your fairness-aware healthcare prediction models.
            </p>
          </div>
          <Button 
            onClick={() => navigate("/datasets")}
            className="gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Train New Model
          </Button>
        </div>
      </section>

      <div className="grid gap-6">
        <RecentModels />
      </div>
    </Layout>
  );
};

export default Models;
