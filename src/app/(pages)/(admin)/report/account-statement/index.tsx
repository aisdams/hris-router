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
import { themes } from '@/registry/themes';
import { useConfig } from '@/hooks/use-config';
import { Button } from '@/components/ui/button';
import { MdOutlineAllInbox } from 'react-icons/md';
import { LiaShareAltSolid } from 'react-icons/lia';
import { Calendar } from '@/components/ui/calendar';
import { IoDocumentOutline } from 'react-icons/io5';
import { Checkbox } from '@/components/ui/checkbox';
import { FaAngleDown, FaPlus } from 'react-icons/fa';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FaChevronDown, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import { ArrowUpDown, Check, ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MdArrowForwardIos, MdDownload, MdOutlineDateRange } from 'react-icons/md';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AccountStatement() {
  const [config] = useConfig();
  const { theme: mode } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();
  const [value, setValue] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const theme = themes.find((theme) => theme.name === config.theme);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const reports = [
    {
      title: 'Report',
      icon: IoDocumentOutline,
      paragraf: 'Income vs Expense Summary',
    },
    {
      title: 'Transaction Type',
      icon: LiaShareAltSolid,
      paragraf: 'Income',
    },
    {
      title: 'Duration',
      icon: MdOutlineDateRange,
      paragraf: 'Dec-2023 to Jul-2023',
    },
    {
      title: 'Benjamin Adams',
      icon: MdOutlineAllInbox,
      paragraf: 'Total Credit : $1,500.00',
    },
    {
      title: 'Chisom Latifat',
      icon: MdOutlineAllInbox,
      paragraf: 'Total Credit : $1,200.00',
    },
    {
      title: 'Earl Hane MD',
      icon: MdOutlineAllInbox,
      paragraf: 'Total Credit : $500.00',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center relative">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Account Statement</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Account Statement</h1>
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
            <MdDownload />
          </Button>
          <Button
            className="px-5 mt-3 rounded-md text-white"
            style={
              {
                backgroundColor: 'var(--theme-primary)',
                '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
              } as React.CSSProperties
            }
          >
            <HiOutlineDocumentPlus />
          </Button>
        </div>
      </div>

      <div className="my-10">
        <div className="flex items-center gap-3 justify-end">
          <div className="grid"></div>
          <div className="flex gap-3">
            <div className="grid">
              <h1>Start Month</h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      'w-[280px] border border-gray-500 bg-transparent hover:bg-transparent justify-start text-left font-normal',
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
                      'w-[280px] border border-gray-500 bg-transparent hover:bg-transparent justify-start text-left font-normal',
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
              <h1 className="text-sm mb-2">Account</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex px-3 w-[160px] border border-gray-500 bg-transparent hover:bg-transparent text-left font-normal justify-between rounded-md h-10 items-center pt-1">
                  All <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Lorem, ipsum.</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Lorem, ipsum.</DropdownMenuItem>
                  <DropdownMenuItem>Lorem, ipsum.</DropdownMenuItem>
                  <DropdownMenuItem>Lorem, ipsum.</DropdownMenuItem>
                  <DropdownMenuItem>Lorem, ipsum.</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid">
              <h1 className="text-sm mb-2">Type</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex px-3 w-[160px] border border-gray-500 bg-transparent hover:bg-transparent text-left text-sm font-normal justify-between rounded-md h-10 items-center pt-1">
                  Select Department <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Income</DropdownMenuItem>
                  <DropdownMenuItem>Expense</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 my-20 mx-auto justify-between">
        {reports.map((report, idx) => (
          <div className="flex items-center gap-5 bg-gray-300/5 px-3 py-1 rounded-md" key={idx}>
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

      <div className="mt-14">
        <div className="flex justify-between mt-10">
          <div className="flex">
            <div className="flex items-center gap-3">
              <div className="border border-gray-400 px-5 py-1 rounded-md">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex gap-3 items-center">
                    10 <FaAngleDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h1>entries per page</h1>
            </div>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] border border-gray-400 justify-between"
              >
                {value ? frameworks.find((framework) => framework.value === value)?.label : 'Search...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="rounded-md border mt-10">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
