/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var UserListHelper = require('../models/list-in-memory.js');
var ParseToolHelper = require('../libs/parse-tool.js');

var EditListform = React.createClass({
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
        itemtype: UserListHelper.Private,
        message: ''
      };
  },
  componentDidMount: function() {
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
  handleEncrypt : function(e) {
    e.preventDefault();
    
    this.setState({isEncrypting: true});

    setTimeout(function(encrypt) {
      var cleartext = this.state.itemcleartext;
      var pass = this.state.itempassphrase;
      var encrypt = UserListHelper.encryptClearText(cleartext, pass);
      
      this.setState({
        isEncrypting: false,
        itemencrypttext:  encrypt
      });
    }.bind(this), UserListHelper.Timeout);

  },
  successSave: function() {
    this.refs.passphrase.getDOMNode().value = '';
    this.setState({isSaving: false});
    this.transitionTo('userlist');
  },
  errorSave: function() {
    this.setState({
      message : 'new list failed:'+error.message,
      isSaving : false
    });
  },
  handleSave: function(e) {
    e.preventDefault();
    
    this.setState({isSaving: true});
    
    ParseToolHelper.newlist(
      this.state.itemtitle,
      this.state.itemtype,
      this.state.itemencrypttext,
      '',
      this.successSave, 
      this.errorSave
    );
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
                <h3 className="panel-title text-center">New {UserListHelper.Private} List</h3>
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
                          <button className="form-control btn-info" type="button" disabled={isEncrypting || (this.state.itempassphrase.length == 0) } onClick={(!isEncrypting ? this.handleEncrypt : null)}>{(isEncrypting ? 'Please wait...' : 'Encrypt')}</button>
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea ref="listencrypttext" className="form-control" placeholder="Enter your paraphrase first!" rows="3" value={this.state.itemencrypttext} required readOnly></textarea>
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
                    {(this.state.message.length > 0 ? 
                      <div className="form-group alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;
                        <span className="sr-only">Error: </span>
                        {this.state.message}
                      </div>
                    : 
                      <span></span>
                    )}
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EditListform;
