JSScheme.Number = {
    "+": function(runtime, scope, params) {
            return(runtime.run(params[0], scope) + runtime.run(params[1], scope));
    },
    "-": function(runtime, scope, params) {
            return(runtime.run(params[0], scope) - runtime.run(params[1], scope));
    },
    "*": function(runtime, scope, params) {
            return(runtime.run(params[0], scope) * runtime.run(params[1], scope));
    },
    "/": function(runtime, scope, params) {
            return(runtime.run(params[0], scope) / runtime.run(params[1], scope));
    }
};
