import { Logger } from "../components/Logger";
import { headers } from "next/headers";

export default async function Dashboard() {
  const logger = new Logger("DashboardPage");

  logger.info("Dashboard page component starting to render");

  try {
    // Simulate multiple data fetching operations
    logger.debug("Starting dashboard data fetching");

    const [analyticsData, recentActivity, systemStatus] = await Promise.all([
      fetchAnalyticsData(),
      fetchRecentActivity(),
      fetchSystemStatus(),
    ]);

    logger.info("All dashboard data fetched successfully", {
      analyticsDataPoints: analyticsData.length,
      activityItems: recentActivity.length,
      systemStatus,
    });

    // Get request information
    const headersList = headers();
    const requestInfo = {
      userAgent: headersList.get("user-agent"),
      accept: headersList.get("accept"),
      referer: headersList.get("referer"),
    };

    logger.debug("Request information captured", requestInfo);

    logger.info("Dashboard page component rendering completed");

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Real-time overview of your application</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${analyticsData.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analyticsData.pageViews.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analyticsData.conversionRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "user"
                          ? "bg-blue-500"
                          : activity.type === "system"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(systemStatus).map(([service, status]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 capitalize">{service}</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        status === "operational"
                          ? "bg-green-100 text-green-800"
                          : status === "degraded"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    logger.error("Error rendering dashboard page", error);

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Dashboard Error</h1>
          <p className="text-gray-600">
            Failed to load dashboard data. Check the server logs for details.
          </p>
        </div>
      </div>
    );
  }
}

// Simulated data fetching functions
async function fetchAnalyticsData() {
  const logger = new Logger("fetchAnalyticsData");

  logger.debug("Starting analytics data fetch");

  await new Promise((resolve) => setTimeout(resolve, 200));

  const data = {
    totalRevenue: Math.floor(Math.random() * 1000000) + 500000,
    activeUsers: Math.floor(Math.random() * 5000) + 2000,
    pageViews: Math.floor(Math.random() * 100000) + 50000,
    conversionRate: (Math.random() * 5 + 2).toFixed(1),
  };

  logger.info("Analytics data fetched successfully", data);

  return data;
}

async function fetchRecentActivity() {
  const logger = new Logger("fetchRecentActivity");

  logger.debug("Starting recent activity fetch");

  await new Promise((resolve) => setTimeout(resolve, 150));

  const activities = [
    {
      type: "user",
      title: "New user registration",
      description: "John Doe created a new account",
      timestamp: "2 minutes ago",
    },
    {
      type: "system",
      title: "Database backup completed",
      description: "Daily backup process finished successfully",
      timestamp: "15 minutes ago",
    },
    {
      type: "warning",
      title: "High memory usage detected",
      description: "Server memory usage reached 85%",
      timestamp: "1 hour ago",
    },
    {
      type: "user",
      title: "Payment processed",
      description: "Payment of $299.99 processed successfully",
      timestamp: "2 hours ago",
    },
    {
      type: "system",
      title: "Cache cleared",
      description: "Application cache cleared automatically",
      timestamp: "3 hours ago",
    },
  ];

  logger.info("Recent activity fetched successfully", { count: activities.length });

  return activities;
}

async function fetchSystemStatus() {
  const logger = new Logger("fetchSystemStatus");

  logger.debug("Starting system status fetch");

  await new Promise((resolve) => setTimeout(resolve, 100));

  const statuses = {
    "web server": "operational",
    database: "operational",
    cache: "degraded",
    "email service": "operational",
    "file storage": "operational",
    monitoring: "operational",
  };

  logger.info("System status fetched successfully", statuses);

  return statuses;
}
