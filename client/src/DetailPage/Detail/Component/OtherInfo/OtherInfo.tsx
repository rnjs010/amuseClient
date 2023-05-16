import React, { useEffect, useState } from 'react';
import './OtherInfo.scss';
import OtherInfoDetail from './OtherInfoDetail/OtherInfoDetail';
import axios from 'axios';

type OtherInfoProps = {
  itemId: number | null;
};

function OtherInfo({ itemId }: OtherInfoProps) {
  /**
   * OtherInfo Data
   */
  interface OtherInfoData {
    content: string;
  }

  const [otherInfoData, setOtherInfoData] = useState<OtherInfoData>();

  /**
   * OtherInfo API
   */
  useEffect(() => {
    axios
      .get(`https://ammuse.store/detail/${itemId}/other-info`)
      .then((response) => {
        setOtherInfoData(response.data.data)

        //console.log("product", response.data.data)
      })
      .catch(error => {
        console.log("연결 실패");
      });
  }, []);

  return (
    <div className='other-info'>
         <div dangerouslySetInnerHTML={{ __html: otherInfoData?.content ?? '' }}></div>
    </div>
  );
}

export default OtherInfo;
