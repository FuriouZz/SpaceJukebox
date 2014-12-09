class SPACE.SoundCloud
  constructor: (id)->
    SC.initialize({
      client_id: id
      redirect_uri: 'http://localhost:3000'
    })

    # # IF NO TOKEN
    # SC.connect(->
    #   # 1-31329-11457116-c5b96945c5e7e7c
    #   console.log SC.accessToken()
    # )

  pathOrUrl: (path, callback)->
    # Verify if it's an ID or an URL
    if /^\/(playlists|tracks)\/[0-9]+$/.test(path)
      return callback(path)

    unless /^(http|https)/.test(path)
      return console.log "\"" + path + "\" is not an url or a path"

    url = 'http://soundcloud.com/oembed?format=json&url='+path
    oReq = new XMLHttpRequest()
    oReq.open('GET', url, true)
    oReq.onload = (o)=>
      oEmbed = JSON.parse(o.target.response)

      a = document.createElement('div')
      a.innerHTML = oEmbed.html
      url  = a.querySelector('iframe').src
      url  = decodeURIComponent(url)

      url  = url.split(new RegExp('http://api.soundcloud.com'))[1]
      path = url.replace(/&.+/, '')
      callback(path)

    oReq.onError = ->
      console.log 'An error occurred while loading the file'
    oReq.send()    

  streamSound: (object, callback, events={})->
    if object and object.hasOwnProperty('kind')
      path = object.uri.replace('https://api.soundcloud.com', '')
      SC.stream(path+'?token=1-31329-11457116-c5b96945c5e7e7c', {
        autoPlay: true
        # useEQData: true
        useWaveformData: true
        # usePeakData: true
        whileplaying : events.whileplaying
        onfinish     : events.onfinish
      }, callback)

  getSoundOrPlaylist: (path, callback)->
    @pathOrUrl(path, (path)=>
      @get(path, callback)
    )

  get: (path, callback)->
    SC.get(path+'?token=1-31329-11457116-c5b96945c5e7e7c', callback)
