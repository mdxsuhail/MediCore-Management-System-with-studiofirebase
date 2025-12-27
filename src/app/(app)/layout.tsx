"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Home,
  Calendar,
  FileText,
  ShieldCheck,
  Hospital,
  Stethoscope,
  Users,
  Ambulance,
  BarChart,
  LogOut,
  LifeBuoy,
  HeartPulse,
  Pill,
} from 'lucide-react';
import { AppHeader } from '@/components/app-header';

const patientNav = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/vitals', label: 'Vitals', icon: HeartPulse },
  { href: '/health-risk', label: 'Health Risk', icon: ShieldCheck },
];

const doctorNav = [
  { href: '/doctor', label: 'Dashboard', icon: Home },
  { href: '/doctor/consultation', label: 'Consultation Tool', icon: Stethoscope },
];

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: BarChart },
  { href: '#', label: 'Doctors', icon: Stethoscope },
  { href: '#', label: 'Patients', icon: Users },
  { href: '#', label: 'Beds', icon: Hospital },
  { href: '#', label: 'Ambulances', icon: Ambulance },
];


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // This is a mock role. In a real app, you'd get this from the user's session.
  const role = pathname.startsWith('/doctor') ? 'doctor' : pathname.startsWith('/admin') ? 'admin' : 'patient';
  
  let navItems;
  let breadcrumb;

  switch (role) {
    case 'doctor':
      navItems = doctorNav;
      breadcrumb = [{ label: "Doctor" }, { label: "Dashboard" }];
      if (pathname.includes("consultation")) {
          breadcrumb = [{ label: "Doctor" }, { label: "Consultation Tool" }];
      }
      break;
    case 'admin':
      navItems = adminNav;
      breadcrumb = [{ label: "Admin" }, { label: "Dashboard" }];
      break;
    default:
      navItems = patientNav;
      const currentPage = patientNav.find(item => item.href === pathname);
      breadcrumb = [{ label: "Home", href: "/dashboard" }];
      if (currentPage && currentPage.href !== '/dashboard') {
        breadcrumb.push({ label: currentPage.label });
      } else if (pathname !== '/dashboard') {
        // Fallback for pages not in nav, e.g. a sub-page
        const pathParts = pathname.split('/').filter(p => p);
        const pageTitle = pathParts.length > 0 ? pathParts[pathParts.length -1] : 'Dashboard';
        breadcrumb.push({ label: pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1) });
      }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  href={item.href}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  asChild
                >
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton tooltip="Support" asChild>
                    <a href="#">
                      <LifeBuoy />
                      <span>Support</span>
                    </a>
                 </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton tooltip="Logout" asChild>
                    <a href="/">
                      <LogOut />
                      <span>Logout</span>
                    </a>
                 </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col">
          <AppHeader breadcrumb={breadcrumb} />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
