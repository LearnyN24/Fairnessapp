import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Settings {
  // General Settings
  name: string;
  email: string;
  showFairnessWarnings: boolean;
  showTooltips: boolean;

  // Fairness Settings
  demographicParityThreshold: number;
  equalizedOddsThreshold: number;
  defaultMitigationMethod: string;
  applyFairnessAutomatically: boolean;

  // Advanced Settings
  maxCpuThreads: number;
  memoryLimitGB: number;
  useGpuAcceleration: boolean;
  storageLocation: string;
  automaticBackups: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  // General Settings
  name: "",
  email: "",
  showFairnessWarnings: true,
  showTooltips: true,

  // Fairness Settings
  demographicParityThreshold: 0.8,
  equalizedOddsThreshold: 0.8,
  defaultMitigationMethod: "reweighing",
  applyFairnessAutomatically: true,

  // Advanced Settings
  maxCpuThreads: 4,
  memoryLimitGB: 8,
  useGpuAcceleration: true,
  storageLocation: "./data",
  automaticBackups: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = "equahealth_settings";

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}; 