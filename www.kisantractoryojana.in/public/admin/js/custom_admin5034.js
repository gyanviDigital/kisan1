    // this fucntion is used for delete Operation 
    var item_token_key = 0;
    function setID(token_key) { item_token_key = token_key; }
//eg: triggerEvent(document.getElementById('category_id'), 'change');
//  case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
//         case "mousedown":
//         case "mouseup":
//         case "focus":
//         case "change":
//         case "blur":
//         case "select":

function triggerEvent(el, type) {
    // IE9+ and other modern browsers
    if ('createEvent' in document) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on' + e.eventType, e);
    }
}

//  this function is used for show and hide specific div using javascript
// if value is true then show specific id div else hide 
// common function
function _showHideDiv(a,value){

if (value==="true") {
    $('#' + a ).removeClass('hidden');
} else {
    $('#' + a ).addClass('hidden');
}
}

// common function
// for handel dynamic dropdown using 
// in this function we can pass data its hadal current baseurl and its old value and data also set in specific set id 
//passcode_input.setCustomValidity("Wrong. It's 'Ivy'.");
function _dynamicDropdown(data)
    {
        // console.log(data);
        var getvalue = $('#'+data.getId).val();
         if (getvalue != '') {
          $.post(Base_url+data.BaseUrl, {id: getvalue,"csrf_test_name":csrfHash},
           function (success) {
            // console.log(success);
            success = JSON.parse(success);
            if (success.status == 1) {
                return_data = success.data;
                csrfHash = success.csrfHash;
                $('#csrf_test_name').val(csrfHash);
                var options = '<option value=""> Select</option>';
                $.each(return_data, function (k, v) {
                select = (data.oldValue == v.id) ? 'selected' : '';
                options += '<option value="' + v.id + '"' + select + '>' + v.title + '</option>';
                });
                // console.log(data.setId);
                // console.log(options);

                $('#'+data.setId).html(options)
                } else {
                $('#'+data.setId).html('<option value=""> Select </option>')
                }
                });
             } 
             else {
                $('#'+data.setId).html('<option value=""> Select</option>');
        }
}

// common function
// for handel dynamic dropdown using 
// in this function we can pass data its hadal current baseurl and its old value and data also set in specific set id 
//passcode_input.setCustomValidity("Wrong. It's 'Ivy'.");
// this function is used for get Request
function GET_dynamicDropdownData(data)
    {
        // console.log(data);
         if (data.BaseUrl != '') {
          $.ajax(Base_url+data.BaseUrl, data.value,
           function (success) {
            // console.log(success);
            success = JSON.parse(success);
            if (success.status == 1) {
                return_data = success.data;
                csrfHash = success.csrfHash;
                $('#csrf_test_name').val(csrfHash);
                var options = '<option value=""> Select</option>';
                $.each(return_data, function (k, v) {
                select = (data.oldValue == v.id) ? 'selected' : '';
                options += '<option value="' + v.id + '"' + select + '>' + v.title + '</option>';
                });
                // console.log(data.setId);
                // console.log(options);

                $('#'+data.setId).html(options)
                } else {
                $('#'+data.setId).html('<option value=""> Select </option>')
                }
                });
             } 
             else {
                $('#'+data.setId).html('<option value=""> Select</option>');
        }
}

function Ajax_dynamicDropdownData(data)
    {
         if (data.BaseUrl != '') {
            $.ajax({
            type  : 'GET',
            url   : Base_url+data.BaseUrl,
            data : data.value,
            async : false,
            dataType : 'json',
            success : function(respond_data){
            // console.log(respond_data);
            var count = Object.keys(respond_data).length;
            if (count >= 1) {
                return_data = respond_data;
                var options = '<option value=""> Select</option>';
                $.each(return_data, function (k, v) {
                select = (data.oldValue == v.id) ? 'selected' : '';
                var status='';
                if(v.hasOwnProperty('status')){
                  if(v.status=="active"){
                    status='color: #fff;background-color: #b91773;';
                  }
                  
	                }
                options += '<option  style="'+status+'"  value="' + v.id + '"' + select + '>' + v.title + '</option>';
                });
                // console.log(data.setId);
                // console.log(options);

                $('#'+data.setId).html(options)
                } else {
                $('#'+data.setId).html('<option value=""> Select </option>')
                }
                }});
             } 
             else {
                $('#'+data.setId).html('<option value=""> Select</option>');
        }
}

function data_table_(table_id,long='',scrollX=''){   
    var res=true;
    var scrollX=true;
    if(long=="yes"){
        res=false;
        scrollX='100%';
        if(scrollX){
          scrollX=scrollX;
        }
    }
    $('#'+table_id).DataTable({
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "fixedColumns": true,
      "scrollCollapse": true
    });
  }

  function toggle_visibility(id,data) 
    {
        var e = document.getElementById(id);
        var elem = $(data).find(".fa-minus");
        if (elem.length===1){
            $("#"+id).hide();
            $(data).find(".fa-minus").removeClass("fa-minus")
            $(data).find(".fas").addClass("fa-plus")
        }
        else{
            $("#"+id).show();
            $(data).find(".fa-plus").removeClass("fa-plus")
            $(data).find(".fas").addClass("fa-minus")
        }
    }
    

    var table;
    var extra_data;

    function Server_data_table_(table_id, long, base_url, columns, $data_, other_event, using_id, div_hight, key_up_down_event, _search_focus, space_key_event,order_by) {

    	// console.log('columns', columns);
    	if (!long) long = false;
    	if (!base_url) base_url = false;
    	if (!columns) columns = false;
    	if (!$data_) $data_ = false;
    	if (!other_event) other_event = false;
    	if (!using_id) using_id = false;
    	if (!div_hight) div_hight = false;
        if (!order_by) order_by = 'desc';

        
    	if (!key_up_down_event) key_up_down_event = false;
    	if (!_search_focus) {
    		_search_focus = true
    	} else {
    		_search_focus = false
    	};
    	if (!space_key_event) space_key_event = false;



    	// alert(div_hight);
    	// $('#'+table_id).css('min-height','200px');
    	extra_data = $data_;
    	// console.log($data_);
    	var res = true;
    	var scrollX = false;
    	var auto = true;

    	$.fn.dataTable.ext.errMode = 'throw';
    	if ($.fn.dataTable.isDataTable('#' + table_id)) {
    		//  table = $('#'+table_id).DataTable();
    		table = $('#' + table_id).DataTable();
    	} else {
    		table = $('#' + table_id).DataTable({
    			"processing": true,
    			"serverSide": true,
    			retrieve: true,
    			"paging": true,
    			"searching": true,
    			searchDelay: 2000,
    			// extra_data?false:true,
    			destroy: true,
    			"columns": columns,
    			"order": [1, order_by],
    			"ajax": {
    				url: base_url,
    				type: "POST",
    				'data': function (data_) {
    					data_.advance_search = JSON.stringify(extra_data);
    				}
    			},
    			"lengthMenu": [
    				[20, 50, 150, 1000],
    				['20 rows', '50 rows', '150 rows', 'Show all']
    			],

    			"columnDefs": [{
    				"targets": [0, -1],
    				"orderable": false,
    			}, ],

    			"bLengthChange": true,
    			"bPaginate": true,
    			"info": false,
    			"autoWidth": false,
    			deferRender: false,
    			responsive: false,
    			"language": {
    				"processing": '<div id="loading"><img src="' + Base_url + 'index.svg' + '" id="loading-image"  alt="Loading..." /></div>'
    			},
    		});
    	}
    }



    function again_draw($data_) {
    	if (!$data_) $data_ = '';
    	extra_data = $data_
    	table.draw();
    }
    

//   date time Function
function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    result = '' + days[day] + ' ' + months[month] + ' ' + d + ' ' + year + ' ' + h + ':' + m + ':' + s;
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("' + id + '");', '1000');
    return true;
}
// this function is disable event key 
function stopRKey(evt) { 
	  var evt = (evt) ? evt : ((event) ? event : null); 
	  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
	  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
    }
    

// date_time('date_time');


// end of costum filter
// this function is used for set Dynamic Height and Width
function autoResize(id) 
    {
		var _Height = document.getElementById(id);
		var y = _Height.scrollHeight;
		var x = _Height.scrollWidth;
		document.getElementById(id).style.height = y + 'px';
    }
function setFocus(id) {document.getElementById(id).focus(); }
function removeFocus() {  document.getElementById("focus").blur(); }

// this is math based function
function value_percentage(percent, totalValue) {return (100 * percent) / totalValue;}
function percentage_value(percent, totalValue) {return (percent/100) * totalValue;}
function roundUp(intNum) {if (!Number.isInteger(intNum)) {intNum = Math.round(intNum);}
return intNum;}
// end of math Based Function

function playSound(){

  var audio = new Audio(''+Base_url+'public/other_file/noti.mp3');
  audio.play();
}
function setValue(_id,_value){
	var data_ = document.getElementById(_id);
	data_.setAttribute('value',_value);
}

var form_status=1;
function ajax_save(myFormId, costume__ = 'again_draw',$data_set='') {

    var button =$('button[value="Submit"]');

    // $(':input[type="submit"]').prop('disabled', false);
    // $(':input[type="submit"]').prop('disabled', true);
    var data = new FormData();
    var form = document.getElementById(myFormId);
    var $form = $('#'+myFormId);
    var $submitActors = $form.find(':input[type=button]');
    // $submitActors.prop('disabled', true);
    if(form_status!=1){return;}
    
   
    //Form data
    $("span").remove(":contains('this field required fields!')");
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            $("<span class=''style='color:red;'>this field required fields!</span>").insertAfter($("#" + form.elements[i].id));
            document.getElementById(form.elements[i].id).focus();
            return false;
        }
    }
    var form_data = $('#' + myFormId).serializeArray();

  

    
    $.each(form_data, function (key, input) {
        element = $('[name="'+input.name+'"]');
        
        if(element.hasClass('cms_form_description')) {
            input.value=tinyMCE.get(element.attr("id")).getContent();
        }
        data.append(input.name, input.value);
    });

    //File data
    var input_type = $('input[type="file"]');
    // console.log('input_type 366',input_type.length);
    var maxSizeBytes = 1024 * 1024 *5; // 500 KB
    if (input_type.length) {
        for (var f = 0; f < input_type.length; f++) {
        var file_data = $('input[type="file"]')[f].files;
        for (var i = 0; i < file_data.length; i++) {
            if (file_data[i].size > maxSizeBytes) {
                // show_response_message('File size exceeds the maximum allowed size (5 MB).');
                // $("<span class=''style='color:red;'>File size exceeds the maximum allowed size (5 MB)!</span>").insertAfter($("#" + $(input_type[f]).attr("id")));
                // document.getElementById($(input_type[f]).attr("id")).focus();
                // return;
            }
            data.append($(input_type[f]).attr("name"), file_data[i]);
        }
    }
    }
    var cleditor = $('#cleditor');
	    	if (cleditor.length) {
			var name=cleditor.attr("name");
			// var value_=tinyMCE.activeEditor.getContent();
			var value_=tinyMCE.get('cleditor').getContent();
			data.append(name, value_);
    	}
        form_status=2;
        button.html('loading..');

    $.ajax({
        
        url: $("#" + myFormId).attr('action'),
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        success: function (data_res) {
            var data_res = JSON.parse(data_res);
            if (data_res.status == "error") {
                var message = "";
                // $.each(data_res.error, function (index, value) {
                //     message += value;
                // });
                form_status=1;
                
                show_response_message(data_res.message);
            } else {
                form_status=1;
                show_response_message(data_res.message, 'success');
                $('#' + myFormId)[0].reset();
                console.log('typeof costume__', $data_set)
                if (typeof costume__ === "function") {
                    if($data_set){
                        $data_set=data_res;
                    }else{
                        $data_set='';
                    }
                    console.log('$data_set',$data_set);
                    costume__($data_set);
                }
            }
        },
        error: function (e) {
            form_status=1;
            show_response_message("Some Thing Went Wrong Try Again");
        },
        complete: function () {
            form_status=1;
            button.html('Submit');

            // show_hide_model('new_model_upper', 'hide');
            // $('#'+myFormId)[0].reset();
            // again_draw();
        }
    });
}

function show_response_message(body, type = 'error') {
    if (type == 'error') {
        toastr.error(body)
    } else if (type == 'success') {
        toastr.success(body)
    } else {
        toastr.warning(body)
    }
    // toastr.options.closeMethod = 'fadeOut';
    // toastr.options.closeDuration = 300;
    // toastr.options.closeEasing = 'swing';

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

}

function dynamicPrint(print_text){
  var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        // frame1.css({"position": "absolute", "top": "-1000000px"});
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();      
        frameDoc.document.write(print_text);
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
        return true;
}
// this function is used for genrate random function using javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


		
function changeStatus(token_key, url_,costume__='') {
    var dataString = "&token_key=" + token_key;
    if ($.trim(token_key).length > 0) {
        $.ajax({
            type: "POST",
            url: url_,
            data: dataString,
            success: function (data_res) {
                var data_res = JSON.parse(data_res);
                if (data_res.status == "error") {
                    var message = "";
                    show_response_message(data_res.message);
                   
                } else {
                    show_response_message(data_res.message, 'success');
                    if (typeof costume__ === "function") {
                        costume__(data_res);
                    }
                }
            },
            error: function (e) {
                show_response_message("Some Thing Went Wrong Try Again");
            }
        });
    }
}

function updateStatus(dataString, url_) {
    if ($.trim(dataString).length > 0) {
        $.ajax({
            type: "POST",
            url: url_,
            data: dataString,
            success: function (data_res) {
                var data_res = JSON.parse(data_res);
                if (data_res.status == "error") {
                    var message = "";
                    show_response_message(data_res.message);
                } else {
                    show_response_message(data_res.message, 'success');
                }
            },
            error:function(e){
                show_response_message("Some Thing Went Wrong Try Again");
            }
        });
    }
}


function delete_row(token_key, url_, costume__) {

    var dataString = "&token_key=" + token_key;
    if ($.trim(token_key).length > 0) {
        $.ajax({
            type: "POST",
            url: url_,
            data: dataString,
            success: function (data_res) {
                var data_res = JSON.parse(data_res);

                // console.log('data_res', data_res);

                if (data_res.status == "error") {
                    var message = "";
                    show_response_message(data_res.message);
                } else {
                    show_response_message(data_res.message, 'success');
                    // console.log('typeof costume__', typeof costume__)
                    if (typeof costume__ === "function") {
                        costume__();
                    }
                }
            },
            error: function (e) {
                show_response_message("Some Thing Went Wrong Try Again");
            },
        });
    }
}

function formWysiwyg(id){
                if(typeof tinymce !== "undefined"){
    // tinymce.init({ 
    // 				selector:'#'+id,
    //                 browser_spellcheck : true,
    //                 branding: false,
    //                 convert_urls : true,
    //                 mobile:{
    //                     menubar: true
    //                 },
    //                 theme: "modern",
    //                 skin: 'lightgray',
    //             valid_elements: '*[*]a[href|target=_blank]',
    //             valid_children: '+*[*]',
    //             verify_html: false, // Disable HTML verification
    //             cleanup: false,     // Disable HTML cleanup
    //             mode: 'exact' ,
    //             extended_valid_elements: '',
    //                 menubar: 'file edit insert view format table tools help',
    //                 paste_as_text: false,
    //                 // paste_word_valid_elements: '*[*]',
    //                 content_css: ['custom.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'],
    //                 menu: {
    //     file: {title: 'File', items: 'newdocument'},
    //     edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
    //     insert: {title: 'Insert', items: 'link  | template hr'},
    //     view: {title: 'View', items: 'visualaid'},
    //     format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
    //     table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
    //     tools: {title: 'Tools', items: 'spellchecker code'}
    //   },
    //     plugins: [
    //         "advlist autolink lists link  charmap print preview hr anchor pagebreak",
    //         "searchreplace wordcount visualblocks visualchars code fullscreen",
    //         "insertdatetime  nonbreaking save table contextmenu directionality",
    //         "emoticons template paste textcolor colorpicker textpattern image media help"
    //     ],
    //     toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link ",
    //     toolbar2: "print preview | forecolor backcolor emoticons | image | fontsizeselect fontselect",
    //     templates: [
    //         {title: 'Test template 1', content: 'Test 1'},
    //         {title: 'Test template 2', content: 'Test 2'}
    //     ],
    //                 // toolbar: 'undo redo | link image | code',
    //                 /* enable title field in the Image dialog*/
    //                 image_title: true,
    //                 /* enable automatic uploads of images represented by blob or data URIs*/
    //                 automatic_uploads: true,
    //                 /*
    //                   URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
    //                   images_upload_url: 'postAcceptor.php',
    //                   here we add custom filepicker only to Image dialog
    //                 */
    //                   images_file_types: 'jpg,svg,webp',
                      
    //                 // file_picker_types: 'image',
    //                 file_picker_types: 'file image media',

    //                 images_upload_base_path:Base_url+'Common/postAcceptor',
    //                 // automatic_uploads: false,
    //                 images_upload_url: Base_url+'Common/postAcceptor',
    //                 images_upload_handler: example_image_upload_handler
    // });
    
    
    tinymce.init({
        selector: '#' + id,
        browser_spellcheck: true,
        branding: false,
        convert_urls: true,
        mobile: {
            menubar: true
        },
        theme: "modern",
        skin: 'lightgray',
        valid_elements: '*[*]a[href|target=_blank]',
        valid_children: '+*[*]',
        verify_html: false,
        cleanup: false,
        mode: 'exact',
        extended_valid_elements: '',
        menubar: 'file edit insert view format table tools help',
        paste_as_text: false,
        content_css: ['custom.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'],
        menu: {
            file: { title: 'File', items: 'newdocument' },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall' },
            insert: { title: 'Insert', items: 'link  | template hr' },
            view: { title: 'View', items: 'visualaid' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
            table: { title: 'Table', items: 'inserttable tableprops deletetable | cell row column' },
            tools: { title: 'Tools', items: 'spellchecker code' }
        },
        plugins: [
            "advlist autolink lists link charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern image media help"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink anchor|print preview | forecolor backcolor emoticons | image | fontsizeselect fontselect | code",
        toolbar2: "searchreplace | table | hr removeformat | subscript superscript | charmap | ltr rtl | visualchars visualblocks",
        toolbar3: "insertdatetime | save | spellchecker | newdocument|formatselect | fontselect | fontsizeselect | cut copy paste | textpattern | nonbreaking | pagebreak",
        templates: [
            { title: 'Test template 1', content: 'Test 1' },
            { title: 'Test template 2', content: 'Test 2' }
        ],
        image_title: true,
        automatic_uploads: true,
        images_file_types: 'jpg,svg,webp',
        file_picker_types: 'file image media',
        images_upload_base_path: Base_url + 'Common/postAcceptor',
        images_upload_url: Base_url + 'Common/postAcceptor',
        images_upload_handler: example_image_upload_handler
    });
    


    
}
    }

    const example_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
        // const xhr = new XMLHttpRequest();
        var xhr;  // The variable that makes Ajax possible!

        try{
            // Opera 8.0+, Firefox, Safari
            xhr = new XMLHttpRequest();
        } catch (e){
            // Internet Explorer Browsers
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try{
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e){
                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }

        xhr.withCredentials = false;
        xhr.open('POST', Base_url+'Common/postAcceptor');
      
        xhr.upload.onprogress = (e) => {
          progress(e.loaded / e.total * 100);
        };
      
        xhr.onload = () => {
          if (xhr.status === 403) {
            reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
            return;
          }
      
          if (xhr.status < 200 || xhr.status >= 300) {
            reject('HTTP Error: ' + xhr.status);
            return;
          }
          
          
          const json = JSON.parse(xhr.responseText);
          console.log('xhr',json);
          if (!json || typeof json.location != 'string') {
            reject('Invalid JSON: ' + xhr.responseText);
            return;
          }
      
          resolve(json.location);
          $('.mce-textbox').not('.mce-abs-layout-item').val(json.location);

        };
      
        xhr.onerror = () => {
          reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };
      
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
      
        xhr.send(formData);
      });
      

$(function () { formWysiwyg('cleditor'); 
});

function get_Component(data) {
    $.ajax({
        type: 'GET',
        url: data.BaseUrl,
        data: data.value,
        async: false,
        dataType: 'html',
        success: function (res_data) {
            // console.log('res_data',res_data);
            // console.log(data);
            $('#' + data.setId).empty().append(res_data);
        }
    });
}
function get_JSonData(data) {
    var response={};
    $.ajax({
        type: 'GET',
        url: data.BaseUrl,
        data: data.value,
        async: false,
        dataType: 'json',
        success: function (res_data) {
            response= res_data;
        }
    });
    return response;
}
function autocomplete(key_id,url_) {  
    $("#"+key_id).autocomplete({
          source: function(request, response) {
              const search =$("#"+key_id).val();
              $.ajax({
                  url: url_,
                  type: 'GET',
              data: {search:search, type:1},
              dataType: 'json',
                  success: function( data ) {
                            response( data );
           }
              });
          }
          ,select: function(event, ui){
          var $u = {search: ui.item.value_,	type: '2'};
  
              }
      });
  }


function image_view(file_id,view_id){
    var countFiles = $('#'+file_id)[0].files.length;

     var imgPath = $('#'+file_id)[0].value;
     var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
     var image_holder = $("#"+view_id);
     image_holder.empty();

     if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
         if (typeof (FileReader) != "undefined") {

             //loop for each file selected for uploaded.
             for (var i = 0; i < countFiles; i++) {
                 var reader = new FileReader();
                 reader.onload = function (e) {
                    $("<div class='col-md-2 px-1' id='"+view_id+i+"'><img src="+e.target.result+" class='img-fluid'/></div>").appendTo(image_holder)
                 }
                 image_holder.show();
                 reader.readAsDataURL($('#'+file_id)[0].files[i]);
             }
         } else {
             alert("This browser does not support FileReader.");
         }
     } else {
         alert("Pls select only images");
     }
}

function remove_file(r_id){
    $('#'+r_id).remove();
}


function edit_data_remove(view_id,data){
    var image_holder = $("#"+view_id);

    $("<div class='col-md-2 px-1' id='"+view_id+i+"'><a href='#' class='remove_x' onclick=remove_file('"+view_id+i+"');><i class='fa fa-times'></i></a><img src="+e.target.result+" class='img-fluid'/></div>").appendTo(image_holder);
}

function doconfirm() {
    job = confirm("Are you sure to delete This Data?");
    if (job != true) {
        return false;
    }
}