import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [],
      newData: [],
    };
  }
  componentWillMount() {
    fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
      .then(newResult => {
        this.setState({
          data: newResult.results,
          newData: newResult.results
        })
      })
      .catch(e => {
        console.log(e);

      }
      );
  }
  onHandler(event) {
    console.log(this.state.value)
    this.setState({ value: event.target.value })
    this.setState({ newData: this.state.data.filter(result => result.name.first.toLowerCase().includes(event.target.value.toLowerCase())) })

  }
  render() {
    return (
      <div className="App">
        <div className="ContactList">
          Contact 
        </div>
        <div className="FilterBar">
          <input type="text" onChange={(value) => this.onHandler(value)} value={this.state.value} placeholder="Find Your Friend"/>
        </div>
        <div>
          {this.state.newData == null ? "" : this.state.newData.map((result, index) =>
            <div className="Items" key={index}>
              <img src={result.picture.large} alt="person" />
              <div>
              <h2>{result.name.first} {result.name.last}</h2>
              <p>My Number: {result.phone}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

}

export default App;
