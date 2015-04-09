describe("The qAny factory", function() {
    var qAny, $rootScope, d1, d2, d3, promises, result;
    beforeEach(module("qAny"));
    beforeEach(inject(function(_qAny_, _$rootScope_, $q) {
        qAny = _qAny_;
        $rootScope = _$rootScope_;
        d1 = $q.defer();
        d2 = $q.defer();
        d3 = $q.defer();
        promises = [d1.promise, d2.promise, d3.promise];
        result = undefined;
    }));

    function captureResult(x) {
        result = x;
    }

    it("takes 3 promises, and returns when 1 resolves", function() {
        qAny(promises).then(captureResult);
        d2.resolve("d2");
        $rootScope.$digest();
        expect(result).toBe("d2");
    });

    it("does nothing if no promises resolve", function() {
        qAny(promises).then(captureResult, captureResult);
        $rootScope.$digest();
        expect(result).toBeUndefined();
    });

    it("resolves even if some promises fail", function() {
        qAny(promises).then(captureResult);
        d1.reject();
        d2.reject();
        d3.resolve("d3");
        $rootScope.$digest();
        expect(result).toBe("d3");
    });

    it("is rejected if all promises are rejected", function() {
        qAny(promises).catch(captureResult);
        d1.reject("fail 1");
        d2.reject("fail 2");
        d3.reject("fail 3");
        $rootScope.$digest();
        expect(result).toEqual(["fail 1", "fail 2", "fail 3"]);
    });
});