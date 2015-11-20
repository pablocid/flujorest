'use strict';

describe('Directive: formSection', function () {

  // load the directive's module and view
  beforeEach(module('flujorestApp'));
  beforeEach(module('app/directives/formSection/formSection.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-section></form-section>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the formSection directive');
  }));
});