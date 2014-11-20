/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;

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
    return (
      <div className="editlistform">
        <form className="form-editlist" role="form">
            <h3 className="form-editlist-heading">Edit List</h3>
            <h2>{this.props.item.title}</h2>
            <div className="btn-group btn-group-justified" role="group" aria-label="List Type">
                <div className="btn-group">
                    <Button type="button" className="btn-group btn-group-lg">Private</Button>
                </div>
                <div className="btn-group">
                    <Button type="button" className="btn-group btn-group-lg">Shared</Button>
                </div>
                <div className="btn-group">
                    <Button type="button" className="btn-group btn-group-lg">Public</Button>
                </div>
            </div> 
            <br/>
            <input type="text" ref="passphrase" className="form-control" placeholder="Paraphrase" />
            <br />
            <div className='btn-group btn-group-justified'>
                <div className='actionbutton btn-group'>
                    <Button bStyle='primary' disabled={isLoading} onClick={(!isLoading ? this.handleSave : null)}>
                        {(isLoading ? 'Please wait...' : 'Save')}
                    </Button>
                </div>
                <div className='btn-group'>
                    <Button onClick={this.handleCancel}>
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
