class SPACE.Track

  data:      null
  spaceship: null
  sound:     null

  time:      null

  durationBeforeLaunching: null

  constructor: (data, spaceship)->
    @data      = data
    @spaceship = spaceship
    @_events()

  @ON_PLAY: ->
    ev = document.createEvent('HTMLEvents')
    ev.initEvent('soundonplay', true, true)
    ev.eventName = 'soundonplay'
    return ev

  @ON_STOP: ->
    ev = document.createEvent('HTMLEvents')
    ev.initEvent('soundonstop', true, true)
    ev.eventName = 'soundonstop'
    return ev

  _events: ->
    document.addEventListener('soundonplay', @onplay)
    document.addEventListener('soundonstop', @onstop)

  onplay: =>
    @isPlaying = true

  onstop: =>
    @isPlaying = false

  update: (delta)->
    if @isPlaying
      @time += delta


    # percentage = @time / @durationBeforeLaunching
    # console.log percentage

    if @durationBeforeLaunching != null and (@durationBeforeLaunching - @time) < 5*60*1000 and @spaceship.state == SPACESHIP.IDLE and @isPlaying
      console.log @data.title
      @spaceship.setState(SPACESHIP.LAUNCHED)
      @spaceship.duration = (@durationBeforeLaunching - @time)

    if @spaceship.state == SPACESHIP.IN_LOOP
      @spaceship.time = (@durationBeforeLaunching - @time)

    @spaceship.update(delta)

    # @sc = new SPACE.SoundCloud(SPACE.SOUNDCLOUD.id)

  # launch: ->
  #   @spaceship.setState(SPACESHIP.LAUNCHED)

  # play: ->

  #   @sc.streamSound(@data, (sound)=>
  #     @sound = sound
  #   , =>
  #     console.log 'whileplaying'
  #     # datas = Array(256)
  #     # for i in [0..127]
  #     #   datas[i]     = Math.max(@sound.waveformData.left[i], @sound.waveformData.right[i])
  #     #   datas[255-i] = Math.max(@sound.waveformData.left[i], @sound.waveformData.right[i])

  #     # @eq.setNewValues(datas)
  #   )
