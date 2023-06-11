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
			var filesArr = data;
			var carouselHtml = '';
			var indicatorsHtml = '';
			filesArr.forEach(async (file, ind) => {
				if (ind == 0) {
					carouselHtml = carouselHtml + "<div class='carousel-item active'><img class='d-block w-100' src='" + folder + "/" + file + "'></div>";
					indicatorsHtml = indicatorsHtml + "<li data-target='#c' data-slide-to='" + ind + "' class='active'></li>";
				} else {
					carouselHtml = carouselHtml + "<div class='carousel-item'><img class='d-block w-100' src='" + folder + "/" + file + "'></div>";
					indicatorsHtml = indicatorsHtml + "<li data-target='#c' data-slide-to='" + ind + "' ></li>";
				}
			});
			var carouselEle = document.getElementById("property-carousel-images");
			carouselEle.innerHTML = carouselHtml;
			var indicatorsEle = document.getElementById("property-carousel-indicators");
			indicatorsEle.innerHTML = indicatorsHtml;
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
					if ($(location).attr('hostname') == '127.0.0.1') {
						for (var i = 1; i < $(data).find('li span.name').length; i++) {
							var elem = $(data).find('li span.name')[i];
							fileNames.push(elem.innerHTML);
						}
					} else {
						for (var i = 1; i < $(data).find('td a').length; i++) {
							var elem = $(data).find('td a')[i];
							fileNames.push(elem.innerHTML);
						}
					}
					return resolve(fileNames);
				}
			});
		} catch (ex) {
			return reject(new Error(ex));
		}
	});
}

