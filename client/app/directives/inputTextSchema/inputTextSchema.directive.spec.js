'use strict';

describe('Directive: inputTextSchema', function () {

  // load the directive's module and view
  beforeEach(module('flujorestApp'));
  beforeEach(module('app/directives/inputTextSchema/inputTextSchema.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input-text-schema></input-text-schema>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the inputTextSchema directive');
  }));
});