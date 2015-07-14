jQuery(document).ready(function(){
  
  initArticleImages(); 
  initSearchForm();
  initScrolling();
  fixIframes();
  
  if(!!document.createElement('canvas').getContext)
    initCanvas();
    
  initFreebies();
  checkPoll();
  
  initNl();
  initLogo();
  initSocialSidebar();
  initPageForms();
  
  
  if(!isWddMobile()){
    initRollLinks();
    initPostLinks();
    
    
    initCategoryLinks();
    
    
    
    initSidebar();
    
    //if( typeof showWdnPopup !== 'undefined')
    //  initGsPopup();
    //else
    //  initMdPopup();
      
    initStickyWdnAds();
    
  }  

  initLinks();
  
  pagesHtml[window.location.href] = jQuery('#face').html();
  
  initSocialStubs();
  
  
});

function initTopPostSpecialAds(){ 
  var adsBlock = jQuery('#special-wdd-ads-block');
  if(!adsBlock.attr('id'))
    return;
  
  jQuery.ajax({url: "/wp-content/themes/wdd_bubbles/ajax/special_ads_impression.php", success: function(data){
    if(data){
       adsBlock.show();
       adsBlock.html(data);
    }   
  } });  
  //adsBlock  
}


function initGsPopup(){
  if( WDD_Popup_Get_Cookie('wdn_popup_showed') )
    return;
  
  jQuery.ajax({url: "/demo/wdn.php", success: function(data){
    if(data){
      loadFancyBoxLibrary();
      setTimeout(function(){
        
        var container = jQuery('<div>');
        container.hide();
        
        var innerContainer = jQuery('<div>');
        innerContainer.append(data);
        innerContainer.attr('id','gs-popup-h-container');
        container.append(innerContainer);
        jQuery('body').append(container);
        
        var lnk = jQuery('<a>');
        lnk.attr('href', '#gs-popup-h-container');
        lnk.hide();
        
        jQuery('body').append(lnk);
        
        lnk.fancybox({
          'width' : 800,
			    'height' : 600,
          'autoDimensions' : false,
          'scrolling' : false,
			    'autoScale' : false,
          'type' : 'inline',
          'centerOnScroll': true ,
          'hideOnOverlayClick': true,
          'padding' : 0,
          onComplete: function(){
             WDD_Popup_Set_Cookie('wdn_popup_showed', true, 1, '/' );
             jQuery('#gs-popup-h-container a').click(function(){
                jQuery.fancybox.close();
             });
          }
        
        });
        
        lnk.click();
     
      
      
      }, 2000);
     }
    
    }
  });  
  
}


function initStickyWdnAds(){
  if(WDD_Popup_Get_Cookie('wdn_stick_ads_showed'))
    return;
    
  jQuery.ajax({url: "http://www.webdesignerdepot.com/widget/wdn_sticky_ads.php?ref=wdd", success: function(data){
      if(data){
         var stickyAds = jQuery('<div>');
         stickyAds.addClass('sticky-ads');
         
         var stickyClose = jQuery('<a>');
         stickyClose.attr('href','#');
         stickyClose.addClass('icon-cancel-circle').addClass('stick-ads-close');
         stickyAds.append(stickyClose);
         stickyAds.append(data);
         
         stickyClose.click(function(e){
           e.preventDefault();
           
           jQuery('body').removeClass('sticky-ads-activated');
           return false;
         });
         
         
         WDD_Popup_Set_Cookie('wdn_stick_ads_showed', true, 0, '/' );
         
         jQuery('body').append(stickyAds);
         setTimeout(function(){
           jQuery('body').addClass('sticky-ads-activated');
         }, 100 );
         
      }
    }
  });
}

function initStickyAds(){
  if(WDD_Popup_Get_Cookie('wdd_stick_ads_showed_n') || isWddMobile() )
    return;
  
  var barShowed = false;
  jQuery(window).scroll(function(e){
    if(barShowed)
      return;
      
    if( jQuery(window).scrollTop() > 200 ){
       barShowed = true;
       showStickyBar();
    }
    
  });  
  
}

function showStickyBar(){

jQuery.ajax({url: "/wp-content/themes/wdd/ajax/sticky_ads.php", success: function(data){
      if(data){
         var stickyAds = jQuery('<div>');
         stickyAds.addClass('sticky-ads');
         
         var stickyClose = jQuery('<a>');
         stickyClose.attr('href','#');
         stickyClose.addClass('icon-cancel-circle').addClass('stick-ads-close');
         stickyAds.append(stickyClose);
         stickyAds.append(data);
         
         stickyClose.click(function(e){
           e.preventDefault();
           
           jQuery('body').removeClass('sticky-ads-activated');
           return false;
         });
         
         
         WDD_Popup_Set_Cookie('wdd_stick_ads_showed_n', true, 1, '/' );
         //
         jQuery('body').append(stickyAds);
         setTimeout(function(){
           jQuery('body').addClass('sticky-ads-activated');
         }, 100 );
         //jQuery.ajax({url: "/wp-content/themes/wdd_bubbles/ajax/special_ads_impression.php", data: {update: 1} });
      }
    }
  });

}



function openSuPopup(url){
  window.open('http://www.stumbleupon.com/badge/?url=' + url, 'StumbleUpon', 'target=_blank,width=434,height=360, left=0, top=100 ');
}

function openGplusg(url){
  window.open('https://plus.google.com/share?url=' + encodeURIComponent(url), 'Share', 'target=_blank,width=500,height=380, left=0, top=100 ');
}

function openLinkedIn(url){
  window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url), 'Share', 'target=_blank,width=500,height=380, left=0, top=100 ');
}



var wddFacebookJsLoaded = false;
function initSocialStubs(){
  jQuery('.fb-stub.self-handle').click(function(){
    var link = jQuery(this);
    var u = encodeURIComponent(link.attr('data-href'));
    var t = encodeURIComponent(link.attr('data-title'));
    var leftPosition, topPosition;
    //Allow for borders.
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    
    window.open('http://www.facebook.com/sharer.php?u=' + u +'&t=' + t,'sharer',windowFeatures);
    return false;
  });
  
  jQuery('.tw-stub').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
  
  jQuery('.gplus-stub').click(function(){
    var lnk = jQuery(this);
    openGplusg(lnk.attr('data-url') );
    return false;
  }); 
  
  jQuery('.linkedin-stub').click(function(){
    var lnk = jQuery(this);
    openLinkedIn(lnk.attr('data-url') );
    return false;
  });
  
  jQuery('.fb-stub').mouseenter(function(){
    var link = jQuery(this);
    if(link.hasClass('self-handle') )
      return;
      
    var fbLink = jQuery('<fb:like href="'+ link.attr('href') +'"  send="false" layout="button_count" width="70" show_faces="true" font=""></fb:like>');
    link.replaceWith(fbLink);
    var parent = fbLink.parent()[0];
    if(wddFacebookJsLoaded)
      FB.XFBML.parse(parent);


    //if(!wddFacebookJsLoaded)
    //  initFacebookJs();
    
  });
}

/*
var blackFridayStickerShowed = false;
function initSticker(){
  if(blackFridayStickerShowed)
    return;
    
  blackFridayStickerShowed = true;
  
  if(WDD_Popup_Get_Cookie('wdd-bf-2014-sticker-closed'))
    return;
   
  jQuery('#black-friday-sticker').show();
  jQuery('#black-friday-sticker').addClass('active');
  
  jQuery('#bfs-ex-link').click(function(){
    jQuery('#black-friday-sticker').hide();
    WDD_Popup_Set_Cookie('wdd-bf-2014-sticker-closed', true , 1, '/' );
  });
  
  jQuery('#bfs-close-btn').click(function(e){
    e.preventDefault();
    jQuery('#black-friday-sticker').hide();
    WDD_Popup_Set_Cookie('wdd-bf-2014-sticker-closed', true , 1, '/' );
    return false;
  });
}

function hideBfSticker(){
  if(blackFridayStickerShowed)
    jQuery('#black-friday-sticker').removeClass('active');  
}

function showBfSticker(){
  if(blackFridayStickerShowed)
    jQuery('#black-friday-sticker').addClass('active');  
}
*/

function initArticleImages(){
  jQuery('.entry-content img').each(function(i, e){
    if(e.complete)
      return;
      
    var img = jQuery(e);
    img.addClass('faded');
     
     img
    .load(function() { img.addClass('unfaded'); })
    .error(function() { img.addClass('unfaded'); })
    .attr("src", img.attr("src"))
     ;
    
  });
  
  jQuery('.mc-item-css-image-preload').each(function(i,e) {
    
    if(e.complete)
      return;
      
    var img = jQuery(e);  
    var span = jQuery(img.attr('data-id'));
    span.addClass('faded');
    
     img
    .load(function() { span.addClass('unfaded'); })
    .error(function() { span.addClass('unfaded'); })
     ;
    
    
  });
  
  
   var img = jQuery('#feat-post-img-preload');
   if(img.attr('id') && !img[0].complete ){
     
     var featImg = jQuery('#feat-post-img');
     featImg.addClass('faded');
     
     img
    .load(function() { featImg.addClass('unfaded'); })
    .error(function() { featImg.addClass('unfaded'); })
    
     ;
     
   }
}

function fixIframes(){
  jQuery('.ads-iframe').attr('scrolling', 'no');
}


function submitWddNewsletter(){

   var subscribeField = jQuery('#wdd-newsletter-newsletter-email');
   var form = jQuery('#wdd-newsletter-subscribe-form');
   var email = subscribeField.val();
   
   if(!validateEmailForWdd(email)){
        //alert('Please enter a valid email address');
        swal("Please enter a valid email address", null, "warning");
        return false;
      }  
      
      var actionUrl = form.attr('action');
      var wdd_chk = jQuery('#wdd_newsletter_chk').is(':checked');
      var md_chk = jQuery('#md_newsletter_chk').is(':checked'); 
      
      if( !(md_chk || wdd_chk)){
        //alert('Please select at least one newsletter');
        swal("Please select at least one newsletter", null, "warning");
        return false;
      }
      
      //var formData = {'ref' : 'wddblog', 'email' : email.replace('+','%2b')};
      var formData = {'ref' : 'wddblog', 'email' : email};
      
      if(wdd_chk)
          formData['wdd_newsletter_chk'] = 1;
  
      if(md_chk)
        formData['md_newsletter_chk'] = 1;
    
      jQuery.ajax({
        url: actionUrl,
        data: formData,
        success: function(){
           subscribeField.val('');
           //alert('Thank you! Please check your email for the confirmation link. ');
           swal("Thanks, you've been subscribed.!", null, "success");
        }
      });
      
      return false;
  
}

function initPageForms(){
   initMdFreebieForm();
}

function initLinks(){
  jQuery('.large-share-item .sc-dots-block, .top-shares-drop-item .icon-dot-3').click(function(){
    var lnk = jQuery(this);
    var item = lnk.parent();
    if(item.hasClass('active'))
      item.removeClass('active');
    else  
      item.addClass('active');
    
    return false;  
    
  });
  
  
}

function initItemsSlider(){
  jQuery('.related-horizontal-items-slider').each(function(i,e){
    var slider = jQuery(this);
    var items = slider.find('.related-horizontal-items');
    var step = 0;
    var steps = 3;
    
    var nextBtn = jQuery('<a>');
    nextBtn.addClass('items-slider-next-btn');
    nextBtn.addClass('icon-right-open');
    nextBtn.attr('href','#');
    slider.parent().append(nextBtn);
    
    nextBtn.click(function(e){
      e.preventDefault();
      step++;
      if(step >= steps)
       step = 0;
      
      items.css('left', (-100 * step) + '%' ); 
      return false;
    });
    
    var prevBtn = jQuery('<a>');
    prevBtn.addClass('items-slider-prev-btn');
    prevBtn.addClass('icon-left-open');
    prevBtn.attr('href','#');
    slider.parent().append(prevBtn);
    
    prevBtn.click(function(e){
      e.preventDefault();
      step--;
      if(step < 0)
       step = steps - 1;
      
      items.css('left', (-100 * step) + '%' ); 
      return false;
    });
     
  });
  
}



function initFbShareBtn(){
  
  
  jQuery('.df-tw-share-btn').click(function(e){
     e.preventDefault();
     var link = jQuery(this);
     var url = link.attr('href');
     var width = link.attr('data-popup-width');
     var height = link.attr('data-popup-height');
     var leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
     var topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    
     var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    
     window.open(url,'Twitter',windowFeatures);
    
    return false;
  });
  
  jQuery('.df-fb-share-btn,.df-fbc-share-btn').click(function(e){
    e.preventDefault();
    var link = jQuery(this);
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    
    var popup = window.open(link.attr('href') + '&display=popup&sdk=joey','sharer',windowFeatures);
    
    
    return false;
  });
}

function isWddMobile(){
  if( jQuery('.wdd-mobile-body').length > 0 )
    return true;
  return false;  
}

function initSidebar(){
  //console.log( jQuery('#sidebar').height() + ' ' +  jQuery('#content').height() );
  jQuery('#glad-sb-wrap').show();
  if( jQuery('#sidebar').height() > jQuery('#content').height())
    jQuery('#glad-sb-wrap').hide();
  else
    jQuery('#glad-sb-wrap').show();  
  
}

function preloadContent(){
  var sprs = jQuery('.spr-title');
  preloadAjaxPage( jQuery(sprs[0]).attr('href'));
}

function initAjaxLinks(){

  jQuery('#logo,.spr-number,.spr-title,#footer-nav-links a').click(function(e){
    if(e.ctrlKey || e.metaKey)
      return true;
      
    e.preventDefault();
    var lnk = jQuery(this);
    loadAjaxLnk(lnk);
    return false;
    
  });
  
  jQuery('#main-menu a').click(function(e){
    if(e.ctrlKey || e.metaKey)
      return true;
      
    e.preventDefault();
    var lnk = jQuery(this);
    loadAjaxLnk(lnk);
   
    
    return false;
    
  });
  
}

function loadAjaxLnk(lnk){
    var url = lnk.attr('href');
    
    var title = lnk.attr('data-title');
    if(!title)
      title = lnk.text();
      
    title = title.trim();  
    
    if(!title)
      title = "Web Design Blog - WebdesignerDepot";
    else
      title = title + ' - WebdesignerDepot';
        
    History.pushState(null, title , url);
}

function preloadAjaxPage(url){
  jQuery.ajax({ url: url, success: function(data){
      pagesHtml[url] = data;
    } 
  });
}

function wddIsPad(){
  return navigator.userAgent.match(/iPad/i);
}

function initIpad(){
  
  if(wddIsPad() ) { 
     jQuery(".mm-parent-item").click(function(){
       var item = jQuery(this);
       if(item.hasClass('opened'))
         item.removeClass('opened');
       else  
         item.addClass('opened');
       
     });
  
  }
  
  
}

function reloadAds(){
  var bottomAds = document.getElementById("bottom_ads_frame");
  if(bottomAds)
    bottomAds.src = bottomAds.src;
  
  var top_sb_ads = document.getElementById("top_sb_ads_frame"); 
  if(top_sb_ads)  
    top_sb_ads.src = top_sb_ads.src;
  
}

var pagesHtml = [];
function initAjax(){
  History = window.History;
  wddRootUrl = History.getRootUrl();
  jQuery(window).bind('statechange',function(){
    var
				State = History.getState(),
				url = State.url,
				relativeUrl = url.replace(wddRootUrl,'');
    
  
    jQuery('#face').addClass('faded');
    jQuery('#face').removeClass('unfaded');
    scrollToTop();
    
    jQuery('#preloader-spinner').addClass('active');
    
    if(pagesHtml[url]){
      var dataHtml = pagesHtml[url];
      jQuery('#face').html( dataHtml );
      faceUnfade();
      initAfterAjax();
      reloadAds();
      return false;
    }   
    
    jQuery.ajax({url: url, data : {ajax: 1}, 
      success: function(data){
        pagesHtml[url] = data;
        jQuery('#face').html(data);
        faceUnfade();
        initAfterAjax();
      } 
    });
    
    reloadAds();
        
                
  });
}

function faceUnfade(){
   var img = jQuery('#feat-post-img-preload');
   if(img.attr('id')){
     
     var featImg = jQuery('#feat-post-img');
     featImg.addClass('faded');
     img.load(function(){
       featImg.addClass('unfaded');
     });
     
     img.error(function(){
       featImg.addClass('unfaded');
     });
     
     startUnfading();
     
   }
   else if( jQuery('.mc-item-css-image-preload').length > 0 ){
     
     var imagesToPreload = jQuery('.mc-item-css-image-preload').length;
     jQuery('.mc-item-css-image-preload').each(function(i, e){
         var img = jQuery(e);
         var spanId = img.attr('data-id');
         var span = jQuery(spanId);
         span.addClass('faded');
         img.load(function(){
           span.addClass('unfaded');
         });
         
         img.error(function(){
           span.addClass('unfaded');
           
         });
         
     });
     
     startUnfading();
     
   }
   else
     startUnfading();
}

function startUnfading(){
  jQuery('#preloader-spinner').removeClass('active');
  jQuery('#face').addClass('unfaded');
}

function initTestLinks(){
  jQuery('a').each(function(i, e){
    var lnk = jQuery(e);
    var href = lnk.attr('href');
    if(!href)
      return;
      
    if(href.indexOf("http") >= 0 && href.indexOf('webdesignerdepot') < 0 )
      return;
      
    if(href.indexOf("#") == 0  )
     return;  
    
    if(href.indexOf('theme=wdd_bubbles') < 0 ){
      if(href.indexOf('?') < 0 )
        lnk.attr('href', href + '?theme=wdd_bubbles');
      else  
        lnk.attr('href', href + '&theme=wdd_bubbles');
    }  
    
  });
}


function checkContactForm(jform){
  var form = jQuery(jform);
  
  var error = '';
  var name = form.find('[name=your-name]').val();
  if(!name){
    error = "Please enter your name\n";
    swal(error, null, "warning");
    return false;
  }
    
  var email = form.find('[name=your-email]').val();
  if(!validateEmailForWdd(email)){
    error = "Please enter a valid email address\n";
    swal(error, null, "warning");
    return false;
  }
    
  var subject = form.find('[name=your-subject]').val();
  if(!subject){
    error = "Please enter the subject\n";
    swal(error, null, "warning");
    return false;
  }
    
  var msg = form.find('[name=your-message]').val();
  if(!msg){
    error = "Please enter a message";
    swal(error, null, "warning");
    return false;
  }
    
  /*  
  var codeA = parseInt ( form.find('[name=codeA]').val() );
  var codeB = parseInt ( form.find('[name=codeB]').val() );
  var code =  parseInt (form.find('[name=code]').val() );
  if(codeA + codeB != code)
    error += "\nYou did not answer the captcha question correctly";
  */  
    
  if(error){
    //alert(error);
    //swal("Warning", error, "warning");
    return false;
  }
  
  jQuery('.ajax-loader').css('visibility', 'visible');
  var formData = form.serialize();
  jQuery.ajax({url: form.attr('action'), type: "POST", data: formData,
    success: function(data){
      //alert(data);
      swal(data, null, "success");
      jQuery('.ajax-loader').css('visibility', 'hidden');
      form.find('[name=your-name]').val('');
      form.find('[name=your-email]').val('');
      form.find('[name=your-subject]').val('');
      form.find('[name=your-message]').val('');
      
      form.find('[name=code]').val('');
    }
  
  });
  
  
  return false; 
}

String.prototype.replaceAt=function(index, character) {
    if(!character)
      return this;
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function initCategoryLinks(){
  var articlesCategory = "";
  if(jQuery('.category-articles').length > 0)
    articlesCategory = jQuery('#articles').attr('data-category').toLowerCase();
  
  jQuery('.home-cat-lnk').each(function(i, e){
    var lnk = jQuery(e);
    var lnkText = lnk.attr('data-cat');
    
    if(articlesCategory && articlesCategory == lnkText.toLowerCase() ){
      lnk.addClass('disabled');
      return;
    }
    
    var lnkReplacingText = "CLICK TO SEE ALL "+ lnkText +" POSTS";
    var lnkTextLength = lnkText.length;
    var lnkReplacingTextLength = lnkReplacingText.length;
    for(var i = 0; i < lnkReplacingTextLength - lnkTextLength; i++  )
      lnkText += ' ';
    
    var interval;
    var reverseInterval;
    var index = 0;
    var lnkTextCurent = lnkText;
    if(!lnkTextCurent)
      return;
      
    var speed = 12;  
    
    lnk.mouseenter(function(){
      
      clearInterval(reverseInterval);
      //index = 0;
      interval = setInterval(function(){
         //lnkTextCurent[index] = lnkReplacingText[index];
         lnkTextCurent = lnkTextCurent.replaceAt(index, lnkReplacingText[index] );
         
         lnk.text( lnkTextCurent );
         //console.log(index);
         index++;
         if( index >= lnkReplacingTextLength )
           clearInterval(interval);
          
      }, speed);
    });
    
    lnk.mouseleave(function(){
      clearInterval(interval);
      //var lnkTextCurent = lnkText;
      //index = 0;
      reverseInterval = setInterval(function(){
         //lnkTextCurent[index] = lnkReplacingText[index];
         index--;
         lnkTextCurent = lnkTextCurent.replaceAt(index, lnkText[index] );
         
         lnk.text( lnkTextCurent );
         //console.log(index);
         
         if( index <= 0 )
           clearInterval(reverseInterval);
          
      }, speed);
       //lnk.text( lnkText );
    });
    
  });
}

function initPostLinks(){

  jQuery('.large-share-item .sc-dots-block').click(function(){
    var lnk = jQuery(this);
    var item = lnk.parent();
    if(item.hasClass('active'))
      item.removeClass('active');
    else  
      item.addClass('active');
    
    return false;  
    
  });

  initFbShareBtn();
  
  if( typeof is_ie_lte9 !== 'undefined' || typeof is_ie_10 !== 'undefined' )
    return;
    
  if( navigator.appVersion.indexOf("X11") != -1 || navigator.appVersion.indexOf("Linux") != -1  )
    return;  
      
    
  jQuery('.entry-content a,.author-bio-text a').each(function(i,e){
     var link = jQuery(e);
     
     if(link.hasClass('twitter-timeline-link'))
       link.html( link.text() );
     
     //link.attr('href').match(/mailto/) ||
     if(    link.html().match(/<img/gi) || link.parent().hasClass('pg-item') || link.hasClass('no-roll') 
     || ( link.html().match(/<span/gi) && !link.html().match(/<span class="s2"/gi) )
     || link.hasClass('inner-link-effect')
     )
       return;
       
       if(link.attr('href').match(/mailto/)){
         link.find('*').remove();
       }
    
    // ??
    
      link.addClass('inner-link-effect');
      
     var word = link.text();
     var html = '';
     for(var i = 0; i < word.length; i++)
       html += '<span class="ae-letter">'+ word[i]  +'</span>';
       
       
     link.html(html);
       
       
          
  }); 
  
   
  
  jQuery('a.inner-link-effect').each(function(i,e){
    var lnk = jQuery(this);
    var letters = lnk.find('.ae-letter');
    var lettersIndex = 0;
    var lettersIndex2 = 0;
    var lettersLength = letters.length;
    var interval;
    var secondInterval;
    var totalSpeed = 150;
    var speed = Math.round( totalSpeed / lettersLength );
    var step = 1;
    var minSpeed = 5;
    if( speed < minSpeed)
      step = Math.ceil(minSpeed / speed);
    
    if(step > 2)
      step = 2;
    
    lnk.mouseenter(function(){
       
       
       clearInterval(interval);
       clearInterval(secondInterval);
       
       interval = setInterval(function(){
          for(var j = 0; j < step; j++  ){
            var tmpIndex = lettersIndex + j;
            if( tmpIndex < lettersLength )
              jQuery(letters[ tmpIndex ]).addClass('red-letter');
              
            var tmpReverseIndex = lettersLength - (tmpIndex + 1);
            if(tmpReverseIndex >= 0)
              jQuery(letters[ tmpReverseIndex ]).addClass('ae-underline');
          }
          
          lettersIndex += step;
          if(lettersIndex >= lettersLength){
            lettersIndex = lettersLength; 
            clearInterval(interval);
            /*secondInterval = setInterval(function(){
               jQuery(letters[lettersIndex2]).addClass('red-bg');
               lettersIndex2++;
               if(lettersIndex2 >= lettersLength)
                 clearInterval(secondInterval);
               
            }, speed);
            */
          }
          
        }, speed);
        
    });
    
    lnk.mouseleave(function(){
       clearInterval(interval);
       clearInterval(secondInterval);
        
       interval = setInterval(function(){
       
          
               /*jQuery(letters[lettersIndex]).removeClass('red-letter');
               jQuery(letters[lettersLength - (lettersIndex + 1)]).removeClass('ae-underline');
               */
               
            for(var j = 0; j < step; j++  ){
              var tmpIndex = lettersIndex + j;
              if( tmpIndex < lettersLength )
                jQuery(letters[ tmpIndex ]).removeClass('red-letter');
              
              var tmpReverseIndex = lettersLength - (tmpIndex + 1);
              if(tmpReverseIndex >= 0)
                jQuery(letters[ tmpReverseIndex ]).removeClass('ae-underline');
            }
               
            lettersIndex -= step;
            if(lettersIndex < -1 ){
              clearInterval(interval);
              lettersIndex = 0;
            }
          
          /*
          jQuery(letters[lettersIndex2]).removeClass('red-bg');
          lettersIndex2--;
          if(lettersIndex2 < 0){
            clearInterval(interval);
            
            secondInterval = setInterval(function(){
               jQuery(letters[lettersIndex]).removeClass('red-letter');
               lettersIndex--;
               if(lettersIndex < 0 )
                 clearInterval(secondInterval);
               
            }, speed);
            
            
          }
          */
          
        }, speed);
    });
    
  });
  
  //???
  jQuery('a.ae-link').each(function(i,e){
    var lnk = jQuery(this);
    var letters = lnk.find('.ae-letter');
    var lettersIndex = 0;
    var lettersLength = letters.length;
    var interval;
    var line = jQuery(lnk.find('.ae-line'));
    
    lnk.mouseenter(function(){
       /*lettersIndex = 0;
       
       interval = setInterval(function(){
         jQuery(letters[lettersIndex]).addClass('red');
         console.log(lettersIndex);
        
          lettersIndex++;
          if(lettersIndex >= lettersLength){
            clearInterval(interval);
            runSecondPart();
          }
        
        }, 10);
        */
        secondIndex  = 0 ;
        line.animate({width: '100%'}, 300, 'linear', function(){ runSecondPart(); });
    });
    
    
    
    lnk.mouseleave(function(){
      //clearInterval(interval);
      line.stop();
      line.css('width', 0);
      clearInterval(secondInterval);
      for(var i = 0; i< lettersLength; i++){
        jQuery(letters[i]).removeClass('red-bg');
        
        //jQuery(letters[i]).removeClass('red');
      }
    });
    
    var secondInterval;
    var secondIndex = 0;
    function runSecondPart(){
       secondInterval = setInterval(function(){
       jQuery(letters[secondIndex]).addClass('red-bg');
       
        secondIndex++;
        if(secondIndex >= lettersLength)
          clearInterval(secondInterval);
          
        }, 15);
    }
    
  });
}

function initAfterAjax(){
  jQuery('#pagination-wrap').empty();
  jQuery('#pagination-wrap').append( jQuery('#content .pagination') );
  
  // deals page fix
  jQuery('.pl-md-pagination').removeClass('pl-md-pagination');
      
  initPostLinks();
  startPaginationPreload();
  initCategoryLinks();
  initPostsAjaxLoading();
  initItemsSlider();
  initPageForms();
  //initTestLinks();
  
  shrNumCounterRun = false;
  
  if(!!document.createElement('canvas').getContext)
    initCanvas();
  
  Prism.highlightAll();
  
  initSidebar();
  initAfterAjaxDisqus();
}

function initAfterAjaxDisqus(){
  if( jQuery('#disqus_thread').attr('id') ){
    disqus_url = embedVars.disqusUrl;
    disqus_identifier = embedVars.disqusIdentifier;
    disqus_container_id = 'disqus_thread';
    disqus_shortname = embedVars.disqusShortname;
    disqus_title = embedVars.disqusTitle;
  
    if( typeof DISQUS !== 'undefined' ) 
      DISQUS.reset({
        reload: true
      });
    else
      jQuery.getScript ('//' + 'webdesignerdepot.disqus.com/embed.js');
  }
  
}

function isdefined( variable)
{
    return typeof variable !== 'undefined';
}

function initPostsAjaxLoading(){
  jQuery('.single-ajax-lnk').click(function(e){
    
    if(e.ctrlKey || e.metaKey)
      return true;
      
    e.preventDefault();
    
    
    var lnk = jQuery(this);
    var url = lnk.attr('href');
    var mainItem = lnk.closest('.chess-item');
    var title = mainItem.attr('data-title');
    if(!title)
      title = "Webdesigner Depot";
    History.pushState(null, title , url);
    
    return false;
    
  });
  
  jQuery('#all-categories-list a,.home-cat-lnk,.single-meta a,.author-bio-text a,.home-meta a, .related-horizontal-item a').click(function(e){
     
     if(e.ctrlKey || e.metaKey)
      return true;
     
     var lnk = jQuery(this);
     var url = lnk.attr('href');
     if(!isLocalUrl(url) )
       return true;
     
     e.preventDefault();  
     loadAjaxLnk(lnk);
    
     return false;
  });
}

function isLocalUrl(url){
   var regExp = new RegExp("//" + location.host + "($|/)");
   var isLocal = (url.substring(0,4) === "http") ? regExp.test(url) : true;
   return isLocal;
}

function initRollLinks(){
  if( typeof is_ie_lte9 !== 'undefined' || typeof is_ie_10 !== 'undefined' )
    return;
    
  if( navigator.appVersion.indexOf("X11") != -1 || navigator.appVersion.indexOf("Linux") != -1  )
    return;  
    
  //if(wddIsPad())
  //  return;
    
  jQuery('.mm-item').each(function(i,e){
     var link = jQuery(e);
     link.addClass('roll-link');
     link.html('<span data-title="'+ link.text() +'">' + link.html() + '</span>');
          
  });
}


function startPaginationPreload(){
  var nextUrl = jQuery('.pg-next .navbutton').attr('href');
  jQuery.ajax({ url: nextUrl, success: function(data){
      pagesHtml[nextUrl] = data;
    } 
  });
  
  jQuery('.pg-item a').click(function(e){
     if(e.ctrlKey || e.metaKey)
      return true;
       
     e.preventDefault();
     var url = jQuery(this).attr('href');
     History.pushState(null, null, url);
     return false;
    
    
  });
}

function scrollToTop(){
  jQuery(window).scrollTop(0);
  jQuery('body,html').scrollTop(0);
  jQuery(window).scroll();
}

function initSocialSidebar(){
  
  jQuery('#fc-row-facebook').click(function(e){
    e.preventDefault();
    var link = jQuery(this);
    var u = encodeURIComponent(link.attr('data-url'));
    var t = encodeURIComponent(link.attr('data-title'));
    var leftPosition, topPosition;
    //Allow for borders.
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    
    window.open('http://www.facebook.com/sharer.php?u=' + u +'&t=' + t,'sharer',windowFeatures);
    return false;
  });
  
  jQuery('#fc-row-pin,.pin-button-stub').click(function(e){
    e.preventDefault();
    var link = jQuery(this);
    var u = encodeURIComponent(link.attr('data-url'));
    var iu = encodeURIComponent(link.attr('data-img'));
    //var t = encodeURIComponent(link.attr('data-title'));
    var leftPosition, topPosition;
    //Allow for borders.
    var width = 750;
    var height = 550;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open('//www.pinterest.com/pin/create/button/?url='+ u +'&media=' + iu ,'sharer',windowFeatures);
    return false;
  });
  
  
  
  jQuery('#fc-row-twitter').click(function(e){
    e.preventDefault();
    var link = jQuery(this);
    var u = encodeURIComponent(link.attr('data-url'));
    var t = encodeURIComponent(link.attr('data-title'));
    var leftPosition, topPosition;
    //Allow for borders.
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open('https://twitter.com/intent/tweet?tw_p=tweetbutton&text='+ t  +'&url='+ u +'&via=designerdepot','sharer',windowFeatures);
    return false;
  });
  
  jQuery('#fc-row-gplus').click(function(e){
    e.preventDefault();
    var link = jQuery(this);
    var u = link.attr('data-url');
    openGplusg(u);
    return false;
  });
  
  jQuery('#fc-row-su').click(function(e){
    e.preventDefault();
    var link = jQuery(this);
    var u = encodeURIComponent(link.attr('data-url'));
    openSuPopup(u);
    return false;
  });
  
  jQuery('#fc-row-comment').click(function(e){
    var link = jQuery(this);
    e.preventDefault();
    jQuery.scrollTo( jQuery(link.attr('href') ) , 400);
    return false;
  });
  
  
  var numLabel = jQuery('#fc-comments-num');
  if(numLabel.attr('id')){
    var disqusThreadUrl = numLabel.attr('data-disqus-url');
    jQuery.ajax({
      type: 'GET',
      url: "https://disqus.com/api/3.0/threads/set.jsonp",
      data: { api_key: '1p5t4YdAeCJhOw9PkKrLA34Cn3k6cuS8WCRw8a1FnS7zCOpmMvtLal9fG4RYo2Xp', forum : 'webdesignerdepot', thread : 'link:' + disqusThreadUrl },
      cache: false,
      dataType: 'jsonp',
      success: function(data){
        numLabel.text(data.response[0].posts);
      }
    
    });
  }
  
 
}


function openSuPopup(url){
  window.open('http://www.stumbleupon.com/badge/?url=' + url, 'StumbleUpon', 'target=_blank,width=434,height=360, left=0, top=100 ');
}

function openGplusg(url){
  window.open('https://plus.google.com/share?url=' + encodeURIComponent(url), 'Share', 'target=_blank,width=500,height=380, left=0, top=100 ');
}

function initLogo(){
  
  var current_frame, total_frames, logoPath, length, handle, logoObject, opacity, runningLogoAnimation;
  
  jQuery('#logo').mouseenter(function(){
      rerunLogoAnimation();
  });
  
  jQuery('#logo').mouseleave(function(){
    current_frame = total_frames;
  });
  
  if( !jQuery('#logo-svg-wrap').attr('id') )
    return;

  logoObject = document.getElementById('logo-svg-wrap').cloneNode(true);
  

var initLogoAnimation = function() {
  current_frame = 0;
  total_frames = 60;
  opacity = 0;
  
  length = new Array();
  
    logoPath = document.getElementById('logo_svg_path');
    l =logoPath.getTotalLength();
    length = l;
    logoPath.style.strokeDasharray = l + ' ' + l; 
    logoPath.style.strokeDashoffset = l;
  
  handle = 0;
}
 
 
   var drawLogoAnimation = function() {
   var progress = current_frame/total_frames;
   if (progress > 1) {
     
     opacity += 0.04;
     if(opacity >= 1){
       opacity = 1;
       window.cancelAnimationFrame(handle);
       runningLogoAnimation = false;	
     }
     else
     	handle = window.requestAnimationFrame(drawLogoAnimation);
      logoPath.style.fill = "rgba(0,0,0,"+ opacity +")";
      

   } else {
     current_frame++;
	   logoPath.style.strokeDashoffset = Math.floor(length * (1 - progress));
     handle = window.requestAnimationFrame(drawLogoAnimation);
   }
};

   var rerunLogoAnimation = function() {
    if(runningLogoAnimation)
      return;
    var old = document.getElementById('logo-svg-wrap');//document.getElementsByTagName('div')[0];
    old.parentNode.removeChild(old);
    document.getElementById('logo').appendChild(logoObject);
    document.getElementById('logo_svg_path').style.fill = "none";
    initLogoAnimation();
    drawLogoAnimation();
    runningLogoAnimation = true;
  };

}

function initNl(){
  
  initSbSignupForm();
  
}

function initSbSignupForm(){
  
  
  
  jQuery('#sb-subscribe-form').submit(function(){
      
      var email = jQuery('#footer-subscribe-email').val();
      
      if(!validateEmailForWdd(email)){
        //alert('Please enter a valid email address');
        swal("Please enter a valid email address", null, "warning");
        return false;
      }
      
      if(!jQuery('#wdd_sb_nl_agree_chk').is(':checked')){// .attr('checked')){
        //alert('Please check terms and conditions!');
        swal("Please check the checkbox to agree to the terms", null, "warning");
        return false;
      }
      
      swal("Thanks, you've been subscribed.!", null, "success");
      
      return true;
      
   });   
   
   var ipLoaded = false;
   jQuery('#footer-subscribe-email').focus(function(){
     if(!ipLoaded){
       jQuery.getJSON( "http://www.telize.com/jsonip?callback=?", function(data){  jQuery('#nl_sb_ip_field').val(data.ip) ; } );
       ipLoaded = true;
     }
   });
   
   
}

function validateEmailForWdd(email){ 
 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
 return email.match(re) 
}

function isSafari() {
    return /^((?!chrome).)*safari/i.test(navigator.userAgent);
}

function initFreebies(){
  jQuery('.miil-freebie a').on('mouseenter', function(){
    var lnk = jQuery(this);
    var areaId = lnk.attr('data-target');
    jQuery('.freebie-info-block').removeClass('active');
    jQuery(areaId).addClass('active');
  
  });
  
  jQuery('.miil-freebie').on('mouseleave', function(){
    jQuery('.freebie-info-block').removeClass('active');
    jQuery('#freebie-info-block-default').addClass('active');
  });
  
}


function initCanvas(){

  
  jQuery('.hpop-shares-trian').each(function(i,e){
     var context = e.getContext("2d");
     drawPopSharesTriangle(context);
  });
  
  jQuery('.canvas-share-triangle-left').each(function(i,e){
     var context = e.getContext("2d");
     drawLeftSharesTriangle(context);
  });
  
}

function drawLeftSharesTriangle(context){
   context.beginPath();
  
  context.moveTo(7, 0);        // Top Corner
  context.lineTo(7, 14);         // Bottom Left
  context.lineTo(0,7); // Bottom Right
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
  
  
  context.beginPath();
  context.moveTo(7, 0);        // Top Corner
  context.lineTo(0,7); // Bottom Right
  context.lineTo(7, 14);         // Bottom Left
  
  
  context.strokeStyle = '#ddd';
  context.lineWidth   = 1;
  context.stroke();
}


function drawPopSharesTriangle(context){
  context.beginPath();
  
  context.moveTo(0, 7);        // Top Corner
  context.lineTo(7, 0);         // Bottom Left
  context.lineTo(14,7); // Bottom Right
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
  
  
  context.beginPath();
  context.moveTo(0, 7);        // Top Corner
  context.lineTo(7, 0);         // Bottom Left
  context.lineTo(14,7); // Bottom Right
   
  context.strokeStyle = '#ddd';
  context.lineWidth   = 1;
  context.stroke();
  
}

function initSearchForm(){
  
  
  jQuery('#open-search-btn').on('click', function(e){
    e.preventDefault();
    var searchForm = jQuery('#search-form');
    if( searchForm.hasClass('active') ){
      //searchForm.removeClass('active');
    }
    else{
      searchForm.addClass('active');
      jQuery('#search-field').focus();
      
    }
    
    return false;
  });
  
  jQuery('#search-field').on('focusout', function(){
      setTimeout(function(){
        jQuery('#search-form').removeClass('active');
        jQuery('#search-field').autocomplete().hide();
      }, 100);
      
  });
  
  jQuery('#search-form-404').submit(function(){
    var searchField = jQuery('#search-form-404 input[name=s]');
    var searchValue = searchField.val();
    if(!searchValue){ 
      swal( "Please enter search term", null, "warning");
      return false;
    }
    return true;
  });
  
  
  var options;
  
     options = { 'serviceUrl' : '/wp-content/themes/wdd/ajax/predective_search.php',
                  minChars:3,
                  autoSubmit: true,
                  onSelect: function(suggestion){
                    jQuery('#search-field').focus();
                    jQuery('#search-form').submit();
                  }
              };
     jQuery('#search-field').autocomplete(options);
}



var isWddMobileDevice = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isWddMobileDevice.Android() || isWddMobileDevice.BlackBerry() || isWddMobileDevice.iOS() || isWddMobileDevice.Opera() || isWddMobileDevice.Windows());
    }
};

function initScrolling(){
  
  jQuery('#top_link').click(function(){
    
    var lnk = jQuery(this);
    var id = lnk.attr('href');
    id = id.replace(/.*?#/g,"#");
    
    var el = jQuery(id);
    jQuery.scrollTo(el, 400, function(){
    });
    return false;
  });
  

  if( jQuery('.mobile-body').length <= 0 )
  jQuery(window).scroll(function(e){
    scrollingStuffUpdate(e);
    
    
    return;
    var gladSbWrap = jQuery('#glad-sb-wrap');
    if( gladSbWrap.attr('id')){
    
     var bottomAbout = jQuery('#pre-glad-sb-wrap').offset().top;
     console.log( bottomAbout + ' - ' + offsetY  );
     if(bottomAbout - offsetY < 65){
      if(!jQuery('#glad-sb-wrap').hasClass('fixed') ){
        jQuery('#glad-sb-wrap').addClass('fixed');
        sbSkyFixed = true;
      }  
     }else if(jQuery('#glad-sb-wrap').hasClass('fixed')){  
      jQuery('#glad-sb-wrap').removeClass('fixed');
      sbSkyFixed = false;
     }
   
        
    }
    
    
  });
  
 
}


var shrNumCounterRun = false;
var shrsCounterElement, shrsCounterDest, shrsCounterNum = 0, shrsCounterTimestep;
function startShareCoutner(){
  if(shrNumCounterRun)
    return;
  
  shrNumCounterRun = true;
  
  shrsCounterElement = jQuery('#shrs-counter');
  if( shrsCounterElement.hasClass('shrs-counter-fixed'))
    return;
  shrsCounterDest = parseInt(shrsCounterElement.attr('data-num') );
  shrsCounterNum = 0;
  shrsCounterTimestep = 10;
  shrsTimerIteration();
  
 
  
}

function shrsTimerIteration(){
   var delta = shrsCounterDest - shrsCounterNum;
   var threshold = 15;
   var lastThreshold = 4;
   var timestepIncrement = 15;
   if(delta < threshold )
     shrsCounterTimestep += timestepIncrement;
     
   delta = Math.ceil(delta * 0.05);
   if(shrsCounterNum >= shrsCounterDest - lastThreshold){
     delta = 1;
     shrsCounterTimestep = 350;
   }
   
   shrsCounterNum += delta;
   
   if(shrsCounterNum >= shrsCounterDest){
      shrsCounterNum = shrsCounterDest;
      shrsCounterElement.text( shrsCounterNum );
   }
   else{
     shrsCounterElement.text( shrsCounterNum );
     setTimeout(shrsTimerIteration, shrsCounterTimestep);
   }
   
}



function commaSeparated(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function scrollingStuffUpdate(e){
    var offsetY = jQuery(window).scrollTop(); 
    var winHeight = jQuery(window).height();
    
    /*
    if(offsetY >= 200){
      initSticker();
      showBfSticker();
    }
    
    if(offsetY <= 100)
      hideBfSticker();
    */    
    
    if(offsetY >= 200){
       jQuery('#top_link').addClass('active');
    }
    else if(offsetY < 200){
      jQuery('#top_link').removeClass('active');
    } 
    
    if(offsetY > winHeight  )
      jQuery('#fixed-social').addClass('active');
    
    
    var sbContent = jQuery('#sidebar-content');
    var sbHeight = sbContent.height();
    
    
    var delta = (offsetY + winHeight ) - sbHeight;
    var bottomEdge = offsetY + winHeight;
  
    
    handleParallax(offsetY, winHeight, bottomEdge, e);
    checkSocialShares(offsetY, winHeight, bottomEdge, e);
  
}

var prevScroll = 0;
function handleParallax(offsetY, winHeight, bottomEdge, event){
  var imgBlock = jQuery('#feat-post-img');
  if(!imgBlock.length)
    return;
    
  var imgBlockBottom =  imgBlock.offset().top + imgBlock.height();
  
  var delta = offsetY / imgBlockBottom;
  if(delta > 1 )
    delta = 1;
  
  if(delta < 0)
    delta = 0;  
    
  var backroundPos = -Math.round(delta * 80);
  imgBlock.css('background-position', 'center '+  backroundPos +'px');  

  
}

function checkSocialShares(offsetY, winHeight, bottomEdge, e){
  if(!jQuery('#single-large-socials').attr('id'))
    return;
    
  var widget = jQuery('#single-large-socials');
  if( widget.offset().top  < bottomEdge )
      startShareCoutner();

}

function submitMdFreebieSubscribe(){
   var email = document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value;
   var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
   var code = document.forms['mighty_freebie_deals_subscribe_form'].elements['code'].value;
  
  if(!validateEmailForWdd(email)){
  	//alert('Please enter a valid email address');
    swal("Please enter a valid email address", null, "warning");
  	return false;
  }
  
  
  
  var agreed = document.forms['mighty_freebie_deals_subscribe_form'].elements['agree'].checked;
  if(!agreed){
    //alert('Please agree to the terms');
    swal("Please agree to the terms", null, "warning");
    return false;
  }
 
  mdFreebieExternalRequest(email, refID, code);
  WDD_Popup_Set_Cookie('wdd-freebie-email', email , 365, '/' );
  
  return false;
}


function mdTweetGetFreebie(){
  var email = WDD_Popup_Get_Cookie('wdd-freebie-tweet');
  if(!email)
    email = WDD_Popup_Get_Cookie('wdd-freebie-email');

  if(!email){
    //alert('You do not have permission to access this file directly');
    swal("You do not have permission to access this file directly", null, "warning");
    return false;
  }

  var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
  var code = document.forms['mighty_freebie_deals_subscribe_form'].elements['code'].value;
  //WDD_Popup_Set_Cookie('wdd-freebie-tweet', email , 365, '/' );
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  WDD_Popup_Set_Cookie('wdd-freebie-tweet-' + postId, email , 365, '/');
  WDD_Popup_Set_Cookie('wdd-freebie-email', email , 365, '/' );

  jQuery.ajax({ url: '/widget/getMdFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, code : code, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
      if(responseText == 'error')
        //alert('Please try again');
        swal("Please try again", null, "warning");
      else if(matches){
        var ifrm = document.getElementById("md-download-file-frame");
        ifrm.src = matches[1];
      }
      else
        //alert('Something went wrong please try again.');
        swal("Something went wrong please try again", null, "warning");
        
        
     }
     
   });
}


function otoFreebieExternalRequest(email, refID, code){
 
  jQuery.ajax({ url: '/widget/subscribeOtoFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, code : code, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
    	if(responseText == 'error')
    	  //alert('Please try again');
        swal("Please try again", null, "warning");
    	else if(matches){
    		var ifrm = document.getElementById("md-download-file-frame");
    		ifrm.src = matches[1];
    	}
    	else
    	  //alert('Thank you! Please check your email for the download link. Please check your spam folder as well.');
        swal("Thank you! Please check your email for the download link. Please check your spam folder as well.", null, "success");
    	  
    	document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = '';
     }
     
   });
  
  document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = 'Please wait...';
}

function submitWddFreebieSubscribe(){
  var email = document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value;
  var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
  var file = document.forms['mighty_freebie_deals_subscribe_form'].elements['file'].value;
  
  if(!validateEmailForWdd(email)){
  	//alert('Please enter a valid email address');
    swal("Please enter a valid email address", null, "warning");
  	return false;
  }
  
  var agreed = document.forms['mighty_freebie_deals_subscribe_form'].elements['agree'].checked;
  if(!agreed){
    //alert('Please agree to the terms');
    swal("Please agree to the terms", null, "warning");
    return false;
  }
 
  wddFreebieExternalRequest(email, refID, file);
  
  
  return false;
}

function wddFreebieExternalRequest(email, refID, file){
 
  jQuery.ajax({ url: '/widget/subscribeWddFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, file : file, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
    	if(responseText == 'error')
    	  //alert('Please try again');
        swal("Please try again", null, "warning");
    	else if(matches){
    		var ifrm = document.getElementById("md-download-file-frame");
    		ifrm.src = matches[1];
    	}
    	else
    	  //alert('Thank you! Please check your email for the download link. Please check your spam folder as well.');
        swal("Thank you! Please check your email for the download link. Please check your spam folder as well.", null, "success");
    	  
    	document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = '';
     }
     
   });
  
  document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = 'Please wait...';
}

function submitOtoFreebieSubscribe(){
   var email = document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value;
   var refID = document.forms['mighty_freebie_deals_subscribe_form'].elements['refID'].value;
   var code = document.forms['mighty_freebie_deals_subscribe_form'].elements['code'].value;
  
  if(!validateEmailForWdd(email)){
  	//alert('Please enter a valid email address');
    swal("Please enter a valid email address", null, "warning");
  	return false;
  }
  
  var agreed = document.forms['mighty_freebie_deals_subscribe_form'].elements['agree'].checked;
  if(!agreed){
    //alert('Please agree to the terms');
    swal("Please agree to the terms", null, "warning");
    return false;
  }
 
  otoFreebieExternalRequest(email, refID, code);
  //WDD_Popup_Set_Cookie('wdd-oto-freebie-email', email , 365, '/' );
  
  return false;
}

function initOtoFreebieForm(){
  if( !jQuery('#oto-freebie-email-form-block').attr('id') )
    return;
    
  var emailSubscribed =  WDD_Popup_Get_Cookie('wdd-oto-freebie-email');
  
  
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  var tweetPaid =  WDD_Popup_Get_Cookie('wdd-freebie-tweet-' + postId);
  
  if(emailSubscribed && !tweetPaid){
    jQuery('#oto-freebie-email-form-block').hide();
    jQuery('#md-freebie-twitter-form-block').show();
  }
  else if(emailSubscribed && tweetPaid){
    jQuery('#oto-freebie-email-form-block').hide();
    jQuery('#md-freebie-download-block').show();
    jQuery('#freebie-download-btn-lnk').click(function(){
      mdTweetGetFreebie();
    });

  }

  jQuery('#freebie-pay-with-tweet-lnk').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
}


function initWddFreebieForm(){
  if( !jQuery('#wdd-freebie-email-form-block').attr('id') )
    return;
    
  var emailSubscribed =  WDD_Popup_Get_Cookie('wdd-wdd-freebie-email');
  
  
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  var tweetPaid =  WDD_Popup_Get_Cookie('wdd-freebie-tweet-' + postId);
  
  if(emailSubscribed && !tweetPaid){
    jQuery('#wdd-freebie-email-form-block').hide();
    jQuery('#md-freebie-twitter-form-block').show();
  }
  else if(emailSubscribed && tweetPaid){
    jQuery('#wdd-freebie-email-form-block').hide();
    jQuery('#md-freebie-download-block').show();
    jQuery('#freebie-download-btn-lnk').click(function(){
      mdTweetGetFreebie();
    });

  }

  jQuery('#freebie-pay-with-tweet-lnk').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
}

function initMdFreebieForm(){
  initOtoFreebieForm();
  initWddFreebieForm
  
   
  if( !jQuery('#md-freebie-email-form-block').attr('id') )
    return;
    
  var emailSubscribed =  WDD_Popup_Get_Cookie('wdd-freebie-email');
  
  
  var postId = jQuery('#might-freebie-deals-subscribe-form input[name=wdd_post_id]').val();
  var tweetPaid =  WDD_Popup_Get_Cookie('wdd-freebie-tweet-' + postId);
  
  if(emailSubscribed && !tweetPaid){
    jQuery('#md-freebie-email-form-block').hide();
    jQuery('#md-freebie-twitter-form-block').show();
  }
  else if(emailSubscribed && tweetPaid){
    jQuery('#md-freebie-email-form-block').hide();
    jQuery('#md-freebie-download-block').show();
    jQuery('#freebie-download-btn-lnk').click(function(){
      mdTweetGetFreebie();
    });

  }

  jQuery('#freebie-pay-with-tweet-lnk').click(function(){
    var link = jQuery(this);
    var url = link.attr('href');
    var leftPosition, topPosition;
    var width = 626;
    var height = 436;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    //url += '?msg=' + link.attr('data-msg');
    window.open(url,'Twitter',windowFeatures);
    return false;
  });
}

function mdFreebieExternalRequest(email, refID, code){
 
  jQuery.ajax({ url: '/widget/subscribeMdFreebie.php', type : 'POST',
     data: { refID : refID, Type: 3, code : code, email: email },
     success: function(responseText){
      var matches = /^file:(.*)/i.exec(responseText); 
    	if(responseText == 'error')
    	  //alert('Please try again');
        swal("Please try again", null, "warning");
    	else if(matches){
    		var ifrm = document.getElementById("md-download-file-frame");
    		ifrm.src = matches[1];
    	}
    	else
    	  //alert('Thank you! Please check your email for the download link. Please check your spam folder as well.');
        swal("Thank you! Please check your email for the download link. Please check your spam folder as well.", null, "success");
    	  
    	document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = '';
     }
     
   });
  
  document.forms['mighty_freebie_deals_subscribe_form'].elements['email'].value = 'Please wait...';
}


function initMdPopup(){
  if( isWddMobileDevice.any() )
    return;
  
  var mdPopupPagesVisits = WDD_Popup_Get_Cookie('md_popup_page_visits');
  if(!mdPopupPagesVisits)
    mdPopupPagesVisits = 1;
  else
    mdPopupPagesVisits = 1 + parseInt(mdPopupPagesVisits);
  
  
  WDD_Popup_Set_Cookie('md_popup_page_visits', mdPopupPagesVisits, 0, '/' );
  
  if(mdPopupPagesVisits == 3 && !WDD_Popup_Get_Cookie('md_popup_done') && !WDD_Popup_Get_Cookie('md_popup_week') ){
    jQuery('body').append('<a href="/wp-content/plugins/md-popup/iframe_n.html" class="md-popup-link" style="display:none"></a>');
    loadFancyBoxLibrary();
    //initMdPopupFancy();
    setTimeout('activateMdPopupFancy()', 2000);
    jQuery.ajax({url: 'http://www.webdesignerdepot.com/wp-content/themes/wdd_flat/ajax/md-popup-stat.php'});
  }
}

function activateMdPopupFancy(){
  
jQuery('.md-popup-link').fancybox({
       'width' : 630,
			 'height' : 640,
			 'autoScale' : false,
			 'transitionIn' : 'none',
			 'transitionOut' : 'none',
			 'type' : 'iframe',
			 'padding': 0,
			 'overlayColor': '#333',
       'centerOnScroll': true, 
			 onClosed: function(){
        WDD_Popup_Set_Cookie('md_popup_week', 1, 7, '/' );	
       },
       onComplete: function(){
         jQuery.ajax({ type: 'POST', url: '/wp-content/plugins/md-popup/ajax/wp-api.php' , data: {'imp' : 1 } });
       }
  });
  
  jQuery('.md-popup-link').click();

}    

function loadFancyBoxLibrary(){
  var oHead = document.getElementsByTagName('HEAD').item(0);
  var oScript= document.createElement("script");
  oScript.type = "text/javascript";
  oScript.src="/wp-content/themes/wdd_new/fancybox/jquery.fancybox-1.3.4.pack.js";
  oHead.appendChild( oScript);
  
  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.type = 'text/css';
  cssLink.href = '/wp-content/themes/wdd_new/fancybox/jquery.fancybox-1.3.4.css';
  oHead.appendChild( cssLink);

}


function WDD_Popup_Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


function WDD_Popup_Set_Cookie( name, value, expires, path, domain, secure ){
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );

}


/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);



// POLL LOGIC
function checkPoll(){
  
  var pollId = jQuery('.widget-poll input[name=poll_id]').val();
  var cookieName =  'cwppoll' + pollId;
  if(pollId > 0 && WDD_Popup_Get_Cookie( cookieName) ){

     var form = jQuery('.widget-poll .show-form' + pollId);
     form.css('display', 'none');

     var results = jQuery('.widget-poll .poll-show-results');
     results.css('display', 'block');

  }
}

function vote_poll(pollid, answertype, maxnoanswers){
    
    if(answertype == 'multiple')
    {
        var answersCheckedCount = jQuery("#poll"+ pollid +" input[type=checkbox]:checked").length;
        if(answersCheckedCount < 1){
          //alert('Click on the different options to vote and view results');
          swal("Click on the different options to vote and view results", null, "warning");
          return false;
        }
        
        data = jQuery('#poll'+pollid).serialize();
        var n=data.match(/option/g);
        if(parseInt(n.length) <= parseInt(maxnoanswers))
            {
                jQuery('#show-form'+pollid).fadeOut(500);
                jQuery('#show-results'+pollid).css('display', 'none');
                jQuery.post(ajaxurl, data,  
                    function(response){
                        jQuery('#poll'+pollid).html(response);
                        jQuery('#pollsc'+pollid).html(response);
                    }
                );
            }
        else 
        //jAlert("Sorry! Maximum no of answers allowed is " + maxnoanswers, "Error message");
        swal("Sorry! Maximum no of answers allowed is " + maxnoanswers, null, "warning");
    }
    if(answertype == 'one')
    {
        var answersCheckedCount = jQuery("#poll"+ pollid +" input[type=radio]:checked").length;
        if(answersCheckedCount < 1){
          //alert('Click on the different options to vote and view results');
          swal("Click on the different options to vote and view results", null, "warning");
          return false;
        }
        
        data = jQuery('#poll'+pollid).serialize();
        jQuery('#show-form'+pollid).fadeOut(500);
        jQuery('#show-results'+pollid).css('display', 'none');
        jQuery.post(ajaxurl, data,  
            function(response){
                jQuery('#poll'+pollid).html(response);
                jQuery('#pollsc'+pollid).html(response);
            }
        ); 
    }
}


function vote_poll_sc(pollid, answertype, maxnoanswers){
  
    if(answertype == 'multiple')
    {
        data = jQuery('#pollsc'+pollid).serialize();
        var n=data.match(/option/g);
        if(parseInt(n.length) <= parseInt(maxnoanswers))
            {
                jQuery('#show-form'+pollid).fadeOut(500);
                jQuery('#show-results'+pollid).css('display', 'none');
                jQuery.post(ajaxurl, data,  
                    function(response){
                        jQuery('#poll'+pollid).html(response);
                        jQuery('#pollsc'+pollid).html(response);
                    }
                );
            }
        else 
          swal("Sorry! Maximum no of answers allowed is " + maxnoanswers, null, "warning");
        //jAlert("Sorry! Maximum no of answers allowed is " + maxnoanswers, "Error message");
        
    }
    if(answertype == 'one')
    {
        data = jQuery('#pollsc'+pollid).serialize();
        jQuery('#show-form'+pollid).fadeOut(500);
        jQuery('#show-results'+pollid).css('display', 'none');
        jQuery.post(ajaxurl, data,  
            function(response){
                jQuery('#poll'+pollid).html(response);
                jQuery('#pollsc'+pollid).html(response);
            }
        ); 
    }    
}




function wdd_base64_decode (data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_decode
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['btoa'] == 'function') {
    //    return btoa(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    dec = wdd_utf8_decode(dec);

    return dec;
}

function wdd_utf8_decode (str_data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}

// history plugin
window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a,b){"use strict";var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b,c){d(a).trigger(b,c)},extractEventData:function(a,c,d){var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;return e},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()}(window),function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c;return c=a===b,c},g.saveHash=function(a){return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)},g.getHashByIndex=function(a){var b=null;return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e;return e={discardedState:a,backState:c,forwardState:b},g.discardedStates[d]=e,!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};return g.discardedHashes[a]=d,!0},g.discardedState=function(a){var b=g.getHashByState(a),c;return c=g.discardedStates[b]||!1,c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);return g.discardedState(a)&&delete g.discardedStates[b],!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="",d,e,h,i;return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0}):g.checkerFunction=function(){var c=g.getHash();return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),!0},g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null,j;return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f}),!1;g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();return g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h),i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d}),!1;g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);return g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1),!0}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})},typeof g.init!="undefined"&&g.init()}(window),function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()}(window)


// sweet alert
!function(){function e(){var e='<div class="sweet-overlay"></div><div class="sweet-alert"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><button class="cancel">Cancel</button><button class="confirm">OK</button></div>',t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t)}function t(e){var t=l(),n=t.querySelector("h2"),a=t.querySelector("p"),r=t.querySelector("button.cancel"),o=t.querySelector("button.confirm");if(n.innerHTML=m(e.title),a.innerHTML=m(e.text||""),e.text&&y(a),f(t.querySelectorAll(".icon")),e.type){for(var i=!1,s=0;s<c.length;s++)if(e.type===c[s]){i=!0;break}if(!i)return window.console.error("Unknown alert type: "+e.type),!1;var d=t.querySelector(".icon."+e.type);switch(y(d),e.type){case"success":u(d,"animate"),u(d.querySelector(".tip"),"animateSuccessTip"),u(d.querySelector(".long"),"animateSuccessLong");break;case"error":u(d,"animateErrorIcon"),u(d.querySelector(".x-mark"),"animateXMark");break;case"warning":u(d,"pulseWarning"),u(d.querySelector(".body"),"pulseWarningIns"),u(d.querySelector(".dot"),"pulseWarningIns")}}if(e.imageUrl){var p=t.querySelector(".icon.custom");p.style.backgroundImage="url("+e.imageUrl+")",y(p);var g=80,v=80;if(e.imageSize){var w=e.imageSize.split("x")[0],S=e.imageSize.split("x")[1];w&&S?(g=w,v=S,p.css({width:w+"px",height:S+"px"})):window.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+g+"px; height:"+v+"px")}e.showCancelButton?r.style.display="inline-block":f(r),e.cancelButtonText&&(r.innerHTML=m(e.cancelButtonText)),e.confirmButtonText&&(o.innerHTML=m(e.confirmButtonText)),t.setAttribute("data-allow-ouside-click",e.allowOutsideClick);var x=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",x)}function n(){var e=l();S(document.querySelector(i),10),y(e),u(e,"showSweetAlert"),d(e,"hideSweetAlert"),setTimeout(function(){u(e,"visible")},500)}function a(){var e=l();x(document.querySelector(i),5),x(e,5),d(e,"showSweetAlert"),u(e,"hideSweetAlert"),d(e,"visible");var t=e.querySelector(".icon.success");d(t,"animate"),d(t.querySelector(".tip"),"animateSuccessTip"),d(t.querySelector(".long"),"animateSuccessLong");var n=e.querySelector(".icon.error");d(n,"animateErrorIcon"),d(n.querySelector(".x-mark"),"animateXMark");var a=e.querySelector(".icon.warning");d(a,"pulseWarning"),d(a.querySelector(".body"),"pulseWarningIns"),d(a.querySelector(".dot"),"pulseWarningIns")}function r(){var e=l();e.style.marginTop=w(l())}var o=".sweet-alert",i=".sweet-overlay",c=["error","warning","info","success"],l=function(){return document.querySelector(o)},s=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},u=function(e,t){s(e,t)||(e.className+=" "+t)},d=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(s(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},m=function(e){var t=document.createElement("div");return t.appendChild(document.createTextNode(e)),t.innerHTML},p=function(e){e.style.opacity="",e.style.display="block"},y=function(e){if(e&&!e.length)return p(e);for(var t=0;t<e.length;++t)p(e[t])},g=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return g(e);for(var t=0;t<e.length;++t)g(e[t])},v=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},w=function(e){e.style.left="-9999px",e.style.display="block";var t=e.clientHeight,n=parseInt(getComputedStyle(e).getPropertyValue("padding"),10);return e.style.left="",e.style.display="none","-"+parseInt(t/2+n)+"px"},S=function(e,t){var t=t||16;e.style.opacity=0,e.style.display="block";var n=+new Date,a=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(a,t)};a()},x=function(e,t){var t=t||16;e.style.opacity=1;var n=+new Date,a=function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(a,t):e.style.display="none"};a()};window.sweetAlert=function(){var e={title:"",text:"",type:null,allowOutsideClick:!1,showCancelButton:!1,confirmButtonText:"OK",cancelButtonText:"Cancel",imageUrl:null,imageSize:null};if(void 0===arguments[0])return window.console.error("sweetAlert expects at least 1 attribute!"),!1;switch(typeof arguments[0]){case"string":e.title=arguments[0],e.text=arguments[1]||"",e.type=arguments[2]||"";break;case"object":if(void 0===arguments[0].title)return window.console.error('Missing "title" argument!'),!1;e.title=arguments[0].title,e.text=arguments[0].text||e.text,e.type=arguments[0].type||e.type,e.allowOutsideClick=arguments[0].allowOutsideClick||e.allowOutsideClick,e.showCancelButton=arguments[0].showCancelButton||e.showCancelButton,e.showCancelButton&&(e.confirmButtonText="Confirm"),e.confirmButtonText=arguments[0].confirmButtonText||e.confirmButtonText,e.cancelButtonText=arguments[0].cancelButtonText||e.cancelButtonText,e.imageUrl=arguments[0].imageUrl||e.imageUrl,e.imageSize=arguments[0].imageSize||e.imageSize,e.doneFunction=arguments[1]||null;break;default:return window.console.error('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}t(e),r(),n();for(var o=l(),i=function(t){var n=t.target||t.srcElement,r="confirm"===n.className,i=s(o,"visible"),c=e.doneFunction&&"true"===o.getAttribute("data-has-done-function");r&&c&&i&&e.doneFunction(),a()},c=o.querySelectorAll("button"),u=0;u<c.length;u++)c[u].onclick=i;document.onclick=function(e){var t=e.target||e.srcElement,n=o===t,r=v(o,e.target),i=s(o,"visible"),c="true"===o.getAttribute("data-allow-ouside-click");!n&&!r&&i&&c&&a()}},window.swal=window.sweetAlert,document.addEventListener?document.addEventListener("DOMContentLoaded",function h(){document.removeEventListener("DOMContentLoaded",arguments.callee,!1),e()},!1):document.attachEvent&&document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),e())})}();

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+css-extras+clike+javascript+php+scss&plugins=show-invisibles */
self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var i=r[e],l={};for(var o in i)if(i.hasOwnProperty(o)){if(o==n)for(var s in a)a.hasOwnProperty(s)&&(l[s]=a[s]);l[o]=i[o]}return r[e]=l},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(a,r,i){for(var l,o,s=a;s&&!e.test(s.className);)s=s.parentNode;if(s&&(l=(s.className.match(e)||[,""])[1],o=t.languages[l]),o){a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,s=a.parentNode,/pre/i.test(s.nodeName)&&(s.className=s.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var c=a.textContent;if(c){var g={element:a,language:l,grammar:o,code:c};if(t.hooks.run("before-highlight",g),r&&self.Worker){var u=new Worker(t.filename);u.onmessage=function(e){g.highlightedCode=n.stringify(JSON.parse(e.data),l),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(g.element),t.hooks.run("after-highlight",g)},u.postMessage(JSON.stringify({language:g.language,code:g.code}))}else g.highlightedCode=t.highlight(g.code,g.grammar,g.language),t.hooks.run("before-insert",g),g.element.innerHTML=g.highlightedCode,i&&i.call(a),t.hooks.run("after-highlight",g)}}},highlight:function(e,a,r){var i=t.tokenize(e,a);return n.stringify(t.util.encode(i),r)},tokenize:function(e,n){var a=t.Token,r=[e],i=n.rest;if(i){for(var l in i)n[l]=i[l];delete n.rest}e:for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var o=n[l];o="Array"===t.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var c=o[s],g=c.inside,u=!!c.lookbehind,f=0,h=c.alias;c=c.pattern||c;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){c.lastIndex=0;var m=c.exec(d);if(m){u&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),N=[p,1];b&&N.push(b);var O=new a(l,g?t.tokenize(m,g):m,h);N.push(O),w&&N.push(w),Array.prototype.splice.apply(r,N)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var i={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}t.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+o+">"+i.content+"</"+i.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[a])))),self.close()},!1),self.Prism):self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class":/:[-\w]+(?:\(.*\))?/g,"class":/\.[-:\.\w]+/g,id:/#[-:\.\w]+/g}},Prism.languages.insertBefore("css","ignore",{hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/[\d%\.]+/g});;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});;
Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant:/\b[A-Z0-9_]{2,}\b/g,comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind:!0}}),Prism.languages.insertBefore("php","keyword",{delimiter:/(\?>|<\?php|<\?)/gi,variable:/(\$\w+)\b/gi,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/g,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(n){return e.tokenStack.push(n),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var n,a=0;n=e.tokenStack[a];a++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(a+1)+"}}}",Prism.highlight(n,e.grammar,"php"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/g,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/g}));;
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","ignore",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g});;
!function(){if(window.Prism)for(var r in Prism.languages){var a=Prism.languages[r];a.tab=/\t/g,a.lf=/\n/g,a.cr=/\r/g}}();;

/* AUTOCOMPLETE */
/**
*  Ajax Autocomplete for jQuery, version 1.2.14
*  (c) 2014 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports&&"function"==typeof require?require("jquery"):jQuery)}(function(a){"use strict";function b(c,d){var e=function(){},f=this,g={ajaxSettings:{},autoSelectFirst:!1,appendTo:document.body,serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:b.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:e,onSearchComplete:e,onSearchError:e,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:function(a,b,c){return-1!==a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(b){return"string"==typeof b?a.parseJSON(b):b},showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1};f.element=c,f.el=a(c),f.suggestions=[],f.badQueries=[],f.selectedIndex=-1,f.currentValue=f.element.value,f.intervalId=0,f.cachedResponse={},f.onChangeInterval=null,f.onChange=null,f.isLocal=!1,f.suggestionsContainer=null,f.noSuggestionsContainer=null,f.options=a.extend({},g,d),f.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},f.hint=null,f.hintValue="",f.selection=null,f.initialize(),f.setOptions(d)}var c=function(){return{escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},createNode:function(a){var b=document.createElement("div");return b.className=a,b.style.position="absolute",b.style.display="none",b}}}(),d={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40};b.utils=c,a.Autocomplete=b,b.formatResult=function(a,b){var d="("+c.escapeRegExChars(b)+")";return a.value.replace(new RegExp(d,"gi"),"<strong>$1</strong>")},b.prototype={killerFn:null,initialize:function(){var c,d=this,e="."+d.classes.suggestion,f=d.classes.selected,g=d.options;d.element.setAttribute("autocomplete","off"),d.killerFn=function(b){0===a(b.target).closest("."+d.options.containerClass).length&&(d.killSuggestions(),d.disableKillerFn())},d.noSuggestionsContainer=a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),d.suggestionsContainer=b.utils.createNode(g.containerClass),c=a(d.suggestionsContainer),c.appendTo(g.appendTo),"auto"!==g.width&&c.width(g.width),c.on("mouseover.autocomplete",e,function(){d.activate(a(this).data("index"))}),c.on("mouseout.autocomplete",function(){d.selectedIndex=-1,c.children("."+f).removeClass(f)}),c.on("click.autocomplete",e,function(){d.select(a(this).data("index"))}),d.fixPositionCapture=function(){d.visible&&d.fixPosition()},a(window).on("resize.autocomplete",d.fixPositionCapture),d.el.on("keydown.autocomplete",function(a){d.onKeyPress(a)}),d.el.on("keyup.autocomplete",function(a){d.onKeyUp(a)}),d.el.on("blur.autocomplete",function(){d.onBlur()}),d.el.on("focus.autocomplete",function(){d.onFocus()}),d.el.on("change.autocomplete",function(a){d.onKeyUp(a)})},onFocus:function(){var a=this;a.fixPosition(),a.options.minChars<=a.el.val().length&&a.onValueChange()},onBlur:function(){this.enableKillerFn()},setOptions:function(b){var c=this,d=c.options;a.extend(d,b),c.isLocal=a.isArray(d.lookup),c.isLocal&&(d.lookup=c.verifySuggestionsFormat(d.lookup)),d.orientation=c.validateOrientation(d.orientation,"bottom"),a(c.suggestionsContainer).css({"max-height":d.maxHeight+"px",width:d.width+"px","z-index":d.zIndex})},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var a=this;a.disabled=!0,clearInterval(a.onChangeInterval),a.currentRequest&&a.currentRequest.abort()},enable:function(){this.disabled=!1},fixPosition:function(){var b=this,c=a(b.suggestionsContainer),d=c.parent().get(0);if(d===document.body||b.options.forceFixPosition){var e=b.options.orientation,f=c.outerHeight(),g=b.el.outerHeight(),h=b.el.offset(),i={top:h.top,left:h.left};if("auto"==e){var j=a(window).height(),k=a(window).scrollTop(),l=-k+h.top-f,m=k+j-(h.top+g+f);e=Math.max(l,m)===l?"top":"bottom"}if(i.top+="top"===e?-f:g,d!==document.body){var n,o=c.css("opacity");b.visible||c.css("opacity",0).show(),n=c.offsetParent().offset(),i.top-=n.top,i.left-=n.left,b.visible||c.css("opacity",o).hide()}"auto"===b.options.width&&(i.width=b.el.outerWidth()-2+"px"),c.css(i)}},enableKillerFn:function(){var b=this;a(document).on("click.autocomplete",b.killerFn)},disableKillerFn:function(){var b=this;a(document).off("click.autocomplete",b.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions(),a.intervalId=window.setInterval(function(){a.hide(),a.stopKillSuggestions()},50)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},isCursorAtEnd:function(){var a,b=this,c=b.el.val().length,d=b.element.selectionStart;return"number"==typeof d?d===c:document.selection?(a=document.selection.createRange(),a.moveStart("character",-c),c===a.text.length):!0},onKeyPress:function(a){var b=this;if(!b.disabled&&!b.visible&&a.which===d.DOWN&&b.currentValue)return void b.suggest();if(!b.disabled&&b.visible){switch(a.which){case d.ESC:b.el.val(b.currentValue),b.hide();break;case d.RIGHT:if(b.hint&&b.options.onHint&&b.isCursorAtEnd()){b.selectHint();break}return;case d.TAB:if(b.hint&&b.options.onHint)return void b.selectHint();case d.RETURN:if(-1===b.selectedIndex)return void b.hide();if(b.select(b.selectedIndex),a.which===d.TAB&&b.options.tabDisabled===!1)return;break;case d.UP:b.moveUp();break;case d.DOWN:b.moveDown();break;default:return}a.stopImmediatePropagation(),a.preventDefault()}},onKeyUp:function(a){var b=this;if(!b.disabled){switch(a.which){case d.UP:case d.DOWN:return}clearInterval(b.onChangeInterval),b.currentValue!==b.el.val()&&(b.findBestHint(),b.options.deferRequestBy>0?b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy):b.onValueChange())}},onValueChange:function(){var b,c=this,d=c.options,e=c.el.val(),f=c.getQuery(e);return c.selection&&c.currentValue!==f&&(c.selection=null,(d.onInvalidateSelection||a.noop).call(c.element)),clearInterval(c.onChangeInterval),c.currentValue=e,c.selectedIndex=-1,d.triggerSelectOnValidInput&&(b=c.findSuggestionIndex(f),-1!==b)?void c.select(b):void(f.length<d.minChars?c.hide():c.getSuggestions(f))},findSuggestionIndex:function(b){var c=this,d=-1,e=b.toLowerCase();return a.each(c.suggestions,function(a,b){return b.value.toLowerCase()===e?(d=a,!1):void 0}),d},getQuery:function(b){var c,d=this.options.delimiter;return d?(c=b.split(d),a.trim(c[c.length-1])):b},getSuggestionsLocal:function(b){var c,d=this,e=d.options,f=b.toLowerCase(),g=e.lookupFilter,h=parseInt(e.lookupLimit,10);return c={suggestions:a.grep(e.lookup,function(a){return g(a,b,f)})},h&&c.suggestions.length>h&&(c.suggestions=c.suggestions.slice(0,h)),c},getSuggestions:function(b){var c,d,e,f,g=this,h=g.options,i=h.serviceUrl;if(h.params[h.paramName]=b,d=h.ignoreParams?null:h.params,h.onSearchStart.call(g.element,h.params)!==!1){if(a.isFunction(g.lookup))return void g.lookup(b,function(a){g.suggestions=a.suggestions,g.suggest(),h.onSearchComplete.call(g.element,b,a.suggestions)});g.isLocal?c=g.getSuggestionsLocal(b):(a.isFunction(i)&&(i=i.call(g.element,b)),e=i+"?"+a.param(d||{}),c=g.cachedResponse[e]),c&&a.isArray(c.suggestions)?(g.suggestions=c.suggestions,g.suggest(),h.onSearchComplete.call(g.element,b,c.suggestions)):g.isBadQuery(b)?h.onSearchComplete.call(g.element,b,[]):(g.currentRequest&&g.currentRequest.abort(),f={url:i,data:d,type:h.type,dataType:h.dataType},a.extend(f,h.ajaxSettings),g.currentRequest=a.ajax(f).done(function(a){var c;g.currentRequest=null,c=h.transformResult(a),g.processResponse(c,b,e),h.onSearchComplete.call(g.element,b,c.suggestions)}).fail(function(a,c,d){h.onSearchError.call(g.element,b,a,c,d)}))}},isBadQuery:function(a){if(!this.options.preventBadQueries)return!1;for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){var b=this;b.visible=!1,b.selectedIndex=-1,clearInterval(b.onChangeInterval),a(b.suggestionsContainer).hide(),b.signalHint(null)},suggest:function(){if(0===this.suggestions.length)return void(this.options.showNoSuggestionNotice?this.noSuggestions():this.hide());var b,c,d=this,e=d.options,f=e.groupBy,g=e.formatResult,h=d.getQuery(d.currentValue),i=d.classes.suggestion,j=d.classes.selected,k=a(d.suggestionsContainer),l=a(d.noSuggestionsContainer),m=e.beforeRender,n="",o=function(a){var c=a.data[f];return b===c?"":(b=c,'<div class="autocomplete-group"><strong>'+b+"</strong></div>")};return e.triggerSelectOnValidInput&&(c=d.findSuggestionIndex(h),-1!==c)?void d.select(c):(a.each(d.suggestions,function(a,b){f&&(n+=o(b,h,a)),n+='<div class="'+i+'" data-index="'+a+'">'+g(b,h)+"</div>"}),this.adjustContainerWidth(),l.detach(),k.html(n),a.isFunction(m)&&m.call(d.element,k),d.fixPosition(),k.show(),e.autoSelectFirst&&(d.selectedIndex=0,k.scrollTop(0),k.children().first().addClass(j)),d.visible=!0,void d.findBestHint())},noSuggestions:function(){var b=this,c=a(b.suggestionsContainer),d=a(b.noSuggestionsContainer);this.adjustContainerWidth(),d.detach(),c.empty(),c.append(d),b.fixPosition(),c.show(),b.visible=!0},adjustContainerWidth:function(){var b,c=this,d=c.options,e=a(c.suggestionsContainer);"auto"===d.width&&(b=c.el.outerWidth()-2,e.width(b>0?b:300))},findBestHint:function(){var b=this,c=b.el.val().toLowerCase(),d=null;c&&(a.each(b.suggestions,function(a,b){var e=0===b.value.toLowerCase().indexOf(c);return e&&(d=b),!e}),b.signalHint(d))},signalHint:function(b){var c="",d=this;b&&(c=d.currentValue+b.value.substr(d.currentValue.length)),d.hintValue!==c&&(d.hintValue=c,d.hint=b,(this.options.onHint||a.noop)(c))},verifySuggestionsFormat:function(b){return b.length&&"string"==typeof b[0]?a.map(b,function(a){return{value:a,data:null}}):b},validateOrientation:function(b,c){return b=a.trim(b||"").toLowerCase(),-1===a.inArray(b,["auto","bottom","top"])&&(b=c),b},processResponse:function(a,b,c){var d=this,e=d.options;a.suggestions=d.verifySuggestionsFormat(a.suggestions),e.noCache||(d.cachedResponse[c]=a,e.preventBadQueries&&0===a.suggestions.length&&d.badQueries.push(b)),b===d.getQuery(d.currentValue)&&(d.suggestions=a.suggestions,d.suggest())},activate:function(b){var c,d=this,e=d.classes.selected,f=a(d.suggestionsContainer),g=f.find("."+d.classes.suggestion);return f.find("."+e).removeClass(e),d.selectedIndex=b,-1!==d.selectedIndex&&g.length>d.selectedIndex?(c=g.get(d.selectedIndex),a(c).addClass(e),c):null},selectHint:function(){var b=this,c=a.inArray(b.hint,b.suggestions);b.select(c)},select:function(a){var b=this;b.hide(),b.onSelect(a)},moveUp:function(){var b=this;if(-1!==b.selectedIndex)return 0===b.selectedIndex?(a(b.suggestionsContainer).children().first().removeClass(b.classes.selected),b.selectedIndex=-1,b.el.val(b.currentValue),void b.findBestHint()):void b.adjustScroll(b.selectedIndex-1)},moveDown:function(){var a=this;a.selectedIndex!==a.suggestions.length-1&&a.adjustScroll(a.selectedIndex+1)},adjustScroll:function(b){var c=this,d=c.activate(b);if(d){var e,f,g,h=a(d).outerHeight();e=d.offsetTop,f=a(c.suggestionsContainer).scrollTop(),g=f+c.options.maxHeight-h,f>e?a(c.suggestionsContainer).scrollTop(e):e>g&&a(c.suggestionsContainer).scrollTop(e-c.options.maxHeight+h),c.el.val(c.getValue(c.suggestions[b].value)),c.signalHint(null)}},onSelect:function(b){var c=this,d=c.options.onSelect,e=c.suggestions[b];c.currentValue=c.getValue(e.value),c.currentValue!==c.el.val()&&c.el.val(c.currentValue),c.signalHint(null),c.suggestions=[],c.selection=e,a.isFunction(d)&&d.call(c.element,e)},getValue:function(a){var b,c,d=this,e=d.options.delimiter;return e?(b=d.currentValue,c=b.split(e),1===c.length?a:b.substr(0,b.length-c[c.length-1].length)+a):a},dispose:function(){var b=this;b.el.off(".autocomplete").removeData("autocomplete"),b.disableKillerFn(),a(window).off("resize.autocomplete",b.fixPositionCapture),a(b.suggestionsContainer).remove()}},a.fn.autocomplete=a.fn.devbridgeAutocomplete=function(c,d){var e="autocomplete";return 0===arguments.length?this.first().data(e):this.each(function(){var f=a(this),g=f.data(e);"string"==typeof c?g&&"function"==typeof g[c]&&g[c](d):(g&&g.dispose&&g.dispose(),g=new b(this,c),f.data(e,g))})}});