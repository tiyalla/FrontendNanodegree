import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ChangeShelf from './ChangeShelf';

class SearchBooks extends Component{
    state = {
        books: [],
        query: ''
    }
    
    updateQuery(query) {
        BooksAPI.search(query).then(books => books ? this.setState({ books }) : []);
        this.setState({ query });
    }
  
  
    renderResults() {
        const { books, query } = this.state;
        const{ onChangeShelf } = this.props;
        if (query) {
            return books.error ?
                <div>Oops! Nothing found</div>
                : books.map((book, index) => {
                    return (
                        <ChangeShelf
                            key={index}
                            book={book}
                            onChangeShelf={onChangeShelf}
                        />
                    );
                });
        }
    }

    render() {
        //const{ onChangeShelf } = this.props;
            return (
                <div className="search-books">
                  <div className="search-books-bar">
                    <Link
                      to='/'
                      className='close-search'
                    >
                      Close
                    </Link>
                    <div className="search-books-input-wrapper">
                      <input
                          type="text"
                          placeholder="Search by title or author"
                          value={this.state.query}
                          onChange={(event) => this.updateQuery(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                        {this.renderResults()}
                    </ol>
                  </div>
                </div>
        
        )
    }
}
export default SearchBooks