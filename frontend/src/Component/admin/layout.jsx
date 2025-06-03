
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function DashboardLayout() {
  return (
    <>
   <div className="w-full flex h-screen">
  <div className="h-screen w-64 bg-blue-500 flex-shrink-0 fixed inset-y-0 left-0 z-50">
    <Sidebar />
  </div>
  <div className="flex flex-col flex-grow pl-64">
    <div className="w-full">
      <Header />
    </div>
    <main className="flex-grow w-full px-4 py-6 sm:px-6 lg:px-8 m-4 overflow-auto">
      <Outlet />
    </main>
  </div>
</div>

    </>
  );
}

