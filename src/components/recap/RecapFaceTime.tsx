import { useGetFaceRecap } from '../../apis/recap/getFaceRecap.ts';
import FacetimeFrame from './frame/FacetimeFrame.tsx';

interface RecapFaceTimeProps {
  luckyId: string;
}

const RecapFaceTime = ({ luckyId }: RecapFaceTimeProps) => {
  const { data, isLoading } = useGetFaceRecap({ luckyId });
  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>no data</div>;

  return (
    <>
      <FacetimeFrame videos={data.video} />
    </>
  );
};

export default RecapFaceTime;
