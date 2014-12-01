'use strict';

Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");

function ListItem(id,type,title,createdon, updatedon) {
    var self = this;
    self.ObjectId = id;
    self.Type = type;
    self.Title = title;
    self.CreatedOn = createdon;
    self.UpdatedOn = updatedon;
    return self;
} 


var ParseList = Parse.Object.extend("List",{
    defaults: {
      title: "default title"
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
    }
});

function ParseUser(parseuser) {
    this.email = parseuser.get('email');
    this.nickname = parseuser.get('nickname');
}

var ParseTool = {
    islogged: false,
    message: '',
    ParseUser: null,

    login: function(email, password, successCB, errorCB) {
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
    register: function(email, password, nickname, successCB, errorCB) {
        if(!this.islogged)
        {
            var user = new Parse.User();
            user.set("username", email);
            user.set("password", password);
            user.set("email", email);
            user.set("nickname", nickname);
            
            user.signUp(null, {
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
