let video = null;
let documentImage = null;

function openCam() {
    video = document.getElementById('video');
    documentImage = document.getElementById('cam');
    if (video != null) {
        console.log("Ok")
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("media avaible")
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(function (stream) {
                    console.log("stream available will proceed to cam process")
                    video.srcObject = stream;
                    video.play()
                })
                .catch(function (error) {
                    console.log("An Error occured while processing...")
                })
        }
    }
    else {
        console.error("no ok");
    }
    video.onplay = function () {
        //var vStream = video.captureStream();
        /*  console.log("stream captured =>" + JSON.stringify(vStream));*/
        processStream();
    }
}




function processStream() {
    var innerCanvas = document.createElement('canvas');
    innerCanvas.width = 400;
    innerCanvas.height = 400;
    var innerContext = innerCanvas.getContext('2d');
    var image = new Image();
    setInterval(() => {
        const ratio = image.width / image.height;
        let newWidth = innerCanvas.width;
        let newHeight = newWidth / ratio;

        if (newHeight < innerCanvas.height) {
            newHeight = innerCanvas.height;
            newWidth = newHeight * ratio;
        }

        const xOffest = newWidth > innerCanvas.width ? (innerCanvas.width - newWidth) / 2 : 0;
        const yOffest = newHeight > innerCanvas.height ? (innerCanvas.height - newHeight) / 2 : 0;

        innerContext.drawImage(video, xOffest, yOffest, newWidth, newHeight);
        image.src = innerCanvas.toDataURL('image/png', 0.2);

        documentImage.src = image.src;
        /*console.log(JSON.stringify(image.src));*/
    }, 50);

    return innerCanvas.toDataURL('image/png', 0.2);
}