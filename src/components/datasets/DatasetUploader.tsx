import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, FileX, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDatasets } from "@/context/DatasetsContext";

const DatasetUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addDataset } = useDatasets();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAttributeChange = (attribute: string) => {
    setSelectedAttributes(prev => 
      prev.includes(attribute)
        ? prev.filter(attr => attr !== attribute)
        : [...prev, attribute]
    );
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
    
    // Simulate file processing and dataset creation
    setTimeout(() => {
      // In a real app, this would process the file and extract actual statistics
      const newDataset = {
        name: datasetName,
        recordCount: Math.floor(Math.random() * 10000) + 1000, // Simulated record count
        features: Math.floor(Math.random() * 20) + 10, // Simulated feature count
        protectedAttrs: selectedAttributes,
      };

      addDataset(newDataset);

      setIsUploading(false);
      toast({
        title: "Success",
        description: `Dataset "${datasetName}" uploaded successfully.`,
        variant: "default"
      });

      // Reset form
      setFile(null);
      setDatasetName("");
      setSelectedAttributes([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
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
                  className={`cursor-pointer flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center transition-colors ${
                    isDragging 
                      ? "border-primary bg-primary/5" 
                      : "border-input hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      {isDragging ? "Drop file here" : "Drag & drop file or click to browse"}
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
                  ref={fileInputRef}
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
                  <input 
                    type="checkbox" 
                    id={`attr-${attribute}`} 
                    className="rounded border-gray-300"
                    checked={selectedAttributes.includes(attribute)}
                    onChange={() => handleAttributeChange(attribute)}
                  />
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
