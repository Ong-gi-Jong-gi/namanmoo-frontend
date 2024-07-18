import { useGetYouthRecap } from '../../apis/recap/getYouthRecap';
import POLROID from '../../constants/POLROID';
import PolaroidFrame from './frame/PolaroidFrame';

interface RecapYoungPhotoProps {
  luckyId: string;
}

const RecapYoungPhoto = ({ luckyId }: RecapYoungPhotoProps) => {
  const { data, isLoading } = useGetYouthRecap({ luckyId });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  return (
    <div className="h-full w-full pt-4">
      <span className="z-10 font-pretendard text-pretendard-md font-pretendard-bold">
        우리의 어린 시절
      </span>
      <div className="relative h-full w-full overflow-y-hidden">
        {data.map((recap, index) => (
          <PolaroidFrame
            key={`polaroid-${index}`}
            imageUrl={recap.photoUrl}
            type={POLROID.YOUNG_IMAGE_POSITION[index].type}
            x={POLROID.YOUNG_IMAGE_POSITION[index].x}
            y={POLROID.YOUNG_IMAGE_POSITION[index].y}
            rotation={POLROID.YOUNG_IMAGE_POSITION[index].rotation}
            text={`${recap.text}이 되고 싶던 아이`}
            theme={POLROID.YOUNG_IMAGE_POSITION[index].theme}
          />
        ))}
      </div>
    </div>
  );
};

export default RecapYoungPhoto;
