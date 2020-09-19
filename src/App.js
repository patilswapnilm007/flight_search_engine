import React, { useState } from 'react';
import './App.css';
import flightData from './flights.json'
import FlightDetails from './flightDetails/FlightDetails';
import SearchForm from './searchForm/SearchForm';

function App() {

  const [SearchQuery, setSearchQuery] = useState({ src: '', dest: '', price: [0, 10000], passengers: 1 });

  const updateSearchQuery = (SearchData) => {
    const newQuery = {
      ...SearchData
    }
    setSearchQuery(newQuery);
  };
  const filterFlightData = (flight) => {
    let isValid = true;
    if (SearchQuery.src.trim() !== '' && SearchQuery.src.toLowerCase().trim() !== flight.source.toLowerCase().trim())
      isValid = false;
    if (SearchQuery.dest.trim() !== '' && SearchQuery.dest.toLowerCase().trim() !== flight.destination.toLowerCase().trim())
      isValid = false
    if (SearchQuery.price[0] > parseInt(flight.fare.slice(3)) || parseInt(flight.fare.slice(3)) > SearchQuery.price[1])
      isValid = false;
    if (SearchQuery.departdate && SearchQuery.departdate !== flight.departure_date)
      isValid = false
    if (SearchQuery.passengers > flight.remaing_seats)
      isValid = false
    return isValid;
  }
  const prepareHeader = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let SearchCriteria = '';
    if (!SearchQuery.src && !SearchQuery.dest && !SearchQuery.date)
      SearchCriteria = `Showing all results`;
    if (SearchQuery.src && SearchQuery.dest)
      SearchCriteria = SearchQuery.src.charAt(0).toUpperCase() + SearchQuery.src.slice(1) + ' > ' + SearchQuery.dest.charAt(0).toUpperCase() + SearchQuery.dest.slice(1);
    if (SearchCriteria !== '' && SearchQuery.departdate) {
      const d = (new Date(SearchQuery.departdate));
      SearchCriteria += ` on ${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}`;
    } return SearchCriteria;
  }

  const prepareResultFlights = () => {
    const results = flightData.filter(filterFlightData).map((flight) => (
      <FlightDetails
        flightId={flight.flight_id}
        srcCode={flight.source_code}
        destCode={flight.destination_code}
        fare={flight.fare}
        departure={flight.departs_at}
        arrival={flight.arrives_at}
        departureDate={flight.departure_date}
        remainingSeats={flight.remaing_seats}
      />
    ))
    return results.length <= 0 ? 'No Results found!' : results;
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Flight Search Engine</h1>
      </div>
      <div className="App-content">
        <div className="Search-form">
          <SearchForm onSearch={updateSearchQuery}></SearchForm>
        </div>
        <div className="Flight-results">
          <div className="Search-header">
            <h2>{prepareHeader()}</h2>
            <h3>{`Price : Rs. ${SearchQuery.price[0]} - Rs. ${SearchQuery.price[1]}`}</h3>
          </div>
          <div className="Search-content">
            {prepareResultFlights()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
