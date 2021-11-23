
// Intial define of global variables for luminance
window.rgbLumX = 0.1635;
window.rgbLumY = 0.9255;

$( document ).ready(contrastCalc());


// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// -------------- Color Luminance and Contrast Ratio Calculations ---------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Part 1 of Contrast Ratio Calculation (WC3/WCAG2.1)
// Calculate luminance based upon user hex input
// For source and breakdown, see: https://www.w3.org/TR/WCAG20-TECHS/G18.html#G18-tests 
function luminanceCalc(hexCode, rgbTarget, lumTarget) {
    
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexCode);

    // Convert hex color code to RGB integers
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
  
  
    // Combine parsed rgb values for display
    var rgb = r + ", " + g + ", " + b;
    // Display rgb values as text under hex input field
    $(rgbTarget).text(rgb);
  
  
    // Calculate RsRGB, GsRGB, and BsRGB values
    var rSRGB = r / 255;
    var gSRGB = g / 255;
    var bSRGB = b / 255;

    // Calculate mid-formula R value
    if (rSRGB <= 0.03928) {
      var rCalc = rSRGB / 12.92;
    } else{
      var rCalcPrePow = (rSRGB+0.055)/1.055;
      var rCalc = Math.pow(rCalcPrePow, 2.4);
    }

    // Calculate mid-formula G value
    if (gSRGB <= 0.03928) {
      var gCalc = gSRGB / 12.92;
    } else{
      var gCalcPrePow = (gSRGB+0.055)/1.055;
      var gCalc = Math.pow(gCalcPrePow, 2.4);
    }

    // Calculate mid-formula B value
    if (bSRGB <= 0.03928) {
      var bCalc = bSRGB / 12.92;
    } else{
      var bCalcPrePow = (bSRGB+0.055)/1.055;
      var bCalc = Math.pow(bCalcPrePow, 2.4);
    }

    // Derive relative luminance value of input hex
    var rgbLum = (0.2126*rCalc)+(0.7152*gCalc)+(0.0722*bCalc);

    // Update page content to display luminance value
    $(lumTarget).text(rgbLum.toFixed(4));
  
    // Return luminance value for storage as global variable
    return rgbLum;
}


// Part 2 of Contrast Ratio Calculation
// Calculate contrast using luminance values LumX and LumY 
function contrastCalc() {

  // Perform contrast ratio calc on both luminance values (X & Y) depending upon which is larger
  // Luminance values are pulled from global variables
  if(window.rgbLumX > window.rgbLumY){
    var contrastVal = ((window.rgbLumX + 0.05)/(window.rgbLumY + 0.05)).toFixed(2);
  } else{
    var contrastVal = ((window.rgbLumY + 0.05)/(window.rgbLumX + 0.05)).toFixed(2);
  }  

  // Update contrast ratio text on page with result
  $('#contrast-val').text(contrastVal)
  
  
  // Update pass / fail text & colors based upon result
  if(contrastVal >= 4.5){
    $('#normal-val-aa').text("Pass").css("color", "#008A17");
    $('#large-val-aaa').text("Pass").css("color", "#008A17");
  }else{
    $('#normal-val-aa').text("Fail").css("color", "#EB0000");
    $('#large-val-aaa').text("Fail").css("color", "#EB0000");
  }
  if(contrastVal >= 3.0){
    $('#large-val-aa').text("Pass").css("color", "#008A17");
  }else{
    $('#large-val-aa').text("Fail").css("color", "#EB0000");
  }
  if(contrastVal >= 7.0){
    $('#normal-val-aaa').text("Pass").css("color", "#008A17");
  }else{
    $('#normal-val-aaa').text("Fail").css("color", "#EB0000");
  }
  
  // Unrelated: Check luminance of selected color and change picker icons color accordingly for contrast 
  if(window.rgbLumX > .5 ){
    $("#input-picker-a").css("color","#333333");
  } else{
    $("#input-picker-a").css("color","#ffffff");
  }
  if(window.rgbLumY > .5 ){
    $("#input-picker-b").css("color","#333333");
  } else {
    $("#input-picker-b").css("color","#ffffff");
  }
  
}






// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// --------------- Color Picker Input Live Update Functionality -----------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Event handlers for color pickers to poll their value and 
// use it to update the value of the text inputs in real time

var inputPickerA;
var inputPickerB;

window.addEventListener("load", startup, false);

function startup() {
  inputPickerA = document.querySelector("#input-picker-a");
  inputPickerA.addEventListener("input", updateFirstA, false);
  inputPickerA.addEventListener("change", updateAllA, false);
  //inputPickerA.select();
  
  inputPickerB = document.querySelector("#input-picker-b");
  inputPickerB.addEventListener("input", updateFirstB, false);
  inputPickerB.addEventListener("change", updateAllB, false);
  //inputPickerB.select();
}

// Color picker 1 (left) live user input activities
function updateFirstA(event) {
  
  // Store color picker A value as variable
  var hexVal = event.target.value
  
  // Update text input A with value from color picker A
  $("#input-text-a").val(hexVal);
  
  // Set 'background-color' CSS parameter in left box to value from color picker A
  $('#box-color-target-a').css("background-color", hexVal);
  // Update text of color-a in left box with value from color picker A
  $('#hex-color-a-left').text(hexVal);

  // Set 'color' CSS parameter in right box to value from color picker A
  $('#box-color-target-b').css("color", hexVal);
  // Update text for color-a in right box with value from color picker A
  $('#hex-color-a-right').text(hexVal);
    
  // Perform luminance calculation for selected color, then store the value globally
  window.rgbLumX = luminanceCalc(hexVal, '#rgb-val-X', '#lum-val-X')

  // Perform contrast calculation with updated LumX and LumY values
  contrastCalc();
}

  // Color picker 1 (left) values after picker dismissed
  function updateAllA(event) {
    // Store color picker A value as variable
    var hexVal = event.target.value

    $('#input-text-a').val(hexVal);
  }


// Color picker 2 (right) live user input activities
function updateFirstB(event) {
  // Store color picker B value as variable
  var hexVal = event.target.value
  
  // Update text input B with value from color picker b
  $("#input-text-b").val(hexVal);
  
  // Set 'background-color' CSS parameter in right box to value from color picker b
  $('#box-color-target-b').css("background-color", hexVal);
  // Update text for color-b in right box with value from color picker b
  $('#hex-color-b-right').text(hexVal);

  // Set 'color' CSS parameter in left box to value from color picker b
  $('#box-color-target-a').css("color", hexVal);
  // Update text for color-b in left box with value from color picker b
  $('#hex-color-b-left').text(hexVal);
    
  // Perform luminance calculation for selected color, then store the value globally
  window.rgbLumY = luminanceCalc(hexVal, '#rgb-val-Y', '#lum-val-Y')

  // Perform contrast calculation with updated LumX and LumY values
  contrastCalc();
}

  // Color picker 2 (right) values after picker dismissed
  function updateAllB(event) {
    // Store color picker A value as variable
    var hexVal = event.target.value

    $("#input-text-b").val(hexVal);
  }



// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// --------------- Text Input Submit Button Update Functionality ----------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

// Update colors, then perform luminance and contrast calculation based upon user hex input on left side
 function textUpdateColorA() {
      
   // Get hex value from text input a
   var hexColorA = $('#input-text-a').val();

   // Set 'background-color' CSS parameter in left box to submitted hex value
   $('#box-color-target-a').css("background-color", hexColorA);
   // Update text of color-a in left box with hex value
   $('#hex-color-a-left').text(hexColorA);

   // Set 'color' CSS parameter in right box to submitted hex value
   $('#box-color-target-b').css("color", hexColorA);
   // Update text for color-a in right box with hex value
   $('#hex-color-a-right').text(hexColorA);

   // Set color picker A value to whatever user entered into text input A
   $("#input-picker-a").val(hexColorA);

   // Perform luminance calculation for Color A, then store the value globally
   window.rgbLumX = luminanceCalc(hexColorA, '#rgb-val-X', '#lum-val-X')

   // Perform contrast calculation with updated LumX and LumY values
   contrastCalc();

};


// Update colors, then perform luminance and contrast calculation based upon user hex input on right side
function textUpdateColorB() {
      
  //Get hex value from text input a
  var hexColorB = $('#input-text-b').val();

  // Set 'background-color' CSS parameter in right box to submitted hex value
  $('#box-color-target-b').css("background-color", hexColorB);
  // Update text for color-b in right box with hex value
  $('#hex-color-b-right').text(hexColorB);

  // Set 'color' CSS parameter in left box to submitted hex value
  $('#box-color-target-a').css("color", hexColorB);
  // Update text for color-b in left box with hex value
  $('#hex-color-b-left').text(hexColorB);

  // Set color picker A value to whatever user entered into text input A
  $("#input-picker-b").val(hexColorB);

  // Perform luminance calculation for Color A, then store the value globally
  window.rgbLumY = luminanceCalc(hexColorB, '#rgb-val-Y', '#lum-val-Y')

  // Perform contrast calculation with updated LumX and LumY values
  contrastCalc();
    
};










// Functions to clean up hex value that users have input into the text fields

// Force text input values to begin with "#"
function addHash(elem) {
  
  // Get value of text input
  var textInputHex = elem.value;  
  
  if(!textInputHex.match(/^#/)) {
    elem.value = "#" + textInputHex;
  }

}

// Convert 3 character hex to 6 character hex
function hexConvert(elem) {
  
  // Get value of text input after removing "#"
  var textInputHex = elem.value.substring(1);  
  
  // If a three-character hexcolor, make six-character
  if (textInputHex.length === 3) {
    textInputHex = textInputHex.split('').map(function (hex) {
      return hex + hex;
    }).join('');
    elem.value = "#" + textInputHex;
  }
  
}













// Test code for suggesting new colors
// This is stupidly simple and needs to be improved to intelligently factor in luminance from both colors
// Below, all it does is add or subtract a set value from r, g, and b

//     var rAlt1 = r - 12;
//     var gAlt1 = g - 12;
//     var bAlt1 = b - 12;

//     function componentToHex(c) {
//       var hexAlt1 = c.toString(16);
//       return hexAlt1.length == 1 ? "0" + hexAlt1 : hexAlt1;
//     }

//     function rgbToHex(rConv, gConv, bConv) {
//       return "#" + componentToHex(rConv) + componentToHex(gConv) + componentToHex(bConv);
//     }
  
//     var hexAlt1 = rgbToHex(rAlt1, gAlt1, bAlt1);
//     $('#alt-color-left-1').css("background-color", hexAlt1);
