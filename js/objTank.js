var objTank = function() {
	this.speed = 2;													// Скорость
	this.armor = 1;													// Броня
	this.damage = 1;												// Урон
	this.width = 32;												// Ширина
	this.height = 32;												// Высота
	this.bulletSpeed = 4;											// Скорость пули
	this.img = new Image();											// Изображение
	this.imgName;													// Имя файла без пути, расширения и постфиксов (типа _left, _1 и т.п.)
	this.direction = 'right';										// Направление (вверх, вправо, вниз, влево)
	this.posX = 0;													// Координата по Х
	this.posY = 0;													// Координата по Y
	this.deltaX = 0;												// Фактическая скорость по X на момент отрисовки кадра
	this.deltaY = 0;												// Фактическая скорость по Y на момент отрисовки кадра
	//this.bullet = new objBullet;									// Тип используемых снарядов
	this.targetDistance = 0;										// Только для вражеских танков (куда хочет попасть по X)
	this.driveOn = false;											// Можно ли ездить по объекту (true - можно, false - нельзя)
	this.reloadSpeed = 120;											// Скорость перезарядки
	this.reloadStatus = 0;											// Статус перезарядки (когда 0 - перезаряжено)
	this.isEnemy = true;											// Танк игрока (false) или противника (true)
	this.shotAudio = new Audio();									// Звук выстрела
	this.expiriense = 0;
}

objTank.prototype.destroy = function() {
	var a = new objExplosion();
	a.width = 64;
	a.height = 64;
	a.posX = this.posX - 16;
	a.posY = this.posY - 16;
	a.widthFrame = 30;
	a.imgName = "TankExplosion";
	a.img.src = "img/tankExplosion_sprite.png";
	a.animationFrame = 18;
	a.animationSpeed = 2;
	a.audio.src = "audio/tankExplosion.mp3";
	a.audio.play();
	gameField.effectsArray.push(a);
}

// Поворот танка с изменением картинки
objTank.prototype.directionRotate = function() {
	if (this.deltaX == 0 && this.deltaY < 0) {
		this.img.src = "img/"+this.imgName+"_up.png";
		this.direction = 'up';
	}
	if (this.deltaX > 0 && this.deltaY == 0) {
		this.img.src = "img/"+this.imgName+"_right.png";
		this.direction = 'right';
	}
	if (this.deltaX == 0 && this.deltaY > 0) {
		this.img.src = "img/"+this.imgName+"_down.png";
		this.direction = 'down';
	}
	if (this.deltaX < 0 && this.deltaY == 0) {
		this.img.src = "img/"+this.imgName+"_left.png";
		this.direction = 'left';
	}
}

// Определение начального направления танка (куда он повернут)
objTank.prototype.directionStart = function() {
	if (this.direction == 'up') {
		this.img.src = "img/"+this.imgName+"_up.png";
	}
	if (this.direction == 'right') {
		this.img.src = "img/"+this.imgName+"_right.png";
	}
	if (this.direction == 'down') {
		this.img.src = "img/"+this.imgName+"_down.png";
	}
	if (this.direction == 'left') {
		this.img.src = "img/"+this.imgName+"_left.png";
	}
}

// Выбор направления и дистанции для вражеского танка (и то и другое выбирается рандомно)
objTank.prototype.enemyTankMove = function() {
	//this.speed = 1;
	
	if (this.targetDistance != 0) {
		this.posX += this.deltaX;
		this.posY += this.deltaY;
		this.targetDistance--;
	}
	
	if (this.targetDistance == 0) {
		var directionRand = randomInt(0,3);
		if (directionRand == 0) {
			this.direction = 'up';
			this.deltaX = 0;
			this.deltaY = -this.speed;
		}
		if (directionRand == 1) {
			this.direction = 'right';
			this.deltaX = this.speed;
			this.deltaY = 0;
		}
		if (directionRand == 2) {
			this.direction = 'down';
			this.deltaX = 0;
			this.deltaY = this.speed;
		}
		if (directionRand == 3) {
			this.direction = 'left';
			this.deltaX = -this.speed;
			this.deltaY = 0;
		}
		this.directionRotate();
		this.targetDistance = randomInt(0,125);
	}
}

// Остановка вражеского танка
objTank.prototype.stopEnemyMove = function() {
	this.deltaX = 0;
	this.deltaY = 0;
	this.targetDistance = 0;
	//console.log('lala');
}

// Выстрел вражеского танка
objTank.prototype.enemyTankShot = function() {
	var rand = randomInt(0,9);
	if (rand == 0) {
		newBullet(this);
		//newBullet(playerOneTank);
	}
}


