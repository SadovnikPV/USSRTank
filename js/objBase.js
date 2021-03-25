var objBase = function(posXInner, posYInner) {
	this.width = 32;								// Ширина
	this.height = 32;							// Высота
	this.posX = posXInner;						// Координата X левого верхнего угла
	this.posY = posYInner;						// Координата Y левого верхнего угла
	this.driveOn = false;						// Можно ли ездить по объекту (true - можно, false - нельзя)
	this.bulletPass = false;					// Пролетает ли сквозь объект пуля (true - да, false - нет)
	this.solidity = 1;							// Твердость (каким типом пули пробивается) (1 - любым, 2 - усиленным, 3 - никаким)
	this.img = new Image();						// Изображение
}

