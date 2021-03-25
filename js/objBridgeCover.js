var objBridgeCover = function(posXInner, posYInner) {
	this.type = "bridgeCover"					// Тип объекта
	this.width = 32;							// Ширина
	this.height = 32;							// Высота (ширина и высота могут быть наоборот)
	this.posX = posXInner;						// Координата X левого верхнего угла
	this.posY = posYInner;						// Координата Y левого верхнего угла
	this.driveOn = true;						// Можно ли ездить по объекту (true - можно, false - нельзя)
	this.bulletPass = true;						// Пролетает ли сквозь объект пуля (true - да, false - нет)
	this.solidity = 3;							// Твердость (каким типом пули пробивается) (1 - любым, 2 - усиленным, 3 - никаким)
	this.img = new Image();						// Изображение
}
