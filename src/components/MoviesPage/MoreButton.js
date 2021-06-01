import React from 'react';
import PropTypes from 'prop-types';

const MoreButton = ({ onClick }) => (<button className='movies-list__more' type='button' onClick={onClick}>Ещё</button>);

MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MoreButton;
