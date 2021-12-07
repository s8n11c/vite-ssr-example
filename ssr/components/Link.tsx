import { ReactNode } from "react";
import { useSsrContext } from "../context";

type Props = {
  to: string;
  children: ReactNode;
};

export const Link = ({ to, children }: Props) => {
  let { navigate } = useSsrContext();
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
