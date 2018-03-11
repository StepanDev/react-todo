import React from 'react';
import { Link } from 'react-router-dom';

const LinkWrapper = function (props) {
  return (
    <Link to={ props.to } className='link-wrapper' id={ props.id }>
      { props.children }
    </Link>
  );

};

export default LinkWrapper;
