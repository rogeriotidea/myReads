import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {debounce} from 'throttle-debounce';


class BookSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            consulta : '',
            resultados : []
        }
    }

    atualizaConsulta = (consulta) => {
        this.setState({consulta})
        debounce(500,this.buscaLivros(consulta));
    }

    buscaLivros = (termoConsulta) => {

        if (termoConsulta === '') {
            this.setState({resultados : []})
            return
        }

        BooksAPI.search(termoConsulta, 20)
            .then((books) => {

                if (books.error) {
                    this.setState({resultados : []})
                    return
                }
                else if (books === undefined) {
                    this.setState({resultados : []})
                    return
                }

                this.setState({resultados : books})
            })
    }

    render(){

        const {consulta, resultados} = this.state
        const {bookshelves, onUpdateShelf, selectedBooks} = this.props

        resultados.map(book => {
            let bookShelf = selectedBooks.find(bk => bk.id === book.id)
            if (bookShelf !== undefined){
                if (book.id === bookShelf.id){
                    book.shelf = bookShelf.shelf;
                }
            }
            return bookShelf;
        })

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={consulta} onChange={(event) => this.atualizaConsulta(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {resultados.map(book =>
                            (
                                <li key={book.id}>
                                    <Book bookshelves={bookshelves} book={book} onUpdateShelf={onUpdateShelf}/>
                                </li>
                            )
                        )}

                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch