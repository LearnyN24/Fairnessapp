import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Dataset {
  id: string;
  name: string;
  recordCount: number;
  features: number;
  protectedAttrs: string[];
  dateAdded: string;
}

interface DatasetsContextType {
  datasets: Dataset[];
  addDataset: (dataset: Omit<Dataset, "id" | "dateAdded">) => void;
  deleteDataset: (id: string) => void;
}

const DatasetsContext = createContext<DatasetsContextType | undefined>(undefined);

const STORAGE_KEY = "equahealth_datasets";

export const DatasetsProvider = ({ children }: { children: ReactNode }) => {
  const [datasets, setDatasets] = useState<Dataset[]>(() => {
    const savedDatasets = localStorage.getItem(STORAGE_KEY);
    if (savedDatasets) {
      return JSON.parse(savedDatasets);
    }
    return [
      {
        id: "d1",
        name: "MIMIC-III Heart Failure",
        recordCount: 5428,
        features: 42,
        protectedAttrs: ["age", "gender", "ethnicity"],
        dateAdded: "2024-03-15",
      },
      {
        id: "d2",
        name: "Diabetes Readmission",
        recordCount: 2190,
        features: 38,
        protectedAttrs: ["age", "gender", "race"],
        dateAdded: "2024-03-14",
      },
      {
        id: "d3",
        name: "COVID-19 ICU Prediction",
        recordCount: 3976,
        features: 35,
        protectedAttrs: ["age", "gender", "ethnicity", "comorbidity"],
        dateAdded: "2024-03-13",
      },
    ];
  });

  // Save datasets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datasets));
  }, [datasets]);

  const addDataset = (datasetData: Omit<Dataset, "id" | "dateAdded">) => {
    const newDataset: Dataset = {
      ...datasetData,
      id: `d${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setDatasets(prev => [newDataset, ...prev]);
  };

  const deleteDataset = (id: string) => {
    setDatasets(prev => prev.filter(dataset => dataset.id !== id));
  };

  return (
    <DatasetsContext.Provider value={{ datasets, addDataset, deleteDataset }}>
      {children}
    </DatasetsContext.Provider>
  );
};

export const useDatasets = () => {
  const context = useContext(DatasetsContext);
  if (context === undefined) {
    throw new Error("useDatasets must be used within a DatasetsProvider");
  }
  return context;
}; 