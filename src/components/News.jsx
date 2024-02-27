import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
    apiKey: "b3a3a122c86a41c689b616a89ddcefae",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    search: PropTypes.bool,
    searchQuery: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      searchQuery: "",
      totalResults: 0,
    };
    document.title = `${
      this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    } - NewsWIRE`;
  }

  async updateNews() {
    this.props.setProgress(25);
    let url;
    if (this.props.searchQuery.trim() !== "") {
      url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page}`;
    }

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json();
    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if ((prevProps.searchQuery !== this.props.searchQuery)) {
      await this.updateNews();
    }
  }
  
  fetchMoreData = async () => {
    await this.setState((prevState) => ({ page: prevState.page + 1 }), () => { // Updated page value
      let url;
      if (this.props.searchQuery.trim() !== "") {
        url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page}`;
      }
      fetch(url)
        .then((response) => response.json())
        .then((parsedData) => {
          this.setState((prevState) => ({
            articles: [...prevState.articles, ...parsedData.articles],
            totalResults: parsedData.totalResults,
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  };
  

  render() {
    return (
      <div className="container my-3 mx-auto">
        {this.props.searchQuery.trim() == "" ? (
          <h2 className="text-2xl font-semibold mt-4 mb-10 py-2 rounded-md text-center bg-black text-white ">
            NewsWIRE -{" "}
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1)}
          </h2>
        ) : (
          <h2></h2>
        )}

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 w-full mx-auto px-3 gap-7">
            {this.state.articles.map((element) => {
              return (
                <NewsItem
                  key={element.url}
                  title={element.title ? element.title.slice(0, 70) : ""}
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
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;