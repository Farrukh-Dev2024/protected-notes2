"use client"
import { Moon, Sun,Computer,CakeSlice } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ThemeToggler() {
  const {theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  },[])

  return (
    <>
    <Button variant={"ghost"}
    onClick={() => {
        if (theme === "light") {
          setTheme("dark");
        } else if (theme === "dark") {
          setTheme("system");
        } else if (theme === "system"){
          setTheme("light");
        // }else if (theme === "system"){
        //   setTheme("light");
        }else{
          setTheme("light");
        }
    }}
    className="mr-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-1000 ease-in-out"  
    >
        {theme==="system" && isMounted ?<Computer />:""}   
        {theme==="light" && isMounted ?<Sun />:""}
        {theme==="dark" && isMounted ?<Moon />:""}
        {/* {theme==="pink" && isMounted ?<CakeSlice color=" var(--foreground)" />:""} */}
      
    </Button> 
    {/* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */}
    </>

  )
}

