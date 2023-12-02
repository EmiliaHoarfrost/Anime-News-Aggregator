// script.js

const feedUrls = [
    {
        url: "https://fullfrontal.moe/feed/",
        source: "Full Frontal"
    },
    {
        url: "https://blog.sakugabooru.com/feed/",
        source: "Sakugabooru"
    },
    {
        url: "https://www.animenewsnetwork.com/all/rss.xml?ann-edition=w",
        source: "Anime News Network"
    },
    {
        url: "https://artistunknown.info/feed/",
        source: "Artist Unknown"
    },
    {
        url: "https://animetudes.com/feed/",
        source: "Animetudes"
    },
    {
        url: "https://keyframe.blog/feed/",
        source: "Keyframe"
    },
    {
        url: "https://www.animefeminist.com/feed/",
        source: "Anime Feminist"
    },
    {
        url: "https://yuriempire.wordpress.com/feed/",
        source: "Yuri Empire"
    },
    {
        url: "https://wavemotioncannon.com/feed/",
        source: "Wave Motion Cannon"
    },
    {
        url: "https://feeds.feedburner.com/catsuka-news",
        source: "Catsuka News"
    },
    {
        url: "https://wrongeverytime.com/feed/",
        source: "Wrong Every Time"
    },
    {
        url: "https://www.animeherald.com/feed/",
        source: "Anime Herald"
    },
    {
        url: "https://www.cartoonbrew.com/location/japan/feed",
        source: "Cartoon Brew"
    },
    {
        url: "https://myanimelist.net/rss/news.xml",
        source: "MyAnimeList"
    },
    {
        url: "https://anitrendz.net/news/feed/",
        source: "AniTrendz"
    },
    {
        url: "https://animenewsandfacts.com/feed/",
        source: "Anime News and Facts"
    },
    {
        url: "https://honeysanime.com/feed/",
        source: "Honey's Anime"
    },
{
        url: "https://yuritimes.com/post/category/news/feed",
        source: "Yuri Times"
    }
    // Add any additional URLs here
];

async function fetchNews() {
    const newsContainer = document.getElementById("news-container");

    try {
        let allNews = [];

        // Fetch news from each feed URL
        for (const { url, source } of feedUrls) {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (data.status === 'ok' && data.items && Array.isArray(data.items)) {
                allNews = allNews.concat(data.items.map(item => ({ ...item, source })));
            }
        }

        // Sort news by date of publication
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Display news on the webpage
        allNews.forEach(item => displayNewsItem(item, newsContainer));
    } catch (error) {
        console.error("Error fetching or displaying news:", error);
    }
}

function displayNewsItem(item, container) {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const pubDate = document.createElement("p");
    pubDate.textContent = `Published on: ${new Date(item.pubDate).toDateString()}`;

    const mediaContainer = document.createElement("div");

    // Check if enclosure is defined and has a type property
    if (item.enclosure && item.enclosure.type && typeof item.enclosure.type === 'string') {
        // Handle images and videos
        if (item.enclosure.type.startsWith("image")) {
            const image = document.createElement("img");
            image.src = item.enclosure.link;
            mediaContainer.appendChild(image);
        } else if (item.enclosure.type.startsWith("video")) {
            const video = document.createElement("video");
            video.src = item.enclosure.link;
            video.controls = true;
            mediaContainer.appendChild(video);
        }
    }

    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = `Read more on ${item.source}`;

    newsItem.appendChild(title);
    newsItem.appendChild(description);
    newsItem.appendChild(pubDate);
    newsItem.appendChild(mediaContainer);
    newsItem.appendChild(link);

    container.appendChild(newsItem);
}

// Call the fetchNews function
fetchNews();
