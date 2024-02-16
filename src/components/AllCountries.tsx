import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useCountriesStore from "../store/countriesStore";

const regions = [
  { value: 'Africa', label: 'Africa' },
  { value: 'America', label: 'America' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];


function AllCountries({ goHome }: { goHome: boolean }) {


  const searchBar = useRef<HTMLInputElement>(null);
  const selectBar = useRef<HTMLSelectElement>(null);

  const { getAllCountries,countries, searchCountries,filterCountries, isLoading, error, resetLoadingAndError } = useCountriesStore();


useEffect(() => {
  getAllCountries();
},[goHome])



const searchCountry = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const query = searchBar.current!.value;
  searchCountries(query);
};

const filterCountriesByRegion = async () => {
  const region = selectBar.current!.value as Region;
  filterCountries(region);
};

  useEffect(() => {
    resetLoadingAndError();
    selectBar.current!.value = "none"; 
    getAllCountries();
  }, [goHome]);

  return (
    <div className="all-countries mx-auto px-[1rem] py-[5rem] lg:py-[7rem] lg:max-w-[1100px] lg:px-0">
      <div className="search-and-filter my-[2rem] lg:flex lg:justify-between">
        {/* ====== Search country ======= */}
        <div className="searchbar mb-6 lg:w-[400px]">
          <form onSubmit={searchCountry} className="relative ">
            <i
              onClick={searchCountry}
              className="fa-solid fa-magnifying-glass absolute p-1 left-[12px] bottom-[12px] cursor-pointer"
            />
            <input
              ref={searchBar}
              type="text"
              placeholder="Search for a country..."
              className="pl-[3rem] py-3 w-full outline-none bg-main-color-input rounded-md"
            />
          </form>
        </div>

        {/* ====== filter by region ====== */}
        <div className="filter-region">
          <select
            ref={selectBar}
            name="region"
            onChange={filterCountriesByRegion}
            className="w-[170px] py-3 px-4 bg-main-color-input rounded-md outline-none"
          >
            <option value="none" selected disabled hidden>Filter by Region</option>
            {regions.map((region) => (
            <option key={region.value} value={region.value}>
              {region.label}
            </option>
             ))}
          </select>
      </div>
  </div>

            {/* ===== list countries ===== */}
            <div className="country-list grid grid-cols-1 lg:grid-cols-4 gap-[3rem] mx-auto max-w-[375px] md:max-w-[600px] px-[1rem] lg:max-w-[1100px] lg:px-0">
                {isLoading && !error && <h2 className="text-3xl font-bold">Loading...</h2>}
                {!isLoading && error && <h2 className="text-2xl font-bold">{error}</h2>}

                {
                    countries?.map((country: any) => {
                        return(
                        <div className="country-card bg-main-elements rounded-md overflow-hidden">
                            <div className="flag">
                                <img src={country.flags.png} alt={`${country.name.common}-flag`} className="w-full h-[12rem] md:h-[20rem] lg:h-[9rem]" />
                            </div>

                            <div className="country-desc p-[1.5rem]">
                                <Link to={`/${country.name.common}`}>
                                    <h2 className="mb-[0.8rem] font-bold text-2xl">{country.name.common}</h2>
                                </Link>
                                <div className="desc text-[16px]">
                                    <p><span className=" font-semibold">
                                        Population: </span>{new Intl.NumberFormat().format(country.population)}
                                    </p>
                                    <p><span className=" font-semibold">
                                        Region: </span>{country.region}
                                    </p>
                                    <p><span className=" font-semibold">
                                        Capital: </span>{country.capital}
                                    </p>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
     );
}

export default AllCountries;