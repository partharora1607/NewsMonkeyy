import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar" style={{ backgroundColor: "#497483" }}>
          <div
            className="container-fluid"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a className="navbar-brand" href="/" style={{ color: "white" }}>
              NewsMonkey - Let The Latest News Update From Here!!
            </a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            ></div>
          </div>
        </nav>
      </div>
    );
  }
}
