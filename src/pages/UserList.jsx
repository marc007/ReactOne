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
      //console.log('Authentication');
      //console.log('logged:'+ParseToolHelper.islogged);
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
    //console.log('getInitialState');
    return {
      listtype: UserListHelper.Private,
      listitems : [],
      listitemkey: '',
      message: ''
    };
  },
  dataLoaded: function dataloaded() {
    //console.log('dataLoaded');
    // this.setState({
    //   listitems : UserListHelper.getAllOfType(this.state.listtype)
    // });
  },
  successGetLists: function() {
    console.log(ParseToolHelper.listsuser);
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
    //console.log('componentDidMount');
    ParseToolHelper.getalllists(this.successGetLists, this.errorGetLists);
    // UserListHelper.initialize(this.dataLoaded);
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
                    <li role="presentation" onClick={this.changeListType.bind(this, UserListHelper.Private)} className={(this.state.listtype == UserListHelper.Private? 'active' : '')}>
                      <a href="#">
                        &nbsp;{UserListHelper.Private} <span className='badge'>{UserListHelper.listitemsprivate.length}</span>
                      </a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, UserListHelper.Shared)} className={(this.state.listtype == UserListHelper.Shared? 'active' : '')}>
                      <a href="#">{UserListHelper.Shared} <span className='badge'>{UserListHelper.listitemsshared.length}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, UserListHelper.Public)} className={(this.state.listtype == UserListHelper.Public? 'active' : '')}>
                      <a href="#">{UserListHelper.Public} <span className='badge'>{UserListHelper.listitemspublic.length}</span></a>
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
