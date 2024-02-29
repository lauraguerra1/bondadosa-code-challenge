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

  return (
    <section className='results-page'>
    <p className='semi-bold'>Showing {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for {searchParams.get('q') || ''} </p>
    <div className='results'>
      {searchResults.reduce((acc, curr) => {
        if (!acc.find(item => curr.food.foodId === item.key)) {
          acc.push(
            <div className={`single-result ${acc.length % 2 === 0 ? '' : 'odd'} ${acc.length % 3 === 0 ? 'every-third' : ''}`} key={curr.food.foodId}>
              <img src={curr.food.image || brokenImg} alt={curr.food.label} />
              <p className='semi-bold'>{curr.food.label}</p>
            </div>
          );
        }
        return acc;
      }, [])}
    </div>
    </section>
  )
}

SearchResults.propTypes = {
  searchParams: PropTypes.object.isRequired
}

export default SearchResults