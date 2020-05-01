d3.json("../samples.json").then((importData)=>{
            //  Create the Trace 
    console.log(importData);
    let data = importData;
    let samples = data.samples;
    sample_values = [];
    otu_ids = [];
    otu_labels = [];
    let dataArray = samples.filter(sampleID => parseInt(sampleID.id)==940);
    sample_values.push(dataArray[0]["sample_values"]);
    otu_ids.push(dataArray[0]["otu_ids"]);
    otu_labels.push(dataArray[0]["otu_labels"]);

    let toptenValues = sample_values[0].slice(0,10).reverse();
    let toptenotuids = otu_ids[0].slice(0,10).reverse();
    let topotulabels = otu_labels[0].slice(0,10).reverse();
    console.log(toptenotuids,topotulabels,toptenValues);

    let bartrace = {
        x: toptenValues,
        y: toptenotuids,
        text: topotulabels,
        color: 'blue',
        type: "bar",
        orientation: 'h'
    };
    let bardata = [bartrace];

    let barlayout = {
        title:"Top 10 OTU",
        yaxis: {
            type: 'category'
        },
        margin: {
            l: 100,
            r:50,
            t:50,
            b:30
        }
    };
    Plotly.newPlot("bar",bardata,barlayout);
    
    let samples1 = data.samples;
    allsamplevalues = [];
    allotuid = [];
    allotulabels = [];
    let dataArray1 = samples1.filter(sampleID => parseInt(sampleID.id)==940);
    allsamplevalues.push(dataArray1[0]["sample_values"]);
    allotuid.push(dataArray1[0]["otu_ids"]);
    allotulabels.push(dataArray1[0]["otu_labels"]);

    let allsamplevalues1 = allsamplevalues[0].reverse();
    let allotuid1 = allotuid[0].reverse();
    let allotulabels1 = allotulabels[0].reverse();
    console.log(allsamplevalues1,allotuid1,allotulabels1);

    let bubbletrace = {
        x: allotuid1,
        y: allsamplevalues1,
        hover:allotulabels1,
        mode: 'markers',
        marker: {
            size: allsamplevalues1,
            color: allotuid1
        }
    };
    let bubbledata = [bubbletrace];
    let bubblelayout = {
        title: 'Marker Size',
        xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot('bubble',bubbledata,bubblelayout);
    function init(){
    
        let select =  d3.select("#selDataset");
        d3.json("../samples.json").then((dropdata)=>{
            let SampleName = dropdata.name
            SampleName.forEach((sample)=> {
                    select
                    .append("option")
                    .text(sample)
                    .property("value",sample);
                });
            const first_Sample = SampleName[0];
            buildCharts(first_Sample);
            buildMetaData(first_Sample);        
        });
        }
     function buildData(sample) {
         d3.json("../sample.json").then((data) => {
         let switchdata = data.metadata;
         let results = switchdata.filter(x => x.id == sample);
         let result = results[0] ;
         let sample_data = d3.select("sample-metadata");
         sample_data.html("");
         Object.defineProperties(result),forEach(function([key,value]){
             sample_data.append("h6").text(`$key:${value}`)
        });
        });
        }
    function newOption (newSample) {
        buildCharts(newSample);
        buildMetaData(newSample);
    }
     
     init();
});




