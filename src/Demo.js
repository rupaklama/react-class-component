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
             // note: 'setState' method creates a new object as Shallow Copy in the memory with Object.assign({}, new obj)
            // This component will re-render since the state is a new object.
            
            // this.setState({ name: { firstName: "Indira", lastName: "Rai" } });
            this.setState(
              // note: The Shallow merge only updates the object keys with new values provided,
              // other properties values remain the same & still passed by reference.

              // NOTE: Updating the state with the Function is a good practice rather than assigning an Object.
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
