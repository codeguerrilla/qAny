angular.module("qAny", [])
    .factory("qAny", function ($q) {
        return function(promises) {
            var d = $q.defer(),
                failCount = 0,
                results = [];
            angular.forEach(promises, function(p, key) {
                p.then(function(result) {
                    d.resolve(result);
                }, function(err) {
                    results[key] = err;
                    if (++failCount === promises.length) {
                        d.reject(results);
                    };
                });
            });
            return d.promise;
        };
    });