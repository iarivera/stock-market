import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'November' //Default Month
  };

  componentDidMount() {
    console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data
    this.renderChart();
  }

  componentDidUpdate() {
    console.log(this.props.csv_data)
  }

  renderChart = () => {
    //const parseDate = d3.timeParse('%Y-%m-%d');
    const csv_data = this.props.csv_data.map(d => {
      d.Date = new Date(d.Date)
      return d;
    })
    console.log(csv_data)

    const margin = { top: 50, right: 80, bottom: 60, left: 90},
      width = 750,
      height = 450,
      innerWidth = 750 - margin.left - margin.right,
      innerHeight = 450 - margin.top - margin.bottom;

    const svg = d3.select('#stocks').attr('width', width).attr('height', height).select('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime().domain(d3.extent(this.props.csv_data, d => d.Date)).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([d3.min(this.props.csv_data, d => d.Low), d3.max(this.props.csv_data, d => d.High)]).range([innerHeight, 0]);

    var highLineGenerator = d3.line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.High)).curve(d3.curveCardinal);

    var lowLineGenerator = d3.line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.Low)).curve(d3.curveCardinal);

    var highPathData = highLineGenerator(this.props.csv_data)
    var lowPathData = lowLineGenerator(this.props.csv_data)
    svg.selectAll("path").data([highPathData]).join('path').attr('d', myd => myd).attr('fill', 'none').attr('stroke', 'green');
    svg.append("path").data([lowPathData]).join('path').attr('d', myd => myd).attr('fill', 'none').attr('stroke', 'red');

    svg.selectAll('.x_axis').data([null]) .join('g').attr('class', 'x_axis').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));
    
    svg.selectAll('.y_axis').data([null]).join('g').attr('class', 'y_axis').call(d3.axisRight(yScale).tickFormat(d => isNaN(d) ? "" : `$${d.toFixed(2)}`));
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
          Month:
          <select name="monthSelect">
            <option>{months[0]}</option>
            <option>{months[1]}</option>
            <option>{months[2]}</option>
            <option>{months[3]}</option>
            <option>{months[4]}</option>
            <option>{months[5]}</option>
            <option>{months[6]}</option>
            <option>{months[7]}</option>
            <option>{months[8]}</option>
            <option>{months[9]}</option>
            <option selected>{months[10]}</option>
            <option>{months[11]}</option>
          </select>
        </div>
        <svg id="stocks" width="950" height="550"><g transform="translate(300, 110)"></g></svg>
      </div>
    );
  }
}

export default Child1;
