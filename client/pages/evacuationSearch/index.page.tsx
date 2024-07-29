import { Loading } from 'components/loading/Loading';
import { useMap } from 'features/map/useMap';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import styles from './index.module.css';

const EvacuationSearch = () => {
  const [responseImageUrl, setResponseImageUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const { loading, mapContainerRef } = useMap();

  // 画像をminiOにアップロードする関数
  // const uploadImage = async (filePath: string, image: Blob) => {
  //   const upload = await apiClient.uploadImage.$put({
  //     body: { filePath, image },
  //   });
  //   return upload;
  // };

  // 署名付きURLを取得する関数
  // const getSingedUrl = async (filePath: string) => {
  //   const url = await apiClient.uploadImage.get({ query: { filePath } });
  //   return url.body;
  // };

  // 画像をpngからBlobに変換する関数
  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  // 画像URLからGPT-4で文字認識を行う関数
  // const recognition = async (imageUrl: string) => {
  //   const response = await apiClient.uploadImage.$post({ body: { imageUrl } });
  //   return response;
  // };

  const handleStartEvacuation = async () => {
    if (!mapContainerRef.current) return;
    try {
      const canvas = await html2canvas(mapContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const filePath = `image/map_${Date.now()}.png`;
      const blob = dataURLtoBlob(imgData);
      console.log('blob:', blob);

      // // 画像をminiOにアップロード
      // const response = await uploadImage(filePath, blob);
      // console.log('response:', response);

      // // 署名付きURLを取得
      // const signedUrl = await getSingedUrl(filePath);
      // console.log('signedUrl:', signedUrl);
      // setResponseImageUrl(signedUrl);

      // // GPT-4で文字認識
      // const gptResponse = await recognition(signedUrl);
      // console.log('gptResponse:', gptResponse);
      // setResponseText(gptResponse);
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
              <img src={responseImageUrl} alt="map" className={styles.imageBox} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
                画像がありません
              </div>
            )}
          </div>
          <div>
            {responseText ? (
              <div>
                <h2>文字認識結果</h2>
                <p>{responseText}</p>
              </div>
            ) : (
              <div>
                <h2>文字認識結果</h2>
                <p>文字認識結果がありません</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvacuationSearch;
