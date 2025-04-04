import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">About EquaHealth AI</h1>
            <p className="text-muted-foreground">
              Building fair and unbiased healthcare prediction models
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              EquaHealth AI is dedicated to developing fair and unbiased artificial intelligence solutions 
              for healthcare applications. We believe that AI in healthcare should serve all populations 
              equally, without discriminating based on age, gender, ethnicity, or other protected attributes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What We Do</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Fairness-Aware Model Training</h3>
                <p className="text-muted-foreground">
                  Our platform enables the development of machine learning models with built-in fairness 
                  constraints, ensuring equitable predictions across all demographic groups.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Bias Detection & Mitigation</h3>
                <p className="text-muted-foreground">
                  We provide comprehensive tools for detecting and mitigating bias in healthcare AI models, 
                  helping organizations maintain high standards of fairness.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Our system continuously monitors model performance across different demographic groups, 
                  ensuring sustained fairness over time.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Technology</h2>
            <p className="text-muted-foreground">
              We leverage state-of-the-art fairness-aware machine learning techniques, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Adversarial debiasing during model training</li>
              <li>Multi-objective optimization for fairness constraints</li>
              <li>Post-processing techniques for bias mitigation</li>
              <li>Comprehensive fairness metrics and monitoring</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About; 