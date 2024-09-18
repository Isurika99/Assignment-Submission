import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [selectedCountry2, setSelectedCountry2] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
        // Show toast notification when the page loads
        toast.info('Select countries', { autoClose: 3000 });
      })
      .catch(error => {
        setError('Error fetching country data');
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry1 && !selectedCountry2) {
      // Show toast notification after selecting the first country
      toast.info('Select other country', { autoClose: 3000 });
    }
  }, [selectedCountry1, selectedCountry2]);

  return (
    <div className="App container">
      <p className='discription-p'>
        Countries around the world are incredibly diverse in terms of geography, culture, and governance. Each country has its own unique identity, represented by factors such as its official name, capital city, population size, land area, and national flag. Many countries are multilingual, with multiple official languages spoken by their populations.
      </p>
      <h1 className="text-center">Select the countries you want</h1>
      {error && <p>{error}</p>}
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-12 col-lg-6 mb-3">
          <CountrySelect countries={countries} setSelectedCountry={setSelectedCountry1} selectedCountry1={selectedCountry1} selectedCountry2={selectedCountry2} />
        </div>
        <div className="col-12 col-md-12 col-lg-6  mb-3">
          <CountrySelect countries={countries} setSelectedCountry={setSelectedCountry2} selectedCountry1={selectedCountry1} selectedCountry2={selectedCountry2} />
        </div>
      </div>
      {selectedCountry1 && selectedCountry2 && (
        <CountryComparison country1={selectedCountry1} country2={selectedCountry2} />
      )}
      <ToastContainer />
    </div>
  );
}

function CountrySelect({ countries, setSelectedCountry, selectedCountry1, selectedCountry2 }) {
  const handleSelect = (e) => {
    const selectedCountry = countries.find(c => c.name === e.target.value);
    setSelectedCountry(selectedCountry);
    
    // Avoid toast when both countries are selected
    if (selectedCountry1 && selectedCountry2) {
      toast.dismiss(); // Ensure no toast when both countries are selected
    }
  };

  return (
    <select onChange={handleSelect}>
      <option value="">Select a Country</option>
      {countries.map(country => (
        <option key={country.name} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
}

function CountryComparison({ country1, country2 }) {
  const [showMoreCountry1, setShowMoreCountry1] = useState(false);
  const [showMoreCountry2, setShowMoreCountry2] = useState(false);

  const toggleShowMore1 = () => setShowMoreCountry1(!showMoreCountry1);
  const toggleShowMore2 = () => setShowMoreCountry2(!showMoreCountry2);

  return (
    <div className="row mt-5 g-4 ">

      <div className="col-12 col-md-12 col-lg-6 ">
    <div className="comparison-container ">
      <div className="country-info text-center">
        <h2>{country1.name}</h2>
        <img src={country1.flag} alt={`Flag of ${country1.name}`} />
        <p><strong>Capital:</strong> {country1.capital}</p>
        <p><strong>Population:</strong> {country1.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country1.area} km²</p>
        <p><strong>Languages:</strong> {country1.languages.map(lang => lang.name).join(', ')}</p>
        

        {showMoreCountry1 ? (
          <div className="more-info">
            <p><strong>Region:</strong> {country1.region}</p>
            <p><strong>Sub region:</strong> {country1.subregion}</p>
            <p><strong>Native Name:</strong> {country1.nativeName}</p>
            <p><strong>Currencies:</strong> {country1.currencies.map(curre => curre.name).join(', ')}</p>
            <button className="more-btn" onClick={toggleShowMore1}>Show Less</button>
          </div>
        ) : (
          <button className="more-btn" onClick={toggleShowMore1}>Read More</button>
        )}
      </div>
      </div>
      </div>
      <div className="col-12 col-md-12 col-lg-6 ">
      <div className="comparison-container ">
      <div className="country-info">
        <h2>{country2.name}</h2>
        <img src={country2.flag} alt={`Flag of ${country2.name}`} />
        <p><strong>Capital:</strong> {country2.capital}</p>
        <p><strong>Population:</strong> {country2.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country2.area} km²</p>
        <p><strong>Languages:</strong> {country2.languages.map(lang => lang.name).join(', ')}</p>
        

        {showMoreCountry2 ? (
          <div className="more-info">
            <p><strong>Region:</strong> {country2.region}</p>
            <p><strong>Sub region:</strong> {country2.subregion}</p>
            <p><strong>Native Name:</strong> {country2.nativeName}</p>
            <p><strong>Currencies:</strong> {country2.currencies.map(curre => curre.name).join(', ')}</p>
            <button className="more-btn" onClick={toggleShowMore2}>Show Less</button>
          </div>
        ) : (
          <button className="more-btn" onClick={toggleShowMore2}>Read More</button>
        )}
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
