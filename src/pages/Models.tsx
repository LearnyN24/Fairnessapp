
import Layout from "@/components/layout/Layout";
import ModelTrainingForm from "@/components/models/ModelTrainingForm";
import RecentModels from "@/components/dashboard/RecentModels";

const Models = () => {
  return (
    <Layout activePage="models">
      <section className="mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Model Training
          </h1>
          <p className="text-muted-foreground">
            Configure and train fairness-aware healthcare prediction models.
          </p>
        </div>
      </section>

      <div className="grid gap-6">
        <ModelTrainingForm />
        <RecentModels />
      </div>
    </Layout>
  );
};

export default Models;
