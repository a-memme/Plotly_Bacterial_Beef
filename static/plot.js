function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
      PANEL.append("h6").text(result.id);
      PANEL.append("h6").text(result.ethnicity);
      PANEL.append("h6").text(result.gender);
      PANEL.append("h6").text(result.age);
      PANEL.append("h6").text(result.location);
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  

    // 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {

      // 3. Create a variable that holds the samples array. 
      var samplesArray = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var filteredSamples = samplesArray.filter(object2 => object2.id == sample);
  
      //  5. Create a variable that holds the first sample in the array.
      var newResult = filteredSamples[0];

      console.log(newResult);
      console.log(newResult.otu_ids);

      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      // #2 variables are to account for the top 10 (bar chart data)
      // regular variables (without number) used for bubble chart
      var otuIds = newResult.otu_ids;
      
      var otuLabels = newResult.otu_labels;
      
      var sampleValues = newResult.sample_values;
      
      console.log(otuIds);

      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      var otuIds2 = newResult.otu_ids.slice(0,10).reverse().map(otuTop => "OTU" + otuTop);
      
      var otuLabels2 = newResult.otu_labels.slice(0,10).reverse();
      
      var sampleValues2 = newResult.sample_values.slice(0,10).reverse();

      console.log(otuIds2);

      // 8. Create the trace for the bar chart.
      
      var barData = [{
          x: sampleValues2, 
          y: otuIds2,
          text: otuLabels2, 
          type: "bar", 
          orientation: "h"
      }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
        title: "Top 10 OTUs", 
        xaxis: { title: "Sample Values"}, 
        yaxis: { title: "OTU IDs"}, 
        hovermode: "closest"
    };
    
      // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, { responsive: true });

    // 1. Create the trace for the bubble chart.
          var bubbleData = [{
              x: otuIds,
              y: sampleValues, 
              text: otuLabels,
              mode: 'markers', 
              marker: {
                  size: sampleValues,
                  sizeref: 0.04,
                  sizemode:'area',
                  color: otuIds, 
                  type: 'scatter'
              }
          }
        ];
    
    // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
            title: "Bacteria Culture Per Sample",
            xaxis: { title: "OTU ID" }, 
            hovermode: 'closest'
        };
    
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, { responsive: true });

    // Convert wfreq to floating point decimal
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
    washFreq = parseFloat(result.wfreq);
    
    console.log(washFreq);

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
        value: washFreq,
        type: 'indicator', 
        mode: 'gauge+number', 
        title: { text: "Belly Button Washing Frequency <br> Scrubs per week" },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1},  
            steps: [
                { range: [0, 2], color: "red" }, 
                { range: [2, 4], color: "orange" },
                { range: [4, 6], color: "yellow" },
                { range: [6, 8], color: "limegreen" },
                { range: [8, 10], color: "green" }
            ],
            bar: {color: "black"}
        }
    }  
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
         width: 500, 
         height: 500, 
         font: { color: "black", family: "Arial" }

    };
    
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout, { responsive: true });  
    
});
    
};
