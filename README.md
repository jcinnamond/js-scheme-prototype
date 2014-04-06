# JSScheme

Prototype version of a Scheme implementation in Javascript.

## Usage

I have been running this from D8.

    $ d8
    V8 version 3.21.17 [console: readline]
    d8> load("jsscheme.js")
    JS Scheme
    ->

By default this loads the repl in `program.jss`

Once you get the `->` prompt you can type some scheme. E.g.,:

    -> (define plusOne (lambda (x) (+ x 1)))
    undefined
    -> (plusOne 9)
    10

## What's missing?

This is only a partial Scheme implementation. Notable shortcomings are:

- No quote
- No define-syntax
- No continations
- No ports
- No apply

The libraries are really basic. Take a look at the `lisp/*` files to see
what is implemented.
