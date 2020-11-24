import React, { Component } from "react";
import _ from "lodash";
import * as BookAPI from "../BooksAPI";

class Book extends Component {
  state = {
    book: {},
  };

  changeBookShelf = (e) => {
    let category = e.target.value;
    this.props.onChangeBookShelf(this.state.book.id, category);
  };

  componentDidMount() {
    BookAPI.get(this.props.bookId).then((receivedBook) =>
      this.setState({ book: receivedBook })
    );
  }

  render() {
    const { book } = this.state;
    const defaultCoverImage =
      "https://cdn141.picsart.com/311796011013201.jpg?type=webp&to=crop&r=256";
    return (
      !_.isEmpty(book) && (
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${
                  book.imageLinks
                    ? book.imageLinks.thumbnail
                    : defaultCoverImage
                }")`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.changeBookShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {_.isArray(book.authors) ? (
              book.authors.map((author) => (
                <div key={author}>
                  <span>{author}</span>
                  <br />
                </div>
              ))
            ) : (
              <span>{book.authors}</span>
            )}
          </div>
        </div>
      )
    );
  }
}

export default Book;
