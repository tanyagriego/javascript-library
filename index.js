const YouTube_Search_URL = "https://www.googleapis.com/youtube/v3/search";
const StackOverflow_Search_URL = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow";
const YOUTUBE_KEY = "AIzaSyBXjnIeLhAmsGhwe7XQePKmHvCL1J_DEMM";

$('.search-results').hide();

//This function gets data from the StackOverFlow API
function getStackOverFlowData (searchTerm, callback){
    const settings = {
        url: StackOverflow_Search_URL,
        data: {
            intitle: `javascript ${searchTerm}`,
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
            q: `javascript ${searchTerm}`,
            part: 'snippet',
            key: YOUTUBE_KEY,
            maxResults  : 10,

        },
        dataType: 'json',
        type: "GET",
        success: callback
    };
    $.ajax(settings);
}

//This function appends the YouTube API data to the DOM
function appendYouTubeApiData (item) {
    return `<div class="youTube-results"><a href="https://www.youtube.com/watch?v=${item.id.videoId} target="_blank"><img src="${item.snippet.thumbnails.default.url}"></a>
           <a href="https://www.youtube.com/watch?v=${item.id.videoId}" class="videoTitle" target="_blank">${item.snippet.title}</a></div>`;
}

//This function appends the StackOverflow API data to the DOM
function appendStackOverflowData (item) {
    return `<div class="stackOverflow-results"><a href="${item.link}" target= "_blank" class="stackOverflow-answer">${item.title}</a></div>`;
}

//This function does something with the data (callack)
function displayApiData (data) {
    console.log("YouTube Data " + data.items[0]);
    //loop through array items in object data?
    const results = data.items.map((item) => { 
    //render results to the function that creates html
        return appendYouTubeApiData (item);
    //put the html into the search results div
    });

    if (results.length) {
        $('.youTube_search_results').html(results);
    } else {
        const noResults =  $(`<div class="no-results">404</div>`);
        $('.youTube_search_results').html(noResults);
    }
    $('.search-results').show();
}

function displayStackOverflowData (data) {
    console.log("StackOverflow:" + data);
    //loop through array items in object data?
    const results = data.items.map((item) => { 
    //render results to the function that creates html
        return appendStackOverflowData (item);
    //put the html into the search results div
    });

    if (results.length) {
        $('.stackOverflow_seach_results').html(results);
    } else {
        const noResults = $(`<div class="no-results">Sorry, there were no results for you search. Please try again. </div>`);
        $('.stackOverflow_seach_results').html(noResults);
    }
    $('.search-results').show();
}

//This function allows the user to submit their search results
function submit () {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const searchTermTextbox = $(event.currentTarget).find('.js-query');
        const query = searchTermTextbox.val();
        searchTermTextbox.val("");
        getYouTubeData(query, displayApiData);
        getStackOverFlowData(query, displayStackOverflowData);
        
    });
}

$(submit);