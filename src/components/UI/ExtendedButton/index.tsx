import button from "@/components/UI/Button";
import React, { ComponentProps } from "react";
import Link from "next/link";


interface ExtendedButtonProps {
  children: React.ReactNode;
  as: 'button' | 'link';
  to: string;
}

const ExtendedButton = ({ children, as, to }: ExtendedButtonProps) => {
  if (as === 'link') {
    return (
      <Link href={to} target='_blank'>
        <button>{children}</button>
      </Link>
    )
  }

  if (as === 'button') {
    return (
      <button>{children}</button>
    )
  }

  return null

}

export default ExtendedButton