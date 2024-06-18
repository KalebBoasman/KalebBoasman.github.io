//created a simple variable to track whether the navbar is currently visible or not
var navState = "off";
/*
The core of the navigation funciton are these two functions that set the width of the sidebar
while adding a margin for everything else. Obviously the second function just sets it back
to normal.
*/
function openNav() {
   document.getElementById("sidebar").style.width = "20vw";
   document.getElementById("mainContent").style.marginLeft = "20vw";
   document.getElementById("navbar").style.marginLeft = "20vw";
   document.getElementById("header").style.marginLeft = "20vw";
   document.getElementById("footer").style.marginLeft = "20vw";
 }

 function closeNav() {
   document.getElementById("sidebar").style.width = "0";
   document.getElementById("mainContent").style.marginLeft = "0px";
   document.getElementById("navbar").style.marginLeft = "0px";
   document.getElementById("header").style.marginLeft = "0px";
   document.getElementById("footer").style.marginLeft = "0px";
 }

 /*
 originally the menu button called the openNav() function directly and the
 close button called closeNav() directly. However, I didn't like that you
 couldn't press the menu button again to close it so I created this simple
 toggle function and had both buttons call this function.
 */
 function navToggle() {
   if (navState == "off")
   {
      navState = "on";
      openNav();
   }
   else
   {
      navState = "off";
      closeNav();
   }
 }