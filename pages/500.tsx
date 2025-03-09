import type { ReactNode } from 'react';

export default function Page500(): ReactNode {
  return <>`status={500} message=\Server-side error occurred.\`</>;
}
