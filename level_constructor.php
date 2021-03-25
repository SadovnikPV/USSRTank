<!DOCTYPE html>
<head>
	<title> Танчики. Конструктор уровней </title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<meta name="description" content="" />
	<meta http-equiv="Content-Language" content="ru">
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div id = "ConstructorLevelDescription">
		Название уровня:
		<input class = "ConstructorInputText" id = "levelTitle" type="text"> <br>
		Описание уровня: <br>
		<textarea class = "ConstructorInputTextarea" id = "levelDescriptionText" ></textarea> <br>
		Фоновое изображение (greenGrace, asphalt):
		<input class = "ConstructorInputText" id = "levelBgImg" type="text"> 
	</div>
	<div id = "ConstructorMainWindow">
		<div id = "ConstructorControl">
			<div class = "ConstructorControlButton" onclick = "createNewLevel()">
				Создать новый уровень
			</div>
			<div class = "ConstructorControlButton" onclick = "getLevelCode()">
				Получить код уровня
			</div>
		</div>
		<div id = "ConstructorLevelMap">
		</div>
		<div id = "ConstructorMenu">
			<div class = "ConstructorMenuCell" onclick = "selectObj('water')">
				<img class = "ConstructorMenuImg" src = "img/water.png"> Вода
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('monolith_full')">
				<img class = "ConstructorMenuImg" src = "img/monolith_full.png"> Бетон (полный)
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('monolith')">
				<img class = "ConstructorMenuImgQuarter" src = "img/monolith_quarter.png"> Бетон (четверть)
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('base')">
				<img class = "ConstructorMenuImg" src = "img/base.png"> База
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('mapWall')">
				<img class = "ConstructorMenuImg" src = "img/mapWall.png"> Граница уровня
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('brick_full')">
				<img class = "ConstructorMenuImg" src = "img/brick_full.png"> Кирпич (полный)
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('brick_quarter')">
				<img class = "ConstructorMenuImgQuarter" src = "img/brick_quarter.png"> Кирпич (четверть)
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('wood_horizontal')">
				<img class = "ConstructorMenuImgHalfHorizontal" src = "img/wood_horizontal.png"> Дерево (горизонтально)
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('wood_vertical')">
				<img class = "ConstructorMenuImgHalfVertical" src = "img/wood_vertical.png"> Дерево (вертикально)
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('tree')">
				<img class = "ConstructorMenuImg" src = "img/tree.png"> Дерево
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('bridgeCover')">
				<img class = "ConstructorMenuImg" src = "img/bridgeCover.png"> Брусчатка
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('clearCell')">
				<img class = "ConstructorMenuImg" src = "img/clearCell.png"> Очистить ячейку
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('separateCell')">
				<img class = "ConstructorMenuImg" src = "img/separateCell.png"> Разделить ячейку
			</div>
			<div class = "ConstructorMenuCell" onclick = "selectObj('uniteCell')">
				<img class = "ConstructorMenuImg" src = "img/clearCell.png"> Объединить ячейки
			</div>
		</div>
	</div>
	<div id = "ConstructorTankMainWindow">
		<div id = "ConstructorTankMenu">
			<div class = "ConstructorMenuCell" onclick = "addTank('enemyTankBase')">
				<img class = "ConstructorMenuImg" src = "img/enemyTankBase_up.png"> Легкий танк
			</div>
			<div class = "ConstructorMenuCell" onclick = "addTank('enemyTankSpeed')">
				<img class = "ConstructorMenuImg" src = "img/enemyTankSpeed_up.png"> БТР
			</div>
			<div class = "ConstructorMenuCell" onclick = "addTank('enemyTankArmor')">
				<img class = "ConstructorMenuImg" src = "img/enemyTankArmor_up.png"> Бронированный танк
			</div>
			<div class = "ConstructorMenuCell" onclick = "addTank('enemyTankHeavy')">
				<img class = "ConstructorMenuImg" src = "img/enemyTankHeavy_up.png"> Тяжелый танк
			</div>
		</div>
		<div id = "ConstructorTankAll">
		</div>
	</div>
	
	<div id = "ConstructorLevelCode">
	fgfgfg
	</div>

	<script type="text/javascript" src="js/jquery3.5.1.js"></script>
	<script type="text/javascript" src="js/jqueryrotate.2.1.js"></script>
	<script type="text/javascript" src="js/levelConstructor.js"></script>


</body>
</html>

