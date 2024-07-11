'use client';
import { cn } from "@/utils/cn";
import Link from 'next/link';
import { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/nav-menu";


const NavBar = ({ className }: { className?: string }) => {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 lg:text-base md:text-base text-sm", className)}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
        <MenuItem setActive={setActive} active={active} item="Home">
        </MenuItem>
        </Link>

        <MenuItem setActive={setActive} active={active} item="our course">
            <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/courses">All courses </HoveredLink>
            <HoveredLink href="/courses">Basic Ai </HoveredLink>
            <HoveredLink href="/courses">Advanced Ai </HoveredLink>
            <HoveredLink href="/courses">Course With Project  </HoveredLink>
            <HoveredLink href="/courses">Unpaid Course </HoveredLink>
            </div>
        
        </MenuItem>
        <Link href="/contacts">
        <MenuItem setActive={setActive} active={active} item="Contacts us" >
        
        </MenuItem>
        </Link>
        <Link href="/login">
        <MenuItem setActive={setActive} active={active} item="Login">
        
        </MenuItem>
        </Link>
        <Link href="/singin">
        <MenuItem setActive={setActive} active={active} item="Singin">
        
        </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default NavBar
