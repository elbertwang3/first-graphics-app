import * as d3 from "d3";
import annualTotals from "../_data/annual_totals";
console.log(annualTotals);

function createBarChart(el, fieldname) {
  const margin = { top: 20, right: 20, bottom: 20, left: 40 };
  const container = d3.select(el);
  const containerWidth = container.node().offsetWidth;
  const containerHeight = containerWidth * 0.66;
  const svg = container
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const chartWidth = containerWidth - margin.right - margin.left;
  const chartHeight = containerHeight - margin.top - margin.bottom;

  const xDomain = annualTotals.map(d => d.year);
  console.log(xDomain);

  const yDomain = [0, d3.max(annualTotals.map(d => d[fieldname]))];

  const xScale = d3
    .scaleBand()
    .domain(xDomain)
    .range([0, chartWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([chartHeight, 0]);

  const xAxis = d3
    .axisBottom(xScale)
    .tickValues([2000, 2005, 2010, 2015, 2017]);
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-chartWidth)
    .ticks(4);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis);

  var tooltip = svg.append("text").attr("class", "chart-tooltip");

  svg
    .append("g")
    .attr("class", "bars")
    .selectAll(".bar")
    .data(annualTotals)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d[fieldname]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => chartHeight - yScale(d[fieldname]))
    .on("mouseenter", function(d) {
      // centers the text above each bar
      var x = xScale(d.year) + xScale.bandwidth() / 2;
      // the - 5 bumps up the text a bit so it's not directly over the bar
      var y = yScale(d[fieldname]) - 5;

      tooltip.text(d[fieldname]).attr("transform", `translate(${x}, ${y})`);
    })
    .on("mouseleave", function(d) {
      tooltip.text("");
    });
}

export default createBarChart;
