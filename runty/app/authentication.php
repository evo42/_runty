<?php
/* authentication.php is part of the Runty. NoCMS project http://runtyapp.org
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

// @todo config
$user_file = '../../.runty/user.json';
if (!empty($_SESSION['runty']->users)) {
    $users = $_SESSION['runty']->users;
} else {
    $users = array();
}


// user object
if (!isset($_SESSION['user']) ||
	empty($_SESSION['user']->id)) {
	$_SESSION['user'] = new StdClass();
	$_SESSION['user']->id = 'guest';
}




$user_file = '../../.runty/user.json';
if (!isset($_SESSION['runty']) ||
	empty($_SESSION['runty']->users)) {
	$_SESSION['runty'] = new StdClass();

    if (is_readable($user_file)) {
    	$users_data = file_get_contents($user_file);
    	$users = json_decode($users_data);
    } else {
        //echo 'not readable...';
    }
}

// make nicer ...
if (empty($users)) {
    $users = array();
}
if (!empty($users)) {
    if ($users[0]->{'@id'} == 'edit@runtyapp.org') {
        $_SESSION['runty']->install = $users;
        unset($_SESSION['runty']->users);
    } else {
        unset($_SESSION['runty']->users);
    }
}




if (isset($_REQUEST['assertion'])) {
	$http_protocol = 'http://';
	if ($_SERVER['SERVER_PORT'] == 80) {
		$http_protocol = 'http://';
	} else if ($_SERVER['SERVER_PORT'] == 443) {
		$http_protocol = 'https://';
	}

	// @todo use other stuff than curl via exec for the "cheap hosting environments"
	$cmd = 'curl -d "assertion='.$_REQUEST['assertion']
			.'&audience='.$http_protocol.''.$_SERVER['HTTP_HOST']
			.'" "https://browserid.org/verify"';
	$data = exec($cmd);

	// browserid auth response:
	//
	// {"status":"okay","email":"user@example.org",
	// "audience":"http://example.com","expires":1334279729067,
	// "issuer":"browserid.org"}
	if ( !empty($data) ) {
		$signin_user = json_decode($data);
		if ($signin_user->status == 'okay') {
			// @todo check for valid user data
			foreach ($users as $id => $user) {
				$user = (array) $user;
				if ( $signin_user->email == $user['@id'] ) {
					$_SESSION['user'] = $signin_user;

					foreach($user as $key => $value) {
						$key = str_replace('@', '', $key);
						$_SESSION['user']->$key = $value;
					}

					echo $data;
					//die();
				} 
			}

			if (isset($_SESSION['runty']->install)) {
			        $_SESSION['user'] = $signin_user;
                    /*$user = (array) $user;
					foreach($user as $key => $value) {
						$key = str_replace('@', '', $key);
						$_SESSION['user']->$key = $value;
					}*/
				    if ($_SESSION['runty']->install[0]->{'@id'}) {
				        $_SESSION['runty']->install[0]->{'@id'} = $_SESSION['user']->email;
			        
				        if (!file_put_contents($user_file, json_encode($_SESSION['runty']->install))) {
				            echo json_encode('Runty installation: Could not write user.json file.');
				            unset($_SESSION['user']);
				            die();
				        }
				    } else {
				        // add new user json
				    }
				    echo $data;
			}
	    } else {
			//echo json_encode('Runty Auth: File /.runty/user.json is not readable / available');
			//unset( $_SESSION['user'] );
			//die();
			echo json_encode('Runty Auth: Not Authenticated.');
			unset( $_SESSION['user'] );
			die();
		}
	}
} else if ( isset($_REQUEST['logout']) ) {
	unset( $_SESSION['user'] );
	unset( $_SESSION['runty'] );
	echo json_encode('Runty Auth: Session closed');
}
