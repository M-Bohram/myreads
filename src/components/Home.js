import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    const {
      onChangeBookShelf,
      currentlyReading,
      wantToRead,
      read,
    } = this.props;

    const shelves = [
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
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            <BookShelf
              key={shelf.id}
              books={shelf.books}
              shelfTitle={shelf.title}
              onChangeBookShelf={onChangeBookShelf}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;

//{/* <BookShelf books={shelf[idx].books} title={shelf[idx].title} /> */}
//onChangeCategory={onChangeCategory}
