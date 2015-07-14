var msg = new SpeechSynthesisUtterance();
msg.lang = 'en-US'; // Sugestion: change language with voice command..
//msg.lang = 'pt-Br';
if (annyang) {
    
    //defines if eva will execute commands
    var active = false;
    
    var commands = function(){
      if(active){
        msg.text = "Here are the commands available";
        window.speechSynthesis.speak(msg);
        window.location = '#openModal';
        active = false;
      }
    };

    var lightsControl = function(term) {
      if(active){
        if(term=="on" || term=="off"){
          lights(term);
          msg.text='Lights '+term;
        }else{
          msg.text="Sorry, this isn't a valid command";
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };
    
    var computerControl = function(term){
      if(active){
        if(term=="on" || term=="off"){
        computer(term);
        msg.text='Computer '+term;
        }else{
          msg.text="Sorry, this isn't a valid command";
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };

    var coffeeControl = function(term){
      if(active){
        if(term=="on" || term=="off"){
        coffee(term);
        msg.text='Coffee Machine turn'+term;
        }else{
          msg.text="Sorry, this isn't a valid command";
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };

    var deskControl = function(term){
      if(active){
        if(term=="on" || term=="off"){
        desk(term);
        msg.text='Desk '+term;
        }else{
          msg.text="Sorry, this isn't a valid command";
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };
    var allControl = function(term){
      if(active){
        if(term=="on" || term=="off"){
        all(term);
        msg.text='All the devices are turned '+term;
        }else{
          msg.text="Sorry, this isn't a valid command";
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };
  
    var openControl = function(term){
      if(active){
        if(term == "radio 1"){
        openMundoLivreFm();
        msg.text='Mundo Livre FM';
        }else if(term=="radio 2"){
          msg.text='Radio Rock FM';
          openRadioRockFm();
        }else{
          msg.text="Sorry, this isn't a valid command";
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };
    var closeControl = function(term){
      if(active){
        if(term == "radio 1"){
        closeMundoLivreFm();
        msg.text='Mundo Livre Closed';
        }else if(term=="radio 2"){
          closeRadioRockFm();
          msg.text='Radio Rock Closed';
        }else{
          msg.text="Sorry, this isn't a valid command"
        }
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };

    var goTo = function(term){
      if(active){
        var domain = [".com",".com.br",".com/br",".org",".net",".info",".pro",".gov",".br",".gov.br",".edu",".edu.br"];
        var i,url;
        var cont = 0;
        msg.text = "Going to "+term;
        window.speechSynthesis.speak(msg);
        if(term=="Facebook"){
          navigateTo("https://www.facebook.com");
        }else if(term=="Twitter"){
          navigateTo("https://www.twitter.com");
        }else{
          for (i = 0; i<domain.length;i++){
            url = ("http://www."+term+domain[i]).toLowerCase().replace(/\s+/g, '');
            console.log(url);
            urlCheck(url,function(data){
              var urlArray = (this.url).split("p=");
              if(data=="true"){
                cont++;
                navigateTo(urlArray[1]);
              }
            });
          }  
          if(cont==0){
            msg.text="This site doesn't exists";
            window.speechSynthesis.speak(msg);
          }
        }
        active = false;
      }
    };
    var google = function(term){
      if(active){
        msg.text = "Searching for "+term;
        window.speechSynthesis.speak(msg);
        searchTerms = term.replace(/\s+/g, '+');
        navigateTo("https://www.google.com.br/?gfe_rd=cr&ei=Fo5_VYjkL4SC8QfyhYHoBw&gws_rd=ssl#q="+searchTerms);
        active = false;
      }
    };
    
    var youtube = function(term){
      if(active){
        msg.text = "Searching videos of "+term;
        window.speechSynthesis.speak(msg);
        searchTerms = term.replace(/\s+/g, '+');
        navigateTo("https://www.youtube.com/results?search_query="+searchTerms);
        active = false;
      }
    };

    var volumeControl = function(term){
      if(active){
        msg.text = "Volume set to "+term;
        window.speechSynthesis.speak(msg);
        volume(term);
        active = false;
      }
    };

    var time = function(){
      if(active){
        time = new Date().toLocaleTimeString();
        ampm = (time.split(" "))[1];
        time = time.split(":");
        time = time[0]+':'+time[1]+' '+ampm;
        msg.text= time;
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };
    /*/try to allow in any window at chrome
    var translate = function(){
      msg.text = "Translate selected text";
      window.speechSynthesis.speak(msg);
      textToTranslate = document.getSelection().toString();
      navigateTo("https://translate.google.com/#auto/pt/"+textToTranslate);
      active = false;
    };
    MEH
    */
    var presentation = function(){
      if(active){
        msg.text = "Hello, my name is Eva. I'm a personal assistant for home automation and productivity in Operanting System.";
        window.speechSynthesis.speak(msg);
        active = false;
      }
    };

    var goodMorning = function(){
      msg.text = "Good morning ... Mister Brandão, today is a good day";
      window.speechSynthesis.speak(msg);
    };
    
    var eva = function(){
      active = true;
      var messages = ["Hi Led","I'm Listening","Hello Led", "Yes", "I'm here"];
      randMsg = messages[Math.floor(Math.random() * messages.length)];
      msg.text = randMsg;
      window.speechSynthesis.speak(msg);
    };
    
    var commands = {
      'eva' : eva,
      'good morning' : goodMorning,
      'who are you' : presentation,
      'commands' : commands,
      'lights *term' : lightsControl,
      'computer *term' :computerControl,
      'coffee *term' :coffeeControl,
      'desk *term' :deskControl,
      'all *term' :allControl,
      'open *term' : openControl,
      'close *term' : closeControl,
      'go to *term' : goTo,
      'google *term' : google,
      'youtube *term': youtube,
      'sound *term' : volumeControl,
      'what time is it' : time,
    };
    
    annyang.setLanguage("en-US");
    //annyang.setLanguage("pt-Br");
    annyang.addCommands(commands);
    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
}
