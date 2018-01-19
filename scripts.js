/*
* Constants
*/
INDICATOR_CONTENT_TRUE = "✔";
//INDICATOR_CONTENT_FALSE = "✘";
INDICATOR_CONTENT_FALSE = "";

/* 
* Reads a bitfield represented as an integer
* Params: value = the bitfield expressed as a string, wantedBit = the wanted bit to check for, starting from the right of the string (0, 1, 2, 4, etc)
* Returns: Bool, was wanted bit active or not, or value as binary doesn't go that far (e.g. testing for bit 1024 when value was 512)
*/
function checkBitInteger(value, wantedBit) {
	if (isNil(value)) return false;
	if (isNil(wantedBit)) throw("Must supply a wanted bit");
	
	var bits = (parseInt(value)).toString(2); //NOTE! Value must be a number or a hex string (0x0934)! Using a string won't work
	var targetIndex = bits.length - wantedBit;

	if (targetIndex < 0) {
		//Bit out of range
		return false;
	} else {
		//Bit in range, check it
		return bits[targetIndex] == "1";
	}
}

/*
* Shortcut function for document.getElementById
*/
function gel(name) {
	return document.getElementById(name);
}

function isNil(a) {
	if (a == "") return true;
	if (a == undefined) return true;
	if (a == null) return true;

	return false;
}

/*
* Recalculate the result, and update the results display
*/

function WUT_RecalculateResult() {

	// Get the value to calculate
	var strInput = gel("wut-input-field").value;

	// Get a list of result indicators
	var indicators = document.getElementsByClassName("wut-calcresult");
	for (var i=0; i < indicators.length; i++) {
		var currentIndicator = indicators[i];

		var valueString = (""+currentIndicator.id).replace("wut-calcresult-", "");
		var valueNumber = parseInt( valueString );
		if (valueNumber == NaN) {
			console.log("Error: Unable to parse indicator value: "+valueString);
		} else {
			var r = checkBitInteger(strInput, valueNumber);
			currentIndicator.setAttribute("enabled", r);
			currentIndicator.innerHTML = r ? INDICATOR_CONTENT_TRUE : INDICATOR_CONTENT_FALSE;
		}
	}
}
