const YouTube_Search_URL = "https://www.googleapis.com/youtube/v3/search";
const Songsterr_Search_URL = "http://www.songsterr.com/a/rest/"




//This function gets data from the songsterr API
function getSongsterrData (searchTerm, callback){
    const settings = {
        url: YouTube_Search_URL,
        data: {
            q: `${searchTerm}`,
            part: '',
            key: "",
            per_page: 3

        },
        dataType: 'json',
        type: "GET",
        success: callback
    };
    $.ajax(settings);
}

//This function gets data from the YouTube API
function getYouTubeData (searchTerm, callback){
    const settings = {
        url: YouTube_Search_URL,
        data: {
            q: `${searchTerm}`,
            part: 'snippet',
            key: "AIzaSyBXjnIeLhAmsGhwe7XQePKmHvCL1J_DEMM",
            per_page: 3

        },
        dataType: 'json',
        type: "GET",
        success: callback
    };
    $.ajax(settings);
}

