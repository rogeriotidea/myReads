import React from 'react'

const ShelfSelector = props => {

    const {currentShelf, bookshelves, book, onUpdateShelf} = props

    return (
        <select value={currentShelf} onChange={(ev) => onUpdateShelf(ev.target.value, book)}>
                <option value="none">Move to...</option>
                {
                    bookshelves.map(shelf => (
                        <option value={shelf.id} key={shelf.id}>{shelf.name}</option>
                    ))
                }

        </select>
    )
}

export default ShelfSelector