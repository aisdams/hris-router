'use client';
import React from 'react';
import Link from 'next/link';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { themes } from '@/registry/themes';
import { FaPlus } from 'react-icons/fa';
import { CgCloseO } from 'react-icons/cg';
import { Input } from '@/components/ui/input';
import { useConfig } from '@/hooks/use-config';
import { TbCircleCheck } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { TbClipboardCopy } from 'react-icons/tb';
import { IoDocumentOutline } from 'react-icons/io5';
import { Checkbox } from '@/components/ui/checkbox';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { MdArrowForwardIos, MdDownload, MdOutlineDateRange } from 'react-icons/md';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index() {
  const [config] = useConfig();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config.theme);
  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Contract</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Contract</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className="px-5 mt-3 rounded-md text-white"
            style={
              {
                backgroundColor: 'var(--theme-primary)',
                '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
              } as React.CSSProperties
            }
          >
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}
