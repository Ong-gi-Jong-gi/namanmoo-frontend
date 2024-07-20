import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <ClipLoader size={80} />
    </div>
  );
};

export default Loader;
