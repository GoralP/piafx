import React, {Component,PureComponent} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
const NUMBER_FORMAT = {
    scale: {
        'factors': [1e9, 1e6, 1e3, 1],
        'suffixes': ['B', 'M', 'K', '']
    },
    decimalsCount: 0
}

class SeasonalityW extends PureComponent {
    render() {
        
        var theme = localStorage.getItem('theme');
        var palette = anychart.palettes.defaultPalette;
        if(theme == 'coffee')
        {
          anychart.theme(anychart.themes.coffee);
          palette = anychart.palettes.coffee;
        }
        var newvar = <div></div>
        if(this.props.priceAI.length > 0){
            if(this.props.priceAI[0].length > 0){
                // var chart1= anychart.stock();
                // var chart2= anychart.stock();
                var chartAI = anychart.line(); 
                chartAI.legend(true);
                chartAI.yScale().minimum(0);
                chartAI.yScale().maximum(100);
                var chartAIM = anychart.line();
                chartAIM.legend(true);
                chartAIM.yScale().minimum(0);
                chartAIM.yScale().maximum(100);
                var priceData = this.props.priceAI[0];    
                var msftDataTable = anychart.data.table('date');
                var msftDataTable1 = anychart.data.table();
                var priceDataArray = [];
                // priceData.forEach(element => {
                //     var value = element.value;
                //     priceDataArray.push([element.date,value]);
                // });
                chartAIM.palette(palette);
                // msftDataTable.addData(priceData);
                // msftDataTable1.addData(cycleDataArray);
                    
                // chartAI.interactivity("by-x");
                // if(theme == 'default')
                // {
                //     console.log('aspldefault');
                chartAIM.background().fill("#FFFFFF 0");
                // }
                // chartAI.scroller().maxHeight(20);
                // chartAI.scroller().orientation("top");
                // chartAI.contextMenu(true);

                // var tooltip = chartAI.tooltip();
                // tooltip.displayMode("union");
                // tooltip.positionMode("chart");
                // tooltip.anchor("right-top");
                // tooltip.position("right-top");
                // tooltip.enabled(true);
                var j =0;
                priceData.filter(row => row.background =='positive' ).map((row, key) =>{
                    var value = row.date;
                    // var key = index;
                    chartAIM.rangeMarker(j).to(value);
                    chartAIM.rangeMarker(j).from(value);
                    chartAIM.rangeMarker(j).fill("#004a00");
                    chartAIM.rangeMarker(j).axis(chartAIM.xAxis());
                    j = j + 1;
                });
                priceData.filter(row => row.background =='negative' ).map((row, key) =>{
                    var value = row.date;
                    // var key = index;
                    chartAIM.rangeMarker(j).to(value);
                    chartAIM.rangeMarker(j).from(value);
                    chartAIM.rangeMarker(j).fill("#920000");
                    chartAIM.rangeMarker(j).axis(chartAIM.xAxis());
                    j = j + 1;
                })
                // cycleData.forEach((element,key) => {
                // if(element.background == 'positive'){
                //     var value = element.date;
                //     chartAI.rangeMarker(key).to(value);
                //     chartAI.rangeMarker(key).from(value);
                //     chartAI.rangeMarker(key).fill("#004a00");
                //     chartAI.rangeMarker(key).axis(chartAI.xAxis());
                // }
                // else if(element.background == 'negative'){
                //     var value = element.date;
                //     chartAI.rangeMarker(key).to(value);
                //     chartAI.rangeMarker(key).from(value);
                //     chartAI.rangeMarker(key).fill("#920000");
                //     chartAI.rangeMarker(key).axis(chartAI.xAxis());
                // }
                // });
                // priceData.forEach((element,key) => {
                //     if(element.background == 'positive'){
                //         var value = element.date;
                //         chartAIM.rangeMarker(key).to(value);
                //         chartAIM.rangeMarker(key).from(value);
                //         chartAIM.rangeMarker(key).fill("#004a00");
                //         chartAIM.rangeMarker(key).axis(chartAIM.xAxis());
                //     }
                //     else if(element.background == 'negative'){
                //         var value = element.date;
                //         chartAIM.rangeMarker(key).to(value);
                //         chartAIM.rangeMarker(key).from(value);
                //         chartAIM.rangeMarker(key).fill("#920000");
                //         chartAIM.rangeMarker(key).axis(chartAIM.xAxis());
                //     }
                // });
                // var firstPlot = chartAI.plot(0);
                // chartAI.xAxis().labels(false);
                // chartAI.xAxis().labels().enabled(false);
                var zeroLine = chartAI.lineMarker();
                zeroLine.value(0);
                zeroLine.stroke("0.5 grey");
                // var mapping = msftDataTable.mapAs({'value': 'value'});
                // var mappingCycle = msftDataTable1.mapAs({'x':'date','value': 'value'});
                // mapping.addField('value', 1);
                // chartAI.annotations().trendChannel({
                //     xAnchor: cycleData[0]['date'],
                //     valueAnchor: 100,
                //     secondXAnchor: cycleData[cycleData.length-1]['date'],
                //     secondValueAnchor: 100,
                //     thirdXAnchor: cycleData[cycleData.length-1]['date'],
                //     thirdValueAnchor: 75,
                //     stroke: 'green 0',
                //     fill: 'green 0.15',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAI.annotations().trendChannel({
                //     xAnchor: cycleData[0]['date'],
                //     valueAnchor: 75,
                //     secondXAnchor: cycleData[cycleData.length-1]['date'],
                //     secondValueAnchor: 75,
                //     thirdXAnchor: cycleData[cycleData.length-1]['date'],
                //     thirdValueAnchor: 60,
                //     stroke: 'green 0',
                //     fill: 'green 0.08',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAI.annotations().trendChannel({
                //     xAnchor: cycleData[0]['date'],
                //     valueAnchor: 40,
                //     secondXAnchor: cycleData[cycleData.length-1]['date'],
                //     secondValueAnchor: 40,
                //     thirdXAnchor: cycleData[cycleData.length-1]['date'],
                //     thirdValueAnchor: 25,
                //     stroke: 'red 0',
                //     fill: 'red 0.08',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAI.annotations().trendChannel({
                //     xAnchor: cycleData[0]['date'],
                //     valueAnchor: 25,
                //     secondXAnchor: cycleData[cycleData.length-1]['date'],
                //     secondValueAnchor: 25,
                //     thirdXAnchor: cycleData[cycleData.length-1]['date'],
                //     thirdValueAnchor: 0,
                //     stroke: 'red 0',
                //     fill: 'red 0.15',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAIM.annotations().trendChannel({
                //     xAnchor: priceData[0]['date'],
                //     valueAnchor: 100,
                //     secondXAnchor: priceData[priceData.length-1]['date'],
                //     secondValueAnchor: 100,
                //     thirdXAnchor: priceData[priceData.length-1]['date'],
                //     thirdValueAnchor: 75,
                //     stroke: 'green 0',
                //     fill: 'green 0.15',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAIM.annotations().trendChannel({
                //     xAnchor: priceData[0]['date'],
                //     valueAnchor: 75,
                //     secondXAnchor: priceData[priceData.length-1]['date'],
                //     secondValueAnchor: 75,
                //     thirdXAnchor: priceData[priceData.length-1]['date'],
                //     thirdValueAnchor: 60,
                //     stroke: 'green 0',
                //     fill: 'green 0.08',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAIM.annotations().trendChannel({
                //     xAnchor: priceData[0]['date'],
                //     valueAnchor: 40,
                //     secondXAnchor: priceData[priceData.length-1]['date'],
                //     secondValueAnchor: 40,
                //     thirdXAnchor: priceData[priceData.length-1]['date'],
                //     thirdValueAnchor: 25,
                //     stroke: 'red 0',
                //     fill: 'red 0.08',
                //     zIndex :0
                //   }).allowEdit(false);
                // chartAIM.annotations().trendChannel({
                //     xAnchor: priceData[0]['date'],
                //     valueAnchor: 25,
                //     secondXAnchor: priceData[priceData.length-1]['date'],
                //     secondValueAnchor: 25,
                //     thirdXAnchor: priceData[priceData.length-1]['date'],
                //     thirdValueAnchor: 0,
                //     stroke: 'red 0',
                //     fill: 'red 0.15',
                //     zIndex :0
                //   }).allowEdit(false);
                chartAIM.background().fill('#ffffff 0')
                chartAIM.xGrid().enabled(true);  
                chartAIM.xGrid().stroke({color: "black 0.5"});
                chartAIM.xGrid().palette([null, "black 0.1"]);
                chartAIM.yAxis().labels().format(function() {
                    return this.value + "%";
                });
                
                var dataSet = anychart.data.set(priceData);
                var series5 = chartAIM.marker(dataSet.mapAs({'x': 'date', 'value': 'value5'}))
                series5.name('5Y');
                series5.normal().stroke("#64b5f6");
                series5.normal().fill("#64b5f6");
                series5.normal().type("circle");
                series5.normal().size(3);
                series5.zIndex(10);
                var series10 = chartAIM.marker(dataSet.mapAs({'x': 'date', 'value': 'value10'}))
                series10.name('10Y');
                series10.normal().stroke("#1976d2","round");
                series10.normal().fill("#1976d2");
                series10.normal().type("circle");
                series10.normal().size(3);
                series5.zIndex(10);
                var series15 = chartAIM.marker(dataSet.mapAs({'x': 'date', 'value': 'value15'}))
                series15.name('15Y');
                series15.normal().stroke("#ef6c00","round");
                series15.normal().fill("#ef6c00");
                series15.normal().type("circle");
                series15.normal().size(3);
                series5.zIndex(10);
                var series20 = chartAIM.marker(dataSet.mapAs({'x': 'date', 'value': 'value20'}))
                series20.name('20Y');
                series20.normal().stroke('#B24C94',"round");
                series20.normal().fill('#B24C94');
                series20.normal().type("circle");
                series20.normal().size(3);
                series5.zIndex(10);
                // var extraXScale = anychart.scales.dateTime();
                // var extraYScale = anychart.scales.linear();
                // // sets y-scale
                // series.xScale(extraXScale);
                // series.yScale(extraYScale);
                // chartAI.xAxis(1).enabled(true);
                // // chartAI.xAxis(1).stroke("Black");
                // chartAI.xAxis(1).ticks().enabled(true);
                // // chartAI.xAxis(1).ticks().stroke("Black");
                // chartAI.xAxis(1).drawFirstLabel(false);
                // chartAI.xAxis(1).orientation("top");
                // chartAI.xAxis(1).scale(extraXScale);
                // chartAI.yAxis(1).scale(extraYScale);
                // chartAI.yAxis(1).orientation("right");
                // chartAI.yAxis(1).scale(extraXScale);
                newvar = <div className={"cust_price_chart"}>
                    <AnyChart
                        id={"CyclechartM"}
                        width="100%"
                        height={300}
                        instance={chartAIM}
                        style = {{"marginLeft":"0px"}}
                    />
                </div>
            }
        }   
        
        return (
            <div style={{"width":"100%"}}>
                {newvar}
            </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        priceAI: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'cycleW').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(SeasonalityW);
