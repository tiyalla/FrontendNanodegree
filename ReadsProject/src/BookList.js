import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ChangeShelf from './ChangeShelf';

class BookList extends Component{
    
    static propTypes = {
        books: PropTypes.array.isRequired    
    }
    
    render() {
        const { books, onChangeShelf } = this.props;
        // console.log("in here ",books.filter((book) => book.shelf === "currentlyReading").map((book) =>(book)));
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>

            <div className="list-books-content">

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter((book) => book.shelf === "currentlyReading").map((book) =>  {return(
                            <ChangeShelf 
                            book = {book} 
                            key = {book.id} 
                            onChangeShelf={onChangeShelf} 
                            />
                            )}
                            
                            )}
                    </ol>
                </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter((book) => book.shelf === "wantToRead").map((book) =>  {return(
                            <ChangeShelf 
                            book = {book} 
                            key = {book.id} 
                            onChangeShelf={onChangeShelf} 
                            />
                            )}
                            
                            )}
                    </ol>
                </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter((book) => book.shelf === "read").map((book) =>  {return(
                            <ChangeShelf 
                            book = {book} 
                            key = {book.id} 
                            onChangeShelf={onChangeShelf} 
                            />
                            )}
                            
                            )}
                    </ol>
                </div>
                </div>
            <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
        </div>
        )
    }

}
export default BookList