export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-[72px] min-h-screen bg-ever-dark-2">
      {children}
    </div>
  );
}
