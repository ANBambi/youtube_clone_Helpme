document.addEventListener("DOMContentLoaded", () => {

  // get video info(selected by user) 여기는 비디오  추가된 부분
  let requestUrl = window.location.href;
  let url = new URL(requestUrl);
  let videoId = url.searchParams.get("videoId"); //비디오의 고유번호
  let videoUrl = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + videoId;
  fetch(videoUrl)
    .then((response) => response.json())
    .then((data) => {
      // set video content
      const videoContainer = document.getElementById('videoContainer');
      let video = `
        <video src="${data.video_link}" id="selectedVideo" class="selectedVideo" controls autoplay></video>
      `;
      videoContainer.innerHTML = video;
      // set video title
      const videoTitleDiv = document.getElementById('videoTitle');
      let videoTitle = `
        <p class="videoTitle">${data.video_title}</p>
      `;
      videoTitleDiv.innerHTML = videoTitle;
      // set video info
      const videoInfoDiv = document.getElementById('videoInfo');
      let uploadDate = data.upload_date.replaceAll('/', '.');
      let videoInfo = `
        <span class="views" id="views"> ${calculateViews(data.views)}</span>
        <span class="uploadDate" id="uploadDate">. ${uploadDate}</span>
      `;
      videoInfoDiv.innerHTML = videoInfo;

      // set video explain
      const videoExplain = document.getElementById('videoExplain');
      let videoExplainContent = `
      <p class="videoText" id="videoText">${data.video_detail}</p>
      <a href="#" class="showMore" id="showMore">SHOW MORE</a>
      `;
      videoExplain.innerHTML = videoExplainContent;


      // get selected Video's channel info
      let channelName = data.video_channel;
      const getChannelURL = 'http://oreumi.appspot.com/channel/getChannelInfo?video_channel=' + channelName;
      fetch(getChannelURL, {
        method: "POST"
      })
        .then((responseChannel) => responseChannel.json())
        .then((channelData) => {
          // set channel profile img
          const channelImg = document.getElementById('channelimg');
          let channelProfileImg = `
            <img src="${channelData.channel_profile}" alt="">
          `;
          channelImg.innerHTML = channelProfileImg;

          // set channel name and subscribers
          const channelInfo = document.getElementById('channelInfo');
          let channelDetails = `
            <p class="channelName" id="channelName">${channelData.channel_name}</p>
            <p class="subscribers" id="subscribers">${channelData.subscribers} subscribers</p>
          `;
          channelInfo.innerHTML = channelDetails;
        });
    });
// 오류 수정 

  // ========video Info button event=============
  // like dislike button event 
  const videoLike = document.getElementById('videoLike');
  const videoDislike = document.getElementById('videoDislike');

  const videoLikesCount = document.getElementsByClassName('videoLikesCount');
  const videoDisLikeCount = document.getElementsByClassName('videoDislikeCount');

  //count like and dislike
  let likeCount = 0;
  let dislikeCount = 0;

  //초기에 좋아요가 0이면 표시x
  if (likeCount === 0) {
    videoLikesCount[0].innerHTML = "";
  } else {
    videoLikesCount[0].innerHTML = likeCount;
  }
  //초기에 싫어요가 0이면 표시x
  if (dislikeCount === 0) {
    videoDisLikeCount[0].innerHTML = "";
  } else {
    videoDisLikeCount[0].innerHTML = dislikeCount;
  }

  //like button event
  videoLike.addEventListener('click', function () {
    if (videoLike.classList.contains('material-symbols-outlined')) {
      videoLike.classList.remove('material-symbols-outlined');
      videoLike.classList.add('material-icons');
      likeCount++;
      videoLikesCount[0].innerHTML = likeCount;
    }
    else {
      videoLike.classList.remove('material-icons');
      videoLike.classList.add('material-symbols-outlined');
      likeCount--;
      if (likeCount == 0) {
        videoLikesCount[0].innerHTML = "";
      } else {
        videoLikesCount[0].innerHTML = likeCount;
      }
    }
  });
  // dislike button event
  videoDislike.addEventListener('click', function () {
    // 버튼 초기값 변경
    if (videoDislike.classList.contains('material-symbols-outlined')) {
      videoDislike.classList.remove('material-symbols-outlined');
      videoDislike.classList.add('material-icons');
      dislikeCount++;
      videoDisLikeCount[0].innerHTML = dislikeCount;
    }
    else {
      videoDislike.classList.remove('material-icons');
      videoDislike.classList.add('material-symbols-outlined');
      dislikeCount--;
      if (dislikeCount == 0) {
        videoDisLikeCount[0].innerHTML = "";
      } else {
        videoDisLikeCount[0].innerHTML = dislikeCount;
      }
    }
  });

  //=======================================================
  // video modal event
  // share button modal event
  const share = document.getElementById('share');
  share.addEventListener('click', () => {
    const shareModalContainer = document.getElementById('shareModalContainer');
    shareModalContainer.style.display = "block";

    // set current url
    const currentUrl = document.getElementById('currentUrl');
    let getCurrentUrl = window.location.href;
    let newCurrentUrl = new URL(getCurrentUrl);
    currentUrl.innerHTML = `<p>${newCurrentUrl}</p>`;
  });

  // save button modal event
  const save = document.getElementById('save');
  save.addEventListener('click', () => {
    const saveModalContainer = document.getElementById('saveModalContainer');
    saveModalContainer.style.display = 'block';
  });
  //=======================================================
  //=======================================================
  // comment like and dislike button event
  const commentLike = document.getElementById('commentLike');
  const commentDislike = document.getElementById('commentDislike');
  const commentLikesCount = document.getElementById('commentLikesCount');
  const commentDislikeCount = document.getElementById('commentDislikeCount');
  // like and dislike count 변수

  let commentLikeCnt = 0;
  let commentDislikeCnt = 0;

  //초기에 좋아요가 0이면 표시x
  if (commentLikeCnt == 0) {
    commentLikesCount.textContent = "";
  } else {
    commentLikesCount.innerHTML = likeCount;
  }
  //초기에 싫어요가 0이면 표시x
  if (commentDislikeCnt === 0) {
    commentDislikeCount.textContent = "";
  } else {
    commentDislikeCount.textContent = dislikeCount;
  }

  commentLike.addEventListener('click', () => {
    if (commentLike.classList.contains('material-symbols-outlined')) {
      commentLike.classList.remove('material-symbols-outlined');
      commentLike.classList.add('material-icons');
      commentLikeCnt++;
      commentLikesCount.innerHTML = commentLikeCnt;
    }
    else {
      commentLike.classList.remove('material-icons');
      commentLike.classList.add('material-symbols-outlined');
      commentLikeCnt--;
      if (commentLikeCnt == 0) {
        commentLikesCount.innerHTML = "";
      } else {
        commentLikesCount.innerHTML = commentLikeCnt;
      }
    }
  });

  commentDislike.addEventListener('click', () => {
    if (commentDislike.classList.contains('material-symbols-outlined')) {
      commentDislike.classList.remove('material-symbols-outlined');
      commentDislike.classList.add('material-icons');
      commentDislikeCnt++;
      commentDislikeCount.innerHTML = commentDislikeCnt;
    }
    else {
      commentDislike.classList.remove('material-icons');
      commentDislike.classList.add('material-symbols-outlined');
      commentDislikeCnt--;
      if (commentDislikeCnt == 0) {
        commentDislikeCount.innerHTML = "";
      } else {
        commentDislikeCount.innerHTML = commentDislikeCnt;
      }
    }
  });
});

// alert copy
function alertCopy(){
  alert('복사 되었습니다');
}

// close share modal
function shareClose() {
  shareModalContainer.style.display = 'none';
}
// close save modal
function saveClose() {
  saveModalContainer.style.display = 'none';
}
// move home main
function goHome() {
  window.location.href = 'index.html';
}
// calculate video views
function calculateViews(viewsData) {
  let views = viewsData;
  let calcViews = "";
  if (views < 1000) {
    calcViews = views + "views";
  }
  else if (views > 1000 && views < 100000) {
    calcViews = Math.floor(views / 1000) + "K Views";
  } else if (views > 100000 && views < 10000000) {
    calcViews = "0." + Math.floor(views / 100000) + "M Views";
  } else {
    calcViews = views / 1000000 + "M Views";
  }
  return calcViews;
}