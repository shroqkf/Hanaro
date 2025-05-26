import { use } from 'react';

type Props = {
  params: Promise<{ time: string }>;
};

export default function Time({ params }: Props) {
  const { time } = use(params);
  const [firstChar, ...timestr] = time;
  return <>Hi! Good {`${firstChar.toUpperCase()} ${timestr.join()}`}~</>;
}
