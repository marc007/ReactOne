/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var UserList = require('../models/list-in-memory.js');
var UserListItem = require('../models/list-in-memory.js');

var NewListform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isEncrypting: false,
        isSaving: false,
        itemkey: 0,
        itemtitle: 'test new list',
        itemcleartext: 'this is the clear text',
        itempassphrase: '',
        itemencrypttext: '',
        itemtype: UserList.Private
      };
  },
  componentDidMount: function() {
    
  },
  handleChangeType: function(newtype, e) {
    e.preventDefault();
    this.setState({itemtype : newtype});
  },
  handleChangeTitle: function(e) {
    this.setState({itemtitle: event.target.value});    
  },
  handleChangeClearText: function(e) {
    this.setState({itemcleartext: event.target.value});    
  },
  handleChangeParaphrase: function(e) {
    this.setState({itempassphrase: event.target.value});    
  },
  handleChangeEncryptText: function(e) {
    this.setState({itemencrypttext: event.target.value});    
  },
  handleEncrypt : function(e) {
    e.preventDefault();
    
    this.setState({isEncrypting: true});

    setTimeout(function() {

      this.setState({
        isEncrypting: false,
        itemencrypttext: this.state.itemcleartext.split('').reverse().join('')
      });
    }.bind(this), 1000);

  },
  handleSave: function(e) {
    e.preventDefault();
    
    this.setState({isSaving: true});
    
    var newlist = UserList.createList(this.state.itemtitle, this.state.itemtype, this.state.itemencrypttext);
    console.log(newlist);
    UserList.addList(newlist);
    console.log(UserList.listitemsprivate);
    setTimeout(function() {

      this.refs.passphrase.getDOMNode().value = '';
      this.setState({isSaving: false});
      this.transitionTo('userlist');
      
    }.bind(this), 1000);

    return;
  },
  handleCancel : function() {
      this.setState({isSaving: false});
      this.transitionTo('userlist');
  },
  render: function() {
    var isEncrypting = this.state.isEncrypting;
    var isSaving = this.state.isSaving;
    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">New {UserList.Private} List</h3>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.handleSave}>
                    <div className="form-group">
                      <input type="text" ref="title" placeholder="Title" className="form-control" onChange={this.handleChangeTitle} value={this.state.itemtitle} required autofocus />
                    </div>
                    <div className="form-group">
                      <textarea ref="listcleartext" className="form-control" placeholder="Paste your list here..." rows="3" onChange={this.handleChangeClearText} value={this.state.itemcleartext} required></textarea>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <input type="password" ref="passphrase" placeholder="Paraphrase" className="form-control" onChange={this.handleChangeParaphrase} value={this.state.itempassphrase} required />
                        <span className="input-group-btn">
                          <button className="form-control btn-info" type="submit" disabled={isEncrypting || (this.state.itempassphrase.length == 0) } onClick={(!isEncrypting ? this.handleEncrypt : null)}>{(isEncrypting ? 'Please wait...' : 'Encrypt')}</button>
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea ref="listencrypttext" className="form-control" placeholder="Enter your paraphrase first!" rows="3" onChange={this.handleChangeEncryptText} value={this.state.itemencrypttext} required></textarea>
                    </div>
                    <div className="row">
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                            <button className="form-control btn-info" type="submit" disabled={isSaving} >
                                {(isSaving ? 'Please wait...' : 'Save')}
                            </button>
                        </div>
                      </div>
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                            <button className="form-control" onClick={this.handleCancel}>
                                Cancel
                            </button>
                        </div>
                      </div>
                    </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NewListform;
