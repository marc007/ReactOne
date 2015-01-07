/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var ExcelToolHelper = require('../libs/excel-tool.js');

var HomePage = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  handleSourceList: function() {
    // return;
    var source = this.refs.originallist.getDOMNode().value;
    var listobject = ExcelToolHelper.parse(source);
    console.log(listobject);
    var listroots = ExcelToolHelper.findroots();
    console.log(listroots);

    var tree = ExcelToolHelper.createtree();
    
    // var cols = [];
    // var tbl = '<table cellpadding="0" cellspacing="0" border="0" class="display" id="listdata"><thead><tr>';
    // for (var property in listobject[0]) {
    //     if (listobject[0].hasOwnProperty(property)) {
    //       tbl += '<th>'+property+'</th>';
    //       cols.push({"data" : property});
    //     }
    // }
    // tbl += '</tr></thead></table>';

    // $('#listtable').html(tbl);
    // $('#listdata').dataTable( {
    //     "data" : listobject,
    //     "columns" : cols
    // } );   
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Test Tree List Page</h3>
          </div>
        </div>
        <div className="row">
          <form role="form">
            <div className="form-group">
              <textarea ref="originallist" 
                        className="form-control" 
                        placeholder="Paste your list here..." 
                        rows="3" required onChange={this.handleSourceList}>
              </textarea>
            </div>
            <div className="form-group">
              <div id="listtable"></div>       
            </div>
         </form>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
