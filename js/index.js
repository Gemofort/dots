
let canvas = document.getElementById('canvas');
let constext = canvas.getContext('2d');
let dots = [];

canvas.onclick = function (e) {
  getPosition(e);
};

function getPosition(event) {
  let x = event.clientX;
  let y = event.clientY;

  drawDot(x, y);
};

function drawDot(x, y) {
  let ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = "#000000"; // Black color

  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2, true);
  ctx.fill();

  for (var i = 0; i < dots.length; i++) {
    ctx.beginPath();

    ctx.moveTo(dots[i].x, dots[i].y);
    ctx.lineTo(x, y);

    ctx.stroke();
  };

  dots.push({ x, y });
  console.log(dots);
}
