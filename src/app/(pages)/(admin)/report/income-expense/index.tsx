'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { CiWallet } from 'react-icons/ci';
import { themes } from '@/registry/themes';
import { useConfig } from '@/hooks/use-config';
import { Calendar } from '@/components/ui/calendar';
import { IoDocumentOutline } from 'react-icons/io5';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { Button } from '@/registry/new-york/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FaSearch, FaRegTrashAlt } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MdArrowForwardIos, MdDownload, MdOutlineDateRange } from 'react-icons/md';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function IncomeExpense() {
  const [date, setDate] = React.useState<Date>();

  const reports = [
    {
      title: 'Report',
      icon: IoDocumentOutline,
      paragraf: 'Income vs Expense Summary',
      color: '#8231d3',
    },
    {
      title: 'Duration',
      icon: MdOutlineDateRange,
      paragraf: 'Dec-2023 to Jul-2023',
      color: '#6c757d',
    },
    {
      title: 'Total Income',
      icon: CiWallet,
      paragraf: '$13,500.00',
      color: '#8231d3',
    },
    {
      title: 'Total Expense',
      icon: RiMoneyDollarBoxLine,
      paragraf: '$117,530.00',
      color: '#6c757d',
    },
  ];

  const series = [
    {
      name: 'Total Orders',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Total Sales',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      zoom: {
        enabled: true,
      },
      foreColor: '#5a75d7',
    },
    stroke: {
      curve: 'smooth',
    },
  };

  const { theme: mode } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);

  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Income Vs Expense</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Income Vs Expense Report</h1>
          </div>
        </div>
        <Button
          className="px-5 mt-3 rounded-md text-white text-white"
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
        <div className="grid md:grid">
          <div className="md:flex hidden" />
          <div className="md:flex md:justify-end items-center gap-5 grid">
            <div className="grid">
              <h1>Start Month</h1>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      'md:w-[280px] border border-gray-500 bg-transparent hover:bg-transparent justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid">
              <h1>End Month</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      'md:w-[280px] border border-gray-500 bg-transparent hover:bg-transparent justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
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

      <div className="lg:flex grid-cols-2 gap-3 lg:gap-0 grid my-20 mx-auto justify-between">
        {reports.map((report, idx) => (
          <div className="flex md: items-center gap-5 bg-gray-300/5 px-3 py-1 rounded-md" key={idx}>
            <div
              className="px-3 py-2 rounded-xl text-white"
              style={
                {
                  backgroundColor: 'var(--theme-primary)',
                  '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                } as React.CSSProperties
              }
            >
              <span>{React.createElement(report.icon, { size: 28 })}</span>
            </div>
            <div className="">
              <h1>{report.title}</h1>
              <p>{report.paragraf}</p>
            </div>
          </div>
        ))}
      </div>

      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
