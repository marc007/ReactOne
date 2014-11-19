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
      listitemkey: ''
    };
  },
  
  getData: function() {
    $.ajax({
      url: this.props.url,
      datatype: 'json',
      success: function(data) {
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
  render: function() {
    var filter = this.state.listtype;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>My Lists</h3>
            <nav class="navbar navbar-inverse" role="navigation">
              <div className="container">
                <ul className="nav nav-pills">
                  <li role="presentation" onClick={this.changeListType.bind(this, 'Private')} className={(filter == 'Private'? 'active' : '')}><a href="#">Private</a></li>
                  <li role="presentation" onClick={this.changeListType.bind(this, 'Shared')} className={(filter == 'Shared'? 'active' : '')}><a href="#">Shared</a></li>
                  <li role="presentation" onClick={this.changeListType.bind(this, 'Public')} className={(filter == 'Public'? 'active' : '')}><a href="#">Public</a></li>
                </ul>      
              </div>
            </nav>
            <div className="list-group">
              <ListBox listitems={this.state.listitems} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserListPage;
