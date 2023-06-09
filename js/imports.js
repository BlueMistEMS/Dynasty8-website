$(function () {
	$("#header-import").load("/header.html");
});
$(function () {
	$("#footer-import").load("/footer.html");
});

let path = $(location).attr('pathname');
let filesSplit = path.split("/");
let file = filesSplit[filesSplit.length - 1];
let filename = file.substring(0, (file.length - 5));

if (filesSplit[filesSplit.length - 3] == 'interiors') {
	var folder = "../../../img/interiors/" + filename;
	loadFileNames(folder)
		.then((data) => {
			console.log(data);
			var filesArr = data;
			var carouselHtml = "<div id='property-single-carousel' class='owl-carousel owl-arrow gallery-property'>";
			filesArr.forEach(async file => {
				carouselHtml = carouselHtml + "<div class='carousel-item-b'><img src='" + folder + "/" + file + "'></div>";
			});
			carouselHtml = carouselHtml + "</div>";

			var element = document.getElementById("prop-img-carousel");
			element.innerHTML = carouselHtml;
		})
		.catch((error) => {
			alert('Images could not be loaded. Please tag Clint from IT so he can check into this issue.');
			console.error(error);
		});
}

function loadFileNames(dir) {
	return new Promise((resolve, reject) => {
		try {
			var fileNames = new Array();
			$.ajax({
				url: dir,
				success: function (data) {
					for (var i = 1; i < $(data).find('li span.name').length; i++) {
						var elem = $(data).find('li span.name')[i];
						fileNames.push(elem.innerHTML);
					}
					return resolve(fileNames);
				}
			});
		} catch (ex) {
			return reject(new Error(ex));
		}
	});
}

