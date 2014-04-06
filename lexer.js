load("scanner.js");
load("token.js");

JSScheme.Lexer = function(program) {
    this.scanner = new JSScheme.Scanner(program);
    this.tokens = [];
};

JSScheme.Lexer.prototype = {
    DIGITS: "0123456789",
    WHITESPACE: " \n\t",

    lex: function() {
        while (! this.scanner.finished()) {
            var ch = this.scanner.eat();
            switch(true) {
            case this.WHITESPACE.indexOf(ch) !== -1:
                this.scanner.backup();
                var whitespace = this.scanner.eatWhile(this.WHITESPACE);
                this.newToken(JSScheme.Token.T_WHITESPACE, whitespace);
                break;

            case ch === '(':
                this.newToken(JSScheme.Token.T_LPAREN, ch);
                break;

            case ch === ')':
                this.newToken(JSScheme.Token.T_RPAREN, ch);
                break;

            case ch === '"':
                var str = this.scanner.eatTo('"');
                this.scanner.eat(); // Eat the closing double quote
                this.newToken(JSScheme.Token.T_STRING, str);
                break;

            case ch === ';':
                var str = this.scanner.eatTo('\n');
                this.newToken(JSScheme.Token.T_COMMENT, str);
                break;

            case this.DIGITS.indexOf(ch) !== -1:
                this.scanner.backup();
                var number = this.scanner.eatWhile(this.DIGITS);
                this.newToken(JSScheme.Token.T_NUMBER, number);
                break;

            default:
                this.scanner.backup();
                this.lexIdentifier();
            }
        }
        return this.tokens;
    },

    lexIdentifier: function() {
        var identifier = this.scanner.eatTo(") ");
        this.newToken(JSScheme.Token.T_IDENTIFIER, identifier);
    },

    newToken: function(t, literal) {
        this.tokens.push(new JSScheme.Token(t, literal, this.scanner.position - literal.length));
    }
};
