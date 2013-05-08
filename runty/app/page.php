<?php
/* create.php is part of the Runty. The NoCMS project http://runtyapp.org
*
* Runty is a handy NoCMS utilizing the power of Aloha Editor
* -- a modern WYSIWYG HTML5 inline editing library and editor.
*
*
* Runty is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or any later version.
*
* Runty is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*
* Online: https://www.gnu.org/licenses/gpl-2.0.html
*/

require_once dirname( __FILE__ ) . '/core.php';

if ( !empty($_SESSION['user']) ) {
	if (!empty($_SESSION['user']->email) /*&& $_SESSION['user']->role == 'admin'*/) {


        $file_ext = pathinfo(basename($_REQUEST['name']), PATHINFO_EXTENSION);

        if (in_array(strtolower($file_ext), array('png', 'jpg', 'gif'))) {
            echo '<img data-type="'.$file_ext.'" src="'.$uploadfile_http.'</img>';
        } else if (in_array(strtolower($file_ext), array('md', 'textile', 'txt'))) {
            echo file_get_contents($uploadfile);
        }


$file_title = trim($_REQUEST['add']);
$file_name = slugify($file_title).'.html';

$file_content = '<h1>'.$file_title.'</h1>';
$file_content .= '<p>Your content here.</p>';

$content = trim($_REQUEST['content']);
if (!empty($content)) {
    $file_content = '<h1>'.$file_title.'</h1>';
    $file_content .= $content;
}

// minimal template
$template = '<div class="runty-editable">'.$file_content.'</div><script type="text/javascript" src="/runty/app.php"></script>';

// custom templates based on uploaded content types

// md/txt + images / files
$tpl = 'category-page.html';

// >3 images + images / files ?
$tpl = 'carousel-page.html';

// no uploads
$tpl = 'sticky-footer.html';


$tpl_data = file_get_contents('../theme/'.$tpl);

$repl_input = array('#*#content#*#', '#*#title#*#');
$repl_data = array($file_content, $file_title);

$template = str_replace($repl_input, $repl_data, $tpl_data);

if (!file_exists($file_name)) {
    if (!empty($file_content)) {
        if (!file_put_contents('../../'.$file_name, $template)) {
            echo json_encode('Error: file not created.');
        } else {
            echo json_encode('OK: file created.');
        }
    }
}
}}


function slugify($text) { 
  // replace non letter or digits by -
  $text = preg_replace('~[^\\pL\d]+~u', '-', $text);
  // trim
  $text = trim($text, '-');
  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
  // lowercase
  $text = strtolower($text);
  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);
  $text = preg_replace('/[-]{1,20}/i', '-', $text); // preg_replace('/\s+/', ' ', $string); / [ ]{1}/u
  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}
