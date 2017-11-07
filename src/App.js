import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {

    state = {
      books: []
    }

    componentDidMount(){
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      });
    }

    updateShelf = (shelf, book) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf
                this.setState((state) => ({
                     books : state.books.filter((b) => b.id !== book.id).concat([book])
                })
            )
        });
    }

  render() {

    const bookshelves = [{
      id: 'currentlyReading', name: 'Currently Reading'
    },{
      id: 'wantToRead', name: 'Want to Read'
    },{
      id: 'read', name: 'Read'
    }]

    return (
     <Router>
      <div className="app">
          <Route exact path="/" render={() => (
                <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                       {
                          bookshelves.map(shelf => (
                              <BookShelf key={shelf.id} bookshelves={bookshelves} name={shelf.name} books={this.state.books.filter((book) => book.shelf === shelf.id)} onUpdateShelf={this.updateShelf} />
                          ))
                       }
                  </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
              </div>
          )}/>

          <Route path="/search" render={({history}) => (
              <BookSearch bookshelves={bookshelves}  onUpdateShelf={this.updateShelf} />
          )}/>
      </div>
     </Router>
    )
  }
}

export default BooksApp
