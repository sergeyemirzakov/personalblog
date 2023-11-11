import { LoadingProgress } from '@/pages/_app';
import classNames from 'classnames';
import styles from './ProgressBar.module.scss';

interface ProgressBar {
  loadingProgress: LoadingProgress;
}

const ProgressBar: React.FC<ProgressBar> = ({ loadingProgress }) => (
  <div className={classNames(styles.root, styles[loadingProgress])} />
);

export default ProgressBar;
