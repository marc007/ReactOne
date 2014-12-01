/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var ParseToolHelper = require('../libs/parse-tool.js');

var Registerform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isLoading: false,
        useremail: 'test6@test.com',
        userpassword: '006',
        usernickname: 'test006',
        message: ''
      };
  },
  
  handleChangeEmail: function(e) {
    this.setState({useremail: event.target.value});    
  },
  handleChangePassword: function(e) {
    this.setState({userpassword: event.target.value});    
  },
  handleChangeNickName: function(e) {
    this.setState({usernickname: event.target.value});    
  },
  
  handleCancel : function(e) {
      e.preventDefault();
      this.setState({isLoading: false});
      this.transitionTo('home');
  },
  successRegister: function() {
    this.props.onUserRegister();
  },
  errorRegister: function() {
    this.setState({
      isLoading : false,
      message: ParseToolHelper.message
    });
  },
  handleRegister: function(e) {
    e.preventDefault();
    
    this.setState({isLoading: true});
    
    var emailtxt = this.refs.email.getDOMNode().value.trim();
    var passwordtxt = this.refs.password.getDOMNode().value.trim();
    var nicknametxt = this.refs.nickname.getDOMNode().value.trim();

    ParseToolHelper.register(emailtxt, passwordtxt,nicknametxt, this.successRegister, this.errorRegister);
  },
  render: function() {
    var isLoading = this.state.isLoading;
    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Register</h3>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.handleRegister}>
                  <div className="form-group">
                    <input type="text" ref="email" className="form-control" placeholder="Email address" onChange={this.handleChangeEmail} value={this.state.useremail} required autofocus />
                  </div>
                  <div className="form-group">
                    <input type="text" ref="password" className="form-control" placeholder="Password" onChange={this.handleChangePassword} value={this.state.userpassword} required />
                  </div>
                  <div className="form-group">
                    <input type="text" ref="nickname" className="form-control" placeholder="Nickname" onChange={this.handleChangeNickName} value={this.state.usernickname} required />
                  </div>
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                          <button className="form-control btn-info" type="submit" disabled={isLoading} >
                              {(isLoading ? 'Please wait...' : 'Register')}
                          </button>
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                          <button className="form-control" onClick={this.handleCancel}>
                              Cancel
                          </button>
                      </div>
                    </div>
                  </div>
                  {(this.state.message.length > 0 ? 
                    <div className="form-group alert alert-danger" role="alert">
                      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;
                      <span className="sr-only">Error: </span>
                      {this.state.message}
                    </div>
                  : 
                    <span></span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Registerform;
