import React, { useState, useEffect } from 'react';

const DownloadedBooks = () => {
    const [downloadedBooks, setDownloadedBooks] = useState([]);

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem('downloadedBooks')) || [];
        setDownloadedBooks(books);
    }, []);

    const openBook = (filePath) => {
        window.open(filePath, '_blank');
    };

    return (
        <div>
            <h2>Downloaded Books</h2>
            {downloadedBooks.length > 0 ? (
                <ul>
                    {downloadedBooks.map((book, index) => (
                        <li key={index}>
                            <span>{book.title} ({book.format})</span>
                            <button onClick={() => openBook(book.filePath)}>Open</button>
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

