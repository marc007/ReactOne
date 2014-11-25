
'use strict';

function UserListItem(itemtitle,itemtype,itemencrypttext, itemparentkey) {
    this.key = generatekey();
    this.title = itemtitle;
    this.type = itemtype;
    this.encrypteddata = itemencrypttext;
    this.parentkey = itemparentkey;
    
    function generatekey() {
        return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

var UserLists = {
    iscached: false,
    listUrl: "datas/userlist.json",
    listitemsprivate: [],
    listitemsshared: [],
    listitemspublic:[],

    Private: 'Private',
    Shared: 'Shared',
    Public: 'Public',
    Timeout: 0,

    initialize: function(cb) {
        console.log('UserLists.initialize using cache:'+this.iscached);
        if(!this.iscached)
        {
            $.ajax({
                url: this.listUrl,
                datatype: 'json',
                success: function(data) {
                    console.log('UserList.Initialize: success');
                    this.iscached = true;
                    if(Array.isArray(data))
                    {
                        this.listitemsprivate = data.filter(function(item) { return (item.type == this.Private)}.bind(this));
                        this.listitemsshared = data.filter(function(item) { return (item.type == this.Shared)}.bind(this));
                        this.listitemspublic = data.filter(function(item) { return (item.type == this.Public)}.bind(this));
                    }
                    cb();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log('Error in UserList.Initialize:'+err);
                    cb();
                }.bind(this)
            });
        }
        else cb();
    },
    getAllOfType: function(listtype) {
        switch (listtype) {
            case this.Private:
                return this.listitemsprivate;
            case this.Shared:
                return this.listitemsshared;
            case this.Public:
                return this.listitemspublic;
            default:
                return [];
        }
    },
    encryptClearText: function(cleardata, paraphrase) {
        return (cleardata+'-'+paraphrase).split('').reverse().join('');
    },
    createList: function(itemtitle, itemtype, itemencrypttext) {
        return new UserListItem(itemtitle, itemtype, itemencrypttext, '');
    },
    addList: function(newlist) {
        switch (newlist.type) {
            case this.Private:
                this.listitemsprivate.push(newlist);
                break;
            case this.Shared:
                this.listitemsshared.push(newlist);
                break;
            case this.Public:
                this.listitemspublic.push(newlist);
                break;
            default:
                break;
        }
    }
};

module.exports = UserLists;