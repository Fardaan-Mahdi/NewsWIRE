import React, { Component } from "react";

export class NewsItem extends Component {
  constructor() {
    super();
  }
  render() {
    let { title, description, imageURL, newsUrl, author, date,source } = this.props;
    return (
      <div className="relative rounded-md border">
        <span className="absolute top-0 -right-2 -translate-y-1/2 inline-flex items-center justify-center px-2.5 py-1.5 text-sm font-bold leading-none text-white transform bg-blue-950 rounded-full">
        {source}
        </span>

        <img
          src={imageURL}
          alt="Laptop"
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg h-20 font-semibold">{title}...</h1>
          <p className="mt-3 h-16 text-sm text-gray-900">{description}...</p>
          <p className="mt-3 text-xs text-gray-500">By: {author}</p>
          <p className="text-xs text-gray-500">
            Published: {new Date(date).toLocaleString()}
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <a href={newsUrl} target="_blank">
              Read More
            </a>
          </button>
        </div>
      </div>
    );
  }
}

export default NewsItem;
