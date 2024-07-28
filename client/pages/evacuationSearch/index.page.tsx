import { useMap } from 'features/map/useMap';
import styles from './index.module.css';

const EvacuationSearch = () => {
  const mapContainerRef = useMap();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.mapContainer}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default EvacuationSearch;
