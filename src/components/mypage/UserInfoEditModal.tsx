import { ChangeEvent, useRef } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { usePostUserInfo } from '../../apis/user/postUserInfo';
import DefaultImage from '../../assets/profile/default.svg';
import FORM_INFO from '../../constants/FORM_INFO';
import useForm from '../../hooks/useForm';
import useModalStore from '../../store/modalStore';
import { UserInfoEditType } from '../../types/auth';
import { UserRole } from '../../types/family';
import { userInfoEditValidate } from '../../utils/validate';
import Button from '../common/Button';
import Input from '../common/Input';
import FamilyRole from '../familycreate/FamilyRole';

interface ModalProps {
  role: UserRole;
  userImg: string;
  name: string;
  nickname: string;
}

const UserInfoEditModal = ({ role, userImg, name, nickname }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { closeModal } = useModalStore();
  const { mutate } = usePostUserInfo();

  const { values, handleChange, handleSubmit, errors, setValues } =
    useForm<UserInfoEditType>({
      initialValues: {
        role,
        userImg,
        name,
        nickname,
      },
      onSubmit: () => {
        const postForm = new FormData();
        const blobUserInfo = new Blob(
          [
            JSON.stringify({
              name: values.name,
              nickname: values.nickname,
              role: values.role,
            }),
          ],
          { type: 'application/json' },
        );
        postForm.append('userInfo', blobUserInfo);
        postForm.append('userImg', values.userImg);

        mutate(postForm);
        closeModal();
      },
      validate: userInfoEditValidate,
    });

  const profileImage = () => {
    if (values.userImg && typeof values.userImg == 'string') {
      return values.userImg;
    } else if (values.userImg && typeof values.userImg == 'object') {
      return URL.createObjectURL(values.userImg);
    } else {
      return DefaultImage;
    }
  };

  const handleFileInput = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChangeRole = (role: UserRole) => {
    setValues((state: UserInfoEditType) => ({ ...state, role }));
  };

  const handleProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files != null && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setValues((state) => ({ ...state, userImg: e.target.files![0] }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-9"
    >
      <h2 className="font-ryurue text-ryurue-md">프로필 수정</h2>
      <div className="relative hover:cursor-pointer" onClick={handleFileInput}>
        <div className="h-20 w-20 overflow-hidden rounded-full border border-secondary-20">
          <img src={profileImage()} alt="user-profile" className="w-full" />
        </div>
        <div className="absolute bottom-[-2px] right-[-2px] rounded-full bg-primary-20 p-1">
          <MdOutlineEdit />
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          name="userImg"
          accept="image/*"
          onChange={handleProfileImg}
        />
      </div>
      <div className="flex w-full flex-col gap-7">
        <Input
          value={values.name}
          onChange={handleChange}
          message={errors.name}
          isFull
          {...FORM_INFO.SIGNUP.name}
        />
        <Input
          value={values.nickname}
          onChange={handleChange}
          message={errors.nickname}
          {...FORM_INFO.SIGNUP.nickname}
          isFull
        />
        <p className="font-ryurue text-ryurue-base">역할</p>
        <FamilyRole myRole={values.role} changeRole={handleChangeRole} />
      </div>
      <Button label={'완료'} type="full" onClick={handleSubmit} />
    </form>
  );
};

export default UserInfoEditModal;
