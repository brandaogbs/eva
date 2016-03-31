<?php 
	include('https.php');
	include('commands.php');
	include('functions.php');
	include('modal.php');
?>

<html>
	<head>
		<title>- eva -</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery.dropotron.min.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/skel-layers.min.js"></script>
		<script src="js/init.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
		</noscript>
		<script src="js/annyang.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		
		<!--voice commands-->
		<script src="js/voicerec.js"></script>
	</head>
	<body class="homepage">
		<!-- Header -->
			<header id="header">
				
				<div class="logo container">
					<div>
						<h1><a href="index.php" id="logo">EVA</a></h1>
						<p>project</p>
					</div>
				</div>
			</header>
		<!-- Banner -->
			<div id="banner-wrapper">
				<a href="index.php?c=commands" class="button">commands</a>
				<section id="banner">
					<h2>LIGHTS</h2>
					<a href="index.php?c=lights_on" class="button">ligar</a>
					<a href="index.php?c=lights_off" class="button">desligar</a>
					<br><br>
					<h2>COMPUTER</h2>
					<a href="index.php?c=computer_on" class="button">ligar</a>
					<a href="index.php?c=computer_off" class="button">desligar</a>
					<br><br>
					<h2>COFFEE</h2>
					<a href="index.php?c=coffee_on" class="button">ligar</a>
					<a href="index.php?c=coffee_off" class="button">desligar</a>
					<br><br>
					<h2>DESK</h2>
					<a href="index.php?c=desk_on" class="button">ligar</a>
					<a href="index.php?c=desk_off" class="button">desligar</a>
					<br><br>
					<h2>ALL</h2>
					<a href="index.php?c=all_on" class="button">ligar</a>
					<a href="index.php?c=all_off" class="button">desligar</a>
				</section>
			</div>
		</body>
</html>
