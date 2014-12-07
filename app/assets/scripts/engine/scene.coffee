class Scene extends PIXI.Stage
  paused: false

  constructor: (bg)->
    super(bg)

  update: (delta)=>
    for child in @children
      @updateObj(child, d)

  updateObj: (obj, delta)->
    obj.update(d)
    if obj.children && obj.children.length > 0
      for child in obj.children
        @updateObj(child, d)

  resume: ->
    @paused = false

  pause: ->
    @paused = true

  isPaused: ->
    return @paused

SPACE.Scene = Scene
