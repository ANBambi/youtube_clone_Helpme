// video.js
// DOMContentLoaded 이벤트가 발생하면 실행될 함수
document.addEventListener("DOMContentLoaded", () => {

  // 좋아요 버튼과 싫어요 버튼을 선택하고 해당 요소들을 변수에 할당.
  // .클래스 videoLike , videoDislike 불러와서 할당  (line 35)
  // 07.27 작업 comment like , dislike 
  const thumbUpButton = document.querySelector(".videoLike, .commentLike");
  const thumbDownButton = document.querySelector(".videoDislike, .commentDislike");

// 좋아요 수와 싫어요 수를 표시할 요소들을 선택하고 해당 요소들을 변수에 할당.
// 좋아요 카운트 위 코드랑 똑같이 클래스 불러와서 할당  (line 39)
  const likeCountElement = document.getElementById("videoLikesCount");
  const dislikeCountElement = document.getElementById("videoDislikeCount");
//-------------------------------------------------------------------------------------------



 // 구독 버튼을 선택하고 해당 요소를 변수에 할당  (line 69)
  const subScribeButton = document.querySelector(".subscribe");

// 좋아요 수와 싫어요 수
//  버튼들의 활성 상태를 기록하는 변수들을 초기화
  let likeCount = 0;
  let dislikeCount = 0;
  //
  let thumbUpActive = false;
  let thumbDownActive = false;


// ㅠ-------------------- 클릭 할 때 정의 하는 함수 ------------
// ㅠ-------------------- 클릭 할 때 정의 하는 함수 ------------
// 
const handleThumbUpClick = () => {
  if (!thumbUpActive) {
    likeCount++;
    if (thumbDownActive) {
      dislikeCount--;
      thumbDownButton.classList.remove("active");
      thumbDownActive = false;
    }
  } else {
    likeCount--;
  }

  thumbUpActive = !thumbUpActive;
  thumbUpButton.classList.toggle("active", thumbUpActive);
  thumbDownButton.classList.remove("active");
  thumbDownActive = false;

  likeCountElement.textContent = likeCount;
  dislikeCountElement.textContent = dislikeCount;
};

thumbUpButton.addEventListener("click", handleThumbUpClick);

const handleThumbDownClick = () => {
  if (!thumbDownActive) {
    dislikeCount++;
    if (thumbUpActive) {
      likeCount--;
      thumbUpButton.classList.remove("active");
      thumbUpActive = false;
    }
  } else {
    dislikeCount--;
  }

  thumbDownActive = !thumbDownActive;
  thumbDownButton.classList.toggle("active", thumbDownActive);
  thumbUpButton.classList.remove("active");
  thumbUpActive = false;

  likeCountElement.textContent = likeCount;
  dislikeCountElement.textContent = dislikeCount;
};

thumbDownButton.addEventListener("click", handleThumbDownClick);


// -----------------07.27 작업---------------------------------------
// 구독 버튼 클릭 시 subscribe -> subscribed 로 변경
const handleSubScribeBtnClick = () => {
  if (subScribeButton.classList.contains("active")) {
    subScribeButton.classList.remove("active");
    subScribeButton.textContent = "SUBSCRIBES"
  } else {
    subScribeButton.classList.add("active");
    subScribeButton.textContent = "SUBSCRIBED"
  }
};
subScribeButton.addEventListener("click", handleSubScribeBtnClick);
});
