import React, { useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export function News(props) {
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [searchQuery,setSearchQuery]=useState("");
  const [totalResults,setTotalResults]=useState("");
  console.log(props.searchQuery);
  useEffect(() => {
    document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsWIRE`;
  }, [props.category]);


  async function updateNews() {
    props.setProgress(15);
    let url;
    if (props.searchQuery.trim() !== "") {
      url = `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${page}`;
    }

    setLoading(true );
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
  },[]);

  useEffect(() => {
    if (searchQuery !== props.searchQuery) {
      setSearchQuery(props.searchQuery);
      updateNews();
    }
  }, [props.searchQuery]);
  
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      let url;
      if (props.searchQuery.trim() !== "") {
        url = `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${nextPage}`;
      }

      const response = await fetch(url);
      const parsedData = await response.json();
      
      setArticles([...articles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <div className="container my-3 mx-auto">
        {searchQuery.trim() == "" ? (
          <h2 className="text-3xl font-semibold my-4 py-3 rounded-md text-center text-black">
            NewsWIRE -{" "}
            {props.category.charAt(0).toUpperCase() +
              props.category.slice(1)}
          </h2>
        ) : (
          <h2 className="text-left text-base ml-3 font-semibold mt-3 rounded-md text-black">
            Search Results: {totalResults}
          </h2>
        )}


        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 w-full mx-auto px-3 gap-7">
            {articles.map((element) => {
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
                  author={element.author ? element.author.slice(0,20) : "Unknown"}
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

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  search: PropTypes.bool,
  searchQuery: PropTypes.string,
};

export default News;