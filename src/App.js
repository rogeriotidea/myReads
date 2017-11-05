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
                              <BookShelf key={shelf.id} name={shelf.name} books={this.state.books.filter((book) => book.shelf === shelf.id)} />
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
              <BookSearch />
          )}/>
      </div>
     </Router>
    )
  }
}

export default BooksApp
