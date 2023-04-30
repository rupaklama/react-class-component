import React, { Component } from "react";

export default class SearchBox extends Component {
  render() {
    const { onChangeHandler, placeholder, className } = this.props;

    return (
      <div>
        <input type="search" placeholder={placeholder} onChange={onChangeHandler} className={className} />
      </div>
    );
  }
}
