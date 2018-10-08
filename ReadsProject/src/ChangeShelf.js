import React, {Component} from 'react';


class ChangeShelf extends Component {
  
    render() {
        const { book, onChangeShelf } = this.props;
        let shelfValue = (book.shelf) ? book.shelf : 'none';
        // console.log("what am i here", book);
        return(
        <li>
        <div className="book">
          <div className="book-top">
          {book.imageLinks && (
              <div className="book-cover" style={{width: 128,height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}>
              </div>
            )}
            <div className="book-shelf-changer">
                <select
                value={shelfValue} 
                onChange={(event) => onChangeShelf(book, event.target.value)}
                >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.author && book
            .authors
            .map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
            ))}
        </div>
      </li>
        )
    
    }

}
export default ChangeShelf