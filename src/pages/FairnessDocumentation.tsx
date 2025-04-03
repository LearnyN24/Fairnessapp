
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BarChart3, ShieldAlert, Users, Scale, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FairnessDocumentation = () => {
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
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Fairness Documentation</h1>
            <p className="text-muted-foreground">
              Understanding and implementing fairness in healthcare AI models
            </p>
          </div>

          <Separator />
          
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-semibold">What is AI Fairness?</h2>
            </div>
            <p>
              AI fairness refers to the development and use of artificial intelligence systems that avoid 
              creating or reinforcing bias against certain demographic groups. In healthcare, fairness is 
              particularly crucial as biased AI can lead to disparities in care, misdiagnosis, 
              or inappropriate treatment recommendations for underrepresented groups.
            </p>
            <p>
              EquaHealth AI focuses on identifying and mitigating these biases to ensure that predictive 
              models perform equitably across all patient populations, regardless of race, age, gender, 
              socioeconomic status, or other sensitive attributes.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-semibold">Key Fairness Metrics</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">Demographic Parity</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures that the overall predicted positive rate is the same across all demographic groups, 
                  regardless of the true positive rates.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Equalized Odds</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures that the true positive rate and false positive rate are the same across all 
                  demographic groups, balancing accuracy with fairness.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Equal Opportunity</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures that the true positive rate is the same for all demographic groups, focusing 
                  specifically on correctly identifying positive outcomes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Disparate Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Measures whether a model disproportionately affects one protected group over another, 
                  with a ratio target of at least 0.8 (80%).
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-semibold">Common Bias Sources in Healthcare AI</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium">Training Data Bias</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Historical healthcare data often reflects existing societal disparities and unequal access to care.
                </p>
              </li>
              <li>
                <span className="font-medium">Missing Data Patterns</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Certain demographic groups may have systematically missing data elements, leading to less accurate predictions.
                </p>
              </li>
              <li>
                <span className="font-medium">Label Bias</span>
                <p className="text-sm text-muted-foreground mt-1">
                  The outcome variables (labels) used for training might reflect historical bias in clinical decisions.
                </p>
              </li>
              <li>
                <span className="font-medium">Proxy Variables</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Variables that seem neutral but correlate strongly with protected attributes can perpetuate bias.
                </p>
              </li>
            </ul>
          </section>
          
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-semibold">Bias Mitigation Techniques</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Pre-processing Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Techniques applied to training data before model development, including:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  <li>Reweighting examples to balance representation</li>
                  <li>Removing sensitive attributes and their proxies</li>
                  <li>Data augmentation for underrepresented groups</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">In-processing Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Techniques applied during model training:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  <li>Adversarial debiasing to penalize bias during training</li>
                  <li>Fairness constraints in the optimization objective</li>
                  <li>Multi-task learning to balance accuracy and fairness</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Post-processing Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Techniques applied after model training:
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  <li>Threshold adjustments for different groups</li>
                  <li>Calibration to ensure equal error rates</li>
                  <li>Ensemble methods that combine multiple models</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-semibold">Best Practices for Healthcare AI Fairness</h2>
            </div>
            <ol className="space-y-3 list-decimal pl-5">
              <li>
                <span className="font-medium">Carefully document data sources and limitations</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Understand the demographic composition and potential biases in your training data.
                </p>
              </li>
              <li>
                <span className="font-medium">Involve diverse stakeholders</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Include healthcare providers, patients, and community representatives from diverse backgrounds.
                </p>
              </li>
              <li>
                <span className="font-medium">Monitor multiple fairness metrics</span>
                <p className="text-sm text-muted-foreground mt-1">
                  No single metric captures all aspects of fairness; analyze multiple metrics together.
                </p>
              </li>
              <li>
                <span className="font-medium">Conduct regular fairness audits</span>
                <p className="text-sm text-muted-foreground mt-1">
                  As new data arrives, re-evaluate model fairness and retrain if necessary.
                </p>
              </li>
              <li>
                <span className="font-medium">Establish clear thresholds and governance</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Define acceptable fairness metrics and establish processes for addressing detected bias.
                </p>
              </li>
            </ol>
          </section>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Need Help Implementing Fair AI?</h2>
            <p className="mb-4">Our team of experts can help you audit your existing healthcare models for bias and implement effective fairness strategies.</p>
            <Button>Contact Our Fairness Team</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FairnessDocumentation;
