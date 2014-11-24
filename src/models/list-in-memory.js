//'use strict';
const PRIVATE = 'Private';
const SHARED = 'Shared';
const PUBLIC = 'Public';

var UserListIem = {
    key: '',
    title: '',
    type: PRIVATE,
    encrypteddata: '',
    parentkey: '',
    
    Inititalize: function(itemkey,itemtitle,itemtype,itemencrypttext,itemparentkey) {
        this.key = itemkey;
        this.title = itemtitle;
        this.type = itemtype;
        this.encrypteddata = itemencrypttext;
        this.parentkey = itemparentkey;
        return this;
    }
};

var UserLists = {
    listUrl: "datas/userlist.json",
    listitemsprivate: [],
    listitemsshared: [],
    listitemspublic:[],

    Private: PRIVATE,
    Shared: SHARED,
    Public: PUBLIC,

    initialize: function(cb) {
        $.ajax({
            url: this.listUrl,
            datatype: 'json',
            success: function(data) {
                console.log('UserList.Initialize: success');
                if(Array.isArray(data))
                {
                    this.listitemsprivate = data.filter(function(item) { return (item.type == PRIVATE)});
                    this.listitemsshared = data.filter(function(item) { return (item.type == SHARED)});
                    this.listitemspublic = data.filter(function(item) { return (item.type == PUBLIC)});
                }
                cb();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('Error in UserList.Initialize:'+err);
                cb();
            }.bind(this)
        });
    },
    getAllOfType: function(listtype) {
        switch (listtype) {
            case PRIVATE:
                return this.listitemsprivate;
            case SHARED:
                return this.listitemsshared;
            case PUBLIC:
                return this.listitemspublic;
            default:
                return [];
        }
    },
    createList: function(itemtitle, itemtype, itemencrypttext) {
        return UserListIem.Inititalize('key0',itemtitle, itemtype, itemencrypttext, '');
    },
    addList: function(newlist) {
        switch (newlist.type) {
            case PRIVATE:
                this.listitemsprivate.push(newlist);
                break;
            case SHARED:
                this.listitemsshared.push(newlist);
                break;
            case PUBLIC:
                this.listitemspublic.push(newlist);
                break;
            default:
                break;
        }
    }
};

module.exports = UserLists;