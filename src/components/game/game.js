// 定义游戏画布和上下文
const canvas = document.getElementById('gameCanvas');
const nextCanvas = document.getElementById('nextCanvas');
const ctx = canvas.getContext('2d');
const nextCtx = nextCanvas.getContext('2d');

// 方块尺寸常量
const PREVIEW_BLOCK_SIZE = 15; // 预览区域方块尺寸
const BLOCK_SIZE = 30; // 主游戏区域方块尺寸

// 方块旋转方向处理函数
const ROTATIONS = {
  0: (
    shape // 顺时针旋转90度
  ) =>
    shape.map((_, i) => shape[i].map((_, j) => shape[shape.length - 1 - j][i])),
  1: (
    shape // 逆时针旋转90度
  ) => shape.map((row, i) => row.map((_, j) => shape[shape.length - 1 - j][i])),
};

// 七种经典俄罗斯方块形状定义
// 每个形状包含多个旋转状态，1表示方块存在，0表示空白
const SHAPES = [
  [
    // I型（长条）
    [[1, 1, 1, 1]], // 水平状态
    [[1], [1], [1], [1]], // 垂直状态
  ],
  [
    // O型（方块）
    [
      [1, 1],
      [1, 1],
    ],
  ],
  [
    // T型
    [
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  ],
  [
    // L型
    [
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  ],
  [
    // J型
    [
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
    ],
  ],
  [
    // S型
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
  ],
  [
    // Z型
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  ],
];

let currentPiece;
let nextPiece;
let score = 0;
let lastDrop = 0;
let isPaused = false;
let animationFrameID;

/**
 * 处理游戏暂停/继续逻辑
 */
function handlePause() {
  isPaused = !isPaused;
  // 更新按钮文本
  document.getElementById('pauseBtn').textContent = isPaused ? '继续' : '暂停';
  // 恢复游戏循环
  if (!isPaused) {
    animationFrameID = requestAnimationFrame(gameLoop);
  }
}

/**
 * 初始化游戏状态
 * 1. 重置游戏网格
 * 2. 初始化分数
 * 3. 绑定控制事件
 * 4. 生成初始方块
 */
function initGame() {
  // 取消之前的动画帧
  if (animationFrameID) cancelAnimationFrame(animationFrameID);
  isPaused = false;
  document.getElementById('pauseBtn').textContent = '暂停';
  grid = Array(GRID_HEIGHT)
    .fill()
    .map(() => Array(GRID_WIDTH).fill(0));
  score = 0;
  document.getElementById('score').textContent = score;

  // 事件绑定
  // 移除旧事件监听器
  pauseBtn.replaceWith(pauseBtn.cloneNode(true));
  restartBtn.replaceWith(restartBtn.cloneNode(true));

  // 获取新按钮引用
  const newPauseBtn = document.getElementById('pauseBtn');
  const newRestartBtn = document.getElementById('restartBtn');

  // 重置暂停状态
  newPauseBtn.textContent = '暂停';

  // 添加新事件监听器
  newPauseBtn.addEventListener('click', handlePause);
  newRestartBtn.addEventListener('click', handleRestart);
  spawnNewPiece();
  gameLoop();
}

/**
 * 方块旋转处理
 * @param {Object} piece 当前方块对象
 * @returns {Object} 旋转后的新方块对象
 */
function rotatePiece(piece) {
  // 深度比对两个二维数组是否相同
  const arrayEquals = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].length !== b[i].length) return false;
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) return false;
      }
    }
    return true;
  };

  // 查找当前形状在SHAPES中的索引
  const shapeIndex = SHAPES.findIndex((s) =>
    s.some((v) => arrayEquals(v, piece.shape))
  );
  if (shapeIndex === -1) {
    console.error('无效的形状:', piece.shape);
    return piece;
  }
  const rotations = SHAPES[shapeIndex];
  const currentIndex = rotations.findIndex((v) => arrayEquals(v, piece.shape));
  if (currentIndex === -1) {
    console.error('未找到当前旋转状态');
    return piece;
  }
  const newIndex = (currentIndex + 1) % rotations.length;

  // 特殊处理I型方块的旋转轴心调整
  if (shapeIndex === 0) {
    return {
      shape: rotations[newIndex],
      // 调整x坐标保持方块居中
      x: Math.floor(
        piece.x - (rotations[newIndex][0].length - piece.shape[0].length) / 2
      ),
      // 调整y坐标保持方块居中
      y: Math.floor(
        piece.y - (rotations[newIndex].length - piece.shape.length) / 2
      ),
    };
  }
  return { shape: rotations[newIndex], x: piece.x, y: piece.y };
}

function drawNextPiece() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  const pieceWidth = nextPiece.shape[0].length * PREVIEW_BLOCK_SIZE;
  const pieceHeight = nextPiece.shape.length * PREVIEW_BLOCK_SIZE;
  const startX = (nextCanvas.width - pieceWidth) / 2;
  const startY = (nextCanvas.height - pieceHeight) / 2;

  nextPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        nextCtx.fillStyle = '#000';
        nextCtx.fillRect(
          startX + x * PREVIEW_BLOCK_SIZE,
          startY + y * PREVIEW_BLOCK_SIZE,
          PREVIEW_BLOCK_SIZE - 1,
          PREVIEW_BLOCK_SIZE - 1
        );
      }
    });
  });
}

function spawnNewPiece() {
  const typeIndex = Math.floor(Math.random() * SHAPES.length);
  currentPiece = nextPiece || {
    shape: SHAPES[typeIndex][0],
    x: Math.floor(canvas.width / BLOCK_SIZE / 2),
    y: 0,
  };
  nextPiece = {
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)][0],
    x: 0,
    y: 0,
  };
  drawNextPiece();
}

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
let grid = Array(GRID_HEIGHT)
  .fill()
  .map(() => Array(GRID_WIDTH).fill(0));

/**
 * 碰撞检测函数
 * @param {Object} piece 当前方块
 * @param {number} newX 目标x坐标
 * @param {number} newY 目标y坐标
 * @returns {boolean} 是否可以移动
 */
function canMove(piece, newX, newY) {
  newX = Math.floor(newX);
  newY = Math.floor(newY);
  return piece.shape.every((row, dy) =>
    row.every((cell, dx) => {
      if (!cell) return true; // 空白格不需要检测
      const x = newX + dx;
      const y = newY + dy;
      // 检测边界和已有方块碰撞
      return (
        x >= 0 && x < GRID_WIDTH && y < GRID_HEIGHT && !(y >= 0 && grid[y][x])
      );
    })
  );
}

function mergePiece() {
  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        grid[currentPiece.y + y][currentPiece.x + x] = 1;
      }
    });
  });
}

function clearLines() {
  let linesCleared = 0;
  for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
    if (grid[y].every((cell) => cell)) {
      grid.splice(y, 1);
      grid.unshift(Array(GRID_WIDTH).fill(0));
      linesCleared++;
      y++; // 重新检查当前y位置
    }
  }
  if (linesCleared > 0) {
    score += linesCleared * 100;
    document.getElementById('score').textContent = score;

    // 事件绑定
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    pauseBtn.removeEventListener('click', handlePause);
    restartBtn.removeEventListener('click', handleRestart);
    pauseBtn.addEventListener('click', handlePause);
    restartBtn.addEventListener('click', handleRestart);
  }
}

function gameLoop(timestamp) {
  if (isPaused) {
    animationFrameID = requestAnimationFrame(gameLoop);
    return;
  }
  if (!lastDrop || timestamp - lastDrop > 1000) {
    if (canMove(currentPiece, currentPiece.x, currentPiece.y + 1)) {
      currentPiece.y++;
    } else {
      mergePiece();
      clearLines();
      spawnNewPiece();
      if (!canMove(currentPiece, currentPiece.x, currentPiece.y)) {
        alert('游戏结束！得分：' + score);
        location.reload();
      }
    }
    lastDrop = timestamp;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawPiece(currentPiece);
  animationFrameID = requestAnimationFrame(gameLoop);
}

function drawGrid() {
  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = '#666';
        ctx.fillRect(
          x * BLOCK_SIZE,
          y * BLOCK_SIZE,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1
        );
      }
    });
  });
}

function drawPiece(piece) {
  ctx.fillStyle = '#000';
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillRect(
          (piece.x + x) * BLOCK_SIZE,
          (piece.y + y) * BLOCK_SIZE,
          BLOCK_SIZE - 1,
          BLOCK_SIZE - 1
        );
      }
    });
  });
}

// 初始化游戏
initGame();

// 键盘控制事件
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      if (canMove(currentPiece, currentPiece.x - 1, currentPiece.y)) {
        currentPiece.x--;
      }
      break;
    case 'ArrowRight':
      if (canMove(currentPiece, currentPiece.x + 1, currentPiece.y)) {
        currentPiece.x++;
      }
      break;
    case 'ArrowDown':
      if (canMove(currentPiece, currentPiece.x, currentPiece.y + 1)) {
        currentPiece.y++;
      }
      break;
    case 'ArrowUp':
      const rotated = rotatePiece(currentPiece);
      if (canMove(rotated, rotated.x, rotated.y)) {
        currentPiece = rotated;
      }
      break;
  }
});

// 添加触摸事件支持
const addTouchListener = (element, handler) => {
  element.addEventListener('touchstart', handler, { passive: false });
  element.addEventListener('touchend', (e) => e.preventDefault());
};

addTouchListener(document.getElementById('moveLeft'), () => {
  if (canMove(currentPiece, currentPiece.x - 1, currentPiece.y)) {
    currentPiece.x--;
  }
});

addTouchListener(document.getElementById('moveRight'), () => {
  if (canMove(currentPiece, currentPiece.x + 1, currentPiece.y)) {
    currentPiece.x++;
  }
});

addTouchListener(document.getElementById('moveDown'), () => {
  if (canMove(currentPiece, currentPiece.x, currentPiece.y + 1)) {
    currentPiece.y++;
  }
});

addTouchListener(document.getElementById('rotateBtn'), () => {
  const rotated = rotatePiece(currentPiece);
  if (canMove(rotated, rotated.x, rotated.y)) {
    currentPiece = rotated;
  }
});
