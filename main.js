var myElement = document.querySelector("header");
// 创建 Headroom 对象，将页面元素传递进去
var headroom = new Headroom(myElement, {
  "tolerance": 0,
  "offset": $(window).height(),
  "classes": {
    "initial": "animated",
    "pinned": "fadeInDown",
    "unpinned": "fadeOutUp"
  }
});
//headroom内容

var navigation = responsiveNav("#nav", { // Selector: The ID of the wrapper
  animate: true, // Boolean: 是否启动CSS过渡效果（transitions）， true 或 false
  transition: 400, // Integer: 过渡效果的执行速度，以毫秒（millisecond）为单位
  label: "菜单", // String: Label for the navigation toggle
  insert: "", // String: Insert the toggle before or after the navigation
  customToggle: "", // Selector: Specify the ID of a custom toggle
  openPos: "relative", // String: Position of the opened nav, relative or static
  jsClass: "js", // String: 'JS enabled' class which is added to <html> el
  debug: false, // Boolean: Log debug messages to console, true 或 false
  init: function(){}, // Function: Init callback
  open: function(){}, // Function: Open callback
  close: function(){} // Function: Close callback
});


/*
$('.form-control').focus(function() {
  $(this).parents('.input-group').addClass('focus');
});
$('.form-control').focusout(function() {
  $(this).parents('.input-group').removeClass('focus');
});
*/
/*上面的是搜索框的样式 */

//$("select").select2({dropdownCssClass: 'dropdown-inverse'});
//这个暂时也没用


$('#top').click(function() {
  $("html,body").stop(true);
  $('body,html').animate({scrollTop:0},600);
});
//回到顶部

$('.nav-btn').click(function(e) {
  e.preventDefault();
  moveScroll($(this).attr('href'));
});
//导航栏按钮

$(window).scroll(function(){
  scrollHeaderChange();
});
$(window).resize(function() {
  var resizedelay = setTimeout(resizeAdjust(),50);
});


function scrollHeaderChange ()
{
  if ($(window).width()>639) {
    if ($(window).scrollTop()>$(window).height()-70){
      $('.header--absolute').removeClass('header--absolute').addClass('header--fixed');
    }else{
      $('.header--fixed').removeClass('header--fixed').addClass('header--absolute');
    }
  }else{
    $('.header--absolute').removeClass('header--absolute').addClass('header--fixed');
    if($('html').hasClass('js-nav-active')){
      navigation.close();
    }
    //收起导航栏
  }
  if ($(window).scrollTop()>($(window).height()+150)){
    if($('#top').hasClass('tophide')){
      $('#top').removeClass('tophide').addClass('topshow');
    }
  }else{
    if($('#top').hasClass('topshow')){
      $('#top').removeClass('topshow').addClass('tophide');
    }
  }
}
function resizeAdjust ()
{
  headroom.offset = $(window).height();
  $('#headimg').css('height', $(window).height());
  if ($(window).width()>639){
    headroom.init();
    $('.header--fixed').removeClass('header--fixed').addClass('header--absolute');
  }else{
    headroom.destroy();
    $('.header--absolute').removeClass('header--absolute').addClass('header--fixed');
  };
};
function moveScroll(id)
{
  $("html,body").stop(true);
  $("html,body").animate({scrollTop: $(id).offset().top}, 400);
};

var musicPool = [
  {
    name: 'ネリの星空',
    src: 'http://data.5sing.kgimg.com/G075/M05/0D/13/64YBAFe92raAG7_RAGdizUa58yE685.mp3',
  },
  {
    name: '风向仪',
    src: 'http://data2.5sing.kgimg.com/T1CxYLBCdT1R47IVrK.mp3',
  },
];
var musicIndex = 0;
var musicToggle = 0;
var initNum = true;
var musicBlock = $('#music')[0];
$('#musiccontrol').click(function(e) {
  e.preventDefault();
  if(musicToggle){
    musicPause();
    $('#musiccontrol').removeClass('musicstop').addClass('musicplay');
  }else{
    musicPlay();
    $('#musiccontrol').removeClass('musicplay').addClass('musicstop');
    if (initNum) {
      document.getElementById('musiccontrol').innerHTML = "";
      initNum = false;
    };
  }
});
musicBlock.addEventListener("ended",function(event) {
  nextMusic();
});
function nextMusic () {
  if(arguments[0] || false){musicIndex = musicPool.length-1}
  if(musicIndex<musicPool.length-1){
    musicIndex++;
  }else{
    musicIndex = 0;
  }
  musicBlock.src = musicPool[musicIndex].src;
  $('#musiccontrol').removeClass('musicplay').addClass('musicstop');
  musicPlay();
}
function musicPlay () {
  try{
    musicBlock.play();
  }catch(e){
    nextMusic();
  }
  musicToggle = 1;
}
function musicPause () {
  musicBlock.pause();
  musicToggle = 0;
}

function initialize ()
{
  $('#headimg').css('height', $(window).height());//首页大小
  scrollHeaderChange();
  resizeAdjust();
  musicBlock.src = musicPool[0].src;
}
initialize ();
