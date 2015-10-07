'use strict';

describe('Directive: formSchema', function () {

  // load the directive's module
  beforeEach(module('flujorestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-schema></form-schema>');
    element = $compile(element)(scope);
    //expect(element.find("form")).toBe(true);
  }));
});
