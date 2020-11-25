import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class Home extends Component {
  getShelvesFromBooks = (books) => {
    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    return [
      {
        id: 1,
        title: "Currently Reading",
        books: currentlyReading,
      },
      {
        id: 2,
        title: "Want To Read",
        books: wantToRead,
      },
      {
        id: 3,
        title: "Read",
        books: read,
      },
    ];
  };

  render() {
    const shelves = this.getShelvesFromBooks(this.props.books);
    const { onChangeBookShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.length > 0 &&
            shelves.map((shelf) => (
              <BookShelf
                key={shelf.id}
                books={shelf.books}
                shelfTitle={shelf.title}
                onChangeBookShelf={onChangeBookShelf}
              />
            ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;

//{/* <BookShelf books={shelf[idx].books} title={shelf[idx].title} /> */}
//onChangeCategory={onChangeCategory}
