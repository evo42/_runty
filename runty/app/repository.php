<?php namespace runty\repository;
/* repository.php is part of the Runty. NoCMS project http://runtyapp.org
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


// run query and find all available files to show in the
// aloha editor link browser / type-ahead url field
query();

// later also query for linked open data resources (text, media, other metadata like categorisation)


/**
 * Runty Aloha repository implementation.
 * 
 */

function query() {
	// read all available files
	$results = array();
	
	$scan_dirs = array(	'website' => '../',
						'media' => '../media/',
						'slide' => '../slides/',
						'guide' => '../guides/',
						'upload'	=> '../uploads/');
	
	foreach($scan_dirs as $id => $path) {
		if (is_readable($path)) {
			$files = get_files($path);
			$results = array_merge($results, $files);
		}
	}

	header('Content-Type:text/javascript');
	if (count($results) > 0) {
		// @todo use json encode function --> json-ld format to be defined
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
		$is_dir = is_dir($dir.$file);
		$is_file = is_file($dir.$file);

		if ( $file === '.' || $file === '..' ) { 
			continue; 
		} else if ( $is_dir || $is_file) {
			// @todo better file scanning / detection (later get also metadata for a file via apache tika / stanbol)
			// @todo config white-blacklist / regex / array filter for files not to be shown in the list
			// like: .htaccess, .gitignore, .runty , files with specific file extension (.ico, .zip, ...)
			// also: better repository API integration; like AE repos type detection (website, image, ... ))
			$data['link'] = $dir_path.$file;
			$data['title'] = nice_file_title($file, $is_dir); // read title from html, image/auto meta data ...
			$data['type'] = 'website'; // check what type the file is -- now just use 'website'
			array_push($result, $data);
		} 
	}
	return $result; 
}

function nice_file_title($title, $is_dir = false) {
	$ext = pathinfo($title, PATHINFO_EXTENSION);
	$search = array("-", "_", "+", ".".$ext);
	$title = trim(str_replace($search, " ", $title));

	if (empty($title) && !empty($ext)) {
		$title = $ext;
		$ext = false;
	}

	if ($is_dir) {
		$title = $title.' [&middot;&middot;]'; // @todo folder icon needed ;-)
	} else if (!empty($ext)) {
		$title = $title.' ('.strtolower($ext).')';
	} else if (empty($title)) {
		$title = '- - -';
	}

	return $title;
}