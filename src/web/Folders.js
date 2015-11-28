export default

class Folders {
	constructor() {
		this.class = "folders"
		this.data = [
			{ id: 1, name: "フォルダ1" },
			{ id: 2, name: "フォルダ2" },
			{ id: 3, name: "フォルダ3" },
			{ id: 4, name: "フォルダ4" },
			{ id: 5, name: "フォルダ5" },
		]
		this.folders = this.data.map( (datum) => new Folder(datum) )
		
	}
	render(targetElem) {
		let $ul = $(`
			<ul class="${this.class}">
			</ul>
		`)
		this.folders.map( (folder) => {
			$ul.append( folder.getElem() )
		} )
		
		$(targetElem).append( $ul )
		this.$folders = $ul
		this.$folders.css({
			"font-size": "20px",
			"font-weight": 900,
		})
		this.setDndEvent()
	}
	setDndEvent() {
		let $doc = $(document)
		let id_drag_start = null
		let id_drag_end = null
		$doc.on("dragstart", ".folder", function(e) {
			id_drag_start = $(this).attr("folder_id")
			$(this).addClass("dragstart")
			console.log( "on dragover.", {id_drag_start, id_drag_end, e} );
		})
		$doc.on("dragover", ".folder", function(e) {
			id_drag_end = $(this).attr("folder_id")
			console.log( "on dragover.", {id_drag_start, id_drag_end, e} );
			$(this).addClass("dragover")
			return false;
		})
		$doc.on("dragleave", ".folder", function(e) {
			id_drag_end = null
			console.log( "on dragleave.", {id_drag_start, id_drag_end, e} );
			$(this).removeClass("dragover")
		})
		$doc.on("drop", ".folder", function(e) {
			e.preventDefault();
			console.log( "on drop.", {id_drag_start, id_drag_end, e, this: $(this) } );
			if ( ! id_drag_end || id_drag_start == id_drag_end ) {
				Folders.removeDndClass()
			} else {
				let message = `フォルダ：${id_drag_start} を ${id_drag_end} に移動しますか？`
				let menu = new FolderDropendMenu(message)
				let position = {
					top: e.originalEvent.pageY,
					left: e.originalEvent.pageX
				}
				menu.render(position)
			}
		})
		$doc.on("dragend", ".folder", function(e) {
			console.log( "on dragend." );
			if ( ! id_drag_end ) {
				Folders.removeDndClass()
			}
		})
	}
	static removeDndClass() {
		console.log( "removeDndClass" );
		$(".dragover").removeClass("dragover")
		$(".dragstart").removeClass("dragstart")
	}
}


class Folder {
	constructor(values) {
		this.id = values.id
		this.name = values.name
	}
	getElem() {
		let folder = this
		let $elem = $(`<li class="folder" folder_id="${folder.id}"><a href="/?folder_id=${folder.id}">${folder.name}</a></li>`)
		return $elem
	}
}


class Menu {
	constructor(params) {
		let className = params.class
		let items = params.items
		let message = params.message
		let itemsHtml = ""
		items.forEach( item => {
			itemsHtml += `<a class="${item.class}">${item.text}</a>`
		})
		this.$elem = $(`
			<div class="${className}">
				<div class="menu-bg"></div>
				<div class="menu">
					<div class="title">${message}</div>
					${itemsHtml}
				</div>
			</div>
		`)
	}
	get$Elem() {
		return this.$elem
	}
}


class FolderDropendMenu {
	constructor(message) {
		let menu = new Menu({
			class: "folder-dropend",
			message,
			items: [
				{ class: "copy", text: "コピーする" },
				{ class: "move", text: "移動する" },
			]
		});
		this.$elem = menu.get$Elem()
		this.$menu = this.$elem.find(".menu")
		this.$menuBg = this.$elem.find(".menu-bg")
		this.setEvent()
	}
	render(position) {
		$("body").append(this.$elem)
		this.setPosition(position)
	}
	setPosition(values) {
		console.log( values );
		this.$menu.css({
			top: values.top,
			left: values.left,
		})
	}
	setEvent() {
		this.$menuBg.on("click", e => {
			this.remove()
		})
	}
	remove() {
		this.$elem.remove()
		Folders.removeDndClass()
	}
}

// let body = document.querySelector('body')
// let bodyMousetrap = new Mousetrap( body )
// bodyMousetrap.bind("enter", e => {
// 	console.log( e );
// })
