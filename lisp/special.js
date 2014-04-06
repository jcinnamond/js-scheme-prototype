JSScheme.Special = {
    define: function(runtime, scope, params) {
        return runtime.define(params[0].literal, params[1]);
    },

    eval: function(runtime, scope, params) {
        var program = runtime.run(params[0], scope);
        if (program) {
            return runtime.eval(program, scope);
        } else {
            print("(type `(quit)` to quit)");
            return undefined;
        }
    },

    lambda: function(r, _, params) {
        var paramList = params[0].map(function(p) { return p.literal; });
        var program = params.slice(1);

        return function(runtime, outerScope, args) {
            var scope = {};
            for (var prop in outerScope) {
                if (outerScope.hasOwnProperty(prop)) {
                    scope[prop] = outerScope[prop];
                }
            }

            if (args.length != paramList.length) {
                throw("argument mismatch: expected " + paramList.length + ", got " + args.length);
            }

            paramList.forEach(function(param, idx) {
                scope[param] = runtime.run(args[idx], outerScope);
            });

            return runtime.runProgram(program, scope);
        };
    }
};
