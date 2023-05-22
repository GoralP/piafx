import React, {Component} from "react";
import {Col, Row, Card,Tabs,Table,Slider} from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import {connect} from "react-redux";
import PriceChartMain from "components/dashboard/MyDashboard/PriceChartMain";
import NZLC from "components/dashboard/MyDashboard/NZLC";
import OiperTicker from "components/dashboard/MyDashboard/OiperTicker";
import PriceperTicker from "components/dashboard/MyDashboard/PriceperTicker";
import PriceperTickerMin from "components/dashboard/MyDashboard/PriceperTickerMin";
import NetMovement from "components/dashboard/MyDashboard/NetMovement";
import Oimovers from "components/dashboard/MyDashboard/Oimovers";
import PriceMovers from "components/dashboard/MyDashboard/PriceMovers";
import LegacyScan from "components/dashboard/MyDashboard/LegacyScan";
import {gettopoimovers,getoiperticker,getmostviewedticker} from "appRedux/actions/Exchange";
const TabPane = Tabs.TabPane;
class Main extends Component {
  
  state = {
    inputValue: 1,
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  componentWillMount()
    {
      var user_id = localStorage.getItem('user_id');
      this.props.getmostviewedticker({'user_id':user_id})
      this.props.gettopoimovers();
      this.props.getoiperticker();
    }
  render() {
    const columns = [
        {
          title: 'Rank',
          dataIndex: 'rank',
        },
        {
          title: 'Ticker Code',
          dataIndex: 'ticker_code',
        },
        {
          title: 'Contract',
          dataIndex: 'contract',
        },
        {
          title: 'Value',
          dataIndex: 'value',
          render: (text) => {
            return text>250?<span className="extreme-high">{text+'%'}</span>:<span>{text+'%'}</span>
          },
        },
    ];
    const netcolumns = [
        {
          title: 'Rank',
          dataIndex: 'rank',
        },
        {
          title: 'Ticker Code',
          dataIndex: 'ticker_code',
        },
        {
          title: 'Value',
          dataIndex: 'value',
        },
    ];
    const nzlccolumns = [
        // {
        //   title: 'Rank',
        //   dataIndex: 'rank',
        // },
        {
            title: 'Ticker Code',
            dataIndex: 'ticker_code',
        },
        {
            title: 'From',
            dataIndex: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
        },
        {
          title: 'Value',
          dataIndex: 'value',
        },
    ];
    const columnsoiperticker = [
        {
          title: 'Ticker Code',
          dataIndex: 'ticker_code',
        },
        {
          title: 'Max Index',
          dataIndex: 'index',
        },
    ];
    var year20 = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year20).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year20'][key]+'%'
            }
           
           year20.push(da);
           j++;
      });
    }
    var year10 = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year10).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year10'][key]+'%'
            }
           
           year10.push(da);
           j++;
      });
    }
    var year5 = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year5).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year5'][key]+'%'
            }
           
           year5.push(da);
           j++;
      });
    }
    var year3 = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year3).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year3'][key]+'%'
            }
           
           year3.push(da);
           j++;
      });
    }
    var year1 = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year1).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year1'][key]+'%'
            }
           
           year1.push(da);
           j++;
      });
    }
    var month6 = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.month6).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['month6'][key]+'%'
            }
           
           month6.push(da);
           j++;
      });
    }

    var year20price = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year20price).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year20price'][key]+'%'
            }
           
           year20price.push(da);
           j++;
      });
    }
    var year10price = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year10price).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year10price'][key]+'%'
            }
           
           year10price.push(da);
           j++;
      });
    }
    var year5price = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year5price).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year5price'][key]+'%'
            }
           
           year5price.push(da);
           j++;
      });
    }
    var year3price = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year3price).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year3price'][key]+'%'
            }
           
           year3price.push(da);
           j++;
      });
    }
    var year1price = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.year1price).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['year1price'][key]+'%'
            }
           
           year1price.push(da);
           j++;
      });
    }
    var month6price = []; 
    if(this.props.oiperticker!='')
    {
        var j = 1;
        Object.keys(this.props.oiperticker.month6price).map((key)=>{
           var da = 
            { 
            ticker_code : key,
            index : this.props.oiperticker['month6price'][key]+'%'
            }
           
           month6price.push(da);
           j++;
      });
    }

    var com_nzlcdata = []; 
    if(this.props.nzlc.length>0)
    {
      if(this.props.nzlc[0].length>0)
      {
        var j = 1;
        var com_nzlc = JSON.parse(this.props.nzlc[0][0].com_ticker);
        Object.keys(com_nzlc).map((key)=>{
           var da = 
            { 
                // rank: j,
                ticker_code : key,
                from : com_nzlc[key]['previous'],
                to : com_nzlc[key]['current'],
                value : com_nzlc[key]['value']+'%',
            }
           
            com_nzlcdata.push(da);
           j++;
      });
      }
    }

    var non_nzlcdata = []; 
    if(this.props.nzlc.length>0)
    {
      if(this.props.nzlc[0].length>0)
      {
        var j = 1;
        var non_nzlc = JSON.parse(this.props.nzlc[0][0].non_ticker);
        Object.keys(non_nzlc).map((key)=>{
           var da = 
            { 
                // rank: j,
                ticker_code : key,
                from : non_nzlc[key]['previous'],
                to : non_nzlc[key]['current'],
                value : non_nzlc[key]['value']+'%',
            }
           
            non_nzlcdata.push(da);
           j++;
      });
      }
    }
    // const pertickerdata = d
    var oidata = []; 
    if(this.props.getoimovers.length>0)
    {
    if(this.props.getoimovers[0].length>0)
    {
        var j = 1;
        var tickerarray = JSON.parse(this.props.getoimovers[0][0].tickerarray);
        Object.keys(tickerarray).map((key)=>{
           var da = 
            { 
                // rank: j,
                rank : j,
                ticker_code : key,
                contract : tickerarray[key]['name'],
                value : tickerarray[key]['value'],
            }
           
            oidata.push(da);
           j++;
        });
    }  
    }
    var topcomnetdata = []; 
    if(this.props.topnet.length>0)
    {
    if(this.props.topnet[0].length>0)
    {
        topcomnetdata =
        [ 
            { 
                rank : '1',
                ticker_code : this.props.topnet[0][0].comticker_1,
                value : this.props.topnet[0][0].comticker_value_1+'%',
            },
            { 
                rank : '2',
                ticker_code : this.props.topnet[0][0].comticker_2,
                value : this.props.topnet[0][0].comticker_value_2+'%',
            },
            { 
                rank : '3',
                ticker_code : this.props.topnet[0][0].comticker_3,
                value : this.props.topnet[0][0].comticker_value_3+'%',
            },
            { 
                rank : '4',
                ticker_code : this.props.topnet[0][0].comticker_4,
                value : this.props.topnet[0][0].comticker_value_4+'%',
            },
            { 
                rank : '5',
                ticker_code : this.props.topnet[0][0].comticker_5,
                value : this.props.topnet[0][0].comticker_value_5+'%',
            },
            { 
                rank : '6',
                ticker_code : this.props.topnet[0][0].comticker_6,
                value : this.props.topnet[0][0].comticker_value_6+'%',
            },
            { 
                rank : '7',
                ticker_code : this.props.topnet[0][0].comticker_7,
                value : this.props.topnet[0][0].comticker_value_7+'%',
            },
            { 
                rank : '8',
                ticker_code : this.props.topnet[0][0].comticker_8,
                value : this.props.topnet[0][0].comticker_value_8+'%',
            },
            { 
                rank : '9',
                ticker_code : this.props.topnet[0][0].comticker_9,
                value : this.props.topnet[0][0].comticker_value_9+'%',
            },
            { 
                rank : '10',
                ticker_code : this.props.topnet[0][0].comticker_10,
                value : this.props.topnet[0][0].comticker_value_10+'%',
            }
        ]
    }  
    }

    var topnonnetdata = []; 
    if(this.props.topnet.length>0)
    {
    if(this.props.topnet[0].length>0)
    {
        topnonnetdata =
        [ 
            { 
                rank : '1',
                ticker_code : this.props.topnet[0][0].noncomticker_1,
                value : this.props.topnet[0][0].noncomticker_value_1+'%',
            },
            { 
                rank : '2',
                ticker_code : this.props.topnet[0][0].noncomticker_2,
                value : this.props.topnet[0][0].noncomticker_value_2+'%',
            },
            { 
                rank : '3',
                ticker_code : this.props.topnet[0][0].noncomticker_3,
                value : this.props.topnet[0][0].noncomticker_value_3+'%',
            },
            { 
                rank : '4',
                ticker_code : this.props.topnet[0][0].noncomticker_4,
                value : this.props.topnet[0][0].noncomticker_value_4+'%',
            },
            { 
                rank : '5',
                ticker_code : this.props.topnet[0][0].noncomticker_5,
                value : this.props.topnet[0][0].noncomticker_value_5+'%',
            },
            { 
                rank : '6',
                ticker_code : this.props.topnet[0][0].noncomticker_6,
                value : this.props.topnet[0][0].noncomticker_value_6+'%',
            },
            { 
                rank : '7',
                ticker_code : this.props.topnet[0][0].noncomticker_7,
                value : this.props.topnet[0][0].noncomticker_value_7+'%',
            },
            { 
                rank : '8',
                ticker_code : this.props.topnet[0][0].noncomticker_8,
                value : this.props.topnet[0][0].noncomticker_value_8+'%',
            },
            { 
                rank : '9',
                ticker_code : this.props.topnet[0][0].noncomticker_9,
                value : this.props.topnet[0][0].noncomticker_value_9+'%',
            },
            { 
                rank : '10',
                ticker_code : this.props.topnet[0][0].noncomticker_10,
                value : this.props.topnet[0][0].noncomticker_value_10+'%',
            },
        ]
    }  
    }
    var lowcomnetdata = []; 
    if(this.props.lownet.length>0)
    {
    if(this.props.lownet[0].length>0)
    {
        lowcomnetdata =
        [ 
            { 
                rank : '1',
                ticker_code : this.props.lownet[0][0].comticker_1,
                value : this.props.lownet[0][0].comticker_value_1+'%',
            },
            { 
                rank : '2',
                ticker_code : this.props.lownet[0][0].comticker_2,
                value : this.props.lownet[0][0].comticker_value_2+'%',
            },
            { 
                rank : '3',
                ticker_code : this.props.lownet[0][0].comticker_3,
                value : this.props.lownet[0][0].comticker_value_3+'%',
            },
            { 
                rank : '4',
                ticker_code : this.props.lownet[0][0].comticker_4,
                value : this.props.lownet[0][0].comticker_value_4+'%',
            },
            { 
                rank : '5',
                ticker_code : this.props.lownet[0][0].comticker_5,
                value : this.props.lownet[0][0].comticker_value_5+'%',
            },
            { 
                rank : '6',
                ticker_code : this.props.lownet[0][0].comticker_6,
                value : this.props.lownet[0][0].comticker_value_6+'%',
            },
            { 
                rank : '7',
                ticker_code : this.props.lownet[0][0].comticker_7,
                value : this.props.lownet[0][0].comticker_value_7+'%',
            },
            { 
                rank : '8',
                ticker_code : this.props.lownet[0][0].comticker_8,
                value : this.props.lownet[0][0].comticker_value_8+'%',
            },
            { 
                rank : '9',
                ticker_code : this.props.lownet[0][0].comticker_9,
                value : this.props.lownet[0][0].comticker_value_9+'%',
            },
            { 
                rank : '10',
                ticker_code : this.props.lownet[0][0].comticker_10,
                value : this.props.lownet[0][0].comticker_value_10+'%',
            }
        ]
    }  
    }

    var lownonnetdata = []; 
    if(this.props.lownet.length>0)
    {
    if(this.props.lownet[0].length>0)
    {
        lownonnetdata =
        [ 
            { 
                rank : '1',
                ticker_code : this.props.lownet[0][0].noncomticker_1,
                value : this.props.lownet[0][0].noncomticker_value_1+'%',
            },
            { 
                rank : '2',
                ticker_code : this.props.lownet[0][0].noncomticker_2,
                value : this.props.lownet[0][0].noncomticker_value_2+'%',
            },
            { 
                rank : '3',
                ticker_code : this.props.lownet[0][0].noncomticker_3,
                value : this.props.lownet[0][0].noncomticker_value_3+'%',
            },
            { 
                rank : '4',
                ticker_code : this.props.lownet[0][0].noncomticker_4,
                value : this.props.lownet[0][0].noncomticker_value_4+'%',
            },
            { 
                rank : '5',
                ticker_code : this.props.lownet[0][0].noncomticker_5,
                value : this.props.lownet[0][0].noncomticker_value_5+'%',
            },
            { 
                rank : '6',
                ticker_code : this.props.lownet[0][0].noncomticker_6,
                value : this.props.lownet[0][0].noncomticker_value_6+'%',
            },
            { 
                rank : '7',
                ticker_code : this.props.lownet[0][0].noncomticker_7,
                value : this.props.lownet[0][0].noncomticker_value_7+'%',
            },
            { 
                rank : '8',
                ticker_code : this.props.lownet[0][0].noncomticker_8,
                value : this.props.lownet[0][0].noncomticker_value_8+'%',
            },
            { 
                rank : '9',
                ticker_code : this.props.lownet[0][0].noncomticker_9,
                value : this.props.lownet[0][0].noncomticker_value_9+'%',
            },
            { 
                rank : '10',
                ticker_code : this.props.lownet[0][0].noncomticker_10,
                value : this.props.lownet[0][0].noncomticker_value_10+'%',
            }
        ]
    }  
    }
    var toppricedata = []; 
  if(this.props.gettoppricemovers.length>0)
  {
  if(this.props.gettoppricemovers[0].length>0)
  {
    toppricedata =
      [ 
          { 
              rank : '1',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_1,
              contract : this.props.gettoppricemovers[0][0].tickername_1,
              value : this.props.gettoppricemovers[0][0].ticker_value_1+'%',
          },
          { 
              rank : '2',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_2,
              contract : this.props.gettoppricemovers[0][0].tickername_2,
              value : this.props.gettoppricemovers[0][0].ticker_value_2+'%',
          },
          { 
              rank : '3',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_3,
              contract : this.props.gettoppricemovers[0][0].tickername_3,
              value : this.props.gettoppricemovers[0][0].ticker_value_3+'%',
          },
          { 
              rank : '4',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_4,
              contract : this.props.gettoppricemovers[0][0].tickername_4,
              value : this.props.gettoppricemovers[0][0].ticker_value_4+'%',
          },
          { 
              rank : '5',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_5,
              contract : this.props.gettoppricemovers[0][0].tickername_5,
              value : this.props.gettoppricemovers[0][0].ticker_value_5+'%',
          },
          { 
              rank : '6',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_6,
              contract : this.props.gettoppricemovers[0][0].tickername_6,
              value : this.props.gettoppricemovers[0][0].ticker_value_6+'%',
          },
          { 
              rank : '7',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_7,
              contract : this.props.gettoppricemovers[0][0].tickername_7,
              value : this.props.gettoppricemovers[0][0].ticker_value_7+'%',
          },
          { 
              rank : '8',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_8,
              contract : this.props.gettoppricemovers[0][0].tickername_8,
              value : this.props.gettoppricemovers[0][0].ticker_value_8+'%',
          },
          { 
              rank : '9',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_9,
              contract : this.props.gettoppricemovers[0][0].tickername_9,
              value : this.props.gettoppricemovers[0][0].ticker_value_9+'%',
          },
          { 
              rank : '10',
              ticker_code : this.props.gettoppricemovers[0][0].ticker_10,
              contract : this.props.gettoppricemovers[0][0].tickername_10,
              value : this.props.gettoppricemovers[0][0].ticker_value_10+'%',
          },
      ]
  }  
  }

  var lowpricedata = []; 
if(this.props.getlowpricemovers.length>0)
{
if(this.props.getlowpricemovers[0].length>0)
{
  lowpricedata =
    [ 
        { 
            rank : '1',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_1,
            contract : this.props.getlowpricemovers[0][0].tickername_1,
            value : this.props.getlowpricemovers[0][0].ticker_value_1+'%',
        },
        { 
            rank : '2',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_2,
            contract : this.props.getlowpricemovers[0][0].tickername_2,
            value : this.props.getlowpricemovers[0][0].ticker_value_2+'%',
        },
        { 
            rank : '3',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_3,
            contract : this.props.getlowpricemovers[0][0].tickername_3,
            value : this.props.getlowpricemovers[0][0].ticker_value_3+'%',
        },
        { 
            rank : '4',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_4,
            contract : this.props.getlowpricemovers[0][0].tickername_4,
            value : this.props.getlowpricemovers[0][0].ticker_value_4+'%',
        },
        { 
            rank : '5',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_5,
            contract : this.props.getlowpricemovers[0][0].tickername_5,
            value : this.props.getlowpricemovers[0][0].ticker_value_5+'%',
        },
        { 
            rank : '6',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_6,
            contract : this.props.getlowpricemovers[0][0].tickername_6,
            value : this.props.getlowpricemovers[0][0].ticker_value_6+'%',
        },
        { 
            rank : '7',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_7,
            contract : this.props.getlowpricemovers[0][0].tickername_7,
            value : this.props.getlowpricemovers[0][0].ticker_value_7+'%',
        },
        { 
            rank : '8',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_8,
            contract : this.props.getlowpricemovers[0][0].tickername_8,
            value : this.props.getlowpricemovers[0][0].ticker_value_8+'%',
        },
        { 
            rank : '9',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_9,
            contract : this.props.getlowpricemovers[0][0].tickername_9,
            value : this.props.getlowpricemovers[0][0].ticker_value_9+'%',
        },
        { 
            rank : '10',
            ticker_code : this.props.getlowpricemovers[0][0].ticker_10,
            contract : this.props.getlowpricemovers[0][0].tickername_10,
            value : this.props.getlowpricemovers[0][0].ticker_value_10+'%',
        },
    ]
}  
}
    return (
        <div>
        <Auxiliary>
            <Card className = "dash_background">
                <Row className="custom_main_chart">
                    <Col lg={12} className="cust_ecin_div cust-tab-font">
                        <Widget title="" styleName="Scan_tabs gx-card-tabs">  
                            <Tabs defaultActiveKey="1" className="cust-tab-margin">
                                <TabPane tab="PTOIMAX" key="1" className="">
                                    <OiperTicker />
                                </TabPane>
                                <TabPane tab="PTPMAX" key="2" className="">
                                    <PriceperTicker />
                                </TabPane>
                                <TabPane tab="PTPMIN" key="3" className="">
                                    <PriceperTickerMin />
                                </TabPane>
                            </Tabs>
                        </Widget>
                    </Col>
                    
                    <Col lg={12}>
                        <PriceChartMain />
                    </Col>
                </Row>
                <Row className="custom_main_chart">
                    <Col lg={12}>
                        <NetMovement />
                    </Col>
                    <Col lg={12}>
                        <NZLC />
                    </Col>
                </Row>
                <Row className="custom_main_chart">
                    <Col lg={12}>
                    <Card title="Top OI Movers" className="main_card">
                        <Table className="gx-table-no-bordered main_table" columns={columns} dataSource={oidata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Col>
                    <Col lg={12}>
                        <PriceMovers />
                    </Col>
                </Row>
                <Row className="custom_main_chart">
                    <Col lg={12}>
                    <LegacyScan />
                    </Col>
                    {/* <Col lg={12}>
                    </Col> */}
                </Row>
                {/* <Row className="custom_main_chart">
                    <Col lg={12}>
                        <PriceperTickerMin />
                    </Col>
                    <Col lg={12}>
                        <PriceperTicker />
                    </Col>
                </Row> */}
                {/* <PriceChartMain /> */}
                {/* <Row className="custom_main_chart">
                <Col lg={6}>
                    <Row>
                    <Card title="Top 10 OI Movers">
                        <Table className="gx-table-no-bordered" columns={columns} dataSource={oidata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                    <Card title="Top 10 Price Movers">
                        <Table className="gx-table-no-bordered" columns={columns} dataSource={toppricedata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                    <Card title="Lowest 10 Price Movers">
                        <Table className="gx-table-no-bordered" columns={columns} dataSource={lowpricedata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                </Row>*/}
                {/* <Row className="custom_main_chart">
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP OI in 20 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year20} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP OI in 10 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year10} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP OI in 5 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year5} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP OI in 3 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year3} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP OI in 1 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year1} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP OI in 6 months">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={month6} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                </Row> */}

                {/* <Row className="custom_main_chart">
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP Price in 20 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year20price} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP Price in 10 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year10price} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP Price in 5 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year5price} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP Price in 3 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year3price} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP Price in 1 years">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={year1price} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Row>
                        <Card title="TOP Price in 6 months">
                            <Table className="gx-table-no-bordered" columns={columnsoiperticker} dataSource={month6price} pagination={false} bordered={false} size="small" />
                        </Card>
                        </Row>
                    </Col>
                </Row> */}

                {/* <Row className="custom_main_chart">
                <Col lg={6}>
                    <Row>
                    <Card title="Top 5 Commercial Net Movement">
                        <Table className="gx-table-no-bordered" columns={netcolumns} dataSource={topcomnetdata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                    <Card title="Top 5 Non-Commercial Net Movement">
                        <Table className="gx-table-no-bordered" columns={netcolumns} dataSource={topnonnetdata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                    <Card title="Lowest 5 Commercial Net Movement">
                        <Table className="gx-table-no-bordered" columns={netcolumns} dataSource={lowcomnetdata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                    <Card title="Lowest 5 Non-Commercial Net Movement">
                        <Table className="gx-table-no-bordered" columns={netcolumns} dataSource={lownonnetdata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                </Row>  */}
                {/* <Row className="custom_main_chart">
                <Col lg={6}>
                    <Row>
                    <Card title="Commercial 0 line cross">
                        <Table className="gx-table-no-bordered" columns={nzlccolumns} dataSource={com_nzlcdata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                    <Card title="Non commercial 0 line cross">
                        <Table className="gx-table-no-bordered" columns={nzlccolumns} dataSource={non_nzlcdata} pagination={false} bordered={false} size="small" />
                    </Card>
                    </Row>
                </Col>
                </Row> */}
            </Card>
        </Auxiliary> 
        </div>
    );
  }
};
const mapStateToProps =  state => {
  return {
    oiperticker : state.Exchange.getoiperticker,
    getoimovers: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'top_oi_movers').map((priceDataIndex)=>{
      return state.Exchange.getoimovers[priceDataIndex];
    }),
    gettoppricemovers: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'top_price_movers').map((priceDataIndex)=>{
      return state.Exchange.getoimovers[priceDataIndex];
    }),
    getlowpricemovers: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'low_price_movers').map((priceDataIndex)=>{
      return state.Exchange.getoimovers[priceDataIndex];
    }),
    topnet: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'top_net').map((priceDataIndex)=>{
        return state.Exchange.getoimovers[priceDataIndex];
    }),
    lownet: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'low_net').map((priceDataIndex)=>{
        return state.Exchange.getoimovers[priceDataIndex];
    }),
    nzlc: Object.keys(state.Exchange.getoimovers).filter(priceDataIndex => priceDataIndex == 'nzlc').map((priceDataIndex)=>{
        return state.Exchange.getoimovers[priceDataIndex];
    }),
  }
};
export default connect(mapStateToProps,{gettopoimovers,getoiperticker,getmostviewedticker})(Main);
