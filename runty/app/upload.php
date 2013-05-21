<?php 
require_once 'core.php';

if (isset($_SESSION['user']->role)) {
    if ($_SESSION['user']->role != 'admin' || $_SESSION['user']->role != 'editor') {
	    echo json_encode('Runty: User not authenticated.')
        die();
    }
} else {
    echo json_encode('Runty: User not authenticated.')
    die();
}

spl_autoload_register(function($class){
	require './vendor/'.preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});

# Get Markdown class
use \Michelf\Markdown;


$uploaddir = '../../uploads/';
$uploaddir_http = '/uploads/';


if (is_array($_FILES['file'])) {
$file_ext = pathinfo(basename($_FILES['file']['name']), PATHINFO_EXTENSION);
$file_name = basename($_FILES['file']['name']);
$file_hash = sha1(microtime().rand(10, 100000).basename($_FILES['file']['name']));
$file_hashed = $file_hash.'.'.$file_ext;
} else {
    // @todo here and others: proper json return values...
     echo "No file uploaded / found.\n";
     die();
}
$uploadfile = $uploaddir . $file_hashed;
$uploadfile_http = $uploaddir_http . $file_hashed;


if (in_array(strtolower($file_ext), array('png', 'jpg', 'gif', 'md', 'textile', 'txt', 'doc', 'xls', 'pdf', 'odf', 'svg', 'dmg', 'zip', 'js', 'css', 'htm', 'html', 'mp3', 'mp4', 'ogg'))) {
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    //echo "File is valid, and was successfully uploaded.\n";
    if (in_array(strtolower($file_ext), array('png', 'jpg', 'gif'))) {
        $file_data = '<p><img src="'.$uploadfile_http.'" /></p><p>Image '.$file_name.'</p>';
    } else if (in_array(strtolower($file_ext), array('md', 'textile', 'txt'))) {
        $file_data = file_get_contents($uploadfile);
        
        if ($file_ext == 'md') {
            $parser = new Markdown;
            $file_data = Markdown::defaultTransform($file_data);
        }
        
        
    //} else if (in_array(strtolower($file_ext), array('htm', 'html'))) {
    //} else if (in_array(strtolower($file_ext), array('js', 'css'))) {


    } else {
        // some file we don't support yet
        $file_data = '<p><a href="'.$uploadfile_http.'">'.$file_name.'</a></p>';
    }
    
    echo $file_data;
} else {
    echo "Possible file upload attack!\n";
}

} else {
    
    $file_list = join(', ', array('png', 'jpg', 'gif', 'md', 'textile', 'txt', 'doc', 'xls', 'pdf', 'odf', 'svg', 'dmg', 'zip', 'js', 'css', 'htm', 'html', 'mp3', 'mp4', 'ogg'));
    echo "File type not accepted. Only: $file_list.\n";
    
}


/*
echo 'Here is some more debugging info:';
print_r($_FILES);

print "</pre>";


$ds          = DIRECTORY_SEPARATOR;  //1
 
$storeFolder = 'uploads';   //2
 
if (!empty($_FILES)) {
     
    $tempFile = $_FILES['file']['tmp_name'];          //3              
      
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
     
    $targetFile =  $targetPath. $_FILES['file']['name'];  //5
 
    move_uploaded_file($tempFile,$targetFile); //6
     
}

*/
?>