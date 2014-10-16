(function() {
  (function(root, factory) {
    if (typeof define === "function" && define.amd) {
      return define(["exports", "underscore", "backbone"], factory);
    } else if (typeof exports === "object") {
      return factory(exports, require("underscore"), require("backbone"));
    } else {
      return root.Backbone.Modal = factory((root.commonJsStrict = {}), root._, root.Backbone);
    }
  })(this, function(exports, _, Backbone) {
    return Backbone.Genetics = (function() {
      function Genetics(options) {
        this.options = options != null ? options : {};
        this.genes = this.options.genes || {};
        this.views = this.options.views || [];
      }

      Genetics.prototype.bind = function(view) {
        if (!view && !(view instanceof Backbone.View)) {
          throw "No view to bind to, please pass along your view as bind(view)";
        }
        this.setViewEvents(view);
        this.setGenes(view);
        return this.views.push(view);
      };

      Genetics.prototype.setViewEvents = function(view) {
        view.listenTo(view, 'dom:refresh', (function(_this) {
          return function() {
            return _this.setGenes(view);
          };
        })(this));
        return view.listenTo(view, 'destroy', (function(_this) {
          return function() {
            return _this.remove(view);
          };
        })(this));
      };

      Genetics.prototype.setGenes = function(view) {
        var binding, el, elements, gene, genes, remove, selector, _i, _j, _len, _len1, _results;
        elements = view.$("[data-gene]");
        remove = true;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          genes = $(el).data('gene').split(' ');
          for (_j = 0, _len1 = genes.length; _j < _len1; _j++) {
            gene = genes[_j];
            if (!_.isUndefined(this.genes["" + gene]) || this.genes["" + gene]) {
              remove = false;
            }
          }
          if (remove) {
            $(el).remove();
            _results.push((function() {
              var _results1;
              _results1 = [];
              for (gene in genes) {
                if (view.bindings) {
                  _results1.push((function() {
                    var _results2;
                    _results2 = [];
                    for (binding in view.bindings) {
                      selector = view.bindings[binding].selector || view.bindings[binding];
                      if (selector === ("[data-gene=" + gene + "]")) {
                        _results2.push(delete view.bindings[binding]);
                      } else {
                        _results2.push(void 0);
                      }
                    }
                    return _results2;
                  })());
                } else {
                  _results1.push(void 0);
                }
              }
              return _results1;
            })());
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Genetics.prototype.remove = function(view) {
        return this.views = _.without(this.views, view);
      };

      Genetics.prototype.set = function(genes) {
        var gene, _results;
        _results = [];
        for (gene in genes) {
          _results.push(this.genes["" + gene] = genes[gene]);
        }
        return _results;
      };

      return Genetics;

    })();
  });

}).call(this);
