

// -----------------------------enterkey로 search button 실행
function enterkey() {
	if (window.event.keyCode == 13) {
      fn_search();
    }
}
//---------------------------------------------------------------
function fn_search(){
    
    var searchInput = document.getElementById('searchInput');
    if(searchInput.value == ''){
          alert("검색어를 입력해주세요.");
          return false;
    }

   const ThumbnailRowThumbnailItem = document.getElementById('ThumbnailRowThumbnailItem');
   ThumbnailRowThumbnailItem.innerHTML = '';
    
   var itemCnt = 0;

   fetch("http://oreumi.appspot.com/video/getVideoList")
   .then((resonse)=>resonse.json())
   .then((data) =>{
     // display home.html
     for(let i = 0; i < data.length; i++){
        // video_title에서 searchInput
        // 없을 경우 continue
        if(data[i].video_title.indexOf(searchInput.value) == -1){
           continue;
        }else{
          itemCnt++;
        }
       // create div for thumbnail image
       let thumbnailImgDiv = document.createElement('div');
       thumbnailImgDiv.className = 'ThumbnailImages';
 
       // url for getting video img
       let url = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + data[i].video_id;
       // get video img
       fetch(url)
       .then((responseImg)=> responseImg.json())
       .then((dataImg)=>{
       
         let imgDiv =`
           <div id="ThumbnailImages">
             <img class="Image1" src="${dataImg.image_link}">
           </div>
           `;
          //검색결과에서 time 안보이게
          //  <div class="Videotime">
          //    <div class="Videotime">23:45</div>
          //  </div>
           thumbnailImgDiv.innerHTML = imgDiv;
       });
       ThumbnailRowThumbnailItem.append(thumbnailImgDiv);
 
       //create div for thumbnail channel info
       let thumbnailChannel = document.createElement('div');
       thumbnailChannel.className = thumbnailChannel;
       
       // get video channel image
       let channelUrl = "http://oreumi.appspot.com/channel/getChannelInfo?video_channel="+data[i].video_channel;
       fetch(channelUrl, {
         method: "POST"
       })
       .then((responseChannel)=> responseChannel.json())
       .then((dataChannel)=>{
         let channelProfilePic =`
           <div class="ThumbnailProfilePic">
             <div class="UserAvatar">
                 <img class="UserAvatar" src="${dataChannel.channel_profile}" style="width: 36px; height: 36px;">
             </div>
           </div>
         `;
         thumbnailChannel.innerHTML = channelProfilePic;
       });
      //  검색결과에서 썸네일 이미지 안 보이게.
      //  ThumbnailRowThumbnailItem.append(thumbnailChannel);
       
       //create div for video desc
       let thumbnailDecs = document.createElement('div');
       thumbnailDecs.className = 'ThumbnailDesc';
 
       // calculate views
       let views = data[i].views;
       let calcViews = "";
       if (views < 1000){
         calcViews = views + "views";
       }
       else if(views >1000 && views < 100000){
         calcViews = Math.floor(views/1000) +"K Views";
       }else if(views > 100000 && views < 10000000 ){
         calcViews = "0."+ Math.floor(views/100000) + "M Views";
       }else{
         calcViews = views/1000000 + "M Views";
       }
 
       // calculate dates
       let calcDate = "";
       const today = new Date();
       let upload = data[i].upload_date;
       let uploadDate = upload.split("/");
       // case: same all
       if(uploadDate[0] == today.getFullYear() &&
         uploadDate[1] == today.getMonth()+1 &&
         uploadDate[2] == today.getDay()){
         calcDate = "today";
       }
       // case: same year and month but different day
       if(uploadDate[0] == today.getFullYear() &&
         uploadDate[1] == today.getMonth()+1){
         let uploadDay = 0;
         // compare with day which is bigger
         if(uploadDate[2] > today.getDay()){
           uploadDay = uploadDate[2] - today.getDay();
         }else{
           uploadDay = today.getDay() - uploadDate[2];
         }
         // calculate weeks
         week = Math.floor(uploadDay/7);
         switch(week){
           case 0: 
             calcDate = uploadDay + " days ago";
             break;
           case 1:
           case 2:
           case 3:
             calcDate = week + " week ago";
             break;
           case 4:
             calcDate = "1 month ago";
             break;
         }
       }
       // case: same year but differnt month
       if(uploadDate[0] == today.getFullYear() &&
       uploadDate[1] != today.getMonth()+1){
         //calculate month
         let uploadMonth = 0;
         // compare with day which is bigger
         if(uploadDate[1] > today.getMonth()+1){
           uploadMonth = uploadDate[1] - today.getMonth()+1;
         }else{
           uploadMonth = today.getMonth()+1 - uploadDate[1];
         }
         calcDate = uploadMonth + " month ago";
       }
       // case: different year
       if(uploadDate[0] != today.getFullYear()){
         let uploadYear = 0;
         if(uploadDate[0] > today.getFullYear()){
           uploadYear = uploadDate[0] - today.getFullYear();
         }else{
           uploadYear = today.getFullYear() - uploadDate[0];
         }
 
         calcDate = uploadYear + " years ago";
       }
 
       let thumbnailVideoDesc =`
         <div class="ThumbnailDescTitle">
           <div class="videoTitle">${data[i].video_title}</div>
         </div>
         <div class="ThumbnailDescInfo">
           <div class="ChanelName">${data[i].video_channel}</div>
           
         </div>
       `;
      //  <div class="Time"> ${calcViews} .${calcDate}</div>
       thumbnailDecs.innerHTML = thumbnailVideoDesc;
       ThumbnailRowThumbnailItem.append(thumbnailDecs);
     }
     
    if(itemCnt < 1) {
    alert("검색결과가 없습니다.");
    }
   });
}

// videoAction _ 2023-08-01 이민영
// 추가작성예정
//   export const getSubscribedChannel = (id) => async (dispatch) => {
//     try {
//       dispatch({
//         type: CHANNEL_REQUEST,
//         id:id
//       })


//       // get upload playist ID
//       const { data } = await requestAnimationFrame('/subscriptions', {
//         params: {
//           part: 'snippet, contentDetails',

//         },
//         headers: {
//           Authorization: `Bearer ${getState().auth.accessToken}`,
//         },
//       })
//       dispatch({
//         type: SUBCRIPTIONS_CHANNEL_SUCCESS,
//         payload: data.items,
//       })
//     } catch (error) {
//       console.log(error.response.data)
//       dispatch({
//         type: SUBSCRIPTIONS_CHANNEL_FAIL,
//         payload: error.response.data,
//       })
//     }
//   }

// // actionType _ 2023-08-01 이민영
// export const CHANNEL_VIDEOS_REQUEST = 'CHANNEL_VIDEOS_REQUEST'
// export const CHANNEL_VIDEOS_SUCCESS = 'CHANNEL_VIDEOS_SUCCESS'
// export const CHANNEL_VIDEOS_FAIL = 'CHANNEL_VIDEOS_FAIL'



// video 구독버튼 기능 복사 
document.addEventListener("DOMContentLoaded", ()=>{
const subScribeButton = document.getElementById('subscribe');
 
   subScribeButton.addEventListener("click", function(){
     if (subScribeButton.classList.contains("active")) {
       subScribeButton.classList.remove("active");
       subScribeButton.textContent = "SUBSCRIBE"
     } else {
       subScribeButton.classList.add("active");
       subScribeButton.textContent = "SUBSCRIBED";
     }
   });
});


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


