import { ChangeEvent, useRef, useState } from 'react';
import { TbPhoto } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { usePostPhotoChallenge } from '../../apis/challenge/postPhotoChallenge';
import { SYS_MESSAGE } from '../../constants/message';
import { UserRole } from '../../types/family';
import Button from '../common/Button';
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
  const { mutate } = usePostPhotoChallenge({
    challengeId: challengeId || '',
    answer: imageFile as File,
  });

  const handleFileInput = () => {
    if (inputRef.current) confirm(SYS_MESSAGE.EDIT) && inputRef.current.click();
  };

  const handlePhotoCancel = () => {
    if (confirm(SYS_MESSAGE.CANCEL)) {
      setImageFile(answer || null);
      mutate();
    }
  };

  const handlePhotoSave = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      mutate();
    }
  };

  return (
    <div className="shadow-card flex h-4/5 w-[90%] flex-col gap-4 rounded-2xl bg-white p-4">
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
          <div className="flex justify-center gap-1">
            <img
              src={
                typeof imageFile == 'string'
                  ? imageFile
                  : URL.createObjectURL(imageFile)
              }
              className="flex-1"
              alt="user-image"
            />
            <Button label="삭제" onClick={handlePhotoCancel} theme="subtle" />
          </div>
        )}
        {!imageFile && (
          <>
            <TbPhoto size={48} className="text-gray-40" />
            <p className="font-ryurue text-gray-40">{SYS_MESSAGE.WRITE}</p>
          </>
        )}
        <input type="file" className="hidden" onChange={handlePhotoSave} />
      </div>
    </div>
  );
};

export default PhotoAnswerEditor;
