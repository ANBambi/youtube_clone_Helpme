//페이지
function moveHome(){location.href= '/home.html';}
function moveVideo(){location.href= '/video.html';}
function moveChannel(){location.href= '/channel.html';}

//댓글창 비우기 html 완성 후에 연결
function commentClear(){
    let commentInput = document.getElementById("comment");
    commentInput.value = '';
}

//댓글 작성 html 완성 후에 연결
function addComment() {
    let commentInput = document.getElementById("comment").value;
    let commentBody = document.getElementById("commentBody");

    if (commentInput.trim() === "") {
        alert("댓글을 입력해주세요.");
        return;
    }
    let timeText = "방금 전";
    commentBody.innerHTML += `<p><span>${commentInput}</span> <span>${timeText}</span></p>`;

    commentClear();
}

// 좋아요 기능 html 완성 후에 연결 
let isLiked = false;

function like(){
    let likeBtn = document.querySelector('.likeBtn');
    if (isLiked) {
        likeBtn.innerText = '좋아요';
        likeBtn.style.backgroundColor = 'red';
    }else {
        likeBtn.innerText = '좋아요 취소';
        likeBtn.style.backgroundColor = 'gray';
    }
    isLiked = !isLiked;
}

// 구독 기능 html 완성 후에 연결
let isSubscribed = false;

function toggleSubscription() {
    let subscribeBtn = document.querySelector('.subscribeBtn');
  
    if (isSubscribed) {
        subscribeBtn.innerText = '구독하기';
        subscribeBtn.style.backgroundColor = 'red';
    }else {
        subscribeBtn.innerText = '구독중';
        subscribeBtn.style.backgroundColor = 'gray';
    }
    isSubscribed = !isSubscribed;
}