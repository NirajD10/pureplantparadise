import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import OverviewCharts from "@/components/admin/Overview/OverviewCharts";
import BestSellingProducts from "@/components/admin/Overview/BestSellingProducts";
import DestructiveCallout from "@/components/Callout/DestructiveCallout";

import { getDashboard } from "@/lib/admin-http";

function Dashboard() {
  const {
    data: dashboardAPI,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: ({ signal }) => getDashboard({ signal }),
  });

  return (
    <div className="container my-12">
      {isPending ? (
        <div className="h-[80svh] w-full flex flex-col justify-center items-start">
          <span className="loader"></span>
        </div>
      ) : null}
      {isError && (
        <DestructiveCallout
          title={error.statusText || "Failed to retrieve data" }
          message={error?.data.message}
        />
      )}
      {dashboardAPI ? (
        <React.Fragment>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-7">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{dashboardAPI?.totalRevenue}
                </div>
                <p className="text-xs text-muted-foreground">
                  +10% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{dashboardAPI?.totalOrders}
                </div>
                <p className="text-xs text-muted-foreground">
                  +23% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  width="20"
                  height="20"
                  fill="#71717A"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m21.408 11.412-8.83-8.83c-.37-.37-.88-.58-1.41-.58h-7.17c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83Zm-8.58 8.59-8.83-8.83v-7.17h7.17l8.83 8.83-7.17 7.17Z"></path>
                  <path d="M6.498 8.002a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{dashboardAPI?.totalSales}
                </div>
                <p className="text-xs text-muted-foreground">
                  +6% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customer
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {dashboardAPI?.totalCustomers}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Per Months</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewCharts sales={dashboardAPI?.permonthSaleOrder} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Best Product Sales</CardTitle>
                <CardDescription>
                  Most popular hot sales on this sale.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BestSellingProducts />
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default Dashboard;
