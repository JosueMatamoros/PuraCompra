import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Cerrar el menú después de la navegación
  };

  const fetchAdminCount = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/count/admin");
      const data = await response.json();
      setAdminCount(data.count);
    } catch (error) {
      console.error("Error fetching admin count:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/count/user");
      const data = await response.json();
      setUserCount(data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  useEffect(() => {
    fetchAdminCount();
    fetchUserCount();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Administrator Dashboard</h1>
        </div>
        <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
          <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
            <ul className="flex flex-col gap-4">
              <li className="mx-2">
              </li>
              <li className="mx-2">
                <Link
                  to="/adminUsers"
                  className="hover:text-blue-300 md:text-2xl font-medium"
                >
                  Users
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  to="/adminContent"
                  className="hover:text-blue-300 md:text-2xl font-medium"
                >
                  Products
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  to="/"
                  className="hover:text-blue-300 md:text-2xl font-medium"
                >
                  Shipments
                </Link>
              </li>
            </ul>
          </nav>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Registered Users</h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      {userCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Administrators</h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      {adminCount}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleNavigate('/adminUsers')}>
                  Manage Users
                </button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage your website's content and media.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      Current Registered Sellers
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">87</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Products</h3>
                    <span className="text-gray-500 dark:text-gray-400">24</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleNavigate('/adminContent')}>
                  Manage Content
                </button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipments</CardTitle>
                <CardDescription>
                  Manage your website's shipments and logistics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Total Visitors</h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      12,345
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Bounce Rate</h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      32%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Conversion Rate</h3>
                    <span className="text-gray-500 dark:text-gray-400">8%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  View Analytics
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const CardDescription = ({ children }) => (
  <p className="text-gray-500 dark:text-gray-400">{children}</p>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const CardFooter = ({ children }) => (
  <div className="p-6 border-t">{children}</div>
);
