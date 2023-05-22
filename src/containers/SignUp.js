// import React from "react";
// import {Button, Checkbox, Form, Icon, Input,Row,Col,Radio,Tabs,Switch} from "antd";
// import Widget from "components/Widget";
// import {Link} from "react-router-dom";
// import $ from 'jquery';
// import jQuery from 'jquery';
// import {connect} from "react-redux";
// import {
//   hideMessage,
//   showAuthLoader,
//   userFacebookSignIn,
//   userGithubSignIn,
//   userGoogleSignIn,
//   userSignUp,
//   userTwitterSignIn,
//   pricing,
// } from "appRedux/actions/Auth";
// // import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import IntlMessages from "util/IntlMessages";
// import {message} from "antd/lib/index";
// import CircularProgress from "components/CircularProgress/index";
// // import '../assets/signup/css/bootstrap.min.css';
// // import '../assets/signup/css/font-awesome.css';
// // import '../assets/signup/css/style.css';
// // import '../assets/signup/js/jquery.min.js';
// // import '../assets/signup/js/bootstrap.js';
// // import '../assets/signup/js/custom.js';
// const RadioGroup = Radio.Group;
// const FormItem = Form.Item;
// const TabPane = Tabs.TabPane;
// var pro_array = [];
// var ML_array = [];
// window.onscroll = function() {myFunction()};

    

//     function myFunction() {
// 		var header = document.getElementById("header-top");
//     	var sticky = header.offsetTop;
//       if (window.pageYOffset > sticky) {
//         header.classList.add("sticky");
//       } else {
//         header.classList.remove("sticky");
//       }
//     }

// $(document).ready(function(){

    
//         $('[data-toggle="popover"]').popover({
//             placement : 'auto bottom',
//             trigger : 'hover',
//             html : true,
//             content : 'The Card Verification Value (CVV) is a unique three or four-digit security number printed on your debit/credit card. <div style="margin-top:15px;">Locating your CVV number</div><img src="img/cvv_visa.png" style="width:100%; height: 201px; margin:10px 0;"/>The CVV is the last three-digit number printed in the signature strip on the reverse side of the card."'
//         });

//     $("button#step2-btn").click(function() {
//     	$("#step3-box").hide(); 
//     	$("#step1-box").hide(); 
//     	$("#step2-box").show();
//     	$("#step-1").addClass('complete').removeClass('active disabled');
//     	$("#step-2").addClass('active').removeClass('complete disabled');
//     	$("#step-3").addClass('disabled').removeClass('complete active');
//     });
//     $("button#step2-btn-back").click(function() {
//     	$("#step3-box").hide(); 
//     	$("#step1-box").hide(); 
//     	$("#step2-box").show();
//     	$("#step-1").addClass('complete').removeClass('active disabled');
//     	$("#step-2").addClass('active').removeClass('complete disabled');
//     	$("#step-3").addClass('disabled').removeClass('complete active');
//     });
//     $("button#step3-btn").click(function() {
//     	$("#step1-box").hide();
//     	$("#step2-box").hide();
//     	$("#step3-box").show();
//     	$("#step-1").addClass('complete').removeClass('active disabled');
//     	$("#step-2").addClass('complete').removeClass('active disabled');
//     	$("#step-3").addClass('active').removeClass('complete disabled');
//     });
//     $("#dot-link1").click(function() {    	
//     	$("#step3-box").hide();
//     	$("#step2-box").hide();
//     	$("#step1-box").show();
//     	$("#step-1").addClass('active').removeClass('complete disabled');
//     	$("#step-2").addClass('disabled').removeClass('active disabled');
//     	$("#step-3").addClass('disabled').removeClass('disabled active');
//     });
//     $("#dot-link2").click(function() {
//     	$("#step3-box").hide(); 
//     	$("#step1-box").hide(); 
//     	$("#step2-box").show();
//     	$("#step-1").addClass('complete').removeClass('active disabled');
//     	$("#step-2").addClass('active').removeClass('complete disabled');
//     	$("#step-3").addClass('disabled').removeClass('complete active');
//     });
//     $("#dot-link3").click(function() {
//     	$("#step1-box").hide();
//     	$("#step2-box").hide();
//     	$("#step3-box").show();
//     	$("#step-1").addClass('complete').removeClass('active disabled');
//     	$("#step-2").addClass('complete').removeClass('active disabled');
//     	$("#step-3").addClass('active').removeClass('complete disabled');
//     });
//     $("button#step1-btn").click(function() {    	
//     	$("#step3-box").hide();
//     	$("#step2-box").hide();
//     	$("#step1-box").show();
//     	$("#step-1").addClass('active').removeClass('complete disabled');
//     	$("#step-2").addClass('disabled').removeClass('active disabled');
//     	$("#step-3").addClass('disabled').removeClass('disabled active');
//     });
// });
// class SignUp extends React.Component {
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       // console.log("values1", values);
//       if (!err) {
//         this.props.showAuthLoader();
//         this.props.userSignUp(values);
//       }
//     });
//   };

//   constructor() {
//     super();
//     this.state = {
//       confirmDirty: false,
//       radio:2,
//       email: 'demo@example.com',
// 	  password: 'demo#123',
// 	  pro_price: 0,
// 	  ml_price: 0,
// 	  year_discount: 0,
// 	  ml_platform_title:"PRO Platform Rent",
// 	  ml_platform:0,
// 	  dis_ml_platform:0,
// 	  pro_ticker:0,
// 	  pro_ticker_price:0,
// 	  dis_pro_ticker_price:0,
// 	  ml_ticker:0,
// 	  ml_ticker_price:0,
// 	  dis_ml_ticker_price:0,
// 	  year_discount_price:0,
// 	  dis_year_discount_price:0,
// 	  coupon_discount_price:0,
// 	  paypal_fee:0,
// 	  total:0,
// 	  dis_total:0,
// 	  year:false,
//     }
//   }
//   componentWillMount() {
// 	this.props.pricing();
//   }
//   componentDidMount()
//   {
	
//   }
//   componentDidUpdate() {
//     if (this.props.showMessage) {
//       setTimeout(() => {
		
//         this.props.hideMessage();
//       }, 100);
//     }
//     // if (this.props.authUser !== null) {
//     //   this.props.history.push('/');
//     // }
//   }
//   select_ticker(event,type,id,index,name,code)
//   {
// 		if(this.props.pricing_data[0])
// 		{
// 			var pro_price1 = this.props.pricing_data[0][0]['ticker_price'];
// 			var ML_price1 = this.props.pricing_data[0][0]['ticker_price_ML']; 
// 			var year_discount1 = this.props.pricing_data[0][0]['year_discount'];
// 			this.setState({
// 			pro_price : this.props.pricing_data[0][0]['ticker_price'],
// 			ML_price : this.props.pricing_data[0][0]['ticker_price_ML'], 
// 			year_discount : this.props.pricing_data[0][0]['year_discount'],
// 			}) 
// 		}
// 	  if(event)
// 	  {
// 		this.setState({[id]:true});
// 		if(type=='ML')
// 		{
// 			var temp_id = 'pro_'+index;
// 			this.setState({[temp_id]:false});
// 			ML_array.push(code);
// 			var temp_index = pro_array.indexOf(code);
// 			if (temp_index !== -1) pro_array.splice(temp_index, 1);
// 		}
// 		if(type=='PRO')
// 		{
// 			var temp_id = 'ML_'+index;
// 			this.setState({[temp_id]:false});
// 			pro_array.push(code);
// 			var temp_index = ML_array.indexOf(code);
// 			if (temp_index !== -1) ML_array.splice(temp_index, 1);
// 		}
// 	  }
// 	  else
// 	  {
// 		this.setState({[id]:false});
// 		if(type=='ML')
// 		{
// 			var temp_index = ML_array.indexOf(code);
// 			if (temp_index !== -1) ML_array.splice(temp_index, 1);
// 		}
// 		if(type=='PRO')
// 		{
// 			var temp_index = pro_array.indexOf(code);
// 			if (temp_index !== -1) pro_array.splice(temp_index, 1);
// 		}
// 	  }
// 	this.priceCalculation(this.state.year);

//   }
//   yearchange(event)
//   {
// 	  this.setState({year:event});
// 	  this.priceCalculation(event);
//   }
//   priceCalculation(year)
//   {
// 	var pro_count = pro_array.length;
// 	var ML_count = ML_array.length;
// 	if(this.props.pricing_data[0])
// 	{
// 		var pro_price1 = this.props.pricing_data[0][0]['ticker_price'];
// 		var ML_price1 = this.props.pricing_data[0][0]['ticker_price_ML']; 
// 		var year_discount1 = this.props.pricing_data[0][0]['year_discount'];			 
// 	}
// 	var temp_year_discount = 1-(year_discount1/100);
// 	if(year)
// 	{
// 		if(ML_count>0)
// 		{
// 		var mlprice= ML_count * ML_price1*12;
// 		var dis_mlprice= ML_count * ML_price1*12*temp_year_discount;
// 		var proprice = pro_count * pro_price1*12;
// 		var dis_proprice = pro_count * pro_price1*12*temp_year_discount;
// 		var discount = ML_price1*12;
// 		var dis_discount = ML_price1*12*temp_year_discount;
// 		var rent = 49*12;
// 		var dis_rent = 49*12*temp_year_discount;
// 		var total = mlprice+proprice+rent-discount;
// 		var dis_total = (mlprice+proprice+rent-discount)*temp_year_discount;
// 		this.setState({
// 			ml_platform_title:"ML Platform Rent",
// 			ml_platform:rent.toFixed(2),
// 			dis_ml_platform:dis_rent.toFixed(2),
// 			pro_ticker:pro_count,
// 			pro_ticker_price:proprice.toFixed(2),
// 			dis_pro_ticker_price:dis_proprice.toFixed(2),
// 			ml_ticker:ML_count,
// 			ml_ticker_price:mlprice.toFixed(2),
// 			dis_ml_ticker_price:dis_mlprice.toFixed(2),
// 			year_discount_price:discount.toFixed(2),
// 			dis_year_discount_price:dis_discount.toFixed(2),
// 			coupon_discount_price:0,
// 			paypal_fee:0,
// 			total:total.toFixed(2),
// 			dis_total:dis_total.toFixed(2)
// 		});
// 		}
// 		if(pro_count>0 && ML_count == 0)
// 		{
// 		var mlprice= ML_count * ML_price1*12;
// 		var dis_mlprice= ML_count * ML_price1*12*temp_year_discount;
// 		var proprice = pro_count * pro_price1*12;
// 		var dis_proprice = pro_count * pro_price1*12*temp_year_discount;
// 		var discount = pro_price1*12;
// 		var dis_discount = pro_price1*12*temp_year_discount;
// 		var rent = 14.9*12;
// 		var dis_rent = 14.9*12*temp_year_discount;
// 		var total = mlprice+proprice+rent-discount;
// 		var dis_total = (mlprice+proprice+rent-discount)*temp_year_discount;
// 		this.setState({
// 			ml_platform_title:"PRO Platform Rent",
// 			ml_platform:rent.toFixed(2),
// 			dis_ml_platform:dis_rent.toFixed(2),
// 			pro_ticker:pro_count,
// 			pro_ticker_price:proprice.toFixed(2),
// 			dis_pro_ticker_price:dis_proprice.toFixed(2),
// 			ml_ticker:ML_count,
// 			ml_ticker_price:mlprice.toFixed(2),
// 			dis_ml_ticker_price:dis_mlprice.toFixed(2),
// 			year_discount_price:discount.toFixed(2),
// 			dis_year_discount_price:dis_discount.toFixed(2),
// 			coupon_discount_price:0,
// 			paypal_fee:0,
// 			total:total.toFixed(2),
// 			dis_total:dis_total.toFixed(2)
// 		});
// 		}
// 		if(pro_count==0 && ML_count == 0)
// 		{
// 		this.setState({
// 			ml_platform_title:"PRO Platform Rent",
// 			ml_platform:0,
// 			dis_ml_platform:0,
// 			pro_ticker:0,
// 			pro_ticker_price:0,
// 			dis_pro_ticker_price:0,
// 			ml_ticker:0,
// 			ml_ticker_price:0,
// 			dis_ml_ticker_price:0,
// 			year_discount_price:0,
// 			dis_year_discount_price:0,
// 			coupon_discount_price:0,
// 			paypal_fee:0,
// 			total:0,
// 			dis_total:0
// 		});
// 		}
// 	}
// 	else
// 	{
// 		if(ML_count>0)
// 		{
// 		var mlprice= ML_count * ML_price1;
// 		var proprice = pro_count * pro_price1;
// 		var discount = ML_price1;
// 		var rent = 49;
// 		var total = mlprice+proprice+rent-discount;
// 		this.setState({
// 			ml_platform_title:"ML Platform Rent",
// 			ml_platform:rent.toFixed(2),
// 			pro_ticker:pro_count,
// 			pro_ticker_price:proprice.toFixed(2),
// 			ml_ticker:ML_count,
// 			ml_ticker_price:mlprice.toFixed(2),
// 			year_discount_price:discount.toFixed(2),
// 			coupon_discount_price:0,
// 			paypal_fee:0,
// 			total:total.toFixed(2)
// 		});
// 		}
// 		if(pro_count>0 && ML_count == 0)
// 		{
// 		var mlprice= ML_count * ML_price1;
// 		var proprice = pro_count * pro_price1;
// 		var discount = pro_price1;
// 		var rent = 14.9;
// 		var total = mlprice+proprice+rent-discount;
// 		this.setState({
// 			ml_platform_title:"PRO Platform Rent",
// 			ml_platform:rent.toFixed(2),
// 			pro_ticker:pro_count,
// 			pro_ticker_price:proprice.toFixed(2),
// 			ml_ticker:ML_count,
// 			ml_ticker_price:mlprice.toFixed(2),
// 			year_discount_price:discount.toFixed(2),
// 			coupon_discount_price:0,
// 			paypal_fee:0,
// 			total:total.toFixed(2)
// 		});
// 		}
// 		if(pro_count==0 && ML_count == 0)
// 		{
// 		this.setState({
// 			ml_platform_title:"PRO Platform Rent",
// 			ml_platform:0,
// 			pro_ticker:0,
// 			pro_ticker_price:0,
// 			ml_ticker:0,
// 			ml_ticker_price:0,
// 			year_discount_price:0,
// 			coupon_discount_price:0,
// 			paypal_fee:0,
// 			total:0
// 		});
// 		}
// 	}
//   }
//   handleConfirmBlur = (e) => {
//     const value = e.target.value;
//     this.setState({confirmDirty: this.state.confirmDirty || !!value});
//   }
//   compareToFirstPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && value !== form.getFieldValue('password')) {
//       callback('Password and Confirm Password must be same!');
//     } else {
//       callback();
//     }
//   }
//   validateToNextPassword = (rule, value, callback) => {
//     const form = this.props.form;
//     if (value && this.state.confirmDirty) {
//       form.validateFields(['confirm'], {force: true});
//     }
//     callback();
//   }
//   onChange = (e) => {
//     this.setState({
//       radio: e.target.value,
//     });
//   };
//   render() {
// 	console.log('asplstate',this.state.pro_price);
//     const radioStyle = {
//       // display: 'block',
//       height: '30px',
//       lineHeight: '30px',
//     };
//     const {getFieldDecorator} = this.props.form;
// 	const {showMessage, loader, alertMessage} = this.props;
// 	var pro_price = '';
// 	var ML_price = '';
// 	var year_discount = '';
// 	if(this.props.pricing_data[0])
// 		{
		
// 		pro_price = this.props.pricing_data[0][0]['ticker_price'];
// 		ML_price = this.props.pricing_data[0][0]['ticker_price_ML']; 
// 		year_discount = this.props.pricing_data[0][0]['year_discount']; 
// 		}
//     return (
//       <html>
//        <head >
//         <meta charset="utf-8" />
//       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//       {/* <!-- Title  --> */}
//       {/* <title>PiaFx</title> */}
//       {/* <!-- Favicon --> */}
//       {/* <!-- <link rel="shortcut icon" href="img/favicon.png" /> --> */}
//       <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet" />
//         {/* <!-- Core Style Css --> */}
//         <link rel="stylesheet" href={require("assets/signup/css/bootstrap.min.css")} />
//         <link rel="stylesheet" href={require("assets/signup/css/font-awesome.css")} />
//         <link rel="stylesheet" href={require("assets/signup/css/style.css")} />
//     </head>
//     <body>
// <div class="main">

// 	{/* <!-- ========= header section start=========--> */}

// 	<header class="cust_header" id="header-top">
// 		<nav class="navbar navbar-default" id="navbar">
// 			<div class="container">
// 			    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
// 			    <div class="navbar-header">
// 			      	<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mobile_toggle" aria-expanded="false">
// 				        <span class="sr-only">Toggle navigation</span>
// 				        <span class="icon-bar"></span>
// 				        <span class="icon-bar"></span>
// 				        <span class="icon-bar"></span>
// 			      	</button>
// 			      	<a class="navbar-brand" href="#">
// 			      		<img src={require("assets/signup/img/PiaFxWebLogo.png")} alt="logo" />  
// 			      	</a>
// 			    </div>

// 			    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
// 			    <div class="collapse navbar-collapse" id="mobile_toggle">
// 			      	<ul class="navbar-nav ml-auto nav navbar-right">
// 				      	<li class="nav-item">
// 				       		<a class="nav-link" href="#" data-scroll-nav="0">Signup</a>
// 				      	</li>
// 				      	<li class="nav-item">
// 	                    	<a class="nav-link" href="#" data-scroll-nav="1">Heimdallr ML</a>
// 	                  	</li>
// 	                  	<li class="nav-item">
// 	                   	 	<a class="nav-link" href="#" data-scroll-nav="2">Affiliation</a>
// 	                  	</li>
// 				      	<li class="nav-item">
// 				        	<a class="nav-link" href="#" data-scroll-nav="3">Press</a>
// 				      	</li>
// 				      	<li class="nav-item">
// 				        	<a class="nav-link" href="#" data-scroll-nav="4">Purchase</a>
// 				      	</li>
// 				    </ul>
// 			    </div>
// 			</div>
// 		</nav>	
// 	</header>
  

//   <div>
// 		<div class="container">        
        
// 		    <div class="row bs-wizard" style={{"border-bottom":"0"}} id="process_step">
		        
// 		        <div class="col-xs-4 bs-wizard-step active" id="step-1">
// 		          <div class="text-center bs-wizard-stepnum">Step 1</div>
// 		          <div class="progress"><div class="progress-bar"></div></div>
// 		          <a href="#" class="bs-wizard-dot" id="dot-link1"></a>
// 		          <div class="bs-wizard-info text-center">Plan Details</div>
// 		        </div>
		        
// 		        <div class="col-xs-4 bs-wizard-step disabled" id="step-2">
// 		          <div class="text-center bs-wizard-stepnum">Step 2</div>
// 		          <div class="progress"><div class="progress-bar"></div></div>
// 		          <a href="#" class="bs-wizard-dot" id="dot-link2"></a>
// 		          <div class="bs-wizard-info text-center">Personal Information</div>
// 		        </div>
		        
// 		        <div class="col-xs-4 bs-wizard-step disabled" id="step-3">
// 		          <div class="text-center bs-wizard-stepnum">Step 3</div>
// 		          <div class="progress"><div class="progress-bar"></div></div>
// 		          <a href="#" class="bs-wizard-dot" id="dot-link3"></a>
// 		          <div class="bs-wizard-info text-center">Payment Details</div>
// 		        </div>                
		        
// 		    </div>

// 		    {/* <!-- == step1 start ===== --> */}
// 		    <div class="form-step-first" id="step1-box">
// 		    	<div class="row">
// 		    		<div class="col-md-12">
// 		    			<div class="row">
// 		    				<div class="col-md-8">
// 		    					{/* <div class="left-data-box">
// 		    						<div class="sel-plan">
// 			    						<div class="form-group">
// 										    <label class="control-label" for="email">Plan:</label>	
// 										    <select class="form-control" id="sel1">
// 											    <option>1</option>
// 											    <option>2</option>
// 											    <option>3</option>
// 											    <option>4</option>
// 											</select>										    
// 										</div>
// 									</div>
// 		    					</div> */}

// 		    					<div class="plan-detail-box">
// 		    						<h3>Plan Details</h3>
// 									{this.props.ticker_data.length > 0 ? 
// 									<div>
// 										{/* <Widget title=" " styleName="gx-card-tabs sector_tabs">   */}
// 												<Tabs defaultActiveKey="1">
// 									{Object.keys(this.props.ticker_data[0]).map((key,index) => {
// 										// console.log('asplexchange',this.props.exchangeList['Sector']);
// 										return (
// 										<TabPane tab={key} key={index+1} className="price-overview">
// 										<div class="table-responsive">
// 		    							<table class="table">		    								
// 		    								<thead>
// 		    									<tr>
// 		    										<th>Ticker name</th>
// 													<th>Pro ${pro_price}/month</th>
// 		    										<th>ML ${ML_price}/month</th>    										
// 		    									</tr>
// 		    								</thead>
// 										{/* <h3>{key}</h3> */}
// 											<tbody>
		    									
// 											{
// 											Object.keys(this.props.ticker_data[0][key]).map( (item,index1) => {
// 												var pro_id = "pro_"+item
// 												var ml_id = "ML_"+item
// 												var ticker_name = this.props.ticker_data[0][key][item].name
// 												var ticker_code = this.props.ticker_data[0][key][item].code
// 											return (
// 												<tr>
// 												<td style={{'cursor':"pointer"}} >{ticker_name} ({ticker_code}) </td>
// 												<td>
// 													{/* <label class="switches">
// 													<input class="switchinput" type="checkbox" id={id} />
// 													<span class="slider round"></span>
// 													</label> */}
// 													{this.state[pro_id]? <span><Switch size="small" id={pro_id} checked={this.state[pro_id]} onChange={(e)=>this.select_ticker(e,'PRO',pro_id,item,ticker_name,ticker_code)} checked/></span>:
// 													<span><Switch size="small" id={pro_id} checked={this.state[pro_id]} onChange={(e)=>this.select_ticker(e,'PRO',pro_id,item,ticker_name,ticker_code)}/></span>}
// 													</td>
// 												<td>{this.state[ml_id]?<span><Switch size="small" checked={this.state[ml_id]} id={ml_id} onChange={(e)=>this.select_ticker(e,'ML',ml_id,item,ticker_name,ticker_code)} checked/></span>:
// 												<span><Switch size="small" id={ml_id} checked={this.state[ml_id]} onChange={(e)=>this.select_ticker(e,'ML',ml_id,item,ticker_name,ticker_code)} /></span>}</td>
// 												</tr>
// 											);
// 											})
// 											}
											
// 		    								</tbody>
// 											</table>
// 		    						</div>
// 										</TabPane>
// 										);
// 									})
// 									}</Tabs>
// 									{/* </Widget> */}
// 									</div> : null}
// 		    						{/* <div class="table-responsive">
// 		    							<table class="table">		    								
// 		    								<thead>
// 		    									<tr>
// 		    										<th>Plan name</th>
// 		    										<th>Pro</th>
// 		    										<th>ML</th>    										
// 		    									</tr>
// 		    								</thead>
// 		    								<tbody>
// 		    									<tr>
// 		    										<td>D6</td>
// 		    										<td><input type="checkbox" value=""/></td>
// 		    										<td><input type="checkbox" value=""/></td>
// 		    									</tr>
// 		    								</tbody>
// 		    							</table>
// 		    						</div> */}

// 		    					</div>

// 		    				</div>
// 		    				<div class="col-md-4">
// 		    					<div class="side-bar">
// 		    						<h3>Summary</h3>
// 									Monthly <Switch size="medium" onChange={(e)=>this.yearchange(e)} /> Yearly
// 									<div class="table-responsive">
// 									<table class="table">
										
// 										{!this.state.year?<tbody>
// 										<tr>
// 											<td>{this.state.ml_platform_title}</td>
// 											<td>  </td>
// 											<td>${this.state.ml_platform}</td>
// 										</tr>
// 										<tr>
// 											<td>No. of Pro Ticker {this.state.pro_ticker} </td>
// 											<td>  </td>
// 											<td>${this.state.pro_ticker_price}</td>
// 										</tr>
// 										<tr>
// 											<td>No. of ML Ticker {this.state.ml_ticker} </td>
// 											<td>  </td>
// 											<td>${this.state.ml_ticker_price}</td>
// 										</tr>
// 										<tr>
// 											<td>Free Ticker 1 </td>
// 											<td>  </td>
// 											<td style={{'color':'grey'}}>- ${this.state.year_discount_price }</td>
// 										</tr>
// 										<tr>
// 											<td>Coupon Discount  </td>
// 											<td>  </td>
// 											<td>${this.state.coupon_discount_price }</td>
// 										</tr>
// 										<tr>
// 											<td>Paypal Fee  </td>
// 											<td>  </td>
// 											<td>${this.state.paypal_fee }</td>
// 										</tr>
// 										<tr>
// 											<td><strong>Total</strong>  </td>
// 											<td>  </td>
// 											<td><strong>${this.state.total }</strong></td>
// 										</tr>
// 										</tbody>:
										
// 										<tbody>
// 										<tr>
// 											<td>{this.state.ml_platform_title}</td>
// 											<td>${this.state.dis_ml_platform}</td>
// 											<td style={{'text-decoration':'line-through'}}>${this.state.ml_platform}</td>
// 										</tr>
// 										<tr>
// 											<td>No. of Pro Ticker {this.state.pro_ticker} </td>
// 											<td>${this.state.dis_pro_ticker_price}  </td>
// 											<td style={{'text-decoration':'line-through'}}>${this.state.pro_ticker_price}</td>
// 										</tr>
// 										<tr>
// 											<td>No. of ML Ticker {this.state.ml_ticker} </td>
// 											<td> ${this.state.dis_ml_ticker_price} </td>
// 											<td style={{'text-decoration':'line-through'}}>${this.state.ml_ticker_price}</td>
// 										</tr>
// 										<tr>
// 											<td>Free Ticker 1 </td>
// 											<td style={{'color':'grey'}}>-${this.state.dis_year_discount_price }</td>
// 											<td></td>
// 										</tr>
// 										<tr>
// 											<td>Coupon Discount  </td>
// 											<td>${this.state.coupon_discount_price }</td>
// 											<td></td>
// 										</tr>
// 										<tr>
// 											<td>Paypal Fee  </td>
// 											<td>${this.state.paypal_fee }</td>
// 											<td></td>
// 										</tr>
// 										<tr>
// 											<td><strong>Total</strong>  </td>
// 											<td> ${this.state.dis_total } </td>
// 											<td style={{'text-decoration':'line-through'}}><strong>${this.state.total }</strong></td>
// 										</tr>
// 										</tbody>
// 										}
// 									</table>
// 									</div>
// 		    						{/* <div class="checkbox">
// 								      <label>Monthly <input type="checkbox" value=""/></label>
// 								    </div>
// 								    <div class="checkbox">
// 								      <label>Yearly <input type="checkbox" value=""/></label>
// 								    </div>

// 								    <div class="total">
// 								    	<strong>Total: </strong><span>1000 $</span>
// 								    </div> */}

// 		    					</div>

// 		    				</div>
// 		    			</div>
// 		    		</div>
// 		    	</div>
// 		    	<div class="form-buttons">
// 		    		<div class="row">
// 		    			<div class="col-md-12">
// 		    				<div class="next-btn">
// 		    					<button class="btn sbmt_process btn-primary" id="step2-btn">Next</button>
// 		    				</div>
// 		    			</div>
// 		    		</div>
// 		    	</div>
// 		    </div>
// 		    {/* <!-- == step1 End ===== --> */}

// 		    {/* <!-- == step2 start ===== --> */}
// 		    <div class="form_first_step" id="step2-box">
// 		    	<h3>Personal Information</h3>
// 		    	<form id = "form_wizard1" class = "form-group has-validation-callback" method="post">
// 		             <center><div class="error_msg" style={{"color": "red","font-weight": "600"}}></div></center>
// 				 	<div class="form-group col-md-6">
// 		                <label>First name</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="fname" data-validation="required custom" data-validation-regexp="^[a-zA-Z]+$" data-validation-error-msg="Please enter valid firstname." id="fname" type="text" class="form-control" value="" />
// 		                </div>
// 		            </div> 


// 		            <div class="form-group col-md-6">
// 		                <label>Last name</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="lname" data-validation="required custom" data-validation-regexp="^[a-zA-Z]+$" data-validation-error-msg="Please enter valid lastname." id="lname" type="text" class="form-control" value="" />
// 		                </div>
// 		            </div> 

// 		            <div class="form-group col-md-6">
// 		                <label>Phone Number</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="pemail" data-validation="required email" data-validation-error-msg="Please enter valid email." id="pemail" type="text" class="form-control" value="" />
// 		                </div>
// 		            </div>
// 		            <div class="form-group col-md-6">
// 		                <label>Email</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="pemail" data-validation="required email" data-validation-error-msg="Please enter valid email." id="pemail" type="text" class="form-control" value="" />
// 		                </div>
// 		            </div> 
// 		            <div class="form-group col-md-6">
// 		                <label>Password</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="pemail" data-validation="required email" data-validation-error-msg="Please enter valid email." id="pemail" type="text" class="form-control" value="" />
// 		                </div>
// 		            </div>


// 		            <div class="form-group col-md-6">
// 		                <label>Confirm Password</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="pemail" data-validation="required email" data-validation-error-msg="Please enter valid email." id="pemail" type="text" class="form-control" value="" />
// 		                </div>
// 		            </div>
// 		            <div class="col-md-12 form-group">
// 		            	<p>Do you have affiliate code?</p>
// 		            	<div class="radio-buttons-cust">
// 		            		<label class="radio-inline">
// 						      <input type="radio" name="optradio" checked />Yes
// 						    </label>
// 						    <label class="radio-inline">
// 						      <input type="radio" name="optradio" />No
// 						    </label>
// 		            	</div>
// 		            </div>
// 		            <div class="form-group col-md-12">
// 		                <label>Affiliate Code</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input name="pemail" data-validation="required email" data-validation-error-msg="Please enter valid email." type="text" class="form-control" value="" />
// 		                </div>
// 		            </div>
// 		            <div class="form-group">
// 					    <div class="col-md-12">
// 					      <div class="checkbox cust-check">
// 					        <label><input type="checkbox" checked /> by signing up, I accept <a class="cust-a" href="#" >Terms & Condition</a></label>
// 					      </div>
// 					    </div>
// 				  	</div>
// 				  	<div class="form-group col-md-12">		                
// 		                <div class="controls cust-btn-form">
// 		                 	<button class = "btn sbmt_process btn-primary" id = "submit"><a href="step2.html" class="step_link">Submit</a></button> <span>OR</span> <a href="#" class="signin_a">Sign In</a>
// 		                </div>
// 		            </div>
// 		        </form>

// 		        <div class="row control-btns">
// 		        	<div class="col-md-6">
// 	    				<div class="prev-btn">
// 	    					<button class="btn sbmt_process btn-primary" id="step1-btn">Prev</button>
// 	    				</div>
// 	    			</div>
// 	    			<div class="col-md-6">
// 	    				<div class="next-btn">
// 	    					<button class="btn sbmt_process btn-primary" id="step3-btn">Next</button>
// 	    				</div>
// 	    			</div>
// 	    		</div>
// 		    </div>
// 		    {/* <!-- == step2 End ===== --> */}

// 		    {/* <!-- == step3 start ===== --> */}
// 		    <div class="plan_row" id="step3-box">
// 		        <div class="Pay_method">
// 		            <h3>Payment Method</h3>
// 		            <form id = "form_wizard_forpay" class = "form-group has-validation-callback" method="post">
// 		            <div class="form-group col-md-6">
// 		                <label>Debit/Credit Card Number</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input type="text" class="form-control" value="" />
// 		                </div>
// 		            </div> 
// 		             <div class="form-group col-md-3">
// 		                <label>Expiration</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input type="tel" class="form-control" data-form-format-helper="formatCardExpirationDate" autocomplete="off" />
// 		                </div>
// 		            </div>
// 		             <div class="form-group col-md-2">
// 		                <label>CVV</label>&nbsp<span style={{"color": "#a94442"}}>*</span>
// 		                <div class="controls">
// 		                    <input type="password" class="form-control" value="" />
// 		                </div>
// 		            </div>
// 		            <div class="form-group col-md-1">
// 		            <label>Help</label>
// 		                <button type="button" class="btn btn-primary" data-toggle="popover">?</button>
// 		             </div>
// 		            <div class="form-group col-md-12">
		                
// 		                <div class="controls">
// 		                  <center><button class = "btn sbmt_process btn-primary" id = "submit"><a href="step3.html" class="step_link">Submit</a></button></center>
// 		                </div>
// 		            </div>
// 		            <div class="clearfix"></div>
//                 </form>
// 		        </div>
// 		        <div class="row control-btns">
// 		        	<div class="col-md-12">
// 	    				<div class="prev-btn">
// 	    					<button class="btn sbmt_process btn-primary" id="step2-btn-back">Prev</button>
// 	    				</div>
// 	    			</div>
// 	    		</div>
// 		    </div>
// 		    {/* <!-- == step3 End ===== --> */}

// 		</div>
// 	</div>
//   {/* <!-- ========= Footer  section  start=========--> */}
// 	<footer class="footer" role="contentinfo">
// 	   <div class="container">
// 	      <div class="footer-widgets row th-widget-area">
// 	         <div class="footer-area-1 col-sm-6">
// 	            <section class="widget text-2 widget_text">
// 	               <div class="widget-inner">
// 	                  <h3 class="widget-title">About Us</h3>
// 	                  <div class="textwidget">
// 	                     <p>Stratus is a powerful WordPress theme designed for app, SaaS, &amp; tech startups, including all the important features you need to make your business successful.</p>
// 	                  </div>
// 	               </div>
// 	            </section>
// 	            <section class="widget widget-th-payments">
// 	               <div class="widget-inner">
// 	                  <h3 class="widget-title">Payments Accepted</h3>
// 	                  <div class="th-payments-widget">
// 	                     <a target="_blank" href="https://paypal.com"><img src="img/paypal.png" alt="PayPal" width="84" height="26"/></a><a target="_blank" href="https://visa.com"><img src="img/Visa.png" alt="Visa" width="79" height="26"/></a><a target="_blank" href="https://mastercard.com"><img src="img/master-card.png" alt="MasterCard" width="42" height="26"/></a>				
// 	                  </div>
// 	               </div>
// 	            </section>
// 	         </div>
// 	         <div class="footer-area-2 col-sm-6">
// 	            <section class="widget widget-th-contact-info">
// 	               <div class="widget-inner">
// 	                  <h3 class="widget-title">Contact Info</h3>
// 	                  <div class="th-contact-info-widget">
// 	                     <div class="icon-blocks">
// 	                        <div class="icon-block">
// 	                           <p><a target="_blank" href="mailto:contact@ourdomain.com"><i class="fa fa-envelope-open-o"></i><span>piafx@piafx.com</span></a></p>
// 	                        </div>
// 	                        <div class="icon-block">
// 	                           <p><a href="#"><i class="fa fa-commenting" aria-hidden="true"></i><span>chat</span></a></p>
// 	                        </div>
// 	                     </div>
// 	                  </div>
// 	               </div>
// 	            </section>
// 	            <section class="widget widget-social">
// 	               <div class="widget-inner">
// 	                  <h3 class="widget-title">Socialize</h3>
// 	                  <div class="soc-widget">
// 	                     <a target="_blank" href="#0"><i class="fa fa-linkedin"></i></a><a target="_blank" href="#0"><i class="fa fa-twitter"></i></a><a target="_blank" href="#0"><i class="fa fa-youtube"></i></a>           			
// 	                  </div>
// 	               </div>
// 	            </section>
// 	         </div>
// 	         <div class="footer-area-3 col-sm-6">
// 	         </div>
// 	      </div>
// 	   </div>
// 	   <div class="footer-btm-bar">
// 	      <div class="container">
// 	         <div class="footer-copyright row">
// 	            <div class="col-xs-12">
// 	               <p>  <span class="footer_credit">Made with <i class="fa fa-heart-o"></i> by PiaFx</span></p>
// 	            </div>
// 	         </div>
// 	      </div>
// 	   </div>
// 	</footer>
// 	{/* <!-- ========= Footer  section  End=========--> */}

//   {/* <script type="text/javascript" src={require("assets/signup/js/jquery.min.js")}></script>
// <script type="text/javascript" src={require("assets/signup/js/bootstrap.js")}></script> */}
// <script>



// </script>
//   </div>
  
      
//       </body>
//       </html>
//     );
//   }
  
// }

// const WrappedSignUpForm = Form.create()(SignUp);

// const mapStateToProps = ({auth}) => {
//   const {loader, alertMessage, showMessage, authUser, pricing_data} = auth;
//   return {loader, alertMessage, showMessage, authUser,
// 	pricing_data : Object.keys(pricing_data).filter(priceDataIndex => priceDataIndex == 'pricing').map((priceDataIndex)=>{
// 		return pricing_data[priceDataIndex];
// 	}),
// 	ticker_data : Object.keys(pricing_data).filter(priceDataIndex => priceDataIndex == 'Sector').map((priceDataIndex)=>{
// 		return pricing_data[priceDataIndex];
// 	}),
// 	}
// };

// export default connect(mapStateToProps, {
//   userSignUp,
//   hideMessage,
//   showAuthLoader,
//   userFacebookSignIn,
//   userGoogleSignIn,
//   userGithubSignIn,
//   userTwitterSignIn,
//   pricing
// })(WrappedSignUpForm);
