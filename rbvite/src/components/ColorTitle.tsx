import type { PropsWithChildren } from 'react';

const ColorTitle = ({
  color,
  children,
}: PropsWithChildren<{ color: string }>) => {
  // console.log('@@@ ColorTitle!!', color);
  return (
    <>
      <style>{`h2 { color: ${color}; }`}</style>
      <h2>{children}</h2>
    </>
  );
};

export default ColorTitle;
