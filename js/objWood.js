var objWood = function(posXInner, posYInner) {
	this.type = "wood"							// Тип объекта
	this.width = 16;							// Ширина
	this.height = 32;							// Высота (ширина и высота могут быть наоборот)
	this.posX = posXInner;						// Координата X левого верхнего угла
	this.posY = posYInner;						// Координата Y левого верхнего угла
	this.driveOn = false;						// Можно ли ездить по объекту (true - можно, false - нельзя)
	this.bulletPass = false;					// Пролетает ли сквозь объект пуля (true - да, false - нет)
	this.solidity = 1;							// Твердость (каким типом пули пробивается) (1 - любым, 2 - усиленным, 3 - никаким)
	this.img = new Image();						// Изображение
}

objWood.prototype.destroy = function() {
	var a = new objExplosion();
	a.width = 32;
	a.height = 32;
	a.posX = this.posX;
	a.posY = this.posY;
	a.widthFrame = 30;
	a.imgName = "brickExplosion";
	a.img.src = "img/woodExplosion_sprite.png";
	a.animationFrame = 7;
	a.animationSpeed = 4;
	a.audio.src = "audio/woodExplosion.mp3";
	a.audio.play();
	gameField.effectsArray.push(a);
}