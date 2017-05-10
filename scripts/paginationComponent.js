// test
var React = require('react');
var PaginationNumberItem = React.createClass({
  clickPageNum: function(newPage) {
    this.props.onPageNumberChanged(newPage);
  },
  render: function() {
    if (this.props.pagenum) {
      var className = this.props.pagenum == this.props.currentPage ? "page_num on" : "page_num";
      return (
        <li onClick={this.clickPageNum.bind(null, this.props.pagenum)} className={className} data-pagenum={this.props.pagenum}>
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

}    }, this.props);
  },
  buildPageNumberElements: function() {
    var pageNumberElements = [];
    var pages = Math.ceil(this.state.total / this.state.pageSize);
    var currentPage = this.state.pageNumber;
    if (pages <= 6) {
      for(var i = 0; i < pages; i++) {
        var page = i + 1;
        pageNumberElements.push(<PaginationNumberItem onPageNumberChanged={this.changePageNum} currentPage={this.state.pageNumber} key={page} pagenum={page} />);
      }
    } else {
      if (currentPage <= 3 || currentPage >= pages - 2) {
        for(var i = 0; i < 3; i++) {
          var page = i + 1;
          pageNumberElements.push(<PaginationNumberItem onPageNumberChanged={this.changePageNum} currentPage={this.state.pageNumber} key={page} pagenum={page} />);
        }
        pageNumberElements.push(<PaginationNumberItem />);
      } else {
        for(var i = currentPage - 3; i < currentPage; i++) {
          var page = i + 1;
          pageNumberElements.push(<PaginationNumberItem onPageNumberChanged={this.changePageNum} currentPage={this.state.pageNumber} key={page} pagenum={page} />);
        }
        if (currentPage + 3 != pages) {
          pageNumberElements.push(<PaginationNumberItem />);
        }
      }
      for(var i = pages - 3; i < pages; i++) {
        var page = i + 1;
        pageNumberElements.push(<PaginationNumberItem onPageNumberChanged={this.changePageNum} currentPage={this.state.pageNumber} key={page} pagenum={page} />);
      }
    }
    return pageNumberElements;
  },
  changePageNum: function(newPage) {
    console.log('newpage:', newPage);
    this.setState({
      pageNumber: newPage
    });
  },
  changePageSize: function(event) {
    this.setState({
      pageSize: event.target.value
    });
  },
  prev: function() {
    this.setState(function(prevState, props) {
      this.gotoPage(prevState.pageNumber - 1);
    });
  },
  next: function() {
    this.setState(function(prevState, props) {
      this.gotoPage(prevState.pageNumber + 1);
    });
  },
  handleGoBtn: function() {
    var inputVal = this.pagenumInput.value;
    if (isNaN(inputVal)) {
      return false;
    }
    inputVal = parseInt(inputVal);
    this.gotoPage(inputVal);
  },
  gotoPage: function(newPage) {
    newPage = parseInt(newPage);
    if (isNaN(newPage)) return false;
    var pages = Math.ceil(this.state.total / this.state.pageSize);
    if (newPage > 0 && newPage <= pages) {
      this.setState({
        pageNumber: newPage
      });
    }
  },
  render: function() {
    var pages = Math.ceil(this.state.total / this.state.pageSize);
    var pageNumberList = this.buildPageNumberElements();
    var paginationSelectOptions = this.state.pageList.map(function(v) {
      return <PaginationSelectControlOption key={v} value={v} />;
    });
    var prevBtnCls = this.state.pageNumber < 2 ? "page_prev border disable" : "page_prev border";
    var nextBtnCls = this.state.pageNumber == pages ? "page_next border disable" : "page_next border";
    return (
      <div className="page_wrap">
        <div className="num_wrap">
          <span>共<em className="num_wrap_total">{this.state.total}</em>条记录，显示行数</span>
          <select name="" onChange={this.changePageSize}>
            {paginationSelectOptions}
          </select>
          <span>页</span>
        </div>
        <ul>
          <li className={prevBtnCls} onClick={this.prev}><a href="#"></a></li>
          {pageNumberList}
          <li className={nextBtnCls} onClick={this.next}><a href="#"></a></li>
          <li className="text t1">转到</li>
          <li className="page_input"><input ref={(input) => { this.pagenumInput = input; }} type="text" name="page_num" /></li>
          <li className="text">页</li>
          <li className="page_go" onClick={this.handleGoBtn}><button>go</button></li>
        </ul>
      </div>
    );
  }
});

module.exports = Pagination;