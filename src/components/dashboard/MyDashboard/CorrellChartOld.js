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

class CorrellChart extends Component {
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
      console.log("MEKKO =>", this.props.mekko);

      newvar = (
        <div>
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
                if (document.getElementsByClassName("second_tab").length > 0) {
                  document
                    .getElementsByClassName("second_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return <div id={"mekkochart2_" + k++}></div>;
              } else if (
                key == "Legacy Future Only" &&
                this.props.mekkotype == 2
              ) {
                if (document.getElementsByClassName("second_tab").length > 0) {
                  document
                    .getElementsByClassName("second_tab")[0]
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
                if (document.getElementsByClassName("second_tab").length > 0) {
                  document
                    .getElementsByClassName("second_tab")[0]
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
                if (document.getElementsByClassName("second_tab").length > 0) {
                  document
                    .getElementsByClassName("second_tab")[0]
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
                if (document.getElementsByClassName("second_tab").length > 0) {
                  document
                    .getElementsByClassName("second_tab")[0]
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
                if (document.getElementsByClassName("second_tab").length > 0) {
                  document
                    .getElementsByClassName("second_tab")[0]
                    .appendChild(iDiv);
                  document.getElementById(name).innerHTML = "";
                  document.getElementById(name).style.height = "500px";
                  chart123.container(name);
                  chart123.draw();
                }
                return (
                  <div id={"mekkochart2_" + k++}></div>
                  // <div className={"cust_price_chart cust_chart_box"}>
                  //   <AnyChart
                  //     id={"mekkochart2_" + k++}
                  //     width="100%"
                  //     height={600}
                  //     instance={chart123}
                  //   />
                  // </div>
                );
              }
            });
          })}
        </div>
      );
    }

    return <div style={{ width: "100%" }}> {newvar} </div>;
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
export default connect(mapStateToProps)(CorrellChart);
