scene  = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.setZ(500)
rdr    = new THREE.WebGLRenderer({antialias: true})

rdr.setSize(window.innerWidth, window.innerHeight)
document.getElementById('wrapper').appendChild(rdr.domElement)


# Plane
geometry = new THREE.PlaneGeometry( 500, 500, 32 )
mat      = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} )
plane    = new THREE.Mesh(geometry, mat)
scene.add(plane)

# Helper
geometry = new THREE.CircleGeometry(5, 32)
mat      = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} )
circle   = new THREE.Mesh(geometry, mat)
scene.add(circle)

triangleShape = new THREE.Shape()
triangleShape.moveTo(  80, 20 )
triangleShape.lineTo(  40, 80 )
triangleShape.lineTo( 120, 80 )
triangleShape.lineTo(  80, 20 )

console.log triangleShape

geometry = new THREE.ShapeGeometry( triangleShape )
scene.add(new THREE.Mesh(geometry, mat))


# Equalizer
calculateLinePoint = (angle, length)->
  x = Math.sin(angle) * length
  y = Math.cos(angle) * length
  return {x: x, y: y}

rands = []
for i in [0..255]
  rands[i] = Math.random()
console.log rands[0]
for i in [0..(rands.length-1)]
  angle  = Math.PI * 2 * i / (rands.length)
  angle  += Math.PI*.5

  length = rands[i]*50
  radius = 250

  from = calculateLinePoint(angle, radius-length*.5)
  to   = calculateLinePoint(angle, radius+length*.5)

  # from1X = from.x + Math.cos(Math.PI*.5) * 10
  # from1Y = from.y + Math.sin(Math.PI*.5) * 10

  # from2X = from.x - Math.cos(Math.PI*.5) * 10
  # from2Y = from.y - Math.sin(Math.PI*.5) * 10

  # to1X   = to.x + Math.cos(Math.PI*.5) * 10
  # to1Y   = to.y + Math.sin(Math.PI*.5) * 10

  # to2X   = to.x - Math.cos(Math.PI*.5) * 10
  # to2Y   = to.y - Math.sin(Math.PI*.5) * 10

  # path.moveTo(from1X, from1Y)
  # path.lineTo(from2X, from2Y)
  # path.lineTo(to2X, to2Y)
  # path.lineTo(to1X, to1Y)
  # path.lineTo(from1X, from1Y)

  shape = new THREE.Shape()
  shape.moveTo(from.x, from.y)
  shape.lineTo(to.x, to.y)

  points = shape.createPointsGeometry()
  line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: 0xFF0000, linewidth: 2 } ) )
  scene.add(line)

  if i == 0
    console.log line


# shapes = path.toShapes()
# g = shapes[0].makeGeometry()

# g = path.makeGeometry()


# # for shape in shapes
# # shapes[0].autoClose = true
# # geometry = shapes[0].makeGeometry()
# # console.log geometry

# # geometry = new THREE.ShapeGeometry(shapes[0])
# line = new THREE.Mesh(g, mat)
# scene.add(line)



  # draw: ->
  #   @clear()
  #   @lineStyle(SPACE.pixelRatio, 0xFFFFFF, 1)

  #   for i in [0..(@_values.length-1)]
  #     angle  = PIXI.PI_2 * i / (@_values.length)
  #     angle  += Math.PI*.5

  #     length = @_values[i]
  #     radius = HELPERS.retina(@radius)

  #     from = @calculateLinePoint(angle, radius-length*.5)
  #     to   = @calculateLinePoint(angle, radius+length*.5)

  #     @drawline(from.x, from.y, to.x, to.y)

  # drawline: (fromX, fromY, toX, toY)->
  #   @moveTo(fromX, fromY)
  #   @lineTo(toX, toY)


window.onresize = ->
  rdr.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

update = ->
  setTimeout(update, 1000 / SPACE.FPS)

  # plane.position.set(plane.position.x, plane.position.y, plane.position.z-1)
  # console.log plane.position.z
update()

render = ->
  requestAnimationFrame( render )
  rdr.render( scene, camera )
render()
