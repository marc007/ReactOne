'use strict';

Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");

function ParseUser(parseuser) {
    this.email = parseuser.get('email');
    this.nickname = parseuser.get('nickname');
}

var ParseTool = {
    islogged: false,
    message: '',
    ParseUser: null,

    initialize: function(email, password, successCB, errorCB) {
        if(!this.islogged)
        {
            Parse.User.logIn(email, password, {
               success: function(user) {
                   this.islogged = true;
                   this.ParseUser = new ParseUser(Parse.User.current());
                   successCB();
                   return;
               }.bind(this),
               error: function(user,error) {
                   this.islogged = false;
                   this.ParseUser = null;
                   this.message = error.message;
                   errorCB();
                   return;
               }.bind(this)
            });
        }
        else {
            this.ParseUser = new ParseUser(Parse.User.current());
            successCB();
        }
    },
    logout: function() {
        if(this.islogged)
        {
            Parse.User.logOut();
        }
        this.ParseUser = null;
        this.islogged = false;
        this.message = '';
    }
};

module.exports = ParseTool;
