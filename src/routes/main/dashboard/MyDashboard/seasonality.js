import React, {Component,PureComponent} from "react";
import {Col, Row, Card,Tabs,Table,Modal,Menu,Popover,Dropdown,Button,Icon} from "antd";
import Widget from "components/Widget";
import ReactStickies from 'react-stickies';
import Auxiliary from "util/Auxiliary";
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import {connect} from "react-redux";
import SubMenu from "antd/lib/menu/SubMenu";
import {tableblank,mekkotype,savenotes,savetable,getPricedata , getnotes,calldacm ,gettable,loaderstatus,savestatus} from "appRedux/actions/Exchange";
import CircularProgress from "components/CircularProgress";
import SeasonalityW from "components/dashboard/MyDashboard/SeasonalityW";
import SeasonalityM from "components/dashboard/MyDashboard/SeasonalityM";
import PriceAI from "components/dashboard/MyDashboard/PriceAI";
class seasonality extends PureComponent {
  
  
  state = {
    inputValue: 1,
    notesvisible: false,
    notes: [],
    isFull:false,
  };
  componentWillMount(){
    if(this.props.location.state){
        let ticker_id = this.props.location.state.ticker;
        //  console.log('asplticker',ticker_id);
        if (ticker_id == "undefined" || ticker_id == "" || ticker_id == null) {
          // alert('Hi');
        }
        else
        {
          this.props.loaderstatus(true);
          localStorage.setItem('ticker_code',ticker_id);
          this.setState({
            exchange: ticker_id,
          });
          var reqvar = { selectedExchange : ticker_id }
          this.props.getPricedata(reqvar);
          var user_id = localStorage.getItem('user_id');
          this.props.getnotes({'user_id':user_id,'ticker_id':ticker_id})
          this.props.gettable({'user_id':user_id,'ticker_id':ticker_id})
        }
    }
  }
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  onnoteChange = (notes) => {
    // console.log('asplnotes',notes);
    this.setState({ // Update the notes state
      notes
    })
  }
  notesdisplay = () => {
    this.setState({ // Update the notes state
      notesvisible:true
    })
  }
  noteshide = () => {
    const note = this.state.notes;
    note.map(note => {
      delete note.editorState;
    })
    var user_id = localStorage.getItem('user_id');
    var ticker_code = localStorage.getItem('ticker_code');
    var data={user_id:user_id,ticker_id:ticker_code,notes:note};
    this.props.savenotes(data)
  }
  render() {
    if(this.props.calldacm1)
    {
      const note = this.state.notes;
      note.map(note => {
        delete note.editorState;
      })
      var user_id = localStorage.getItem('user_id');
      var ticker_code = localStorage.getItem('ticker_code');
      var ecin = this.props.selectedEcin;
      var cot = this.props.selectedGRAPH;
      var ti = this.props.sapratetechnicalindicator;
      var cti = this.props.cottechnicalindicator;
      var table = this.props.tableData;
      var drawingArray = this.props.drawingArray;
      var ecindrawingArray = this.props.ecindrawingArray;
      var scrollData = this.props.scrollData;
      var hNet = this.props.hNet;
      var selectedTrend = this.props.selectedTrend;
      var gaugePeriod = this.props.gaugePeriod;
      var newsindicator = this.props.newsindicator;
      var priceforecast = this.props.priceforecast;
      var cotforecast = this.props.cotforecast;
      var dacmdata={newsindicator:newsindicator,priceforecast:priceforecast,cotforecast:cotforecast,gaugePeriod:gaugePeriod,selectedTrend:selectedTrend,ecindrawingArray:ecindrawingArray,user_id:user_id,ticker_id:ticker_code,notes:note,ecin:ecin,cot:cot,ti:ti,table:table,drawingArray:drawingArray,scrollData:scrollData,cti:cti,hNet:hNet};
      console.log('aspldata',dacmdata);
      this.props.savenotes(dacmdata)
      this.props.calldacm(false)
    }
  // console.log('asplcot1',changeOptions);
  function handleMenuClick(e) {
    console.log('click', e);
  }

    if(this.props.notesstatus.status)
      {
        if(this.props.getnotes_respo.length>0)
        {
            var notes=JSON.parse(this.props.getnotes_respo[0].notes);
            this.setState({
              notes
            });
            this.props.notesstatus.status = false;
        }
        else
        {
          this.props.notesstatus.status = false;
            var r = [{"grid":{"w":2,"h":2,"x":0,"y":null,"i":"d2074d82-d836-169a-b744-3e95fb25c5b3","moved":false,"static":false},"id":"d2074d82-d836-169a-b744-3e95fb25c5b3","title":"Title","color":"#FBE4BE","degree":"-1deg","timeStamp":"","contentEditable":true}];
          this.onnoteChange(r);
        }
      }
      const sticky= (
        <ReactStickies notes={this.state.notes} onChange={this.onnoteChange}/>
      ); 
      var ticker = '';
      if(this.props.tickerData[0])
        {
          var short_desc = this.props.tickerData[0][0]['short_desc'];
          var eod_data = this.props.tickerData[0][0]['eod_data'];
          ticker = short_desc + '-'+eod_data;
        }
         return (
            <div>
               {this.props.loader ? <div><CircularProgress className="gx-loader-view cot_loader"/></div> : ''}
               {this.props.cotloader ? <div><CircularProgress className="gx-loader-view cot_loader"/></div> : ''}
               {this.props.priceData.length>0 ?
               
            <Auxiliary>
              <Card className = "dash_background">
                  <Row className="custom_main_chart">
                    <Col lg={24}>
                        <div class="seasonality_title">{ticker}</div>
                        <PriceAI />
                        <SeasonalityW />
                        <SeasonalityM />
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
    selectedTrend: state.Exchange.selectedTrend,
    newsindicator: state.Exchange.newsindicator,
    priceforecast: state.Exchange.priceforecast,
    cotforecast: state.Exchange.cotforecast,
    hNet: state.Exchange.hNet,
    selectedTrend: state.Exchange.selectedTrend,
    gaugePeriod: state.Exchange.gaugePeriod,
    cottechnicalindicator: state.Exchange.cottechnicalindicator,
    sapratetechnicalindicator: state.Exchange.sapratetechnicalindicator,
    notesstatus: state.Exchange.notesstatus,
    savestatus: state.Exchange.savestatus,
    calldacm1: state.Exchange.calldacm,
    getnotes_respo: state.Exchange.getnotes_respo,
    loader: state.Exchange.loader,
    cotloader: state.Exchange.cotloader,
    tableData: state.Exchange.tableData,
    selectedEcin : state.Exchange.selectedEcin,
    selectedGRAPH : state.Exchange.selectedGRAPH,
    drawingArray : state.Exchange.drawingArray,
    ecindrawingArray : state.Exchange.ecindrawingArray,
    scrollData: state.Exchange.scrollData,
    priceData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_search').map((priceDataIndex)=>{
      return state.Exchange.priceData[priceDataIndex];
    }),
    tickerData: Object.keys(state.Exchange.priceData).filter(priceDataIndex => priceDataIndex == 'tickers_details').map((priceDataIndex)=>{
      return state.Exchange.priceData[priceDataIndex];
    }),
  }
};
export default connect(mapStateToProps,{tableblank,mekkotype,savenotes,savetable,savestatus,getPricedata,calldacm, getnotes ,gettable, loaderstatus})(seasonality);
