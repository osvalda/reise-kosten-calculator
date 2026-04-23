"use client"

import * as React from "react"

import { NavMain } from "@/components/sidepanel/nav-main"
import { NavUser } from "@/components/sidepanel/nav-user"
import { AnlageProHeader } from "@/components/sidepanel/anlage-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { RiDashboard3Line, RiPlaneLine, RiMapPin2Line, RiSettingsLine } from "@remixicon/react"
import { usePreferences } from "@/app/lib/userPrefferenceProvider"
import { UserData } from "@/app/lib/definitions"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <RiDashboard3Line
        />
      ),
    },
    {
      title: "Travels",
      url: "/dashboard/travels",
      icon: (
        <RiPlaneLine
        />
      ),
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: (
        <RiMapPin2Line
        />
      ),
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <RiSettingsLine
        />
      ),
      items: [
        {
          title: "Personal Preferences",
          url: "/dashboard/settings/personal",
        },
        {
          title: "Security Preferences",
          url: "/dashboard/settings/security",
        },
        {
          title: "Apperance",
          url: "/dashboard/settings/apperance",
        },
        {
          title: "Travel Preferences",
          url: "/dashboard/settings/travel",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userData: UserData = usePreferences();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AnlageProHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
