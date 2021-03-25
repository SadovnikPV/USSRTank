var objBullet = function(posXInner, posYInner, directionInner) {
	this.speed = 4;													// Скорость	
	this.type = 1;													// Тип снаряда (от этого зависит, какие объекты можно пробить)
	this.width = 16;												// Ширина
	this.height = 16;												// Высота
	this.img = new Image();											// Изображение
	this.direction = directionInner;								// Направление (вверх, вправо, вниз, влево)
	this.posX = posXInner;											// Координата по Х
	this.posY = posYInner;											// Координата по Y
	this.deltaX = 0;												// Фактическая скорость по X на момент отрисовки кадра
	this.deltaY = 0;												// Фактическая скорость по Y на момент отрисовки кадра
	this.isEnemy = true;											// true - если пуля выпущена противником, false - если игроком
	//this.shotAudio = new Audio();									// Звук выстрела
}

objBullet.prototype.destroy = function() {
	var a = new objExplosion();
	a.width = this.width;
	a.height = this.height;
	a.posX = this.posX;
	a.posY = this.posY;
	a.widthFrame = 30;
	a.imgName = "bulletExplosion";
	a.img.src = "img/bulletExplosion_sprite.png";
	a.animationFrame = 13;
	a.animationSpeed = 3;
	a.audio.src = "audio/bulletExplosion.mp3";
	a.audio.play();
	gameField.effectsArray.push(a);
}




