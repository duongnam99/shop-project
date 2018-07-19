$(function() {
    if($(window).width() > 992) {
        $(window).scroll(function(event){
            if($(this).scrollTop() > 56) {
                $('.head nav').addClass('menu-change');
            }else {
                $('.head nav').removeClass('menu-change');
            }
        })
    } 
    
    $('.add').click(function(event){
        $('#myModal').css('display', 'block');
    })
    $('.close').click(function(event){
        $('#myModal').css('display', 'none');
    })
})