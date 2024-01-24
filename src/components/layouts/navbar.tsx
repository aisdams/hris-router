'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';
import { ThemesTabs } from '../tabs';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { MdEmail } from 'react-icons/md';
import { FaHeadset } from 'react-icons/fa';
import { themes } from '@/registry/themes';
import sideBarData from '@/data/sidebarData';
import { RiMenu5Fill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { useConfig } from '@/hooks/use-config';
import { ThemeWrapper } from '../theme-wrapper';
import { IoIosArrowDown } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import Logo from '../../../public/img/HrisTem.png';
import { FaPencilAlt, FaBell } from 'react-icons/fa';
import LogoAvatar from '../../../public/img/ghost.jpg';
import { Customizer, ThemeCustomizer } from '@/components/theme-customizer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { theme: mode, setTheme } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);
  const [switchToogle, setSwitchToogle] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const handleSubMenuClick = (index: any) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleSubMenuClickT = (idx: any) => {
    setShowSubMenu(!showSubMenu);
  };

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {screenWidth < 1024 ? (
        <>
          <div
            className="flex justify-between py-3 px-10 h-max !w-full items-center bg-white 
    z-10 dark:bg-[#020817]"
          >
            <Image src={Logo} alt="" className="dark:brightness-0 dark:invert-[1] w-44 sm:h-14" />
            <div className="">
              <Sheet>
                <SheetTrigger>
                  <RiMenu5Fill className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <Image src={Logo} alt="" className="dark:brightness-0 dark:invert-[1] w-44 sm:h-14" />
                    </SheetTitle>
                    <SheetDescription>
                      {sideBarData.map((sidebar, idx) => (
                        <div key={idx} className="grid dark:bg-[#020817]">
                          <ul>
                            <li>
                              {sidebar.sub ? (
                                <div className="flex justify-between" onClick={() => handleSubMenuClick(idx)}>
                                  <button className="flex gap-5 mb-3 w-full text-left">
                                    <span>{React.createElement(sidebar.icon, { size: 18 })}</span>
                                    {sidebar.title}
                                  </button>
                                  <IoIosArrowDown className="" />
                                </div>
                              ) : (
                                <Link href={sidebar.link} className="flex gap-5 mb-3 w-full text-left cursor-pointer">
                                  <span>{React.createElement(sidebar.icon, { size: 18 })}</span>
                                  {sidebar.title}
                                </Link>
                              )}
                              {sidebar.sub && activeSubMenu === idx && (
                                <ul className="mb-3">
                                  {sidebar.sub.map((subItem, subIdx) => (
                                    <div key={subIdx}>
                                      <li>
                                        {subItem.link ? (
                                          <Link href={subItem.link} className="flex gap-5 ml-10 items-center">
                                            {subItem.title}
                                          </Link>
                                        ) : (
                                          <span
                                            className="flex gap-5 ml-10 items-center cursor-pointer"
                                            onClick={() => handleSubMenuClickT(idx)}
                                          >
                                            {subItem.title}
                                            <IoIosArrowDown className="" />
                                          </span>
                                        )}

                                        {subItem.submenu && showSubMenu && (
                                          <ul>
                                            {subItem.submenu.map((children, idc) => (
                                              <li key={idc}>
                                                {children.link ? (
                                                  <Link
                                                    href={children.link}
                                                    className="flex gap-5 ml-14 mt-1 items-center"
                                                  >
                                                    {children.title}
                                                  </Link>
                                                ) : (
                                                  <span className="flex gap-5 ml-5 items-center">{children.title}</span>
                                                )}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    </div>
                                  ))}
                                </ul>
                              )}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="!fixed grid grid-cols-[1fr_1fr_2fr] py-3 justify-between px-10 h-max !w-full bg-white 
      z-10 dark:bg-[#020817]"
          >
            <div className="flex justify-between items-center pr-16">
              <Image src={Logo} alt="" className="dark:brightness-0 dark:invert-[1] w-44 sm:h-14" />
              <div className="">
                <RiMenu5Fill className="w-6 h-6" onClick={toggleSidebar} />
              </div>
            </div>

            <div className="flex items-center">
              <Sheet>
                <SheetTrigger className="bg-gray-500/90 text-white flex items-center gap-3 rounded-full px-3 py-2 text-sm">
                  <FaPencilAlt />
                  Customize
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Customizer</SheetTitle>
                    <SheetDescription>Customize Your Overview Page layout</SheetDescription>
                    <div className="customize">
                      <ThemeWrapper
                        defaultTheme="zinc"
                        className="relative flex flex-col items-start md:flex-row md:items-center"
                      >
                        <div className="px-4 pb-8 md:ml-auto md:pb-0">
                          <ThemeCustomizer />
                        </div>
                      </ThemeWrapper>
                      <div className="relative flex gap-4 ">
                        <ThemesTabs />
                        <Customizer className="hidden md:flex" />
                      </div>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex justify-end mx-0 items-center gap-10">
              <Popover>
                <PopoverTrigger>
                  <MdEmail />
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    <div className="text-center bg-gray-800/40 rounded-sm py-1">
                      <h1>Messages</h1>
                    </div>
                    <div className="mt-5 gap-3 grid">
                      <div className="flex gap-3">
                        <Image src={LogoAvatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="grid">
                          <div className="flex justify-between items-center gap-3">
                            <h1>App Developer</h1>
                            <h1 className="text-green-500 text-xs">2 hrs ago</h1>
                          </div>
                          <p className="font-light text-xs">Lorem ipsum dolor sit..</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Image src={LogoAvatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="grid">
                          <div className="flex justify-between items-center gap-3">
                            <h1>App Developer</h1>
                            <h1 className="text-green-500 text-xs">2 hrs ago</h1>
                          </div>
                          <p className="font-light text-xs">Lorem ipsum dolor sit..</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Image src={LogoAvatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="grid">
                          <div className="flex justify-between items-center gap-3">
                            <h1>App Developer</h1>
                            <h1 className="text-green-500 text-xs">2 hrs ago</h1>
                          </div>
                          <p className="font-light text-xs">Lorem ipsum dolor sit..</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <FaBell />
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    <div className="text-center bg-gray-800/40 rounded-sm py-1">
                      <h1>Notification</h1>
                    </div>
                    <div className="mt-5 gap-3 grid">
                      <div className="flex gap-3">
                        <Image src={LogoAvatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="grid">
                          <div className="flex justify-between items-center gap-3">
                            <h1>App Developer</h1>
                            <h1 className="text-green-500 text-xs">2 hrs ago</h1>
                          </div>
                          <p className="font-light text-xs">Lorem ipsum dolor sit..</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Image src={LogoAvatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="grid">
                          <div className="flex justify-between items-center gap-3">
                            <h1>App Developer</h1>
                            <h1 className="text-green-500 text-xs">2 hrs ago</h1>
                          </div>
                          <p className="font-light text-xs">Lorem ipsum dolor sit..</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Image src={LogoAvatar} alt="" className="rounded-full w-12 h-12" />
                        <div className="grid">
                          <div className="flex justify-between items-center gap-3">
                            <h1>App Developer</h1>
                            <h1 className="text-green-500 text-xs">2 hrs ago</h1>
                          </div>
                          <p className="font-light text-xs">Lorem ipsum dolor sit..</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="flex gap-3">
                <Image src={LogoAvatar} alt="" className="w-9 h-9 rounded-full" width={36} height={36} />
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-3">
                    Jajang
                    <IoIosArrowDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href="/auth/login">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    </Link>
                    <Link href="/auth/login">
                      <DropdownMenuSeparator />
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/auth/login">
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                    </Link>
                    <Link href="/auth/login">
                      <DropdownMenuItem>Team</DropdownMenuItem>
                    </Link>
                    <Link href="/auth/login">
                      <DropdownMenuItem>Log out</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
