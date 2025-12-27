
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function UserNav() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBillingLink = () => {
    if (pathname.startsWith('/admin')) return '/admin/billing';
    if (pathname.startsWith('/doctor')) return '/doctor/billing';
    return '/billing';
  };
  
  const getSettingsLink = () => {
    if (pathname.startsWith('/admin')) return '/admin/settings';
    if (pathname.startsWith('/doctor')) return '/doctor/settings';
    return '/settings';
  };

  if (!mounted) {
    return (
       <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage 
              src={placeholderImages.find(p => p.id === 'user-avatar-1')?.imageUrl} 
              alt="User avatar" 
              data-ai-hint={placeholderImages.find(p => p.id === 'user-avatar-1')?.imageHint}
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
             <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={getBillingLink()}>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={getSettingsLink()}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuItem asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-center">
             <ThemeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
