import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import {
  CirclePicker,
} from "react-color";
import {getmoveDate,changeScroller,addClicked,tableData,mekkoData,loaderstatus} from "appRedux/actions/Exchange";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {Popover, Switch ,Slider , Menu} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import moment from "moment";

class PriceChart extends Component {
  constructor(props) {
    super(props);
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  
}
state = {
  switchvalue: false,
  statedate: '',
  statevalue: '',
  visible : false,
  range1 : true,
  symbol : 0,
  highlight : false,
}; 
  onChangecrosshair(checked,date,chart)
    {
      if(checked)
      {
        chart.background().fill("#ffffff");
        var reqvar = { moveDate : date }
        this.props.getmoveDate(reqvar)
        this.setState({addvisible:true})
      } 
      else
      {
        chart.background().fill("#FFFFFF 0");
        this.setState({addvisible:false})
        var reqvar = { moveDate : '' }
        this.props.getmoveDate(reqvar)
        
      }
    }
    chartchange(series,value) {
        // series.seriesType(value);
        this.setState({
          series:value,
        });
    } 
    addPointer()
    {      
      var reqvar1 = { addClick : 'yes' }
        this.props.addClicked(reqvar1)
    }
    handleChange(event) {
      this.setState({ [event.target.name] : event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault(); 
      this.addPointer();
      this.setState(
        {
          visible: false,
        });
    }
    handleCancel = () => {
      var s= parseInt(this.state.symbol)-1;
      this.setState({
        symbol:s,
        visible: false,
      });
    };
    showModal = () => {
      var s= parseInt(this.state.symbol)+1;
      this.setState({
        symbol:s,
        visible: true,
      });
    };
    state = {
      mekkocall : true,
      mekkocall1 : true,
      inputValue: 1,
      symbol: 0,
      timerange : true,
      addvisible : false,
      gridstate : true,
      enddate: '',
      series:'candlestick',
      recessionstatus:false,
      recessionkey:'',
    };
    onChange = (value) => {
      this.setState({
        inputValue: value,
      });
    };
    handleChange1 = (color) => {
      this.setState({format: color.hex})
    };
    open1o1modal(){
      localStorage.setItem('cot',0);
      localStorage.setItem('ecin',0);
      this.setState({
        visible1o1: true 
      })
    }
    close1o1modal(){
      this.setState({
        visible1o1: false 
      })
    }
    gridonoff(firstPlot,status){
      this.setState({
        gridstate: status 
      })
    }
    sniper(enddate) {
      enddate = moment(enddate, 'YYYY/MM/DD').subtract(1, 'days')
      var reqvar = { moveDate : enddate }
      this.props.getmoveDate(reqvar)
    };
    highlight(status)
    {
      this.setState({
        highlight: status 
      });
    }
    createDrawing(plot,type,pricejson){
      plot.annotations().startDrawing(type);
      // this.setState({
        // pricejson: plot.annotations().toJson(), 
      // });
    }
    removeDrawing(plot,pricejson){
      plot.annotations().removeAllAnnotations();
      // this.setState({
      //   pricejson: '', 
      // });
    }
    removeChart(chart)
    {
      chart.dispose();
      chart = '';
      // var elements = document.getElementsByClassName("cust_price_chart");
      // while(elements.length > 0){
      //     elements[0].parentNode.removeChild(elements[0]);
      // }
    }
    showrecession(key,status)
    {
        this.setState({
          recessionstatus:status,
          recessionkey:key,
        })
    }
    
    render() {
        var verticalline_date = '';
        var ticker_name = '';
        var ticker_id = '';
        var eod_data = '';
        var cftc_market = '';  
        var enddate = '';
       
        if(this.props.tickerData[0])
        {
          
          ticker_name = this.props.tickerData[0][0]['ticker_name'];
          eod_data = this.props.tickerData[0][0]['eod_data'];
          cftc_market = this.props.tickerData[0][0]['cftc_market'];   
          ticker_id = this.props.tickerData[0][0]['_id'];    
        }   
        var newvar = <div></div>
        var Button = <div></div>
          if(this.props.priceData[0].length > 0){
            var priceData = this.props.priceData[0];   
            var length = priceData.length
            verticalline_date = priceData[length-1]['date']; 
            if(this.state.mekkocall1)
              {
              var cotreq = { id : ticker_id , date : verticalline_date}
              this.props.mekkoData(cotreq);
              this.setState({mekkocall1 : false});
            }      
            var msftDataTable = anychart.data.table('date');          
            msftDataTable.addData(priceData);
            var chart = anychart.stock();        
            chart.interactivity("by-x");
            chart.background().fill("#FFFFFF 0");
            
            chart.scroller().maxHeight(20);
            chart.scroller().orientation("top");
            chart.contextMenu(true);
            
            
            var rangeSelector = anychart.ui.rangeSelector();
            var rangePicker = anychart.ui.rangePicker();
            rangePicker.render(chart);
            rangeSelector.render(chart);
            
            chart.crosshair(true);
            
            var tooltip = chart.tooltip();
            tooltip.displayMode("union");
            tooltip.positionMode("chart");
            tooltip.anchor("right-top");
            tooltip.position("right-top");
            
            // define the grouping
            var grouping = chart.grouping();

            // set the levels of grouping
            grouping.levels([
            {unit: 'day', count: 1},
            {unit: 'week', count: 1},
            {unit: 'month', count: 1}
            ]);

            var firstPlot = chart.plot(0);
            firstPlot.height('89%');
            firstPlot.xAxis().labels(false);
            firstPlot.legend(false);
            // firstPlot.yAxis().labels().position("inside");
            firstPlot.xAxis().labels().enabled(false);
            var mapping = msftDataTable.mapAs({'open':'open', 'high': 'high', 'low': 'low', 'close': 'close'});
            mapping.addField('value', 1);
            
            var series = firstPlot.candlestick(msftDataTable.mapAs({'open':'open', 'high': 'high', 'low': 'low', 'close': 'close'}))
            series.name(ticker_name);     
            

            // var computedMapping = msftDataTable.mapAs({'value': 'openinterest'});
            // // create line series with mapping
            // var computedLine = firstPlot.line(computedMapping);
            // computedLine.name('Custom Indicator');
            // computedLine.stroke('#ffa000 0.6');
            // set max labels settings
            series.maxLabels()
              .enabled(true)
              .position('high')
              .fontWeight('bold')
              .fontColor('#6da632');

            // set min labels settings
            series.minLabels()
              .enabled(true)
              .position('low')
              .fontWeight('bold')
              .fontColor('#d81e05');


            series.risingStroke("#0F8718");
            series.risingFill("#15BE23");
            series.fallingStroke("#5C090B");
            series.fallingFill("#B20002");
            series.seriesType(this.state.series);
            if(this.state.highlight)
            {
              if(this.props.exitData[0].length>0)
              {
                // if(this.props.moveDate!='' && this.state.addvisible)
                // {
                //   console.log('asplwhite');
                //   var datesarray = this.props.exitData[0]; 
                  
                //   series.risingStroke(function() {
                //     console.log('asplwhite1');
                //     if (this.x) {
                //       var pointDate = new Date(this.x);
                //       var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                //       var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                //       if (datesarray.includes(pointDateString)) {
                //         //series.risingFill("#000");
                //         return '#000'
                //       }
                //     }
                //     return '#004600'
                //   });
                //   series.risingFill(function() {
                //     if (this.x) {
                //       var pointDate = new Date(this.x);
                //       var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                //       var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                //       if (datesarray.includes(pointDateString)) {
                //         //series.risingFill("#000");
                //         return '#000'
                //       }
                //     }
                //     return '#15BE23'
                //   });
                
                //   series.fallingStroke(function() {
                //     if (this.x) {
                //       var pointDate = new Date(this.x);
                //       var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                //       var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                //       if (datesarray.includes(pointDateString)) {
                //         //series.fallingFill("#000");
                //         return '#000'
                //       }
                //     }
                //     return '#2D0000'
                //   });
                //   series.fallingFill(function() {
                //     if (this.x) {
                //       var pointDate = new Date(this.x);
                //       var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                //       var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                //       if (datesarray.includes(pointDateString)) {
                //         //series.fallingFill("#000");
                //         return '#000'
                //       }
                //     }
                //     return '#B20002'
                //   });
                // }
                // else{
                
                var datesarray = this.props.exitData[0]; 
                series.risingStroke(function() {
                  if (this.x) {
                    var pointDate = new Date(this.x);
                    var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                    var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                    if (datesarray.includes(pointDateString)) {
                      //series.risingFill("#FFF");
                      return '#fff'
                    }
                  }
                  return '#0F8718'
                });
                series.risingFill(function() {
                  if (this.x) {
                    var pointDate = new Date(this.x);
                    var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                    var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                    if (datesarray.includes(pointDateString)) {
                      //series.risingFill("#FFF");
                      return '#fff'
                    }
                  }
                  return '#15BE23'
                });
              
                series.fallingStroke(function() {
                  if (this.x) {
                    var pointDate = new Date(this.x);
                    var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                    var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                    if (datesarray.includes(pointDateString)) {
                      //series.fallingFill("#FFF");
                      return '#fff'
                    }
                  }
                  return '#5C090B'
                });
                series.fallingFill(function() {
                  if (this.x) {
                    var pointDate = new Date(this.x);
                    var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                    var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                    if (datesarray.includes(pointDateString)) {
                      //series.fallingFill("#FFF");
                      return '#fff'
                    }
                  }
                  return '#B20002'
                });
              // }
              }
            } 
            mapping.seriesID = series.id(); 
            var volumePlot = chart.plot(1);
            
            volumePlot.yAxis().labels().format('{%Value}{scale:(1000)(1)|(k)}');
            // set crosshair y-label formatter
            volumePlot.crosshair().yLabel().format('{%Value}{scale:(1000)(1)|(k)}');
            volumePlot.legend(false);
            volumePlot.yAxis().labels().enabled(false);
            var labels1 = volumePlot.xAxis().labels();
            labels1.enabled(false);
            volumePlot.xAxis(false);
            volumePlot.yAxis(false);
            volumePlot.enabled(false);
            var controller = firstPlot.annotations();
                          
            chart.listen("selectedrangechangefinish", (e)=>{
              
              var startRatio = anychart.format.dateTime(e.firstSelected, 'dd MMM yyyy');
              var endRatio = anychart.format.dateTime(e.lastSelected, 'dd MMM yyyy');
              enddate = anychart.format.dateTime(e.lastSelected, 'yyyy-MM-dd');
              this.setState({
                enddate: enddate,
              });
              var data = { start : startRatio, end : endRatio};
              this.props.changeScroller(data);
            
            });
            enddate = this.state.enddate!=''?this.state.enddate:verticalline_date;
            
            if(this.state.gridstate)
            {
              firstPlot.xGrid().enabled(true);
              firstPlot.xGrid().stroke({
                // set stroke color
                color: "#2f3c55",
                // set dashes and gaps length
                dash: "2 5"
              });
              firstPlot.yGrid().enabled(true);
              firstPlot.yGrid().stroke({
                // set stroke color
                color: "#2f3c55",
                // set dashes and gaps length
                dash: "2 5"
              });
            }
            if(this.props.scrollData!='')
              {
                chart.selectRange(this.props.scrollData.start, this.props.scrollData.end);
              }
            if(this.props.moveDate!='' && this.state.addvisible)
            {
              series.risingStroke("#004600");
              series.risingFill("#15BE23");
              series.fallingStroke("#2D0000");
              series.fallingFill("#B20002");
              if(this.state.highlight)
              {
                if(this.props.exitData[0].length>0)
                {

                    var datesarray = this.props.exitData[0]; 
                    
                    series.risingStroke(function() {
                      if (this.x) {
                        var pointDate = new Date(this.x);
                        var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                        var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                        if (datesarray.includes(pointDateString)) {
                          //series.risingFill("#000");
                          return '#000'
                        }
                      }
                      return '#004600'
                    });
                    series.risingFill(function() {
                      if (this.x) {
                        var pointDate = new Date(this.x);
                        var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                        var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                        if (datesarray.includes(pointDateString)) {
                          //series.risingFill("#000");
                          return '#000'
                        }
                      }
                      return '#15BE23'
                    });
                  
                    series.fallingStroke(function() {
                      if (this.x) {
                        var pointDate = new Date(this.x);
                        var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                        var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                        if (datesarray.includes(pointDateString)) {
                          //series.fallingFill("#000");
                          return '#000'
                        }
                      }
                      return '#2D0000'
                    });
                    series.fallingFill(function() {
                      if (this.x) {
                        var pointDate = new Date(this.x);
                        var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                        var pointDateString = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                        if (datesarray.includes(pointDateString)) {
                          //series.fallingFill("#000");
                          return '#000'
                        }
                      }
                      return '#B20002'
                    });
                  
                }
              }
              chart.crosshair(false);
              if(this.state.addvisible)
              {
                // volumePlot.enabled(true);
                chart.background().fill("#ffffff");  
              }
              if(this.props.scrollData!='')
              {
                chart.selectRange(this.props.scrollData.start, this.props.scrollData.end);
                
              }
              var controller = firstPlot.annotations();
              var controller2 = volumePlot.annotations();
              // create a Vertical Line annotation
              var date = this.props.moveDate!=''?this.props.moveDate.moveDate:verticalline_date;
              var verticalLine2 = controller.verticalLine({
                xAnchor: date,
                // allowEdit: false,
              });
              verticalLine2.normal().stroke("#006600", 1, "10 2");
              var verticalLine3 = controller2.verticalLine({
                xAnchor: date,
                allowEdit: false,
              });

              verticalLine3.normal().stroke("#006600", 3, "10 2");
              var pointDateString='';
              var value='';
              var xValue = controller.getAnnotationAt(0).xAnchor();
              //get xScale object
              var xScale = chart.xScale();
              //get data from clicked point
              var selectable = mapping.createSelectable();
              var interval = chart.grouping().getCurrentDataInterval();
              selectable.selectAll("day", 1);
              var select = selectable.search(xValue, "nearest");
              //get point value
              var open = select.get('open');
              var high = select.get('high');
              var low = select.get('low');
              var close = select.get('close');
              // var value = select.Mf.values[0];
              // //get point date (in milliseconds)
              var key = select.getKey();
              // //format date and parse to string
              var pointDate = new Date(key);
              var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
              var pointDateString = String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate())+ '-' + month + '-' + String(pointDate.getFullYear());
              
              if(this.state.mekkocall)
              {
              var cotreq = { id : ticker_id , date : pointDateString}
              this.props.mekkoData(cotreq);
              this.setState({mekkocall : false});
              }
              series.tooltip().format('Axis Pointer Date: ' + pointDateString + ', Open: ' + open+ ', High: ' + high+ ', Low: ' + low+ ', Close: ' + close);

              var label = controller2.label({
                xAnchor: date,
                valueAnchor: volumePlot.yScale().minimum(),
                text: '|||',
                anchor: 'center-bottom',
                background: {
                  // fill: '#004e52',
                  fill: '#d23229',
                  opacity: 0.9
                },
                fontColor: 'white',
                offsetY: 5,
                zIndex: 200,
              });
              var anno = controller2.toJson()
              var y = firstPlot.yScale();
              var xAnchor = date
              xAnchor = label.xAnchor();
              verticalLine3.xAnchor(xAnchor);
              var str = anychart.format.dateTime(xAnchor, 'yyyy-MM-dd');
              label.text('|||');

              chart.listen('annotationChangefinish', (e)=> {
                var selectable = mapping.createSelectable();
                var interval = chart.grouping().getCurrentDataInterval();
                selectable.selectAll(interval.unit, interval.count);
                var select = selectable.search(e.annotation.xAnchor(), "nearest");
                var key = select.getKey();
                var pointDate = new Date(key);
                var month = String(pointDate.getMonth()+1)<10?'0'+String(pointDate.getMonth()+1):String(pointDate.getMonth()+1);
                var pointDateString = String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate())+ '-' + month + '-' + String(pointDate.getFullYear());
                var pointDateString1 = String(pointDate.getFullYear())+ '-' + month + '-' + String(pointDate.getDate()<10?'0'+pointDate.getDate():pointDate.getDate());
                // value = select.Mf.values[0];
                var open = select.get('open');
                var high = select.get('high');
                var low = select.get('low');
                var close = select.get('close');
                  
                var reqvar = { moveDate : pointDateString1 }
                this.props.getmoveDate(reqvar)  
                var cotreq = { id : ticker_id , date : pointDateString}
                this.props.mekkoData(cotreq)
                
                this.setState({
                  statedate: pointDateString,
                  statevalue: open,
                  
                });
                series.tooltip().format('Axis Pointer Date: ' + pointDateString + ', Open: ' + open+ ', High: ' + high+ ', Low: ' + low+ ', Close: ' + close);
              });
              var format = function(input) {
                var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
                var pattern1 = /(\d{2})\-(\d{2})\-(\d{4})/;
                if (!input) {
                  return null;
                }
                if(input.match(pattern))
                {
                  return input.replace(pattern, '$3-$2-$1');
                }
                if(input.match(pattern1))
                {
                  return input.replace(pattern1, '$3-$2-$1');
                  // return input;
                }
              };
              if(this.props.tableData1.length>0)
                {
                  var markers = []
                  this.props.tableData1.map((key,item)=>{
                    var markerdate = format(key.date); 
                    var marker_objects = {
                      "format": key.symbol,
                      "data": [
                        {
                          "date": markerdate,
                          "description": key.description
                        }
                      ],
                      "normal":{"fill": key.format}
                    };
                    markers.push(marker_objects);
                  });
                  firstPlot.eventMarkers({"groups": markers}); 
                  firstPlot.eventMarkers().position("series");
                  firstPlot.eventMarkers().fieldName("high");
                  
                }
              if(this.props.addClick1!='')
                {
                var date = pointDateString==''?this.state.statedate:pointDateString
                if(this.props.tableData1.length>0)
                {
                  var length1 = this.props.tableData1.length - 1;
                  if(date!=this.props.tableData1[length1].date)
                  {
                    var data1 = {date : pointDateString==''?this.state.statedate:pointDateString, price : value==''?this.state.statevalue:value,cot : '',ecin : '',description:this.state.description,format:this.state.format,symbol:this.state.symbol}
                    this.props.tableData(data1)
                  }
                }
                else
                {
                  var data1 = {date : pointDateString==''?this.state.statedate:pointDateString, price : value==''?this.state.statevalue:value,cot : '',ecin : '',description:this.state.description,format:this.state.format,symbol:this.state.symbol}
                  this.props.tableData(data1)
                }
                } 
            }
            else
            {
              chart.crosshair(true);
            }
            var interval = chart.grouping();
            var barunit = '';
            var barcount = '';
            setTimeout(function(){ 
            barunit = interval.getCurrentDataInterval().unit; 
            barcount = interval.getCurrentDataInterval().count; 
            if(barunit == 'month')
            {
              barunit = 'Monthly Bars';
            } 
            if(barunit == 'year')
            {
              barunit = 'Yearly Bars';
            }
            if(barunit == 'week')
            {
              barunit = 'Weekly Bars';
            }
            if(barunit == 'day')
            {
              barunit = 'Daily Bars';
            } 
            var watermark = chart.label();
            watermark.useHtml(true);
            ticker_name=ticker_name.split('-')
            if(ticker_name.length>0)
            {
              ticker_name=ticker_name[0];
            }
            else
            {
              ticker_name='';
            }
            // watermark.text(ticker_name+"<br><div class='watermark_bar' style='font-size: 16px'>"+cftc_market+" "+eod_data+"<br>1 Bar ="+barcount+ " " +barunit+"<br>PiaFx.com</div>");
            watermark.text(ticker_name+"<br><div class='watermark_bar' style='font-size: 16px'>"+cftc_market+" "+eod_data+"<br>" +barunit+"<br>PiaFx.com</div>");
            watermark
              .letterSpacing("2px")
              .fontColor("grey")
              .fontOpacity(0.3)
              .fontSize(25)
              .fontWeight(900);
            watermark
            .anchor("left")
            .offsetX('10%')
            .offsetY('15%');
            }, 100);
            var marker = firstPlot.rangeMarker(0);
            if(this.state.recessionstatus)
            {
              if(this.state.recessionkey!='')
              {
                if(this.props.recession.length>0)
                {
                  Object.keys(this.props.recession[0]).map((key)=>{
                    if(this.state.recessionkey==key)
                    {
                      this.props.recession[0][key].map((value,index)=>{
                        firstPlot.rangeMarker(index).to(value['end'])
                        firstPlot.rangeMarker(index).from(value['start'])
                        firstPlot.rangeMarker(index).fill("#373f4a");
                        firstPlot.rangeMarker(index).axis(firstPlot.xAxis());
                      })
                    }
                  })
                }
              }
            }
            
            const changeOptions = (
              <Menu className="chart_hamburger_ul">
                <SubMenu className="gx-menu-horizontal" title={<span>Chart Type</span>}>
                  <Menu.Item onClick={() => this.chartchange(series,'ohlc')}>OHLC</Menu.Item>
                  <Menu.Item onClick={() => this.chartchange(series,'candlestick')}>Candle Stick Chart</Menu.Item>
                </SubMenu>
                <SubMenu className="gx-menu-horizontal" title={<span>Grids</span>}>
                  <Menu.Item onClick={() => this.gridonoff(firstPlot,true)}>ON</Menu.Item>
                  <Menu.Item onClick={() => this.gridonoff(firstPlot,false)}>OFF</Menu.Item>
                </SubMenu>
                <SubMenu className="gx-menu-horizontal" title={<span>Highlight Exits</span>}>
                  <Menu.Item onClick={() => this.highlight(true)}>ON</Menu.Item>
                  <Menu.Item onClick={() => this.highlight(false)}>OFF</Menu.Item>
                </SubMenu>
                <SubMenu className="gx-menu-horizontal" title={<span>Drawing Tools</span>}>
                  <Menu.Item onClick={() => this.createDrawing(firstPlot,"horizontal-line")}>Horizontal Line</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(firstPlot,"vertical-line")}>Vertical Line</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(firstPlot,"line")}>Line Segment</Menu.Item>
                  <Menu.Item onClick={() => this.createDrawing(firstPlot,"marker")}>Marker</Menu.Item>
                  <Menu.Item onClick={() => this.removeDrawing(firstPlot)}>Remove All</Menu.Item>
                </SubMenu>
                {this.props.recession.length>0?
                <SubMenu className="gx-menu-horizontal" title={<span>Recession</span>}>
                  {Object.keys(this.props.recession[0]).map((key)=>{
                    return(
                    <SubMenu className="ant-menu-submenu-vertical gx-menu-horizontal" title={<span>{key}</span>}>
                      <Menu.Item onClick={() => this.showrecession(key,true)}>ON1</Menu.Item>
                      <Menu.Item onClick={() => this.showrecession(key,false)}>OFF</Menu.Item>
                    </SubMenu>)
                  })}
                </SubMenu>:null}
              </Menu>
            );
            const markerData = (
              <div>
                <form onSubmit={this.handleSubmit} method="post">
                  <table>
                    <tr>
                      <td>
                      <label>Color:</label>
                      </td>
                      <td>
                      <CirclePicker onChange={this.handleChange1.bind(this)} circleSize={20} circleSpacing={5}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Note:</label>
                      </td>
                      <td>
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                      </td>
                    </tr>
                    <tr>
                    <td>
                      <label>label:</label>
                    </td>
                    <td>
                      <input type="number" name="symbol" value={this.state.symbol} onChange={this.handleChange}/>
                    </td>
                    </tr>
                  </table>
                  <input type="submit" value="Submit"/>
                  <input type="button" value="Cancel" onClick={()=>this.handleCancel()}/>
                </form>
              </div>
          );
    
            newvar = <div className={ this.state.addvisible ? "cust_price_chart container_white" : "cust_price_chart"}>
            <p>
              <span style={{'float':"right",'display':'inline-block'}} className='subtitle_class'>
              <Switch size="small" 
                  onChange={(e)=>this.onChangecrosshair(e,verticalline_date,chart)}
                  />
                  <Popover overlayClassName="gx-popover-horizantal chart_hamburger_menu" placement="bottomRight" content={changeOptions}
              trigger="hover">
                      <span className="gx-pointer gx-flex-row gx-align-items-center">
                          <i class="icon icon-menu" style={{'fontSize':'20px'}}></i> 
                      </span>
                  </Popover>
                  
                  
                  {/* <Link to="/oneoone" target="_blank">
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                        <i class="icon icon-expand" style={{'fontSize':'20px'}} onClick={() => this.open1o1modal()} ></i> 
                    </span>                       
                  </Link> */}
                  {/* <span className="gx-pointer gx-flex-row gx-align-items-center">
                        <i class="icon icon-close" style={{'fontSize':'20px'}} onClick={() => this.removeChart(chart)} ></i> 
                  </span>  */}
                  <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <i class="icon icon-chart-composed" style={this.state.addvisible ? {'fontSize':'20px'} : { display: 'none' }} onClick={() => this.sniper(enddate)} ></i> 
                  </span>                       
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={markerData}
              trigger="click" visible={this.state.visible}  onCancel={this.handleCancel}>
                  <i class="icon icon-add-circle"  style={this.state.addvisible ? {'fontSize':'20px'} : { display: 'none' }}  visible={this.state.addvisible} onClick={()=>this.showModal()}></i><br />
                  </Popover>          
              </span>
            </p>
            { 
                <AnyChart
                    width="100%"
                    height={400}
                    instance={chart}
                    style = {{"marginLeft":"0px"}}
                />
            
            }
            </div>
        
        }
        // if(this.props.loader)
        //   {
        //   this.props.loaderstatus(false);
        //   }
        return (
            <div style={{"width":"100%"}} >
                
                {newvar} 
            </div>
        );
      
    }
};

const mapStateToProps =  state => {
    
    return {
        loader: state.Exchange.loader,
        moveDate: state.Exchange.moveDate,
        scrollData: state.Exchange.scrollData,
        addClick1: state.Exchange.addClicked1,
        graphdata: state.Exchange.graphdata,
        tableData1: state.Exchange.tableData,
        priceData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_search').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
        tickerData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_details').map((priceDataIndex)=>{
                return state.Exchange.priceData[priceDataIndex];
        }),
        exitData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'exit_dates').map((priceDataIndex)=>{
          return state.Exchange.priceData[priceDataIndex];
        }),
        recession: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'recession').map((priceDataIndex)=>{
          return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps, {getmoveDate,changeScroller,addClicked,tableData,mekkoData,loaderstatus})(PriceChart);
