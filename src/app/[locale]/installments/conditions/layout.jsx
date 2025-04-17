import MiniNavbar from '@/components/sidebar/mininavbar/MiniNavbar';

export default function InstallmentsLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <MiniNavbar />
        {children}
      </body>
    </html>
  );
}
