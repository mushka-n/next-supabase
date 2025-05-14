import AuthLayout from '@/components/layout/auth-layout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
