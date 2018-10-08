import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import BookList from './BookList';
import SearchBooks from './SearchBooks';


class BooksApp extends React.Component {
  state = {
    books: [],
    bookFiltered: []
  }

  
  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
  		this.setState({books});
  	})
  }

  changeShelf = (books, shelf) => {
    BooksAPI.update(books, shelf).then((books) => {
      BooksAPI.getAll().then((books) => {
        this.setState( { books: books } )
        
      })
    })
  }

  render() {
    return (
      <div className="app">
     
      <Route exact path="/" render={() => (
        <BookList books = {this.state.books} 
        onChangeShelf={this.changeShelf}/> 
        )}/>
       
        <Route exact path="/search" render={() => (
        <SearchBooks 
        onChangeShelf={this.changeShelf}/> 
        )}/>
      </div>
    )
  }
}

export default BooksApp
