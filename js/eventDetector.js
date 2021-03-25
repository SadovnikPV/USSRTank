// Детектор столкновение игрока с объектами
function collisionDetected() {
	let i = 0;
	let j = 0;
	for (i = 0; i < gameField.objArray.length; i++) {
			if ((playerOneTank.posX + playerOneTank.deltaX < gameField.objArray[i].posX + gameField.objArray[i].width) && (playerOneTank.posX + playerOneTank.width + playerOneTank.deltaX > gameField.objArray[i].posX) && (playerOneTank.posY + playerOneTank.deltaY < gameField.objArray[i].posY + gameField.objArray[i].height) && (playerOneTank.posY + playerOneTank.height + playerOneTank.deltaY> gameField.objArray[i].posY)) {
				if (gameField.objArray[i].driveOn == false) stopMove();
			}
	}
}

// Детектор столкновение вражеских танков с объектами карты и с танком игрока
function collisionEnemyObjectDetected() {
	let i = 0;
	let j = 0;
	// С объектами карты:
	for (i = 0; i < gameField.enemyArray.length; i++) {
		for (j = 0; j < gameField.objArray.length; j++) {
			if ((gameField.enemyArray[i].posX + gameField.enemyArray[i].deltaX < gameField.objArray[j].posX + gameField.objArray[j].width) && (gameField.enemyArray[i].posX + gameField.enemyArray[i].width + gameField.enemyArray[i].deltaX > gameField.objArray[j].posX) && (gameField.enemyArray[i].posY + gameField.enemyArray[i].deltaY < gameField.objArray[j].posY + gameField.objArray[j].height) && (gameField.enemyArray[i].posY + gameField.enemyArray[i].height + gameField.enemyArray[i].deltaY> gameField.objArray[j].posY)) {
				if (gameField.objArray[j].driveOn == false) gameField.enemyArray[i].stopEnemyMove();
			}
		}
	}
	// С танком игрока:
	for (i = 0; i < gameField.enemyArray.length; i++) {
		if ((gameField.enemyArray[i].posX + gameField.enemyArray[i].deltaX < playerOneTank.posX + playerOneTank.width) && (gameField.enemyArray[i].posX + gameField.enemyArray[i].width + gameField.enemyArray[i].deltaX > playerOneTank.posX) && (gameField.enemyArray[i].posY + gameField.enemyArray[i].deltaY < playerOneTank.posY + playerOneTank.height) && (gameField.enemyArray[i].posY + gameField.enemyArray[i].height + gameField.enemyArray[i].deltaY> playerOneTank.posY)) {
				if (playerOneTank.driveOn == false) gameField.enemyArray[i].stopEnemyMove();
			}
	}
}

// Детектор столкновение игрока с вражескими танками
function collisionEnemyDetected() {
	let i = 0;
	for (i = 0; i < gameField.enemyArray.length; i++) {
			if ((playerOneTank.posX + playerOneTank.deltaX < gameField.enemyArray[i].posX + gameField.enemyArray[i].width) && (playerOneTank.posX + playerOneTank.width + playerOneTank.deltaX > gameField.enemyArray[i].posX) && (playerOneTank.posY + playerOneTank.deltaY < gameField.enemyArray[i].posY + gameField.enemyArray[i].height) && (playerOneTank.posY + playerOneTank.height + playerOneTank.deltaY> gameField.enemyArray[i].posY)) {
				if (gameField.enemyArray[i].driveOn == false) stopMove();
			}
	}
}

// Детектор столкновение пули с объектами и вражескими танками (Работает одновременно на все пули, которые находятся на карте)
function collisionBulletDetected() {
	var i = 0;
	var j = 0;
	var k = 0;
	var flag = 0;
	var n = -1;
	var arr = new Array();
	// Столкновение пули с объектами:
	for (i = 0; i < gameField.bulletArray.length; i++) {
		j = 0;
		while ((j < gameField.objArray.length)) {
				if (gameField.objArray[j].bulletPass == false) {			// Пролетает ли пуля сквозь объект
				if (((+gameField.bulletArray[i].posX) + (+gameField.bulletArray[i].deltaX) < (+gameField.objArray[j].posX) + (+gameField.objArray[j].width)) && ((+gameField.bulletArray[i].posX) + (+gameField.bulletArray[i].width) + (+gameField.bulletArray[i].deltaX) > (+gameField.objArray[j].posX)) && ((+gameField.bulletArray[i].posY) + (+gameField.bulletArray[i].deltaY) < (+gameField.objArray[j].posY) + (+gameField.objArray[j].height)) && ((+gameField.bulletArray[i].posY) + (+gameField.bulletArray[i].height) + (+gameField.bulletArray[i].deltaY) > (+gameField.objArray[j].posY)))  {
						if (gameField.objArray[j].solidity == 1 && (+gameField.bulletArray[i].type) >= (+gameField.objArray[j].solidity)) {
							arr.push(j);										// Если унижтожаемых объектов много, собираем их в массив для удаления
							if (j == 0) gameField.base = false 					// База уничтожена
						}
						n = i;
					}
				}
			j++;
		}
		for (k = arr.length - 1; k >= 0; k--) {
			if (gameField.objArray[arr[k]].type == "brick" || gameField.objArray[arr[k]].type == "wood") {
				gameField.objArray[arr[k]].destroy();
				//console.log(arr.length);
			}
			if (gameField.objArray[arr[k]].type != "water" && gameField.objArray[arr[k]].type != "mapWall") {
				gameField.objArray.splice(arr[k],1);
			}
		}
		arr = [];
		if (n > -1) {
			gameField.bulletArray[n].destroy();
			gameField.bulletArray.splice(n,1);
			n = -1;
		}
	}
	// Столкновение пули с танками противника:
	for (i = 0; i < gameField.bulletArray.length; i++) {
		j = 0;
		flag = 0;
		while ((j < gameField.enemyArray.length) && (flag == 0)) {
				if ((gameField.bulletArray[i].posX + gameField.bulletArray[i].deltaX < gameField.enemyArray[j].posX + gameField.enemyArray[j].width) && (gameField.bulletArray[i].posX + gameField.bulletArray[i].width + gameField.bulletArray[i].deltaX > gameField.enemyArray[j].posX) && (gameField.bulletArray[i].posY + gameField.bulletArray[i].deltaY < gameField.enemyArray[j].posY + gameField.enemyArray[j].height) && (gameField.bulletArray[i].posY+ gameField.bulletArray[i].height + gameField.bulletArray[i].deltaY > gameField.enemyArray[j].posY)) {
						if (gameField.bulletArray[i].isEnemy == false) {
							gameField.enemyArray[j].armor -= gameField.bulletArray[i].type;
							if (gameField.enemyArray[j].armor > 0) {				// Звук удара по танку, если он не взрывается
								gameField.tankHitSound.play();
							}
							if (gameField.enemyArray[j].armor <= 0) {
								gameField.enemyArray[j].destroy();
								gameField.enemyArray.splice(j,1); 					// Уничтожение объекта
							}							
							gameField.bulletArray[i].destroy();						// Уничтожение пули
							gameField.bulletArray.splice(i,1);
							flag = 1;
						}
				}
			j++;
		}
	}
	// Столкновение пули с танком игрока:
	for (i = 0; i < gameField.bulletArray.length; i++) {
				if ((gameField.bulletArray[i].posX + (+gameField.bulletArray[i].deltaX) < playerOneTank.posX + playerOneTank.width) && (gameField.bulletArray[i].posX + gameField.bulletArray[i].width + (+gameField.bulletArray[i].deltaX) > playerOneTank.posX) && (gameField.bulletArray[i].posY + (+gameField.bulletArray[i].deltaY) < playerOneTank.posY + playerOneTank.height) && (gameField.bulletArray[i].posY+ gameField.bulletArray[i].height + (+gameField.bulletArray[i].deltaY) > playerOneTank.posY)) {
						if (gameField.bulletArray[i].isEnemy == true) {
							playerOneTank.armor -= gameField.bulletArray[i].type;
							if (playerOneTank.armor > 0) {							// Звук удара по танку, если он не взрывается
								gameField.tankHitSound.play();
							}
							if (playerOneTank.armor <= 0) {
								//playerOneTank = undefined;						// Уничтожение объекта
								break;
							}							
							gameField.bulletArray[i].destroy();						// Уничтожение пули
							gameField.bulletArray.splice(i,1);
						}
				}
	}

}

// Детектор столкновение пули с другими пулями
function collisionBulletAndBulletDetected() {
	var i = 0;
	var j = 0;
	var flag = 0;
	while (i < gameField.bulletArray.length && flag == 0) {
		for (j = i + 1; j < gameField.bulletArray.length; j++) {
			if ((gameField.bulletArray[i].posX + gameField.bulletArray[i].deltaX < gameField.bulletArray[j].posX + gameField.bulletArray[j].width) && (gameField.bulletArray[i].posX + gameField.bulletArray[i].width + gameField.bulletArray[i].deltaX > gameField.bulletArray[j].posX) && (gameField.bulletArray[i].posY + gameField.bulletArray[i].deltaY < gameField.bulletArray[j].posY + gameField.bulletArray[j].height) && (gameField.bulletArray[i].posY+ gameField.bulletArray[i].height + gameField.bulletArray[i].deltaY > gameField.bulletArray[j].posY)) {
				if (gameField.bulletArray[i].isEnemy != gameField.bulletArray[j].isEnemy) {
					gameField.bulletArray[i].destroy();						// Уничтожение пули
					gameField.bulletArray[j].destroy();						// Уничтожение пули
					gameField.bulletArray.splice(j,1);
					gameField.bulletArray.splice(i,1);
					flag = 1;
					break;
				}
			}
		}
		i++;
	}
}

// Движение вражеских танков за отрисовку кадра
function enemyMove() {
	var i = 0;
	for (i = 0; i < gameField.enemyArray.length; i++) {
		gameField.enemyArray[i].enemyTankMove();
	}
}

// Выстрелы вражеских танков за отрисовку кадра
function enemyShot() {
	for (let i = 0; i < gameField.enemyArray.length; i++) {
		if (gameField.enemyArray[i].reloadStatus == 0) {
			gameField.enemyArray[i].enemyTankShot();
		}
	}
}

// Временная функция, не позволяющая пулям улетать за экран
function bulEpt() {
	let i = 0;
	while(i < gameField.bulletArray.length) {
		if (gameField.bulletArray[i].posX > 550 || gameField.bulletArray[i].posX < 0 || gameField.bulletArray[i].posY > 550 || gameField.bulletArray[i].posY < 0) {
			gameField.bulletArray.splice(i,1);
		}
		else { i++; }

	}
}

