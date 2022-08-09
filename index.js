let flipBtn = document.getElementById("flipBtn");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let chatBtn = document.getElementById("chatBtn");

const config = {
  credential: {
    serviceId: "a89a8f14-75bc-43a3-9037-3b0023a0b6fb", // 콘솔에서 획득한 Service ID
    key: "7fa96ed9c2f0ed8ebdad4f9a3f6283fea366f0f7fe52e7978b8bbcfa2b7e199c", // 콘솔에서 획득한 Service Key
  },
  view: {
    local: "#localVideo", // 로컬(자신) 비디오 태그 지정
    remote: "#remoteVideo", // 리모트(상대방) 비디오 태그 지정
  },
  media: {
    video: true, // true로 설정 시 비디오를 사용함
    audio: true, // true로 설정 시 오디오를 사용함
  },
};

const listener = {
  onInit(token) {
    console.log("token : ", token); // UI 처리등 Remon 클래스가 초기화 되었을 때 처리하여야 할 작업
  },

  onConnect(channelId) {
    console.log("onConnect : ", channelId);
  },

  onComplete() {
    console.log("onComplete");
  },

  onClose() {
    console.log("partner has gone");
    remonCall.close();
  },

  onMessage(msg) {
    console.log(`partner : ${msg}`);
  },
};

const remonCall = new Remon({ config, listener });

let isFront = true;
let frontCamera = null;
let rearCamera = null;

navigator.mediaDevices.enumerateDevices().then((result) => {
  result.forEach((deviceInfo) => {
    if (deviceInfo.kind === "videoinput" && deviceInfo.label === "전면 카메라") {
      console.log(JSON.stringify(deviceInfo));
      frontCamera = deviceInfo.deviceId;
    } else if (deviceInfo.kind === "videoinput" && deviceInfo.label === "후면 카메라") {
      console.log(JSON.stringify(deviceInfo));
      rearCamera = deviceInfo.deviceId;
    }
  });
});

startBtn.onclick = async () => {
  remonCall.connectCall("abcdefg");
};

stopBtn.onclick = () => {
  remonCall.close();
};

flipBtn.onclick = async () => {
  if (isFront) remonCall.sendMessage(rearCamera);
  else remonCall.sendMessage(frontCamera);

  isFront = !isFront;
};

chatBtn.onclick = () => {
  let msg = prompt("Enter : ");
  remonCall.sendMessage(msg);
  console.log(`user : ${msg}`);
};
