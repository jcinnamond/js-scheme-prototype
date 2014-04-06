JSScheme.IO = {
    display: function(runtime, scope, params) {
        print(runtime.run(params[0], scope));
    },

    write: function(runtime, scope, params) {
        write(runtime.run(params[0], scope));
    },

    readline: function(runtime, scope, params) {
        return readline();
    },

    quit: function() {
        print("Shutting down");
        quit();
    }
};
