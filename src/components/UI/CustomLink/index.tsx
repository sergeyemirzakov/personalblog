import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";
import styles from './CustomLink.module.scss'

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
  children: React.ReactNode;
}

const CustomLink = ({ children, ...props }: CustomLinkProps) => {
  return (
    <Link {...props} className={styles.root} href= {props.href || ''}>
      {children}
    </Link>
  )
}

export default CustomLink