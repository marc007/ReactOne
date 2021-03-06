/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var ExcelToolHelper = require('../libs/excel-tool.js');

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      encryptedlist: '',
      decryptedlist: ''
    }
  },
  handleEncrypt: function() {
    var source = this.refs.originallist.getDOMNode().value;
    var key = this.refs.encryptpassphrase.getDOMNode().value;
    console.log('key:' + key);
    var encrypted = ExcelToolHelper.encrypt(source,key);
    console.log('encrypted:' + encrypted);
    this.setState({
        encryptedlist : encrypted
    });
  },
  handleDecrypt: function() {
    var source = this.state.encryptedlist;
    var key = this.refs.encryptpassphrase.getDOMNode().value;
    console.log('key:' + key);
    var decrypted = ExcelToolHelper.decrypt(source,key);
    console.log('decrypted:' + decrypted);
    this.setState({
        decryptedlist : decrypted
    });
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Test Encrypt/Decrypt Page</h3>
          </div>
        </div>
        <div className="row">
          <form role="form">
            <div className="form-group">
              <textarea ref="originallist" 
                        className="form-control" 
                        placeholder="Paste your list here..." 
                        rows="3" required>
              </textarea>
            </div>
            <div className="form-group">
              <div className="input-group">
                <input type="password" ref="encryptpassphrase" 
                        placeholder="Encryption Paraphrase" 
                        className="form-control" required />
                <span className="input-group-btn">
                  <button className="form-control btn-info" 
                          type="button" 
                          onClick={this.handleEncrypt}>
                    Encrypt
                  </button>
                </span>
                <span className="input-group-btn">
                  <button className="form-control btn-info" 
                          type="button" 
                          onClick={this.handleDecrypt}>
                    Decrypt
                  </button>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <textarea className="form-control" 
                            placeholder="Hit the Encrypt button" 
                            rows="3" 
                            value={this.state.encryptedlist} readOnly>
                  </textarea>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <textarea className="form-control" 
                            placeholder="Hit the Decrypt button" 
                            rows="3" 
                            value={this.state.decryptedlist} readOnly>
                  </textarea>
                </div>
              </div>
            </div>
         </form>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
