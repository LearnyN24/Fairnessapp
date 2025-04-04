import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/context/SettingsContext";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const handleSettingChange = (newSettings: Partial<typeof settings>, section: string) => {
    updateSettings(newSettings);
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated.`,
    });
  };

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

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                    <Input 
                      id="name" 
                      name="name" 
                      value={settings.name} 
                      onChange={(e) => handleSettingChange({ name: e.target.value }, "general")} 
                      placeholder="Your name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={settings.email} 
                      onChange={(e) => handleSettingChange({ email: e.target.value }, "general")} 
                      placeholder="Your email address" 
                    />
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
                    <Switch 
                      id="show-fairness-warnings" 
                      name="show-fairness-warnings"
                      checked={settings.showFairnessWarnings}
                      onCheckedChange={(checked) => handleSettingChange({ showFairnessWarnings: checked }, "general")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-tooltips">Show Tooltips</Label>
                      <p className="text-sm text-muted-foreground">
                        Display explanatory tooltips for fairness metrics
                      </p>
                    </div>
                    <Switch 
                      id="show-tooltips" 
                      name="show-tooltips"
                      checked={settings.showTooltips}
                      onCheckedChange={(checked) => handleSettingChange({ showTooltips: checked }, "general")}
                    />
                  </div>
                </div>
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
                    <Input 
                      id="dp-threshold" 
                      name="dp-threshold"
                      type="number" 
                      value={settings.demographicParityThreshold}
                      onChange={(e) => handleSettingChange({ demographicParityThreshold: parseFloat(e.target.value) }, "fairness")}
                      min="0" 
                      max="1" 
                      step="0.01" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum acceptable ratio (0-1)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eo-threshold">Equalized Odds Threshold</Label>
                    <Input 
                      id="eo-threshold" 
                      name="eo-threshold"
                      type="number" 
                      value={settings.equalizedOddsThreshold}
                      onChange={(e) => handleSettingChange({ equalizedOddsThreshold: parseFloat(e.target.value) }, "fairness")}
                      min="0" 
                      max="1" 
                      step="0.01" 
                    />
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
                    <Select 
                      name="default-mitigation" 
                      value={settings.defaultMitigationMethod}
                      onValueChange={(value) => handleSettingChange({ defaultMitigationMethod: value }, "fairness")}
                    >
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
                    <Switch 
                      id="apply-automatically" 
                      name="apply-automatically"
                      checked={settings.applyFairnessAutomatically}
                      onCheckedChange={(checked) => handleSettingChange({ applyFairnessAutomatically: checked }, "fairness")}
                    />
                  </div>
                </div>
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
                    <Input 
                      id="max-threads" 
                      name="max-threads"
                      type="number" 
                      value={settings.maxCpuThreads}
                      onChange={(e) => handleSettingChange({ maxCpuThreads: parseInt(e.target.value) }, "advanced")}
                      min="1"
                      max="32"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memory-limit">Memory Limit (GB)</Label>
                    <Input 
                      id="memory-limit" 
                      name="memory-limit"
                      type="number" 
                      value={settings.memoryLimitGB}
                      onChange={(e) => handleSettingChange({ memoryLimitGB: parseInt(e.target.value) }, "advanced")}
                      min="1"
                      max="64"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="use-gpu">Use GPU Acceleration</Label>
                    <p className="text-sm text-muted-foreground">
                      Utilize GPU for model training when available
                    </p>
                  </div>
                  <Switch 
                    id="use-gpu" 
                    name="use-gpu"
                    checked={settings.useGpuAcceleration}
                    onCheckedChange={(checked) => handleSettingChange({ useGpuAcceleration: checked }, "advanced")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Storage</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="storage-location">Storage Location</Label>
                    <Input 
                      id="storage-location" 
                      name="storage-location"
                      value={settings.storageLocation}
                      onChange={(e) => handleSettingChange({ storageLocation: e.target.value }, "advanced")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically backup datasets and models
                      </p>
                    </div>
                    <Switch 
                      id="auto-backup" 
                      name="auto-backup"
                      checked={settings.automaticBackups}
                      onCheckedChange={(checked) => handleSettingChange({ automaticBackups: checked }, "advanced")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
