import { Component } from "react";

import "./App.css";

import CardList from "./components/card-list/CardList";
import SearchBox from "./components/search-box/SearchBox";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchText: "",

      count: 1,
      user: null,

      windowWidth: window.innerWidth,
    };

    console.log("constructor");
  }

  getUser = id => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data =>
        this.setState(
          // first func is to update state where we have access to current state & props
          () => {
            return { user: data };
          },
          // second func is to execute anything after state updates
          () => {
            console.log(this.state);
          }
        )
      )
      .catch(err => console.log(err));
  };

  getWindowWidth = () => this.setState({ windowWidth: window.innerWidth });

  // useEffect(() => {}, [])
  // This method runs after initial component mounts, same as useEffect hook above
  componentDidMount() {
    console.log("componentDidMount");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data =>
        this.setState(
          // first func is to update state where we have access to current state & props
          () => {
            return { monsters: data };
          },
          // second func is to execute anything after state updates
          () => {
            console.log(this.state);
          }
        )
      )
      .catch(err => console.log(err));

    this.getUser(this.state.count);

    // call getWindowWidth on initial mount & whenever resize occurs
    window.addEventListener("resize", this.getWindowWidth);
  }

  // This will run anytime State & Props get UPDATED
  // [dependency] - similar to dependency array with value in useEffect hook,
  // useEffect hook will run when the value gets updated every time
  componentDidUpdate(prevProps, prevState) {
     console.log("componentDidUpdate has access to previous props & state ", prevProps, prevState);
    
    // now, we can make an api call depending on state update
    // Call api when count has changed
    if (prevState.count !== this.state.count) {
      this.getUser(this.state.count);
    }

    // note - On useEffect, it keeps track of the updated value automatically
    // but in Class component, we have to compare updated value manually
  }

  // This method runs on component unmount or when navigating to different component/page
  // cleanup method to avoid Memory Leak like in useEffect hook
  componentWillUnmount() {
    console.log("componentWillUnmount");

    // note - Very helpful on disconnecting any network subscriptions
    // or discontinue event listening on dom events, web sockets, database etc...
     window.removeEventListener("resize", this.getWindowWidth);
  }

  onSearchChange = e => this.setState({ searchText: e.target.value });

  onCountClick = () => this.setState({ count: this.state.count + 1 });

  render() {
    console.log("render");
    const { monsters, searchText, count, user, windowWidth } = this.state;
    const { onSearchChange, onCountClick } = this;

    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchText));

    return (
      <div>
        <h1>Monster App with Classes</h1>

        <h2>ComponentDidUpdate</h2>
        {user && user.name}
        <h2 style={{ color: "red" }}>Count: {count}</h2>
        <button onClick={onCountClick}>Add Count</button>

        <hr />
        <h2>ComponentWillUnmount</h2>
        {windowWidth}

        <hr />

        <SearchBox onChangeHandler={onSearchChange} placeholder={"search monsters"} className="search-box" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
