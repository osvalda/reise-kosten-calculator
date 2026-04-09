"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { AnlageProHeader } from "@/components/anlage-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { RiDashboard3Line, RiPlaneLine, RiMapPin2Line, RiSettingsLine } from "@remixicon/react"

const data = {
  user: {
    name: "Elettartam",
    email: "elettartam@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Billing",
          url: "settings/billing",
        },
        {
          title: "Limits",
          url: "/dashboard/settings/limits",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AnlageProHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
