const lastfm_username = 'azrielwinter';
const lastfm_apiKey = '9d9d0986fbd8191b0f60c42032ac6ac8'; // eve here, this is my api key HANDS OFF
const lastfm_apiurl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfm_username}&api_key=${lastfm_apiKey}&format=json&limit=7`;
let trackimgs = "";
let current = "";

async function getLastFMdata() {
  try {
    const response = await fetch(lastfm_apiurl);
    const data = await response.json();
    const track = data.recenttracks.track[0];

    if (track && track['@attr'] && track['@attr'].nowplaying) {
      const artist = track.artist['#text'];
      const songTitle = track.name;
      current = `currently listening to ${songTitle} by ${artist}`;
    } else {
      current = "not currently listening to music"
    }
    
    for (let i = 0; i < 7; i++) {
      if (data.recenttracks.track[i].image[1]["#text"].length > 1) { 
        trackimgs += `<a class="noflex" href="${data.recenttracks.track[i].url}"><img src="${data.recenttracks.track[i].image[1]["#text"]}"></a> `;
      }
      else{
        trackimgs += `<img src="media/music/noimg.jpg"> `;
      }
    }
  } catch (error) {
    console.error('Error getting data: ', error);
  }
  if (current.length > 55){
    current = "<marquee>" + current + "</marquee>";
  }
  document.getElementById("lastfmtracks").innerHTML = "<div style='padding-bottom: 5px'>" + current + "</div>" + trackimgs;
}

getLastFMdata()
