import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
    };
  }
  async componentDidMount(){
    console.log("cdm");
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=f46b05484f864cc7b32735bbe76de782";
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles});
  }
  render() {
    console.log("render");
    return (
      <div className="container my-3 mx-auto">
        <h2 className="text-xl font-semibold my-3 text-center">
          newsWIRE - Top Headlines
        </h2>
        <div className="grid grid-cols-4 mt-6 gap-7">
          {this.state.articles.map((element) => {
            return (
              <NewsItem
                key={element.url}
                title={element.title?element.title.slice(0,45):""}
                description={element.description?element.description.slice(0,90):""}
                imageURL={element.urlToImage?element.urlToImage: "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"}
                newsUrl={element.url}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
