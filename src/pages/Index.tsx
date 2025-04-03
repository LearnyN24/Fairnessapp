
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileUp, BarChart3, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardStats from "@/components/dashboard/DashboardStats";
import FairnessMetricsChart from "@/components/dashboard/FairnessMetricsChart";
import DemographicDisparity from "@/components/dashboard/DemographicDisparity";
import RecentModels from "@/components/dashboard/RecentModels";

const Index = () => {
  return (
    <Layout activePage="home">
      <section className="mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            EquaHealth AI Dashboard
          </h1>
          <p className="text-muted-foreground">
            Build fair and unbiased healthcare predictive models with advanced bias mitigation techniques.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link to="/datasets">
            <Button className="gap-2">
              <FileUp className="h-4 w-4" />
              Upload Dataset
            </Button>
          </Link>
          <Link to="/models">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Train Model
            </Button>
          </Link>
          <Link to="/fairness-docs">
            <Button variant="ghost" className="gap-2">
              <Info className="h-4 w-4" />
              Learn About Fairness
            </Button>
          </Link>
        </div>
      </section>

      <div className="space-y-6">
        <DashboardStats />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6 md:col-span-2 lg:col-span-2">
            <FairnessMetricsChart />
            <DemographicDisparity />
          </div>
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <div className="rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Fairness Quick Tips</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>Monitor disparate impact across demographic groups</span>
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>Balance accuracy with equalized odds for optimal fairness</span>
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>Use adversarial debiasing for complex healthcare models</span>
                </li>
                <li className="flex gap-2">
                  <ArrowRight className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>Apply post-processing techniques to existing biased models</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link to="/fairness-docs">
                  <Button variant="link" className="p-0 h-auto text-teal-600">
                    Read fairness documentation →
                  </Button>
                </Link>
              </div>
            </div>
            <RecentModels />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
