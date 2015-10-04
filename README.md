React Elmish Example
=====================

This is my personal attempt to understand [Elm Architecture](https://github.com/evancz/elm-architecture-tutorial/) better and show how it can be imitated by React components. I'd also like to better understand its strengths and weaknesses.

This specific repository currently has just one example with a few components:

* A counter component
* A list component enhancer
* An action log component enhancer
* This lets us render a list of counters...
* ... with action log!
* ... and undo/redo!

Note that the state lives at the top of the application.

## Running

It's up on [Github Pages](http://gaearon.github.io/react-elmish-example).

You can also 

```
git clone https://github.com/gaearon/react-elmish-example.git
cd react-elmish-example
npm install
npm start
open http://localhost:3000
```

Sorry, no hot reloading this time!

## License

MIT