export default 

class BootstrapSample {
	constructor() {
		$(document).off('.data-api')
		
		$body.append( $(`<div class="btn btn-danger">ボタン</div>`) )
		$body.append( $(`<div id="myModal"></div>`) )
		$body.append( $(`<button id="unknown-btn" type="button" class="btn btn-default">Tooltip on left</button>`) )
		$body.append( $(`<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>`) )
		
		// $('#myModal').modal()
	}
	setTooltip() {
		$("#unknown-btn").attr({
			"data-toggle": "tooltip",
			"data-placement": "left",
			"title": "タイトル",
		})
		$('[data-toggle="tooltip"]').tooltip({
			animation: true,
			container: false,
			delay: { "show": 500, "hide": 100 },
			html: true,
			placement: "top",
			template: `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`,
			trigger: 'hover focus',
			
		})
		$('[data-toggle="tooltip"]').tooltip("show")
		//  data-toggle="tooltip" data-placement="left" title="Tooltip on left"
	}
}
