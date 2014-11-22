/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var listitems = [
  {title: "My Wines", type: "Private"},
  {title: "My Books", type: "Public"}
];

var ListBox = React.createClass({
  render: function() {
    var items = this.props.listitems.map(function (item) {
      return (
          <Link to="editlist" params={{keyItem: item.key}} className="list-group-item">{item.title} - {item.type}</Link>
      );
    });
    return (
        <span>{items}</span>
    );
  }
});

var UserListPage = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
    return {
      listtype: 'Private',
      listitems : [],
      listitemkey: '',
      listitemprivatecount: 0,
      listitemsharedcount: 0,
      listitempubliccount: 0
    };
  },
  getData: function() {
    $.ajax({
      url: this.props.url,
      datatype: 'json',
      success: function(data) {
        this.setState({listitemprivatecount : data.filter(function(item) {return (item.type == 'Private');}).length});
        this.setState({listitemsharedcount : data.filter(function(item) {return (item.type == 'Shared');}).length});
        this.setState({listitempubliccount : data.filter(function(item) {return (item.type == 'Public');}).length});
        var filter = this.state.listtype;
        var datafiltered = data.filter(function(item) { return (item.type === filter);})
        this.setState({listitems : datafiltered});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.getData();
  },
  changeListType: function(newtype, e) {
    e.preventDefault();
    this.setState({listtype : newtype});
    this.getData();
  },
  newList: function(e) {
    e.preventDefault();
    this.transitionTo('newlist',{listtype:this.state.listtype});
  },
  render: function() {
    var filter = this.state.listtype;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-8">
                <h3>My Lists</h3>
              </div>
              <div className="col-sm-4">
                <button type="button" className="btn btn-default btn-lg" onClick={this.newList}>Add New List</button>
              </div>
            </div>
            <div className="row">
              <nav class="navbar navbar-inverse" role="navigation">
                <div className="container">
                  <ul className="nav nav-tabs">
                    <li role="presentation" onClick={this.changeListType.bind(this, 'Private')} className={(filter == 'Private'? 'active' : '')}>
                      <a href="#">Private <span className='badge'>{this.state.listitemprivatecount}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, 'Shared')} className={(filter == 'Shared'? 'active' : '')}>
                      <a href="#">Shared <span className='badge'>{this.state.listitemsharedcount}</span></a>
                    </li>
                    <li role="presentation" onClick={this.changeListType.bind(this, 'Public')} className={(filter == 'Public'? 'active' : '')}>
                      <a href="#">Public <span className='badge'>{this.state.listitempubliccount}</span></a>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="list-group">
                <ListBox listitems={this.state.listitems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
