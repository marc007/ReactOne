/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var ParseToolHelper = require('../libs/parse-tool.js');

var EditListform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isDecrypting: false,
        isEncrypting: false,
        isSaving: false,
        itemkey: '',
        itemtitle: '',
        itemcleartext: '',
        itemdecryptpassphrase: '',
        itemencryptpassphrase: '',
        itemencrypttext: '',
        itemtype: ParseToolHelper.listtypes.PRIVATE,
        message: ''
      };
  },
  componentDidMount: function() {
    this.setState({
      itemkey : this.props.item.key,
      itemtitle: this.props.item.title,
      itemencrypttext: this.props.item.encrypteddata,
      itemtype: this.props.item.type
    });
  },
  handleChangeTitle: function(e) {
    this.setState({itemtitle: event.target.value});    
  },
  handleChangeClearText: function(e) {
    this.setState({itemcleartext: event.target.value});    
  },
  handleChangeDecryptParaphrase: function(e) {
    this.setState({itemdecryptpassphrase: event.target.value});    
  },
  handleChangeEncryptParaphrase: function(e) {
    this.setState({itemencryptpassphrase: event.target.value});    
  },
  handleChangeType : function(newtype, e) {
    e.preventDefault();
    this.setState({itemtype: newtype});    
  },
  handleDecrypt : function(e) {
    e.preventDefault();
    
    this.setState({isDecrypting: true});

    var encrypttext = this.state.itemencrypttext;
    var pass = this.state.itemdecryptpassphrase;
    var decrypt = this.props.item.decryptText(encrypttext, pass);
    
    this.setState({
      isDecrypting: false,
      itemcleartext:  decrypt
    });
  },
  handleEncrypt : function(e) {
    e.preventDefault();
    
    this.setState({isEncrypting: true});

    var cleartext = this.state.itemcleartext;
    var pass = this.state.itemencryptpassphrase;
    var encrypt = this.props.item.encryptText(cleartext, pass);
    
    this.setState({
      isEncrypting: false,
      itemencrypttext:  encrypt
    });

  },
  successSave: function() {
    this.refs.passphrase.getDOMNode().value = '';
    this.setState({isSaving: false});
    this.transitionTo('userlist');
  },
  errorSave: function() {
    this.setState({
      message : 'saving list failed:'+error.message,
      isSaving : false
    });
  },
  handleSave: function(e) {
    e.preventDefault();
    
    this.setState({isSaving: true});
    
    ParseToolHelper.updatelist(
      this.state.itemkey,
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
    var isDecrypting = this.state.isDecrypting;
    var isEncrypting = this.state.isEncrypting;
    var isSaving = this.state.isSaving;
    var classMain = "btn-group btn-group-lg";
    var classPrivate = classMain + (this.state.itemtype == ParseToolHelper.listtypes.PRIVATE? " active" : "");
    var classShared = classMain + (this.state.itemtype == ParseToolHelper.listtypes.SHARED? " active" : "");
    var classPublic = classMain + (this.state.itemtype == ParseToolHelper.listtypes.PUBLIC? " active" : "");
    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Update List [{this.state.itemkey}]</h3>
              </div>
              <div className="panel-body">
                <form role="form" onSubmit={this.handleSave}>
                    <div className="form-group">
                      <input type="text" ref="title" placeholder="Title" className="form-control" onChange={this.handleChangeTitle} value={this.state.itemtitle} required autofocus />
                    </div>
                    <div className="form-group btn-group btn-group-justified" role="group" aria-label="List Type">
                        <div className="btn-group">
                            <button type="button" 
                              onClick={this.handleChangeType.bind(this, ParseToolHelper.listtypes.PRIVATE)} 
                              className={classPrivate}>{ParseToolHelper.listtypes.PRIVATE}</button>
                        </div>
                        <div className="btn-group">
                            <button type="button" 
                              onClick={this.handleChangeType.bind(this, ParseToolHelper.listtypes.SHARED)} 
                              className={classShared}>{ParseToolHelper.listtypes.SHARED}</button>
                        </div>
                        <div className="btn-group">
                            <button type="button"
                              onClick={this.handleChangeType.bind(this, ParseToolHelper.listtypes.PUBLIC)} 
                              className={classPublic}>{ParseToolHelper.listtypes.PUBLIC}</button>
                        </div>
                    </div> 
                    <div className="form-group">
                      <textarea ref="listencrypttext" className="form-control" placeholder="Enter your paraphrase first!" rows="3" value={this.state.itemencrypttext} required readOnly></textarea>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <input type="password" ref="decryptpassphrase" placeholder="Decryption Paraphrase" className="form-control" 
                          onChange={this.handleChangeDecryptParaphrase} value={this.state.itemdecryptpassphrase} required />
                        <span className="input-group-btn">
                          <button className="form-control btn-info" type="button" 
                            disabled={isDecrypting || (this.state.itemdecryptpassphrase.length == 0) } 
                            onClick={(!isDecrypting ? this.handleDecrypt : null)}>{(isDecrypting ? 'Please wait...' : 'Decrypt')}</button>
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea ref="listcleartext" className="form-control" placeholder="Paste your list here..." rows="3" onChange={this.handleChangeClearText} value={this.state.itemcleartext} required></textarea>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <input type="password" ref="encryptpassphrase" placeholder="Encryption Paraphrase" className="form-control" 
                          onChange={this.handleChangeEncryptParaphrase} value={this.state.itemencryptpassphrase} required />
                        <span className="input-group-btn">
                          <button className="form-control btn-info" type="button" 
                            disabled={isEncrypting || (this.state.itemencryptpassphrase.length == 0) } 
                            onClick={(!isEncrypting ? this.handleEncrypt : null)}>{(isEncrypting ? 'Please wait...' : 'Encrypt')}</button>
                        </span>
                      </div>
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
