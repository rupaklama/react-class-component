import React, { Component } from "react";

export default class CardList extends Component {
  render() {
    console.log("render from CardList");

    const { monsters } = this.props;

    return (
      <div>
        {monsters.map(monster => (
          <h2 key={monster.id}>{monster.name}</h2>
        ))}
      </div>
    );
  }
}
