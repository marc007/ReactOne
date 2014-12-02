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
      title: "default title",
      type : "Private"
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
      if (!this.get("type")) {
        this.set({"type": this.defaults.type});
      }
    },
    
    fill: function(title, type, encrypteddata, parentkey, acluser) {
        this.set("title", title);
        this.set("type", type);
        this.set("encrypteddata", encrypteddata);
        this.set("parentkey", parentkey);
        this.setACL(new Parse.ACL(acluser));
    }
});
var ParseListCollection = Parse.Collection.extend({
    model : ParseList
});

var ParseTool = {
    islogged: false,
    message: '',
    loggeduser: null,
    listsuser: [],

    login: function(email, password, successCB, errorCB) {
        if(!this.islogged)
        {
            Parse.User.logIn(email, password, {
               success: function(user) {
                   this.islogged = true;
                   this.loggeduser = new LoggedUser(Parse.User.current());
                   successCB && successCB();
                   return;
               }.bind(this),
               error: function(user,error) {
                   this.islogged = false;
                   this.loggeduser = null;
                   this.message = error.message;
                   errorCB && errorCB();
                   return;
               }.bind(this)
            });
        }
        else {
            this.loggeduser = new LoggedUser(Parse.User.current());
            successCB && successCB();
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
                    this.loggeduser = new LoggedUser(Parse.User.current());
                    successCB && successCB();
                    return;
               }.bind(this),
               error: function(user,error) {
                    this.islogged = false;
                    this.loggeduser = null;
                    this.message = error.message;
                    errorCB && errorCB();
                   return;
               }.bind(this)
            });
        }
        else {
            this.loggeduser = new LoggedUser(Parse.User.current());
            successCB && successCB();
        }
    },
    logout: function() {
        if(this.islogged)
        {
            Parse.User.logOut();
        }
        this.loggeduser = null;
        this.listsuser = [];
        this.islogged = false;
        this.message = '';
    },
    newlist: function(title, listtype, encrypteddata, parentkey,successCB, errorCB) {
        var newuserlist = new ParseList();
        newuserlist.fill(
            title,
            listtype,
            encrypteddata,
            parentkey,
            this.loggeduser.currentuser
        );
        newuserlist.save(null, {
          success: function(newlist) {
              successCB && successCB(newlist);
          }.bind(this),
          error: function(userlist, error) {
              this.message = error.message;
              errorCB && errorCB();
          }.bind(this)
        });
    },
    getalllists: function(successCB,errorCB) {
        var collection = new ParseListCollection();
        collection.fetch({
            success: function(collection) {
                this.listsuser = [];
                collection.each(function(object) {
                    var list = {
                        key: object.id,
                        title: object.get("title"),
                        type: object.get("type")
                    };
                    this.listsuser.push(list);
                }.bind(this));
                console.log(this.listsuser);
                successCB && successCB();
                return;
            }.bind(this),
            error: function(collection, error) {
                this.message = error.message;
                errorCB && errorCB();
                return;
            }.bind(this)
        });
    },
    getlists: function(listtype) {
        if(Array.isArray(this.listsuser))
        {
            var filteredlist = this.listsuser.filter(function(item) { return (item.type == listtype)}.bind(this));
            console.log(filteredlist);
            return filteredlist;
        }
    }
    
};

function LoggedUser(parseuser) {
    this.email = parseuser.get('email');
    this.nickname = parseuser.get('nickname');
    this.currentuser = parseuser;
}

module.exports = ParseTool;
