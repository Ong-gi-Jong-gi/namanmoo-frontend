import { BsSunglasses } from 'react-icons/bs';
import { VscCircleSlash } from 'react-icons/vsc';
import { filterType } from '../../types/challenge';
import IconButton from '../common/IconButton';

interface FilterSelectorProps {
  filterType: filterType;
  setFilterType: (filterType: filterType) => void;
}

const filterIconMap: {
  [key in filterType]: JSX.Element;
} = {
  none: <VscCircleSlash size={28} />,
  sunglasses: <BsSunglasses size={28} />,
};

const FilterSelector = ({ filterType, setFilterType }: FilterSelectorProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      {Object.keys(filterIconMap).map((type) => (
        <IconButton
          key={type}
          onClick={() => setFilterType(type as filterType)}
          icon={filterIconMap[type as filterType]}
          theme={type === filterType ? 'selectedNeutral' : 'neutral'}
        />
      ))}
    </div>
  );
};

export default FilterSelector;
