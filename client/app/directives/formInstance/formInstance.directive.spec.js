'use strict';

describe('Directive: formInstance', function () {

  // load the directive's module and view
  beforeEach(module('flujorestApp'));
  beforeEach(module('app/directives/formInstance/formInstance.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-instance></form-instance>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the formInstance directive');
  }));
});