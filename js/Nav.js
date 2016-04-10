// JavaScript Document

document.getElementById("navMenu").innerHTML =
'<div class="navbar-header">'+
        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#defaultNavbar1">'+        
        	'<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>'        +
        '<a class="navbar-brand" href="#">TW</a></div>'+
      '<div class="collapse navbar-collapse" id="defaultNavbar1">'+
        '<ul class="nav navbar-nav">'+
          '<li class="active"><a href="#">Home<span class="sr-only">(current)</span></a></li>'+
          '<li><a href="#">About</a></li>'+
          '<li><a href="#">Resume</a></li>'+
		  '<li><a href="#">Portfolio</a></li>'+
          '<li class="dropdown" ><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">More<span class="caret"></span></a>'+
            '<ul class="dropdown-menu" role="menu">'+
              '<li><a  href="places.html">Places I've Been</a></li>'+
              '<li><a href="#">Another action</a></li>'+
              '<li><a href="#">Something else here</a></li>'+
              '<li class="divider"></li>'+
              '<li><a href="#">Separated link</a></li>'+
            '</ul>'+
          '</li>'+
        '</ul>'+
        
        '<ul class="nav navbar-nav navbar-right">'+
          
        '</ul>'+
      '</div>'+