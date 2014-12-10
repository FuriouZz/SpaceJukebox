class SPACE.Track

  data:      null
  spaceship: null

  sound:     null

  time:      0

  pendingDuration: 0

  JukeBoxisPlaying: false

  constructor: (data)->
    @data = data
    @_events()

  _events: ->
    document.addEventListener(JUKEBOX.IS_PLAYING.type, @_eJukeboxIsPlaying)
    document.addEventListener(JUKEBOX.IS_STOPPED.type, @_eJukeboxIsStopped)

  _eJukeboxIsPlaying: =>
    @JukeBoxisPlaying = true

  _eJukeboxIsStopped: =>
    @JukeBoxisPlaying = false
    console.log 'i said stop'

  update: (delta)->
    if @JukeBoxisPlaying
      @time += delta

    if @pendingDuration > 0 and (@pendingDuration - @time) < 30*60*1000 and @spaceship.state == SPACESHIP.IDLE and @JukeBoxisPlaying
      console.log 'Spaceship launched: '+@data.title, @time, @pendingDuration, (@pendingDuration - @time), 5*60*1000
      @spaceship.setState(SPACESHIP.LAUNCHED)
      @spaceship.duration = @spaceship.time = (@pendingDuration - @time)

      # if @data.title == 'Tom Misch - Risk'
      #   console.log 'pending', @pendingDuration
      #   console.log 'time', @time
      #   console.log 'pending-time', (@pendingDuration - @time)
      #   console.log 'stime', @spaceship.time
      #   console.log 'sduration', @spaceship.duration
      #   debugger

    if @spaceship.state == SPACESHIP.LAUNCHED
      @spaceship.duration = @spaceship.time = (@pendingDuration - @time)

    if @spaceship.state == SPACESHIP.IN_LOOP
      @spaceship.time = (@pendingDuration - @time)
      # if @data.title == 'Tom Misch - Risk'
      #   console.log 'pending', @pendingDuration
      #   console.log 'time', @time
      #   console.log 'pending-time', (@pendingDuration - @time)
      #   console.log 'stime', @spaceship.time
      #   console.log 'sduration', @spaceship.duration
      #   debugger
      # console.log @data.title,  @spaceship.time / @spaceship.duration if @data.title == 'Tom Misch - Risk'

    @spaceship.update(delta)
