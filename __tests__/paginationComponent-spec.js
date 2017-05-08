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

  it('should be able to update UI by changing the option value.', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');

    expect(pageNumberNode.length).toEqual(2);
    TestUtils.Simulate.change(pageListControl[0], {target: { value : '20'}});
    pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    expect(pageNumberNode.length).toEqual(1);

    TestUtils.Simulate.change(pageListControl[0], {target: { value : '10'}});
    pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    expect(pageNumberNode.length).toEqual(2);
  });


  it('should be able to update UI by clicking the page item.', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');

    expect(pageNumberNode.length).toEqual(2);
    TestUtils.Simulate.click(pageNumberNode[1]);
    expect(pageNumberNode[1].className).toEqual("page_num on");

  });


  it('should be able to update UI by clicking the next button.', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    var nextBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_next');

    expect(pageNumberNode[0].className).toEqual("page_num on");
    TestUtils.Simulate.click(nextBtn);
    expect(pageNumberNode[0].className).toEqual("page_num");
    expect(pageNumberNode[1].className).toEqual("page_num on");

  });

});