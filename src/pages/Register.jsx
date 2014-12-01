/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Registerform = require('../components/Registerform.jsx');

var RegisterPage = React.createClass({
  mixins: [Router.Navigation],

  statics: {
    attemptedTransition: null
  },
    
  registerUser: function() {
    this.props.onUserRegister();  

    if (RegisterPage.attemptedTransition) {
        var transition = RegisterPage.attemptedTransition;
        RegisterPage.attemptedTransition = null;
        transition.retry();
    } else {
        this.replaceWith('/userlist');
    }    
  },
  render: function() {
    return (
      <div className="container">
        <Registerform onUserRegister={this.registerUser} />
      </div>
    );
  }
});

module.exports = RegisterPage;
