<!--functions-->
<script src="js/functions.js"></script>
<?php
	$command = $_GET['c'];
	if($command=="her"){
		$soundfile = "hello.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	/*lights control*/
	if($command=="lights_on"){
		exec("echo A > /dev/ttyUSB0");
		$soundfile = "lights_on.mp3";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	else if($command=="lights_off"){
		exec("echo a > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	/*computer control*/
	else if($command=="computer_on"){
		exec("echo B > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	else if($command=="computer_off"){
		exec("echo b > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	/*coffee pot control*/
	else if($command=="coffee_on"){
		exec("echo C > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	else if($command=="coffee_off"){
		exec("echo c > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	
	/*desk control*/
	else if($command=="desk_on"){
		exec("echo D > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	else if($command=="desk_off"){
		exec("echo d > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	
	/*all control*/
	else if($command=="all_on"){
		exec("echo X > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}
	else if($command=="all_off"){
		exec("echo x > /dev/ttyUSB0");
		$soundfile = "okay_guilherme.wav";
		echo "<embed src =\"$soundfile\" hidden=\"true\" autostart=\"true\"></embed>";
	}

	else if($command=="open_facebook"){
		$link = "https://www.facebook.com"; 
		echo "<script>window.open(\"" . $link . "\")</script>";
	}	
	else if($command=="open_radio1"){
		#$link = "http://player.radiorock.com.br/v3/"; 
		#$link = "http://maringa.mundolivrefm.com.br/player";
		#echo "<script>window.open(\"" . $link . "\",\"mundolivrefm\")</script>";
		echo "<script>openMundoLivreFm();</script>";
	}else if($command=="close_radio1"){
		echo "<closeMundoLivreFm>script();</script>";
	}
	else if($command=="open_radio2"){
		$link = "http://player.radiorock.com.br/v3/"; 
		echo "<script>window.open(\"" . $link . "\")</script>";
	}
	else if($command=="commands"){
		echo "<script>window.location = '#openModal';</script>";
	}
?>