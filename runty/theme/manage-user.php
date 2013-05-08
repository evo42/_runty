<h1>Manage user</h1>
<ul id="user-list">
<li>loading ...</li>
</ul>

<div id="add-new-user-link-modal">
    <br />
<a id="add-new-user" class="btn btn-primary btn-large btn-block" href="#add-user" title="">Add a new user account</a>
</div>

<div id="add-user-modal">
    <input class="span4" type="email" id="new-user-email" value="" placeholder="E-mail of a new user">
    <p>Enter the e-mail adress of a person you would like to grant access to your web page.</p>
    <p>The user can sign in <a href="/runty/">here</a> with <a href="https://login.persona.org">Mozilla Persona</a>.</p>
    <br />
    <a id="add-user-btn" class="btn btn-primary btn-large btn-block" href="#add-user" title="">Add the user account</a>
    <a class="login-link" href="/runty/">cancel</a>
</div>


<div id="home-modal">
<a class="login-link" href="/runty/">cancel</a>
</div>


<script>
    $('#done').on('click', function(){
        window.location.href = "/runty/";
    });


    $('#add-user-modal').hide();
    
    $('#user-list').load('/runty/app/user.php?list=all', function(){
        $('#user-list li').on('click', function(){
            var rm_account = confirm('remove this user account?');
            if (rm_account) {
                // @todo --> remove from json file / session to... not only from html view...
                $(this).hide();
            }
        });
    });

    $('#add-new-user').on('click', function(){
        $('#add-user-modal').show();
        $('#home-modal').hide();
        $('#add-new-user-link-modal').hide();
        $('#user-list').hide();
    });
    
    $('#add-user-btn').on('click', function(){
        var input = $('#new-user-email');
        // add user e-mail to user.json
        // @todo check is user account is valid / already exists... (eg: "could be alive = gravatar img")
        $.ajax({
          url: "/runty/app/user.php?add="+input[0].value,
        }).done(function ( data ) {
            $('#user-list').load('/runty/app/user.php?list=all');
            $('#add-user-modal').hide();
            $('#user-list').show(); // load / add new user
            $('#add-new-user-link-modal').show();
            $('#home-modal').show();
        }).fail(function() { alert("error"); });
    });
</script>