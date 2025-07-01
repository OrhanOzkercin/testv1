import { Logger } from "./components/Logger";
import { headers } from "next/headers";

export default async function Home() {
  const logger = new Logger("HomePage");

  logger.info("Home page component starting to render");

  try {
    // Simulate some server-side data fetching
    logger.debug("Fetching user statistics");
    const userStats = await fetchUserStats();
    logger.info("User statistics fetched successfully", { userStats });

    // Get request headers for logging
    const headersList = headers();
    const userAgent = headersList.get("user-agent");
    logger.debug("Request headers captured", { userAgent });

    logger.info("Home page component rendering completed");

    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Sample App</h1>
          <p className="text-xl text-gray-600 mb-8">
            A Next.js application with server components and extensive logging
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userStats.totalUsers}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userStats.activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userStats.newUsers}</div>
                <div className="text-sm text-gray-600">New Users Today</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Server Component Features
            </h3>
            <ul className="text-left text-yellow-700 space-y-1">
              <li>• Server-side rendering with extensive logging</li>
              <li>• Request headers captured and logged</li>
              <li>• Simulated data fetching with error handling</li>
              <li>• Real-time statistics display</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    logger.error("Error rendering home page", error);

    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">
            Something went wrong while loading the page. Check the server logs for details.
          </p>
        </div>
      </div>
    );
  }
}

// Simulated data fetching function
async function fetchUserStats() {
  const logger = new Logger("fetchUserStats");

  logger.debug("Starting to fetch user statistics");

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Simulate random data
  const stats = {
    totalUsers: Math.floor(Math.random() * 10000) + 5000,
    activeUsers: Math.floor(Math.random() * 2000) + 1000,
    newUsers: Math.floor(Math.random() * 100) + 20,
  };

  logger.info("User statistics generated", stats);

  return stats;
}
