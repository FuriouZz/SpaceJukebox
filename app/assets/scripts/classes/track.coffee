class SPACE.Track

  data:      null
  spaceship: null
  sound:     null
  sc:        null

  constructor: (data, spaceship)->
    @data      = data
    @spaceship = spaceship
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
