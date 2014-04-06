load("parser.js");

// Builtins
load("lisp/io.js");
load("lisp/special.js");
load("lisp/number.js");
load("lisp/debug.js");

JSScheme.Runtime = function() {
    this.environment = {};

    this.addDefinitions(JSScheme.Special);
    this.addDefinitions(JSScheme.IO);
    this.addDefinitions(JSScheme.Number);
    this.addDefinitions(JSScheme.Debug);
};

JSScheme.Runtime.prototype = {
    addDefinitions: function(definitions) {
        for (var procedure in definitions) {
            if (definitions.hasOwnProperty(procedure)) {
                this.define(procedure, definitions[procedure]);
            }
        }
    },

    eval: function(program, scope) {
        scope = scope || {};
        var list = new JSScheme.Parser(program).parse();
        return this.runProgram(list, scope);
    },

    runProgram: function(list, scope) {
        var last_val = undefined;

        for(var pos = 0; pos < list.length; pos++) {
            last_val = this.run(list[pos], scope);
        }

        return last_val;
    },

    run: function(item, scope) {
        if (item instanceof Array) {
            var proc = item[0];
            if (proc instanceof Array) {
                proc = this.run(proc, scope);
            } else {
                proc = proc.literal;
            }

            return this.runProc(proc, item.slice(1), scope);
        };

        switch(true) {
        case item.number():
            return parseInt(item.literal, 10);
            break;

        case item.string():
            return item.literal;
            break;

        case item.identifier():
            var key = item.literal;
            var value = scope[key] || this.environment[key];
            return(value);
            break;

        default:
            throw("Parser is broken: " + item.type);
        }

        return "";
    },


    runProc: function(procedure, list, scope) {
        var proc = undefined;

        if (procedure instanceof Function) {
            proc = procedure;
        } else {
            proc = this.environment[procedure];
            if (proc === undefined) {
                print("!! - Unrecognised procedure: " + procedure);
                return undefined;
            }
        }

        if (! proc instanceof Function) {
            print("!! - " + procedure + " is not a procedure");
            return undefined;
        }

        return proc(this, scope, list);
    },

    define: function(symbol, value) {
        var definition = undefined;

        if (value instanceof Function) {
            definition = value;
        } else {
            definition = this.run(value);
        }

        this.environment[symbol] = definition;
    }
};
