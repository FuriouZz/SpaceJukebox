class SPACE.Spaceship extends PIXI.Graphics

  isIncoming: false
  isLoop:     false

  target:     null
  radius:     0

  distance:   0
  angle:      0

  time:       0

  state:      null

  constructor: (target, radius)->
    super

    @target          = target
    @radius          = radius

    @currentDistance = Math.max(window.innerWidth, window.innerHeight) * SPACE.pixelRatio
    @angle           = Math.random() * PIXI.PI_2

    @position.x = @target.x + Math.cos(@angle) * @currentDistance
    @position.y = @target.y + Math.sin(@angle) * @currentDistance

    @setState(SPACESHIP.IDLE)

    @draw()

  setState: (state)->
    @state = state

    switch state
      when SPACESHIP.IDLE
        @isIncoming = false
        @isLoop     = false
      when SPACESHIP.LAUNCHED
        @isIncoming      = true
        @isLoop          = false
      when SPACESHIP.IN_LOOP
        @isIncoming      = false
        @isLoop          = true
        @distance        = HELPERS.distance(@position, @target)
        @currentDistance = @distance
      else
        @setState(SPACESHIP.IDLE)

  forward: (angle, speed)->
    @move(angle + Math.PI, speed)

  backward: (angle, speed)->
    @move(angle, speed)

  move: (angle, speed)->
    direction   = new PIXI.Point(0, 0)
    direction.x = Math.cos(angle) * speed
    direction.y = Math.sin(angle) * speed

    @position.x += direction.x
    @position.y += direction.y

    @rotation = angle

  draw: ->
    @beginFill(0xFFFFFF)
    @moveTo(0, -5)
    @lineTo(0, 5)
    @lineTo(15, 0)

  update: (delta)->
    if @isIncoming
      @_updateLaunched()
    else if @isLoop
      @_updateInLoop(delta)

  _updateLaunched: ->
    if HELPERS.distance(@position, @target) <= @radius
      @setState(SPACESHIP.IN_LOOP)
    @forward(@angle, 5)

  _updateInLoop: (delta)->
    @time += delta
    duration = 10
    progression = @time / duration
    progression = Math.min(progression, 1)

    @currentDistance = @distance * (1 - progression)
    pos =
      x: @target.x + Math.cos(@angle + (progression * PIXI.PI_2))* @currentDistance
      y: @target.y + Math.sin(@angle + (progression * PIXI.PI_2))* @currentDistance

    old =
      x: @position.x
      y: @position.y

    @position.x = pos.x
    @position.y = pos.y

    angle = HELPERS.angleBetweenPoints(old, @position)
    @rotation = angle

    @setState(SPACESHIP.IDLE) if progression >= 1
