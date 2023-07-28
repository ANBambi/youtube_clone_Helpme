//html : onclick=''추가, css:추가 필요 


//mic modal
const openMic = document.querySelector('.mic');
const micContainer = document.querySelector('.micContainer')
const closeMic = document.querySelector('.closeMic')

openMic.addEventListener('click', () => {
    micContainer.style.display = 'flex';
    openMic.style.display = 'none';
});

closeMic.addEventListener('click', () => {
    micContainer.style.display = 'none';
    openMic.style.display = 'block';
});

// mic modal html 예시

// </button>
// <button class="micButton" id="micButton">
//   <img class="mic" id="mic" src="imgHome/mic.svg" alt="">
// </button>

// <div class="micContainer">
//   <div class="micModal">
//     <h2>승인대기중</h2>
//     <p>
//       음성으로 검색하려면 마이크에 대한 액세스를 허용하세요.
//     </p>
//     <button class="closeMic">Close</button>
//   </div>
// </div>

// mic modal css 예시

// .micButton:hover {
//     background-color: #2980b9;
//   }
    
//   .micContainer {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     display: none;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
    
//   .micModal {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     max-width: 80%;
//     row-gap: 15px;
//     padding: 30px;
//     border: 1px solid lightgray;
//     border-radius: 7px;
//     box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.2);
//   }


//------------------------------------------------------------------------------------------------------------------
//dropdown
function dropdown(){
    let click = document.getElementById("drop-content");
    if(click.style.display === "none"){
        click.style.display = "block";

    }else{
        click.style.display = "none";

    }
}
//dropdown html 예시
// <!--right part(profile)-->
//             <div class="profile" id="profile">
//               <div class="rightContent" id="rightContent">
//                   <img class="create" id="create" onclick="dropdown()" src="imgHome/create.svg" alt="">
//                   <div style="display: none;" id="drop-content">
//                     <a hreaf='#'>동영상 업로드</a>
//                     <a hreaf='#'>라이브 스트리밍 시작</a>
//                   </div>

//dropdown css 예시
// #drop-content{
//     position: absolute;
//     z-index: 1;
// }
// #drop-content a{
//     display:block;
//     font-size: 20px;
//     background-color: #dfdfdf;
//     color: black;
//     text-decoration: none;
//     padding: 10px 36px;
//     margin: 2px 0px 0px 0px;
// }


//---------------------------------------------------------------------------------------------------------------

//moreview
document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.querySelector("#wrap2");
    var moreButton = document.getElementById("moreButton2");
    var collButton = document.getElementById("collButton2");
    var plIcons = document.querySelectorAll('.pl-icon');
    var plIconCount = plIcons.length;
    var isExpanded = false

    moreButton.querySelector('p').textContent = `Show ${plIconCount} more`;

    // default
    var items = wrap.getElementsByTagName("a");
    for (var i = 0; i < items.length; i++) {
        if (i >= 4) {
            items[i].style.display = "none";
        }
    }

    // 더보기
    moreButton.addEventListener("click", function () {
        event.preventDefault();
        if (!isExpanded) {
            collButton.style.display = "flex";
            moreButton.style.display = "none";
            for (var i = 4; i < items.length; i++) {
                items[i].style.display = "flex";
                isExpanded = true
            }
        }
    });

    collButton.addEventListener("click", function () {
        event.preventDefault();
        if (isExpanded) {
            moreButton.style.display = "flex";
            collButton.style.display = "none";
            for (var i = 4; i < items.length; i++) {
                items[i].style.display = "none";
                isExpanded = false
            }
        }
    })
});


//sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector(".sideBar");
    sidebar.classList.toggle("active");
}
const sidebar = document.querySelector(".sideBar");
const containerList = document.querySelector(".container-list");
sidebar.classList.toggle("active");
containerList.classList.toggle("container_big")
