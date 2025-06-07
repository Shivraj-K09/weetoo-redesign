import { AdminUserTable } from "@/components/admin/user-management/admin-user-table";
import { UserStats } from "@/components/admin/user-management/user-stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin User Management | Weetoo",
  description:
    "Weetoo Admin Dashboard - Manage your account, settings, and notifications",
};

export default function UserManagement() {
  return (
    <div className="font-sans h-full flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">User Management</h1>

      <UserStats />
      <AdminUserTable />
    </div>
  );
}
