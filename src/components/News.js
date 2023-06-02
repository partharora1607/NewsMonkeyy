import React, { Component } from "react";
import { NewsItems } from "./NewsItems";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from NewsItems");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4032fbba30824fd6823efefd77548568&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlenextclick = async () => {
    if (
      Math.ceil(this.state.totalResults / this.props.pageSize) <
      this.state.page + 1
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4032fbba30824fd6823efefd77548568&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles });
      this.setState({
        page: this.state.page + 1,
      });
    }
  };
  handlepreviousclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4032fbba30824fd6823efefd77548568&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page - 1,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headlines </h2>
        <div className="row my-4">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title.slice(0, 45)}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage ? element.urlToImage : ""}
                  newsUrl={element.url ? element.url : ""}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between my-4">
            <button
              disabled={this.state.page <= 1 ? true : false}
              className="btn btn-warning"
              onClick={this.handlepreviousclick}
            >
              &#8592; Previous
            </button>
            <button
              className="btn btn-warning"
              onClick={this.handlenextclick}
              disabled={
                Math.ceil(this.state.totalResults / this.props.pageSize) <
                this.state.page + 1
                  ? true
                  : false
              }
            >
              Next &#8594;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
