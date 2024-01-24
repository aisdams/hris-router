import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { themes } from '@/registry/themes';
import { useConfig } from '@/hooks/use-config';
import { Button } from '@/components/ui/button';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { MdArrowForwardIos, MdDownload } from 'react-icons/md';

export default function Payers() {
  const [config] = useConfig();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config.theme);
  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center relative">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Payers</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Payers</h1>
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
    </div>
  );
}
