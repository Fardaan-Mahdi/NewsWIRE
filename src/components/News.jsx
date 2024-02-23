import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize: 12,
    category: 'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews(){
    console.log(this.state.page);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f46b05484f864cc7b32735bbe76de782&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      loading:false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }


  async componentDidMount() {
    this.updateNews();
  }


  handlePrevClick = async () => {
    await this.setState((prevState) => ({
      page: prevState.page - 1
    }));
    this.updateNews();
  };

  handleNextClick = async () => {
    await this.setState((prevState) => ({
      page: prevState.page + 1
    }));
    this.updateNews();
  };


  render() {
    return (
      <div className="container my-3 mx-auto">
        <h2 className="text-3xl font-semibold py-4 text-center">
          newsWIRE - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
        </h2>
        {this.state.loading && <Spinner/>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 w-full mx-auto px-3 gap-7">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title ? element.title.slice(0, 75) : ""}
                description={
                  element.description ? element.description.slice(0, 90) : ""
                }
                imageURL={
                  element.urlToImage
                    ? element.urlToImage
                    : "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"
                }
                newsUrl={element.url}
                author={element.author ? element.author : "Unknown"}
                date={element.publishedAt}
                source={element.source.name}
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
