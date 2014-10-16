(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe('Backbone.Genetics', function() {
    var genetics, myView;
    myView = {};
    genetics = {};
    beforeEach(function() {
      genetics = new Backbone.Genetics();
      return myView = (function(_super) {
        __extends(myView, _super);

        function myView() {
          return myView.__super__.constructor.apply(this, arguments);
        }

        myView.prototype.template = function() {
          return "<a href=\"#\" data-gen=\"myGen\">Open special feature</a>";
        };

        myView.prototype.events = {
          'a': 'triggerSpecialFeature'
        };

        myView.prototype.render = function() {
          this.$el.html(this.template());
          genetics.bind(this);
          return this;
        };

        myView.prototype.triggerSpecialFeature = function() {};

        return myView;

      })(Backbone.View);
    });
    afterEach(function() {
      myView = {};
      return genetics = {};
    });
    it('should have views and genes', function() {
      return expect(genetics.views && genetics.genes).toBeDefined();
    });
    describe('#bind', function() {
      it('should return an error if no view is passed along', function() {
        return expect(genetics.bind).toThrow();
      });
      return it('should increase the amount of views bound to', function() {
        var view;
        view = new myView().render();
        return expect(genetics.views.length).toBe(1);
      });
    });
    describe('#setViewEvents', function() {
      it('should trigger setGenes again once the dom is refreshed (for Marionette)', function() {
        var view;
        view = new myView();
        view.render();
        spyOn(genetics, 'setGenes');
        view.trigger('dom:refresh');
        return expect(genetics.setGenes).toHaveBeenCalled();
      });
      return it('should trigger remove once you destroy the view (for Marionette)', function() {
        var view;
        view = new myView();
        view.render();
        spyOn(genetics, 'remove');
        view.trigger('destroy');
        return expect(genetics.remove).toHaveBeenCalled();
      });
    });
    describe('#remove', function() {
      return it('should remove the view from views', function() {
        var view;
        view = new myView().render();
        genetics.remove(view);
        return expect(genetics.views.length).toBe(0);
      });
    });
    return describe('#set', function() {
      return it('should set a single or multiple genes', function() {
        genetics.set({
          myGene: true
        });
        expect(_.size(genetics.genes)).toBe(1);
        genetics.set({
          anotherGene: false,
          andAnother: true
        });
        return expect(_.size(genetics.genes)).toBe(3);
      });
    });
  });

}).call(this);
