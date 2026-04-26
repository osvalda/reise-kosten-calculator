import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/sidepanel/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Breadcrumb from "@/components/header/Breadcrumb";
import { PreferencesProvider } from "@/app/lib/userPrefferenceProvider";
import { fetchActiveUserData } from "@/app/lib/actions";
import { fetchUserPreferences } from "@/app/lib/data"
import { PreferencesTable, User } from "../lib/definitions";
import { Toaster } from "@/components/ui/sonner"

export default async function Layout({ children }: { children: React.ReactNode }) {

  const activeUser: User = await fetchActiveUserData();
  const userPreferences: PreferencesTable = await fetchUserPreferences(activeUser?.id);
  const userData = {
    user: activeUser,
    preferences: userPreferences
  };

  return (
    <div className='flex flex-col h-screen' >

      <SidebarProvider>
        <TooltipProvider>
          <PreferencesProvider initialData={userData || {}} >
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
            <Toaster />
          </PreferencesProvider>
        </TooltipProvider>
      </SidebarProvider>

    </div >
  );
}