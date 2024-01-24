import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { themes } from '@/registry/themes';
import { useConfig } from '@/hooks/use-config';
import { Button } from '@/components/ui/button';
import { FaUserPlus, FaPlus } from 'react-icons/fa';
import LionImage from '../../../../public/img/lion.jpg';
import ImageAv from '../../../../public/img/image.jpg';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import FamilyImage from '../../../../public/img/family.jpg';
import { MdArrowForwardIos, MdDownload } from 'react-icons/md';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function User() {
  const [config] = useConfig();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config.theme);

  const users = [
    {
      position: 'Hr',
      image: LionImage,
      name: 'hr',
      email: 'hr@example.com',
    },
    {
      position: 'Accountant',
      image: FamilyImage,
      name: 'Timon Leonard',
      email: 'felo@mailinator.com',
    },
    {
      position: 'Manager',
      image: ImageAv,
      name: 'Brenden Jordan',
      email: 'zocaj@mailinator.com',
    },
    {
      position: 'Accountant',
      image: FamilyImage,
      name: 'Ali Brown',
      email: 'dinyny@mailinator.com',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full justify-between pt-10 items-center relative">
        <div className="grid">
          <h1 className="font-semibold mb-3 text-xl">Manage Users</h1>
          <div className="flex items-center gap-3">
            <Link href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-xs" />
            <h1>Manage Users</h1>
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
            <FaUserPlus />
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
            <FaPlus />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-0 gap-8 mt-20">
        {users.map((user, idx) => (
          <div key={idx} className="">
            <div className="flex justify-between">
              <div
                className="px-3 text-white h-max"
                style={
                  {
                    backgroundColor: 'var(--theme-primary)',
                    '--theme-primary': `hsl(${config?.cssVars[mode === 'dark' ? 'dark' : 'light'].primary})`,
                  } as React.CSSProperties
                }
              >
                {user.position}
              </div>
            </div>
            <Image
              src={user.image}
              alt=""
              className="w-14 h-14 my-10 text-center grid mx-auto justify-center rounded-full"
            />
            <div className="grid text-center">
              <h1 className="text-purple-500">{user.name}</h1>
              <h1>{user.email}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid md:grid-cols-4 grid-cols-2 md:gap-0 gap-8">
        <div>
          <div className="flex justify-between">
            <div className="bg-purple-500 px-3 text-white h-max">Accountant</div>
          </div>
          <Image
            src={LionImage}
            alt=""
            className="w-14 h-14 my-10 text-center grid mx-auto justify-center rounded-full"
          />
          <div className="grid text-center">
            <h1 className="text-purple-500">Ali Brown</h1>
            <h1>dinyny@mailinator.com</h1>
          </div>
        </div>
        <div className="grid">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-purple-500 h-10 w-10 text-white mx-auto grid justify-center rounded-lg">
                  <FaUserPlus className="text-xl mt-2" />
                </div>
                <h1 className="pt-5">New User</h1>
                <p>Click to add new user</p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black px-8 text-white py-1 rounded-md">Create</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
