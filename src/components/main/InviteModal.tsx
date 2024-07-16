import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import Button from '../common/Button';

const InviteModal = ({ code }: { code: string }) => {
  return (
    <div className="mb-10 mt-10 flex flex-col items-center justify-evenly gap-12 bg-background text-center font-pretendard">
      <h4 className="text-pretendard-md font-pretendard-bold">가족 초대하기</h4>
      <div className="relative flex w-full flex-col gap-2 rounded-md bg-gray-20 px-2 py-4">
        <p className="text-pretendard-base">초대 코드</p>
        <p className="text-pretendard-md font-pretendard-bold">{code}</p>
        <CopyToClipboard text={code}>
          <button className="absolute right-2 top-2 rounded p-1 active:bg-gray-30">
            <FiCopy className="h-5 w-5" />
          </button>
        </CopyToClipboard>
      </div>
      {/* TODO: 초대 링크 확인하기 */}
      <CopyToClipboard text={`https://mooluck.site/main?code=${code}`}>
        <Button label="초대 링크 복사하기" type="full" theme="neutral" />
      </CopyToClipboard>
    </div>
  );
};

export default InviteModal;
