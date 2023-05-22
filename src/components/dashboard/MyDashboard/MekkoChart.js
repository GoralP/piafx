import React, { Component } from "react";
import anychart from "anychart";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
const NUMBER_FORMAT = {
  scale: {
    factors: [1e9, 1e6, 1e3, 1],
    suffixes: ["B", "M", "K", ""],
  },
  decimalsCount: 0,
};

class MekkoChart extends Component {
  // percentage_calc(cotname,item)
  // {
  //     console.log('aspl',cotname);
  //     if(cotname == 'TFF Future Option' || cotname == 'Dis. Future Option' || cotname == 'Legacy Future Option')
  //     {
  //         var levelOneArray=[];
  //         var levelTwoArray=[];
  //         var levelThreeArray=[];
  //         // console.log('aspl1',item);
  //         Object.keys(item).map((key)=>{
  //             // var long = item[key]['long'];
  //             // var short = item[key]['short'];
  //             // if(item[key]['spreading'])
  //             // {
  //             //     item[key]['spreading'];
  //             // }
  //             levelThreeArray[key] = [];
  //             Object.keys(item[key]).map((data)=>{
  //                 var sum = 0;
  //                 console.log('aspl1',data);
  //                 // levelThreeArray[key][data]=item[key][data];
  //                 Object.keys(item[key][data]).map((values)=>{
  //                     console.log('asplrohan',item[key][data])
  //                     if(values == 'value')
  //                     {
  //                         sum += item[key][data][values];
  //                     }
  //                 });
  //                 levelThreeArray[key] = sum;
  //                 // console.log('aspl123',sum);
  //             })
  //             console.log('asplprice',levelThreeArray);
  //         })
  //     }
  //     else
  //     {
  //         console.log('aspl2',item);
  //         Object.keys(item).map((key)=>{
  //             console.log('aspli2',key);
  //         })
  //     }

  // }
  shouldComponentUpdate(nextProps) {
    if (nextProps.mekko && !isEqual(nextProps.mekko, this.props.mekko)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    var i = 1;
    var j = 1;
    var k = 1;
    var newvar = <div></div>;
    var theme = localStorage.getItem("theme");
    if (theme == "coffee") {
      anychart.theme(anychart.themes.coffee);
    }
    if (this.props.mekkodatadone != "") {
      newvar = (
        <div>
          {/* { Object.keys(this.props.mekkodatadone[0]).map((key)=>{
               
                this.props.mekkodatadone[0][key].map((item,index)=>{
                var array1 = [];
                // var dataSet = anychart.data.set(item);
                var net = 0;
                Object.keys(item).map((key)=>{
                     array1.push({'x': key, 'value': item[key]});
                     net += Math.abs(item[key]);
                });
                var arr = array1.sort(function(a,b) {
                    return b['value'] - a['value'];
                });
                // console.log('asplmekko',arr);
                var chart = anychart.barmekko(arr);
                chart.labels()
                    .enabled(true)
                    .fontColor('#fff')
                    .position('center')
                    .format(function () {
                        if (this.value > 0) {
                            return '+' + this.value 
                        } else {
                            return this.value 
                        }
                    });
               
                chart.tooltip().useHtml(true);
                chart.tooltip().format(function() {
                    var value = this.value;
                    var percentvalue = Math.round(((value/net)*100)*100)/100;
                    return "Value: "+ value+"<br> Percentage: " + percentvalue+"%";
                });
                // var chart = anychart.barmekko(dataSet.mapAs({'x': key, 'value': item}));
                var tooltip = chart.tooltip();
                tooltip.displayMode("union");
                tooltip.positionMode("chart");
                tooltip.anchor("right-top");
                tooltip.position("right-top");

                chart.background().fill("#FFFFFF 0");
                var title = chart.title();
                //enables HTML tags
                title.useHtml(true);
                chart.title(
                    "<span style=\"color:#e06666; font-size: 12px;\">"+
                    "Net position for report date "+this.props.reportdate.date+"</span>"
                );
                
                var name = "barmekko_"+i; 
                var iDiv = document.createElement('div');
                iDiv.id = name;
                //initiate chart drawing
                
                if(key == "Legacy Future Option" && this.props.mekkotype ==1)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart1_"+i++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "Legacy Future Only" && this.props.mekkotype ==2)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart1_"+i++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "TFF Future Option" && this.props.mekkotype ==3)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart1_"+i++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "TFF Future Only" && this.props.mekkotype ==4)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart1_"+i++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                
                else if(key == "Dis. Future Option" && this.props.mekkotype ==5)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart1_"+i++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "Dis. Future Only" && this.props.mekkotype ==6)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart1_"+i++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                
                // document.getElementById(name).innerHTML =''; 
                
                    // }
                    
                // }
                
               })
            
                // } 
            })
            } */}
          {Object.keys(this.props.mekko[0]).map((key, l) => {
            var user = 0;
            this.props.mekko[0][key].map((item, index) => {
              var palette = anychart.palettes.defaultPalette;
              if (theme == "coffee") {
                anychart.theme(anychart.themes.coffee);
                palette = anychart.palettes.coffee;
              }
              var arr = [];
              // var sunburst_array = {'name':key,normal: {fill: "#0c1b31"}};
              var sunburst_array = { name: key };
              // console.log('aspls',item);
              // this.percentage_calc(key,item);
              Object.keys(item).map((userkey) => {
                var type = 0;
                // console.log('aspluser',userkey);
                var longfill = "";
                var shortfill = "";
                var data = { name: userkey };
                if (
                  userkey == "Commercial Position" ||
                  userkey == "Dealer" ||
                  userkey == "Production Manager"
                ) {
                  // var data= {'name':userkey,normal: {fill: "#ef6c00"}};
                  var data = { name: userkey, normal: { fill: palette[2] } };
                  longfill = "#E07D3B";
                  shortfill = "#D46820";
                }
                if (
                  userkey == "Noncommercial Position" ||
                  userkey == "Lev Money Manager" ||
                  userkey == "Money Manager"
                ) {
                  // var data= {'name':userkey,normal: {fill: "#64b5f6"}};
                  var data = { name: userkey, normal: { fill: palette[0] } };
                  longfill = "#89BCF1";
                  shortfill = "#62A6ED";
                }
                if (
                  userkey == "Nonreportable Position" ||
                  userkey == "Non-Reportable" ||
                  userkey == "Non-Reportable"
                ) {
                  // var data= {'name':userkey,normal: {fill: "#455a64"}};
                  var data = { name: userkey, normal: { fill: palette[5] } };
                  longfill = "#536570";
                  shortfill = "#404E56";
                }
                if (userkey == "Swap Dealer" || userkey == "Asset Manager") {
                  var data = { name: userkey, normal: { fill: palette[8] } };
                  // var data= {'name':userkey,normal: {fill: "#ffd54f"}};
                  longfill = "#89f0e2";
                  shortfill = "#00838f";
                }
                if (userkey == "Other Reportable") {
                  var data = { name: userkey, normal: { fill: palette[4] } };
                  // var data= {'name':userkey,normal: {fill: "#9EDDA5"}};
                  longfill = "#BAE1C5";
                  shortfill = "#5FA868";
                }
                // console.log('aspldata',data)
                if (Array.isArray(sunburst_array.children)) {
                  sunburst_array.children[user] = data;
                } else {
                  sunburst_array.children = [];
                  sunburst_array.children[user] = data;
                }
                Object.keys(item[userkey]).map((index) => {
                  if (index == "long") {
                    var data = {
                      name: "Long",
                      value: parseInt(item[userkey][index]["value"]),
                      normal: { fill: longfill },
                    };
                  } else if (index == "short") {
                    var data = {
                      name: "Short",
                      value: parseInt(item[userkey][index]["value"]),
                      normal: { fill: shortfill },
                    };
                  } else {
                    var data = {
                      name: "Spreading",
                      value: parseInt(item[userkey][index]["value"]),
                    };
                  }
                  if (Array.isArray(sunburst_array.children[user].children)) {
                    sunburst_array.children[user].children[type] = data;
                  } else {
                    sunburst_array.children[user].children = [];
                    sunburst_array.children[user].children[type] = data;
                  }
                  if (
                    key == "TFF Future Option" ||
                    key == "Dis. Future Option" ||
                    key == "Legacy Future Option"
                  ) {
                    // console.log('asplindex',index);
                    if (index == "long") {
                      var data = { name: "Long", normal: { fill: longfill } };
                    } else if (index == "short") {
                      var data = { name: "Short", normal: { fill: shortfill } };
                    } else {
                      var data = { name: "Spreading" };
                    }
                    if (Array.isArray(sunburst_array.children[user].children)) {
                      sunburst_array.children[user].children[type] = data;
                    } else {
                      sunburst_array.children[user].children = [];
                      sunburst_array.children[user].children[type] = data;
                    }
                    if (
                      Array.isArray(
                        sunburst_array.children[user].children[type].children
                      )
                    ) {
                      if (index == "long") {
                        sunburst_array.children[user].children[
                          type
                        ].children[0] = {
                          name: "Future",
                          value: parseInt(item[userkey][index]["future"]),
                        };
                        sunburst_array.children[user].children[
                          type
                        ].children[1] = {
                          name: "Option",
                          value: parseInt(item[userkey][index]["option"]),
                        };
                      } else if (index == "short") {
                        sunburst_array.children[user].children[
                          type
                        ].children[0] = {
                          name: "Future",
                          value: parseInt(item[userkey][index]["future"]),
                        };
                        sunburst_array.children[user].children[
                          type
                        ].children[1] = {
                          name: "Option",
                          value: parseInt(item[userkey][index]["option"]),
                        };
                      } else {
                        sunburst_array.children[user].children[
                          type
                        ].children[0] = {
                          name: "Future",
                          value: parseInt(item[userkey][index]["future"]),
                        };
                        sunburst_array.children[user].children[
                          type
                        ].children[1] = {
                          name: "Option",
                          value: parseInt(item[userkey][index]["option"]),
                        };
                      }
                    } else {
                      if (index == "long") {
                        sunburst_array.children[user].children[
                          type
                        ].children = [];
                        sunburst_array.children[user].children[
                          type
                        ].children[0] = {
                          name: "Future",
                          value: parseInt(item[userkey][index]["future"]),
                        };
                        sunburst_array.children[user].children[
                          type
                        ].children[1] = {
                          name: "Option",
                          value: parseInt(item[userkey][index]["option"]),
                        };
                      } else if (index == "short") {
                        sunburst_array.children[user].children[
                          type
                        ].children = [];
                        sunburst_array.children[user].children[
                          type
                        ].children[0] = {
                          name: "Future",
                          value: parseInt(item[userkey][index]["future"]),
                        };
                        sunburst_array.children[user].children[
                          type
                        ].children[1] = {
                          name: "Option",
                          value: parseInt(item[userkey][index]["option"]),
                        };
                      } else {
                        sunburst_array.children[user].children[
                          type
                        ].children = [];
                        sunburst_array.children[user].children[
                          type
                        ].children[0] = {
                          name: "Future",
                          value: parseInt(item[userkey][index]["future"]),
                        };
                        sunburst_array.children[user].children[
                          type
                        ].children[1] = {
                          name: "Option",
                          value: parseInt(item[userkey][index]["option"]),
                        };
                      }
                    }
                  }
                  type++;
                });
                user++;
              });
              // console.log('asplsun',sunburst_array);
              arr.push(sunburst_array);
              // create a chart and set the data
              var chart123 = anychart.sunburst(arr, "as-tree");
              if (theme == "coffee") {
                chart123.palette(anychart.palettes.coffee);
              }
              // if(theme == 'default')
              // {
              chart123.background().fill("#FFFFFF 0");
              // }
              var title = chart123.title();
              title.useHtml(true);
              chart123.title(
                '<span style="color:#e06666; font-size: 12px;">' +
                  "Total view for report date " +
                  this.props.reportdate.date +
                  "</span>"
              );

              // set the calculation mode
              chart123.calculationMode("parent-independent");
              chart123.labels().position("circular");
              chart123.labels().useHtml(true);
              chart123.labels().format(function() {
                return (
                  this.name +
                  "<br>" +
                  anychart.format.number(this.value, NUMBER_FORMAT)
                );
              });
              chart123
                .labels()
                .enabled(true)
                .fontSize(14)
                .textOverflow("")
                .textShadow({
                  color: "black",
                  offsetX: "1px",
                  offsetY: "1px",
                  blurRadius: "2px",
                });
              var name = "sunburst_" + k;
              var iDiv = document.createElement("div");
              iDiv.id = name;
              if (key == "Legacy Future Option" && this.props.mekkotype == 1) {
                if (document.getElementsByClassName("first_tab").length > 0) {
                  document
                    .getElementsByClassName("first_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //     <AnyChart
                  //         id={"mekkochart2_"+k++}
                  //         width="100%"
                  //         height={600}
                  //         instance={chart123}
                  //     />
                  // </div>
                );
              } else if (
                key == "Legacy Future Only" &&
                this.props.mekkotype == 2
              ) {
                if (document.getElementsByClassName("first_tab").length > 0) {
                  document
                    .getElementsByClassName("first_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //     <AnyChart
                  //         id={"mekkochart2_"+k++}
                  //         width="100%"
                  //         height={600}
                  //         instance={chart123}
                  //     />
                  // </div>
                );
              } else if (
                key == "TFF Future Option" &&
                this.props.mekkotype == 3
              ) {
                if (document.getElementsByClassName("first_tab").length > 0) {
                  document
                    .getElementsByClassName("first_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //     <AnyChart
                  //         id={"mekkochart2_"+k++}
                  //         width="100%"
                  //         height={600}
                  //         instance={chart123}
                  //     />
                  // </div>
                );
              } else if (
                key == "TFF Future Only" &&
                this.props.mekkotype == 4
              ) {
                if (document.getElementsByClassName("first_tab").length > 0) {
                  document
                    .getElementsByClassName("first_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //     <AnyChart
                  //         id={"mekkochart2_"+k++}
                  //         width="100%"
                  //         height={600}
                  //         instance={chart123}
                  //     />
                  // </div>
                );
              } else if (
                key == "Dis. Future Option" &&
                this.props.mekkotype == 5
              ) {
                if (document.getElementsByClassName("first_tab").length > 0) {
                  document
                    .getElementsByClassName("first_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //     <AnyChart
                  //         id={"mekkochart2_"+k++}
                  //         width="100%"
                  //         height={600}
                  //         instance={chart123}
                  //     />
                  // </div>
                );
              } else if (
                key == "Dis. Future Only" &&
                this.props.mekkotype == 6
              ) {
                if (document.getElementsByClassName("first_tab").length > 0) {
                  document
                    .getElementsByClassName("first_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //     <AnyChart
                  //         id={"mekkochart2_"+k++}
                  //         width="100%"
                  //         height={600}
                  //         instance={chart123}
                  //     />
                  // </div>
                );
              }
            });
          })}
          {/* {
            Object.keys(this.props.mekko[0]).map((key)=>{
               
                this.props.mekko[0][key].map((item,index)=>{
                var array1 = [];
                
                // //sets mapping for series
                Object.keys(item).map((key)=>{
                    var data= [];
                    data.push(key);
                    Object.keys(item[key]).map((index)=>{
                        data.push(item[key][index]['value']);
                    });
                    array1.push(data);
                });
                var chart = anychart.mekko();
                var dataSet = anychart.data.set(array1);
                chart.mekko(dataSet.mapAs({'x':0,'value':1})).name('Long');
                chart.mekko(dataSet.mapAs({'x':0,'value':2})).name('Short');
                chart.mekko(dataSet.mapAs({'x':0,'value':3})).name('Spreading');
                
                var tooltip = chart.tooltip();
                tooltip.displayMode("union");
                tooltip.positionMode("chart");
                tooltip.anchor("right-top");
                tooltip.position("right-top");

                chart.background().fill("#FFFFFF 0");
                var title = chart.title();
                title.useHtml(true);
                chart.title(
                    "<span style=\"color:#e06666; font-size: 12px;\">"+
                    "Total contract for report date "+this.props.reportdate.date+"</span>"
                );
                var name = "mekko_"+j; 
                var iDiv = document.createElement('div');
                iDiv.id = name;
                if(key == "Legacy Future Option" && this.props.mekkotype ==1)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart3_"+j++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "Legacy Future Only" && this.props.mekkotype ==2)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart3_"+j++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "TFF Future Option" && this.props.mekkotype ==3)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart3_"+j++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "TFF Future Only" && this.props.mekkotype ==4)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart3_"+j++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                
                else if(key == "Dis. Future Option" && this.props.mekkotype ==5)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart3_"+j++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                else if(key == "Dis. Future Only" && this.props.mekkotype ==6)
                {
                    document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                    document.getElementById(name).innerHTML =''; 
                    chart.container(name);   
                    chart.draw(true);
                    return(
                        <div className={"cust_price_chart cust_chart_box"}>
                            <AnyChart
                                id={"mekkochart3_"+j++}
                                width="100%"
                                height={600}
                                instance={chart}
                            />
                        </div>
                        
                        )
                }
                
               })
            })

            
            
          } */}
        </div>
      );
    }

    return <div style={{ width: "100%" }}>{/* {newvar} */}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    mekkotype: state.Exchange.mekkotype,
    reportdate: state.Exchange.mekkodatadone,
    mekkodatadone: Object.keys(state.Exchange.mekkodatadone)
      .filter((mekkoDataIndex) => mekkoDataIndex == "barmekko")
      .map((mekkoDataIndex) => {
        return state.Exchange.mekkodatadone[mekkoDataIndex];
      }),
    mekko: Object.keys(state.Exchange.mekkodatadone)
      .filter((mekkoDataIndex) => mekkoDataIndex == "mekko")
      .map((mekkoDataIndex) => {
        return state.Exchange.mekkodatadone[mekkoDataIndex];
      }),
  };
};
export default connect(mapStateToProps)(MekkoChart);
