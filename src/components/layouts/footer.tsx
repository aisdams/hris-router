import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="flex justify-between w-full">
      <h1>
        © 2023 <Link href="/">SovWare</Link>
      </h1>
      <div className="">
        <ul className="flex gap-3 cursor-not-allowed">
          <li>About</li>
          <li>Team</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}
