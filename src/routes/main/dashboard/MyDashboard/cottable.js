import React, {Component} from "react";
import {Col, Row, Card,Tabs,Table  } from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";

import PriceChart from "components/dashboard/MyDashboard/PriceChart";
import CotChart from "components/dashboard/MyDashboard/CotChart";
import EcinChart from "components/dashboard/MyDashboard/EcinChart";

class MyDashboard extends Component {
  
  // onChangecolormain(checked) {
  //   if(checked){
  //     chart0.background().fill("#ffd54f 0.2");
  //   }
  //   else{
  //     chart0.background().fill("#ffffff");
  //   }
  // }
  
  //  chartchange(value) {
    
  //    series.seriesType(value);

  //  }
  
  render() {
  
    const columns = [
    {
      title: 'Lable',
      dataIndex: 'lable',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'COT',
      dataIndex: 'cot',
    },
    {
      title: 'Ec. In.',
      dataIndex: 'ecin',
    },
    {
      title: 'A1',
      dataIndex: 'a1',
    },
    {
      title: 'A2',
      dataIndex: 'a2',
    },
    {
      title: 'B1',
      dataIndex: 'b1',
    },
    {
      title: 'B2',
      dataIndex: 'b2',
    },
    {
      title: 'C1',
      dataIndex: 'c1',
    },
    {
      title: 'C2',
      dataIndex: 'c2',
    },
    {
      title: 'D1',
      dataIndex: 'd1',
    },
    
  
  ];
  
  const data = [
    {
      key: '1',
      lable: 'A',
      price: '12',
      date: '08.10.17',
      cot: '550',
      ecin: '21%',
      a1:'40',
      a2:"60",
      b1:"40",
      b2:"60",
      c1:"40",
      c2:"60",
      d1:"40",
      
    },
    {
      key: '1',
      lable: 'B',
      price: '12',
      date: '08.10.17',
      cot: '550',
      ecin: '21%',
      a1:'40',
      a2:"60",
      b1:"40",
      b2:"60",
      c1:"40",
      c2:"60",
      d1:"40",
      
    },
    {
      key: '1',
      lable: 'C',
      price: '12',
      date: '08.10.17',
      cot: '550',
      ecin: '21%',
      a1:'40',
      a2:"60",
      b1:"40",
      b2:"60",
      c1:"40",
      c2:"60",
      d1:"40",
      
    }
  ];
  
  
  const TabPane = Tabs.TabPane;



  var databar = [
    ["John", 10010],
    ["Jake", 12020],
    ["Peter", 13030],
    ["James", 10040],
    ["Mary", 9090]
  ];

  var dataSet = anychart.data.set([

    ['John', 10000, 5854, 3242],
    ['Jake', 12000, 4171, 3171],
    ['James', 13000, 1375, 700],
    ['Peter', 15, 1875, 1287],
    ['Mary', 10000, 2246, 1856],
    
  ]);

  var firstSeriesData = dataSet.mapAs({x: 0, value: 1});


  var chart5 = anychart.bar();
  chart5.barGroupsPadding(0);
  chart5.bar(databar);
  chart5.spline(firstSeriesData);

  var chart7 = anychart.bar();
  chart7.barGroupsPadding(0);
  chart7.bar(databar);
  chart7.spline(firstSeriesData);


  var chart9 = anychart.bar();
  chart9.barGroupsPadding(0);
  chart9.bar(databar);
  chart9.spline(firstSeriesData);




  var splinedata = [
    {x: "January", value: 10000},
    {x: "February", value: 12000},
    {x: "March", value: 18000},
    {x: "April", value: 11000},
    {x: "May", value: 9000}
  ];

  var linedata = [
    {x: "January", value: 9000},
    {x: "February", value: 11000},
    {x: "March", value: 16000},
    {x: "April", value: 9000},
    {x: "May", value: 6000}
  ];

  var chart6 = anychart.line();
  chart6.spline(splinedata);
  chart6.spline(linedata);

  var chart8 = anychart.line();
  chart8.spline(splinedata);
  chart8.spline(linedata); 

  var chart10 = anychart.line();
  chart10.spline(splinedata);
  chart10.spline(linedata); 

  var bardata = [
    {x: "John", value: 10000},
    {x: "Jake", value: 12000},
    {x: "Peter", value: 13000},
    {x: "James", value: 10000},
    {x: "Mary", value: 9000}
  ];

  var chart11 = anychart.column();
  chart11.column(bardata);

  
  const changeOptions = (
    <ul className="gx-user-popover">
      <li 
      //  onClick={() => this.chartchange('ohlc')}
      >OHLC</li>
      
      <li 
      // onClick={() => this.chartchange('candlestick')}
      >Candle Stick Chart</li>
    </ul>
  );
        
        
         
         return (
            <div>
               {this.props.priceData.length>0 ?
            <Auxiliary>
              <Card style={{backgroundColor:'#036'}}>
                  <Row className="custom_main_chart">
                    
                    <Col lg={14}>
                          <Row>
                            <PriceChart />
                          </Row>
                          <Row> 
                              <CotChart />
                          </Row> 
                      </Col>
                      <Col lg={10}>
                      <Card className="cust_ecin_div">
                        <Widget title="Summery Of Current Report" styleName="gx-card-tabs">  
                          <Tabs defaultActiveKey="1">
                            <TabPane tab="Cot" key="1">
                            <Row>
                                <Col lg={6}>
                                  <AnyChart
                                      id="pieChart"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>  
                                    <AnyChart
                                      id="pieChart1"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart2"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart3"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col> 
                              </Row>
                            </TabPane>
                            <TabPane tab="Economic Indicator" key="2">
                            <Row>
                              <Col lg={6}>
                                  <AnyChart
                                      id="pieChart8"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>  
                                    <AnyChart
                                      id="pieChart9"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart10"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart11"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col> 
                                </Row>
                            </TabPane>
                            <TabPane  ne tab="Recession" key="3">
                            <Row>
                                <Col lg={6}>
                                  <AnyChart
                                      id="pieChart4"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>  
                                    <AnyChart
                                      id="pieChart5"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart6"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart7"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col> 
                              </Row>
                            </TabPane>
                            <TabPane tab="Technical" key="4">
                            <Row>
                                <Col lg={6}>
                                  <AnyChart
                                      id="pieChart14"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>  
                                    <AnyChart
                                      id="pieChart15"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart16"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col>    
                                <Col lg={6}>      
                                    <AnyChart
                                      id="pieChart17"
                                      width="100%"
                                      height={100}
                                      type="pie"
                                      data={[1, 2, 3, 4]}
                                      legend={false}
                                    />
                                </Col> 
                              </Row>
                            </TabPane>
                          </Tabs>
                      </Widget> 
                      </Card>
                      <Card className="cust_table">
                        <Row>
                            <Table rowKey="table_cottable" className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false} bordered={false}
                        size="small" />
                        </Row>
                      </Card>
                                
                      
                      
                     
                        <EcinChart />
                    
                      
                      

                      <Row className="ecin_chart" style={{'paddingTop':'10px'}}>
                                  <Col lg={6}>
                                    <AnyChart
                                        id="pieChart4"
                                        width="100%"
                                        height={150}
                                        type="pie"
                                        data={[1, 2, 3, 4]}
                                        legend={false}
                                      />
                                  </Col>    
                                  <Col lg={6}>  
                                      <AnyChart
                                        id="pieChart5"
                                        width="100%"
                                        height={150}
                                        type="pie"
                                        data={[1, 2, 3, 4]}
                                        legend={false}
                                      />
                                  </Col>    
                                  <Col lg={6}>      
                                      <AnyChart
                                        id="pieChart6"
                                        width="100%"
                                        height={150}
                                        type="pie"
                                        data={[1, 2, 3, 4]}
                                        legend={false}
                                      />
                                  </Col>    
                                  <Col lg={6}>      
                                      <AnyChart
                                        id="pieChart7"
                                        width="100%"
                                        height={150}
                                        type="pie"
                                        data={[1, 2, 3, 4]}
                                        legend={false}
                                      />
                                  </Col> 
                                </Row>
                    </Col>
                  </Row>
              </Card>
            </Auxiliary> 
            :<div></div>}
            </div>
          );
  }
};

const mapStateToProps =  state => {
  
  return {
    priceData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_search').map((priceDataIndex)=>{
      return state.Exchange.priceData[priceDataIndex];
    }),
      tickerData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_details').map((priceDataIndex)=>{
        return state.Exchange.priceData[priceDataIndex];
  }),
  }
};
export default connect(mapStateToProps)(MyDashboard);
