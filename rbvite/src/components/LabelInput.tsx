import { useId } from 'react';

export default function LabelInput({ label }: { label: string }) {
  const id = useId();
  return (
    <label htmlFor={id}>
      {label}: <input type='text' id={id} />
    </label>
  );
}
