// 0804 getChannelVideoList KimSeoHyun
document.addEventListener('DOMContentLoaded', () => {
  // get channel info
  const channelProfile = document.getElementsByClassName('channelProfile');
  // channel_name은 임시로 넣은 것.
  let channel_name = "oreumi";
  let channelUrl = "https://oreumi.appspot.com/channel/getChannelInfo?video_channel=" + channel_name;
  fetch(channelUrl, {
    method: "POST"
  })
    .then((responseChannel) => responseChannel.json())
    .then((data) => {
      let subPeople = data.subscribers;
      let calcsubPeople = "";
      if (subPeople < 1000) {
        calcsubPeople = subPeople + "subscribers";
      } else if (subPeople > 1000 && subPeople < 100000) {
        calcsubPeople = Math.floor(subPeople / 1000) + "K subscribers";
      } else if (subPeople > 100000 && subPeople < 10000000) {
        calcsubPeople = "0." + Math.floor(subPeople / 100000) + "M subscribers";
      } else {
        calcsubPeople = Math.floor(subPeople / 1000000) + "M subscribers";
      }
      let channelInfo = `
          <div class="channelProfilePic">
            <img src="${data.channel_profile}" class="profileImg">
          </div>
          <div class="channelProfileName">
            <span id="channelName" class="channelName">${data.channel_name}</span>
            <span id="subscribers" class="subscribers">${calcsubPeople}</span>
          </div>
        `;
      channelProfile[0].innerHTML = channelInfo;
    });
  // show channel main video(best views)
  // mainVideoContainer => main video div
  const mainVideoContainer = document.getElementById('mainVideoContainer');
  let channelVideoList = "http://oreumi.appspot.com/channel/getChannelVideo?video_channel="+ channel_name;
  fetch(channelUrl, {
    method: "POST"
  })
    .then((responseVideo) => responseVideo.json())
    .then((videodata) => {
      // channel main video 불러오기 진행중
    });
});

// ------------------------------------------------------------------
// channel subscribe
let click = 0;
let isIconAdded = false;
function changeImg() {
  let options = document.getElementById("options");
  let btn = document.getElementById("subscribe");

  // 구독 - 구독중, 색상 변경
  if (btn.textContent == "구독") {
    btn.innerText = "구독중";
    btn.style.backgroundColor = "#4e4c4c"

    // prepend notification
    let notiIcon = document.createElement("img");
    notiIcon.setAttribute("src", "imgChannel/notifications.svg");
    btn.prepend(notiIcon);

    // append expand
    let dropDownIcon = document.createElement("img");
    dropDownIcon.setAttribute("src", "imgChannel/dropDownArrow.svg");
    btn.append(dropDownIcon);

    // 다시 클릭하면 드롭다운
    click++;
    isIconAdded = true;
    return;
  }

  // option dropdown
  if (options.style.display == "none") {
    options.style.display = "block";
  }
  else {
    options.style.display = "none";
  }

}
function selectOption(option) {
  let btn = document.getElementById("subscribe");
  let notiIcon = btn.querySelector("img");
  switch (option) {
    case "all":
      notiIcon.setAttribute("src", "imgChannel/notifications_active.svg");
      break;
    case "custom":
      notiIcon.setAttribute("src", "imgChannel/notifications.svg");
      break;
    case "none":
      notiIcon.setAttribute("src", "imgChannel/notifications_off.svg");
      break;
    default:
      break;
  }
}
// 취소시 원래상태로
function subCancle() {
  if (confirm("구독을 취소하시겠습니까?")) {
    restoreState();
  }
}
function restoreState() {
  let options = document.getElementById("options");
  let btn = document.getElementById("subscribe");
  clickCount = 0;
  options.style.display = "none";
  btn.innerText = "구독";
  btn.style.backgroundColor = "white"
}

//----------0803 배영덕 측 사이드바 더 보기 버튼 활성화 ------------------
document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.getElementById("showMore");
  const hiddenElements = document.querySelectorAll(".hidden");

  let isHidden = true;

  showMoreButton.addEventListener("click", function () {
    if (isHidden) {
      hiddenElements.forEach(function (element) {
        element.style.display = "block";
        element.style.marginTop = "10px";
      });
      showMoreButton.innerText = "간략하게 보기";
    } else {
      hiddenElements.forEach(function (element) {
        element.style.display = "none"
        element.style.marginTop = "0"; // 여백 제거
      });
      showMoreButton.innerText = "더보기";
    }

    isHidden = !isHidden;
  });
});


