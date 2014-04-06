JSScheme.Scanner = function(program) {
    this.program = program;
    this.programLength = program.length;
    this.position = 0;
};

JSScheme.Scanner.prototype = {
    eof: -1,

    finished: function() {
        return this.position >= this.programLength;
    },

    eat: function() {
        if (this.finished()) {
            return this.eof;
        }

        var chr = this.peek();
        this.advance();
        return chr;
    },

    peek: function() {
      return this.program[this.position];
    },

    advance: function() {
        this.position++;
    },

    backup: function() {
        this.position--;
    },


    // Higher level functions
    eater: function(fn) {
        var start = this.position;
        var length = 0;

        while (!this.finished() && fn(this.peek())) {
            this.eat();
            length++;

            if (length > this.programLength) {
                print("Looping too long");
                print("    Next:     " + this.peek());
                print("    Finished: " + this.finished());
                print("    Fn:       " + fn(this.peek()));
                quit(1);
            }
        }

        var capture = this.program.substring(start, start + length);
        return capture;
    },

    eatTo: function(terminators) {
        return this.eater(function(chr) {
            return terminators.indexOf(chr) === -1;
        });
    },

    eatWhile: function(characters) {
        return this.eater(function(chr) {
            return characters.indexOf(chr) !== -1;
        });
    },

    eatWhitespace: function() {
        return this.eatWhile(" \t\n");
    }
};
