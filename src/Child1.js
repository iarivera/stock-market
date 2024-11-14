import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'November' //Default Month
  };

  componentDidMount() {
    console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data
  }

  componentDidUpdate() {
    console.log(this.props.csv_data)
  }

  render() {
    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    return (
      <div className="child1">
        <div className="radioButton">
          Company:
          <input type="radio" id={options[0]} name="options" autoComplete="off" checked></input><label for={options[0]}>{options[0]}</label>
          <input type="radio" id={options[1]} name="options"></input><label for={options[1]}>{options[1]}</label>
          <input type="radio" id={options[2]} name="options"></input><label for={options[2]}>{options[2]}</label>
          <input type="radio" id={options[3]} name="options"></input><label for={options[3]}>{options[3]}</label>
          <input type="radio" id={options[4]} name="options"></input><label for={options[4]}>{options[4]}</label>
        </div>
        <div className="dropDown">

        </div>
      </div>
    );
  }
}

export default Child1;
