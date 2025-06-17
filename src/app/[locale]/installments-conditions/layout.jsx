import MiniNavbar from "@/components/sidebar/mininavbar/MiniNavbar";

export default function InstallmentsLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <div
        
        className="d-flex flex-column w-100 justify-content-center align-items-start"
      >
        {/* <MiniNavbar /> */}
        {children}
      </div>
    </html>
  );
}
