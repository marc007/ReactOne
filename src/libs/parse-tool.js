'use strict';

Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");

var ListTypes = {
    PRIVATE : 'Private',
    SHARED : 'Shared',
    PUBLIC : 'Public'
};

var ParseList = Parse.Object.extend("List",{
    defaults: {
      title: "default title",
      type : ListTypes.PRIVATE
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
    },
    update: function(title, type, encrypteddata, parentkey) {
        this.set("title", title);
        this.set("type", type);
        this.set("encrypteddata", encrypteddata);
        this.set("parentkey", parentkey);
    },
    encryptText: function(cleardata, paraphrase) {
        return (cleardata+'-'+paraphrase).split('').reverse().join('');
    },
    decryptText: function(cleardata, paraphrase) {
        return (cleardata+'-'+paraphrase).split('').reverse().join('');
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
    listtypes: ListTypes,
    listsuserprivatecount: 0,
    listsusersharedcount: 0,
    listsuserpubliccount: 0,

    login: function(email, password, successCB, errorCB) {
        if(!this.islogged)
        {
            Parse.User.logIn(email, password, {
               success: function(user) {
                   this.islogged = true;
                   this.loggeduser = {
                        email: Parse.User.current().get('email'),
                        nickname: Parse.User.current().get('nickname'),
                        currentuser: Parse.User.current()
                   };
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
          error: function(newlist, error) {
              this.message = error.message;
              errorCB && errorCB();
          }.bind(this)
        });
    },
    updatelist: function(key, title, listtype, encrypteddata, parentkey,successCB, errorCB) {
        var query = new Parse.Query(ParseList);
        query.get(key, {
            success: function(updatelist) {
                updatelist.update(title, listtype, encrypteddata, parentkey);
                updatelist.save();
                successCB && successCB(updatelist);
            }.bind(this),
            error: function(object, error) {
                this.message = error.message;
                errorCB && errorCB();
            }.bind(this)
        });        
    },
    getalllists: function(successCB,errorCB) {
        var collection = new ParseListCollection();
        collection.fetch({
            success: function(collection) {
                this.listsuserprivatecount = 0;
                this.listsusersharedcount = 0;
                this.listsuserpubliccount = 0;
                this.listsuser = [];
                collection.each(function(object) {
                    var list = {
                        key: object.id,
                        title: object.get("title"),
                        type: object.get("type"),
                        encrypteddata: object.get("encrypteddata")
                    };
                    switch (list.type) {
                        case ListTypes.PRIVATE:
                            this.listsuserprivatecount++;
                            break;
                        case ListTypes.SHARED:
                            this.listsusersharedcount++;
                            break;
                        case ListTypes.PUBLIC:
                            this.listsuserpubliccount++;
                            break;
                    }
                    this.listsuser.push(list);
                }.bind(this));
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
            return this.listsuser.filter(function(item) { return (item.type == listtype)}.bind(this));
        }
    },
    getlistitem: function(itemkey) {
        if(Array.isArray(this.listsuser))
        {
            return this.listsuser.filter(function(item) { return (item.key == itemkey)}.bind(this));
        }
    }
};

module.exports = ParseTool;
