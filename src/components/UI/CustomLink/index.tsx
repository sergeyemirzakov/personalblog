import Link from 'next/link';
import styles from './CustomLink.module.scss';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  target?: '_blank' | '_self';
}

const CustomLink = ({ children, href, target = '_self' }: CustomLinkProps) => {
  return (
    <Link className={styles.root} href={href} target={target}>
      {children}
    </Link>
  );
};

export default CustomLink;
