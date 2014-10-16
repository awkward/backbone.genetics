describe 'Backbone.Genetics', ->
  myView = {}
  genetics = {}

  beforeEach ->
    genetics = new Backbone.Genetics()

    class myView extends Backbone.View
      template: -> """
        <a href="#" data-gen="myGen">Open special feature</a>
      """

      events:
        'a': 'triggerSpecialFeature'

      render: ->
        @$el.html @template()
        genetics.bind(@)

        return this

      triggerSpecialFeature: ->

  afterEach ->
    myView = {}
    genetics = {}

  it 'should have views and genes', ->
    expect(genetics.views and genetics.genes).toBeDefined()

  describe '#bind', ->
    it 'should return an error if no view is passed along', ->
      expect(genetics.bind).toThrow()

    it 'should increase the amount of views bound to', ->
      view = new myView().render()
      expect(genetics.views.length).toBe(1)

  describe '#setViewEvents', ->
    it 'should trigger setGenes again once the dom is refreshed (for Marionette)', ->
      view = new myView()
      view.render()

      spyOn(genetics, 'setGenes')
      view.trigger('dom:refresh')

      expect(genetics.setGenes).toHaveBeenCalled()

    it 'should trigger remove once you destroy the view (for Marionette)', ->
      view = new myView()
      view.render()

      spyOn(genetics, 'remove')
      view.trigger('destroy')

      expect(genetics.remove).toHaveBeenCalled()

  describe '#remove', ->
    it 'should remove the view from views', ->
      view = new myView().render()
      genetics.remove(view)
      expect(genetics.views.length).toBe(0)

  describe '#set', ->
    it 'should set a single or multiple genes', ->
      genetics.set(myGene: true)
      expect(_.size(genetics.genes)).toBe(1)
      genetics.set(anotherGene: false, andAnother: true)
      expect(_.size(genetics.genes)).toBe(3)
