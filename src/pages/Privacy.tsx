import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <Layout activePage="">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Your privacy is important to us
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Collection and Usage</h2>
            <p className="text-muted-foreground">
              We are committed to protecting your privacy and ensuring the security of your data. 
              Our data collection and usage practices comply with all applicable laws and regulations, 
              including HIPAA requirements for healthcare data.
            </p>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What We Collect</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Healthcare datasets for model training</li>
                <li>Model training configurations and parameters</li>
                <li>Performance metrics and evaluation results</li>
                <li>User account information and preferences</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Protection</h2>
            <p className="text-muted-foreground">
              We implement robust security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>End-to-end encryption for data transmission</li>
              <li>Secure data storage with regular backups</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits and updates</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Sharing</h2>
            <p className="text-muted-foreground">
              We do not share your data with third parties unless:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Required by law</li>
              <li>Necessary for providing our services</li>
              <li>You have given explicit consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Export your data</li>
              <li>Opt-out of data collection</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our privacy policy, please contact us at:
              <br />
              <a href="mailto:privacy@equahealth.ai" className="text-primary hover:underline">
                privacy@equahealth.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy; 