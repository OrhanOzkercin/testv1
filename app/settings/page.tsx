import { Logger } from "../components/Logger";
import { headers } from "next/headers";

export default async function Settings() {
  const logger = new Logger("SettingsPage");

  logger.info("Settings page component starting to render");

  try {
    // Simulate settings data fetching
    logger.debug("Starting settings data fetch");

    const [appSettings, userPreferences, systemConfig] = await Promise.all([
      fetchAppSettings(),
      fetchUserPreferences(),
      fetchSystemConfig(),
    ]);

    logger.info("All settings data fetched successfully", {
      appSettingsCount: Object.keys(appSettings).length,
      userPreferencesCount: Object.keys(userPreferences).length,
      systemConfigCount: Object.keys(systemConfig).length,
    });

    // Get request information for logging
    const headersList = headers();
    const requestInfo = {
      userAgent: headersList.get("user-agent"),
      accept: headersList.get("accept"),
      host: headersList.get("host"),
    };

    logger.debug("Request information captured", requestInfo);

    logger.info("Settings page component rendering completed");

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your application preferences</p>
        </div>

        {/* Application Settings */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Application Settings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                  <p className="text-sm text-gray-500">
                    Enable maintenance mode for system updates
                  </p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    appSettings.maintenanceMode ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      appSettings.maintenanceMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Debug Mode</h3>
                  <p className="text-sm text-gray-500">Enable detailed logging and debugging</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    appSettings.debugMode ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      appSettings.debugMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Auto Backup</h3>
                  <p className="text-sm text-gray-500">Automatically backup data every 24 hours</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    appSettings.autoBackup ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      appSettings.autoBackup ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Preferences */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User Preferences</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-900">Theme</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="light" selected={userPreferences.theme === "light"}>
                    Light
                  </option>
                  <option value="dark" selected={userPreferences.theme === "dark"}>
                    Dark
                  </option>
                  <option value="auto" selected={userPreferences.theme === "auto"}>
                    Auto
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Language</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="en" selected={userPreferences.language === "en"}>
                    English
                  </option>
                  <option value="es" selected={userPreferences.language === "es"}>
                    Spanish
                  </option>
                  <option value="fr" selected={userPreferences.language === "fr"}>
                    French
                  </option>
                  <option value="de" selected={userPreferences.language === "de"}>
                    German
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Timezone</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="UTC" selected={userPreferences.timezone === "UTC"}>
                    UTC
                  </option>
                  <option value="EST" selected={userPreferences.timezone === "EST"}>
                    Eastern Time
                  </option>
                  <option value="PST" selected={userPreferences.timezone === "PST"}>
                    Pacific Time
                  </option>
                  <option value="GMT" selected={userPreferences.timezone === "GMT"}>
                    GMT
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    userPreferences.emailNotifications ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      userPreferences.emailNotifications ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">System Configuration</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-900">Cache TTL (seconds)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={systemConfig.cacheTTL}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900">Max Upload Size (MB)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={systemConfig.maxUploadSize}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  API Rate Limit (requests/min)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={systemConfig.apiRateLimit}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  Database Connection Pool
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={systemConfig.dbConnectionPool}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">SSL/TLS Required</h3>
                  <p className="text-sm text-gray-500">Force HTTPS connections only</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    systemConfig.sslRequired ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      systemConfig.sslRequired ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    );
  } catch (error) {
    logger.error("Error rendering settings page", error);

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Settings Error</h1>
          <p className="text-gray-600">
            Failed to load settings data. Check the server logs for details.
          </p>
        </div>
      </div>
    );
  }
}

// Simulated data fetching functions
async function fetchAppSettings() {
  const logger = new Logger("fetchAppSettings");

  logger.debug("Starting app settings fetch");

  await new Promise((resolve) => setTimeout(resolve, 200));

  const settings = {
    maintenanceMode: false,
    debugMode: true,
    autoBackup: true,
    version: "1.2.3",
    environment: "production",
  };

  logger.info("App settings fetched successfully", settings);

  return settings;
}

async function fetchUserPreferences() {
  const logger = new Logger("fetchUserPreferences");

  logger.debug("Starting user preferences fetch");

  await new Promise((resolve) => setTimeout(resolve, 150));

  const preferences = {
    theme: "light",
    language: "en",
    timezone: "UTC",
    emailNotifications: true,
    pushNotifications: false,
  };

  logger.info("User preferences fetched successfully", preferences);

  return preferences;
}

async function fetchSystemConfig() {
  const logger = new Logger("fetchSystemConfig");

  logger.debug("Starting system config fetch");

  await new Promise((resolve) => setTimeout(resolve, 250));

  const config = {
    cacheTTL: 3600,
    maxUploadSize: 10,
    apiRateLimit: 100,
    dbConnectionPool: 20,
    sslRequired: true,
    sessionTimeout: 1800,
  };

  logger.info("System config fetched successfully", config);

  return config;
}
