import React, {Component} from "react";
import {Table} from "antd";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {Col} from "antd";
import isEqual from "lodash/isEqual";
const forecastColumns = [
    {
      title: 'Model',
      dataIndex: 'key',
      align: 'center',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        align: 'center',
    },
    {
        title: 'Success Rate',
        dataIndex: 'success',
        align: 'center',
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      render: (text,record) => {
        if(text === 'up')
        {
          //Green arrow here
          return <span><img alt="" src={require("assets/images/ArrowUp.png")} className="arrow_icons"/></span>
        }
        else
        {
          //Red arrow here
          return <span><img alt="" src={require("assets/images/ArrowDown.png")} className="arrow_icons"/></span>
        }
      },
    }
  ];
function getNextBusinessDay(date) {
    // Copy date so don't affect original
    date = new Date(+date);
    // Add days until get not Sat or Sun
    do {
        date.setDate(date.getDate() + 1);
    } while (!(date.getDay() % 6))
    return date;
}
function arraySearch(arr,val) {
    for (var i=0; i<arr.length; i++)
        if (arr[i] === val)                    
            return i;
    return false;
  }
class MLForecast extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.forecast && !isEqual(nextProps.forecast,this.props.forecast)) {
            return true;
        } else {
            return false;
        }
      }
    render() {
        var forecastData = [];
        var theme = localStorage.getItem('theme');
        if(theme == 'coffee')
        {
            anychart.theme(anychart.themes.coffee);
        }
        var textColor = "#CCCCCC";
        var group1 = "#00A170";
        var group2 = "#D2386C";
        var group3 = "#926AA6";
        var group4 = "#FDAC53";
        if(theme == 'light')
        {
            textColor = "#262626";
            group1 = "#004D36";
            group2 = "#912147";
            group3 = "#614370";
            group4 = "#FC8403";
        }
        var chartAI = anychart.stock();
        // console.log('asplmlforecast',this.props.forecast);
        // console.log('asplmlbestforecast',this.props.bestforecast);
        var newvar = <div></div>
        if(this.props.forecast.length > 0){
            if(this.props.forecast[0].length > 0){
                // var stage = anychart.graphics.create('MLForecast');
                var priceData = this.props.forecast[0];
                var msftDataTable = anychart.data.table('date');
                var priceDataArray = [];
                // console.log('asplmlforecast11',priceData);
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
                // chartAI.scroller().maxHeight(20);
                // chartAI.scroller().orientation("bottom");
                chartAI.scroller().enabled(false);
                // chartAI.scroller().xAxis(false);
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
                if(this.props.bestforecast.length > 0){
                    if(this.props.bestforecast[0].length > 0){
                        firstPlot.title().useHtml(true);
                        // firstPlot.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+new Date(this.props.bestforecast[0][0]['date']).toDateString()+'</h1>');
                        var models = JSON.parse(this.props.bestforecast[0][0]['popular_modals']);
                        var pos_values = JSON.parse(this.props.bestforecast[0][0]['pos_values']);
                        // var pos_values1 = JSON.parse(this.props.bestforecast[0][0]['pos_values']);
                        var modal_values = JSON.parse(this.props.bestforecast[0][0]['modal_values']);
                        // console.log('pos_values',pos_values);
                        // var points = pos_values;
                        // points.sort(function(a, b){return b-a});
                        // console.log('pos_values123',points);
                        // console.log('pos_values123456',pos_values1);
                        var subtitle = "Success Rate:";
                        
                        // models.forEach((element,index) => {
                        //     priceData[]
                        // })
                        models.forEach((element,index) => {
                            // console.log('asplasplasplaspl',String(element));
                            var mapping5 = msftDataTable.mapAs({'value': String(element) });
                            var series5 = firstPlot.line(mapping5)
                            series5.name(String(element));
                            subtitle += String(element)+' '+pos_values[index]+'% ';
                            var indPiv = firstPlot.priceIndicator(index, {'series': series5, valueField: 'value', value:'last-visible', stroke:'none'});
                            firstPlot.priceIndicator(index).label().format(modal_values[index]?modal_values[index]:'');
                            firstPlot.yAxis().labels().format(function() {
                                return this.value + "%";
                            });
                            // console.log('priceData[priceData.length-1]',priceData[priceData.length-1]);
                            forecastData.push({key:element,success:pos_values[index]+"%",trend:modal_values[index],score:priceData[priceData.length-1][String(element)].toFixed(2)+"%"})
                            // if(index == 0)
                            // {
                                // if(this.props.mlsma.status)
                                // {
                                //     var series = firstPlot.sma(mapping5, this.props.mlsma.value,'line');
                                //     series.series().stroke({'color':'#926AA6','dash':'2 2'});
                                //     // series.stroke({'dash':'2 2'});
                                // }
                            // }
                            if(element == 'arima' || element == 'arimar')
                            {
                                series5.stroke('2 '+group1);
                                firstPlot.priceIndicator(index).label({background: group1+" 0.7"});
                                if(this.props.mlsma.status)
                                {
                                    var series = firstPlot.sma(mapping5, this.props.mlsma.value,'line');
                                    series.series().stroke({'color':group1,'dash':'2 2'});
                                }
                            }
                            else if(element == 'dlm' || element == 'dlmr')
                            {
                                series5.stroke('2 '+group2);
                                firstPlot.priceIndicator(index).label({background: group2+" 0.7"});
                                if(this.props.mlsma.status)
                                {
                                    var series = firstPlot.sma(mapping5, this.props.mlsma.value,'line');
                                    series.series().stroke({'color':group2,'dash':'2 2'});
                                }
                            }
                            else if(element == 'xgb' || element == 'xgbr')
                            {
                                series5.stroke('2 '+group3);
                                firstPlot.priceIndicator(index).label({background: group3+" 0.7"});
                                if(this.props.mlsma.status)
                                {
                                    var series = firstPlot.sma(mapping5, this.props.mlsma.value,'line');
                                    series.series().stroke({'color':group3,'dash':'2 2'});
                                }
                            }
                            else if(element == 'lstm' || element == 'lstmr')
                            {
                                series5.stroke('2 '+group4);
                                firstPlot.priceIndicator(index).label({background: group4+" 0.7"});
                                if(this.props.mlsma.status)
                                {
                                    var series = firstPlot.sma(mapping5, this.props.mlsma.value,'line');
                                    series.series().stroke({'color':group4,'dash':'2 2'});
                                }
                            }
                            // console.log('points',pos_values1[index]);
                            // var key = arraySearch(points,pos_values1[index])
                            // console.log('points123',key);
                            // if(key == 0)
                            // {
                            //     firstPlot.priceIndicator(index).zIndex(999999999);
                            // }
                            // else if(key == 1)
                            // {
                            //     firstPlot.priceIndicator(index).zIndex(99999999);
                            // }
                            // else if(key == 2)
                            // {
                            //     firstPlot.priceIndicator(index).zIndex(9999999);
                            // }
                            // else if(key == 3)
                            // {
                            //     firstPlot.priceIndicator(index).zIndex(999999);
                            // }
                        })
                        
                        firstPlot.title().useHtml(true);
                        // firstPlot.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.bestforecast[0][0]['date_created'])).toDateString()+'</h1><br/><h1 style="color:'+textColor +';font-size:16px">'+subtitle+'</h1>');
                        firstPlot.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.bestforecast[0][0]['date_created'])).toDateString()+'</h1>');
                    }
                }
                // chartAI.listenOnce('chartDraw', function() {
                //     console.log("inside");
                //     // fix min/max to prevent auto-scaling
                //     var min = firstPlot.yScale().minimum();
                //     var max = firstPlot.yScale().maximum();
                //     var range = max - min;
                //     firstPlot.yScale().minimum(min);
                //     firstPlot.yScale().maximum(max);
                
                //     // get yAxis bounds
                //     var yAxisBounds = firstPlot.yAxis().getPixelBounds();
                
                //     // create scroller
                //     var scroller = anychart.standalones.scroller();
                //     scroller.orientation('left');
                
                //     // apply yAxis bounds to the scroller
                //     scroller.parentBounds(30, yAxisBounds.top, 80, yAxisBounds.height);
                //     scroller.container(stage).draw();
                
                //     // handle scroller change
                //     scroller.listen('scrollerChange', function(e) {
                //       // recalculate yScale min/max
                //       var calcMin = min + range * e.startRatio;
                //       var calcMax = min + range * e.endRatio;
                //       firstPlot.yScale().minimum(calcMin);
                //       firstPlot.yScale().maximum(calcMax);
                //     });
                //   });
                // }
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
                newvar = <div align="center" className={"cust_price_chart SE MLForecast"}>
                    <AnyChart
                        id={"MLForecast"}
                        width="100%"
                        height={450}
                        instance={chartAI}
                        style = {{"marginLeft":"0px"}}
                    />
                    <Table rowKey="table_forcast" className="gx-table-no-bordered cust_table_analyzer pattern " columns={forecastColumns} dataSource={forecastData} pagination={false} bordered={false}size="small" />
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
        // mlsma: state.Exchange.mlsma,
        forecast: Object.keys(state.Exchange.priceData).filter(priceDataIndex =>    priceDataIndex == 'forecast').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
        bestforecast: Object.keys(state.Exchange.priceData).filter(priceDataIndex =>    priceDataIndex == 'bestforecast').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(MLForecast);
