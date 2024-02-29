import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getItem } from '../../utils/apiCalls';
import './SearchResults.css'
import brokenImg from '../../images/broken-img.png';
import exampleResults from '../../utils/edamam_response.json'

const SearchResults = ({ searchParams }) => {
  const [searchResults, setSearchResults] = useState(exampleResults.hints);

  useEffect(() => { 


    const callAPI = async () => {
      try {
        const data = await getItem(searchParams.get('q') || '');
        setSearchResults(data.hints)
      } catch (error) {
        console.log(error);
        setSearchResults([])
      }
    };

    // callAPI();
  }, [searchParams])

  if (!searchParams.get('q')) {
    return <p className='results-page'>search for something</p>
  }

  const uniqueResults = searchResults.reduce((acc, curr) => {
    if (!acc.find(item => curr.food.foodId === item.food.foodId)) acc.push(curr);
    return acc;
  }, [])

  return (
    <section className='results-page'>
    <p className='semi-bold'>Showing {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for {searchParams.get('q') || ''} </p>
    <div className={`results ${uniqueResults.length % 2 === 0 ? 'even-length' : 'odd-length'}`}>
      {uniqueResults.map((item, index) => 
        <div className={`single-result ${index === uniqueResults.length - 1 ? 'last' : index === uniqueResults.length - 2 ? 'second-last' : index === uniqueResults.length - 3 ? 'third-last' : ''} ${index % 2 === 0 ? '' : 'odd'} ${index % 3 === 0 ? 'every-third' : ''}`} key={item.food.foodId}>
          <img src={item.food.image || brokenImg} alt={item.food.label} />
          <p className='semi-bold'>{item.food.label}</p>
        </div>
      )}
    </div>
    </section>
  )
}

SearchResults.propTypes = {
  searchParams: PropTypes.object.isRequired
}

export default SearchResults