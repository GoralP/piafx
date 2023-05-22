import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {getmoveDate,changeScroller,addClicked,tableData} from "appRedux/actions/Exchange";
import isEqual from "lodash/isEqual";
var common_colors = require('../../../assets/theme-variable');
var theme = localStorage.getItem('theme');
var bgcolor = common_colors.default_back_color;
if(theme == 'coffee')
{
    anychart.theme(anychart.themes.coffee);
    bgcolor = common_colors.coffee_back_color;
}
function getNextBusinessDay(date) {
    // Copy date so don't affect original
    date = new Date(+date);
    // Add days until get not Sat or Sun
    do {
      date.setDate(date.getDate() + 1);
    } while (!(date.getDay() % 6))
    return date;
  }
class BubbleChartSE extends Component {
    constructor(props) {
        super(props);
    }
    state = {
      switchvalue: false,
      statedate: '',
      statevalue: '',
      visible : false,
      range1 : true,
      symbol : 0,
    }; 
    state = {
      inputValue: 1,
      symbol: 0,
      timerange : true,
      addvisible : false,
      annojson : '{}',
    };
    shouldComponentUpdate(nextProps) {
        if (nextProps.daily && !isEqual(nextProps.daily,this.props.daily)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        
        var title_date = '';
        var palette = anychart.palettes.defaultPalette;
        if(theme == 'coffee')
        {
          anychart.theme(anychart.themes.coffee);
          palette = anychart.palettes.coffee;
        }
        var textColor = "#CCCCCC";
        if(theme == 'light')
        {
            textColor = "#262626";
        }
        var newvar = <div></div>
        if(this.props.daily.length > 0 && this.props.weekly.length > 0 && this.props.monthly.length > 0){
            console.log('asplbubble',this.props.daily[0]);
          if(this.props.daily[0].length > 0 && this.props.weekly[0].length > 0 && this.props.monthly[0].length > 0){
            var daily = this.props.daily[0][0];
            var weekly = this.props.weekly[0][0];
            var monthly = this.props.monthly[0][0];
            // var title_date = daily['date'];
            var chart5 = anychart.bubble();
            chart5.title().useHtml(true);
            // chart5.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.daily[0][0]['date'])).toDateString()+'</h1>');
            chart5.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+new Date(this.props.daily[0][0]['date']).toDateString()+'</h1>');
            chart5.xAxis().title("Weekly seasonality % of uptrend");
            chart5.yAxis().title("Monthly seasonality % of uptrend");
            if(daily['value5'])
            {
                // console.log('asplasplaspl',daily['value5']);
                var Y5 = [{'x':weekly['value5'],'size':daily['value5'],'value':monthly['value5'],'key':'5Y'}];
                var dataSet5 = anychart.data.set(Y5);
                var mapping5 = dataSet5.mapAs({'x': 'weekly', 'value': 'monthly','size':'daily','key':'key'});
                var series5 = chart5.bubble(mapping5);
                series5.name('5Y');
                series5.clip(false);
                series5.fill(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red 0.1';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green 0.1';
                    }
                    else{return '#64b5f6 0.1'}
                })
                series5.stroke(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green';
                    }
                    else{return "#64b5f6"}
                })
            }
            if(daily['value10'])
            {
                var Y5 = [{'x':weekly['value10'],'size':daily['value10'],'value':monthly['value10'],'key':'10Y'}];
                var dataSet5 = anychart.data.set(Y5);
                var mapping5 = dataSet5.mapAs({'x': 'weekly', 'value': 'monthly','size':'daily','key':'key'});
                var series10 = chart5.bubble(mapping5);
                series10.name('10Y');
                series10.fill(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red 0.1';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green 0.1';
                    }
                    else{return '#1976d2 0.1'}
                })
                series10.stroke(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green';
                    }
                    else{return "#1976d2"}
                })
            }
            if(daily['value15'])
            {
                var Y5 = [{'x':weekly['value15'],'size':daily['value15'],'value':monthly['value15'],'key':'15Y'}];
                var dataSet5 = anychart.data.set(Y5);
                var mapping5 = dataSet5.mapAs({'x': 'weekly', 'value': 'monthly','size':'daily','key':'key'});
                var series15 = chart5.bubble(mapping5);
                series15.name('15Y');
                series15.fill(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red 0.1';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green 0.1';
                    }
                    else{return '#ef6c00 0.1'}
                })
                series15.stroke(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green';
                    }
                    else{return "#ef6c00"}
                })
            }
            if(daily['value20'])
            {
                var Y5 = [{'x':weekly['value20'],'size':daily['value20'],'value':monthly['value20'],'key':'20Y'}];
                var dataSet5 = anychart.data.set(Y5);
                var mapping5 = dataSet5.mapAs({'x': 'weekly', 'value': 'monthly','size':'daily','key':'key'});
                var series20 = chart5.bubble(mapping5);
                series20.name('20Y');
                series20.fill(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red 0.1';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green 0.1';
                    }
                    else{return '#B24C94 0.1'}
                })
                series20.stroke(function() {
                    if(this.value<=25 && this.x<=25)
                    {
                        return 'red';
                    }
                    else if(this.value>=75 && this.x>=75)
                    {
                        return 'green';
                    }
                    else{return "#B24C94"}
                })
            }
            chart5.background().fill("#FFFFFF 0");
            chart5.yScale().minimum(0);
            chart5.yScale().maximum(100);
            chart5.xScale().minimum(0);
            chart5.xScale().maximum(100);
            chart5.tooltip().titleFormat(function() {
                return  this.getData('key');
            });
            chart5.minBubbleSize("2%");
            chart5.maxBubbleSize("8%");
            chart5.tooltip().useHtml(true)
            chart5.tooltip().format(function() {
                return  "Daily Seas : "+this.getData('size') +"<br> Weekly Seas : "+this.getData('x') +"<br> Monthly Seas : " +this.getData('value');
            });
            
            newvar = <div className="">
            { 
                <AnyChart
                    width="100%"
                    height={400}
                    instance={chart5}
                    id="bubbleChart5"
                />
            }
            </div>
        }
        }
        return (
            <div style={{"width":"100%"}}>
            {(this.props.daily.length > 0 && this.props.weekly.length > 0 && this.props.monthly.length > 0 && this.props.daily[0].length > 0 && this.props.weekly[0].length > 0 && this.props.monthly[0].length > 0)?
              <div className="cust_bullet_chart cust_ecin_div cust-tab-font cust_price_chart">
              {newvar}
              </div>
              :<div className="nodata_div" align="center">
                    {theme=='light'?
                    <img alt="" src={require("assets/images/empty.png")} />
                    :<img alt="" src={require("assets/images/emptyWhite.png")} />}
                    <br />
                    <span className="nodata_title">No Data</span>
                </div>}
                {/* {Button} */}
            </div>
        );
      
    }
};

const mapStateToProps =  state => {
    
    return {
        daily: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'daily').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
        weekly: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'weekly').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
        monthly: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'monthly').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData})(BubbleChartSE);
