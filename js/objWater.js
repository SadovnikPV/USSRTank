var objWater = function(posXInner, posYInner) {
	this.type = "water";
	this.width = 32;							// Ширина
	this.height = 32;							// Высота
	this.posX = posXInner;						// Координата X левого верхнего угла
	this.posY = posYInner;						// Координата Y левого верхнего угла
	this.driveOn = false;						// Можно ли ездить по объекту (true - можно, false - нельзя)
	this.bulletPass = true;						// Пролетает ли сквозь объект пуля (true - да, false - нет)
	this.img = new Image();						// Изображение
	this.imgName;								// Имя файла без пути, расширения и постфиксов (типа _left, _1 и т.п.)
	this.animation = true;						// Есть ли у объекта анимация
	this.animationFrame = 10;						// Количество кадров в анимации
	this.animationSpeed = 10;						// Количество тактов отрисовки на каждый кадр анимации
	this.tact = 0;									// Подсчет тактов
}

objWater.prototype.animationDraw = function() {
	let i = div(this.tact,this.animationSpeed);
	this.img.src = "img/"+this.imgName+"_"+i+".png";
	this.tact++;
	if (this.tact >= this.animationFrame * this.animationSpeed) {
		this.tact = 0;
	}
}	

