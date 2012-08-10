<?php namespace runty\repository;
/* repository.php is part of the Runty NoCMS project http://runtyapp.org
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

/**
 * Runty Aloha repository implementation.
 * 
 */

function query() {
	
	// read all available files
	$results = array();
	
	// all pages
	$files = get_files( '../' );
	
	$results = array_merge($results, $files);
	
	
	// all uploads
	$files = get_files( '../uploads/' );
	$results = array_merge($results, $files);
	
	
	header('Content-Type:text/javascript');
	if (count($results) > 0) {
		$out = '[';
		foreach ($results as $result) {
			$out .= '{"url":"'.$result['link'].'","name":"'.$result['title'].'","type":"'.$result['type'].'"},';
		}
		$out = substr($out, 0, -1);
		$out .= ']';
		echo $out;
	}

}

/**
 * helper functions
*/
function get_files( $dir = '../', $dir_path = false) { 
	$files = scandir( $dir ); 
	$result = array();
	
	if ( empty($dir_path) ) {
		$dir_path = substr($dir, 1, 0);
	}
	
	foreach ( $files as $file )  {
		$data = false;
		
		if ( $file === '.' || $file === '..' ) { 
			continue; 
		} else if (is_file($dir.$file)) { 
			$data['link'] = $dir_path.$file;
			$data['title'] = nice_file_title($file); // read title from html, image/auto meta data ...
			$data['type'] = 'website'; // check what type the file is -- now just use 'website'
			array_push($result, $data);
		} 
	}

	return $result; 
}

function nice_file_title($title) {
	$ext = pathinfo($title, PATHINFO_EXTENSION);
	
	$search = array("-", "_", "+", ".".$ext);
	$title = trim(str_replace($search, " ", $title));
	
	$title = $title.' ('.strtolower($ext).')';
	
	return $title;
}