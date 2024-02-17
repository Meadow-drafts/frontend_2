import {  useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useCountriesStore from "../store/countriesStore";

function CountryDetail() {
  const { countryName } = useParams<{ countryName: string }>();

  const { getSingleCountry, countries, isLoading, error } = useCountriesStore();

  const getCountryByName = async () => {
    getSingleCountry(countryName);
  };

  useEffect(() => {
    getCountryByName();
  }, [countryName, getSingleCountry]);

  return (
    <div className="country-detail pt-[7rem] mx-auto px-[1.5rem] lg:py-[7rem] max-w-[375px] md:max-w-[600px] lg:max-w-[1100px] lg:px-0 ">
      <Link to="/">
        <button className=" bg-main-elements px-7 py-2 shadow-main-color-shadow shadow-sm">
          <i className="far fa-arrow-left font-bold mr-3"></i>
          <span>Back</span>
        </button>
      </Link>

      <div className="details mt-[4rem]">
      {isLoading && <h2 className="text-3xl font-bold">Loading...</h2>}
        {!isLoading && error && <h2 className="text-2xl font-bold">{error}</h2>}
        {countries && countries.length > 0 && countries.map((country: any) => {
          return (
            <div className="detai-wrappe lg:flex lg:gap-[6rem] ">
              <div className="country-flag mb-[3rem] lg:w-[40%]">
                <img className="w-full" src={country.flags.png} alt="" />
              </div>

              <div className="country-desc">
                <h1 className="mb-[1.5rem] font-bold text-2xl lg:text-3xl">
                  {country.name.common}
                </h1>
                <div className="desc text-md pb-[3rem] lg:pb-0 lg:flex lg:gap-[6rem]">
                  <div className="main-desc flex flex-col gap-3 mb-[2rem] lg:mb-0">
                    <p>
                      <span className=" font-semibold">Native Name: </span>
                      {country.name.common}
                    </p>
                    <p>
                      <span className=" font-semibold">
                        {/* population in number format*/}
                        Population:{" "}
                      </span>
                      {new Intl.NumberFormat().format(country.population)}
                    </p>
                    <p>
                      <span className=" font-semibold">Region: </span>
                      {country.region}
                    </p>
                    <p>
                      <span className=" font-semibold">Sub Region: </span>
                      {Boolean(country.subregion) && country.subregion}
                    </p>
                    <p>
                      <span className=" font-semibold">Capital: </span>
                      {Boolean(country.capital) && country.capital}
                    </p>
                  </div>

                  <div className="extra-desc flex flex-col gap-3">
                    <p>
                      <span className=" font-semibold">Top Level Domain: </span>
                      {Boolean(country.tld) && country.tld}

                    </p>
                    <p>
                      <span className=" font-semibold">Currencies: </span>
                      {country.currencies && Object.keys(country.currencies)}
                    </p>
                    <p>
                      <span className=" font-semibold">
                        {/* ====== changing nested object to an array ======*/}
                        Languages:{" "}
                      </span>
                      {country.languages &&
                        Object.keys(country.languages).map(
                          (val, index, arr) => {
                            if (index === arr.length - 1) {
                              return val;
                            } else {
                              return val + ", ";
                            }
                          }
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CountryDetail;
