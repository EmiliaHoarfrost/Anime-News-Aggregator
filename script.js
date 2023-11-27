const feedUrls = [
    "https://fullfrontal.moe/feed/",
    "https://blog.sakugabooru.com/feed/",
    "https://www.animenewsnetwork.com/all/rss.xml?ann-edition=w",
    "https://artistunknown.info/feed/",
    "https://animetudes.com/feed/",
    "https://keyframe.blog/feed/",
    "https://www.animefeminist.com/feed/",
    "https://yuriempire.wordpress.com/feed/",
    "https://wavemotioncannon.com/feed/",
    "https://feeds.feedburner.com/catsuka-news",
    "https://wrongeverytime.com/feed/",
    "https://www.animeherald.com/feed/",
    "https://www.cartoonbrew.com/location/japan/feed",
    "https://myanimelist.net/rss/news.xml",
    "https://anitrendz.net/news/feed/",
    "https://animenewsandfacts.com/feed/",
    "https://honeysanime.com/feed/"
];
async function fetchNews() {
    const newsContainer = document.getElementById("news-container");

    let allNews = [];

    for (const url of feedUrls) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
            const data = await response.json();
            allNews = allNews.concat(data.items);
        } catch (error) {
            console.error(`Error fetching news from ${url}:`, error);
        }
    }

    // Sort news by date of publication (assuming the date is available in the "pubDate" property)
    allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    allNews.forEach(item => {
        const newsItem = createNewsItem(item);
        newsContainer.appendChild(newsItem);
    });
}

function createNewsItem(item) {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const mediaContainer = createMediaContainer(item);

    const link = document.createElement("a");
    link.href = item.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Read more";

    newsItem.appendChild(title);
    newsItem.appendChild(description);
    newsItem.appendChild(mediaContainer);
    newsItem.appendChild(link);

    return newsItem;
}

function createMediaContainer(item) {
    const mediaContainer = document.createElement("div");

    // Handle images and videos
    if (item.enclosure) {
        if (item.enclosure.type.startsWith("image")) {
            const image = document.createElement("img");
            image.src = item.enclosure.link;
            image.alt = "News Image";
            mediaContainer.appendChild(image);
        } else if (item.enclosure.type.startsWith("video")) {
            const video = document.createElement("video");
            video.src = item.enclosure.link;
            video.controls = true;
            mediaContainer.appendChild(video);
        }
    }

    return mediaContainer;
}

fetchNews();
