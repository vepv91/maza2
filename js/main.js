var checkColor 	= 0,
	checkSize 	= 0;
var curIMGIndex, urlIMGFull, lengthSlider;

$('.storeBlockMain').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    speed: 500,
		arrows: true, 
		dots: false,
    responsive:[{
	  	breakpoint: 768,
		  	settings: {
		  		slidesToShow: 2,
    			slidesToScroll: 1
		  	}
		}
	]
});
$('.nav4sliderIMG ul').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    speed: 500,
	arrows: false, 
	dots: false,
	asNavFor: '.sliderIMG ul',
	vertical:true,
	verticalSwiping: true,
	focusOnSelect: true,
	responsive:[{
	  	breakpoint: 768,
		  	settings: {
		  		slidesToShow: 4
		  	}
		},{
	  	breakpoint: 480,
		  	settings: {
		  		vertical:false,
				verticalSwiping: false,
				centerMode: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				centerPadding: '0px'
		  	}
		}
	]
});
$('.sliderIMG ul').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 500,
	arrows: true, 
	dots: false,
	asNavFor: '.nav4sliderIMG ul',
    responsive:[{
	  	breakpoint: 480,
		  	settings: {
		  		slidesToShow: 1,
    			slidesToScroll: 1,
    			dots: false
		  	}
		}
	]
});
$('.recommendList').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
	arrows: false, 
	dots: false
});
$('.relatedList').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
	arrows: true, 
	dots: false,
	autoplay: true,
	responsive:[{
	  	breakpoint: 480,
		  	settings: {
		  		slidesToShow: 1,
		  		centerMode: true,
		  		arrows: false,
		  		centerPadding: '15%'
		  	}
		},{
	    breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
	    }
	]
});
$(function(){ // this function for responsive on mobile devices - please dont edit this
	if($(window).width() < 992){
		var cloneMainDetail = $('.detailProductText').clone();
		$('.detailProductText').remove();
		$('.detailInfo').append(cloneMainDetail);
	}
	if($(window).width() < 768){
		//clone #mainSearchForm for mobile devices
		var idSearchForm = $('.searchForm #mainSearchForm'),
		 	cloneSearchForm = $(idSearchForm).clone();
		$('.searchForm').attr('onclick', 'showHide("#mainSearchForm")');
		$('.iconList').append(cloneSearchForm);
		idSearchForm.remove();

		//addClass menuMobileClick to bind click event on mobile devices
		$('.mainMenu').addClass('menuMobileClick');
		menuOnMobile();
	}
	if($(window).width() < 480){
		$('#footer').addClass('footerMobile');
		collapseFooter();
		getPriceMobile();
		getFullSlider();
	}else{
		getFullSlider();
		$('.zoomOnHover').zoom(); //fix zoomHover detail page on mobile - edit 24.08
	}
});

function showHide(idElement){ //showHide element block
	var idElement	= $(idElement),
		flagSearch 	= idElement.is(':hidden');
	if(flagSearch)
		$(idElement).fadeIn('fast');
	else
		$(idElement).fadeOut('fast');
};
function collapseElement(idElement){ //collapse for footer
	var idElement	= $(idElement),
		flagSearch 	= idElement.is(':hidden');
	if(flagSearch)
		$(idElement).slideDown('fast');
	else
		$(idElement).slideUp('fast');
};
function menuOnMobile(){ // - please dont edit this
	var idMenuMobile = $('.menuMobileClick');
	idMenuMobile.find('.subMenu')
				.closest('li')
				.addClass('hasSubMenu');

	$('.hasSubMenu > a').click(function(){
		var thisSubMenu = $(this).closest('.hasSubMenu').find('.subMenu');
		idMenuMobile.find('.subMenu').hide('fast');
		if(thisSubMenu.is(':hidden'))
			thisSubMenu.show('fast');
		else
			thisSubMenu.hide('fast');
		return false;
	});
	$('.subMenuCol > h4 > a').click(function(){
		var thisSubMenu = $(this).closest('.subMenuCol').find('.subMenuList');
		idMenuMobile.find('.subMenuList').hide('fast');
		if(thisSubMenu.is(':hidden'))
			thisSubMenu.show('fast');
		else
			thisSubMenu.hide('fast');
		return false;
	});
};
function collapseFooter(){ // - please dont edit this
	$('.titleFooter').click(function(){
		$('#footer ul').slideUp('fast');
		if(!$(this).hasClass('activeFooter')){
			$(this).next('ul').slideDown('fast');
			$(this).next('ul').next('ul').slideDown('fast');
			$(this).addClass('activeFooter');
		}else{
			$(this).next('ul').slideUp('fast');
			$(this).next('ul').next('ul').slideUp('fast');
			$(this).removeClass('activeFooter');
		}
	});
};
function showSortBy(){ // - please dont edit this
	$('.sortBy').click(function(){
		if($(this).next('ul').is(':hidden')){
			$(this).next('ul').slideDown('fast');
			$(this).find('.activeArrow').text('▲');
		}else{
			$(this).next('ul').slideUp('fast');
			$(this).find('.activeArrow').text('▼');
		}
	});
};
function onChangeSortBy(){ //sortBy's onChange click event here
	$('.sortCategory ul li').click(function(){
		$(this).closest('ul').find('li').removeClass('active');
		$('.sortCategory ul li span').remove();
		$(this).addClass('active');
		$(this).prepend('<span>✔</span>');
		$('.selectedSortBy').text($(this).text().replace('✔', ''));
		$(this).closest('ul').slideUp('fast');
		$('.sortBy .activeArrow').text('▼');
	});
};
function rightFilterList(){ // - please dont edit this
	$('.filterList > li').click(function(){
		var filterListID = $(this).find('.filterDetail');
		$('.filterDetail').slideUp('fast');
		if(filterListID.is(':hidden')){
			filterListID.slideDown('fast');
			$(this).find('a').find('span').text('▲');
		}else{
			filterListID.slideUp('fast');
			$(this).find('a').find('span').text('▼');
		}
		return false;
	});
};
function onChangeCheckbox(idClick){ // - please dont edit this
	$(idClick).click(function(){
		var checkboxID = $(this).find('input');
		if(!checkboxID.is(':checked')){
			checkboxID.prop('checked', true);
		}else{
			checkboxID.prop('checked', false);
		}
		return false;
	});
};
function onChangeRightFilterList(){ //RightFilterList's onChange click event here
	onChangeCheckbox('.filterDetail ul li');
};
function showAllFilter(){ // - please dont edit this
	$('.allFilter').click(function(){
		collapseElement('.allFilterBlock');
		var spanArrow = $(this).find('.activeArrow');
		if(spanArrow.text() === '▲')
			spanArrow.text('▼');
		else
			spanArrow.text('▲');
		return false;
	});
};
function HTMLAllFilter(titleID, cloneListFilter){ // - please dont edit this
	var HTML = '';
		HTML += '<div class="col-md-3 col-sm-6 col-xs-12">';
		HTML += '<h4>'+titleID+'</h4>';
		HTML += cloneListFilter;
		HTML += '</div>';
	return HTML;
};
function getAllFilter(){ //auto get all filter - please dont edit this
	$('.filterList > li').each(function(){
		var titleFilter = $(this).find('a').text().replace('▼', ''),
			cloneListLI	= $(this).find('.filterDetail').clone().html();
	    $('.allFilterBlock .row').append(HTMLAllFilter(titleFilter,cloneListLI));
	});
};
function onChangeAllFilter(){ //AllFilter's onChange click event here - please dont edit this
	onChangeCheckbox('.allFilterBlock ul li');
};
function chooseColor(){ //Chọn màu sắc & kích cỡ
	$('.listColor li').click(function(){
		$('.listColor li').removeClass('active');
		$(this).addClass('active');
		$('.titleColor span').text($(this).text());
		checkColor = 1;
		$('.sumAlertColor').fadeOut('fast');
	});
	$('.listSize li').click(function(){
		$('.listSize li').removeClass('active');
		$(this).addClass('active');
		$('.titleSize span').text($(this).text());
		checkSize = 1;
		$('.sumAlertSize').fadeOut('fast');
	});
};
function tabs(){ //tab in detail page
	$('.detailProductText .tabs li').click(function(){
		var curIndex = $(this).index();
		$('.detailProductText .tabs li').removeClass('active');
		$('.detailProductText .tabContent').hide();
		$(this).addClass('active');
		$('.detailProductText .tabContent:eq('+curIndex+')').show();
	});
};
function getPriceMobile(){ //get bottom fixed price on mobile -  please dont edit this
	var HTML 		= '',
		oldPrice 	= $('.price .oldPrice').text(),
		discount 	= $('.price .discount').text(),
		newPrice 	= $('.price .newPrice').text();
	HTML += '<div class="mobileCTA">';
	HTML += '<div class="mobilePrice">';
	HTML += '<span class="mobileOldPrice">'+oldPrice+'</span>';
	HTML += '<span class="mobileNewPrice">'+newPrice+'<strong> '+discount+'</strong></span>';
	HTML += '</div>';
	HTML += '<input type="button" id="mobileAddtoCart"value="MUA NGAY" onclick="addToCart();">';
	HTML += '</div>';
	$('#detailPage').append(HTML);
};
function showHideCart(className){ //Show / hide popUp Cart
	var hrefLink = $(className).attr('href');
	if($(window).width() < 480)
		location.href = hrefLink;
	else
		showHide('.popUpCart');
};
function HTMLAddToCart(){ //HTML form add sản phẩm vô popUp Cart
	var HTML = '';
	HTML += '<li>';
	HTML += '<img src="images/img-detail.jpg" alt="">';
	HTML += '<div class="detailProCart">';
	HTML += '<h4>Áo Sơ Mi Nam Họa Tiết Caro Mới</h4>';
	HTML += '<div class="priceCart">';
	HTML += '<span>159.000đ</span>';
	HTML += '</div>';
	HTML += '<div class="colorCart">Màu sắc: ';
	HTML += '<span>Màu đỏ</span>';
	HTML += '</div>';
	HTML += '<div class="sizeCart">Kích cỡ: ';
	HTML += '<span>XL</span>';
	HTML += '</div>';
	HTML += '<div class="clearfix"></div>';
	HTML += '<a class="removeFromCart" onclick="removeFromCart(this);">Bỏ sản phẩm</a>';
	HTML += '</div>';
	HTML += '</li>';
	return HTML;
};
function HTMLAdd2CartMobile(){
	var HTML = '';
	HTML += '<div class="bgDialog"></div>';
	HTML += '<div class="mobileCartDialog">';
	HTML += '<div class="closeMBCart" onclick="dismissCartMobile();">&times;</div>'
	HTML += '<p>Sản phẩm đã được thêm vào giỏ hàng !</p>';
	HTML += '<input type="button" class="dismissCart" onclick="dismissCartMobile();" value="Tiếp tục mua sắm">';
	HTML += '<input type="button" value="Tiến hành đặt hàng">';
	HTML += '</div>';
	return HTML;
};
function dismissCartMobile(){
	$('.mobileCartDialog').remove();
	$('.bgDialog').remove();
};
function addToCart(){ //Thêm sản phẩm vào giỏ hàng - Trang detail
	if(checkColor > 0 && checkSize > 0){
		if($(window).width() < 640){
			$('.wrapper').append(HTMLAdd2CartMobile());
			var timeOut = setInterval(function() {
			    dismissCartMobile();
			    clearInterval(timeOut);
			}, 4000);
		}else{
			$('.popUpCart').fadeIn('fast');
			var timeOut1 = setInterval(function() {
			    $('.popUpCart ul').prepend(HTMLAddToCart());
			    clearInterval(timeOut1);
			}, 500);
			var timeOut2 = setInterval(function() {
			    $('.popUpCart').fadeOut('fast');
			    clearInterval(timeOut2);
			}, 4000);
		}
	}else{
		if(checkColor == 0)
			$('.sumAlertColor').fadeIn('fast');
		if(checkSize == 0)
			$('.sumAlertSize').fadeIn('fast');
		$(window).scrollTop($('.price').offset().top);
	}
};
function removeFromCart(thisID){ //Xóa sản phẩm ra khỏi popUp Cart 
	$(thisID).closest('li').remove();
};
function HTMLNavFullSlider(urlIMG){ //popUp Full Slider - please dont edit this function
	var HTML = '';
	HTML += '<div class="modal fade" id="fullSlider" tabindex="-1" role="dialog"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-body">';
	HTML += '<button type="button" class="btn btn-default closeFull" data-dismiss="modal">&times;</button>'
	HTML += '<button type="button" class="slick-prev slick-arrow" style="display: block;">Previous</button>'
	HTML += '<img src="'+urlIMG+'" alt="">';
	HTML += '<button type="button" class="slick-next slick-arrow" style="display: block;">Next</button>';
	HTML += '</div></div></div></div>';
	return HTML;
};
function nextSlide(){ //next Slider - please dont edit this function
	if(curIMGIndex == lengthSlider-1)
		curIMGIndex = 0;
	else
		curIMGIndex ++;
	urlIMGFull = $('.sliderIMG ul li:eq('+curIMGIndex+')').find('a').attr('src');
	$('#fullSlider .modal-body img').attr('src', urlIMGFull);
};
function prevSlide(){ //prev Slider - please dont edit this function
	if(curIMGIndex == 0)
		curIMGIndex = lengthSlider-1;
	else
		curIMGIndex --;
	urlIMGFull = $('.sliderIMG ul li:eq('+curIMGIndex+')').find('a').attr('src');
	$('#fullSlider .modal-body img').attr('src', urlIMGFull);
};
function getFullSlider(){ //get Slider - please dont edit this function
	$('#detailPage').append(HTMLNavFullSlider());
	lengthSlider = $('.sliderIMG ul li').length;
	$('.sliderIMG ul li').click(function(){
		urlIMGFull 		= $(this).find('a').attr('src'),
		curIMGIndex 	= $(this).index();
		$('#fullSlider .modal-body img').attr('src', urlIMGFull);
	});
	$('#fullSlider .slick-next').click(function(){
		nextSlide();
	});
	$('#fullSlider .slick-prev').click(function(){
		prevSlide();
	});
};
function showHideLogin(){ //show / hide popUp đăng nhập
	showHide('.popUpLogin');
};
function radioCheck(idClick, idHide, idShow){ //function check radio để show / hide block content element 
	$(idClick).click(function(){
		if($(idClick).is(':checked')){
			$(idHide).fadeOut('fast');
			$(idShow).fadeIn('fast');
		}
	});
};
function submitPhone(){ //Đăng kí mua hàng nhanh - submit button
	$('.mainFormCall').closest('.modal-body').append('<p style="text-transform: uppercase; font-weight: bold; margin-bottom: 10px;">Thanks you !</p><input type="button" data-dismiss="modal" value="Đóng">');
	$('.mainFormCall').remove();
};
function onchangeSelect(selectID, getAttr, textTag){ //Chọn selectbox -> đổi text()
	$(selectID).change(function(){
		var selectValue = $(this).val(),
			selectClass = $(this).attr(getAttr);
		$(textTag+'.'+selectClass).text(selectValue).attr('value', selectValue);
	});
};
function convertA2Button(classA, valueButton, revertFunction){ //Chuyển từ tag a thành button khi click
	$(classA).replaceWith(function () {
		var input = $('<input>',{
            type: 'button',
            value: valueButton,
            class: $(this).attr('class'),
            onclick: revertFunction
        });
        return input;
	});
};
function convertButton2A(classB, htmlValue,convertFunction){ //Chuyển từ tag button thành a khi click
	$(classB).replaceWith(function () {
		var a = $('<a>',{
            html: htmlValue,
            href: '#',
            class: $(this).attr('class'),
            onclick: convertFunction
        });
        return a;
	});
};
function editInfo(className){ //Chỉnh sửa thông tin cá nhân - trang user
	$('.infoBlock').find('p.editable').replaceWith(function () {
		var input = $('<input>',{
            type: 'text',
            value: $(this).html(),
            class: $(this).attr('class')
        });
        return input;
	});
	$('#tabInfo .non-edit').hide('fast');
	$('#tabInfo .hd-class').show('fast');
	convertA2Button(className, 'Lưu thay đổi', 'saveEditInfo(this);');
};
onchangeSelect('#gender', 'id', 'p');
onchangeSelect('#dob select', 'id', 'span');
function saveEditInfo(className){ //Lưu thông tin cá nhân mới - trang user
	$('.infoBlock').find('input[type=text]').replaceWith(function () {
		var p = $('<p>',{
            html: $(this).val(),
            class: $(this).attr('class')
        });
        return p;
	});
	$('#tabInfo .non-edit').show('fast');
	$('#tabInfo .hd-class').hide('fast');
	convertButton2A(className, 'Chỉnh sửa thông tin cá nhân', 'editInfo(this); return false;');
};
function HTMLFormChangePWD(){ //HTML Form thay đổi mật khẩu - trang user
	var HTML = '';
	HTML += '<div class="newFWDForm">';
	HTML += '<label>Mật khẩu hiện tại</label>';
	HTML += '<input type="text" class="oldPWDTxt" placeholder="Nhập mật khẩu hiện tại" />';
	HTML += '<label>Mật khẩu mới</label>';
	HTML += '<input type="text" class="newPWDTxt" placeholder="Nhập mật khẩu mới" />';
	HTML += '<label>Xác nhận mật khẩu mới</label>';
	HTML += '<input type="text" class="newPWDTxt2" placeholder="Nhập lại mật khẩu mới" />';
	HTML += '</div>';
	return HTML;
}
function changePWD(className){ //Thay đổi mật khẩu - trang user
	convertA2Button(className, 'Lưu mật khẩu mới', 'saveNewPWD(this);');
	$('.pwBlock p').hide();
	$('.pwBlock label').hide();
	$('.pwBlock').prepend(HTMLFormChangePWD());
};
function saveNewPWD(className){ //Lưu mật khẩu mới - trang user
	convertButton2A(className, 'Thay đổi mật khẩu', 'changePWD(this); return false;');
	$('.newFWDForm').remove();
	$('.pwBlock p').show();
	$('.pwBlock label').show();
};
function editAddInfo(className){ //Thay đổi thông tin - trang user
	$('.addressAccInfo').find('p.editable').replaceWith(function () {
		var input = $('<input>',{
            type: 'text',
            value: $(this).html(),
            class: $(this).attr('class')
        });
        return input;
	});
	$('#addressInfo .selectAdd').show();
	convertA2Button(className, 'Lưu thông tin mới', 'saveAddInfo(this);');
};
function saveAddInfo(className){ //Lưu thay đổi thông tin - trang user
	$('.addressAccInfo').find('input[type=text]').replaceWith(function () {
		var p = $('<p>',{
            html: $(this).val(),
            class: $(this).attr('class')
        });
        return p;
	});
	$('#addressInfo .selectAdd').hide();
	convertButton2A(className, 'Chỉnh sửa thông tin mua hàng', 'editAddInfo(this); return false;');
};
function editCartCheckout(className){ //Edit số lượng trong giỏ hàng - trang checkout 2
	var parentDiv = $(className).closest('.detailP-CO');
	$(className).addClass('editCart').text('Cập nhật').attr('onclick', 'saveCartCheckout(this); return false;');
	parentDiv.find('select.numberProCO').show();
	parentDiv.find('span.numberProCO').css({opacity: 0});
};
function saveCartCheckout(className){  //Lưu edit số lượng trong giỏ hàng - trang checkout 2
	var parentDiv = $(className).closest('.detailP-CO');
	$(className).removeClass('editCart').text('Thay đổi').attr('onclick', 'editCartCheckout(this); return false;');
	parentDiv.find('select.numberProCO').hide();
	parentDiv.find('span.numberProCO').css({opacity: 1});
};
function onchangeSelectCartCheckout(){ //onchange checkout selectbox số lượng
	$('select.numberProCO').change(function(){
		var selectValue = $(this).val(),
			selectClass = $(this).attr('class');
		$(this).closest('.subInfoCO').find('span.'+selectClass).text(selectValue).attr('value', selectValue);
	});
};
function showregFormCO(){
	$('.logButton').show();
	$('.regButton').hide();
	$('#regFormCO').show();
	$('#logFormCO').hide();
	$('.txtReg').hide();
	$('.txtLog').show();
};
function showlogFormCO(){
	$('.logButton').hide();
	$('.regButton').show();
	$('#regFormCO').hide();
	$('#logFormCO').show();
	$('.txtReg').show();
	$('.txtLog').hide();
};
function submitFilter(){
	$('.selectedFilters').fadeIn('fast');
};
function showSelect(className){ //show / hide custom selectbox
	var idSlideUpDown = $(className).next('.listOption');
	showHide(idSlideUpDown);
};
function optionClick(){ //onchange custom selecbox
	var itemOption = $('.listOption li');
	itemOption.click(function(){
		var selectValue 	= $(this).find('span').text(),
			listOption		= $(this).closest('.listOption'),
			checkedOption 	= listOption.prev('.currentOption');
		checkedOption.text(selectValue);
		listOption.slideUp('fast');
	});
};

//new edit 18.08 click function
function showHideMenuMobile(className){ //change hamburger icon menu to "x" icon
	showHide('.mainMenu');
	if($(className).hasClass('active'))
		$(className).removeClass('active');
	else
		$(className).addClass('active');
};
// $(document).click(function(e){ //close popUp when click outside element
//     if(e.target.className != 'customSelect' && !$('.customSelect').find(e.target).length){
//         $('.listOption').hide();
//     }
//     if(e.target.className != 'popUpLogin' && && !$('.popUpLogin').find(e.target).length){
//        $('.popUpLogin').hide();
//        // $('.popUpCart').hide();
//        // $('#mainSearchForm').hide();
//     }
// });
//end new edit 18.08 click function
//new edit 24.08
function enterSubmitForm(){
	$('form#loginFormPage').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        alert('Hội Maza đẹp trai, Tân bị gay ! Enter form Đăng nhập !');    
	    }
	});
	$('form#regFormPage').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        alert('Hội Maza đẹp trai, Tân bị gay ! Enter form Đăng ký !');    
	    }
	});
	$('.popUpLogin').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        alert('Hội Maza đẹp trai, Tân bị gay ! Enter Popup Đăng nhập !');    
	    }
	});
}
//end new edit 24.08 

showSortBy();
onChangeSortBy();
rightFilterList();
onChangeRightFilterList();
showAllFilter();
getAllFilter();
onChangeAllFilter();
chooseColor();
tabs();
optionClick();
onchangeSelectCartCheckout();
enterSubmitForm();
// radioCheck('#newMem','#logOldMem','#logNewMem');
// radioCheck('#oldMem','#logNewMem','#logOldMem');
