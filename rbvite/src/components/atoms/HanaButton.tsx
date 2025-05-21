import type { CSSProperties, PropsWithChildren } from "react";

type Props = {
  size: "sm" | "md" | "lg";
  variant: "default" | "primary" | "danger";
  onClick?: () => void;
};

const variantStyle: Record<Props["variant"], CSSProperties> = {
  default: { backgroundColor: "white", color: "gray" },
  primary: { backgroundColor: "blue", color: "white" },
  danger: { backgroundColor: "red", color: "white" },
};

const sizeStyle: Record<Props["size"], CSSProperties> = {
  sm: { padding: "0.5rem" },
  md: { padding: "1rem" },
  lg: { padding: "1.5rem", fontSize: "1.5rem" },
};

export default function HanaButton({
  variant,
  size,
  onClick = () => {},
  children,
}: PropsWithChildren<Props>) {
  const style = Object.assign({}, variantStyle[variant], sizeStyle[size]);
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}
