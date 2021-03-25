
// Определение игрового экрана canvas
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Выставление размеров canvas
$('#canvas').attr('width',canvasWidth);
$('#canvas').attr('height',canvasHeight);

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", eventButtonDown);
document.addEventListener("keyup", eventButtonUp);

var buttonQueue = [];
var keyDownUpStatus = 0;
// Обработчик нажатия кнопки
function eventButtonDown() {
	// Заполнение очереди нажатых кнопок
	if (event.key == ' ') {
		newBullet(playerOneTank);
	}
	else {
		var len = buttonQueue.length;
		if (len != 0) {
			if (buttonQueue[len-1] != event.key) {
				buttonQueue.push(event.key);
			}
		}
		else {
			buttonQueue.push(event.key);
		}
		if (buttonQueue[0] == 'ArrowUp') { moveUp() };
		if (buttonQueue[0] == 'ArrowRight') { moveRight() };
		if (buttonQueue[0] == 'ArrowDown') { moveDown() };
		if (buttonQueue[0] == 'ArrowLeft') { moveLeft() };
	}
	keyDownUpStatus = 1;
}

// Обработчик отжатия кнопки
function eventButtonUp() {
	// Освобождение очереди нажатых кнопок
	if (event.key != ' ') {
		if (buttonQueue[0] == event.key) {
			var eventKeyUp = buttonQueue.shift();
		}
		else {
			var indexDeleteElem = buttonQueue.indexOf(event.key,1);
			buttonQueue.splice(indexDeleteElem,1);
		}
		if (eventKeyUp == 'ArrowUp') { stopUp() };
		if (eventKeyUp == 'ArrowRight') { stopRight() };
		if (eventKeyUp == 'ArrowDown') { stopDown() };
		if (eventKeyUp == 'ArrowLeft') { stopLeft() };
	}
	keyDownUpStatus = 2;
}
var levelN = 1;
var gameField = new gameMap();
gameField.load();

// Создание танка игрока
var playerOneTank = new objTank();
	playerOneTank.posX = 208;
	playerOneTank.posY = 480;
	playerOneTank.img.src = "img/playerOneTank_up.png";
	playerOneTank.armor = 2;
	playerOneTank.direction = 'up';
	playerOneTank.isEnemy = false;
	playerOneTank.imgName = 'playerOneTank';
	playerOneTank.directionStart();


// Иконки для бокового меню
var playerOneTankIcon = new Image();
playerOneTankIcon.src = "img/"+playerOneTank.imgName+"_up.png";
var enemyTankIcon = new Image();
enemyTankIcon.src = "img/enemyTankBase_up.png";

var USSR_anthem = new Audio();
USSR_anthem.src = "audio/USSR_anthem.mp3";
USSR_anthem.volume = volumeBg;

var USSR_flag = new Image();
USSR_flag.src = "img/USSR_flag.jpg";
var USSR_flag_posY = 544;

var USSR_logo = new Image();
USSR_logo.src = "img/mainMenuWindow_logo.jpg";
USSR_logo_alpha = 0.0;

var logo_tankUSSR = new Image();
logo_tankUSSR.src = "img/logo_USSRTank.png";
var logo_tankGerman = new Image();
logo_tankGerman.src = "img/logo_GermanTank.png";
var logo_tank_pos = 0;

var defeatImage = new Image();
defeatImage.src = "img/defeatImage.png";

var winWindowHammerAndSickel = new Image();
winWindowHammerAndSickel.src = "img/winWindowHammerAndSickel.png";
var winWindowEnemyTankBase = new Image();
winWindowEnemyTankBase.src = "img/EnemyTankBase_up.png";
var winWindowEnemyTankSpeed = new Image();
winWindowEnemyTankSpeed.src = "img/EnemyTankSpeed_up.png";
var winWindowEnemyTankArmor = new Image();
winWindowEnemyTankArmor.src = "img/EnemyTankArmor_up.png";
var winWindowEnemyTankHeavy = new Image();
winWindowEnemyTankHeavy.src = "img/EnemyTankHeavy_up.png";
var winWindowSmilingStalin = new Image();
winWindowSmilingStalin.src = "img/winWindowSmilingStalin.png";
var winWindowPlayerStrap = new Image();

// Иконки кнопок управления (на боковом меню)
var buttonSpaceIcon = new Image();
buttonSpaceIcon.src = "img/buttonSpaceIcon.png";
var buttonArrowIcon = new Image();
buttonArrowIcon.src = "img/buttonArrowIcon.png";
var buttonEnterIcon = new Image();
buttonEnterIcon.src = "img/buttonEnterIcon.png";


// Функции движения
function moveUp() { 
	playerOneTank.deltaY = -playerOneTank.speed;
	playerOneTank.directionRotate();
}

function moveRight() {
	playerOneTank.deltaX = playerOneTank.speed;
	playerOneTank.directionRotate();
}

function moveDown() {      
	playerOneTank.deltaY = playerOneTank.speed;
	playerOneTank.directionRotate();
}

function moveLeft() {
	playerOneTank.deltaX = -playerOneTank.speed;
	playerOneTank.directionRotate();
}

// Функции остановки
function stopUp() {
	playerOneTank.deltaY = 0;
}

function stopRight() {
	playerOneTank.deltaX = 0;
}

function stopDown() {
	playerOneTank.deltaY = 0;
}

function stopLeft() {
	playerOneTank.deltaX = 0;
}

function stopMove() {
	playerOneTank.deltaX = 0;
	playerOneTank.deltaY = 0;
}

// Функция создания на карте новой пули при выстреле игрока или танка противника
function newBullet(tank) {
	//console.log(tank.imgName, tank.reloadStatus);
	//console.log('l: ',gameField.bulletArray.length);
	if (tank.reloadStatus == 0) {
		let len = gameField.bulletArray.length;
		gameField.bulletArray.push(new objBullet(tank.posX,tank.posY,tank.direction));
		if (gameField.bulletArray[len].direction == 'up') {
			gameField.bulletArray[len].deltaY = -tank.bulletSpeed;
			gameField.bulletArray[len].posX += 8;
			gameField.bulletArray[len].posY -= 16;
			gameField.bulletArray[len].img.src = "img/bullet_up.png";
		}
		if (gameField.bulletArray[len].direction == 'right') {
			gameField.bulletArray[len].deltaX = tank.bulletSpeed;
			gameField.bulletArray[len].posX += 32;
			gameField.bulletArray[len].posY += 8;
			gameField.bulletArray[len].img.src = "img/bullet_right.png";
		}
		if (gameField.bulletArray[len].direction == 'down') {
			gameField.bulletArray[len].deltaY = tank.bulletSpeed;
			gameField.bulletArray[len].posX += 8;
			gameField.bulletArray[len].posY += 32;
			gameField.bulletArray[len].img.src = "img/bullet_down.png";
		}
		if (gameField.bulletArray[len].direction == 'left') {
			gameField.bulletArray[len].deltaX = -tank.bulletSpeed;
			gameField.bulletArray[len].posX -= 8;
			gameField.bulletArray[len].posY += 8;
			gameField.bulletArray[len].img.src = "img/bullet_left.png";
		}
		gameField.bulletArray[len].isEnemy = tank.isEnemy;
		tank.shotAudio.src = "audio/tankShot_2.mp3";
		tank.shotAudio.play();
		tank.reloadStatus = tank.reloadSpeed;
	}
}

function bulletMove() {
	var i = 0;
	for (i = 0; i < gameField.bulletArray.length; i++) {
		gameField.bulletArray[i].posX += +gameField.bulletArray[i].deltaX;
		gameField.bulletArray[i].posY += +gameField.bulletArray[i].deltaY;
		//console.log('X:',gameField.bulletArray[i].posX,'Y:',gameField.bulletArray[i].posY);
	}
}

// Обновление статуса перезарядки для танка игрока и всех танков противника
function reloadStatusUpdate() {
	if (playerOneTank.reloadStatus != 0) {
		playerOneTank.reloadStatus--;
	}
	var i = 0;
	for (i = 0; i < gameField.enemyArray.length; i++) {
		if (gameField.enemyArray[i].reloadStatus != 0) {
			gameField.enemyArray[i].reloadStatus--;
		}
	}
}



// Функция отрисовки экрана
function draw() {
	if (gameStatus == 0) {
		gameField.previewWindow();
	}
	if (gameStatus == 1) {
		gameField.mainMenuWindow();
	}
	if (gameStatus == 2) {
		if ((buttonQueue.length != 0) && (playerOneTank.deltaY == 0) && (buttonQueue[0] == 'ArrowUp')) moveUp();
		if ((buttonQueue.length != 0) && (playerOneTank.deltaX == 0) && (buttonQueue[0] == 'ArrowRight')) moveRight();
		if ((buttonQueue.length != 0) && (playerOneTank.deltaY == 0) && (buttonQueue[0] == 'ArrowDown')) moveDown();
		if ((buttonQueue.length != 0) && (playerOneTank.deltaX == 0) && (buttonQueue[0] == 'ArrowLeft')) moveLeft();
	
		if (playerOneTank.armor > 0) {
		gameField.draw();
		}
		if (playerOneTank.armor <= 0 || gameField.base == false) {
		gameStatus = 4;
		}
	}
	if (gameStatus == 3) {
		gameField.levelDescription();
	}
	if (gameStatus == 4) {
		gameField.defeat();
	}
	if (gameStatus == 5) {
		gameField.winWindow();
	}
	if (gameStatus == 6) {
		gameField.pause();
	}
		requestAnimationFrame(draw); // Вызов функции постоянно
}


window.onload(draw()); // Вызов функции из вне