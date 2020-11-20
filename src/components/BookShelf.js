import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li>
                <Book
                  imageUrl={book.imageUrl}
                  title={book.title}
                  author={book.author}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
