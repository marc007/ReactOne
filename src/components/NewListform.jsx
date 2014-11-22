/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');

var NewListform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isDecrypting: false,
        isSaving: false,
        newitem: {
          key: 0,
          title: '',
          type: 'Private'
        }
      };
  },
  componentDidMount: function() {
    var item = {};
    item.key = 0;
    item.title = '';
    item.type = this.props.listtype;
    this.setState({newitem : item});
  },
  handleChangeType: function(newtype, e) {
    e.preventDefault();
    var item = {};
    item.key = this.state.newitem.key;
    item.title = this.state.newitem.title;
    item.type = newtype;
    this.setState({newitem : item});
  },
  handleDecrypt : function(e) {
    e.preventDefault();
    
    this.setState({isDecrypting: true});

    setTimeout(function() {

      this.refs.passphrase.getDOMNode().value = '';

      this.setState({isDecrypting: false});
      this.refs.listcleartext.getDOMNode().value = "decrypted list here";
    }.bind(this), 1000);

  },
  handleSave: function(e) {
    e.preventDefault();
    
    this.setState({isSaving: true});
    
    var passphrasetxt = this.refs.passphrase.getDOMNode().value.trim();
    if(this.props.isOnline)
    {
      if(!passphrasetxt)
      {
        //return;
      }
    }
    else
    {
      passphrasetxt = "006";
    }
    setTimeout(function() {

      this.refs.passphrase.getDOMNode().value = '';
      this.transitionTo('userlist');
      
      this.setState({isSaving: false});
    }.bind(this), 1000);

    return;
  },
  handleCancel : function() {
      this.setState({isSaving: false});
      this.transitionTo('userlist');
  },
  render: function() {
    var isDecrypting = this.state.isDecrypting;
    var isSaving = this.state.isSaving;
    var item = this.state.newitem;
    var classMain = "btn-group-lg btn-block";
    var classPrivate = classMain + (item.type == 'Private'? " active" : "");
    var classShared = classMain + (item.type == 'Shared'? " active" : "");
    var classPublic = classMain + (item.type == 'Public'? " active" : "");
    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">New List</h3>
              </div>
              <div className="panel-body">
                <form role="form">
                    <div className="form-group">
                      <input type="text" ref="title" placeholder="Title" className="form-control" />
                    </div>
                    
                    <div className="form-group btn-group btn-group-justified" role="group">
                        <div className="btn-group">
                            <button type="button" onClick={this.handleChangeType.bind(this, 'Private')} className={classPrivate}>Private</button>
                        </div>
                        <div className="btn-group">
                            <button type="button" onClick={this.handleChangeType.bind(this, 'Shared')} className={classShared}>Shared</button>
                        </div>
                        <div className="btn-group">
                            <button type="button" onClick={this.handleChangeType.bind(this, 'Public')} className={classPublic}>Public</button>
                        </div>
                    </div>
                    <div className="input-group">
                      <input type="password" ref="passphrase" placeholder="Paraphrase" className="form-control" />
                      <span className="input-group-btn">
                        <button className="form-control btn-info" disabled={isDecrypting} onClick={(!isDecrypting ? this.handleDecrypt : null)}>{(isDecrypting ? 'Please wait...' : 'Decrypt')}</button>
                      </span>
                    </div>
                    <div className="form-group">
                      <textarea ref="listcleartext" className="form-control" placeholder="Enter your paraphrase first!" rows="5"></textarea>
                    </div>
                    <div className="row">
                      <div className="col-xs-6 col-sm-6 col-md-6">
                        <div className="form-group">
                            <button className="form-control btn-info" disabled={isSaving} onClick={(!isSaving ? this.handleSave : null)}>
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
