"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { RiGalleryLine, RiPulseLine, RiCommandLine, RiTerminalBoxLine, RiRobotLine, RiBookOpenLine, RiSettingsLine, RiCropLine, RiPieChartLine, RiMapLine } from "@remixicon/react"

// This is sample data.
const data = {
  user: {
    name: "Elettartam",
    email: "elettartam@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "AnlagePro",
      logo: (
        <RiGalleryLine
        />
      ),
      plan: "Free Tier",
    },
    {
      name: "Anlage Corp.",
      logo: (
        <RiPulseLine
        />
      ),
      plan: "Startup",
    },
    {
      name: "Second",
      logo: (
        <RiCommandLine
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: (
        <RiTerminalBoxLine
        />
      ),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Travels",
      url: "#",
      icon: (
        <RiRobotLine
        />
      ),
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Locations",
      url: "#",
      icon: (
        <RiBookOpenLine
        />
      ),
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
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
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <RiCropLine
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <RiPieChartLine
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <RiMapLine
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
