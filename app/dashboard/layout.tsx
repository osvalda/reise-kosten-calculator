import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/sidepanel/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Breadcrumb from "@/components/header/Breadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='flex flex-col h-screen' >

      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
              <Breadcrumb />
            </header>
            <section className='mx-auto size-full flex-1 px-4 py-2 sm:px-6'>
              {children}
            </section>
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>

    </div >
  );
}