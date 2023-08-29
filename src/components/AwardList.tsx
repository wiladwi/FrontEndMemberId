import React, { useState, useEffect } from 'react';
import Award from './Award';
import FilterForm from './FilterForm';

const AwardList = () => {
  const [awards, setAwards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const queryParams = {
      /*  param1: 'value1',
      param2: 'value2' */
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const apiUrl = `http://localhost:8000/api/award?${queryString}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token.replace(/^"(.+)"$/, '$1'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        setAwards(data.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);


  const handleFilterSubmit = (selectedTypes) => {
    const token = localStorage.getItem('token');
    const queryParams: { type?: string } = {};
    if (!selectedTypes.includes('All')) {
      queryParams.type = selectedTypes.join(',');
    }
  
    const queryString = new URLSearchParams(queryParams).toString();
    const apiUrl = `http://localhost:8000/api/award?${queryString}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token.replace(/^"(.+)"$/, '$1'),
      },
    })
      .then(response => response.json())
      .then(data => {
        setAwards(data.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  };

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAwards = awards.slice(startIndex, endIndex);

  return (
    <div className="flex justify-center items-center h-screen mx-0">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-white">
        <div className="max-w-screen-md p-4">
          <h1 className="text-2xl font-semibold mb-4 text-center">Award List</h1>
          {/* Form filter */}
          <FilterForm onFilterSubmit={handleFilterSubmit} />
        </div>
        <div className="flex flex-col items-center space-y-4">
          {currentAwards.map(award => (
            <Award key={award._id} award={award} />
          ))}
        </div>
        <div className="flex justify-between mt-4">
        <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage))}
          >
            Back
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() =>
              setCurrentPage(prevPage =>
                endIndex < awards.length ? prevPage + 1 : prevPage
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AwardList;
