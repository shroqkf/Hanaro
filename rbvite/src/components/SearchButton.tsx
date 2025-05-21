import { useFormStatus } from 'react-dom';

type Props = {
  inpName?: string;
  label?: string;
};

export default function SearchButton({
  inpName = 'searchStr',
  label = 'Search',
}: Props) {
  const { pending, data } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? `searching... ${data.get(inpName)}` : label}
    </button>
  );
}
