load("lexer.js");

JSScheme.Parser = function(program) {
    this.program = program;
    this.lexer = new JSScheme.Lexer(program);
};

JSScheme.Parser.prototype = {
    parse: function() {
        this.tokens = this.lexer.lex();
        var list = [];
        while(this.tokens.length > 0) {
            this.skipWhitespaceAndComments();
            if (this.tokens.length > 0) {
                list.push(this.parseList());
            }
        }
        return list;
    },

    skipWhitespaceAndComments: function() {
        while(this.tokens[0] && (this.tokens[0].whitespace() || this.tokens[0].comment())) {
            this.tokens.shift();
        }
    },

    parseList: function() {
        var list = [];

        if (!this.tokens[0].lparen()) {
            this.unexpected();
        }

        this.tokens.shift();

        var inList = true;
        while (inList) {
            var token = this.tokens.shift();
            switch(true) {
            case token.rparen():
                inList = false;
                break;
            case token.comment():
            case token.whitespace():
                // ignore it
                break;
            case token.lparen():
                this.tokens.unshift(token);
                list.push(this.parseList());
                break;
            default:
                list.push(token);
            }
        }

        return list;
    },

    unexpected: function() {
        var token = this.tokens[0];
        write("ERROR: unexpected token ");
        if (token) {
            print(token.type);
        } else {
            print("undefined");
        }

        print();
        print(this.program);

        if (token) {
            for (var i = 0; i < token.start + 1; i++) {
                write(" ");
            }
            print("^");
        }
        quit(1);
    }
};
