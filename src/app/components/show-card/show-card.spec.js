import { spyOn } from 'jest-mock';
import appModule from './../../app.module';
import showCardDirective from './show-card.directive';
import showCardController from './show-card.controller';
describe('show-card directive', () => {
    var element, scope;
    beforeEach(function(){
        angular.mock.module(appModule);
    });
    
    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        element = $compile('<show-card></show-card>')(scope);
        scope.$digest();
    }))

    it('should test html defined directive', () => {
        expect(element).toBeDefined();
    });
    it('should test directive functions',()=>{
        const directive = new showCardDirective();
        expect(typeof directive.controller).toBe("function");
        expect(typeof showCardDirective.directiveFactory).toBe("function");
    });
    it('should check function call', () => {
        const spy=spyOn(showCardDirective,'directiveFactory');
        showCardDirective.directiveFactory();
        expect(spy).toHaveBeenCalled();
    });
    it('should check directive controller',()=>{
        const controller = new showCardController(scope);
        expect(controller.$scope.showDetails).toBeUndefined();
    })
});