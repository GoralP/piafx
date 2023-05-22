import React from "react";
import {Button, Checkbox, Form, Icon, Input,Row,Col,Radio} from "antd";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignUp,
  userTwitterSignIn
} from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import {message} from "antd/lib/index";
import CircularProgress from "components/CircularProgress/index";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class SignUp extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log("values1", values);
      if (!err) {
        this.props.showAuthLoader();
        this.props.userSignUp(values);
      }
    });
  };

  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      radio:2,
      email: 'demo@example.com',
      password: 'demo#123'
    }
  }

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
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password and Confirm Password must be same!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }
  onChange = (e) => {
    this.setState({
      radio: e.target.value,
    });
  };
  render() {
    const radioStyle = {
      // display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {getFieldDecorator} = this.props.form;
    const {showMessage, loader, alertMessage} = this.props;
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            {/* <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src='https://via.placeholder.com/272x395' alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p><IntlMessages id="app.userAuth.getAccount"/></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
            </div> */}

            <div className="gx-app-login-content signup-content">
              <Form onSubmit={this.handleSubmit} className="gx-signup-form gx-form-row0">
                <Row>
                  <Col lg={12}>
                    <FormItem>
                      {getFieldDecorator('first_name', {
                        rules: [{required: true, message: 'Please input your first name!'}],
                      })(
                        <Input placeholder="First Name" />
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={12}>
                    <FormItem>
                      {getFieldDecorator('last_name', {
                        rules: [{required: true, message: 'Please input your last name!'}],
                      })(
                        <Input placeholder="Last Name"/>
                      )}
                    </FormItem>
                  </Col>
                </Row> 
                <Row>
                  <Col lg={12}>
                    <FormItem>
                      {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                      })(
                        <Input placeholder="Phone Number"/>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={12}>
                    <FormItem>
                      {getFieldDecorator('email', {
                        rules: [{
                          required: true, type: 'email', message: 'The input is not valid E-mail!',
                        }],
                      })(
                        <Input placeholder="Email"/>
                      )}
                  </FormItem>
                  </Col>
                </Row>    
                <Row>
                  <Col lg={12}>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your password!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" placeholder="Password"/>
                    )}
                  </FormItem>
                  </Col>
                  <Col lg={12}>
                  <FormItem>
                      {getFieldDecorator('confirm', {
                        rules: [{
                          required: true, message: 'Please confirm your password!',
                        }, {
                          validator: this.compareToFirstPassword,
                        }],
                      })(
                        <Input type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur}/>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24}>
                  <FormItem label="Do you have affiliate code?">
                  {getFieldDecorator('affiliate', {
                        rules: [],
                      })(
                  <RadioGroup onChange={this.onChange} value={this.state.radio}>
                    <Radio style={radioStyle} value={1}>Yes</Radio>
                    <Radio style={radioStyle} value={2} checked>No                  
                    </Radio>
                  </RadioGroup>
                      )} 
                  </FormItem>
                  </Col>
                </Row> 
                 {this.state.radio === 1 ? 
                <Row>
                  <Col lg={24}>
                    <FormItem>
                      {getFieldDecorator('affiliateCode', {
                        rules: [{required: true, message: 'Please input Affiliate Code!'}],
                      })(
                        <Input placeholder="Affiliate Code"/>
                      )}
                    </FormItem>
                  </Col></Row> :
                <Row>
                <Col lg={24}>
                  <FormItem>
                    {getFieldDecorator('affiliateCode', {
                      rules: [],
                    })(
                      <Input type="hidden" placeholder="Affiliate Code" readOnly disabled/>
                    )}
                  </FormItem>
                </Col></Row>
                // null
                   } 
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                  )}
                  <span className="gx-link gx-signup-form-forgot"><IntlMessages
                    id="appModule.termAndCondition"/></span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signUp"/>
                  </Button>
                  <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                  id="app.userAuth.signIn"/></Link>
                </FormItem>
                {/* <div className="gx-flex-row gx-justify-content-between">
                  <span>or connect with</span>
                  <ul className="gx-social-link">
                    <li>
                      <Icon type="google" onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userGoogleSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="facebook" onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userFacebookSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="github" onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userGithubSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="twitter" onClick={() => {
                        this.props.showAuthLoader();
                        this.props.userTwitterSignIn();
                      }}/>
                    </li>
                  </ul>
                </div> */}
              </Form>
            </div>
            {loader &&
            <div className="gx-loader-view">
              <CircularProgress/>
            </div>
            }
            {showMessage &&
            message.error(alertMessage)}
          </div>
        </div>
      </div>

    );
  }

}

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn
})(WrappedSignUpForm);
