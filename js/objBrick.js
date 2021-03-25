var objBrick = function(posXInner, posYInner) {
	this.type = "brick"							// Тип объекта
	this.width = 8;								// Ширина
	this.height = 8;							// Высота
	this.posX = posXInner;						// Координата X левого верхнего угла
	this.posY = posYInner;						// Координата Y левого верхнего угла
	this.driveOn = false;						// Можно ли ездить по объекту (true - можно, false - нельзя)
	this.bulletPass = false;					// Пролетает ли сквозь объект пуля (true - да, false - нет)
	this.solidity = 1;							// Твердость (каким типом пули пробивается) (1 - любым, 2 - усиленным, 3 - никаким)
	this.img = new Image();						// Изображение
}

objBrick.prototype.destroy = function() {
	var a = new objExplosion();
	a.width = 24;
	a.height = 24;
	a.posX = this.posX - 8;
	a.posY = this.posY - 8;
	a.widthFrame = 30;
	a.imgName = "brickExplosion";
	a.img.src = "img/brickExplosion_sprite.png";
	a.animationFrame = 12;
	a.animationSpeed = 4;
	a.audio.src = "audio/brickExplosion.mp3";
	a.audio.play();
	gameField.effectsArray.push(a);
}

