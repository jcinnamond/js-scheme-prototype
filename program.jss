(display "JS Scheme")

(define repl (lambda ()
	       (write "-> ")
	       (display (eval (readline)))
	       (repl)))

(repl)
