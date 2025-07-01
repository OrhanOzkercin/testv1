import { Logger } from "../components/Logger";
import { headers } from "next/headers";

export default async function Analytics() {
  const logger = new Logger("AnalyticsPage");

  logger.info("Analytics page component starting to render");

  try {
    // Simulate complex analytics data fetching
    logger.debug("Starting analytics data fetch");

    const [pageViews, userBehavior, trafficSources, conversionData] = await Promise.all([
      fetchPageViews(),
      fetchUserBehavior(),
      fetchTrafficSources(),
      fetchConversionData(),
    ]);

    logger.info("All analytics data fetched successfully", {
      pageViewsCount: pageViews.length,
      behaviorMetrics: Object.keys(userBehavior).length,
      trafficSourcesCount: trafficSources.length,
      conversionMetrics: Object.keys(conversionData).length,
    });

    // Get request information for logging
    const headersList = headers();
    const requestInfo = {
      userAgent: headersList.get("user-agent"),
      accept: headersList.get("accept"),
      referer: headersList.get("referer"),
      host: headersList.get("host"),
    };

    logger.debug("Request information captured", requestInfo);

    logger.info("Analytics page component rendering completed");

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Detailed insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Page Views</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pageViews.total.toLocaleString()}
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {conversionData.overallRate}%
                </p>
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userBehavior.avgSessionDuration}m
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{userBehavior.bounceRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Views Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Page Views (Last 7 Days)</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pageViews.daily.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{day.date}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(day.views / pageViews.max) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">
                        {day.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Traffic Sources</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          source.name === "Direct"
                            ? "bg-blue-500"
                            : source.name === "Organic Search"
                            ? "bg-green-500"
                            : source.name === "Social Media"
                            ? "bg-purple-500"
                            : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{source.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {source.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Conversion Funnel</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {conversionData.funnel.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{step.name}</span>
                      <span className="text-sm text-gray-600">
                        {step.count.toLocaleString()} users
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${step.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{step.percentage}% conversion</span>
                      {index < conversionData.funnel.length - 1 && (
                        <span className="text-xs text-gray-500">
                          {(
                            ((step.count - conversionData.funnel[index + 1].count) / step.count) *
                            100
                          ).toFixed(1)}
                          % drop-off
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    logger.error("Error rendering analytics page", error);

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Analytics Error</h1>
          <p className="text-gray-600">
            Failed to load analytics data. Check the server logs for details.
          </p>
        </div>
      </div>
    );
  }
}

// Simulated data fetching functions
async function fetchPageViews() {
  const logger = new Logger("fetchPageViews");

  logger.debug("Starting page views data fetch");

  await new Promise((resolve) => setTimeout(resolve, 250));

  const daily = [
    { date: "Mon", views: Math.floor(Math.random() * 5000) + 3000 },
    { date: "Tue", views: Math.floor(Math.random() * 5000) + 3000 },
    { date: "Wed", views: Math.floor(Math.random() * 5000) + 3000 },
    { date: "Thu", views: Math.floor(Math.random() * 5000) + 3000 },
    { date: "Fri", views: Math.floor(Math.random() * 5000) + 3000 },
    { date: "Sat", views: Math.floor(Math.random() * 5000) + 3000 },
    { date: "Sun", views: Math.floor(Math.random() * 5000) + 3000 },
  ];

  const total = daily.reduce((sum, day) => sum + day.views, 0);
  const max = Math.max(...daily.map((day) => day.views));

  const data = { daily, total, max };

  logger.info("Page views data fetched successfully", { total, max });

  return data;
}

async function fetchUserBehavior() {
  const logger = new Logger("fetchUserBehavior");

  logger.debug("Starting user behavior data fetch");

  await new Promise((resolve) => setTimeout(resolve, 200));

  const data = {
    avgSessionDuration: Math.floor(Math.random() * 10) + 5,
    bounceRate: (Math.random() * 20 + 30).toFixed(1),
    pagesPerSession: (Math.random() * 3 + 2).toFixed(1),
    newUsersPercentage: (Math.random() * 30 + 60).toFixed(1),
  };

  logger.info("User behavior data fetched successfully", data);

  return data;
}

async function fetchTrafficSources() {
  const logger = new Logger("fetchTrafficSources");

  logger.debug("Starting traffic sources data fetch");

  await new Promise((resolve) => setTimeout(resolve, 150));

  const sources = [
    { name: "Direct", percentage: Math.floor(Math.random() * 20) + 30 },
    { name: "Organic Search", percentage: Math.floor(Math.random() * 25) + 35 },
    { name: "Social Media", percentage: Math.floor(Math.random() * 15) + 15 },
    { name: "Referral", percentage: Math.floor(Math.random() * 10) + 10 },
    { name: "Email", percentage: Math.floor(Math.random() * 8) + 5 },
  ];

  logger.info("Traffic sources data fetched successfully", { count: sources.length });

  return sources;
}

async function fetchConversionData() {
  const logger = new Logger("fetchConversionData");

  logger.debug("Starting conversion data fetch");

  await new Promise((resolve) => setTimeout(resolve, 300));

  const funnel = [
    { name: "Page Views", count: Math.floor(Math.random() * 50000) + 30000, percentage: 100 },
    { name: "Product Views", count: Math.floor(Math.random() * 15000) + 10000, percentage: 35 },
    { name: "Add to Cart", count: Math.floor(Math.random() * 5000) + 3000, percentage: 12 },
    { name: "Checkout Started", count: Math.floor(Math.random() * 2000) + 1000, percentage: 5 },
    { name: "Purchase Completed", count: Math.floor(Math.random() * 800) + 400, percentage: 2 },
  ];

  const overallRate = funnel[funnel.length - 1].percentage.toFixed(1);

  const data = { funnel, overallRate };

  logger.info("Conversion data fetched successfully", { overallRate });

  return data;
}
