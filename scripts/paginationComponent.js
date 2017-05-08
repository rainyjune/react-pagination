// test
var React = require('react');
var PaginationNumberItem = React.createClass({
  render: function() {
    if (this.props.pagenum) {
      return (
        <li className="page_num" data-pagenum={this.props.pagenum}>
          <a href="javascript:void(0);">{this.props.pagenum}</a>
        </li>
      );
    } else {
      return (
        <li className="page_ellip">
          <a href="#">...</a>
        </li>
      );
    }
  }
});
var PaginationSelectControlOption = React.createClass({
  render: function() {
    return (
      <option value={this.props.value}>{this.props.value}</option>
    );
  }
});
var Pagination = React.createClass({
  getInitialState: function() {
    return Object.assign({}, {
      total: 1,
      pageList: [10, 20, 30, 50],
      pageSize: 10,
      pageNumber: 1,
      loading: false,
      onChangePageSize: function(pageSize) {
      },
      onSelectPage: function(pageNumber, pageSize) {
      }
    }, this.props);
  },
  buildPageNumberElements: function() {
    var pageNumberElements = [];
    var pages = Math.ceil(this.state.total / this.state.pageSize);
    var currentPage = this.state.pageNumber;
    if (pages <= 6) {
      for(var i = 0; i < pages; i++) {
        var page = i + 1;
        pageNumberElements.push(<PaginationNumberItem key={page} pagenum={page} />);
      }
    } else {
      if (currentPage <= 3 || currentPage >= pages - 2) {
        for(var i = 0; i < 3; i++) {
          var page = i + 1;
          pageNumberElements.push(<PaginationNumberItem key={page} pagenum={page} />);
        }
        pageNumberElements.push(<PaginationNumberItem />);
      } else {
        for(var i = currentPage - 3; i < currentPage; i++) {
          var page = i + 1;
          pageNumberElements.push(<PaginationNumberItem key={page} pagenum={page} />);
        }
        if (currentPage + 3 != pages) {
          pageNumberElements.push(<PaginationNumberItem />);
        }
      }
      for(var i = pages - 3; i < pages; i++) {
        var page = i + 1;
        pageNumberElements.push(<PaginationNumberItem key={page} pagenum={page} />);
      }
    }
    return pageNumberElements;
  },
  render: function() {
    var pageNumberList = this.buildPageNumberElements();
    var paginationSelectOptions = this.state.pageList.map(function(v) {
      return <PaginationSelectControlOption key={v} value={v} />;
    });
    return (
      <div className="page_wrap">
        <div className="num_wrap">
          <span>共<em className="num_wrap_total">{this.state.total}</em>条记录，显示行数</span>
          <select name="">
            {paginationSelectOptions}
          </select>
          <span>页</span>
        </div>
        <ul>
          <li className="page_prev border disable"><a href="#"></a></li>
          {pageNumberList}
          <li className="page_next border"><a href="#"></a></li>
          <li className="text t1">转到</li>
          <li className="page_input"><input type="text" name="page_num" /></li>
          <li className="text">页</li>
          <li className="page_go"><button>go</button></li>
        </ul>
      </div>
    );
  }
});

module.exports = Pagination;