import React, { useState, useEffect } from 'react';

const DownloadedBooks = () => {
    const [downloadedBooks, setDownloadedBooks] = useState([]);

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem('downloadedBooks')) || [];
        setDownloadedBooks(books);
    }, []);

    const openBook = (filePath) => {
        if (filePath) {
            window.open(filePath, '_blank');
        } else {
            alert("Book file not found.");
        }
    };


    return (
        <div className='main-content'>
            <h2>Downloaded Books</h2>
            {downloadedBooks.length > 0 ? (
                <ul>
                    {downloadedBooks.map((book, index) => (
                       <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       {book.image && (
                           <img
                               src={book.image}
                               alt={book.title}
                               style={{ width: '100px', height: 'auto', borderRadius: '4px',margin: '10px' }}
                           />
                       )}
                       <div>
                           <span>{book.title} ({book.format})</span>
                           <button onClick={() => openBook(book.filePath)}>Open</button>
                       </div>
                   </li>
                    ))}
                </ul>
            ) : (
                <p>No books downloaded yet.</p>
            )}
        </div>
    );
};

export default DownloadedBooks;

