import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import _ from "lodash";

class Search extends Component {
  state = {
    query: "",
    books: [],
  };

  clearWhitespace = (inputText) => {
    let clearedText = inputText.replace(/^\s+/, "");
    this.setState({ query: clearedText });
  };

  handleChange = (e) => {
    let searchValue = e.target.value;
    this.clearWhitespace(searchValue);
    if (searchValue) {
      this.setState({ query: searchValue });
      BooksAPI.search(searchValue).then((res) => {
        if (res.error) {
          return this.setState({
            books: [],
          });
        } else if (res) {
          console.log(res);
          const books = res;
          this.setState({
            books: books,
          });
        }
      });
    }
  };

  render() {
    const { onChangeBookShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
            <input
              type="text"
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {_.isEmpty(this.state.books) ? (
              <li>Sorry, No Books found!</li>
            ) : (
              this.state.books.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    category="None"
                    onChangeBookShelf={onChangeBookShelf}
                  />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
