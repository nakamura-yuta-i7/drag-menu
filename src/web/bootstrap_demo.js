require("./bootstrap_demo.scss")
import BoostrapSample from "./bootstrap_sample"


global.$doc = $(document)


$(function() {
	global.$body = $("body")
	let model = new BoostrapSample()
	model.setTooltip()
})

Mousetrap.bind("*", function(e) {
	console.log( {e} );
})
