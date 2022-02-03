$(document).ready(function () {
  setTimeout(function () {
    $('.load').fadeOut(500);
  }, 2000);
  setTimeout(function () {
    ani();
  }, 2500)
});
$(function () {
  // [側邊選單]
  var $sidenav = $('.sidenav');
  // [側邊選單]--// 收合
  $sidenav.on('click', '.sidenav__btn a', function (e) {
    e.preventDefault();
    $(this).parents('.sidenav').toggleClass('sidenav--hide');
  });

  // [右邊選單]
  var $rightNav = $('.sidenav--right');
  // [右邊選單]--// 側選單是否存在
  var $sidenavTop = $rightNav.length > 0 ? $rightNav.offset().top : 0;
  // [右邊選單]--// 手機版置頂
  function rightnavFixedTop() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop > $sidenavTop) {
      $sidenav.addClass('fixed');
      $('.wrap').addClass('addPadding');
    } else {
      $sidenav.removeClass('fixed');
      $('.wrap').removeClass('addPadding');
    }
  }

  // [右邊GoTop]--// 滾動出現
  function goTopShow() {
    var $windowTop = $(window).scrollTop();
    $windowTop >= 100 ? $('.gotop').addClass('show') : $('.gotop').removeClass('show');
  }
  // [右邊GoTop]--// gotop
  $('.gotop').on('click', function () {
    $('html,body').animate({ scrollTop: '0px' }, 300);
   
    setTimeout(goTop,500)
    
  });

  // [錨點]--// 判斷滑動位置
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var headerH = $('.header').height();
    var sidenavH = $('.sidenav').height();
    var targetTop = $($(this).attr('href')).offset().top;
    var scrollPos = $(window).width() >= 768 ? targetTop : targetTop - headerH - sidenavH;
    $('html, body').stop().animate(
      {
        scrollTop: scrollPos,
      },
      300
    );
  });

  $(window)
    .on('scroll', function () {
      goTopShow();
      $(window).width() < 768 && rightnavFixedTop();
    })
    .scroll();
});


// 停止頁籤跳轉
$('#pills-tab a').on('click', function (event) {
  event.preventDefault()
  $(this).tab('show');

})


// 輪播
var swiper = new Swiper(".swiper-container", {
  autoplay: {
    disableOnInteraction:false,
    delay: 1000,
  },
  breakpoints: {
    2560: {
      slidesPerView: 4,

    },
    768: {
      slidesPerView: 3,

    },
  }

});

function ani() {
  if ($(window).width() > 768) {
    gsap.to('.icon5', { duration: 0.5, x: 0 })
    gsap.to('.icon4', { duration: 0.5, x: 0 })
    gsap.to('.light1 , .light2', { duration: 0.4, scale: 1, ease: "bounce.out", delay: 0.5 })
    gsap.to('.icon1', { duration: 1, rotate: 1080, }, 1.2)
    
  }
  if ($(window).width() < 768) {

    gsap.to('.icon4', { duration: 0.5, x: 0 })
    gsap.to('.light2', { duration: 0.4, scale: 1, ease: "bounce.out", stagger: 0.2 }, 1)
    gsap.to('.icon1', { duration: 1, rotate: 1080, }, 1.2)

    var item = document.getElementsByClassName('slide_box');
    var index = 0;
    function showItem() {
      if (index == 1) {
        index = 0;
      } else {
        index++;
      }
      //清除items裡面的kyrie-active
      for (var i = 0; i < item.length; i++) {
        item[i].classList.remove("kyrie_active");
      }

      item[index].classList.add("kyrie_active"); //點選到的套用顯示的css kyrie-active
    }
    var gogo = setInterval(showItem, 3000);
  }


}

function goTop() {
  let t1 = gsap.timeline();
  var x = 0;
  if ($(window).width() > 768) {
    t1.to('.icon1',{duration:0.5,rotate:720})
    .to('.light1',{duration:0.1,x:-10 ,repeat:3, yoyo:true},0.2)
    .to('.light2',{duration:0.1,x:-10 ,repeat:3, yoyo:true},0.3)
    .to('.icon1',{clearProps:"all"})

  }
  if ($(window).width() < 768) {
    t1.to('.icon1',{duration:0.5,rotate:720})
    .to('.light2',{duration:0.1,x:-5 ,repeat:3, yoyo:true},0.3)
    .to('.icon1',{clearProps:"all"})
  }
}