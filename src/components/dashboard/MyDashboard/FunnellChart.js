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
const NUMBER_FORMAT = {
  scale: {
    'factors': [1e9, 1e6, 1e3, 1],
    'suffixes': ['B', 'M', 'K', '']
  },
  decimalsCount: 0
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
class FunnellChart extends Component {
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
      if (nextProps.funnell && !isEqual(nextProps.funnell,this.props.funnell)) {
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
        if(this.props.funnell.length > 0 && this.props.funnell[0].length > 0 );
          if(this.props.funnell[0][0]['funnell']){
            // create a data set
            var data = this.props.funnell[0][0]['funnell'];
            var chart = anychart.funnel(data);
            chart.tooltip(false);
            chart.legend(false);
            chart.background().fill("#FFFFFF 0");
            chart.labels().fontColor(textColor);
            chart.fill("#64b5f6 0.9");
            
            // set the container id
            chart.container("container");
            chart.title().useHtml(true);
            chart.title('<h1 style="color:'+textColor +';font-size:20px">Referring Date: '+getNextBusinessDay(new Date(this.props.funnell[0][0]['date'])).toDateString()+'</h1>');
            newvar = <div className="">
            { 
                <AnyChart
                    width="100%"
                    height={400}
                    instance={chart}
                    id="FunnellChart"
                />
            }
            </div>
        }
        
        return (
            <div style={{"width":"100%"}}>
              <div className="cust_bullet_chart cust_ecin_div cust-tab-font cust_price_chart">
              {newvar}
              </div>
                {/* {Button} */}
            </div>
        );
      
    }
};

const mapStateToProps =  state => {
    
    return {
        funnell: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'funnell').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        })
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData})(FunnellChart);
