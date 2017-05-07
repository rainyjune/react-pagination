jest.dontMock('../scripts/paginationComponent.js');

describe('Pagination', function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');

  var Pagination;

  beforeEach(function() {
    Pagination = require('../scripts/paginationComponent');
  });

  // Test case 1: The pagination should exists as a React Component
  it('should exists', function() {
    // Render into document
    var pagination = TestUtils.renderIntoDocument(<Pagination />);
    expect(TestUtils.isCompositeComponent(pagination)).toBeTruthy();
  });

  // Test case 2: Pagination should build the layout from data passed as props.
  it('should build the layout from data passed as prop', function() {

    var total = 12;
    var pageList = [50, 100, 200];

    var pagination = TestUtils.renderIntoDocument(<Pagination total={total} pageList={pageList} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');

    expect(totalTextNode[0].textContent).toEqual('12');
    expect(pageListControl[0].children.length).toEqual(3);
    expect(pageListControl[0].children[0].textContent).toEqual('50');
    expect(pageListControl[0].children[1].textContent).toEqual('100');
    expect(pageListControl[0].children[2].textContent).toEqual('200');
    expect(pageNumberNode.length).toEqual(2);
  });
});