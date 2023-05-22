import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import isEqual from "lodash/isEqual";
function getNextBusinessDay(date) {
    // Copy date so don't affect original
    date = new Date(+date);
    // Add days until get not Sat or Sun
    do {
        date.setDate(date.getDate() + 1);
    } while (!(date.getDay() % 6))
    return date;
}

class TopMLForecast extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.forecast && !isEqual(nextProps.forecast,this.props.forecast)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        var forecastData = [];
        var title_date = '';
        var theme = localStorage.getItem('theme');
        if(theme == 'coffee')
        {
            anychart.theme(anychart.themes.coffee);
        }
        var textColor = "#CCCCCC";
        var chartColors= 
            {
              group0 : "#61aeee",
              group1 : "#2f96e9",
              group2 : "#167cd0",
              group3 : "#0f538a",
              group4 : "#072945"
            }
        if(theme == 'light')
        {
            textColor = "#262626";
            chartColors= 
            {
              group0 : "#61aeee",
              group1 : "#2f96e9",
              group2 : "#167cd0",
              group3 : "#0f538a",
              group4 : "#072945"
            }
        }
        var chartAI = anychart.stock();
        // console.log('asplmlbestforecast',this.props.bestforecast);
        var newvar = <div></div>
        if(this.props.forecast.length > 0){
            if(this.props.forecast[0] && Object.keys(this.props.forecast[0]).length !== 0 ){
                // var stage = anychart.graphics.create('MLForecast');
                title_date = this.props.forecast[0].date;
                var forecastData = this.props.forecast[0];
                // var msftDataTable = anychart.data.table('date');
                // var priceDataArray = [];
                // console.log('asplmlforecast11',priceData);
                // priceData.forEach(element => {
                //     var value = element.value;
                //     priceDataArray.push({'date':element.date,'value':Math.round(value*100)/100});
                // }); 
                // msftDataTable.addData(priceData);
                    
                chartAI.interactivity("by-x");
                // if(theme == 'default')
                // {
                //     console.log('aspldefault');
                chartAI.background().fill("#FFFFFF 0");
                // }
                chartAI.scroller().maxHeight(20);
                chartAI.scroller().orientation("bottom");
                chartAI.scroller().enabled(false);
                chartAI.scroller().xAxis(false);
                chartAI.contextMenu(true);
                
                var tooltip = chartAI.tooltip();
                tooltip.displayMode("union");
                tooltip.positionMode("chart");
                tooltip.anchor("right-top");
                tooltip.position("right-top");
                tooltip.enabled(false);

                var firstPlot = chartAI.plot(0);
                firstPlot.xAxis().labels(false);
                firstPlot.xAxis().labels().enabled(false);
                firstPlot.yAxis().orientation("right");
                var zeroLine = firstPlot.lineMarker();
                zeroLine.value(0);
                zeroLine.stroke("0.5 grey");
                // if(priceData[0]['value5'])
                // {
                if(forecastData.tickers.length > 0){
                    // if(this.props.bestforecast[0].length > 0){
                        firstPlot.title().useHtml(true);
                        forecastData.tickers.forEach((element,index) => {
                            var msftDataTable = anychart.data.table('date');
                            msftDataTable.addData(element.data);
                            var mapping5 = msftDataTable.mapAs({'value': String(element.model) });
                            var series5 = firstPlot.line(mapping5)
                            series5.name(String(element.ticker_code));
                            series5.stroke('2 '+chartColors['group'+index]);
                            // subtitle += String(element)+' '+pos_values[index]+'% ';
                            // var indPiv = firstPlot.priceIndicator(index, {'series': series5, valueField: 'value', value:'last-visible', stroke:'none'});
                            // firstPlot.priceIndicator(index).label().format(modal_values[index]?modal_values[index]:'');
                            firstPlot.yAxis().labels().format(function() {
                                return this.value + "%";
                            });
                            
                            
                        })
                        
                        firstPlot.title().useHtml(true);
                        // firstPlot.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.bestforecast[0][0]['date_created'])).toDateString()+'</h1><br/><h1 style="color:'+textColor +';font-size:16px">'+subtitle+'</h1>');
                        // firstPlot.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.bestforecast[0][0]['date_created'])).toDateString()+'</h1>');
                    // }
                }
                newvar = <div align="center" className={"cust_price_chart SE MLForecast"}>
                    <AnyChart
                        id={"MLForecast"}
                        width="100%"
                        height={450}
                        instance={chartAI}
                        style = {{"marginLeft":"0px"}}
                    />
                </div>
            }
        }   
        
        return (
          <div style={{"width":"100%"}} className="cust_bullet_chart cust_ecin_div cust-tab-font ">
            <span className="cust_desciption cust-hass-font">Top ML Forecast on day {title_date}</span>
            <div className="cust_price_chart">
              {newvar}
            </div>
          </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        // mlsma: state.Exchange.mlsma,
        // forecast: Object.keys(state.Exchange.priceData).filter(priceDataIndex =>    priceDataIndex == 'forecast').map((priceDataIndex)=>{
        //     return state.Exchange.priceData[priceDataIndex];
        // }),
        // bestforecast: Object.keys(state.Exchange.priceData).filter(priceDataIndex =>    priceDataIndex == 'bestforecast').map((priceDataIndex)=>{
        //     return state.Exchange.priceData[priceDataIndex];
        // }),
        forecast: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'top_forecast').map((priceDataIndex)=>{
          return state.Exchange.getoimovers[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(TopMLForecast);
