import { Logger } from "../components/Logger";
import { headers } from "next/headers";

export default async function Users() {
  const logger = new Logger("UsersPage");

  logger.info("Users page component starting to render");

  try {
    // Simulate user data fetching with pagination
    logger.debug("Starting user data fetch");

    const users = await fetchUsers();
    const userStats = await fetchUserStatistics();

    logger.info("User data fetched successfully", {
      userCount: users.length,
      totalUsers: userStats.totalUsers,
      activeUsers: userStats.activeUsers,
    });

    // Get request information for logging
    const headersList = headers();
    const requestInfo = {
      userAgent: headersList.get("user-agent"),
      accept: headersList.get("accept"),
      host: headersList.get("host"),
    };

    logger.debug("Request information captured", requestInfo);

    logger.info("Users page component rendering completed");

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage and view user information</p>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.totalUsers.toLocaleString()}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.activeUsers.toLocaleString()}
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userStats.newThisMonth.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    logger.error("Error rendering users page", error);

    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Users Error</h1>
          <p className="text-gray-600">
            Failed to load user data. Check the server logs for details.
          </p>
        </div>
      </div>
    );
  }
}

// Simulated data fetching functions
async function fetchUsers() {
  const logger = new Logger("fetchUsers");

  logger.debug("Starting users data fetch");

  await new Promise((resolve) => setTimeout(resolve, 300));

  const users = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      role: "admin",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
      role: "user",
      joinedDate: "2024-02-20",
      lastActive: "1 day ago",
    },
    {
      id: "USR003",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "inactive",
      role: "user",
      joinedDate: "2024-01-10",
      lastActive: "1 week ago",
    },
    {
      id: "USR004",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      status: "active",
      role: "moderator",
      joinedDate: "2024-03-05",
      lastActive: "30 minutes ago",
    },
    {
      id: "USR005",
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      status: "suspended",
      role: "user",
      joinedDate: "2024-02-28",
      lastActive: "3 days ago",
    },
    {
      id: "USR006",
      name: "Diana Davis",
      email: "diana.davis@example.com",
      status: "active",
      role: "user",
      joinedDate: "2024-03-10",
      lastActive: "5 hours ago",
    },
    {
      id: "USR007",
      name: "Edward Miller",
      email: "edward.miller@example.com",
      status: "active",
      role: "user",
      joinedDate: "2024-02-15",
      lastActive: "1 hour ago",
    },
    {
      id: "USR008",
      name: "Fiona Garcia",
      email: "fiona.garcia@example.com",
      status: "inactive",
      role: "user",
      joinedDate: "2024-01-25",
      lastActive: "2 weeks ago",
    },
  ];

  logger.info("Users data fetched successfully", { count: users.length });

  return users;
}

async function fetchUserStatistics() {
  const logger = new Logger("fetchUserStatistics");

  logger.debug("Starting user statistics fetch");

  await new Promise((resolve) => setTimeout(resolve, 150));

  const stats = {
    totalUsers: Math.floor(Math.random() * 50000) + 25000,
    activeUsers: Math.floor(Math.random() * 15000) + 8000,
    newThisMonth: Math.floor(Math.random() * 1000) + 500,
  };

  logger.info("User statistics fetched successfully", stats);

  return stats;
}
