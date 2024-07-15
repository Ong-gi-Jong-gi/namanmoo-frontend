import { useGetFaceRecap } from '../../apis/recap/getFaceRecap.ts';
import FacetimeFrame from './frame/FacetimeFrame.tsx';

const RecapFaceTime = () => {
  const { data, isLoading } = useGetFaceRecap({ luckyId: '1' });
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>no data</div>;

  return (
    <>
      <FacetimeFrame videos={data.video} />
    </>
  );
};

export default RecapFaceTime;
