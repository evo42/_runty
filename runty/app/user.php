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


$user_file = '../../.runty/user.json';


if (is_readable($user_file) && is_writeable($user_file)) {
    
    $users = json_decode(file_get_contents($user_file));
    
    if ($_REQUEST['list'] == 'all') {
        $html = '';
        foreach ($users as $row => $data) {
            $html .= '<li><span href="#" data-toggle="tooltip" data-placement="right" title="" data-original-title="delete">'.$data->{'@id'}.'</span></li>';
        }
        echo $html;
        die();
    }
  
  // <p align="center" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Tooltip under the text."></p>
    
    $email = trim($_REQUEST['add']);
    if (!empty($email)) {
        //$users
        /*
        (
                    [@context] => http://runtyapp.org/person
                    [@id] => rene.kapusta@gmail.com
                    [name] => Runty. The NoCMS Demo Mode
                    [role] => admin
                    [member] => http://runtyapp.org/admin
                )
        */
        $user = new stdClass();
        $user->{'@id'} = $email;
        $user->role = 'editor'; // admin
        $users[] = $user;
        
        file_put_contents($user_file, json_encode($users));
    }
    
}





    }
}
