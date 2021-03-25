<!DOCTYPE html>
<head>
	<title> Танчики </title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<meta name="description" content="" />
	<meta http-equiv="Content-Language" content="ru">
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	
<div id = "page_wrap">
	<div id = "header">
		<p> <a href = "javascript:void(0)" onclick = "close_logo()"> Скрыть логотип </a> </p>
	</div>
	<div id = "header_mini">
		<p> <a href = "javascript:void(0)" onclick = "show_logo()"> Показать логотип </a> </p>
	</div>

	
	<div id = "main_content">

		<div id = "tip">
			Подсказка: для удобства игры, вы можете закрыть логотип сайта, нажав на кнопку "Скрыть логотип" в его правом нижнем углу, а также уменьшить или увеличить масштаб экрана, зажав на клавиатуре клавишу ctrl и прокрутив колесико мышки.
			<a href = "javascript:void(0)" onclick = "close_tip()"> Закрыть подсказку </a>
		</div>

		<canvas id="canvas"></canvas>
		<script type="text/javascript" src="js/jquery3.5.1.js"></script>
		<script type="text/javascript" src="js/jqueryrotate.2.1.js"></script>
		<script type="text/javascript" src="js/globalSettings.js"></script>
		<script type="text/javascript" src="js/otherFunction.js"></script>
		<script type="text/javascript" src="js/eventDetector.js"></script>
		<script type="text/javascript" src="js/levels.js"></script>
		<script type="text/javascript" src="js/objAll.js"></script>
		<script type="text/javascript" src="js/objBase.js"></script>
		<script type="text/javascript" src="js/objWall.js"></script>
		<script type="text/javascript" src="js/objMonolith.js"></script>
		<script type="text/javascript" src="js/objWater.js"></script>
		<script type="text/javascript" src="js/objBrick.js"></script>
		<script type="text/javascript" src="js/objWood.js"></script>
		<script type="text/javascript" src="js/objBridgeCover.js"></script>
		<script type="text/javascript" src="js/objBullet.js"></script>
		<script type="text/javascript" src="js/objTank.js"></script>
		<script type="text/javascript" src="js/gameMap.js"></script>
		<script type="text/javascript" src="js/game.js"></script>
	</div>
	
	<div id = "footer">
		USSR Tank 2021
	</div>
</div>
</body>
</html>

