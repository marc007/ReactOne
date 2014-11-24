// Parse.initialize("VzfpPQ473axJ5uRnQJlLwP35DgsaybTzy9JdSpKs", "qaBwzCR8kV0WSNIdjbudVELukVVIYBj1JbWdbD7q");

// var UserList = Parse.Object.extend("UserList",{
//     defaults: {
//       title: "default title"
//     },
    
//     initialize: function() {
//       if (!this.get("title")) {
//         this.set({"title": this.defaults.title});
//       }
//     },
// });

// function getUserLists(listtype) {
//     var UserListCollection = Parse.Collection.extend({
//       model : UserList,
//       query : (new Parse.Query(UserList)).equalTo("type", listtype),
//     });

//     return new UserListCollection();
// }
// function getUserList(objectid) {
//     var query = new Parse.Query(UserList);
//     query.get(objectid, {
//       success: function(object) {
//         return object;
//       },
    
//       error: function(object, error) {
//         return null;
//       }
//     });
// }
// function newUserList(type,title) {
//     var now = new Date();
//     return ListItem(0,type,title,now,now);
// }
// function setUserList(object) {
//     return new ListItem(object.id,object.get("type"),object.get("title"),object.createdAt,object.updatedAt);
// }

// var EncodeDecode = {
//     getversion: function () {
//       return "<xl2list version=1.0>";
//     },
    
//     encrypt: function (txt,key) {
//       var result = '';
//       if( key.length > 0 && txt.length > 0) {
//         var len = this.getkey(key);
//         var i, s = '', fin = 0;
        
//         txt = this.getversion()+txt;
//         for( i=0; i<txt.length; i++ ) {
//           fin = txt.charCodeAt(i) + len;
//           if( fin>99 ) {
//             s += fin;
//           } else {
//             s += '0' + fin;
//           }
//         }
//         result = s;
//       }
//       else
//       {
//         result = txt;
//       }
//       return result;
//     },
    
//     decrypt: function (txt, key) {
//       var result = '';
//       if( key.length > 0 && txt.length > 0) {
//         var len = this.getkey(key);
//         var i, t, s = '',  tmp;
        
//         for( i=0; i<txt.length; i+=3 ) {
//           tmp = txt.substring(i,i+3);
//           t = unescape( '%' + ( parseInt(tmp) - len ).toString(16) );
//           if( t=='%9' ) {
//             s += '\t';
//           } else if( t=='%d' ) {
//             s += '\r';
//           } else if( t=='%a' ) {
//             s += '\n';
//           } else {
//             s += t;
//           }
//         }
//         result = s;
//       }
//       else
//       {
//         result = txt;
//       }
//       if(result.indexOf(this.getversion()) == 0)
//       {
//         result = result.replace(this.getversion(),'');
//       }
//       else
//       {
//         result = '';
//       }
//       return result;
//     },
    
//     getkey: function (key) {
//       var i, len = 0;
//       for( i = 0; i<key.length; i++ ) {
//         len += key.charCodeAt(i);
//       }
//       return len;
//     },
    
//     getrandom: function () {
//       var i = 8, r,
//       s = String.fromCharCode( Math.floor( Math.random() * 26 ) + ( Math.random()>0.5 ? 65 : 97 ) );
//       while(i--) {
//         r = Math.floor( Math.random() * 63 );
//         if( r<10 ) {
//           r += 48; 
//         }
//         else if( r<36 ) {
//           r += 55; 
//         }
//         else { 
//           r += 61; 
//         }
//         if( r==123 ) {
//           r = 95; 
//         }
//         s += String.fromCharCode( r );
//       }
//       return s;
//     },
// }
