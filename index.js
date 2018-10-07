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

//This function appends the API data to the DOM
function appendYouTubeApiData (item){
    return`<div class="search-results"><a href="https://www.youtube.com/watch?v=${item.id.videoId} target="_blank"><img src="${item.snippet.thumbnails.default.url}"></a>
           <a href="https://www.youtube.com/watch?v=${item.id.videoId} class="videoTitle" target="_blank">${item.snippet.title}</a></div>`;
}


//This function does something with the data (callack)
function displayApiData (data) {
    console.log(data.items[0]);
    //loop through array items in object data?
    const results = data.items.map((item) => { 
    //render results to the function that creates html
        return appendYouTubeApiData (item);
    //put the html into the search results div
    });
    $('.search_results').html(results);
}

//This function allows the user to submit their search results
function submit () {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const searchTermTextbox = $(event.currentTarget).find('.js-query');
        const query = searchTermTextbox.val();
        searchTermTextbox.val("");
        getYouTubeData(query, displayApiData);
    });
}

$(submit);