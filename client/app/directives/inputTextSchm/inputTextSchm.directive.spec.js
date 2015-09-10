'use strict';

describe('Directive: inputTextSchm', function () {

  // load the directive's module and view
  beforeEach(module('flujorestApp'));
  beforeEach(module('app/directives/inputTextSchm/inputTextSchm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input-text-schm></input-text-schm>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the inputTextSchm directive');
  }));
});