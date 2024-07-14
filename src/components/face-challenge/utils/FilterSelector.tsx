import { BsSunglasses } from 'react-icons/bs';
import { GiRainbowStar } from 'react-icons/gi';
import { MdOutlinePets } from 'react-icons/md';
import { VscCircleSlash } from 'react-icons/vsc';
import { useFilterTypeStore } from '../../../store/filterTypeStore';
import { FilterType } from '../../../types/challenge';
import IconButton from '../../common/IconButton';

const filterIconMap: {
  [key in FilterType]: JSX.Element;
} = {
  none: <VscCircleSlash size={28} />,
  sunglasses: <BsSunglasses size={28} />,
  rainbow: <GiRainbowStar size={28} />,
  dog: <MdOutlinePets size={28} />,
};

const FilterSelector = () => {
  const { filterType, setFilterType } = useFilterTypeStore();
  return (
    <div className="flex w-full items-center justify-center gap-2">
      {Object.keys(filterIconMap).map((type) => (
        <IconButton
          key={type}
          onClick={() => setFilterType(type as FilterType)}
          icon={filterIconMap[type as FilterType]}
          theme={type === filterType ? 'selectedNeutral' : 'neutral'}
        />
      ))}
    </div>
  );
};

export default FilterSelector;
