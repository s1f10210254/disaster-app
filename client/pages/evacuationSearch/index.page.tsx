import { Loading } from 'components/loading/Loading';
import { useMap } from 'features/map/useMap';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import styles from './index.module.css';

const EvacuationSearch = () => {
  const [responseImageUrl, setResponseImageUrl] = useState<string | null>(null);
  const { loading, mapContainerRef } = useMap();

  const handleStartEvacuation = async () => {
    if (!mapContainerRef.current) return;
    try {
      const canvas = await html2canvas(mapContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
      });
      const imgData = canvas.toDataURL('image/png');
      setResponseImageUrl(imgData);
    } catch (error) {
      console.error('Error capturing the map:', error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Loading visible={loading} />
        <div className={styles.main}>
          <div className={styles.mapContainer}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          </div>
          <button onClick={handleStartEvacuation}>避難を開始</button>
          <div className={styles.imageBox}>
            {responseImageUrl ? (
              <div>
                <img src={responseImageUrl} alt="response" className={styles.imageBox} />
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
                画像がありません
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvacuationSearch;
