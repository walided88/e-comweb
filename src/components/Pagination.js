import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: '0 5px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: page === currentPage ? '#007bff' : '#fff',
            color: page === currentPage ? '#fff' : '#007bff',
            cursor: 'pointer'
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
