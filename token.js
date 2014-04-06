JSScheme.Token = function(t, literal, position) {
    this.type = t;
    this.literal = literal;
    this.position = position;
};

JSScheme.Token.T_LPAREN     = 'lparen';
JSScheme.Token.T_RPAREN     = 'rparen';
JSScheme.Token.T_WHITESPACE = 'whitespace';
JSScheme.Token.T_COMMENT    = 'comment';
JSScheme.Token.T_NUMBER     = 'number';
JSScheme.Token.T_STRING     = 'string';
JSScheme.Token.T_IDENTIFIER = 'identifier';

JSScheme.Token.prototype = {
    lparen: function() {
        return this.type == JSScheme.Token.T_LPAREN;
    },
    rparen: function() {
        return this.type == JSScheme.Token.T_RPAREN;
    },
    whitespace: function() {
        return this.type == JSScheme.Token.T_WHITESPACE;
    },
    comment: function() {
        return this.type == JSScheme.Token.T_COMMENT;
    },
    number: function() {
        return this.type === JSScheme.Token.T_NUMBER;
    },
    string: function() {
        return this.type === JSScheme.Token.T_STRING;
    },
    identifier: function() {
        return this.type === JSScheme.Token.T_IDENTIFIER;
    }
};

