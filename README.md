# Runty. The NoCMS

### From HTML to NoCMS content editable in 1 minute.

**No Database. No Forms. No CMS.**


*Just edit your web pages **smart!***


[Runty. The NoCMS](http://runtyapp.org) is using [Aloha Editor](http://aloha-editor.org) as HTML5 inline WYSIWYG editor.
See our [guides](http://runtyapp.org/guides/) for more information about the usage.


Open one of our demos:
* [Runty.html](./Runty.html) -- The Runty. The NoCMS app website
* [News.html](./CSS3.html) -- The Moby Dick CSS3 demo with dynamic JSON data


Remove everything except:
* .runty (your project related Runty / Aloha Editor settings)
* runty (Runty App Core - can be used for diffent projects)

and create your [own web page](http://runtyapp.org/guides/example.html).



## Features
* Authentication via BrowserID
* Aloha Editor HTML5 editor
* Supporting HTML5 and CSS3



## Getting Started
See the Runty. The NoCMS getting started guide: [http://runtyapp.org/guides/](http://runtyapp.org/guides/getting-started.html)



### Download and install
It is easy to [install Runty. The NoCMS](http://runtyapp.org/guides/installation.html)!
* [Download the latest version](https://github.com/evo42/runty/archive/master.zip) of Runty. The NoCMS to your computer.
* Extract the runty-x.y.zip archive to your web server root folder.
* Navigate to http://<your.webserver.com>/runty/ and sign in to activate your admin account.
* Make the web server user (eg. www-data) able to read all files in the /.runty/ (your user specific files) and /runty/ (the Runty app files) also the ./ root direcory should be writeable by the web server user.


### Installation via command line
Navigate to your web page root folder and run the following command:
``wget https://raw.github.com/evo42/runty/installer/runty-installer && php runty-installer``


## Editable zones
To turn an area on the website editable with Aloha Editor assign it one of the following *CSS classes*.

* runty-editable
* editable


## Authentication
To edit content on your website you need to be authenticated.

* Add your e-Mail address to ./.runty/users.json
* Navigate to ./runty/signin.php


## Edit content
Just click on any contentEditable area to change the content.


## Save changes
No database is required. The changes will be written directly into the DOM structure of the HTML page.


## Happy editing
It's the most comfortable way to start editing data on the web. Smart. Simple.



## Support
Please navigate to http://runtyapp.org/support/


