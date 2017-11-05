import React from 'react'
import Book from './Book.js'

const BookShelf = props => {

    const {name, books} = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                            <li key={book.id}>
                                <Book book={book} key={book.id} ></Book>
                            </li>
                        )
                    )}
                </ol>
            </div>
        </div>
    )

}

export default BookShelf

// WANT TO READ
// READ
// CURRENTLY READING