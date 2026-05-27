/**
 * Admin section root layout — completely isolated from public layout.
 * No Navbar, no Footer. Used for /admin/login and /admin/dashboard/*.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-50">{children}</div>;
}
