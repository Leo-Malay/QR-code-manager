const qrcode1 = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode1.callback = async (res) => {
    if (res) {
        alert(res);
        res = JSON.parse(res);
        document.getElementById("in_name").value = res.name;
        document.getElementById("in_enrollment").value = res.enrollment;
        document.getElementById("in_mail").value = res.email;
        scanning = false;
        video.srcObject.getTracks().forEach((track) => {
            track.stop();
        });
    }
};

btnScanQR.onclick = () => {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            scanning = true;
            btnScanQR.hidden = true;
            canvasElement.hidden = false;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.srcObject = stream;
            video.play();
            tick();
            scan();
        })
        .catch((err) => {
            alert(err);
        });
};

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
        qrcode1.decode();
    } catch (e) {
        setTimeout(scan, 300);
    }
}
