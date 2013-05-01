## Use Persona for Authentication, the **easy** way!

### #1 - Add some javascript to your templates:

    <script src="https://login.persona.org/include.js"></script>
    <script src="https://raw.github.com/lloyd/persona.js/master/persona.min.js"></script>
    <script> PersonaJS(); </script>
    
NOTE: Wanna bundle persona.js with your own javascript resources and minify it all together?  Do it!  

### #2 - Add a classes to your login / logout links

Add `.persona_login` to your login link or button:

    <a href="#" class="persona_login">login</a>

Add `.persona_logout` to your logout link or button:

    <a href="#" class="persona_logout">logout</a>

Serve one or the other, depending on whether your user is logged in or not.

### #3 - implement `/logout` and `/login` handlers

When a user logs in, an assertion will be posted to `/login`.

When a user logs out, we'll post to `/logout`.

### #4 (optional) - change the defaults if you want

don't like the class names or paths we've chosen as defaults?

    PersonaJS({
      siteName: "My Awesome Site",
      login: { target: '/login', select: '#signin' },
      logout: { target: '/logout', select: '#signout' }
    });

### #5

There is no step 5.  You are done!
