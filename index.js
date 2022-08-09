let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let chatBtn = document.getElementById("chatBtn");
let cameraList = document.getElementById("cameraList");

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

startBtn.onclick = async () => {
  remonCall.connectCall("abcdefg");

  let idx = 0;
  let deviceInfo = await navigator.mediaDevices.enumerateDevices();
  deviceInfo.forEach((result) => {
    if (result.kind === "videoinput") {
      cameraList.options[idx] = new Option(deviceInfo.label, deviceInfo.deviceId);
      console.log(JSON.stringify(result));
      idx++;
    } 
  });

  cameraList.hidden = false;
};

cameraList.onchange = () => {
  remonCall.switchCamera(cameraList.value);
}

stopBtn.onclick = () => {
  remonCall.close();
};

chatBtn.onclick = () => {
  let msg = prompt("Enter : ");
  remonCall.sendMessage(msg);
  console.log(`user : ${msg}`);
};
