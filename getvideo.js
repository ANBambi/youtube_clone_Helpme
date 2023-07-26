// get vid list
async function getVideoList() {
    const response = await fetch('http://oreumi.appspot.com/video/getVideoList');
    const data = await response.json();
    return data;
}

// get vid info
async function getVideoInfo(videoId) {
    const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

// get channel vid
async function getChannelVideo() {
    const apiUrl = `http://oreumi.appspot.com/channel/getChannelVideo?video_channel=oreumi`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

//--------------------------------------------------------------------------------------------------
// home.html 화면 표시
async function displayHome() {
    const videoList = await getVideoList();
    const infoContainer = document.getElementById('videoList');
    let infoHTML = "";
    // 비디오 정보와 채널 정보를 병렬로 가져오기
    const videoInfoPromises = videoList.map((video) => getVideoInfo(video.video_id));
    const videoInfoList = await Promise.all(videoInfoPromises);

    for (let i = 0; i < videoList.length; i++) {
        const videoId = videoList[i].video_id;
        const videoInfo = videoInfoList[i];

        // 비디오 정보를 표시할 문자열 생성
        let channelURL = `location.href="./channel.html"`;
        let videoURL = `location.href="./video.html?id=${videoId}"`;

        infoHTML += `
            <div>
                <img src='${videoInfo.image_link}' style='width:320px;cursor:pointer;' onclick='${videoURL}'></img>
                <div style='display:flex;'>
                    <div style='width:30px; height: 30px; border-radius: 70%; overflow:hidden;'>
                        <img src='imgHome/Profile.svg' style='width:100%; height:100%; object-fit:cover; cursor:pointer;' onclick='${channelURL}'></img>
                    </div>
                    <div>
                        <p>${videoInfo.video_title}</p>
                        <p>${videoInfo.video_channel}</p>
                        <p>${videoInfo.views}</p>
                        <p>${videoInfo.upload_date}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // 비디오 정보 추가
    infoContainer.innerHTML = infoHTML;
}

//--------------------------------------------------------------------------------------------------
// video.html 화면 표시
async function displayVideo(id) {
    const videoList = await getVideoList();
    let video = document.getElementById('videoInfo');
    let listContainer = document.getElementById('videolist');
    let listHTML = "";
    let videoHTML = "";
    // 비디오 정보와 채널 정보를 병렬로 가져오기
    const videoInfoPromises = videoList.map((video) => getVideoInfo(video.video_id));
    const videoInfoList = await Promise.all(videoInfoPromises);

    for (let i = 0; i < videoList.length; i++) {
        const videoId = videoList[i].video_id;
        const videoInfo = videoInfoList[i];

        // 비디오 정보를 표시할 문자열 생성
        let channelURL = `location.href="./channel.html"`;
        let videoURL = `location.href="./video.html?id=${videoId}"`;
        let num = videoInfo.views;            //숫자값 format
        if (id == videoId){                   //comment 수정 필요
            num = formatNumberWithCommas(num);
            videoHTML = `
            <div>
                <video controls style='width:800px'>
                    <source src='${videoInfo.video_link}'>
                </video>
                <br>
                <p style='font-size:24px;padding:15px;'>${videoInfo.video_title}</p>
                <div style='display:flex;justify-content: space-between; padding:15px;'>
                    <div>
                        <p>${num} views ${videoInfo.upload_date}</p>
                    </div>
                    <div>
                        <img src='videoImg/thumb_up.svg'><span>좋아요</span>
                        <img src='videoImg/thumb_down.svg'><span>싫어요</span>
                        <img src='videoImg/Share.svg'><span>공유</span>
                        <img src='videoImg/Save.svg'><span>저장</span>
                        <img src='videoImg/More.svg'><span>더보기</span>
                    </div>
                </div>
                <br>
                <div style='display:flex;justify-content: space-between; padding:15px;'>
                    <div style='display:flex;'>
                        <div style='width:50px; height: 50px; border-radius: 70%; overflow:hidden;'>
                            <img src='imgImg/Profile.svg' style='width:100%; height:100%; object-fit:cover; cursor:pointer;' onclick='${channelURL}'></img>
                        </div>
                        <div style='margin:10px'>
                            <p>oreumi</p>
                            <br>
                            <p>comment</p>
                        </div>
                    </div>
                    <div>
                        <img src='/img/channel/Subscribes-Btn.png'>
                    </div>
                </div>
            </div>    
            `;
        }else{
            listHTML += `
            <div style="display:flex;">
                <img src='${videoInfo.image_link}' style='width:320px;cursor:pointer;' onclick='${videoURL}'></img>
                <div>
                    <div>
                        <p>${videoInfo.video_title}</p>
                        <p>${videoInfo.video_channel}</p>
                        <p>${videoInfo.views}</p>
                        <p>${videoInfo.upload_date}</p>
                    </div>
                </div>
            </div>
        `;
        }
        
    } 
    // 선택된 비디오
    video.innerHTML = videoHTML;
    // 비디오 리스트 추가
    listContainer.innerHTML = listHTML;
   
}

//--------------------------------------------------------------------------------------------------
// channel.html 화면 표시
async function displayChannel() {
    const videoList = await getVideoList();
    const infoContainer = document.querySelector('.playlist');
    let infoHTML = "";

    // 비디오 정보를 병렬로 가져오기
    const videoInfoPromises = videoList.slice(0, 10).map((video) => getVideoInfo(video.video_id));
    const videoInfoList = await Promise.all(videoInfoPromises);

    for (let i = 0; i < videoInfoList.length; i++) {
        const videoInfo = videoInfoList[i];
        const videoId = videoInfo.video_id;

        // 비디오 정보를 표시할 문자열 생성
        let videoURL = `location.href="./index_video.html?id=${videoId}"`;
        let num = videoInfo.views;
        if (i===1){// comment 수정 필요.
            num = formatNumberWithCommas(num);
            smalHTML = `
            <div>
                <video controls style='width:500px'>
                    <source src='${videoInfo.video_link}'>
                </video>
            </div>
            <div>
                <p>${videoInfo.video_title}</p>
                <p>${num}views ${videoInfo.upload_date}</p>
                <p>comment</p>
            </div>
            `;
        }else{
            infoHTML += `
            <div>
                <img src='${videoInfo.image_link}' style='width:320px;cursor:pointer;' onclick='${videoURL}'></img>
                <div>
                    <div>
                        <p>${videoInfo.video_title}</p>
                        <p>${videoInfo.video_channel}</p>
                        <p>${videoInfo.views}</p>
                        <p>${videoInfo.upload_date}</p>
                    </div>
                </div>
                </div>
                `;
                }
            }
            smalVideo.innerHTML = smalHTML;
            infoContainer.innerHTML = infoHTML;
        }
        
        