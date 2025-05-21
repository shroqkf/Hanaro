import type { CSSProperties, PropsWithChildren } from "react";
type Props = {
  color: string;
  size: "sm" | "md" | "lg";
  textAlign: "start" | "center" | "end";
};

// type x = React.ComponentProps<typeof ColorTitle>;

const sizeStyle: Record<Props["size"], CSSProperties> = {
  sm: { fontSize: "1.2rem", fontWeight: 400 },
  md: { fontSize: "2.2rem", fontWeight: 600 },
  lg: { fontSize: "3.2rem", fontWeight: 800 },
};

export default function ColorTitle({
  color,
  size,
  textAlign,
  children,
}: PropsWithChildren<Props>) {
  const style = Object.assign({ color, textAlign }, sizeStyle[size]);

  return <h1 style={style}>{children}</h1>;
}
