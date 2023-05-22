import React from "react";
import {Button, Checkbox, Form, Icon, Input, message,Tabs,Table,Col, Row,Card} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from "appRedux/actions/Auth";
import {tableblank,mekkotype,savenotes,savetable,getPricedata , getnotes,calldacm ,getdacm,gettable,loaderstatus,savestatus} from "appRedux/actions/Exchange";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import PriceChart from "components/dashboard/MyDashboard/PriceCharthtml";
import MekkoChart from "components/dashboard/MyDashboard/MekkoChart";
import Widget from "components/Widget";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Htmlpdf extends React.PureComponent {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.showAuthLoader();
        console.log("vishal",values);
        this.props.userSignIn(values);
      }
    });
  };

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    // if (this.props.authUser !== null) {
    //   this.props.history.push('/');
    // }
  }
  componentWillMount(){
    // if(this.props.location.state){
        let ticker_id = 'E6';
        // //  console.log('asplticker',ticker_id);
        // if (ticker_id == "undefined" || ticker_id == "" || ticker_id == null) {
        //   // alert('Hi');
        // }
        // else
        // {
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
          this.props.getdacm({'user_id':user_id,'ticker_id':ticker_id})
        // }
    // }
  }
  print()
  {
    // window.print()
  //   html2canvas(document.querySelector("#htmlpdf_div")).then(canvas => {
  //     document.body.appendChild(canvas);  // if you want see your screenshot in body.
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, 'PNG', 0, 0, 0, 0);
  //     pdf.save("download.pdf"); 
  // });
      var divContents = document.querySelector("#htmlpdf_div").innerHTML;
      var printWindow = window.open();
      printWindow.document.write('<html><head><title>DIV Contents</title>');
      // printWindow.document.write('<style>@page{size: A4 landscape;}</style>');
      printWindow.document.write('<style> @media print {}</style>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(divContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {showMessage, loader, alertMessage} = this.props;

    return (
        <div className="htmlpdf_div" >
          <button onClick={()=>this.print()}>Print</button>
          <div  id="htmlpdf_div">
          
          {/* <Row id="htmlpdf_div"> */}
            {/* <Col lg={14}> */}
            <table style={{width:"100%"}}>
              <tr>
                <td>
              <PriceChart />
              </td>
              </tr>
              <tr>
              <td>
              <div className="first_tab" id="first_tab"  key="5" ></div>
              <MekkoChart />
              </td>
              </tr>
              </table>
            {/* </Col> */}
            {/* <Col lg={10}> */}
            {/* </Col> */}
            {/* </Row> */}
            </div>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Htmlpdf);

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn,getPricedata,calldacm, getnotes ,gettable,loaderstatus,getdacm
})(WrappedNormalLoginForm);
