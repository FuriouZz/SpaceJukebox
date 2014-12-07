class SPACE.SceneManager

    currentScene: null
    _scenes: null
    _renderer: null
    _stats: null
    _tick: 0

    constructor: (width, height)->
        if (@_renderer) then return @

        @_tick = Date.now()

        @_scenes   = []
        @_renderer = new PIXI.autoDetectRenderer(width * SPACE.pixelRatio, height * SPACE.pixelRatio)
        document.body.appendChild(@_renderer.view)

        @_setupStats() if SPACE.ENV == 'development'

        @_draw()
        @_update()

    _setupStats: ->
        @_stats = new Stats()
        @_stats.setMode(0)
        @_stats.domElement.style.position = 'absolute'
        @_stats.domElement.style.left = '0px'
        @_stats.domElement.style.top = '0px'
        document.body.appendChild( @_stats.domElement )

    _draw: =>
        window.requestAnimationFrame(@_draw)

        if !@currentScene or @currentScene.isPaused()
            return

        @_renderer.render(@currentScene)
        @currentScene.draw()

    _update: =>
        setTimeout(@_update, 1000 / SPACE.FPS)

        if !@currentScene or @currentScene.isPaused()
            return

        SPACE.ASSERT(SPACE.ENV == 'development', @_stats.begin)
        c = Date.now()
        @currentScene.update((c - @_tick)/1000)
        @_tick = c

        SPACE.ASSERT(SPACE.ENV == 'development', @_stats.end)

    createScene: (identifier, aScene, interactive)->
        if @_scenes[identifier]
            return undefined

        scene = new aScene(0x000000)
        @_scenes[identifier] = scene

        return scene

    goToScene: (identifier)->
        if @_scenes[identifier]
            @currentScene.pause() if @currentScene
            @currentScene = @_scenes[identifier]
            @currentScene.resume()
            return true

        return false
