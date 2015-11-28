// import $ from "jquery"; global.$ = $;
global.$ = require("jquery")
import Mousetrap from "mousetrap"
import Folders from "./Folders"
import style from "./style.scss"

global.appendStyle = css => {
	let style_tag = $(`<style>`).append(css)
	$("head").append( style_tag )
}

$(function() {
	let folders = new Folders()
	folders.render("body")
})
