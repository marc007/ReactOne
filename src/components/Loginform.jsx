/**
 * @jsx React.DOM
 */

'use strict';

          // <!-- <input type="email" ref="email" className="form-control" placeholder="Email address" required autofocus /> -->
          // <!-- <input type="password" ref="password" className="form-control" placeholder="Password" required /> -->

var React = require('react');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;

var UserListHelper = require('../models/list-in-memory.js');
var ParseToolHelper = require('../libs/parse-tool.js');

// Parse Initialization
// Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");    

var Loginform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isLoading: false,
        useremail: 'test6@test.com',
        userpassword: '006',
        message: ''
      };
  },
  
  handleChangeEmail: function(e) {
    this.setState({useremail: event.target.value});    
  },
  handleChangePassword: function(e) {
    this.setState({userpassword: event.target.value});    
  },
  
  handleCancel : function(e) {
      e.preventDefault();
      this.setState({isLoading: false});
      this.transitionTo('home');
  },
  successLogin: function() {
    this.props.onUserLogin();
    this.transitionTo('userlist');
  },
  errorLogin: function() {
    this.setState({
      isLoading : false,
      message: ParseToolHelper.message
    });
  },
  handleLogin: function(e) {
    e.preventDefault();
    
    this.setState({isLoading: true});
    
    var emailtxt = this.refs.email.getDOMNode().value.trim();
    var passwordtxt = this.refs.password.getDOMNode().value.trim();

    ParseToolHelper.initialize(emailtxt, passwordtxt, this.successLogin, this.errorLogin);
  },
  render: function() {
    var isLoading = this.state.isLoading;
    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Login</h3>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.handleLogin}>
                  <div className="form-group">
                    <input type="text" ref="email" className="form-control" placeholder="Email address" onChange={this.handleChangeEmail} value={this.state.useremail} required autofocus />
                  </div>
                  <div className="form-group">
                    <input type="text" ref="password" className="form-control" placeholder="Password" onChange={this.handleChangePassword} value={this.state.userpassword} required />
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" value="remember-me" />
                      Remember me
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                          <button className="form-control btn-info" type="submit" disabled={isLoading} >
                              {(isLoading ? 'Please wait...' : 'Login')}
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

module.exports = Loginform;
