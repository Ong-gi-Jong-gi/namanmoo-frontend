import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { TbPhoto } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { usePostPhotoChallenge } from '../../apis/challenge/postPhotoChallenge';
import { SYS_MESSAGE } from '../../constants/message';
import { UserRole } from '../../types/family';
import Profile from '../common/Profile';

interface PhotoAnswerEditorProps {
  role: UserRole;
  answer: string | null;
  userImg?: string;
}

const PhotoAnswerEditor = ({
  role,
  answer,
  userImg,
}: PhotoAnswerEditorProps) => {
  const { challengeId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | string | null>(
    answer || null,
  );
  const { mutate } = usePostPhotoChallenge();

  const handleFileInput = (e: MouseEvent<HTMLDivElement>) => {
    // FIXME: confirm 두번 뜨는 현상 확인
    e.stopPropagation(); // 이벤트 버블링 방지
    if (inputRef.current) inputRef.current.click();
  };

  const handlePhotoSave = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const formData = new FormData();

      if (challengeId) formData.append('challengeId', challengeId);
      if (e.target.files[0]) formData.append('answer', e.target.files[0]);

      mutate(formData);
    }
  };

  return (
    <div className="flex h-4/5 w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-card">
      <Profile
        type={userImg ? 'image' : 'default'}
        layout="horizontal"
        userName="나"
        userRole={role}
        src={userImg}
        isText
      />
      <div
        className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-paper hover:cursor-pointer"
        onClick={handleFileInput}
      >
        {imageFile && (
          <div className="flex flex-1 items-center justify-center">
            <img
              src={
                typeof imageFile == 'string'
                  ? imageFile
                  : URL.createObjectURL(imageFile)
              }
              alt="user-image"
            />
          </div>
        )}
        {!imageFile && (
          <>
            <TbPhoto size={48} className="text-gray-40" />
            <p className="font-ryurue text-gray-40">{SYS_MESSAGE.WRITE}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handlePhotoSave}
        />
      </div>
    </div>
  );
};

export default PhotoAnswerEditor;
