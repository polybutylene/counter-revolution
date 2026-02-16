import dynamic from "next/dynamic";

const AdminProjectDetail = dynamic(
  () => import("@/components/admin/AdminProjectDetail").then((m) => m.AdminProjectDetail),
  { ssr: false, loading: () => <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent" /></div> }
);

interface PageProps {
  params: { id: string };
}

export default function AdminProjectPage({ params }: PageProps) {
  return <AdminProjectDetail projectId={params.id} />;
}
