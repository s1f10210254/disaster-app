import Link from 'next/link';
import { pagesPath } from 'utils/$path';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Hello!</div>
        <Link href={pagesPath.evacuationSearch.$url()}>
          <button>Evacuation Search</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
