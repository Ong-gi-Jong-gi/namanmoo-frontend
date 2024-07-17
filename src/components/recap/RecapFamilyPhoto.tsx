import { useGetFamilyPhotoRecap } from '../../apis/recap/getFamilyPhotoRecap';
import POLROID from '../../constants/POLROID';
import PolaroidFrame from './frame/PolaroidFrame';

const RecapFamilyPhoto = () => {
  const { data, isLoading } = useGetFamilyPhotoRecap({
    luckyId: '6',
  });

  if (isLoading) return <div>loading...</div>;
  if (!data || !data.mainPhoto || !data.otherPhotos) return <div>no data</div>;
  const { mainPhoto, otherPhotos } = data;

  return (
    <div className="flex h-full w-full flex-col gap-4 pt-4">
      <span className="font-pretendard text-pretendard-md font-pretendard-bold">
        우리들의 기록
      </span>
      <div className="relative h-full w-full overflow-hidden">
        {otherPhotos.map((url, index) => (
          <PolaroidFrame
            key={`polaroid-${index}`}
            imageUrl={url}
            type={POLROID.IMAGE_POSITION[index].type}
            x={POLROID.IMAGE_POSITION[index].x}
            y={POLROID.IMAGE_POSITION[index].y}
            rotation={POLROID.IMAGE_POSITION[index].rotation}
          />
        ))}
        <PolaroidFrame
          type="main"
          imageUrl={mainPhoto}
          x={50}
          y={50}
          rotation={0}
        />
      </div>
    </div>
  );
};

export default RecapFamilyPhoto;
