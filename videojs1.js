document.addEventListener("DOMContentLoaded", ()=>{
  
    // 좋아요, 싫어요 버튼 이벤트
    // button과 span 불러오기
    const videoLike = document.getElementById('videoLike');
    const videoDislike = document.getElementById('videoDislike');
    
    const videoLikesCount = document.getElementsByClassName('videoLikesCount');
    const videoDisLikeCount = document.getElementsByClassName('videoDislikeCount');
  
    //좋아요 싫어요 개수를 담을 변수.
    let likeCount = 0;
    let dislikeCount = 0;
  
    //초기에 좋아요가 0이면 표시x
    if(likeCount === 0){
      videoLikesCount[0].innerHTML = "";
    }else{
      videoLikesCount[0].innerHTML = likeCount;
    }
    //초기에 싫어요가 0이면 표시x
      if(dislikeCount === 0){
        videoDisLikeCount[0].innerHTML = "";
      }else{
        videoDisLikeCount[0].innerHTML = dislikeCount;
      }
  
    //좋아요 버튼 이벤트 처리
    videoLike.addEventListener('click', function(){
      if(videoLike.classList.contains('material-symbols-outlined')){
        videoLike.classList.remove('material-symbols-outlined');
        videoLike.classList.add('material-icons');
        likeCount++;
        videoLikesCount[0].innerHTML = likeCount;
      }
      else{
        videoLike.classList.remove('material-icons');
        videoLike.classList.add('material-symbols-outlined');
        likeCount--;
        if(likeCount == 0){
          videoLikesCount[0].innerHTML = "";
        }else{
          videoLikesCount[0].innerHTML = likeCount;
        }
      }
    });
    // 싫어요 버튼 이벤트 처리 
    videoDislike.addEventListener('click', function(){
      // 버튼 초기값 변경
      if(videoDislike.classList.contains('material-symbols-outlined')){
        videoDislike.classList.remove('material-symbols-outlined');
        videoDislike.classList.add('material-icons');
        dislikeCount++;
        videoDisLikeCount[0].innerHTML = dislikeCount;
      }
      else{
        videoDislike.classList.remove('material-icons');
        videoDislike.classList.add('material-symbols-outlined');
        dislikeCount--;
        if(dislikeCount == 0){
          videoDisLikeCount[0].innerHTML = "";
        }else{
          videoDisLikeCount[0].innerHTML = dislikeCount;
        }
      }
    });
    
    //=======================================================
    //=======================================================
    // 구독 버튼 클릭 시 subscribe -> subscribed 로 변경
    const subScribeButton = document.getElementById('subscribe');
  
    subScribeButton.addEventListener("click", function(){
      if (subScribeButton.classList.contains("active")) {
        subScribeButton.classList.remove("active");
        subScribeButton.textContent = "SUBSCRIBES"
      } else {
        subScribeButton.classList.add("active");
        subScribeButton.textContent = "SUBSCRIBED"
      }
    });
  
  });