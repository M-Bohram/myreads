import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { onChangeBookShelf, shelfTitle, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeBookShelf={onChangeBookShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
//onChangeCategory={onChangeCategory}
