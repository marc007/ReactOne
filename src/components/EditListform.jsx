/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;

var EditListDecript = React.createClass({
  getInitialState: function() {
      return {
        isLoading: false
      };
  },
  handleDecrypt : function() {
      this.refs.listcleartext.getDOMNode().value = "decrypted list here";
  },
  render: function() {
    var isLoading = this.state.isLoading;
    var elt;
    if(this.props.listtype != 'Public')
    {
      elt = <div className='panel-body'>
              <div className="row">
                <div className='col-md-12'>
                  <input type="password" ref="passphrase" className="form-control" placeholder="Paraphrase" />
                </div>
              </div>
              <div className="row">
                <div className='col-md-12'>
                  <Button className="form-control btn actionbutton" bStyle='primary' disabled={isLoading} onClick={(!isLoading ? this.handleDecrypt : null)}>
                      {(isLoading ? 'Please wait...' : 'Decrypt')}
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <textarea ref="listcleartext" className="form-control" placeholder="Enter your paraphrase first!" rows="3"></textarea>
                </div>
              </div>
            </div>;
    }
    else
    {
      elt = <div className='panel-body'>
              No Encryption for Public List
            </div>;
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>Encryption / Decryption</div>
        {elt}
      </div>
    );
  } 
});

var EditListform = React.createClass({
  mixins: [Router.Navigation],
  
  getInitialState: function() {
      return {
        isLoading: false,
        message: '',
        messageclass: 'alert' 
      };
  },
  
  handleSave: function(e) {
    e.preventDefault();
    
    this.setState({isLoading: true});
    
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
      
      this.setState({isLoading: false});
    }.bind(this), 1000);

    return;
  },
  handleCancel : function() {
      this.transitionTo('userlist');
  },
  render: function() {
    var isLoading = this.state.isLoading;
    var classMain = "btn-group btn-group-lg";
    var classPrivate = classMain + (this.props.item.type == 'Private'? " active" : "");
    var classShared = classMain + (this.props.item.type == 'Shared'? " active" : "");
    var classPublic = classMain + (this.props.item.type == 'Public'? " active" : "");
    return (
      <div className="editlistform">
        <form className="form-editlist" role="form">
            <h3 className="form-editlist-heading">Edit List</h3>
            <div className="well well-sm">
              <h2>{this.props.item.title}</h2>
            </div>
            <div className="btn-group btn-group-justified" role="group" aria-label="List Type">
                <div className="btn-group">
                    <Button type="button" className={classPrivate}>Private</Button>
                </div>
                <div className="btn-group">
                    <Button type="button" className={classShared}>Shared</Button>
                </div>
                <div className="btn-group">
                    <Button type="button" className={classPublic}>Public</Button>
                </div>
            </div> 
            <EditListDecript listtype={this.props.item.type} />
            <div className='btn-group btn-group-justified'>
                <div className='actionbutton btn-group'>
                    <Button className="form-control btn actionbutton" bStyle='primary' disabled={isLoading} onClick={(!isLoading ? this.handleSave : null)}>
                        {(isLoading ? 'Please wait...' : 'Save')}
                    </Button>
                </div>
                <div className='btn-group'>
                    <Button className="form-control btn" onClick={this.handleCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
            <p>
                <div className={this.state.messageclass} role="alert">{this.state.message}</div>
            </p>
        </form>
      </div>
    );
  }
});

module.exports = EditListform;
