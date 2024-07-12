import { create } from 'zustand';
import { FilterType } from '../types/challenge';

interface FilterTypeStore {
  filterType: FilterType;
  setFilterType: (filterType: FilterType) => void;
}

export const useFilterTypeStore = create<FilterTypeStore>((set) => ({
  filterType: 'none',
  setFilterType: (filterType) => set({ filterType }),
}));
