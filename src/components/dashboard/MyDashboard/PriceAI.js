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

class PriceAI extends PureComponent {
    render() {
        var theme = localStorage.getItem('theme');
        // console.log('asplt',theme);
        if(theme == 'coffee')
        {
            anychart.theme(anychart.themes.coffee);
        }
        var chartAI = anychart.stock();
        var newvar = <div></div>
        if(this.props.priceAI.length > 0){
            if(this.props.priceAI[0].length > 0){
                var priceData = this.props.priceAI[0];       
                var msftDataTable = anychart.data.table('date');
                // var priceDataArray = [];
                // priceData.forEach(element => {
                //     var value = element.value;
                //     priceDataArray.push({'date':element.date,'value':Math.round(value*100)/100});
                // }); 
                msftDataTable.addData(priceData);
                    
                chartAI.interactivity("by-x");
                // if(theme == 'default')
                // {
                //     console.log('aspldefault');
                chartAI.background().fill("#FFFFFF 0");
                // }
                chartAI.scroller().maxHeight(20);
                chartAI.scroller().orientation("top");
                chartAI.contextMenu(true);
                
                // var tooltip = chartAI.tooltip();
                // tooltip.displayMode("union");
                // tooltip.positionMode("chart");
                // tooltip.anchor("right-top");
                // tooltip.position("right-top");
                // tooltip.enabled(false);

                var firstPlot = chartAI.plot(0);
                firstPlot.xAxis().labels(false);
                firstPlot.xAxis().labels().enabled(false);
                // var zeroLine = firstPlot.lineMarker();
                // zeroLine.value(0);
                // zeroLine.stroke("0.5 grey");
                firstPlot.yAxis().labels().format(function() {
                    return this.value + "%";
                });
                // firstPlot.baseline(50);
                firstPlot.yScale().minimum(0);
                firstPlot.yScale().maximum(100);
                if(priceData[0]['value5'])
                {
                var mapping5 = msftDataTable.mapAs({'value': 'value5'});
                var series5 = firstPlot.line(mapping5)
                series5.stroke('#64b5f6');
                series5.name('5Y');
                }
                if(priceData[0]['value10'])
                {
                var mapping10 = msftDataTable.mapAs({'value': 'value10'});
                var series10 = firstPlot.line(mapping10)
                series10.stroke('#1976d2');
                series10.name('10Y');
                }
                if(priceData[0]['value15'])
                {
                var mapping15 = msftDataTable.mapAs({'value': 'value15'});
                var series15 = firstPlot.line(mapping15)
                series15.stroke('#ef6c00');
                series15.name('15Y');
                }
                if(priceData[0]['value20'])
                {
                var mapping20 = msftDataTable.mapAs({'value': 'value20'});
                var series20 = firstPlot.line(mapping20)
                series20.stroke('#B24C94');
                series20.name('20Y');
                }
                if(priceData[0]['wAverage'])
                {
                    var mapping = msftDataTable.mapAs({'value': 'wAverage'});
                    var series = firstPlot.line(mapping)
                    series.name('Average');
                    series.stroke('#455a62');
                    var zeroLine = firstPlot.lineMarker();
                    zeroLine.value(60);
                    zeroLine.stroke("1.5 grey");
                    var zeroLine1 = firstPlot.lineMarker(1);
                    zeroLine1.value(40);
                    zeroLine1.stroke("1.5 grey");
                    series.stroke(function(){
                    if(this.value>=60)
                    {
                        return {'color':'green','thickness':'2'};
                    }
                    else if(this.value<=40)
                    {
                        return {'color':'red','thickness':'2'};
                    }
                    else{
                        return {'color':this.sourceColor,'thickness':'2'};
                    }
                    });
                }
                newvar = <div className={"cust_price_chart"}>
                    <AnyChart
                        id={"PriceAI"}
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
                {(this.props.priceAI.length > 0 && this.props.priceAI[0].length > 0)?
                    newvar
                    :
                    <div className="nodata_div" align="center">
                        {theme=='light'?
                        <img alt="" src={require("assets/images/empty.png")} />
                        :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                        <br />
                        <span className="nodata_title">No Data</span>
                    </div>
                }
            </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        priceAI: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'priceAI').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(PriceAI);
