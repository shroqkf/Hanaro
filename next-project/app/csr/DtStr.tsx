'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';

export default function DtStr() {
  console.log('CSR!!!!!!!!!!!');
  const dt = new Date().toString();
  const [dtStr, setDtStr] = useState('');
  useEffect(() => setDtStr(dt), [dt]);
  return (
    <>
      <h1>{dtStr}</h1>
      <button className='btn-primary' onClick={() => alert(dtStr)}>
        Button
      </button>
      <button className='bg-primary'>Primary</button>
      <Button variant='primary'>Shadcn Button</Button>
    </>
  );
}
