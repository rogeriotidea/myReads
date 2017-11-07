import React from 'react'
import ShelfSelector from './ShelfSelector'

const Book = props => {

    const {book, bookshelves, onUpdateShelf} = props
    if (book.authors === undefined) {
        book.authors = [];
    }


    return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <ShelfSelector currentShelf={book.shelf}  book={book} bookshelves={bookshelves} onUpdateShelf={onUpdateShelf} />
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map(author => (
                    <div className="book-authors" key={author}>{author}</div>
                ))}
            </div>
    )
}

export default Book