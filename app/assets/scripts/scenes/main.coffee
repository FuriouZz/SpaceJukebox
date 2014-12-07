class SPACE.MainScene extends SPACE.Scene

  playlist: null
  current: null

  constructor: (bg)->
    super(bg)

    middlePoint = new PIXI.Point(window.innerWidth, window.innerHeight)

    @eq = new SPACE.Equalizer(middlePoint, {minLength: 0, maxLength: 200})
    @addChild(@eq)

    @sc = new SPACE.SoundCloud(SPACE.SOUNDCLOUD.id)
    # @sound = null

    @playlist = []

    # @spaceship = new SPACE.Spaceship(middlePoint, @eq.radius)
    # @addChild(@spaceship)

    link = 'https://soundcloud.com/huhwhatandwhere/sets/supreme-laziness-the-celestics'
    @sc.getSoundOrPlaylist(link, (o)=>
      for data in o.tracks
        # Create Spaceship
        spaceship = new SPACE.Spaceship(middlePoint, @eq.radius)
        @addChild(spaceship)

        track = new SPACE.Track(data, spaceship)
        @playlist.push(track)
    )

    # # Chirac : '179013673'
    # # 20syl : '157170284'
    # @sc.getSoundOrPlaylist('/tracks/179013673', (o)=>
    #   @sc.streamSound(o, (sound)=>
    #     @sound = sound
    #   , =>
    #     datas = Array(256)
    #     for i in [0..127]
    #       datas[i]     = Math.max(@sound.waveformData.left[i], @sound.waveformData.right[i])
    #       datas[255-i] = Math.max(@sound.waveformData.left[i], @sound.waveformData.right[i])

    #     @eq.setNewValues(datas)
    #   )
    # )

  draw: ->
    @eq.draw()
    # @spaceship.draw()

  update: (delta)->
    @eq.update(delta)
    # @spaceship.update(delta)

    if @playlist.length > 0 and @current == null
      @current = @playlist[0]
      @playSound(@current)
      # @current.play()

  playSound: (track)->
    @sc.streamSound(@current.data, @_starting, {
      onplay       : @_onplay
      onfinish     : @_onfinish
      onstop       : @_onstop
      whileplaying : @_whileplaying
    })

  play: ->
    if @current and @current.hasOwnProperty('sound')
      @current.sound.play()

  resume: ->
    if @current and @current.hasOwnProperty('sound')
      @current.sound.resume()

  pause: ->
    if @current and @current.hasOwnProperty('sound')
      @current.sound.pause()
      @eq.mute()

  stop: ->
    if @current and @current.hasOwnProperty('sound')
      @current.sound.stop()
      @eq.mute()

  next: ->
    @_onfinish()

  _starting: (sound)=>
    @current.sound = sound

  _onplay: =>
    console.log 'onplay'

  _onfinish: =>
    @current.sound.stop()
    @current = null
    @playlist.shift()
    @eq.mute()

  _whileplaying: =>
    datas = Array(256)
    for i in [0..127]
      datas[i]     = Math.max(@current.sound.waveformData.left[i], @current.sound.waveformData.right[i])
      datas[255-i] = Math.max(@current.sound.waveformData.left[i], @current.sound.waveformData.right[i])

    if @current.sound.paused
      @eq.mute()
    else
      @eq.setNewValues(datas)

