
import Layout from "@/components/layout/Layout";
import DatasetUploader from "@/components/datasets/DatasetUploader";
import DatasetsList from "@/components/datasets/DatasetsList";

const Datasets = () => {
  return (
    <Layout activePage="datasets">
      <section className="mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Dataset Management
          </h1>
          <p className="text-muted-foreground">
            Upload and manage healthcare datasets for fairness-aware model training.
          </p>
        </div>
      </section>

      <div className="grid gap-6">
        <DatasetUploader />
        <DatasetsList />
      </div>
    </Layout>
  );
};

export default Datasets;
