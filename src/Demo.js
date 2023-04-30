import { Component } from "react";

import "./App.css";

class Demo extends Component {
  constructor() {
    super();

    this.state = {
      name: { firstName: "Rupak", lastName: "Lama" },
      company: "KPS",
    };
  }

  render() {
    const {
      name: { firstName, lastName },
      company,
    } = this.state;

    return (
      <div className="App">
        <h1>Monsters App with Class Components</h1>
        <p>
          {firstName} {lastName} works at {company}
        </p>

        <button
          onClick={() => {
            // this.setState({ name: { firstName: "Indira", lastName: "Rai" } });
            this.setState(
              (state, props) => {
                // first func is to update state where we have access to current state & props
                return { name: { firstName: "Indira", lastName: "Rai" } };
              },
              () => {
                // second func is to execute anything after state updates
                console.log(this.state);
              }
            );
          }}
        >
          Change Name
        </button>
      </div>
    );
  }
}

export default Demo;
