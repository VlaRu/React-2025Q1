import type { ReactNode } from 'react';
import React from 'react';
import Link from 'next/link';

export default function Page404(): ReactNode {
  return (
    <div>
      <div>
        <p>404 Route</p>
        <p>Not Found</p>
        <p>The requested URL was not found on this server.</p>
        <Link href={'/404'}>to main page</Link>
      </div>
    </div>
  );
}
