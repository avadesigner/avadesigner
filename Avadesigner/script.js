$(document).ready(function () {
$('#up').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  },2000);
});

AOS.init({
  easing: 'ease',
  duration: 1800,
  once: true
});
function menuToggle() {
  var nav = document.getElementById('navbar')
  nav.classList.toggle('active')
}
});


//animation

(() => {
 const cnv = document.querySelector(`canvas`)    // rastiajka canvas
 const ctx = cnv.getContext(`2d`)

 let centerX = cnv.width / 2
 let centerY = cnv.height / 2

  function init() {
    cnv.width = innerWidth
    cnv.height = innerHeight
    centerX = cnv.width / 2
    centerY = cnv.height / 2
  }

  init()

  const numberOfRings    = 15
  const ringRadiusOffset = 3
  const ringRadius       = 150
  const waveOffset       = 30
  const colors           = [`#FF4500`, `#FF4500`, `#FF4500`]
  let startAngle         = 0

  function updateRings() {
    for (let i = 0; i < numberOfRings; i++) {
      let radius = i * ringRadiusOffset + ringRadius
      let offsetAngle = i * waveOffset * Math.PI / 180
     drawRing(radius, colors[i], offsetAngle)
    }

    startAngle >= 360? startAngle = 0 : startAngle++
  }

   const maxWavesAmplitude = 20
   const numberOfWaves     = 11

  function drawRing(radius, color, offsetAngle) {
    ctx.strokeStyle = color
    ctx.lineWidth   = 1

    ctx.beginPath()


    for(let j = -180; j < 180; j++){
      let currentAngle = (j + startAngle) * Math.PI / 180
      let displacement = 0
      let now = Math.abs(j)

      if (now > 70) {
        displacement = (now - 70) / 70
      }

      if (displacement >=1) {
        displacement = 1
      }

      let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude
      let x = centerX + Math.cos(currentAngle) * waveAmplitude
      let y = centerY + Math.sin(currentAngle) * waveAmplitude
      j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
  }

  function loop() {
    cnv.width |= 0          //ctx.clearRect(0, 0, cnv.width, cnv.height)
    updateRings()
    requestAnimationFrame(loop)
  }
  loop()

  window.addEventListener(`resize`, init)      // avtomaticheski prinimaet size window
})()
