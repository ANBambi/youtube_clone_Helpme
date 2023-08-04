document.addEventListener("DOMContentLoaded", ()=>{
  
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
 
   //like button event
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
   // dislike button event
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
   // share button modal event
   const share = document.getElementById('share');
   share.addEventListener('click', ()=>{
     
   });
   //=======================================================
   //=======================================================
   // comment like and dislike button event
   const commentLike = document.getElementById('commentLike');
   const commentDislike = document.getElementById('commentDislike');
   
   const commentLikesCount = document.getElementById('commentLikesCount');
   const commentDislikeCount = document.getElementById('commentDislikeCount');
   
   console.log(commentLike);
   console.log(commentDislike);
   console.log(commentLikesCount);
   console.log(commentDislikeCount);
 
   let commentLikeCnt = 0;
   let commentDislikeCnt = 0;
 
   //초기에 좋아요가 0이면 표시x
   if(commentLikeCnt == 0){
     commentLikesCount.textContent = "";
   }else{
     commentLikesCount.innerHTML = likeCount;
   }
   //초기에 싫어요가 0이면 표시x
     if(commentDislikeCnt === 0){
       commentDislikeCount.textContent = "";
     }else{
       commentDislikeCount.textContent = dislikeCount;
     }
 
   commentLike.addEventListener('click', ()=>{
     if(commentLike.classList.contains('material-symbols-outlined')){
       commentLike.classList.remove('material-symbols-outlined');
       commentLike.classList.add('material-icons');
       commentLikeCnt++;
       commentLikesCount.innerHTML = commentLikeCnt;
     }
     else{
       commentLike.classList.remove('material-icons');
       commentLike.classList.add('material-symbols-outlined');
       commentLikeCnt--;
       if(commentLikeCnt == 0){
         commentLikesCount.innerHTML = "";
       }else{
         commentLikesCount.innerHTML = commentLikeCnt;
       }
     }
   });
 
   commentDislike.addEventListener('click', ()=>{
     if(commentDislike.classList.contains('material-symbols-outlined')){
       commentDislike.classList.remove('material-symbols-outlined');
       commentDislike.classList.add('material-icons');
       commentDislikeCnt++;
       commentDislikeCount.innerHTML = commentDislikeCnt;
     }
     else{
       commentDislike.classList.remove('material-icons');
       commentDislike.classList.add('material-symbols-outlined');
       commentDislikeCnt--;
       if(commentDislikeCnt == 0){
         commentDislikeCount.innerHTML = "";
       }else{
         commentDislikeCount.innerHTML = commentDislikeCnt;
       }
     }
   });
 
 
 });