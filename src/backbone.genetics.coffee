((factory) ->
  if typeof define is "function" and define.amd
    define(["underscore", "backbone", "exports"], factory)
  else if typeof exports is "object"
    factory(require("underscore"), require("backbone"), exports)
  else
    factory(_, Backbone, {})
) (_, Backbone, Genetics) ->

  class Genetics
    constructor: (@options = {}) ->
      # genes define the feature blocks that are available in this app
      @genes = @options.genes || {}

      # an array with all binded views
      @views = @options.views || []

    bind: (view) ->
      throw "No view to bind to, please pass along your view as bind(view)" if !view and !(view instanceof Backbone.View)

      @setViewEvents(view)
      @setGenes(view)
      @views.push(view)

    setViewEvents: (view) ->
      view.listenTo view, 'dom:refresh', => @setGenes(view)
      view.listenTo view, 'destroy', => @remove(view)

    setGenes: (view) ->
      # remove from template if gene not available
      elements = view.$("[data-gene]")

      remove = true
      for el in elements
        genes = $(el).data('gene').split ' '
        for gene in genes
          remove = false if !_.isUndefined(@genes["#{gene}"]) or @genes["#{gene}"]

        if remove
          $(el).remove()

          # remove all bindings with data-gene
          for gene of genes
            if view.bindings
              for binding of view.bindings
                selector = view.bindings[binding].selector || view.bindings[binding]
                delete view.bindings[binding] if selector is "[data-gene=#{gene}]"

    remove: (view) ->
      @views = _.without(@views, view)

    set: (genes) ->
      @genes["#{gene}"] = genes[gene] for gene of genes

      
  Backbone.Genetics = Genetics
  return Backbone.Genetics
