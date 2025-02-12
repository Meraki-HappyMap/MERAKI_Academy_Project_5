// import { Outlet } from "react-router";
// import { AuthGuard } from "@/lib/AuthGuard";
// import Navbar from "@/components/layout/Navbar";
// import Categories from "@/components/layout/Categories";

// const OwnersLayout = () => {
//   return <div>OwnersLayout</div>;
// };

// export default OwnersLayout;
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// export default function OwnerFrontPage() {
//   const [data, setData] = useState([
//     { name: "Jan", earnings: 4000 },
//     { name: "Feb", earnings: 3000 },
//     { name: "Mar", earnings: 5000 },
//     { name: "Apr", earnings: 7000 },
//   ]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Data Section */}
//       <section className="mt-10 grid md:grid-cols-2 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold">Earnings Overview</h2>
//             <BarChart width={300} height={200} data={data}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="earnings" fill="#4F46E5" />
//             </BarChart>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold">Bookings</h2>
//             <p className="text-gray-700 mt-3 text-lg">You have 15 upcoming bookings!</p>
//           </CardContent>
//         </Card>
//       </section>

//       {/* Hero Section */}
//       <section className="text-center py-12 bg-white rounded-2xl shadow-md">
//         <h1 className="text-4xl font-bold text-gray-800">List Your Property & Earn More</h1>
//         <p className="text-gray-600 mt-3">Join thousands of hosts making passive income.</p>
//         <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
//       </section>

//       {/* Why List With Us? */}
//       <section className="mt-10 text-center bg-white p-8 rounded-2xl shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800">Why List With Us?</h2>
//         <p className="text-gray-600 mt-3">Increase your revenue, get full control, and enjoy 24/7 support.</p>
//       </section>
//     </div>
//   );
// }
// import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
