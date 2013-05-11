<?php

die();

	if( $itemId = $_GET[ 'itemId' ] ) {

		$work = array(
			array(
				'media'=>array(
					array( 'type'=>'image', 'src'=>'demo/work/details/1.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/2.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/3.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/4.jpg' )
				), 
				'enableslider'=>1, 
				'likes'=>16, 
				'title'=>'Hare<br><small>Good news for speed lovers</small>', 
				'description'=>'<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>', 
				'url'=>'http://elmonoautista.com/5254391'
			), 
			array(
				'media'=>array(
					array( 'type'=>'image', 'src'=>'demo/work/details/5.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/6.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/7.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/8.jpg' )
				), 
				'enableslider'=>1, 
				'likes'=>16, 
				'title'=>'Hero<br><small>Good news for speed lovers</small>', 
				'description'=>'<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>', 
				'url'=>'http://elmonoautista.com/5423533'
			), 
			array(
				'media'=>array(
					array( 'type'=>'image', 'src'=>'demo/work/details/9.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/10.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/11.jpg' )
				), 
				'enableslider'=>1, 
				'likes'=>16, 
				'title'=>'Cannonballman<br><small>Good news for speed lovers</small>', 
				'description'=>'<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>', 
				'url'=>'http://elmonoautista.com/5254392'
			), 
			array(
				'media'=>array(
					array( 'type'=>'video', 'embed'=>'<iframe src="http://player.vimeo.com/video/58562532" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>' )
				), 
				'likes'=>16, 
				'title'=>'Portfolio With Video', 
				'description'=>'<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>', 
				'url'=>'http://www.vimeo.com'
			), 
			array(
				'media'=>array(
					array( 'type'=>'image', 'src'=>'demo/work/details/12.jpg' ), 
					array( 'type'=>'image', 'src'=>'demo/work/details/13.jpg' )
				), 
				'enableslider'=>1, 
				'likes'=>16, 
				'title'=>'Relax death, relax!', 
				'description'=>'<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>', 
				'url'=>'http://elmonoautista.com/4805039'
			), 
			array(
				'likes'=>16, 
				'title'=>'Portfolio Text Only', 
				'description'=>'<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>', 
				'url'=>'http://www.themeforest.net'
			)
		);

		echo json_encode( $work[ $itemId - 1 ] );

	} else {

	}
?>