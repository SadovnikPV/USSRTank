function randomInt(min, max) {     		 // Генерация случайного целого числа от min до max включительно
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// Целочисленное деление (возвращает целую часть)
function div(val, by){
    return (val - val % by) / by;
}

// Отрисовка эффектов (взрывы и т.п.)
function effectsDraw() {
		for (let i = 0; i < gameField.effectsArray.length; i++) {
				ctx.drawImage(gameField.effectsArray[i].img,gameField.effectsArray[i].spriteX,0,gameField.effectsArray[i].widthFrame,gameField.effectsArray[i].widthFrame,gameField.effectsArray[i].posX,gameField.effectsArray[i].posY,gameField.effectsArray[i].width,gameField.effectsArray[i].height);
				let j = div(gameField.effectsArray[i].tact,gameField.effectsArray[i].animationSpeed);
				gameField.effectsArray[i].spriteX = gameField.effectsArray[i].widthFrame * j;
				gameField.effectsArray[i].tact++;
				if (gameField.effectsArray[i].tact >= gameField.effectsArray[i].animationFrame * gameField.effectsArray[i].animationSpeed) { gameField.effectsArray.splice(i,1); }
		}
}

// Детектор появления новых танков на карте
function enemyTankArrive() {
	// Координаты появления
	let posArrive = [
	[32,32],
	[256,32],
	[480,32]
	];
	if (gameField.enemyLevelArray.length > 0) {
		if (gameField.enemyArray.length + gameField.enemyArriveArray.length < 5) {
			let objArrive = new objExplosion(32,32,posArrive[gameField.posArrive][0],posArrive[gameField.posArrive][1]);
			objArrive.imgName = "enemyTankArrive";
			objArrive.widthFrame = 30;
			objArrive.img.src = "img/enemyTankArrive_sprite.png";
			objArrive.animationFrame = 18;
			objArrive.animationSpeed = 5;
			gameField.enemyArriveArray.push(objArrive);
			gameField.posArrive++;
			if (gameField.posArrive > 2) gameField.posArrive = 0;	
		}
	}
	for (let i = 0; i < gameField.enemyArriveArray.length; i++) {
				if (gameField.enemyArriveArray[i].tact >= gameField.enemyArriveArray[i].animationFrame * gameField.enemyArriveArray[i].animationSpeed - 1) {
					gameField.enemyArray.push(gameField.enemyLevelArray.shift());
					let len = gameField.enemyArray.length;
					gameField.enemyArray[len-1].posX = gameField.enemyArriveArray[i].posX;
					gameField.enemyArray[len-1].posY = gameField.enemyArriveArray[i].posY;
					gameField.enemyArriveArray.splice(i,1);
				}	
			}
	
}

// Отрисовка меню состояния танка и уровня (боковое правое)
function drawRightMenu() {
	// Заливка фона
	ctx.beginPath();
	ctx.rect(gameRightMenuX, 0, gameRightMenuWidth, gameRightMenuHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	
	// Вывод текста "На подходе: ..."
	ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.font = "normal 14pt Arial";
    ctx.fillText("На подходе:", gameRightMenuX + 18, gameRightMenuY + 30);
	ctx.drawImage(enemyTankIcon, gameRightMenuX + 20, gameRightMenuY + 40, 25, 25);
	
	let enemyTankOnTheWay = gameField.enemyLevelArray.length;
	ctx.fillText(enemyTankOnTheWay, gameRightMenuX + 75, gameRightMenuY + 60);
	
	ctx.globalAlpha = 0.6;
	// Вывод информации по управлению
	ctx.strokeStyle = "#FFF";
    ctx.font = "normal 10pt Arial";
	ctx.fillText("Выстрел", gameRightMenuX + 53, gameRightMenuY + 170);
	ctx.drawImage(buttonSpaceIcon, gameRightMenuX + 40, gameRightMenuY + 175, 80, 20);
	
	ctx.strokeStyle = "#FFF";
    ctx.font = "normal 10pt Arial";
	ctx.fillText("Движение", gameRightMenuX + 53, gameRightMenuY + 220);
	ctx.drawImage(buttonArrowIcon, gameRightMenuX + 40, gameRightMenuY + 220, 80, 60);
	
	ctx.strokeStyle = "#FFF";
    ctx.font = "normal 10pt Arial";
	ctx.fillText("Пауза", gameRightMenuX + 53, gameRightMenuY + 300);
	ctx.drawImage(buttonEnterIcon, gameRightMenuX + 55, gameRightMenuY + 310, 35, 30);
	
	ctx.globalAlpha = 1;
	// Вывод информации о танке игрока
	ctx.font = "normal 14pt Arial";
	ctx.drawImage(playerOneTankIcon, gameRightMenuX + 35, gameRightMenuY + 450, 25, 25);
	ctx.fillText("Броня: " + playerOneTank.armor, gameRightMenuX + 35, gameRightMenuY + 500);
}

// Определение звания и погон игрока
function playerRank(exp) {
	let arrRank = [
	[0,"рядовой",0],
	[1,"ефрейтор",4000],
	[2,"младший сержант",8000],
	[3,"сержант",13000],
	[4,"старший сержант",18000],
	[5,"старшина",24000],
	];
	let i = 0;
	while (i < arrRank.length && exp > arrRank[i][2]) {
		i++;
	}
	
	winWindowPlayerStrap.src = "img/straps_" + arrRank[i-1][0] + ".png";
	return arrRank[i-1][1];
}




// Функции главной страницы (не имеют отношение к игре)
function close_tip() {
	document.getElementById('tip').style.display = "none";
}

function close_logo() {
	document.getElementById('header').style.display = "none";
	document.getElementById('header_mini').style.display = "block";
}

function show_logo() {
	document.getElementById('header').style.display = "block";
	document.getElementById('header_mini').style.display = "none";
}


