<h1>Add page</h1>

<input class="span4" type="text" name="page-title" id="new-page-title" value="" placeholder="Page title"></input>
<div id="add-user-modal">
    <div id="upload-area">
        <div id="dropzone-new-file" class="dropzone">
            
        </div>
    </div>
    <br />
    <a id="add-page-btn" class="btn btn-primary btn-large btn-block" href="#add-page" title="">Add this page</a>
    <a class="login-link" href="/runty/">cancel</a>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

<link href="/runty/vendor/dropzone-basic.css" rel="stylesheet" />
<script src="/runty/vendor/dropzone.js"></script>

<style>
#dropzone-new-file {
    height: 75px;
    min-height: 75px;
    overflow: auto;
}

#dropzone-new-file .message {
    margin: 5px;
}


</style>



<script>
$(document).ready(function() {
    
    var contentDropzone = new Dropzone("div#dropzone-new-file", { url: "/runty/app/upload.php"})
    var fileData = '';
    var uploadFileData = '';
    
    contentDropzone.on("success", function(file, xhr) {
      fileData = xhr;
      //uploadFileData += '<img src="'+fileData+'"><br />';
      uploadFileData += '<div class="_runty-editable_">'+fileData+'</div>';
    });
    
    contentDropzone.on("complete", function(file) {
      //contentDropzone.removeFile(file);
    });
    
    
    contentDropzone.on("sending", function(file, xhr, formData) {
        //window.console.log(file, xhr, formData);
    });
    
    contentDropzone.on("addedfile", function(file) {
      /* Maybe display some more file information on your page */
      //window.console.log(file);
      
    });
    
    $('#add-page-btn').on('click', function(){
        var input = $('#new-page-title');
        var fileName = input[0].value.slugify() +".html";
        $.ajax({
        type: "POST",
          url: "/runty/app/page.php",
          data: {
              add: input[0].value,
              name: fileName,
              content: uploadFileData
          }
        }).done(function ( data ) {
            window.location.href = "/"+ fileName;
        }).fail(function() { alert("error"); });
        

    });
    
    
});

String.prototype.slugify = function(){
    var from = 'àáäãâèéëêìíïîòóöôõùúüûñç·/_,:;',
        to = 'aaaaaeeeeiiiiooooouuuunc------',
        i = from.length,
        str = this;

    while( --i >= 0 ){
        str = str.replace(new RegExp(from.charAt(i), 'gi'), to.charAt(i));
    }

    return str.replace(/^\s+|\s+$/g, '') //trim
        .replace(/[^-a-zA-Z0-9\s]+/ig, '')
        .replace(/\s/gi, "-")
        .toLowerCase();
};

/*
function slugify(text) {
	text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
	text = text.replace(/-/gi, "_");
	text = text.replace(/\s/gi, "-");
	return text;
}


(function()
{
	String.implement(
	{
		slugify: function( replace )
		{
			if( !replace ) replace = '-';
			var str = this.toString().tidy().standardize().replace(/[\s\.]+/g,replace).toLowerCase().replace(new RegExp('[^a-z0-9'+replace+']','g'),replace).replace(new RegExp(replace+'+','g'),replace);
			if( str.charAt(str.length-1) == replace ) str = str.substring(0,str.length-1);
			return str;
		}
	});
})();


*/
</script>