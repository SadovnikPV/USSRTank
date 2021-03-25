// Общий размер canvas
var canvasWidth = 544 + 150;
var canvasHeight = 544;

// Размер игровой карты (без бокового меню и прочих атрибутов)
var gameMapWidth = 480;
var gameMapHeight = 480;
var gameMapWall = 32;

// Размеры бокового меню
var gameRightMenuX = gameMapWidth + gameMapWall * 2;
var gameRightMenuY = 0;
var gameRightMenuWidth = 150;
var gameRightMenuHeight = canvasHeight;

// Координаты левого верхнего угла игрового поля (со стенами)
var gameMapX = 0;
var gameMapY = 0;

// Координаты левого верхнего угла игрового поля (со стенами)
var gameStatus = 0;

// Отсчет кадров (возможное значение от 0 до 59), рассчитано на частоту монитора 60 fps
var tact = 0;

// Громкость музыки и эффектов
var volumeBg = 0.7;
var volumeEffects = 1;