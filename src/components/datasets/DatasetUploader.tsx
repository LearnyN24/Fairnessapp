
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, FileX, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DatasetUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

  const handleUpload = () => {
    if (!file || !datasetName.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a dataset name and file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Success",
        description: `Dataset "${datasetName}" uploaded successfully.`,
        variant: "default"
      });
      // Reset form
      setFile(null);
      setDatasetName("");
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Dataset</CardTitle>
        <CardDescription>
          Upload a CSV or Excel file containing your healthcare dataset.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="dataset-name">Dataset Name</Label>
            <Input 
              id="dataset-name" 
              placeholder="e.g., Diabetes Patient Records" 
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="dataset-file">Dataset File</Label>
            
            {file ? (
              <div className="flex items-center justify-between rounded-md border border-input p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearFile}
                >
                  <FileX className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid w-full items-center gap-1.5">
                <label 
                  htmlFor="dataset-file" 
                  className="cursor-pointer flex flex-col items-center justify-center rounded-md border border-dashed border-input p-8 text-center"
                >
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      Drag & drop file or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: CSV, XLSX (max 10MB)
                    </p>
                  </div>
                </label>
                <Input 
                  id="dataset-file" 
                  type="file" 
                  className="hidden" 
                  accept=".csv,.xlsx,.xls" 
                  onChange={handleFileChange} 
                />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Protected Attributes</Label>
            <p className="text-sm text-muted-foreground">
              Select the columns that represent protected attributes (e.g., age, gender, race)
              to be considered in fairness analysis.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              {["Age", "Gender", "Race", "Ethnicity", "Income", "Insurance", "Location"].map((attribute) => (
                <div key={attribute} className="flex items-center space-x-2">
                  <input type="checkbox" id={`attr-${attribute}`} className="rounded border-gray-300" />
                  <Label htmlFor={`attr-${attribute}`}>{attribute}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload}
          disabled={!file || !datasetName.trim() || isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Upload Dataset"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatasetUploader;
