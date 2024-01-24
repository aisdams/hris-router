import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { CgCloseO } from 'react-icons/cg';
import { themes } from '@/registry/themes';
import { useConfig } from '@/hooks/use-config';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { TbCircleCheck, TbClipboardCopy } from 'react-icons/tb';
import { FaSearch, FaRegTrashAlt, FaChevronDown } from 'react-icons/fa';
import { MdArrowForwardIos, MdDownload, MdOutlineDateRange } from 'react-icons/md';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function MonthlyAttendance() {
  const [date, setDate] = React.useState<Date>();

  const { theme: mode } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);

  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Monthly Attendance</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Monthly Attendance Report</h1>
          </div>
        </div>
        <Button
          className="px-5 mt-3 rounded-md text-white"
          style={
            {
              backgroundColor: 'var(--theme-primary)',
              '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
            } as React.CSSProperties
          }
        >
          <MdDownload />
        </Button>
      </div>

      <div className="my-10">
        <div className="grid items-center gap-3 md:justify-end">
          <div
            className="md:grid 
          w-full hidden"
          ></div>
          <div
            className="md:flex grid items-center gap-3
          "
          >
            <div className="grid">
              <div className="grid">
                <h1>Select Month</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex px-3 md:w-[160px] w-full border border-gray-500 bg-transparent hover:bg-transparent text-left text-sm font-normal justify-between rounded-md h-10 items-center pt-1">
                    Jan <FaChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Jan</DropdownMenuItem>
                    <DropdownMenuItem>Feb</DropdownMenuItem>
                    <DropdownMenuItem>Mar</DropdownMenuItem>
                    <DropdownMenuItem>Apr</DropdownMenuItem>
                    <DropdownMenuItem>Mei</DropdownMenuItem>
                    <DropdownMenuItem>Jun</DropdownMenuItem>
                    <DropdownMenuItem>Jul</DropdownMenuItem>
                    <DropdownMenuItem>Aug</DropdownMenuItem>
                    <DropdownMenuItem>Sep</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid">
              <h1 className="text-sm mb-2">Branch</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex px-3 md:w-[160px] w-full border border-gray-500 bg-transparent hover:bg-transparent text-left font-normal justify-between rounded-md h-10 items-center pt-1">
                  All <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>China</DropdownMenuItem>
                  <DropdownMenuItem>India</DropdownMenuItem>
                  <DropdownMenuItem>Canada</DropdownMenuItem>
                  <DropdownMenuItem>Greece</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid">
              <h1 className="text-sm mb-2">Department</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex px-3 md:w-[160px] w-full border border-gray-500 bg-transparent hover:bg-transparent text-left text-sm font-normal justify-between rounded-md h-10 items-center pt-1">
                  Select Department <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Industrials</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>China</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid">
              <h1 className="text-sm mb-2">Employee</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex px-3 md:w-[160px] w-full border border-gray-500 bg-transparent hover:bg-transparent text-left text-sm font-normal justify-between rounded-md h-10 items-center pt-1">
                  Employee
                  <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>-</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2 items-center mt-5">
              <Button
                className="text-xs px-2 w-9 h-9 text-white rounded-md p-3 mx-0 text-center"
                style={
                  {
                    backgroundColor: 'var(--theme-primary)',
                    '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                  } as React.CSSProperties
                }
              >
                <FaSearch />
              </Button>
              <Button className="bg-red-500 text-xs px-2 w-9 h-9 text-white rounded-md p-3 mx-0 text-center">
                <FaRegTrashAlt />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-14">
        <div className="grid grid-cols-2  gap-3 items-center">
          <div className="flex items-center gap-3">
            <div
              className="text-white px-2 w-10 h-10 rounded-md grid items-center"
              style={
                {
                  backgroundColor: 'var(--theme-primary)',
                  '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                } as React.CSSProperties
              }
            >
              <TbClipboardCopy className="text-2xl" />
            </div>
            <div className="grid">
              <h1 className="font-semibold">Report</h1>
              <h1 className="font-light">Monthly Leave Summary</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#6c757d] text-white px-2 w-10 h-10 rounded-md grid items-center">
              <MdOutlineDateRange className="text-2xl" />
            </div>
            <div className="grid">
              <h1 className="font-semibold">Duration</h1>
              <h1 className="font-light">Dec-2023</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 items-center mt-8">
          <div className="flex items-center gap-3">
            <div
              className="text-white px-2 w-10 h-10 rounded-md grid items-center"
              style={
                {
                  backgroundColor: 'var(--theme-primary)',
                  '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                } as React.CSSProperties
              }
            >
              <TbCircleCheck className="text-2xl" />
            </div>
            <div className="grid">
              <h1 className="font-semibold">Approved Leaves</h1>
              <h1 className="font-light">3</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#6c757d] text-white px-2 w-10 h-10 rounded-md grid items-center">
              <CgCloseO className="text-2xl" />
            </div>
            <div className="grid">
              <h1 className="font-semibold">Rejected Leave</h1>
              <h1 className="font-light">4</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="text-white px-2 w-10 h-10 rounded-md grid items-center"
              style={
                {
                  backgroundColor: 'var(--theme-primary)',
                  '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                } as React.CSSProperties
              }
            >
              <IoIosRemoveCircleOutline className="text-2xl" />
            </div>
            <div className="grid">
              <h1 className="font-semibold">Pending Leaves</h1>
              <h1 className="font-light">4</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
