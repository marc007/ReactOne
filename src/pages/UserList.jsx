/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var UserListHelper = require('../models/list-in-memory.js');
var LoginPage = require('../pages/Login.jsx');
var ParseToolHelper = require('../libs/parse-tool.js');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!ParseToolHelper.islogged) {
        LoginPage.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  }
};

var ListItemWrapper = React.createClass({
  render: function() {
      return (
        <Link to="editlist" params={{keyItem: this.props.data.key}} className="list-group-item">{this.props.data.title} - {this.props.data.type} [{this.props.data.key}]</Link>
      );
  }
});

var UserListPage = React.createClass({
  mixins: [Authentication, Router.Navigation],
  
  getInitialState: function() {
    return {
      listtype: ParseToolHelper.listtypes.PRIVATE,
      listitems : [],
      listitemkey: '',
      message: ''
    };
  },
  successGetLists: function() {
    this.setState({
      listitems : ParseToolHelper.getlists(this.state.listtype)
    });
  },
  errorGetLists: function() {
    this.setState({
      message: ParseToolHelper.message,
      listitems : []
    });
  },
  componentDidMount: function() {
    ParseToolHelper.getalllists(this.successGetLists, this.errorGetLists);
  },
  changeListType: function(newtype, e) {
    e.preventDefault();
    this.setState({
      listitems : ParseToolHelper.getlists(newtype),
      listtype : newtype      
    });
  },
  newList: function(e) {
    e.preventDefault();
    this.transitionTo('newlist');
  },
  render: function() {
    var filter = this.state.listtype;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <h3>My Lists&nbsp;<button type="button" className="btn btn-default btn-sm btn-info" onClick={this.newList}><span className="glyphicon glyphicon-plus"></span></button></h3>
            </div>
            <div className="row">
              <nav class="navbar navbar-inverse" role="navigation">
                <div className="container">
                  <ul className="nav nav-tabs">
                    <li role="presentation" 
                      onClick={this.changeListType.bind(this, ParseToolHelper.listtypes.PRIVATE)} 
                      className={(this.state.listtype == ParseToolHelper.listtypes.PRIVATE? 'active' : '')}>
                        <a href="#">{ParseToolHelper.listtypes.PRIVATE} <span className='badge'>{ParseToolHelper.listsuserprivatecount}</span></a>
                    </li>
                    <li role="presentation" 
                      onClick={this.changeListType.bind(this, ParseToolHelper.listtypes.SHARED)} 
                      className={(this.state.listtype == ParseToolHelper.listtypes.SHARED? 'active' : '')}>
                        <a href="#">{ParseToolHelper.listtypes.SHARED} <span className='badge'>{ParseToolHelper.listsusersharedcount}</span></a>
                    </li>
                    <li role="presentation" 
                      onClick={this.changeListType.bind(this, ParseToolHelper.listtypes.PUBLIC)} 
                      className={(this.state.listtype == ParseToolHelper.listtypes.PUBLIC? 'active' : '')}>
                        <a href="#">{ParseToolHelper.listtypes.PUBLIC} <span className='badge'>{ParseToolHelper.listsuserpubliccount}</span></a>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="list-group">
                {this.state.listitems.map( function(item) {
                  return <ListItemWrapper key={item.key} data={item}/>;
                })}
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
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
