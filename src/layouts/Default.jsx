/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Link} = require('react-router');

var Navbar = require('../components/Navbar.jsx');
var Jumbotron = require('../components/Jumbotron.jsx');
var Navbarbottom = require('../components/Navbarbottom.jsx');
var today = new Date();

//var currentUser = Parse.User.current();
// var query = new Parse.Query(Parse.User);
// query.find({
//   success: function(users) {
//     for (var i = 0; i < users.length; ++i) {
//       console.log(users[i].get('username'));
//     }
//   }
// });

var DefaultLayout = React.createClass({
  getInitialState: function() {
      return {user: ''};
  },
  userStatus: function(usr) {
    this.setState({user : usr});
  },
  render: function() {
    return (
      <div>
        <Navbar currentuser={this.state.user} />
		    <Jumbotron />
        <this.props.activeRouteHandler userstatus={this.userStatus} />
        <Navbarbottom date={today} />
      </div>
    );
  }
});

module.exports = DefaultLayout;
