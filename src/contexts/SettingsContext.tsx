import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Settings {
  // General Settings
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;

  // Notification Settings
  emailNotifications: boolean;
  orderNotifications: boolean;
  customerNotifications: boolean;
  marketingEmails: boolean;

  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordPolicy: string;

  // Appearance Settings
  theme: string;
  primaryColor: string;
  language: string;

  // Integration Settings
  emailServiceConfigured: boolean;
  paymentGatewayConfigured: boolean;
  analyticsConfigured: boolean;
  crmConfigured: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  loading: boolean;
}

const defaultSettings: Settings = {
  storeName: "Inzovu Store",
  storeDescription: "Your premier online shopping destination",
  contactEmail: "contact@inzovu.com",
  contactPhone: "+250 123 456 789",
  currency: "RWF",

  emailNotifications: true,
  orderNotifications: true,
  customerNotifications: true,
  marketingEmails: false,

  twoFactorAuth: false,
  sessionTimeout: "30",
  passwordPolicy: "medium",

  theme: "light",
  primaryColor: "blue",
  language: "en",

  emailServiceConfigured: false,
  paymentGatewayConfigured: false,
  analyticsConfigured: false,
  crmConfigured: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load from localStorage
      const savedSettings = localStorage.getItem('inzovu_settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);

      // Save to localStorage
      localStorage.setItem('inzovu_settings', JSON.stringify(updatedSettings));

      toast({
        title: "Settings Updated",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value: SettingsContextType = {
    settings,
    updateSettings,
    loading,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
