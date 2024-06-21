
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
let metadata = data["metadata"];
    // Filter the metadata for the object with the desired sample number
let result = metadata.filter(sampleObj => sampleObj.id == sample)[0];
    // Use d3 to select the panel with id of `#sample-metadata`
let panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
panel.html("");
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
Object.entries(result).forEach(([key, value]) => { panel.append("h6").text(`${key.toUpperCase()}: ${value}`); }); });}
// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the samples field
let samples = data["samples"];
    // Filter the samples for the object with the desired sample number
let result = samples.filter(sampleObj => sampleObj.id == sample)[0];
    // Get the otu_ids, otu_labels, and sample_values
let otu_ids = result.otu_ids;
let otu_labels = result.otu_labels;
let sample_values = result.sample_values;
    // Build a Bubble Chart
let bubbleLayout = {
                     title: "Bacteria Cultures Per Sample",
                     margin: { t: 0 },
                     hovermode: "closest",
                     xaxis: { title: "OTU ID" },
                     margin: { t: 30 } };
let bubbleData = [ {
                    x: otu_ids,
                    y: sample_values,
                    text: otu_labels,
                    mode: "markers",
                    marker: {
                             size: sample_values,
                             color: otu_ids,
                             colorscale: "Earth" }}];
    // Render the Bubble Chart
Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // Build a Bar Chart
let barData = [ {
                  y: yticks,
                  x: sample_values.slice(0, 10).reverse(),
                  text: otu_labels.slice(0, 10).reverse(),
                  type: "bar",
                  orientation: "h"}];
let barLayout = {
                 title: "Top 10 Bacteria Cultures Found",
                 margin: { t: 30, l: 150 }};
    // Render the Bar Chart
Plotly.newPlot("bar", barData, barLayout);});}
// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // Get the names field
let names = data["names"];
    
    // Use d3 to select the dropdown with id of `#selDataset`
let dropdown = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
for (let i = 0; i < names.length; i++) { dropdown.append("option").text(names[i]).property("value", names[i]);}
    // Get the first sample from the list
let first = names[0];
    // Build charts and metadata panel with the first sample
buildCharts(first);
buildMetadata(first); });}
// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
console.log(newSample);
buildCharts(newSample);
buildMetadata(newSample);}
// Initialize the dashboard
init()









