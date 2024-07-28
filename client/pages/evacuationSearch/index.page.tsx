import { useMap } from 'features/map/useMap';
import styles from './index.module.css';

const EvacuationSearch = () => {
  const mapContainerRef = useMap();
  return (
    <>
      {/* <Head>
        <script src="https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css" rel="stylesheet" />
      </Head> */}
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.mapContainer}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EvacuationSearch;
