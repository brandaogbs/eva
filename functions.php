<?php 
	if(function_exists($_GET['f'])) {
		$_GET['f']($_GET["p"]); 
	} 
	
	function checkUrl($url=""){
		$headers = @get_headers( $url );
		if( $headers !== FALSE && strpos( $headers[ 0 ], '200' ) !== FALSE ) {
			echo "true";
		}else{
			echo "false";
		}
	}
	
	function volume($vol=""){
		if($vol == "zero" || $vol =="mute"){
			exec("amixer set Master mute");	
		}else if($vol == "unmute"){
			exec("amixer set Master unmute");
		}else{
			exec("amixer set Master ".$vol."%");
		}
	}
	
	function lights($status=""){
		if($status == "on"){
			exec("echo A > /dev/ttyUSB0");
		}else if($status == "off"){
			exec("echo a > /dev/ttyUSB0");
		}
	}
	
	function computer($status=""){
		if($status == "on"){
			exec("echo B > /dev/ttyUSB0");
		}else if($status == "off"){
			exec("echo b > /dev/ttyUSB0");
		}
	}
	function coffee($status=""){
		if($status == "on"){
			exec("echo C > /dev/ttyUSB0");
		}else if($status == "off"){
			exec("echo c > /dev/ttyUSB0");
		}
	}

	function desk($status=""){
		if($status == "on"){
			exec("echo D > /dev/ttyUSB0");
		}else if($status == "off"){
			exec("echo d > /dev/ttyUSB0");
		}
	}
	
	function all($status=""){
		if($status=="on"){
			exec("echo X > /dev/ttyUSB0");
		}else if($status=="off"){
			exec("echo x > /dev/ttyUSB0");
		}
	}  
?>