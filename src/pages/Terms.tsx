import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">
              Please read these terms carefully before using our service
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using EquaHealth AI's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Use of Service</h2>
            <p className="text-muted-foreground">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Be at least 18 years old</li>
              <li>Register for an account with valid information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service in compliance with all applicable laws</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Usage</h2>
            <p className="text-muted-foreground">
              By using our service, you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Retain ownership of your data</li>
              <li>Grant us license to process your data for service provision</li>
              <li>Are responsible for ensuring you have rights to the data you upload</li>
              <li>Agree to our data processing practices as described in our Privacy Policy</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Service Limitations</h2>
            <p className="text-muted-foreground">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Modify or discontinue any part of our service</li>
              <li>Limit access to certain features or functionality</li>
              <li>Update these terms at any time</li>
              <li>Terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Liability</h2>
            <p className="text-muted-foreground">
              Our service is provided "as is" without warranties of any kind. We are not liable for any 
              damages arising from your use of our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these terms at any time. We will notify users of significant changes via email 
              or through the service. Continued use of the service after changes constitutes acceptance 
              of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about these terms, please contact us at:
              <br />
              <a href="mailto:legal@equahealth.ai" className="text-primary hover:underline">
                legal@equahealth.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms; 