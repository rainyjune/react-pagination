'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Pagination = require('components/paginationComponent');

var total = 12;

ReactDOM.render(<Pagination total={total} />, document.getElementById('view'));