import {create} from 'zustand';

interface Country {
  flags: { png: string };
  name: { common: string };
  region: string;
  capital: string;
  population: number;
}

type Region = 'none' | 'Africa' | 'America' | 'Asia' | 'Europe' | 'Oceania';

const useCountriesStore = create((set) => ({
  countries: [] as Country[],
  isLoading: true,
  error: '',
  searchQuery: '',
  selectedRegion: 'none',
  
  resetLoadingAndError: () => set({ isLoading: true, error: '' }),


  getAllCountries: async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      if (!res.ok) throw new Error('Something went wrong');

      const data = await res.json();
      set({ countries: data, isLoading: false, error: '' });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  searchCountries: async (query: string) => {
    set({ searchQuery: query, isLoading: true, error: '' });
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
      if (!res.ok) throw new Error('Country not found');

      const data = await res.json();
      set({ countries: data, isLoading: false, error: '' });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  filterCountries: async (region: Region) => {
    set({ selectedRegion: region, isLoading: true, error: '' });
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      if (!res.ok) throw new Error('Something went wrong');

      const data = await res.json();
      set({ countries: data, isLoading: false, error: '' });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },
}));

export default useCountriesStore;
