"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconMessageCircle,
  IconSettings,
  IconHelpCircle,
  IconSearch,
  IconUsers,
  IconLayoutDashboard,
  IconMessage2,
} from "@tabler/icons-react"



import { NavMain } from "@/components/web/nav-main"
import { NavSecondary } from "@/components/web/nav-secondary"
import { NavUser } from "@/components/web/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",           // ← This will be replaced dynamically later
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Surveys",
      url: "/surveys",
      icon: IconMessageCircle,
    },
    {
      title: "Responses",
      url: "/responses",
      icon: IconMessage2,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Help & Support",
      url: "/support",
      icon: IconHelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],

}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <IconLayoutDashboard className="size-5!" />
                <span className="text-base font-semibold">FeedLoop</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}