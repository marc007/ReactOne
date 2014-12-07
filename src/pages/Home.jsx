/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var ExcelToolHelper = require('../libs/excel-tool.js');

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      convertedlist: ''
    }
  },
  handleConvert: function() {
    var source = this.refs.originallist.getDOMNode().value;
    var listobjects = ExcelToolHelper.parse(source);
    console.log(listobjects);
    var listroots = ExcelToolHelper.findroots();
    console.log(listroots);
    
    // var source = this.refs.originallist.getDOMNode().value;
    // console.log(source);
    // this.setState({
    //     convertedlist : source
    //   });
    // var listobject = ExcelToolHelper.parse(source);
    // console.log(listobject);
    
  },
  handleSourceList: function() {
    var source = this.refs.originallist.getDOMNode().value;
    var listobject = ExcelToolHelper.parse(source);
    console.log(listobject);

    var cols = [];
    var tbl = '<table cellpadding="0" cellspacing="0" border="0" class="display" id="listdata"><thead><tr>';
    for (var property in listobject[0]) {
        if (listobject[0].hasOwnProperty(property)) {
          tbl += '<th>'+property+'</th>';
          cols.push({"data" : property});
        }
    }
    tbl += '</tr></thead></table>';

    $('#listtable').html(tbl);
    $('#listdata').dataTable( {
        "data" : listobject,
        "columns" : cols
    } );   
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Welcome Home!</h3>
          </div>
        </div>
        <div className="row">
          <form role="form">
              <div className="form-group">
                <textarea ref="originallist" 
                          className="form-control" 
                          placeholder="Paste your list here..." 
                          rows="3" required onChange={this.handleConvert}>
                </textarea>
              </div>
              <div className="form-group">
                <div id="listtable"></div>       
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input type="password" ref="encryptpassphrase" 
                          placeholder="Encryption Paraphrase" 
                          className="form-control" required />
                  <span className="input-group-btn">
                    <button className="form-control btn-info" 
                            type="button" 
                            onClick={this.handleConvert}>
                      Convert
                    </button>
                  </span>
                </div>
              </div>
              <div className="form-group">
                <textarea className="form-control" 
                          placeholder="Hit the Convert button" 
                          rows="3" 
                          value={this.state.convertedlist} readOnly>
                </textarea>
              </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
