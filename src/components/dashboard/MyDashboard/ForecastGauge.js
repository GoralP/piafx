import React, {Component,PureComponent} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
var common_colors = require('../../../assets/theme-variable');
var theme = localStorage.getItem('theme');
var labelbg = common_colors.default_back_color;
if(theme == 'coffee')
{
    // anychart.theme(anychart.themes.coffee);
    labelbg = common_colors.coffee_back_color;
}
const NUMBER_FORMAT = {
    scale: {
        'factors': [1e9, 1e6, 1e3, 1],
        'suffixes': ['B', 'M', 'K', '']
    },
    decimalsCount: 0
}
function split(left, right, parts) {
    var result = [],
        delta = (right - left) / (parts - 1);
    while (left < right) {
        result.push(left);
        left += delta;
    }
    result.push(right);
    return result;
}
class ForecastGauge extends PureComponent {
    render() {
        // var chart = anychart.stock();
        var theme = localStorage.getItem('theme');
        if(theme == 'coffee')
            {
              anychart.theme(anychart.themes.coffee);
            }
        var newvar = <div></div>
        if(this.props.mlforecast.length > 0){
            // console.log('asplaspl',this.props.gaugeData);
            var gaugeData = this.props.mlforecast[0];
            var colorAxisLines = '#CECECE';
            var colorLightMinorAxisLines = '#F7F7F7';
            var colorAxisFont = '#7c868e';
            var darkAccentColor = '#545f69';
            var darkAxisColor = '#B9B9B9';
            var fontColor = '#212121';

            anychart.onDocumentReady(function () {
                var name = "mlgauge"; 
                var iDiv = document.createElement('div');
                iDiv.id = name;
                if(document.getElementsByClassName('mlgauge_tab').length>0)
                {
                document.getElementsByClassName('mlgauge_tab')[0].appendChild(iDiv);
                document.getElementById(name).innerHTML =''; 
                document.getElementById(name).style.height = "375px";
                }
                var stage = anychart.graphics.create('mlgauge');
                var gauge = anychart.gauges.circular();
                var min =gaugeData['min'];
                var max =gaugeData['max'];
                var middle = gaugeData['middle'];
                var value =  gaugeData['value'];
                var splitArray = split(min,max, 10);
                // splitArray.push(split);
                // console.log(split(min,max, 10));
                
                // console.log('value1',min+((max-min)/10));
                var splArray = [min];
                var tempmin = min;
                for(var i=0;i<=8;i++)
                {
                    if(value >= max)
                    {
                        value = splitArray[splArray.length-2];
                        break;
                    }
                    else if(value <= min)
                    {
                        value = splitArray[1];
                        break;
                    }
                    if(value >= splitArray[i] && value <= splitArray[i+1])
                    {
                        value = splitArray[i];
                        // var x = (max-min)/10;
                        // splArray.push(tempmin + parseFloat(x.toFixed(4)));
                        // tempmin = tempmin + parseFloat(x.toFixed(4))
                        break;
                    }
                }
                // for(var i=0;i<=8;i++)
                // {
                //     // if(value >= splitArray[i] && value <= splitArray[i+1])
                //     // {
                //         var x = (max-min)/10;
                //         splArray.push(tempmin + parseFloat(x.toFixed(4)));
                //         tempmin = tempmin + parseFloat(x.toFixed(4))
                //         // break;
                //     // }
                // }
                // console.log('value3',splArray);
                // if(splArray.length>0)
                // {
                //     if(value >= max)
                //     {
                //         value = splArray[splArray.length-2];
                //     }
                //     else if(value <= min)
                //     {
                //         value = splArray[1];
                //     }
                //     else
                //     {
                //         for(var i=0;i<splArray-2;i++)
                //         {
                //             if(value >= splArray[i] && value <= splArray[i+1])
                //             {
                //                 value = splArray[i+1];
                //                 break;
                //             }
                //         }
                //     }
                // }
                console.log('value',value);
                // var tinterval = splArray[1]- splArray[0];
                // console.log('value123',parseFloat(tinterval.toFixed(4)));
                // console.log((max-middle)/5);
                // console.log(middle+((max-middle)/5));
                // if(value >= 0 )
                // {
                //     value = (value*100)/max;
                // }
                // if(value < 0 )
                // {
                //     value = (((-1*value)*100)/(-1*min))*(-1);
                // }
                // console.log('asplvalue',value);
                gauge.container(stage);
                gauge.background().fill("#FFFFFF 0");
                // gauge.bounds('0%', '0%', '100%', '80%')
                //         .fill(null)
                //         .stroke(null)
                //         .padding(0)
                //         .margin(0);

                // gauge.axis().scale()
                //         // .minimum(-100)
                //         // .maximum(100)
                //         .minimum(min)
                //         .maximum(max)
                //         // .ticks({interval: 20})
                //         // .minorTicks({interval: 10});

                // gauge.axis()
                //         .startAngle(-130)
                //         .sweepAngle(260)
                //         .fill('#474747')
                //         .zIndex(20)
                //         .labels();
                // if(theme == 'light')
                // {
                //     gauge.axis().labels()
                //         .fontWeight('normal')
                //         .position('inside')
                //         .padding(5)
                //         .fontColor('#6e6e6e')
                //         .fontSize('16px');
                // }
                // else{
                //     gauge.axis().labels()
                //         .fontWeight('normal')
                //         .position('inside')
                //         .padding(5)
                //         .fontColor('#ccc7b9')
                //         .fontSize('16px');
                // }
                gauge
                    .fill('#fff 0')
                    .stroke(null)
                    .padding(5)
                    .margin(20)
                    .startAngle(270)
                    .sweepAngle(180);

                gauge
                    .axis()
                    .labels()
                    .padding(5)
                    .fontSize(14)
                    .position('outside')

                // gauge.data([73.2]);
                gauge
                    .axis()
                    .scale()
                    .minimum(min)
                    .maximum(max)
                    .ticks(splitArray);
                    // .ticks({ interval: parseFloat(tinterval.toFixed(4)) })
                    // .minorTicks({ interval: parseFloat(tinterval.toFixed(4)) });

                gauge
                    .axis()
                    .fill('#545f69')
                    .width(1)
                    .ticks({ type: 'line', fill: 'white', length: 2 });
                // gauge.data([gaugeData['slope']['value']]);
                gauge.data([value]);

                // gauge.range(0, {
                //     from: min,
                //     to: middle,
                //     position: 'inside',
                //     fill: '#F32D1D',
                //     stroke: '1 #000',
                //     startSize: 6,
                //     endSize: 6,
                //     radius: 113,
                //     zIndex: 1
                // });
                // gauge.range(1, {
                //     from: middle,
                //     to: max,
                //     position: 'inside',
                //     fill: '#13D339',
                //     stroke: '1 #000',
                //     startSize: 6,
                //     endSize: 6,
                //     radius: 113,
                //     zIndex: 1
                // });
                if(gaugeData['trend_opt_sma'] == 'above')
                {
                    gauge.range(0, {
                        from: min,
                        to: (min+max)/2,
                        position: 'inside',
                        fill: '#cf4140',
                        startSize: 50,
                        endSize: 50,
                        radius: 98
                    });
                
                    gauge.range(1, {
                        from: (min+max)/2,
                        to: max,
                        position: 'inside',
                        fill: 'green',
                        startSize: 50,
                        endSize: 50,
                        radius: 98
                    });
                }
                else
                {
                    gauge.range(0, {
                        from: min,
                        to: (min+max)/2,
                        position: 'inside',
                        fill: '#cf9b9b',
                        startSize: 50,
                        endSize: 50,
                        radius: 98
                    });
                
                    gauge.range(1, {
                        from: (min+max)/2,
                        to: max,
                        position: 'inside',
                        fill: '#628262',
                        startSize: 50,
                        endSize: 50,
                        radius: 98
                    });
                }
                gauge
                    .title()
                    .useHtml(true)
                    .padding(0)
                    .fontColor('#212121')
                    .hAlign('center')
                    .margin([0, 0, 10, 0]);
                if(gaugeData['error_opt_sma'] == 'above')
                {
                    gauge
                        .needle()
                        .stroke('4 #292929')
                        .startRadius('5%')
                        .endRadius('90%')
                        .startWidth('0.1%')
                        .endWidth('0.1%')
                        .middleWidth('0.1%');
                }
                else
                {
                    gauge
                        .needle()
                        .stroke('2 #292929')
                        .startRadius('5%')
                        .endRadius('90%')
                        .startWidth('0.1%')
                        .endWidth('0.1%')
                        .middleWidth('0.1%');
                }
                gauge.cap().radius('3%').enabled(true).fill('#292929');
                gauge.title('<span>ML Forecast</span><br/><span>Referring Date '+new Date(gaugeData['date']).toDateString()+'</span>');
                gauge.label(0)
                        .text('<span style="color:' + 'white' + '; font-size: 15px">Trend Success '+ gaugeData['RoS_T'] + '% - Magnitude Success '+ gaugeData['RoS_T'] +'%</span>').useHtml(true);
                gauge.label(0)
                        .hAlign('center')
                        .anchor('center-top')
                        .padding(5, 10)
                        .offsetY(0)
                        .offsetX(-10)
                        .zIndex(1)
                        .background({fill: labelbg, stroke: labelbg, corners: 3, cornerType: 'ROUND'});
                // gauge.range(2, {
                //     from: 60,
                //     to: 100,
                //     position: 'inside',
                //     fill: '#13D339',
                //     stroke: '1 #000',
                //     startSize: 6,
                //     endSize: 6,
                //     radius: 113,
                //     zIndex: 1
                // });
                // gauge.range(3, {
                //     from: 40,
                //     to: 60,
                //     position: 'inside',
                //     fill: '#92E1A2',
                //     stroke: '1 #000',
                //     startSize: 6,
                //     endSize: 6,
                //     radius: 113,
                //     zIndex: 1
                // });

                // gauge.label()
                //         .text('<span style="color:' + 'white' + '; font-size: 13px">Main Trend </span>')
                //         .useHtml(true);

                // gauge.label()
                //         .hAlign('center')
                //         .anchor('center-bottom')
                //         .padding(5, 10)
                //         .offsetY(70)
                //         .offsetX(0)
                //         .zIndex(1)
                //         .background({fill: labelbg, corners: 3, cornerType: 'ROUND'});

                // gauge.label(1)
                //         .text('<span style="color:' + 'white' + '; font-size: 13px">Overbuy/Oversold</span>').useHtml(true);

                // gauge.label(1)
                //         .hAlign('center')
                //         .anchor('center-top')
                //         .padding(5, 10)
                //         .offsetY(-20)
                //         .offsetX(0)
                //         .zIndex(1)
                //         .zIndex(1)
                //         .background({fill: labelbg, stroke: labelbg, corners: 3, cornerType: 'ROUND'});

                // gauge.needle()
                //         .fill(null)
                //         .stroke('2 ' + '#a7abaf')
                //         .startRadius('5%')
                //         .endRadius('80%')
                //         .startWidth('0.1%')
                //         .endWidth('0.1%')
                //         .middleWidth('0.1%');

                // gauge.cap()
                //         .radius('3%')
                //         .enabled(true)
                //         .fill(darkAccentColor)
                //         .stroke(null);
                gauge.draw();
            });
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
        mekkotype : state.Exchange.mekkotype,
        reportdate : state.Exchange.mekkodatadone,
        gaugeData : state.Exchange.gaugeData,
        mlforecast: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'mlforecast').map((priceDataIndex)=>{
            return state.Exchange.priceData[priceDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(ForecastGauge);
