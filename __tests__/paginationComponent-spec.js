jest.dontMock('../scripts/paginationComponent.js');

describe('Pagination', function() {
  var React = require('react');
  //var ReactDOM = require('react-dom');
  var TestUtils = require('react-addons-test-utils');

  var Pagination;

  beforeEach(function() {
    Pagination = require('../scripts/paginationComponent');
  });

  test('onChangePageSize event test', (done) => {
    function changeSize(newSize) {
      expect(newSize).toEqual('20');
      done();
    }
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} onChangePageSize={changeSize} />);
    var pageListControl = TestUtils.findRenderedDOMComponentWithTag(pagination, 'select');
    TestUtils.Simulate.change(pageListControl, {target: { value : '20'}});
  });

  test('onSelectPage event test', (done) => {
    function selectPage(pageNumber, pageSize) {
      expect(pageNumber).toEqual(2);
      expect(pageSize).toEqual(10);
      done();
    }
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} onSelectPage={selectPage} />);
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    TestUtils.Simulate.click(pageNumberNode[1]);
  });

  // Test case 1: The pagination should exists as a React Component
  it('should exists', function() {
    // Render into document
    var pagination = TestUtils.renderIntoDocument(<Pagination />);
    expect(TestUtils.isCompositeComponent(pagination)).toBeTruthy();
  });

  it('total=0', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination />);
    var totalTextNode = TestUtils.findRenderedDOMComponentWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.findRenderedDOMComponentWithTag(pagination, 'select');
    var prevBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_prev');
    var nextBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_next');

    expect(totalTextNode.textContent).toEqual('0');
    expect(pageListControl.value).toEqual('10');
    expect(prevBtn.className).toEqual('page_prev border disable');
    expect(nextBtn.className).toEqual('page_next border disable');

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

  it('should select the correct dropdown option', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} pageSize="20" />);
    var pageListControl = TestUtils.findRenderedDOMComponentWithTag(pagination, 'select');
    expect(pageListControl.value).toEqual('20');

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

  it('should be able to update UI by changing the option value.', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');

    expect(pageNumberNode.length).toEqual(2);
    TestUtils.Simulate.change(pageListControl[0], {target: { value : '20'}});
    pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    expect(pageNumberNode.length).toEqual(1);
    expect(pageNumberNode[0].className).toEqual("page_num on");

    TestUtils.Simulate.change(pageListControl[0], {target: { value : '10'}});
    pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    expect(pageNumberNode.length).toEqual(2);

    TestUtils.Simulate.click(pageNumberNode[1]);
    TestUtils.Simulate.change(pageListControl[0], {target: { value : '20'}});
    pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    expect(pageNumberNode.length).toEqual(1);
    expect(pageNumberNode[0].className).toEqual("page_num on");
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

  it('should be able to update UI by clicking the next button.', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    var nextBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_next');
    var inputCtrl = TestUtils.findRenderedDOMComponentWithTag(pagination, 'input');
    var goBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_go');

    expect(pageNumberNode[0].className).toEqual("page_num on");
    inputCtrl.value = '2';
    TestUtils.Simulate.click(goBtn);
    expect(pageNumberNode[0].className).toEqual("page_num");
    expect(pageNumberNode[1].className).toEqual("page_num on");

    inputCtrl.value = '12';
    TestUtils.Simulate.click(goBtn);
    expect(pageNumberNode[0].className).toEqual("page_num");
    expect(pageNumberNode[1].className).toEqual("page_num on");

  });


  it('The next button test case', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    var nextBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_next');
    var inputCtrl = TestUtils.findRenderedDOMComponentWithTag(pagination, 'input');
    var goBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_go');

    expect(pageNumberNode[0].className).toEqual("page_num on");
    TestUtils.Simulate.click(nextBtn);
    expect(pageNumberNode[0].className).toEqual("page_num");
    expect(pageNumberNode[1].className).toEqual("page_num on");

    TestUtils.Simulate.click(nextBtn);
    expect(pageNumberNode[0].className).toEqual("page_num");
    expect(pageNumberNode[1].className).toEqual("page_num on");

  });

  it('The prev button test case', function() {
    var pagination = TestUtils.renderIntoDocument(<Pagination total={13} pageList={[10, 20, 30]} />);
    var totalTextNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'num_wrap_total');
    var pageListControl = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'select');
    var pageNumberNode = TestUtils.scryRenderedDOMComponentsWithClass(pagination, 'page_num');
    var prevBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_prev');
    var nextBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_next');
    var inputCtrl = TestUtils.findRenderedDOMComponentWithTag(pagination, 'input');
    var goBtn = TestUtils.findRenderedDOMComponentWithClass(pagination, 'page_go');

    expect(pageNumberNode[0].className).toEqual("page_num on");
    expect(pageNumberNode[1].className).toEqual("page_num");
    TestUtils.Simulate.click(prevBtn);
    expect(pageNumberNode[0].className).toEqual("page_num on");
    expect(pageNumberNode[1].className).toEqual("page_num");

    TestUtils.Simulate.click(prevBtn);
    expect(pageNumberNode[0].className).toEqual("page_num on");
    expect(pageNumberNode[1].className).toEqual("page_num");

  });

});