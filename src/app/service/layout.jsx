import "../globals.css";
import ServiceClientLayout from "./service-client-layout";

export const metadata = {
  title: "AutoMind | Service Center",
  description: "Service Center Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <ServiceClientLayout>{children}</ServiceClientLayout>
      </body>
    </html>
  );
}
