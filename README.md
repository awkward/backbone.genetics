## Backbone.Genetics

[![Build Status](https://travis-ci.org/awkward/backbone.genetics.svg)](https://travis-ci.org/awkward/backbone.genetics)

A super small and simple plugin for Backbone.js to remove features from your app for user management, A/B testing purposes and all things you’d like to enable for specific users and hide from others.

Backbone.Genetics.js let’s you define ‘genes’, that are parts of your template (defined as `data-gene="myGene"`), which will be removed from your view during the rendering of your view.

#### Download
Backbone is required, Marionette is optional.
* Minified: [backbone.genetics-min.js](https://raw.githubusercontent.com/awkward/backbone.genetics/v0.0.2/backbone.genetics-min.js)
* Unminified: [backbone.genetics.js](https://raw.githubusercontent.com/awkward/backbone.genetics/v0.0.2/backbone.genetics.js)

#### How to use
It’s very easy to implement. Once your view is rendering, in Backbone it’s the `render` method and for Marionette it’s the `onRender` method, you want to use `Genetics.bind(this)`.

In your template of that view, simply add `data-gene` attribute to every element you’d like to remove (it will obviously also remove all nested elements).

If you only want to make a certain part visible for admins, you can set `Genetics.genes({admin: true})` for specific users. All elements with `data-gene="admin"` will be removed if that gene isn’t true.

You can also use multiple genes in elements, like: `data-gene="admin user"` which means it has to comply to both genes, otherwise it’ll be removed from the view.

That’s it.

### How to contribute

To get started `grunt` to get everything running. If you have any requests, please create an issue. If you're working on something yourself, make a pull request and we'll make sure to check it out to get in into the next release.

### Tests

When you run the project by doing `grunt`. This will watch the tests and src files. It will open up a browser with the tests.

### Legal stuff (MIT License)

Copyright (c) 2014 Awkward.

Distributed under MIT license.
