var selectedObj = ""; // Выбранный на данный момент объект
var newDivArray = new Array(); // Массив всех div на карте
var resultArray = new Array(); // Итоговый массив с описанием уровня
var result = "levelBegin";
var countAddedTank = 0;


// Заполнение карты div'ами
function createNewLevel() {
	var divMap = document.querySelector('#ConstructorLevelMap');
	let posX = 0;
	let posY = 0;
	for (let i = 0; i < 17; i++) {
		var newRow = document.createElement('div');
		newRow.classList.add('ConstructorMapRow');
		divMap.appendChild(newRow);
		
		for (let j = 0; j < 17; j++) {
			newDivArray.push(document.createElement('div'));
			let len = newDivArray.length - 1;
			newDivArray[len].classList.add('ConstructorMapCell');
			newRow.appendChild(newDivArray[len]);	
			newDivArray[len].setAttribute("onclick","addObj("+ len +")");
			newDivArray[len].dataset.type = "";
			newDivArray[len].dataset.posX = j * 32;
			newDivArray[len].dataset.posY = i * 32;
			newDivArray[len].dataset.id = i * 17 + j;
		}
	}
}

// Установка объекта (при нажатии на клетку поля) или разбиение клетки на четыре части (separateCell)
function addObj(idCell) {
	if (selectedObj == "separateCell") {
		$(newDivArray[idCell]).attr('class','ConstructorMapCellWhenParent');
		$(newDivArray[idCell]).removeAttr('onclick');
		for (let j = 0; j < 2; j++) {
			let newRow = document.createElement('div');
			newRow.classList.add('ConstructorMapRow');
			newDivArray[idCell].appendChild(newRow);
			for (let i = 0; i < 2; i++) {
				newDivArray.push(document.createElement('div'));
				let len = newDivArray.length - 1;
				newDivArray[len].classList.add('ConstructorMapCellMini');
				newDivArray[len].setAttribute("onclick","addObj("+ len +")");
				newRow.appendChild(newDivArray[len]);
				newDivArray[len].dataset.type = "";
				newDivArray[len].dataset.posX = +newDivArray[idCell].dataset.posX + i*16;
				newDivArray[len].dataset.posY = +newDivArray[idCell].dataset.posY + j*16;
				newDivArray[len].dataset.parentId = idCell;
			}
		}
	}
	if (selectedObj == "clearCell") {
		newDivArray[idCell].dataset.type = "";
		newDivArray[idCell].style.backgroundImage = "none";
	}
	if (selectedObj == "uniteCell") {
		console.log(newDivArray.length);
		var parentId = newDivArray[idCell].dataset.parentId;
		(newDivArray[parentId]).innerHTML = '';
		$(newDivArray[parentId]).attr('class','ConstructorMapCell');
		newDivArray[parentId].setAttribute("onclick","addObj("+ parentId +")");
		newDivArray.splice(idCell,4);
		console.log(newDivArray.length);
	}
	if (selectedObj != "separateCell" && selectedObj != "clearCell" && selectedObj != "uniteCell") {
			if (selectedObj == "wood_horizontal") {
				let newImgSrc = "img/"+selectedObj+".png";
				newDivArray[idCell+1].style.backgroundImage = "url("+newImgSrc+")";
			}
			if (selectedObj == "wood_vertical") {
				let newImgSrc = "img/"+selectedObj+".png";
				newDivArray[idCell+2].style.backgroundImage = "url("+newImgSrc+")";
			}
		let newImgSrc = "img/"+selectedObj+".png";
		newDivArray[idCell].style.backgroundImage = "url("+newImgSrc+")";
		newDivArray[idCell].dataset.type = selectedObj;
		console.log(idCell);
	}
	console.log(selectedObj);
}

// Выбор объекта (при нажатии на объект в меню)
function selectObj(object) {
		selectedObj = object;
}

// Добавление танка
function addTank(typeTank) {
	var tankTable = document.querySelector('#ConstructorTankAll');
	var newTank = document.createElement('div');
	newTank.classList.add('ConstructorAddedTank');
	newTank.style.backgroundImage = "url(img/"+typeTank+"_up.png)";
	tankTable.appendChild(newTank);
	if (typeTank == "enemyTankBase") {
		newTank.dataset.type = "tank";
		newTank.dataset.imgName = typeTank;
		newTank.dataset.armor = 1;
		newTank.dataset.damage = 1;
		newTank.dataset.speed = 1;
		newTank.dataset.bulletSpeed = 4;
		newTank.dataset.reloadSpeed = 120;
	}
	if (typeTank == "enemyTankSpeed") {
		newTank.dataset.type = "tank";
		newTank.dataset.imgName = typeTank;
		newTank.dataset.armor = 1;
		newTank.dataset.damage = 1;
		newTank.dataset.speed = 2;
		newTank.dataset.bulletSpeed = 4;
		newTank.dataset.reloadSpeed = 100;
	}
	if (typeTank == "enemyTankArmor") {
		newTank.dataset.type = "tank";
		newTank.dataset.imgName = typeTank;
		newTank.dataset.armor = 2;
		newTank.dataset.damage = 1;
		newTank.dataset.speed = 1;
		newTank.dataset.bulletSpeed = 6;
		newTank.dataset.reloadSpeed = 100;
	}
	if (typeTank == "enemyTankHeavy") {
		newTank.dataset.type = "tank";
		newTank.dataset.imgName = typeTank;
		newTank.dataset.armor = 4;
		newTank.dataset.damage = 2;
		newTank.dataset.speed = 1;
		newTank.dataset.bulletSpeed = 6;
		newTank.dataset.reloadSpeed = 90;
	}
	
	countAddedTank++;
	document.getElementById("ConstructorLevelCode").innerHTML = countAddedTank;
	
	/*$("<div/>", {
		"class": "ConstructorAddedTank",
		"width": "100px",
		"background-image": "url('img/enemyTankBase_up.png')",
	}).appendTo("#ConstructorTankAll");*/
}


// Генерация кода сконструированного уровня
function getLevelCode() {
	result = "levelBegin";
	result += "title" + document.getElementById("levelTitle").value + ",";
	result += "levelText" + document.getElementById("levelDescriptionText").value + "#";
	result += document.getElementById("levelBgImg").value + "#";
	document.getElementById('ConstructorLevelCode').innerHTML = "";
	for (let i = 0; i < newDivArray.length; i++) {
		if (newDivArray[i].dataset.type == "brick_full") {   // Если объект - полный кирпич
			for (let j = 0; j < 4; j++) {
				let typeObj = "";
				for (let k = 0; k < 4; k++) {
					if ((j + k) % 2 == 0) {
						typeObj = "brick_1";
					}
					else {
						typeObj = "brick_2";
					}
					document.getElementById('ConstructorLevelCode').insertAdjacentHTML('beforeEnd', typeObj + "," + (+newDivArray[i].dataset.posX + j * 8) + "," + (+newDivArray[i].dataset.posY + k * 8) + "<br>");
					result += typeObj + "," + (+newDivArray[i].dataset.posX + j * 8) + "," + (+newDivArray[i].dataset.posY + k * 8) + ",";
				}
			}
		}
		if (newDivArray[i].dataset.type == "brick_quarter") {   // Если объект - четверть кирпича
			for (let j = 0; j < 2; j++) {
				let typeObj = "";
				for (let k = 0; k < 2; k++) {
					if ((j + k) % 2 == 0) {
						typeObj = "brick_1";
					}
					else {
						typeObj = "brick_2";
					}
					document.getElementById('ConstructorLevelCode').insertAdjacentHTML('beforeEnd', typeObj + "," + (+newDivArray[i].dataset.posX + j * 8) + "," + (+newDivArray[i].dataset.posY + k * 8) + "<br>");
					result += typeObj + "," + (+newDivArray[i].dataset.posX + j * 8) + "," + (+newDivArray[i].dataset.posY + k * 8) + ",";
				}
			}
		}
		if (newDivArray[i].dataset.type == "monolith_full") {
			let typeObj = "monolith";
			for (let j = 0; j < 2; j++) {
				for (let k = 0; k < 2; k++) {
					document.getElementById('ConstructorLevelCode').insertAdjacentHTML('beforeEnd', typeObj + "," + (+newDivArray[i].dataset.posX + j * 16) + "," + (+newDivArray[i].dataset.posY + k * 16) + "<br>");
					result += typeObj + "," + (+newDivArray[i].dataset.posX + j * 16) + "," + (+newDivArray[i].dataset.posY + k * 16) + ",";
				}
			}
		}
		else {
			if (newDivArray[i].dataset.type != "" && newDivArray[i].dataset.type != "brick_full") {
			document.getElementById('ConstructorLevelCode').insertAdjacentHTML('beforeEnd',newDivArray[i].dataset.type + "," + newDivArray[i].dataset.posX + "," + newDivArray[i].dataset.posY + "<br>");
			result += newDivArray[i].dataset.type + "," + newDivArray[i].dataset.posX + "," + newDivArray[i].dataset.posY + ",";
			}
		}
	}
	for (let i = 1; i < document.getElementById('ConstructorTankAll').childNodes.length; i++) {
		result += "tank," + document.getElementById('ConstructorTankAll').childNodes[i].dataset.imgName + ",";
		result += document.getElementById('ConstructorTankAll').childNodes[i].dataset.armor + ",";
		result += document.getElementById('ConstructorTankAll').childNodes[i].dataset.damage + ",";
		result += document.getElementById('ConstructorTankAll').childNodes[i].dataset.speed + ",";
		result += document.getElementById('ConstructorTankAll').childNodes[i].dataset.bulletSpeed + ",";
		result += document.getElementById('ConstructorTankAll').childNodes[i].dataset.reloadSpeed + ",";
	}
	document.getElementById('ConstructorLevelCode').insertAdjacentHTML('beforeEnd',result);
}


