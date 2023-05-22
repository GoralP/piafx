import React, {Component} from "react";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";

class CotChart extends Component {
    render() {
        var i = 1;
        var j = 1;
        var k = 1;
        var newvar = <div></div>
        if(this.props.mekkodatadone != ''){
   
          newvar = <div>
             
           { Object.keys(this.props.mekkodatadone[0]).map((key)=>{
               
                this.props.mekkodatadone[0][key].map((item,index)=>{
                var array1 = [];
                var dataSet = anychart.data.set(item);
                var net = 0;
                Object.keys(item).map((key)=>{
                     array1.push({'x': key, 'value': item[key]});
                     net += Math.abs(item[key]);
                });
                var arr = array1.sort(function(a,b) {
                    return b['value'] - a['value'];
                });
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
                    "Report of "+this.props.reportdate.date+"</span>"
                );
                
                var name = "barmekko_"+i; 
                var iDiv = document.createElement('div');
                iDiv.id = name;
                //initiate chart drawing
                if(this.props.mekkotype){
                    if(key=='legacy_future_option'||key=='dis_future_option'||key=='tff_future_option')
                    {
                        //set container id for the chart
                        
                        if(key == "tff_future_option")
                        {
                            document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "dis_future_option")
                        {
                            document.getElementsByClassName('third_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "legacy_future_option")
                        {
                            document.getElementsByClassName('first_tab')[0].appendChild(iDiv);
                        }
                        document.getElementById(name).innerHTML =''; 
                        chart.container(name);   
                        chart.draw();
                        return(
                            <div className={"cust_price_chart cust_chart_box"}>
                              <AnyChart
                                  id={"mekkochart_"+i++}
                                  width="100%"
                                  height={600}
                                  instance={chart}
                              />
                          </div>
                          
                          )
                         
                    }
                }
                else
                {
                    if(key=='legacy_future_only'||key=='dis_future_only'||key=='tff_future_only')
                    {
                        //set container id for the chart
                        if(key == "tff_future_only" )
                        {
                            document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "dis_future_only")
                        {
                            document.getElementsByClassName('third_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "legacy_future_only")
                        {
                            document.getElementsByClassName('first_tab')[0].appendChild(iDiv);
                        }
                        document.getElementById(name).innerHTML =''; 
                        chart.container(name);   
                        chart.draw();
                        return(
                            <div className={"cust_price_chart cust_chart_box"}>
                              <AnyChart
                                  id={"mekkochart_"+i++}
                                  width="100%"
                                  height={600}
                                  instance={chart}
                              />
                          </div>
                          
                          )
                    }
                    
                }
                
               })
            
                // } 
            })
            }
            {
            Object.keys(this.props.mekko[0]).map((key,l)=>{
               var user = 0;
                this.props.mekko[0][key].map((item,index)=>{
                    var arr = [];
                    var sunburst_array = {'name':key}; 
                    Object.keys(item).map((userkey)=>{
                        var type = 0;   
                        var data= {'name':userkey};
                        if(Array.isArray(sunburst_array.children)){
                            sunburst_array.children[user]=data;
                          }
                          else{
                            sunburst_array.children = [];
                            sunburst_array.children[user]=data;
                          }
                        Object.keys(item[userkey]).map((index)=>{
                            var data= {'name':index,value: parseInt(item[userkey][index]['value'])};
                            if(Array.isArray(sunburst_array.children[user].children)){
                                sunburst_array.children[user].children[type]=data;
                              }
                              else
                              {
                                sunburst_array.children[user].children = [];
                                sunburst_array.children[user].children[type]=data;
                              }
                              if(key == 'tff_future_option' || key == 'dis_future_option' || key == 'legacy_future_option')
                              {
                                var data= {'name':index};
                                if(Array.isArray(sunburst_array.children[user].children)){
                                    sunburst_array.children[user].children[type]=data;
                                  }
                                  else
                                  {
                                    sunburst_array.children[user].children = [];
                                    sunburst_array.children[user].children[type]=data;
                                  }
                                  if(Array.isArray(sunburst_array.children[user].children[type].children)){
                                    sunburst_array.children[user].children[type].children[0]={'name':'future',value: parseInt(item[userkey][index]['future'])};
                                    sunburst_array.children[user].children[type].children[1]={'name':'option',value: parseInt(item[userkey][index]['option'])};
                                  }
                                  else
                                  {
                                    sunburst_array.children[user].children[type].children = [];
                                    sunburst_array.children[user].children[type].children[0]={'name':'future',value: parseInt(item[userkey][index]['future'])};
                                    sunburst_array.children[user].children[type].children[1]={'name':'option',value: parseInt(item[userkey][index]['option'])};
                                  }  
                              }
                            type++;
                        });
                        user++;
                    });
                    arr.push(sunburst_array)
                     // create a chart and set the data
                    var chart = anychart.sunburst(arr, "as-tree");
                    chart.background().fill("#FFFFFF 0");
                    var title = chart.title();
                    title.useHtml(true);
                    chart.title(
                        "<span style=\"color:#e06666; font-size: 12px;\">"+
                        "Report of "+this.props.reportdate.date+"</span>"
                    );

                    // set the calculation mode
                    chart.calculationMode("parent-independent");
                    chart.labels().position("circular");

                    var name = "sunburst_"+k; 
                    var iDiv = document.createElement('div');
                    iDiv.id = name;
                    if(this.props.mekkotype){
                        if(key=='legacy_future_option'||key=='dis_future_option'||key=='tff_future_option')
                        {
                            if(key == "tff_future_option")
                            {
                                document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                            }
                            else if(key == "dis_future_option")
                            {
                                document.getElementsByClassName('third_tab')[0].appendChild(iDiv);
                            }
                            else if(key == "legacy_future_option")
                            {
                                document.getElementsByClassName('first_tab')[0].appendChild(iDiv);
                            }
                            document.getElementById(name).innerHTML =''; 
                            document.getElementById(name).style.height = "250px";
                            chart.container(name);   
                            chart.draw();
                            return(
                                <div className={"cust_price_chart cust_chart_box"}>
                                  <AnyChart
                                      id={"mekkochart_"+i++}
                                      width="100%"
                                      height={600}
                                      instance={chart}
                                  />
                              </div>
                              
                              )
                             
                        }
                    }
                    else
                    {
                        if(key=='legacy_future_only'||key=='dis_future_only'||key=='tff_future_only')
                        {
                            if(key == "tff_future_only" )
                            {
                                document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                            }
                            else if(key == "dis_future_only")
                            {
                                document.getElementsByClassName('third_tab')[0].appendChild(iDiv);
                            }
                            else if(key == "legacy_future_only")
                            {
                                document.getElementsByClassName('first_tab')[0].appendChild(iDiv);
                            }
                            document.getElementById(name).innerHTML =''; 
                            document.getElementById(name).style.height = "250px";
                            chart.container(name);   
                            chart.draw();
                            return(
                                <div className={"cust_price_chart cust_chart_box"}>
                                  <AnyChart
                                      id={"mekkochart_"+i++}
                                      width="100%"
                                      height={600}
                                      instance={chart}
                                  />
                              </div>
                              
                              )
                        }
                        
                    }

                });
            })
          }
            {
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
                    "Report of "+this.props.reportdate.date+"</span>"
                );
                var name = "mekko_"+j; 
                var iDiv = document.createElement('div');
                iDiv.id = name;
                if(this.props.mekkotype){
                    if(key=='legacy_future_option'||key=='dis_future_option'||key=='tff_future_option')
                    {
                        if(key == "tff_future_option")
                        {
                            document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "dis_future_option")
                        {
                            document.getElementsByClassName('third_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "legacy_future_option")
                        {
                            document.getElementsByClassName('first_tab')[0].appendChild(iDiv);
                        }
                        document.getElementById(name).innerHTML =''; 
                        chart.container(name);   
                        chart.draw();
                        return(
                            <div className={"cust_price_chart cust_chart_box"}>
                              <AnyChart
                                  id={"mekkochart_"+i++}
                                  width="100%"
                                  height={600}
                                  instance={chart}
                              />
                          </div>
                          
                          )
                         
                    }
                }
                else
                {
                    if(key=='legacy_future_only'||key=='dis_future_only'||key=='tff_future_only')
                    {
                        if(key == "tff_future_only" )
                        {
                            document.getElementsByClassName('second_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "dis_future_only")
                        {
                            document.getElementsByClassName('third_tab')[0].appendChild(iDiv);
                        }
                        else if(key == "legacy_future_only")
                        {
                            document.getElementsByClassName('first_tab')[0].appendChild(iDiv);
                        }
                        document.getElementById(name).innerHTML =''; 
                        chart.container(name);   
                        chart.draw();
                        return(
                            <div className={"cust_price_chart cust_chart_box"}>
                              <AnyChart
                                  id={"mekkochart_"+i++}
                                  width="100%"
                                  height={600}
                                  instance={chart}
                              />
                          </div>
                          
                          )
                    }
                    
                }
               })
            })

            
            
          }
          
          </div>  
        }    
        
        return (
            <div style={{"width":"100%"}}>
                {/* {newvar} */}
            </div>
        );
    }
};

const mapStateToProps =  state => {
    return {
        mekkotype : state.Exchange.mekkotype,
        reportdate : state.Exchange.mekkodatadone,
        mekkodatadone: Object.keys(state.Exchange.mekkodatadone).filter(mekkoDataIndex => mekkoDataIndex == 'barmekko').map((mekkoDataIndex)=>{
            return state.Exchange.mekkodatadone[mekkoDataIndex];
        }),
        mekko: Object.keys(state.Exchange.mekkodatadone).filter(mekkoDataIndex => mekkoDataIndex == 'mekko').map((mekkoDataIndex)=>{
            return state.Exchange.mekkodatadone[mekkoDataIndex];
        }),
    }
  };
  export default connect(mapStateToProps)(CotChart);
