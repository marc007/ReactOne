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

// <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
//   Launch demo modal
// </button>
// <ListModal />

var ListModal = React.createClass({
  render: function() {
    return(
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                <p>One fine body&hellip;</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      );
  }
});

var UserListPage = React.createClass({
  mixins: [Authentication, Router.Navigation],
  
  getInitialState: function() {
    return {
      isloading: false,
      isselecting: false,
      listtype: ParseToolHelper.listtypes.PRIVATE,
      listitems : [],
      listitemkey: '',
      message: ''
    };
  },
  successGetLists: function() {
    this.setState({
      isloading : false,
      listitems : ParseToolHelper.getlists(this.state.listtype)
    });
  },
  errorGetLists: function() {
    this.setState({
      isloading : false,
      message: ParseToolHelper.message,
      listitems : []
    });
  },
  componentDidMount: function() {
    this.setState({isloading : true});
    ParseToolHelper.getalllists(this.successGetLists, this.errorGetLists);
  },
  changeListType: function(newtype, e) {
    e.preventDefault();
    this.setState({
      listitems : ParseToolHelper.getlists(newtype),
      listtype : newtype      
    });
  },
  selectItem: function(item, e) {
    this.setState({isselecting : true});
  },
  newList: function(e) {
    e.preventDefault();
    this.transitionTo('newlist');
  },
  render: function() {
    var filter = this.state.listtype;
    var loading = this.state.isloading;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <h3>My Lists</h3>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                <h3>
                  <button type="button" className="btn btn-default btn-sm btn-info" onClick={this.newList}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                </h3>
              </div>
            </div>
            <div className="row">
              <nav className="navbar" role="navigation">
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
              {(loading ? 
                <div className="container"><h1>Loading...</h1></div>
              :
                <div className="list-group">
                  {this.state.listitems.map( function(item) {
                    return <ListItemWrapper key={item.key} data={item} onclick={this.selectItem.bind(this, item)} />;
                  }.bind(this))}
                </div>
              )}
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
