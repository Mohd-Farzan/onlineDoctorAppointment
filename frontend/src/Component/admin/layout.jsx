
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export default function DashboardLayout() {
  return (
    <>
   <div className="w-full flex h-screen">
  {/* Sidebar - Fixed on the left side */}
  <div className="h-screen w-64 bg-blue-500 flex-shrink-0 fixed inset-y-0 left-0 z-50">
    <Sidebar />
  </div>

  {/* Main Content (Shifted Right to Avoid Overlapping Sidebar) */}
  <div className="flex flex-col flex-grow pl-64">
    {/* Header Section */}
    <div className="w-full">
      <Header />
    </div>

    {/* Page Content */}
    <main className="flex-grow w-full px-4 py-6 sm:px-6 lg:px-8 m-4 overflow-auto">
      <Outlet />
    </main>
  </div>
</div>

    </>
  );
}

