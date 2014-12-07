

HELPERS = HELPERS || {

  # Object
  merge: (options, overrides) ->
    @extend (@extend {}, options), overrides

  extend: (object, properties) ->
    for key, val of properties
      object[key] = val
    object

  # Math
  angleBetweenPoints: (first, second) ->
    height = second.y - first.y
    width  = second.x - first.x
    # console.log('Utils', Math.atan2(height, width))
    return Math.atan2(height, width)

  distance: (point1, point2) ->
    x = point1.x - point2.x
    y = point1.y - point2.y
    d = x * x + y * y
    return Math.sqrt(d)

  collision: (dot1, dot2)->
    r1 = if dot1.radius then dot1.radius else 0
    r2 = if dot2.radius then dot2.radius else 0
    dist = r1 + r2

    return @distance(dot1.position, dot2.position) <= Math.sqrt(dist * dist)

  map: (value, low1, high1, low2, high2) ->
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}
