/** An original, self-contained canvas vignette. All actors are simulated locally. */
export type EspOptions = {
  enabled: boolean;
  boxes: boolean;
  tracers: boolean;
  health: boolean;
  skeleton: boolean;
  selectedId: string | null;
};

export const ESP_PLAYERS = [
  { id: "scout", name: "SCOUT", health: 91, distance: 32, occluded: false },
  { id: "ghost", name: "GHOST", health: 62, distance: 48, occluded: true },
  { id: "ranger", name: "RANGER", health: 38, distance: 26, occluded: false },
  { id: "drift", name: "DRIFT", health: 100, distance: 67, occluded: false },
] as const;

type Point = [number, number];
type Player = (typeof ESP_PLAYERS)[number];
type Rig = ReturnType<typeof playerRig>;

const PLACEMENTS = [
  { x: 278, y: 396, height: 113, phase: 0.8, color: "#ef9a37" },
  { x: 485, y: 377, height: 107, phase: 2.1, color: "#e978af" },
  { x: 746, y: 416, height: 127, phase: 4.2, color: "#8bbfe4" },
  { x: 621, y: 325, height: 90, phase: 1.9, color: "#ac8be7" },
];

function polygon(ctx: CanvasRenderingContext2D, points: Point[], fill: string) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function ellipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  color: string,
) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function line(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  color: string,
  width: number,
) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function cloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ellipse(ctx, 0, 5, 56, 12, "#c7e9f3");
  ellipse(ctx, -30, 0, 27, 14, "#effaff");
  ellipse(ctx, 0, -10, 30, 23, "#f7fcff");
  ellipse(ctx, 30, -1, 32, 15, "#effaff");
  ellipse(ctx, 3, 6, 50, 7, "#d5eff8");
  ctx.restore();
}

function pine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ellipse(ctx, 12, 1, 32, 7, "#265b4738");
  polygon(
    ctx,
    [
      [-5, 0],
      [-3, -86],
      [3, -87],
      [7, 0],
    ],
    "#76514b",
  );
  polygon(
    ctx,
    [
      [-3, 0],
      [-3, -86],
      [1, -86],
      [2, 0],
    ],
    "#bd845a",
  );
  polygon(
    ctx,
    [
      [-39, -24],
      [-23, -58],
      [-31, -59],
      [-13, -86],
      [-21, -86],
      [0, -125],
      [21, -85],
      [14, -85],
      [31, -57],
      [24, -57],
      [39, -24],
    ],
    "#276751",
  );
  polygon(
    ctx,
    [
      [0, -125],
      [-21, -86],
      [-13, -86],
      [-31, -59],
      [-23, -58],
      [-39, -24],
      [-4, -30],
    ],
    "#42a462",
  );
  polygon(
    ctx,
    [
      [0, -125],
      [-1, -84],
      [21, -85],
    ],
    "#68bd6d",
  );
  polygon(
    ctx,
    [
      [-13, -86],
      [-31, -59],
      [-2, -63],
    ],
    "#77c576",
  );
  polygon(
    ctx,
    [
      [-23, -58],
      [-39, -24],
      [-1, -34],
    ],
    "#65b96a",
  );
  polygon(
    ctx,
    [
      [0, -83],
      [31, -57],
      [3, -63],
    ],
    "#358854",
  );
  ctx.restore();
}

function broadTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ellipse(ctx, 20, 0, 67, 11, "#285e3e32");
  polygon(
    ctx,
    [
      [-8, 2],
      [-5, -59],
      [-24, -88],
      [-16, -91],
      [0, -74],
      [21, -102],
      [27, -94],
      [7, -58],
      [10, 2],
    ],
    "#79604a",
  );
  polygon(
    ctx,
    [
      [-8, 2],
      [-5, -59],
      [-24, -88],
      [-17, -89],
      [1, -62],
      [0, 2],
    ],
    "#b89057",
  );
  polygon(
    ctx,
    [
      [-59, -76],
      [-70, -99],
      [-58, -123],
      [-29, -127],
      [-17, -147],
      [21, -151],
      [45, -132],
      [66, -122],
      [73, -97],
      [48, -76],
      [11, -68],
      [-23, -69],
    ],
    "#459a49",
  );
  polygon(
    ctx,
    [
      [-59, -76],
      [-70, -99],
      [-58, -123],
      [-29, -127],
      [-21, -105],
      [-29, -82],
    ],
    "#69b74d",
  );
  polygon(
    ctx,
    [
      [-29, -127],
      [-17, -147],
      [21, -151],
      [45, -132],
      [21, -114],
      [-21, -105],
    ],
    "#89ca55",
  );
  polygon(
    ctx,
    [
      [21, -114],
      [45, -132],
      [66, -122],
      [73, -97],
      [45, -96],
    ],
    "#65b94b",
  );
  polygon(
    ctx,
    [
      [-29, -82],
      [-21, -105],
      [21, -114],
      [45, -96],
      [11, -68],
      [-23, -69],
    ],
    "#54a345",
  );
  polygon(
    ctx,
    [
      [45, -96],
      [73, -97],
      [48, -76],
      [11, -68],
    ],
    "#2c7745",
  );
  ctx.restore();
}

function rock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ellipse(ctx, 2, 1, 27, 6, "#2c593c30");
  polygon(
    ctx,
    [
      [-29, 0],
      [-24, -22],
      [-8, -35],
      [13, -32],
      [28, -12],
      [25, 0],
    ],
    "#8dafa9",
  );
  polygon(
    ctx,
    [
      [-29, 0],
      [-24, -22],
      [-8, -35],
      [-5, -9],
    ],
    "#c2d1bc",
  );
  polygon(
    ctx,
    [
      [-8, -35],
      [13, -32],
      [28, -12],
      [-5, -9],
    ],
    "#adc5b8",
  );
  polygon(
    ctx,
    [
      [-5, -9],
      [28, -12],
      [25, 0],
      [-29, 0],
    ],
    "#6c938d",
  );
  ctx.restore();
}

function landscape(ctx: CanvasRenderingContext2D, time: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, 310);
  sky.addColorStop(0, "#4c97d6");
  sky.addColorStop(0.55, "#89cdeb");
  sky.addColorStop(1, "#d1eeef");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 960, 540);

  const sun = ctx.createRadialGradient(746, 89, 10, 746, 89, 130);
  sun.addColorStop(0, "#fff7c9b0");
  sun.addColorStop(0.4, "#ffeec227");
  sun.addColorStop(1, "#fff8ca00");
  ctx.fillStyle = sun;
  ctx.fillRect(600, 0, 290, 230);
  ellipse(ctx, 746, 89, 17, 17, "#fff6d6bb");
  cloud(ctx, 139 + Math.sin(time * 0.025) * 7, 89, 1.25);
  cloud(ctx, 497 + Math.sin(time * 0.025 + 1) * 5, 111, 0.72);
  cloud(ctx, 860, 153, 1.15);
  cloud(ctx, 349, 47, 0.48);

  polygon(
    ctx,
    [
      [0, 246],
      [0, 193],
      [92, 170],
      [182, 196],
      [251, 165],
      [362, 193],
      [411, 166],
      [500, 205],
      [596, 177],
      [680, 193],
      [749, 162],
      [831, 174],
      [960, 154],
      [960, 288],
    ],
    "#94bad3",
  );
  polygon(
    ctx,
    [
      [0, 278],
      [0, 231],
      [61, 209],
      [162, 226],
      [237, 207],
      [317, 232],
      [379, 212],
      [471, 228],
      [564, 207],
      [638, 221],
      [721, 204],
      [803, 228],
      [894, 193],
      [960, 216],
      [960, 300],
    ],
    "#6fafa1",
  );
  polygon(
    ctx,
    [
      [0, 311],
      [0, 260],
      [107, 237],
      [211, 256],
      [296, 239],
      [393, 259],
      [512, 235],
      [628, 258],
      [727, 240],
      [827, 258],
      [960, 229],
      [960, 540],
      [0, 540],
    ],
    "#78af51",
  );
  polygon(
    ctx,
    [
      [0, 310],
      [107, 237],
      [211, 256],
      [296, 239],
      [339, 295],
      [231, 332],
      [0, 352],
    ],
    "#8dc35b",
  );
  polygon(
    ctx,
    [
      [608, 289],
      [727, 240],
      [827, 258],
      [960, 229],
      [960, 322],
      [808, 307],
    ],
    "#95be59",
  );

  const ground = ctx.createLinearGradient(0, 285, 0, 540);
  ground.addColorStop(0, "#90b951");
  ground.addColorStop(1, "#3c7940");
  polygon(
    ctx,
    [
      [0, 330],
      [197, 298],
      [401, 298],
      [638, 279],
      [831, 319],
      [960, 293],
      [960, 540],
      [0, 540],
    ],
    "#669c42",
  );
  ctx.fillStyle = ground;
  ctx.beginPath();
  ctx.moveTo(0, 330);
  ctx.bezierCurveTo(330, 274, 537, 320, 960, 295);
  ctx.lineTo(960, 540);
  ctx.lineTo(0, 540);
  ctx.fill();
  polygon(
    ctx,
    [
      [0, 330],
      [199, 298],
      [287, 311],
      [147, 391],
      [0, 433],
    ],
    "#94b94e",
  );
  polygon(
    ctx,
    [
      [600, 335],
      [801, 311],
      [960, 295],
      [960, 388],
      [828, 376],
    ],
    "#84ad47",
  );
  polygon(
    ctx,
    [
      [0, 484],
      [192, 429],
      [418, 492],
      [347, 540],
      [0, 540],
    ],
    "#4c853e",
  );
  polygon(
    ctx,
    [
      [734, 433],
      [960, 399],
      [960, 540],
      [809, 540],
      [602, 500],
    ],
    "#39784555",
  );

  // A meandering dirt track gives the flat canvas scene a sense of depth.
  ctx.beginPath();
  ctx.moveTo(544, 281);
  ctx.bezierCurveTo(566, 314, 520, 328, 518, 351);
  ctx.bezierCurveTo(511, 408, 668, 426, 698, 540);
  ctx.lineTo(522, 540);
  ctx.bezierCurveTo(564, 458, 426, 400, 457, 353);
  ctx.bezierCurveTo(473, 326, 543, 308, 530, 281);
  ctx.closePath();
  const dirt = ctx.createLinearGradient(0, 290, 0, 540);
  dirt.addColorStop(0, "#b4b475");
  dirt.addColorStop(1, "#c5a679");
  ctx.fillStyle = dirt;
  ctx.fill();
  line(
    ctx,
    [
      [574, 457],
      [592, 477],
      [604, 502],
    ],
    "#debd8d66",
    4,
  );
  line(
    ctx,
    [
      [492, 361],
      [494, 380],
      [515, 401],
    ],
    "#dcc59455",
    2,
  );

  for (let i = 0; i < 78; i++) {
    const x = (i * 137.37 + 23) % 960;
    const y = 301 + ((i * 71.21) % 233);
    if (Math.abs(x - (y > 400 ? 573 : 490)) < (y > 430 ? 100 : 40)) continue;
    const length = 2 + ((y - 290) / 250) * 5;
    line(
      ctx,
      [
        [x - 3, y],
        [x - 5, y - length],
        [x, y],
        [x + 3, y - length * 0.8],
      ],
      i % 3 ? "#b2ce623a" : "#315f3745",
      1.25,
    );
  }

  pine(ctx, 43, 281, 0.48);
  pine(ctx, 80, 281, 0.63);
  pine(ctx, 348, 273, 0.53);
  pine(ctx, 697, 268, 0.48);
  pine(ctx, 820, 279, 0.66);
  pine(ctx, 878, 257, 0.46);
  broadTree(ctx, 189, 292, 0.9);
  broadTree(ctx, 876, 345, 1.15);
  pine(ctx, 57, 349, 1.04);
  pine(ctx, 375, 320, 0.73);
  rock(ctx, 696, 304, 0.58);
  rock(ctx, 217, 355, 0.63);
  rock(ctx, 844, 429, 1.04);
}

function cabin(ctx: CanvasRenderingContext2D) {
  ellipse(ctx, 503, 381, 100, 17, "#35493240");
  polygon(
    ctx,
    [
      [424, 268],
      [454, 249],
      [549, 263],
      [549, 366],
      [518, 385],
      [424, 372],
    ],
    "#89643d",
  );
  polygon(
    ctx,
    [
      [518, 280],
      [549, 263],
      [549, 366],
      [518, 385],
    ],
    "#6c5137",
  );
  polygon(
    ctx,
    [
      [424, 268],
      [518, 280],
      [518, 385],
      [424, 372],
    ],
    "#b28a54",
  );
  for (let i = 0; i < 7; i++) {
    const y = 278 + i * 14;
    line(
      ctx,
      [
        [426, y],
        [518, y + 12],
      ],
      "#70533d",
      2,
    );
    line(
      ctx,
      [
        [427, y + 2],
        [515, y + 14],
      ],
      "#c8a46b",
      1,
    );
    line(
      ctx,
      [
        [520, y + 12],
        [547, y - 3],
      ],
      "#4c4436",
      2,
    );
    line(
      ctx,
      [
        [434 + (i % 3) * 17, y + 7],
        [450 + (i % 3) * 17, y + 9],
      ],
      "#947344",
      0.9,
    );
  }
  polygon(
    ctx,
    [
      [416, 268],
      [468, 230],
      [529, 278],
      [518, 282],
    ],
    "#665f68",
  );
  polygon(
    ctx,
    [
      [468, 230],
      [503, 215],
      [560, 261],
      [529, 278],
    ],
    "#547385",
  );
  polygon(
    ctx,
    [
      [416, 268],
      [468, 230],
      [472, 236],
      [423, 272],
    ],
    "#d4b574",
  );
  polygon(
    ctx,
    [
      [469, 231],
      [503, 215],
      [508, 219],
      [474, 237],
    ],
    "#83a2ab",
  );
  line(
    ctx,
    [
      [486, 246],
      [520, 230],
    ],
    "#89a0a5",
    1.2,
  );
  line(
    ctx,
    [
      [502, 258],
      [536, 243],
    ],
    "#3e5a6c",
    1.5,
  );
  line(
    ctx,
    [
      [516, 270],
      [550, 255],
    ],
    "#3e5a6c",
    1.5,
  );
  polygon(
    ctx,
    [
      [469, 309],
      [496, 312],
      [496, 381],
      [469, 377],
    ],
    "#453f32",
  );
  polygon(
    ctx,
    [
      [473, 313],
      [492, 316],
      [492, 378],
      [473, 375],
    ],
    "#6c6743",
  );
  ellipse(ctx, 487, 347, 1.7, 1.7, "#dbc787");
  polygon(
    ctx,
    [
      [438, 290],
      [458, 293],
      [458, 321],
      [438, 318],
    ],
    "#664c34",
  );
  polygon(
    ctx,
    [
      [441, 293],
      [455, 295],
      [455, 317],
      [441, 315],
    ],
    "#76b1ad",
  );
  line(
    ctx,
    [
      [449, 294],
      [449, 316],
    ],
    "#c2a471",
    2.5,
  );
  line(
    ctx,
    [
      [441, 305],
      [455, 307],
    ],
    "#c2a471",
    2,
  );
  polygon(
    ctx,
    [
      [533, 287],
      [543, 281],
      [543, 304],
      [533, 310],
    ],
    "#3b524c",
  );
  polygon(
    ctx,
    [
      [418, 369],
      [523, 382],
      [523, 388],
      [418, 375],
    ],
    "#706449",
  );
  rock(ctx, 550, 384, 0.46);

  // Angled boards and a small crate are readable at mobile canvas scale.
  polygon(
    ctx,
    [
      [407, 330],
      [418, 329],
      [405, 374],
      [394, 373],
    ],
    "#c5a166",
  );
  line(
    ctx,
    [
      [411, 334],
      [399, 371],
    ],
    "#82613b",
    1.5,
  );
  polygon(
    ctx,
    [
      [564, 345],
      [585, 349],
      [585, 376],
      [564, 372],
    ],
    "#a27949",
  );
  polygon(
    ctx,
    [
      [564, 345],
      [575, 338],
      [596, 342],
      [585, 349],
    ],
    "#c6a06a",
  );
  polygon(
    ctx,
    [
      [585, 349],
      [596, 342],
      [596, 368],
      [585, 376],
    ],
    "#745d3d",
  );
  line(
    ctx,
    [
      [568, 351],
      [581, 370],
    ],
    "#d2ac70",
    3,
  );
  line(
    ctx,
    [
      [581, 353],
      [568, 367],
    ],
    "#d2ac70",
    3,
  );
}

function playerRig(index: number, time: number) {
  const base = PLACEMENTS[index];
  const beat = Math.sin(time * 1.8 + base.phase);
  const x = base.x + Math.sin(time * 0.42 + base.phase) * 5;
  const bottom = base.y + Math.sin(time * 0.84 + base.phase) * 1.5;
  const h = base.height;
  const joints = {
    head: [0.01, 0.095] as Point,
    neck: [0, 0.205] as Point,
    leftShoulder: [-0.13, 0.235] as Point,
    rightShoulder: [0.13, 0.235] as Point,
    leftElbow: [-0.21, 0.385 + beat * 0.008] as Point,
    rightElbow: [0.22, 0.365 + beat * 0.008] as Point,
    leftHand: [-0.1, 0.435] as Point,
    rightHand: [0.08, 0.435] as Point,
    hip: [0, 0.55] as Point,
    leftHip: [-0.075, 0.54] as Point,
    rightHip: [0.075, 0.54] as Point,
    leftKnee: [-0.095 + beat * 0.016, 0.75] as Point,
    rightKnee: [0.11 - beat * 0.016, 0.745] as Point,
    leftFoot: [-0.14 + beat * 0.027, 0.965] as Point,
    rightFoot: [0.16 - beat * 0.027, 0.965] as Point,
  };
  return {
    x,
    top: bottom - h,
    bottom,
    h,
    width: h * 0.54,
    color: base.color,
    joints,
  };
}

function drawPlayer(ctx: CanvasRenderingContext2D, rig: Rig, ghost = false) {
  const { x, top, h, joints: j, color } = rig;
  if (!ghost) ellipse(ctx, x + 7, top + h, h * 0.27, h * 0.045, "#254b355c");
  ctx.save();
  ctx.translate(x, top);
  ctx.scale(h, h);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (ghost) ctx.globalAlpha = 0.16;

  line(ctx, [j.leftHip, j.leftKnee, j.leftFoot], "#29384a", 0.092);
  line(ctx, [j.rightHip, j.rightKnee, j.rightFoot], "#354c5b", 0.092);
  line(ctx, [j.leftHip, j.leftKnee], "#526166", 0.058);
  line(ctx, [j.rightHip, j.rightKnee], "#607476", 0.058);
  line(ctx, [j.leftFoot, [j.leftFoot[0] - 0.032, 0.976]], "#182635", 0.061);
  line(ctx, [j.rightFoot, [j.rightFoot[0] + 0.032, 0.976]], "#182635", 0.061);
  polygon(
    ctx,
    [
      [-0.133, 0.22],
      [0.13, 0.22],
      [0.12, 0.43],
      [0.09, 0.56],
      [-0.09, 0.56],
      [-0.13, 0.43],
    ],
    color,
  );
  polygon(
    ctx,
    [
      [-0.133, 0.23],
      [-0.012, 0.22],
      [-0.012, 0.52],
      [-0.095, 0.54],
      [-0.13, 0.43],
    ],
    "#222f4180",
  );
  polygon(
    ctx,
    [
      [-0.087, 0.25],
      [0.088, 0.25],
      [0.083, 0.435],
      [-0.087, 0.435],
    ],
    "#344c55",
  );
  polygon(
    ctx,
    [
      [-0.067, 0.28],
      [-0.013, 0.28],
      [-0.013, 0.345],
      [-0.067, 0.345],
    ],
    "#829381",
  );
  polygon(
    ctx,
    [
      [0.012, 0.28],
      [0.066, 0.28],
      [0.066, 0.345],
      [0.012, 0.345],
    ],
    "#728271",
  );
  line(
    ctx,
    [
      [-0.096, 0.51],
      [0.093, 0.51],
    ],
    "#243644",
    0.04,
  );
  line(ctx, [j.leftShoulder, j.leftElbow], color, 0.072);
  line(ctx, [j.rightShoulder, j.rightElbow], color, 0.072);
  line(ctx, [j.leftElbow, j.leftHand], "#b68771", 0.052);
  line(ctx, [j.rightElbow, j.rightHand], "#d1a085", 0.052);
  line(ctx, [j.leftHand, [-0.055, 0.435]], "#26363f", 0.046);
  line(ctx, [j.rightHand, [0.05, 0.435]], "#26363f", 0.046);
  line(
    ctx,
    [
      [-0.09, 0.406],
      [0.212, 0.395],
    ],
    "#172b37",
    0.025,
  );
  line(
    ctx,
    [
      [-0.055, 0.42],
      [0.1, 0.412],
    ],
    "#334753",
    0.047,
  );
  line(
    ctx,
    [
      [0.01, 0.42],
      [0.025, 0.461],
    ],
    "#172b37",
    0.025,
  );
  line(ctx, [j.neck, [0, 0.165]], "#bd9077", 0.061);
  ellipse(ctx, 0.009, 0.108, 0.065, 0.079, "#c7997c");
  polygon(
    ctx,
    [
      [-0.06, 0.113],
      [-0.07, 0.069],
      [-0.034, 0.019],
      [0.042, 0.015],
      [0.078, 0.06],
      [0.073, 0.098],
      [0.013, 0.084],
    ],
    "#233447",
  );
  polygon(
    ctx,
    [
      [-0.065, 0.07],
      [-0.034, 0.019],
      [0.042, 0.015],
      [0.061, 0.045],
      [-0.013, 0.041],
    ],
    "#44616d",
  );
  line(
    ctx,
    [
      [0.015, 0.112],
      [0.064, 0.112],
    ],
    "#162d3b",
    0.018,
  );
  line(
    ctx,
    [
      [0.027, 0.108],
      [0.057, 0.108],
    ],
    "#add7d6",
    0.007,
  );
  ctx.restore();
}

function drawSkeleton(ctx: CanvasRenderingContext2D, rig: Rig, color: string) {
  const { joints: j, x, top, h } = rig;
  ctx.save();
  ctx.translate(x, top);
  ctx.scale(h, h);
  ctx.lineCap = "round";
  const chains = [
    [j.head, j.neck, j.hip],
    [
      j.leftHand,
      j.leftElbow,
      j.leftShoulder,
      j.neck,
      j.rightShoulder,
      j.rightElbow,
      j.rightHand,
    ],
    [
      j.leftFoot,
      j.leftKnee,
      j.leftHip,
      j.hip,
      j.rightHip,
      j.rightKnee,
      j.rightFoot,
    ],
  ];
  chains.forEach((points) => line(ctx, points, "#092d39aa", 0.026));
  chains.forEach((points) => line(ctx, points, color, 0.012));
  ctx.beginPath();
  ctx.arc(j.head[0], j.head[1], 0.048, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.012;
  ctx.stroke();
  Object.values(j).forEach(([px, py]) =>
    ellipse(ctx, px, py, 0.013, 0.013, "#f1ffff"),
  );
  ctx.restore();
}

function overlay(
  ctx: CanvasRenderingContext2D,
  player: Player,
  rig: Rig,
  options: EspOptions,
  time: number,
) {
  const selected = options.selectedId === player.id;
  const color = player.occluded ? "#ff8dcb" : "#7cffe9";
  const x = rig.x - rig.width / 2;
  const y = rig.top - 5;
  const w = rig.width;
  const h = rig.h + 9;
  ctx.save();
  ctx.lineJoin = "miter";
  ctx.lineCap = "butt";

  if (options.tracers) {
    const tracer = ctx.createLinearGradient(480, 538, rig.x, rig.bottom);
    tracer.addColorStop(0, `${color}1c`);
    tracer.addColorStop(1, `${color}ca`);
    ctx.beginPath();
    ctx.moveTo(480, 538);
    ctx.lineTo(rig.x, y + h + 2);
    ctx.strokeStyle = tracer;
    ctx.lineWidth = selected ? 1.7 : 1.1;
    ctx.stroke();
    ellipse(ctx, rig.x, y + h + 2, 2, 2, color);
  }

  if (options.boxes) {
    if (player.occluded) drawPlayer(ctx, rig, true);
    ctx.fillStyle = `${color}${selected ? "18" : "08"}`;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#062f4055";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
    ctx.shadowColor = color;
    ctx.shadowBlur = selected ? 10 : 5;
    ctx.strokeStyle = `${color}c9`;
    ctx.lineWidth = 1.25;
    ctx.strokeRect(x, y, w, h);
    ctx.shadowBlur = 0;
    const corner = 11;
    line(
      ctx,
      [
        [x, y + corner],
        [x, y],
        [x + corner, y],
      ],
      selected ? "#ffffff" : color,
      2.6,
    );
    line(
      ctx,
      [
        [x + w - corner, y],
        [x + w, y],
        [x + w, y + corner],
      ],
      selected ? "#ffffff" : color,
      2.6,
    );
    line(
      ctx,
      [
        [x, y + h - corner],
        [x, y + h],
        [x + corner, y + h],
      ],
      selected ? "#ffffff" : color,
      2.6,
    );
    line(
      ctx,
      [
        [x + w - corner, y + h],
        [x + w, y + h],
        [x + w, y + h - corner],
      ],
      selected ? "#ffffff" : color,
      2.6,
    );
  }

  if (options.health) {
    const healthColor =
      player.health > 65
        ? "#9dfd9f"
        : player.health > 40
          ? "#ffe48c"
          : "#ff9b82";
    ctx.fillStyle = "#092327f2";
    ctx.fillRect(x - 12, y - 1, 8, h + 2);
    ctx.fillStyle = healthColor;
    ctx.fillRect(
      x - 11,
      y + h * (1 - player.health / 100),
      6,
      h * (player.health / 100),
    );
    ctx.font = "bold 14px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#122d30";
    const numberY = y + h * (1 - player.health / 100) + 5;
    ctx.strokeText(`${player.health}`, x - 17, numberY);
    ctx.fillStyle = healthColor;
    ctx.fillText(`${player.health}`, x - 17, numberY);
  }
  if (options.skeleton) drawSkeleton(ctx, rig, color);

  // Nameplates remain useful when individual overlay layers are disabled.
  ctx.font = "bold 13px ui-monospace, SFMono-Regular, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const title = `${player.name}  ${player.distance}m`;
  const textW = ctx.measureText(title).width + 16;
  ctx.fillStyle = "#09212bf2";
  ctx.fillRect(rig.x - textW / 2, y - 26, textW, 21);
  ctx.fillStyle = selected ? "#fff" : color;
  ctx.fillText(title, rig.x, y - 15);
  if (player.occluded) {
    ctx.font = "bold 11px ui-monospace, SFMono-Regular, Consolas, monospace";
    ctx.fillStyle = "#301d36f2";
    ctx.fillRect(rig.x - 49, y + h + 8, 98, 18);
    ctx.fillStyle = "#ffd0eb";
    ctx.fillText("BEHIND COVER", rig.x, y + h + 17);
  }
  if (selected) {
    const pulse = 0.5 + Math.sin(time * 3) * 0.12;
    ctx.strokeStyle = `rgba(236, 255, 251, ${pulse})`;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]);
    ctx.strokeRect(x - 5, y - 5, w + 10, h + 10);
    ctx.setLineDash([]);
  }
  ctx.restore();
}

export function hitTestEspPlayer(
  x: number,
  y: number,
  timeSeconds: number,
): string | null {
  for (let i = ESP_PLAYERS.length - 1; i >= 0; i--) {
    const rig = playerRig(i, timeSeconds);
    if (
      x >= rig.x - rig.width / 2 - 14 &&
      x <= rig.x + rig.width / 2 + 14 &&
      y >= rig.top - 25 &&
      y <= rig.bottom + 20
    ) {
      return ESP_PLAYERS[i].id;
    }
  }
  return null;
}

/** The caller supplies the DPR transform for a 960 × 540 logical canvas. */
export function renderEspScene(
  ctx: CanvasRenderingContext2D,
  timeSeconds: number,
  options: EspOptions,
): void {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 960, 540);
  ctx.clip();
  landscape(ctx, timeSeconds);
  const rigs = ESP_PLAYERS.map((_, i) => playerRig(i, timeSeconds));
  // Actors are painted before the cabin, so the overlay reveals actual cover.
  [3, 1, 0, 2].forEach((i) => drawPlayer(ctx, rigs[i]));
  cabin(ctx);

  // A cropped shoulder-view player puts the visitor inside the memory.
  const foreground = playerRig(0, 0);
  drawPlayer(ctx, {
    ...foreground,
    x: 137,
    top: 378,
    bottom: 681,
    h: 303,
    width: 163,
    color: "#6295a4",
  });
  polygon(
    ctx,
    [
      [95, 463],
      [118, 449],
      [158, 455],
      [173, 480],
      [167, 534],
      [109, 534],
      [93, 506],
    ],
    "#263e4f",
  );
  polygon(
    ctx,
    [
      [99, 470],
      [119, 456],
      [151, 461],
      [159, 477],
      [155, 524],
      [111, 524],
      [103, 501],
    ],
    "#425d68",
  );
  polygon(
    ctx,
    [
      [113, 483],
      [145, 483],
      [148, 508],
      [115, 510],
    ],
    "#647b7b",
  );
  line(
    ctx,
    [
      [116, 460],
      [111, 522],
    ],
    "#9daba0",
    3,
  );
  line(
    ctx,
    [
      [148, 464],
      [156, 520],
    ],
    "#708b89",
    3,
  );
  line(
    ctx,
    [
      [150, 477],
      [257, 435],
    ],
    "#253744",
    8,
  );
  line(
    ctx,
    [
      [238, 441],
      [268, 429],
    ],
    "#172d3c",
    4,
  );

  // Soft lens vignette separates the game view from the surrounding interface.
  const vignette = ctx.createRadialGradient(500, 285, 165, 480, 270, 555);
  vignette.addColorStop(0, "#102e4100");
  vignette.addColorStop(1, "#071e3b58");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 960, 540);

  // Calm aiming reticle is part of the vignette in both display modes.
  ctx.save();
  ctx.strokeStyle = "#ffffffab";
  ctx.lineWidth = 1.25;
  [
    [
      [470, 270],
      [476, 270],
    ],
    [
      [484, 270],
      [490, 270],
    ],
    [
      [480, 260],
      [480, 266],
    ],
    [
      [480, 274],
      [480, 280],
    ],
  ].forEach((points) => line(ctx, points as Point[], "#ffffffab", 1.25));
  ellipse(ctx, 480, 270, 1, 1, "#ffffffd9");
  ctx.restore();

  if (options.enabled)
    ESP_PLAYERS.forEach((player, i) =>
      overlay(ctx, player, rigs[i], options, timeSeconds),
    );
  ctx.restore();
}
