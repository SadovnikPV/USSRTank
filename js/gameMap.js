var gameMap = function() {
	this.width = gameMapWidth;						// Ширина
	this.height = gameMapHeight;					// Высота
	this.rows = 17;									// Количество строк
	this.columns = 17;								// Количество столбцов
	this.objArray = new Array();					// Массив всех объектов на карте
	this.objAboveArray = new Array();				// Массив объектов, которые выводятся над всеми остальными
	this.bulletArray = new Array();					// Массив, содержащий все объекты "bullet", находящиеся на карте
	this.effectsArray = new Array();				// Массив, содержащий все эффекты, находящиеся на карте (взрывы и т.д.)
	this.enemyArray = new Array();					// Массив всех танков противника, находящихся на экране
	this.enemyLevelArray = new Array();				// Массив всех танков противника, которые будут на уровне (уменьшается с прохождением уровня)
	this.enemyArriveArray = new Array();			// Массив эффектов появления танков
	this.posArrive = 0;								// В каком месте появляются вражеские танки (значение от 0 до 2)
	this.bgImg = new Image();						// Фоновое изображение
	this.bgAudio = new Audio();						// Фоновый звук на уровне
	this.tact = 0;
	this.levelDescriptionImg = new Image();			// Изображение описания уровня
	this.levelTitle = "";							// Название уровня
	this.levelDescriptionText = "";					// Описание уровня
	this.levelDescriptionTextShow = new Array();	// Описание уровня построчно для вывода на экран (вычисляется из переменной levelDescriptionText)
	this.base = true;								// Состояние базы (true - цела, false - уничтожена)
	this.levelId = 1;								// Номер текущего уровня
	this.countEnemyTank = new Array(4);				// Количество танков каждого типа
	this.tankHitSound = new Audio();
}

gameMap.prototype.load = function() {
	nextLevel(levelN);
	
	// Считывание заголовка и описания уровня
	let levelTitleIndex = levelStr.indexOf("title") + 5;
	while (levelStr[levelTitleIndex] != ",") {
		this.levelTitle += levelStr[levelTitleIndex];
		levelTitleIndex++;
	}
	
	// Считывание описания уровня
	levelTitleIndex += 10; // Пропускаем метку в описании "levelText"
	while (levelStr[levelTitleIndex] != "#") {
		this.levelDescriptionText += levelStr[levelTitleIndex];
		levelTitleIndex++;
	}
	
	
	// Считывание информации о фоновом изображении
	levelTitleIndex++;
	this.bgImg.src = "img/backgroundImg_";
	while (levelStr[levelTitleIndex] != "#") {
		this.bgImg.src += levelStr[levelTitleIndex];
		levelTitleIndex++;
	}
	this.bgImg.src += ".png";
	
	// Загрузка массива объектов
	var i = 0;
	let strObj = "";
	let strPosX = "";
	let strPosY = "";
	let flag = 0;
	this.objArray.push(new objBase(0,0));
	let firstTank = levelStr.indexOf("tank");
	//var startStr = levelStr.indexOf("levelBegin");
	var startStr = levelTitleIndex + 1;
		for (i = startStr; i < firstTank; i++) {
			if (levelStr[i] != "," && flag == 0) {
				strObj += levelStr[i];
			}
			if (levelStr[i] != "," && flag == 1) {
				strPosX += levelStr[i];
			}
			if (levelStr[i] != "," && flag == 2) {
				strPosY += levelStr[i];
			}
			if (levelStr[i] == ",") {
				flag++;
			}
			if (flag == 3) {
				if (strObj == "mapWall") {
					this.objArray.push(new objWall(+strPosX,+strPosY));
					len = this.objArray.length;
					this.objArray[len-1].img.src = 'img/mapWall.png';
				}
				if (strObj == "water") {
					this.objArray.push(new objWater(+strPosX,+strPosY));
					len = this.objArray.length;
					this.objArray[len-1].img.src = 'img/water_0.png';
					this.objArray[len-1].imgName = 'water';
				}
				if (strObj == "monolith") {
					this.objArray.push(new objMonolith(+strPosX,+strPosY));
					len = this.objArray.length;
					this.objArray[len-1].img.src = 'img/monolith.png';
				}
				if (strObj == "brick_1") {
					this.objArray.push(new objBrick(+strPosX,+strPosY));
					len = this.objArray.length;
					this.objArray[len-1].img.src = 'img/brick_1.png';
				}
				if (strObj == "brick_2") {
					this.objArray.push(new objBrick(+strPosX,+strPosY));
					len = this.objArray.length;
					this.objArray[len-1].img.src = 'img/brick_2.png';
				}
				if (strObj == "tree") {
					this.objAboveArray.push(new objBridgeCover(+strPosX,+strPosY));
					len = this.objAboveArray.length;
					this.objAboveArray[len-1].img.src = 'img/tree.png';
				}
				if (strObj == "bridgeCover") {
					this.objArray.push(new objBridgeCover(+strPosX,+strPosY));
					len = this.objArray.length;
					this.objArray[len-1].img.src = 'img/bridgeCover.png';
				}
				if (strObj == "wood_horizontal") {
					let newObj = new objWood(+strPosX,+strPosY);
					newObj.width = 32;
					newObj.height = 16;
					newObj.img.src = 'img/wood_horizontal.png';
					this.objArray.push(newObj);
					//len = this.objArray.length;
					//this.objArray[len-1].img.src = 'img/wood_horizontal.png';
				}
				if (strObj == "wood_vertical") {
					let newObj = new objWood(+strPosX,+strPosY);
					newObj.width = 16;
					newObj.height = 32;
					newObj.img.src = 'img/wood_vertical.png';
					this.objArray.push(newObj);
				}
				if (strObj == "base") {
					this.objArray[0].posX = +strPosX;
					this.objArray[0].posY = +strPosY;
					this.objArray[0].img.src = 'img/base.png';
				}
				flag = 0;
				strObj = "";
				strPosX = "";
				strPosY = "";
			}
		}
		
	// Обнуление массива подсчета танков каждого вида
	for (let j = 0; j < 4; j++) {
		this.countEnemyTank[j] = 0;
	}
	
	// Заполнение массива танков
	flag = 0;
	let strTankType = "";
	let strTankImgName = "";
	let strTankArmor = "";
	let strTankDamage = "";
	let strTankSpeed = "";
	let strTankBulletSpeed = "";
	let strTankReloadSpeed = "";
	for (i = firstTank; i < levelStr.length; i++) {
		if (levelStr[i] != "," && flag == 0) {
				strTankType += levelStr[i];
		}
		if (levelStr[i] != "," && flag == 1) {
				strTankImgName += levelStr[i];
		}
		if (levelStr[i] != "," && flag == 2) {
				strTankArmor += levelStr[i];
		}
		if (levelStr[i] != "," && flag == 3) {
				strTankDamage += levelStr[i];
		}
		if (levelStr[i] != "," && flag == 4) {
				strTankSpeed += levelStr[i];
		}
		if (levelStr[i] != "," && flag == 5) {
				strTankBulletSpeed += levelStr[i];
		}
		if (levelStr[i] != "," && flag == 6) {
				strTankReloadSpeed += levelStr[i];
		}
		if (levelStr[i] == ",") {
				flag++;
		}
		if (flag == 7) {
			let addTank = new objTank();
			addTank.imgName = strTankImgName;
			addTank.armor = strTankArmor;
			addTank.damage = strTankDamage;
			addTank.speed = +strTankSpeed;
			addTank.bulletSpeed = strTankBulletSpeed;
			addTank.reloadSpeed = strTankReloadSpeed;
			addTank.img.src = "img/"+strTankImgName+"_down.png";
			this.enemyLevelArray.push(addTank);
			if (addTank.imgName == "enemyTankBase") { this.countEnemyTank[0]++ };
			if (addTank.imgName == "enemyTankSpeed") { this.countEnemyTank[1]++ };
			if (addTank.imgName == "enemyTankArmor") { this.countEnemyTank[2]++ };
			if (addTank.imgName == "enemyTankHeavy") { this.countEnemyTank[3]++ };
			
			flag = 0;
			strTankType = "";
			strTankImgName = "";
			strTankArmor = "";
			strTankDamage = "";
			strTankSpeed = "";
			strTankBulletSpeed = "";
			strTankReloadSpeed = "";
		}

	}
		
	// Фоновая музыка
	this.bgAudio.src = "audio/background_forest.mp3";
	this.bgAudio.volume = volumeBg;
	
	// Звук удара по танку (если он не взрывается)
	this.tankHitSound.src = "audio/tankHitSound.mp3";
	
	// Фоновое изображение
	//this.bgImg.src = "img/backgroundImg_asphalt.png";
	
	// Изображение с описанием уровня
	this.levelDescriptionImg.src = "img/level_1_description.png";
	
	// Состояние базы
	this.base = true;
	
}




gameMap.prototype.draw = function() {   // Отрисовка карты на экране
	this.bgAudio.play();
	var i = 0;
	var j = 0;
	//ctx.clearRect(gameMapX,gameMapX,gameMapWidth+gameMapWall*2,gameMapHeight+gameMapWall*2);

	ctx.drawImage(this.bgImg,0,0,544,544);
	
	// Отрисовка всех объектов карты
	for (i = 0; i < this.objArray.length; i++) {
		ctx.drawImage(this.objArray[i].img,this.objArray[i].posX,this.objArray[i].posY,this.objArray[i].width,this.objArray[i].height);
		/*if (this.objArray[i].animation == true) {
			this.objArray[i].animationDraw();
		}*/
	}
	
	enemyTankArrive();

	// Отрисовка всех танков противника
	for (i = 0; i < this.enemyArray.length; i++) {
		ctx.drawImage(this.enemyArray[i].img,this.enemyArray[i].posX,this.enemyArray[i].posY,this.enemyArray[i].width,this.enemyArray[i].height);
	}
	
	// Отрисовка эффектов появления
	for (i = 0; i < this.enemyArriveArray.length; i++) {
		ctx.drawImage(this.enemyArriveArray[i].img,this.enemyArriveArray[i].spriteX,0,this.enemyArriveArray[i].widthFrame,this.enemyArriveArray[i].widthFrame,this.enemyArriveArray[i].posX,this.enemyArriveArray[i].posY,this.enemyArriveArray[i].width,this.enemyArriveArray[i].height);
		let j = div(gameField.enemyArriveArray[i].tact,gameField.enemyArriveArray[i].animationSpeed);
		gameField.enemyArriveArray[i].spriteX = gameField.enemyArriveArray[i].widthFrame * j;
		gameField.enemyArriveArray[i].tact++;
	}
	
	bulEpt();
	// Функции вычисления перемещений и столкновений
	reloadStatusUpdate();
	collisionEnemyObjectDetected();
	enemyMove();
	enemyShot();
	collisionDetected();
	collisionEnemyDetected();
	collisionBulletDetected();
	collisionBulletAndBulletDetected();
	effectsDraw();
	bulletMove();
	
	// Отрисовка всех снарядов, находящихся на экране
	for (i = 0; i < this.bulletArray.length; i++) {
		ctx.drawImage(this.bulletArray[i].img,this.bulletArray[i].posX,this.bulletArray[i].posY,this.bulletArray[i].width,this.bulletArray[i].height);
	}
	
	// Отрисовка бокового меню
	drawRightMenu();
	
	// Отрисовка танка игрока
	playerOneTank.posX += playerOneTank.deltaX;
	playerOneTank.posY += playerOneTank.deltaY;
	ctx.drawImage(playerOneTank.img,playerOneTank.posX,playerOneTank.posY,playerOneTank.width,playerOneTank.height);
	
	// Отрисовка всех объектов верхнего слоя (находящимися выше всех остальных)
	for (i = 0; i < this.objAboveArray.length; i++) {
		ctx.drawImage(this.objAboveArray[i].img,this.objAboveArray[i].posX,this.objAboveArray[i].posY,this.objAboveArray[i].width,this.objAboveArray[i].height);
	}
	
	// Проверка нажатия паузы
	if (buttonQueue[0] == "Enter" && this.tact >= 30) {
		gameStatus = 6;
		this.tact = 0;
	}
	if (this.tact < 50) {
		this.tact++;
	}
	
	// Проверка условий победы игрока
	if (this.enemyArray.length == 0 && this.enemyLevelArray.length == 0) {
		this.tact++;
		if (this.tact >= 200) {
			this.bgAudio.pause();
			this.bgAudio.src = "audio/darkNight_bgAudio.mp3";
			gameStatus = 5;
			this.tact = 0;
			keyDownUpStatus = 0;
		}
	}
	
}

gameMap.prototype.previewWindow = function() {
	ctx.clearRect(gameMapX,gameMapX,gameMapWidth+gameMapWall*2,gameMapHeight+gameMapWall*2);
	
	// Заполнение фона
	ctx.beginPath();
	ctx.rect(gameMapX, gameMapY, canvasWidth, canvasHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	
	ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.font = "normal 20pt Arial";
    ctx.fillText("Намите любую кнопку, чтобы запустить игру", 72, 265);

	if (keyDownUpStatus == 2) {
		gameStatus = 1;
		keyDownUpStatus = 0;
	}
}

gameMap.prototype.mainMenuWindow = function() {
	USSR_anthem.play();
	ctx.clearRect(gameMapX,gameMapX,canvasWidth,canvasHeight);
	ctx.globalAlpha = 1.0;
	
	// Заполнение фона
	ctx.beginPath();
	ctx.rect(gameMapX, gameMapY, canvasWidth, canvasHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	
	// Анимация флага
	ctx.drawImage(USSR_flag,0,USSR_flag_posY,canvasWidth,300);
	if (USSR_flag_posY > 0) {
		USSR_flag_posY = USSR_flag_posY - 2;
	}
	
	// Появление фотографии
	if (USSR_flag_posY == 0 && USSR_logo_alpha < 1) {
		USSR_logo_alpha = USSR_logo_alpha + 0.01;
	}
	ctx.globalAlpha = USSR_logo_alpha;
	ctx.drawImage(USSR_logo,0,200,canvasWidth,400);
	
	// Появление танков
	if (USSR_logo_alpha > 0.9 && logo_tank_pos < 350) {
		logo_tank_pos += 4 ;
	}
		ctx.drawImage(logo_tankUSSR,-422 + logo_tank_pos,300,422,250);
		ctx.drawImage(logo_tankGerman,700 - logo_tank_pos,300,392,250);
	
	ctx.fillStyle = "#e2e30b";
	ctx.font = "bold 45pt Arial";
	ctx.fillText("USSR Tank", 320, 110);
	
	if (logo_tank_pos >= 350) {
		ctx.fillStyle = "#000";
		ctx.font = "bold 23pt Arial";
		ctx.fillText("Нажмите Enter, чтобы начать игру", 75, 250);
	}
	//console.log(logo_tank_pos);
	
	/*document.addEventListener("keydown", keyDownDetected, false);
	document.addEventListener("keyup", keyUpDetected, false);
	function keyDownDetected() {
		keyDownUpStatus = 1;
	}
	function keyUpDetected() {
			//console.log(gameStatus);
		if (keyDownUpStatus == 1 && gameStatus == 1) {
			//console.log(keyDownUpStatus === 1 && gameStatus === 1);
			keyDownUpStatus = 2;
			mainMenuQuickShow();
			//console.log(gameStatus);
		}
		else {
			keyDownUpStatus = 0;
		}
	}
	//console.log(keyDownUpStatus);
	function mainMenuQuickShow() {
		if (keyDownUpStatus == 2 && logo_tank_pos < 350 && gameStatus == 1) {
			USSR_flag_posY = 0;
			USSR_logo_alpha = 1.0;
			logo_tank_pos = 350;
			return;
		}
		if (keyDownUpStatus == 2 && logo_tank_pos >= 350 && gameStatus == 1) {
			gameStatus = 3;
			USSR_anthem.pause();
			document.removeEventListener("keydown", keyDownDetected, false);
			document.removeEventListener("keyup", keyUpDetected, false);
			this.tact = 0;
		}
	}*/
	if (keyDownUpStatus == 2 && logo_tank_pos < 350) {
		USSR_flag_posY = 0;
		USSR_logo_alpha = 1.0;
		logo_tank_pos = 350;
		keyDownUpStatus = 0;
		return;
	}
	if (keyDownUpStatus == 2 && logo_tank_pos >= 350) {
		gameStatus = 3;
		USSR_anthem.pause();
		this.tact = 0;
		keyDownUpStatus = 0;
	}
}

gameMap.prototype.levelDescription = function() {
	ctx.clearRect(gameMapX,gameMapX,canvasWidth,canvasHeight);
	
	if (this.tact == 0) {
		ctx.globalAlpha = 0.2;
	}
	
	if (ctx.globalAlpha < 1) {
		ctx.globalAlpha += 0.01;
	}
	
	// Разбиение описание уровня на несколько строк (строки находятся в массиве this.levelDescriptionTextShow)
	if (this.tact == 0) {
		let str = "";
		let strWord = "";
		for (let i = 0; i < this.levelDescriptionText.length; i++) {
			if (this.levelDescriptionText[i] != " ") {
				strWord += this.levelDescriptionText[i];
			}
			if (this.levelDescriptionText[i] == " ") {
				if (str.length + strWord.length < 55) {
					str += strWord + " ";
					strWord = "";
				}
				if (str.length + strWord.length >= 55) {
					this.levelDescriptionTextShow.push(str);
					str = "";
					str += strWord + " ";
					strWord = "";
				}
			}
		}
		str += strWord;
		this.levelDescriptionTextShow.push(str);
	}
	
	// Фон описания уровня (фотография)
	ctx.drawImage(this.levelDescriptionImg, 0, 0, canvasWidth, canvasHeight);
	
	// Заголовок уровня
	ctx.fillStyle = "#d4010a";
	ctx.font = "bold 28pt Arial";
	ctx.fillText(levelN + ". " + this.levelTitle, 300, 50);
	
	// Описание уровня (сначала темная подложка, затем сам текст)
	ctx.globalAlpha = 0.7;
	ctx.beginPath();
	ctx.rect(20, 65, 660, this.levelDescriptionTextShow.length * 33);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.globalAlpha = 1;
	
	ctx.fillStyle = "#e2e30b";
	ctx.font = "bold 16pt Arial";
	/*ctx.fillText("23 июня 1941 года. Деревня Коптевка на границе Польши", 30, 90);
	ctx.fillText("и СССР.", 30, 120);
	ctx.fillText("Первые дни войны. Вам поручено защищать погранзаставу", 30, 150);
	ctx.fillText("до прихода подкрепления.", 30, 180); */
	let descriptionTextPosX = 30;
	let descriptionTextPosY = 90;
	for (let i = 0; i < this.levelDescriptionTextShow.length; i++) {
		ctx.fillText(this.levelDescriptionTextShow[i], descriptionTextPosX, descriptionTextPosY + 30 * i);
	}
	
	
	ctx.fillStyle = "#d4010a";
	ctx.font = "bold 20pt Arial";
	ctx.fillText("Нажмите любую клавишу, чтобы продолжить", 50, 500);

	this.tact = 1;
	
	if (keyDownUpStatus == 2) {
		ctx.globalAlpha = 1;
		gameStatus = 2;
		this.tact = 0;
		keyDownUpStatus = 0;
	}
}

gameMap.prototype.defeat = function() {
	ctx.clearRect(gameMapX,gameMapX,canvasWidth,canvasHeight);
	// Заполнение фона
	ctx.drawImage(defeatImage, 0, 0, canvasWidth, canvasHeight);
	
	ctx.fillStyle = "#d4010a";
	ctx.font = "bold 36pt Arial";
	ctx.fillText("Поражение", 200, 200);
	
	ctx.fillStyle = "#d4010a";
	ctx.font = "bold 22pt Arial";
	ctx.fillText("Нажмите Enter, чтобы начать уровень заново", 20, 500);
	
	if (this.tact < 300) { this.tact++; keyDownUpStatus = 0; }
	
	if (keyDownUpStatus == 2) {
		gameField = undefined;
		gameField = new gameMap();
		gameField.load();
		ctx.globalAlpha = 1;
		gameStatus = 2;
		playerOneTank.armor = 2;
		playerOneTank.posX = 208;
		playerOneTank.posY = 480;
		keyDownUpStatus = 0;
		this.tact = 0;
	}
	
}

gameMap.prototype.winWindow = function() {
	this.bgAudio.play();
	ctx.clearRect(gameMapX,gameMapX,canvasWidth,canvasHeight);
	// Заполнение фона
	ctx.beginPath();
	ctx.rect(0, 0, canvasWidth, canvasHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	
	ctx.drawImage(winWindowHammerAndSickel, 200, 20, 34, 30);
	ctx.drawImage(winWindowHammerAndSickel, 450, 20, 34, 30);
	
	ctx.fillStyle = "#d4010a";
	ctx.font = "bold 30pt Arial";
	ctx.fillText("Победа!", 260, 50);
	
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 18pt Arial";
	ctx.fillText("Вражеских танков уничтожено:", 160, 90);
	
	let iconPosX = 60;
	ctx.drawImage(winWindowEnemyTankBase, iconPosX, 130, 40, 40);
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 24pt Arial";
	ctx.fillText(this.countEnemyTank[0], iconPosX + 60, 162);
	
	ctx.drawImage(winWindowEnemyTankSpeed, iconPosX + 160, 130, 40, 40);
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 24pt Arial";
	ctx.fillText(this.countEnemyTank[1], iconPosX + 220, 162);
	
	ctx.drawImage(winWindowEnemyTankArmor, iconPosX + 320, 130, 40, 40);
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 24pt Arial";
	ctx.fillText(this.countEnemyTank[2], iconPosX + 380, 162);
	
	ctx.drawImage(winWindowEnemyTankHeavy, iconPosX + 480, 130, 40, 40);
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 24pt Arial";
	ctx.fillText(this.countEnemyTank[3], iconPosX + 540, 162);
	
	let expLevel = this.countEnemyTank[0] * 100 + this.countEnemyTank[1] * 200 + this.countEnemyTank[2] * 300 + this.countEnemyTank[3] * 400;
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 18pt Arial";
	ctx.fillText("Получено опыта: " + expLevel, 20, 240);
	
	if (this.tact == 0) {playerOneTank.expiriense += expLevel; }
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 18pt Arial";
	ctx.fillText("Всего опыта: " + playerOneTank.expiriense, 20, 350);
	
	// Получение звания
	ctx.fillStyle = "#FFF";
	ctx.font = "bold 18pt Arial";
	ctx.fillText("Ваше звание: " + playerRank(playerOneTank.expiriense), 20, 380);
	ctx.drawImage(winWindowPlayerStrap, 80, 390, 130, 50);
	
	if (this.tact >= 300) {
		ctx.drawImage(winWindowSmilingStalin, 500, 360, 200, 192);
	
		ctx.fillStyle = "#d4010a";
		ctx.font = "bold 22pt Arial";
		ctx.fillText("Нажмите любую клавишу, чтобы продолжить", 20, 500);
	}

	if (this.tact < 300) { this.tact++; keyDownUpStatus = 0; }
	
	if (keyDownUpStatus == 2 && this.tact >= 300) {
		this.bgAudio.pause();
		ctx.globalAlpha = 1;
		gameStatus = 3;
		this.tact = 0;
		levelN++;
		gameField = undefined;
		gameField = new gameMap();
		gameField.load();
		playerOneTank.posX = 208;
		playerOneTank.posY = 480;
		playerOneTank.armor = 2;
		playerOneTank.direction = "up";
		keyDownUpStatus = 0;
	}
	
}

gameMap.prototype.pause = function() {
	ctx.fillStyle = "#d4010a";
	ctx.font = "bold 18pt Arial";
	ctx.fillText("Нажмите Enter, чтобы продолжить", 70, 250);
	if (this.tact >= 30) {
		if (buttonQueue[0] == "Enter")
		{
			gameStatus = 2;
			this.tact = 0;
		}
	}
	if (this.tact < 100) {
		this.tact++;
	}
}


