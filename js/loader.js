let loader = document.querySelector(".loader-wrapper")

let fadeoutLoader = () => {
    var fadeEffect = setInterval(function () {
        if (!loader.style.opacity) {
            loader.style.opacity = 1;
        }

        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.01;
        } else {
            clearInterval(fadeEffect);
            loader.style.display = "none";
        }
    }, 10); // Hoe lager dit nummer, hoe korter de fade-out
}

if (window.attachEvent) {
    window.attachEvent('onload', fadeoutLoader);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function (evt) {
            curronload(evt);
            fadeoutLoader(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = fadeoutLoader;
    }
}