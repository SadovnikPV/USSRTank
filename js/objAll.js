var arrayAllObj = [
	[0, 'empty'],
	[1, 'brick'],
	[2, 'monolith'],
	[3, 'water'],
	[4, 'jungle'],
	[5, 'ice'],
	[6, 'sand'],
	[7, 'mapWall'],
	[8, 'base']
];

// Объект взрыв
var objExplosion = function(widthInner, heightInner, posXInner, posYInner) {
	this.width = 32;							
	this.height = 32;
	this.posX = posXInner;						
	this.posY = posYInner;
	this.img = new Image();
	this.imgName;									// Имя файла без пути, расширения и постфиксов (типа _left, _1 и т.п.)
	this.animation = true;							// Есть ли у объекта анимация
	this.animationFrame = 10;						// Количество кадров в анимации
	this.animationSpeed = 10;						// Количество тактов отрисовки на каждый кадр анимации
	this.tact = 0;									// Подсчет тактов
	this.audio = new Audio();						// Звук эффектов
	this.spriteX = 0;
	this.widthFrame = 0;
}

objExplosion.prototype.timeLive = function() {  // Скорее всего больше не нужно
	let i = div(this.tact,this.animationSpeed);
	//this.imgName = "bulletExplosion";
	this.img.src = "img/"+this.imgName+"_"+i+".png";
	this.tact++;
	if (this.tact >= this.animationFrame * this.animationSpeed) {
		return 1;
	}
	else {
		return 0;
	}
}


objExplosion.prototype.animationExplosion = function() {  // Скорее всего больше не нужно
	let i = div(this.tact,this.animationSpeed);
	this.img.src = "img/"+this.imgName+"_"+i+".png";
	this.tact++;
	if (this.tact >= this.animationFrame * this.animationSpeed) {
		this.tact = 0;
	}
}

