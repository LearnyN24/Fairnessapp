import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Model {
  id: string;
  name: string;
  algorithm: string;
  datasetId: string;
  datasetSize: string;
  accuracy: number;
  fairnessStatus: "fair" | "biased";
  lastUpdated: string;
}

interface ModelsContextType {
  models: Model[];
  addModel: (model: Omit<Model, "id" | "lastUpdated">) => void;
  deleteModel: (id: string) => void;
}

const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

const STORAGE_KEY = "equahealth_models";

const initialMockModels: Model[] = [
  {
    id: "m1",
    name: "Heart Disease Predictor",
    algorithm: "Random Forest",
    datasetId: "d1",
    datasetSize: "10,000 records",
    accuracy: 0.89,
    fairnessStatus: "fair",
    lastUpdated: "2024-03-15",
  },
  {
    id: "m2",
    name: "Diabetes Risk Assessment",
    algorithm: "XGBoost",
    datasetId: "d2",
    datasetSize: "5,000 records",
    accuracy: 0.85,
    fairnessStatus: "biased",
    lastUpdated: "2024-03-14",
  },
  {
    id: "m3",
    name: "Stroke Prediction",
    algorithm: "Neural Network",
    datasetId: "d3",
    datasetSize: "8,000 records",
    accuracy: 0.92,
    fairnessStatus: "fair",
    lastUpdated: "2024-03-13",
  },
];

export const ModelsProvider = ({ children }: { children: ReactNode }) => {
  const [models, setModels] = useState<Model[]>(() => {
    const savedModels = localStorage.getItem(STORAGE_KEY);
    if (savedModels) {
      return JSON.parse(savedModels);
    }
    return initialMockModels;
  });

  // Save models to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
  }, [models]);

  const addModel = (modelData: Omit<Model, "id" | "lastUpdated">) => {
    const newModel: Model = {
      ...modelData,
      id: `m${Date.now()}`,
      lastUpdated: "just now",
    };
    setModels(prev => [newModel, ...prev]);
  };

  const deleteModel = (id: string) => {
    setModels(prev => prev.filter(model => model.id !== id));
  };

  return (
    <ModelsContext.Provider value={{ models, addModel, deleteModel }}>
      {children}
    </ModelsContext.Provider>
  );
};

export const useModels = () => {
  const context = useContext(ModelsContext);
  if (context === undefined) {
    throw new Error("useModels must be used within a ModelsProvider");
  }
  return context;
}; 