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

class SeasonalityM extends PureComponent {
    render() {
        
        var theme = localStorage.getItem('theme');
        var palette = anychart.palettes.defaultPalette;
        if(theme == 'coffee')
        {
          anychart.theme(anychart.themes.coffee);
          palette = anychart.palettes.coffee;
        }
        var newvar = <div></div>
        if(this.props.cycleM.length > 0){
            if(this.props.cycleM[0].length > 0){
                var chartAI = anychart.line();
                chartAI.legend(true);
                chartAI.yScale().minimum(0);
                chartAI.yScale().maximum(100);
                var cycleData = this.props.cycleM[0];    
                var msftDataTable = anychart.data.table('date');
                var msftDataTable1 = anychart.data.table();
                chartAI.palette(palette);
                chartAI.background().fill("#ffffff 0");
        
                // var tooltip = chartAI.tooltip();
                // tooltip.displayMode("union");
                // tooltip.positionMode("chart");
                // tooltip.anchor("right-top");
                // tooltip.position("right-top");
                // tooltip.enabled(true);
                var j = 0;
                cycleData.filter(row => row.background =='positive' ).map((row, key) =>{
                    var value = row.date;
                    // var key = index;
                    chartAI.rangeMarker(j).to(value);
                    chartAI.rangeMarker(j).from(value);
                    chartAI.rangeMarker(j).fill("#004a00");
                    chartAI.rangeMarker(j).axis(chartAI.xAxis());
                    j = j + 1;
                });
                cycleData.filter(row => row.background =='negative' ).map((row, key) =>{
                    var value = row.date;
                    // var key = index;
                    chartAI.rangeMarker(j).to(value);
                    chartAI.rangeMarker(j).from(value);
                    chartAI.rangeMarker(j).fill("#920000");
                    chartAI.rangeMarker(j).axis(chartAI.xAxis());
                    j = j + 1;
                })
                var zeroLine = chartAI.lineMarker();
                zeroLine.value(0);
                zeroLine.stroke("0.5 grey");
                // chartAI.background().fill('#6e6e6e 0.1')
                chartAI.xGrid().enabled(true);  
                chartAI.xGrid().stroke({color: "black 0.5"});
                chartAI.xGrid().palette([null, "black 0.1"]);
                chartAI.yAxis().labels().format(function() {
                    return this.value + "%";
                });
                var dataSet1 = anychart.data.set(cycleData);
                var seriesCycle5 = chartAI.marker(dataSet1.mapAs({'x': 'date', 'value': 'value5','background':'background'}));
                seriesCycle5.name('5Y');
                seriesCycle5.normal().stroke("#64b5f6");
                seriesCycle5.normal().fill("#64b5f6");
                seriesCycle5.normal().type("circle");
                seriesCycle5.normal().size(3);
                seriesCycle5.zIndex(100);
                var seriesCycle10 = chartAI.marker(dataSet1.mapAs({'x': 'date', 'value': 'value10'}));
                seriesCycle10.name('10Y');
                seriesCycle10.normal().stroke("#1976d2","round");
                seriesCycle10.normal().fill("#1976d2");
                seriesCycle10.normal().type("circle");
                seriesCycle10.normal().size(3);
                seriesCycle10.zIndex(100);
                var seriesCycle15 = chartAI.marker(dataSet1.mapAs({'x': 'date', 'value': 'value15'}));
                seriesCycle15.name('15Y');
                seriesCycle15.normal().stroke("#ef6c00","round");
                seriesCycle15.normal().fill("#ef6c00");
                seriesCycle15.normal().type("circle");
                seriesCycle15.normal().size(3);
                seriesCycle15.zIndex(100);
                var seriesCycle20 = chartAI.marker(dataSet1.mapAs({'x': 'date', 'value': 'value20'}));
                seriesCycle20.name('20Y');
                seriesCycle20.normal().stroke('#B24C94',"round");
                seriesCycle20.normal().fill('#B24C94');
                seriesCycle20.normal().type("circle");
                seriesCycle20.normal().size(3);
                seriesCycle20.zIndex(100);
                newvar = <div className={"cust_price_chart"}>
                    <AnyChart
                        id={"CyclechartM"}
                        width="100%"
                        height={300}
                        instance={chartAI}
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
        cycleM: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'cycleM').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(SeasonalityM);
