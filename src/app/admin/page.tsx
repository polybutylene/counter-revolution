import dynamic from "next/dynamic";

const AdminDashboard = dynamic(
  () => import("@/components/admin/AdminDashboard").then((m) => m.AdminDashboard),
  { ssr: false, loading: () => <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent" /></div> }
);

export default function AdminPage() {
  return <AdminDashboard />;
}
