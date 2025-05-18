"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu,X,LogIn,LogOut,CircleHelp, Divide,ClipboardList,Plus,Minus,Pencil} from "lucide-react";
import { BsGear,BsChatFill } from "react-icons/bs";

import logo from "@/assets/logo.png"
import {ThemeToggler} from "@/app/clientcomponents/ThemeToggler";
//import { IProtectedNotesProps } from "@/lib/types";
import { AppContext } from '@/app/clientcomponents/HomePage';

interface INavBarProps {
  email: string,
};
const NavBar:React.FC<INavBarProps> = (props) => {
//const NavBar:React.FC = (props) => {
  const { email } = props;
  const context = React.useContext(AppContext);
  const { appData, setAppData } = context || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuList, setMenuList] = useState(
    [
      {id:1,text:"plus",display:<Plus/>,requirelogin:true},
      {id:2,text:"minus",display:<Minus/>,requirelogin:true},
      {id:3,text:"edit",display:<Pencil/>,requirelogin:true},
      {id:4,text:"list",display:<ClipboardList/>,requirelogin:true},
      {id:5,text:"login",display:<LogIn/>,requirelogin:false},
      {id:6,text:"logout",display:<LogOut/>,requirelogin:true},
      {id:7,text:"help",display:<CircleHelp/>,requirelogin:false},                    
      {id:8,text:"usersettings",display:<BsGear/>,requirelogin:true},
      {id:9,text:"contactme",display:<BsChatFill/>,requirelogin:false},      
      // {id:10,text:"lock",display:"🔒",requirelogin:true},
      // {id:11,text:"key",display:"🔑",requirelogin:true},

    ]);
    let isUserLoggedIn = false;
    if (email){
      isUserLoggedIn = true;
    }


  // Throttle scroll event for better performance
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMenuOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  function MenuClicked(item: string) {
    if (item === "login") {
      return(
        LogInClicked()
      );
    }else if (item=="logout"){
      return(LogOutClicked())
    }else if (item=="usersettings"){
      return(UserSettingsClicked())
    }else if (item=="contactme"){
      return(ContactMeClicked())  
    }else{
      if (setAppData) {
        setAppData(prev => ({ ...prev, menuclicked: item }));
      }else{
        alert("You need to be in a list to do this.");
      }
      //console.log("MenuClicked: %o",item);
    }
  }
  function LogInClicked() {
    console.log("LogInClicked");
    return(
      window.location.href = "/?page=login"
    );
  }
  function LogOutClicked() {
    console.log("LogOutClicked");
    return(
      window.location.href = "/?page=logout"
    );
  }  
  function UserSettingsClicked() {
    console.log("UserSettingsClicked");
    return(
      window.location.href = "/?page=usersettings"
    );
  }  
  function ContactMeClicked() {
    console.log("ContactMeClicked");
    return(
      window.location.href = "/?page=contactme"
    );
  }    
  return (
    <header
      className={`min-w-sm p-4 sticky top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      data-slot="header"
    >
      <div className="container-custom flex items-center justify-between h-20 md:h-20 md:p-4 md:mx-4">
        {/* Logo with Image */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo} // 
            alt="Protected-Notes Logo"
            width={64} // Customize width
            height={64} // Customize height
            priority // Loads the logo immediately
          />
          <span className="overflow-hidden text-sm md:text-xl font-bold tracking-tight">Protected-Notes</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-end md:items-center">
            <ThemeToggler />
          <nav className="joyride-step1 hidden md:flex flex-wrap items-center space-x-8" data-slot="nav">
            {menuList.map((item) => (
              ( (item.requirelogin && isUserLoggedIn) || (!item.requirelogin && (item.text!="login" || !isUserLoggedIn)) ) ? 
              //(true) ?
                <Button key={item.id} data-text={item.text} variant="ghost" 
                onClick={() => {
                  //scrollToSection(item.text);
                  MenuClicked(item.text);
                }} 
                className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-1000 ease-in-out"
                >
                  {item.display}
                </Button>
              : 
                null 
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b" data-slot="mobile-menu">
          <div className="joyride-step1small container-custom py-4 flex flex-col space-y-4">

          {menuList.map((item) => (
              ( (item.requirelogin && isUserLoggedIn) || (!item.requirelogin && (item.text!="login" || !isUserLoggedIn)) ) ? 
                <Button key={item.id} data-text={item.text} variant="ghost" 
                onClick={() => {
                  MenuClicked(item.text);
                }} 
                className="text-sm font-medium hover:text-amber-500"
                >
                  {item.display}
                </Button>
              : 
                null 
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
