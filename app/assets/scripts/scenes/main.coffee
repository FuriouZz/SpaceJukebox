class SPACE.MainScene extends SPACE.Scene

  playlist: null
  current: null

  totalDuration: 0

  constructor: (bg)->
    super(bg)

    middlePoint = new PIXI.Point(window.innerWidth, window.innerHeight)

    @eq = new SPACE.Equalizer(middlePoint, {minLength: 0, maxLength: 200})
    @addChild(@eq)

    @sc = new SPACE.SoundCloud(SPACE.SOUNDCLOUD.id)

    @playlist = []

    @add('https://soundcloud.com/chonch-2/courte-danse-macabre')
    setTimeout(=>
      @add('https://soundcloud.com/chonch-2/mouais')
    , 1000)
    setTimeout(=>
      @add('https://soundcloud.com/chonch-2/cacaco-2')
    , 2000)
    setTimeout(=>
      @add('https://soundcloud.com/chonch-2/duodenum')
    , 3000)
    @add('https://soundcloud.com/chonch-2/little-green-monkey')
    # @add('/tracks/179013673')
    # @add('/tracks/157170284')
    # @add('https://soundcloud.com/huhwhatandwhere/sets/supreme-laziness-the-celestics')

  draw: ->
    @eq.draw()
    # @spaceship.draw()

  update: (delta)->
    @eq.update(delta)

    for track, i in @playlist
      track.update(delta)# if i == 1

    if @playlist.length > 0
      @next() if @current == null

  add: (soundOrPlaylist)->
    middlePoint = new PIXI.Point(window.innerWidth, window.innerHeight)

    @sc.getSoundOrPlaylist(soundOrPlaylist, (o)=>
      tracks = null
      if o.hasOwnProperty('tracks')
        tracks = o.tracks
      else
        tracks = []
        tracks.push(o)

      for data in tracks
        # Create Spaceship
        spaceship = new SPACE.Spaceship(middlePoint, @eq.radius)
        @addChild(spaceship)

        # Create track from data and spaceship
        track = new SPACE.Track(data, spaceship)
        track.durationBeforeLaunching = @getDurationFromPosition(@playlist.length-1)
        @playlist.push(track)

        @totalDuration += data.duration
    )

  getDurationFromPosition: (position)->
    duration = 0
    for track, i in @playlist
      duration += track.data.duration
      break if i == position
    return duration

  next: (track)->
    @_onfinish() if @current
    @current = @playlist.shift()

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

  _starting: (sound)=>
    @current.sound = sound
    document.dispatchEvent(SPACE.Track.ON_PLAY())

  _onplay: =>
    console.log 'onplay'

  _onfinish: =>
    @current.sound.stop()
    @current = null
    @eq.mute()
    @tmpPosition = 0
    document.dispatchEvent(SPACE.Track.ON_STOP())

  tmpPosition: 0

  _whileplaying: =>
    # console.log Date.now() - @tmpPosition
    # @tmpPosition = Date.now()
    # @totalDuration -= @current.sound.position - @tmpPosition
    # @tmpPosition   = @current.sound.position
    # for track, i in @playlist
    #   track.spaceship.wait -= @current.sound.position - @tmpPosition
    #   @tmpPosition = @current.sound.position

    # per = @current.sound.position / @current.sound.duration
    # console.log per

    datas = Array(256)
    for i in [0..127]
      datas[i]     = Math.max(@current.sound.waveformData.left[i], @current.sound.waveformData.right[i])
      datas[255-i] = Math.max(@current.sound.waveformData.left[i], @current.sound.waveformData.right[i])

    if @current.sound.paused
      @eq.mute()
    else
      @eq.setNewValues(datas)

