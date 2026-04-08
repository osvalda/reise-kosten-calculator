import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Logout } from "@/components/log-out"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='flex flex-col h-screen' >

      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar><Logout /></AppSidebar>
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
              {/* TODO: extract the breadcrumb functionality to a client side component and include it here, so we have the breadcrumb on every page in the dashboard */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {/* here comes the path name from usePathname */}
                    <BreadcrumbPage>Next</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            {children}
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>

    </div >
  );
}