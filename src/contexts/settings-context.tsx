import { createContext, useEffect, useState } from "react";
import App from "../App";

const LOCAL_STORAGE_KEY = 'poe-helper-settings';

export interface ApplicationSettings {
  poeUsername: string;
}

export interface ApplicationSettingsContext {
  settings: ApplicationSettings;
  setSettings: (settings: ApplicationSettings) => void;
}

export const SettingsContext = createContext<ApplicationSettingsContext>({
  settings: {
    poeUsername: ""
  },
  setSettings: () => {}
});

interface ApplicationSettingsProviderProps {
  children: React.ReactNode;
}

export const ApplicationSettingsProvider = (props: ApplicationSettingsProviderProps) => {
  const { children } = props;
  const [settings, setSettings] = useState<ApplicationSettings>({
    poeUsername: ""
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const updateSettings = (newSettings: ApplicationSettings) => {
    setSettings(newSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings: updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
