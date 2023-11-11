import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import styles from './ButtonLink.module.scss'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
  children: React.ReactNode;
}

const ButtonLink = ({ children, ...props }: ButtonLinkProps) => {
  return (
    <Link {...props} className={styles.root} href={props.href || ''}>
      {children}
    </Link>
  )
}

export default ButtonLink