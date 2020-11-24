import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";
import { BrowserRouter as Router, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((receivedBooks) => {
      const currentlyReading = receivedBooks.filter(
        (book) => book.shelf === "currentlyReading"
      );
      // .map((book) => book.id);
      const wantToRead = receivedBooks.filter(
        (book) => book.shelf === "wantToRead"
      );
      // .map((book) => book.id);
      const read = receivedBooks.filter((book) => book.shelf === "read");
      // .map((book) => book.id);
      this.setState({
        currentlyReading,
        wantToRead,
        read,
      });
    });
  };

  updateBook = async (id, shelf) => {
    // const shelves =
    await BooksAPI.update(id, shelf);
    this.getBooks();
    // this.updateShelves(shelves);
  };

  // updateShelves = (newState) => {
  //   this.setState(newState);
  // };

  changeBookShelf = async (bookId, shelf) => {
    this.updateBook(bookId, shelf);
  };

  render() {
    BooksAPI.getAll().then((res) => console.log(res));
    return (
      <div className="app">
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                onChangeBookShelf={this.changeBookShelf}
              />
            )}
          />
          <Route
            path="/search"
            render={() => <Search onChangeBookShelf={this.changeBookShelf} />}
          />
        </Router>
      </div>
    );
  }
}

export default BooksApp;

/*
shelfs: [
      {
        id: 1,
        title: "Currently Reading",
        books: [
          {
            id: 1,
            imageUrl:
              "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
            title: "To Kill a Mockingbird",
            authors: ["Harper Lee", "Orson Scott Card"],
          },
          {
            id: 2,
            imageUrl:
              "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
            title: "Ender's Game",
            authors: ["Orson Scott Card"],
          },
        ],
      },
      {
        id: 2,
        title: "Want to Read",
        books: [
          {
            id: 3,
            imageUrl:
              "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
            title: "1776",
            authors: ["David McCullough"],
          },
          {
            id: 4,
            imageUrl:
              "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
            title: "Harry Potter and the Sorcerer's Stone",
            authors: ["J.K. Rowling"],
          },
        ],
      },
      {
        id: 3,
        title: "Read",
        books: [
          {
            id: 5,
            imageUrl:
              "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
            title: "The Hobbit",
            authors: ["J.R.R. Tolkien"],
          },
          {
            id: 6,
            imageUrl:
              "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
            title: "Oh, the Places You'll Go!",
            authors: ["Seuss"],
          },
          {
            id: 7,
            imageUrl:
              "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
            title: "The Adventures of Tom Sawyer",
            authors: ["Mark Twain"],
          },
        ],
      },
    ],
*/
