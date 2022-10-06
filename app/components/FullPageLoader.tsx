import {ImSpinner5} from 'react-icons/im';
import styles from '../styles/Home.module.css';

export default function FullPageLoader() {
  return (
    <div className={styles.loaderwrapper}>
      <ImSpinner5 className={styles.loader} />
      <p>Loading...</p>
    </div>
  );
}
