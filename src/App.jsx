/**
 * @jsx React.DOM
 */

'use strict';
var appInfo = {
    name : 'XL2List Top',
    line : 'SHARING LISTS MADE EASIER AND SECURE'
};

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

// Export React so the dev tools can find it
if('production' != process.env.NODE_ENV)
{
    (window !== window.top ? window.top : window).React = React;
}

var DefaultPage = require('./layouts/DefaultLayout.jsx');
var HomePage = require('./pages/Home.jsx');
var PrivacyPage = require('./pages/Privacy.jsx');
var LoginPage = require('./pages/Login.jsx');
var RegisterPage = require('./pages/Register.jsx');
var UserListPage = require('./pages/UserList.jsx');
var EditListPage = require('./pages/EditList.jsx');
var NewListPage = require('./pages/NewList.jsx');
var FourOFourPage = require('./pages/FourOFour.jsx');
var TestEncryptDecryptPage = require('./pages/TestEncryptDecrypt.jsx');
var TestTreeListPage = require('./pages/TestTreeList.jsx');

var routes = (
    <Route handler={DefaultPage}>
        <Route name="testtreelist" path="/" handler={TestTreeListPage} />
        <Route name="testencryptdecrypt" handler={TestEncryptDecryptPage} />
        <Route name="home" handler={HomePage} />
        <Route name="privacy" handler={PrivacyPage} />
        <Route name="login" handler={LoginPage} />
        <Route name="register" handler={RegisterPage} />
        <Route name="newlist" handler={NewListPage} url='../datas/userlist.json' />
        <Route name="userlist" handler={UserListPage} url='../datas/userlist.json' />
        <Route name="editlist" path=":keyItem" handler={EditListPage} />
        <DefaultRoute handler={DefaultPage} />
        <NotFoundRoute handler={FourOFourPage}/>
        <Redirect from="error" to="home" />
    </Route>
  );

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    var params = state.params;
    React.render(<Handler params={params} AppInfo={appInfo} />, document.body);    
})
