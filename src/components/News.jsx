import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    console.log("cdm");
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=f46b05484f864cc7b32735bbe76de782&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      loading:false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handlePrevClick = async () => {
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f46b05484f864cc7b32735bbe76de782&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      loading:false,
      articles: parsedData.articles,
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f46b05484f864cc7b32735bbe76de782&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      loading:false,
      articles: parsedData.articles,
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };


  render() {
    console.log("render");
    return (
      <div className="container my-3 mx-auto">
        <h2 className="text-3xl font-semibold my-3 text-center">
          newsWIRE - Top Headlines
        </h2>
        {this.state.loading && <Spinner/>}
        <div className="grid grid-cols-4 mt-6 gap-7">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title ? element.title.slice(0, 45) : ""}
                description={
                  element.description ? element.description.slice(0, 90) : ""
                }
                imageURL={
                  element.urlToImage
                    ? element.urlToImage
                    : "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"
                }
                newsUrl={element.url}
              />
            );
          })}
        </div>
        <div className="container flex justify-between mt-6">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white ${this.state.page <= 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-black  hover:bg-black/80'}`}
            onClick={this.handlePrevClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white ${this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? 'bg-gray-700 cursor-not-allowed ' : 'bg-black hover:bg-black/80'}`}
            onClick={this.handleNextClick}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default News;
