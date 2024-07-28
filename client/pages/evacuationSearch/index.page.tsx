import { Loading } from 'components/loading/Loading';
import { useMap } from 'features/map/useMap';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './index.module.css';

const EvacuationSearch = () => {
  const [responseImageUrl, setResponseImageUrl] = useState<string | null>(null);
  const { loading, mapContainerRef, captureMap } = useMap();

  const handleStartEvacuation = async () => {
    const imageData = captureMap();
    if (imageData) {
      const response: string = await apiClient.mapData
        .post({ body: { imageUrl: imageData } })
        .then((res) => res.body)
        .catch((err) => err);

      setResponseImageUrl(response);
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
