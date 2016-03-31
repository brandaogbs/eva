
function urlCheck(urlT, callback){
	$.ajax({ 
        type: 'POST', 
        url: "functions.php?f=checkUrl&p="+urlT, 
        data: {}, 
        success: callback
      }
    );
    
};

//Volume Control
function volume(vol){
	$.ajax({ 
        type: 'POST', 
        url: "functions.php?f=volume&p="+vol, 
    });
};

//Lights Control
function lights(status){
    $.ajax({ 
        type: 'POST', 
        url: "functions.php?f=lights&p="+status, 
    });
};

//Computer Control
function computer(status){
    $.ajax({ 
        type: 'POST', 
        url: "functions.php?f=computer&p="+status, 
    });
};

//Coffee Control
function coffee(status){
    $.ajax({ 
        type: 'POST', 
        url: "functions.php?f=coffee&p="+status, 
    });
};

//Desk Control
function desk(status){
    $.ajax({ 
        type: 'POST', 
        url: "functions.php?f=desk&p="+status, 
    });
};

//All Control
function all(status){
    $.ajax({ 
        type: 'POST', 
        url: "functions.php?f=all&p="+status, 
    });
};

// Mundo livre Maringa
function openMundoLivreFm(){
	mundoLivreWindow = window.open("http://maringa.mundolivrefm.com.br/player", "mundoLivreWindow");
};

function closeMundoLivreFm(){
	mundoLivreWindow.close();
};

//radio rock !
function openRadioRockFm(){
	radioRockWindow = window.open("http://player.radiorock.com.br/v3/", "radioRockWindow");
};
function closeRadioRockFm(){
	radioRockWindow.close();
};

function openCommands(){
    window.location = '#openModal';    
}

// navigate to site
function navigateTo(url){
	window.open(url);
};