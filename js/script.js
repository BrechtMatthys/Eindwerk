var player;

//loading
$(window).on('load', function () {
	$('.loader-wrapper').delay(2000).fadeIn();
	$('.loader-wrapper').fadeOut('slow');
});

/* Herhalende code even herwerkt =) */

// Maak een array met alle containers van videos
var media_containers = document.querySelectorAll('.media-container');
var video_ratios = [];

$('html, body').css('overflowY', 'auto');

// Video IDs
const videoId_collection = [
	'h5gIIHMQpcA', // Video ID 1 - Guillaume
	'KNg6i8YV7LE', // Video ID 2 - Karolien
	'xL85lcVU5ag', // Video ID 3 - Miet
	'uXbBiJam24U', // Video ID 4 - Sumeyye
	'Z6paZ436198', // Video ID 5 - Britt
	'HFzRSbtvSeA' //  Video ID 6 - Stef
];

let recalculateSize = () => {
	for (let i = 0; i < media_containers.length; i++) {
		let videoplayer = media_containers[i].querySelector('iframe') || media_containers[i].querySelector('img');

		let width = parseFloat(window.getComputedStyle(videoplayer).width);
		let height = width / video_ratios[i].ratio;

		video_ratios[i].width = width;
		video_ratios[i].height = height;

		if (videoplayer.nodeName == 'IFRAME') videoplayer.setAttribute('height', video_ratios[i].height);
	}
};

$(document).ready(function () {
	// Maak een nieuwe YT Player voor elke video container
	for (let i = 1; i <= media_containers.length; i++) {
		// 'item' is het huidide element waar de loop aan werkt
		const item = media_containers[i - 1];

		// Maak een object met breedte, hoogte, en de ratio tussen de 2 voor makkelijke reference
		video_ratios.push({
			width: parseFloat(window.getComputedStyle(item).width),
			height: parseFloat(window.getComputedStyle(item).height),
			ratio: parseFloat(window.getComputedStyle(item).width) / parseFloat(window.getComputedStyle(item).height)
		});

		// Creëer yt player logic
		$(`#Img${i}`).click(function () {
			if ($(`#Player${i}`).is('div')) {
				$(this).hide();
				player = new YT.Player(`Player${i}`, {
					height: video_ratios[i - 1].height, // Bereken de hoogte op basis van de breedte
					width: '100%',
					playerVars: {
						controls: 1,
						autohide: 1
					},
					videoId: videoId_collection[i - 1], // Vind de juiste video ID
					events: {
						onReady: onPlayerReady,
						onStateChange: onPlayerStateChange
					}
				});
			} else {
				player.autohide = 1;
				player.playVideo();
			}
			// when video ends
			function onPlayerReady(event) {
				event.target.playVideo();
			}

			function onPlayerStateChange(event) {
				if (event.data === 0) {
					$(`#Player${i}`).remove();
					$(`#playerContainer${i}`).append(`<div id ="Player${i}" style="margin-right:30px;"></div>`);
					$(`#Img${i}`).show();
				}
			}
		});
	}
});

setTimeout(() => {
	recalculateSize();
}, 2000);

/* Window Resize fix */
window.onresize = () => {
	recalculateSize();
};