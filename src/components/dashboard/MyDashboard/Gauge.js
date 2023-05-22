import React, {Component} from "react";
import anychart from 'anychart';
import {connect} from "react-redux";
import isEqual from "lodash/isEqual";
var common_colors = require('../../../assets/theme-variable');
var theme = localStorage.getItem('theme');
var labelbg = common_colors.default_back_color;
if(theme == 'coffee')
{
    labelbg = common_colors.coffee_back_color;
}

class Gauge extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.gaugeData && !isEqual(nextProps.gaugeData,this.props.gaugeData)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        // var chart = anychart.stock();
        var theme = localStorage.getItem('theme');
        var textColor = "#CCCCCC";
        if(theme == 'light')
        {
            textColor = "#262626";
        }
        if(theme == 'coffee')
            {
              anychart.theme(anychart.themes.coffee);
            }
        var newvar = <div></div>
        if(this.props.gaugeData.length > 0){
            var gaugeData = this.props.gaugeData[0];
            var darkAccentColor = '#545f69';
            var tempthis = this;
            anychart.onDocumentReady(function () {
                var name = "gauge"; 
                var iDiv = document.createElement('div');
                iDiv.id = name;
                if(document.getElementsByClassName('gauge_tab').length>0)
                {
                document.getElementsByClassName('gauge_tab')[0].appendChild(iDiv);
                document.getElementById(name).innerHTML =''; 
                document.getElementById(name).style.height = "450px";
                }
                var stage = anychart.graphics.create('gauge');
                var gauge = anychart.gauges.circular();
                if(tempthis.props.getgauge != '')
                {
                    const getgauge = tempthis.props.getgauge;
                    gauge.title().useHtml(true);
                    gauge.title('<h2 style="color:'+textColor+';font-size:20px">Referring Date: '+new Date(getgauge['date']).toDateString()+'</h2><br/><h2 style="color:'+textColor+'"> LRA: '+getgauge['slope_period']+' Days - Oscillator: '+getgauge['william_period']+' Days - NCLRA: '+getgauge['nclra_period']+' Weeks </h2>');
                }
                var min =gaugeData['slope']['min'];
                var max =gaugeData['slope']['max'];
                var middle = (max + min)/2;
                var value =  gaugeData['slope']['value'];
                if(value >= 0 )
                {
                    value = (value*100)/max;
                }
                if(value < 0 )
                {
                    value = (((-1*value)*100)/(-1*min))*(-1);
                }
                // console.log('asplvalue',value);
                gauge.container(stage);
                gauge.background().fill("#FFFFFF 0");
                gauge.bounds('0%', '0%', '100%', '80%')
                        .fill(null)
                        .stroke(null)
                        .padding(0)
                        .margin(0);

                gauge.axis().scale()
                        .minimum(-100)
                        .maximum(100)
                        // .minimum(min)
                        // .maximum(max)
                        // .ticks({interval: 20})
                        // .minorTicks({interval: 10});

                gauge.axis()
                        .startAngle(-130)
                        .sweepAngle(260)
                        .fill('#474747')
                        .zIndex(20)
                        .labels();
                if(theme == 'light')
                {
                    gauge.axis().labels()
                        .fontWeight('normal')
                        .position('inside')
                        .padding(5)
                        .fontColor('#6e6e6e')
                        .fontSize('16px');
                }
                else{
                    gauge.axis().labels()
                        .fontWeight('normal')
                        .position('inside')
                        .padding(5)
                        .fontColor('#ccc7b9')
                        .fontSize('16px');
                }

                // gauge.data([gaugeData['slope']['value']]);
                gauge.data([value]);

                gauge.range(0, {
                    from: -100,
                    to: -60,
                    position: 'inside',
                    fill: '#F32D1D',
                    stroke: '1 #000',
                    startSize: 6,
                    endSize: 6,
                    radius: 113,
                    zIndex: 1
                });
                gauge.range(1, {
                    from: -60,
                    to: -40,
                    position: 'inside',
                    fill: '#F2786E',
                    stroke: '1 #000',
                    startSize: 6,
                    endSize: 6,
                    radius: 113,
                    zIndex: 1
                });

                gauge.range(2, {
                    from: 60,
                    to: 100,
                    position: 'inside',
                    fill: '#13D339',
                    stroke: '1 #000',
                    startSize: 6,
                    endSize: 6,
                    radius: 113,
                    zIndex: 1
                });
                gauge.range(3, {
                    from: 40,
                    to: 60,
                    position: 'inside',
                    fill: '#92E1A2',
                    stroke: '1 #000',
                    startSize: 6,
                    endSize: 6,
                    radius: 113,
                    zIndex: 1
                });

                gauge.label()
                        .text('<span style="color:' + 'white' + '; font-size: 13px">Main Trend </span>')
                        .useHtml(true);

                gauge.label()
                        .hAlign('center')
                        .anchor('center-bottom')
                        .padding(5, 10)
                        .offsetY(70)
                        .offsetX(0)
                        .zIndex(1)
                        .background({fill: labelbg, corners: 3, cornerType: 'ROUND'});

                gauge.label(1)
                        .text('<span style="color:' + 'white' + '; font-size: 13px">Overbuy/Oversold</span>').useHtml(true);

                gauge.label(1)
                        .hAlign('center')
                        .anchor('center-top')
                        .padding(5, 10)
                        .offsetY(-20)
                        .offsetX(0)
                        .zIndex(1)
                        .zIndex(1)
                        .background({fill: labelbg, stroke: labelbg, corners: 3, cornerType: 'ROUND'});

                gauge.needle()
                        .fill(null)
                        .stroke('2 ' + '#a7abaf')
                        .startRadius('5%')
                        .endRadius('80%')
                        .startWidth('0.1%')
                        .endWidth('0.1%')
                        .middleWidth('0.1%');

                gauge.cap()
                        .radius('3%')
                        .enabled(true)
                        .fill(darkAccentColor)
                        .stroke(null);

                var internalGauge = anychart.gauges.circular();
                internalGauge.container(stage);
                var williamValue = gaugeData['william'];
                if(williamValue<=-80)
                {
                    williamValue = -100
                }
                else if(williamValue>=-20)
                {
                    williamValue = 0
                }
                else if(williamValue<=-40 && williamValue>=-60)
                {
                    williamValue = -50
                }
                internalGauge.background('none');
                internalGauge.background().fill("#FFFFFF 0");
                internalGauge
                        .data([williamValue])
                        .padding(0)
                        .fill(null)
                        .margin('10%', 0, 0, 0)
                        .bounds('25%', '50%', '50%', '30%')
                        .stroke('none');

                internalGauge.axis().scale()
                        .minimum(0)
                        .maximum(-100);
                        // .ticks().interval(1000);

                internalGauge.axis()
                        .startAngle(-90)
                        .sweepAngle(180)
                        .fill('#474747')
                        .zIndex(20)
                        .labels();

                internalGauge.axis().labels()
                        .fontWeight('normal')
                        .position('inside')
                        .fontFamily('Verdana')
                        .fontColor('#ccc7b9')
                        .fontSize('10px');

                internalGauge.axis().ticks({type: 'trapezium', fill: '#474747', length: 15});

                internalGauge.needle()
                        .fill(null)
                        .stroke('2 ' + '#a7abaf')
                        .startRadius('5%')
                        .endRadius('70%')
                        .startWidth('0.1%')
                        .endWidth('0.1%')
                        .middleWidth('0.1%');

                internalGauge.cap()
                        .radius('3%')
                        .enabled(true)
                        .fill(darkAccentColor)
                        .stroke(null);

                internalGauge.range(0, {
                    from: 0,
                    to: -20,
                    position: 'inside',
                    fill: '#F32D1D',
                    stroke: '1 #000',
                    startSize: 8,
                    endSize: 8,
                    radius: 115,
                    zIndex: 1
                });
                internalGauge.range(1, {
                    from: -20,
                    to: -25,
                    position: 'inside',
                    fill: '#F32D1D',
                    stroke: '1 #000',
                    startSize: 8,
                    endSize: 8,
                    radius: 115,
                    zIndex: 1
                });
                internalGauge.range(2, {
                    from: -75,
                    to: -80,
                    position: 'inside',
                    fill: '#13D339',
                    stroke: '1 #000',
                    startSize: 8,
                    endSize: 8,
                    radius: 115,
                    zIndex: 1
                });
                internalGauge.range(3, {
                    from: -80,
                    to: -100,
                    position: 'inside',
                    fill: '#13D339',
                    stroke: '1 #000',
                    startSize: 8,
                    endSize: 8,
                    radius: 115,
                    zIndex: 1
                });
                internalGauge.label(1)
                        .text('<span style="color:' + 'white' + '; font-size: 13px">Non commercial net slope</span>').useHtml(true);
                internalGauge.label(1)
                        .hAlign('center')
                        .anchor('center-top')
                        .padding(5, 10)
                        .offsetY(-20)
                        .offsetX(0)
                        .zIndex(1)
                        .zIndex(1)
                        .background({fill: labelbg, stroke: labelbg, corners: 3, cornerType: 'ROUND'});

                gauge.draw();
                internalGauge.draw();

                // create data
                var data = [gaugeData['future'],gaugeData['combined']];

                // set the gauge type
                var lineargauge = anychart.gauges.linear();

                // set the data for the lineargauge
                lineargauge.data(data);

                // set the layout
                lineargauge.layout('horizontal');
                lineargauge.bounds('10%', '30%', '80%', '80%');
                lineargauge.background().fill("#FFFFFF 0");
                // create a color scale
                // var scaleBarColorScale = anychart.scales.ordinalColor().ranges(
                // [
                //     {
                //         from: -100,
                //         to: -50,
                //         color: ['#D81E05', '#ffc926']
                //         },
                //         {
                //         from: -50,
                //         to: -25,
                //         color: ['#ffc926', '#fffd94']
                //         },
                //         {
                //         from: -25,
                //         to: 0,
                //         color: ['#fffd94', '#fffbd9']
                //         },
                //         {
                //         from: 0,
                //         to: 25,
                //         color: ['#fffbd9', '#eaffd9']
                //         },
                //         {
                //         from: 25,
                //         to: 50,
                //         color: ['#eaffd9', '#89d14f']
                //         },
                //         {
                //         from: 50,
                //         to: 100,
                //         color: ['#89d14f', '#439401']
                //         }
                // ]
                // );
                if(gaugeData['ncnet'] < 0)
                {
                    var scaleBarColorScale = anychart.scales.ordinalColor().ranges(
                        [
                            {
                                from: -100,
                                to: 100,
                                color: ['#D81E05', '#D81E05']
                            }
                        ]
                    );
                }
                else{
                    var scaleBarColorScale = anychart.scales.ordinalColor().ranges(
                        [
                            {
                                from: -100,
                                to: 100,
                                color: ['#439401', '#439401']
                            }
                        ]
                    );
                }
                // create a Scale Bar
                var scaleBar = lineargauge.scaleBar(0);

                // set the height and offset of the Scale Bar (both as percentages of the lineargauge height)
                scaleBar.width('5%');
                scaleBar.offset('31.5%');

                // use the color scale (defined earlier) as the color scale of the Scale Bar
                scaleBar.colorScale(scaleBarColorScale);

                // add a marker pointer
                var marker = lineargauge.marker(0);
                marker.offset('31.5%');
                marker.color('blue');
                marker.type('triangle-up');
                marker.zIndex(10);
                marker.name('Fut Only');

                var marker1 = lineargauge.marker(1);
                marker1.offset('33.5%');
                marker1.color('#3d3d3c');
                marker1.type('triangle-down');
                marker1.zIndex(10);
                marker1.name('Combined');
                // marker1.tooltip.enabled(false);

                // configure the scale
                var scale = lineargauge.scale();
                scale.minimum(-100);
                scale.maximum(100);
                // scale.ticks().interval(10);

                // configure the axis
                var axis = lineargauge.axis(0);
                axis.minorTicks(true)
                axis.minorTicks().stroke('#cecece');
                axis.width('1%');
                axis.offset('29.5%');
                axis.orientation('top');

                // format axis labels
                axis.labels().format('{%value}');

                // configure the axis
                var axis1 = lineargauge.axis(1);
                axis1.minorTicks(true)
                axis1.minorTicks().stroke('#cecece');
                axis1.width('1%');
                axis1.offset('37.5%');
                axis1.orientation('bottom');

                // format axis1 labels
                axis1.labels().format('{%value}');

                // set paddings
                lineargauge.padding([0, 50]);

                // set the container id
                lineargauge.container(stage);

                // initiate drawing the lineargauge
                lineargauge.draw();
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
        gaugeData : state.Exchange.gaugeData,
        getgauge : state.Exchange.getgauge,
    }
  };
  export default connect(mapStateToProps)(Gauge);
