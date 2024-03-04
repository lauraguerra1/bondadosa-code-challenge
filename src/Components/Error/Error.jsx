import React from 'react';
import PropTypes from 'prop-types';

const Error = ({errorStatus}) => {
  return <p className='error-msg'>{errorStatus}</p>
}

Error.propTypes = {
  errorStatus: PropTypes.string.isRequired,
}

export default Error