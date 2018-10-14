import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ChangeShelf from './ChangeShelf';

class SearchBooks extends Component{
    state = {
        allBooks: [],
        query: ''
    }
    
    updateQuery(query){
    if(query){
        BooksAPI.search(query).then((allBooks) => {
            this.handleShelf(allBooks);
            this.setState({ allBooks });
        })
    }else {
        this.setState({ allBooks: []});
    }
        this.setState({ query });
 }
    
     
     handleShelf = (bookValues) => {
        const{ books } = this.props;
        for (let value of bookValues) {
          for (let book of books) {
            if (value.id === book.id) {
              value.shelf = book.shelf
            }
          }
        }
        this.setState({allBooks: bookValues})
    }
     
 
    renderResults() {
        const { allBooks, query } = this.state;
        const{ onChangeShelf } = this.props;
       
        if (query) {
            return allBooks.error ?
                <div>Oops! Nothing found</div>
                : allBooks.map((book) => {
                    return (
                        
                        <ChangeShelf
                            key={book.id}
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