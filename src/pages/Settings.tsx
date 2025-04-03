
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <Layout activePage="settings">
      <section className="mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Configure application preferences and fairness parameters.
          </p>
        </div>
      </section>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="fairness">Fairness</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your account and basic application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Interface</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-fairness-warnings">Show Fairness Warnings</Label>
                      <p className="text-sm text-muted-foreground">
                        Display warnings when fairness metrics fall below threshold
                      </p>
                    </div>
                    <Switch id="show-fairness-warnings" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-tooltips">Show Tooltips</Label>
                      <p className="text-sm text-muted-foreground">
                        Display explanatory tooltips for fairness metrics
                      </p>
                    </div>
                    <Switch id="show-tooltips" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fairness">
          <Card>
            <CardHeader>
              <CardTitle>Fairness Settings</CardTitle>
              <CardDescription>Configure fairness thresholds and parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fairness Thresholds</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dp-threshold">Demographic Parity Threshold</Label>
                    <Input id="dp-threshold" type="number" defaultValue="0.8" min="0" max="1" step="0.01" />
                    <p className="text-xs text-muted-foreground">
                      Minimum acceptable ratio (0-1)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eo-threshold">Equalized Odds Threshold</Label>
                    <Input id="eo-threshold" type="number" defaultValue="0.8" min="0" max="1" step="0.01" />
                    <p className="text-xs text-muted-foreground">
                      Minimum acceptable ratio (0-1)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Mitigation Approach</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="default-mitigation">Default Mitigation Method</Label>
                    <Select defaultValue="reweighing">
                      <SelectTrigger id="default-mitigation">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reweighing">Reweighing</SelectItem>
                        <SelectItem value="adversarial">Adversarial Debiasing</SelectItem>
                        <SelectItem value="prejudice">Prejudice Remover</SelectItem>
                        <SelectItem value="calibrated">Calibrated Equalized Odds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="apply-automatically">Apply Fairness Automatically</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically apply fairness constraints to all models
                      </p>
                    </div>
                    <Switch id="apply-automatically" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Fairness Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced model and system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Model Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-threads">Max CPU Threads</Label>
                    <Input id="max-threads" type="number" defaultValue="4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memory-limit">Memory Limit (GB)</Label>
                    <Input id="memory-limit" type="number" defaultValue="8" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="use-gpu">Use GPU Acceleration</Label>
                    <p className="text-sm text-muted-foreground">
                      Utilize GPU for model training when available
                    </p>
                  </div>
                  <Switch id="use-gpu" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Storage</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="storage-location">Storage Location</Label>
                    <Input id="storage-location" defaultValue="./data" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup datasets and models
                      </p>
                    </div>
                    <Switch id="auto-backup" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Advanced Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
