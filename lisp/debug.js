JSScheme.Debug = {
    inspect: function(runtime, scope, params) {
        runtime.debug(params);
        runtime.debug(runtime.environment[params[0].literal]);
    },

    dump: function(runtime, scope, params) {
        print("SCOPE\n");
        for (var k in scope) {
            print("" + k + " => " + scope[k]);
        }

        print("ENVIRONMENT\n");
        for (k in runtime.environment) {
            print("" + k + " => " + runtime.environment[k]);
        }
    }
};
