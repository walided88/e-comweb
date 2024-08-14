import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ paths }) {
  return (
    <nav>
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          <Link to={path.href} style={{ color: '#007bff', textDecoration: 'none' }}>
            {path.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
