const feedUrls = [
    "https://fullfrontal.moe/feed/",
    "https://blog.sakugabooru.com/feed/",
    "https://www.animenewsnetwork.com/all/rss.xml?ann-edition=w",
    "https://medium.com/@emiliahoarfrost/feed",
    "https://artistunknown.info/feed/",
    "https://animetudes.com/feed/"
];

async function fetchNews() {
    const newsContainer = document.getElementById("news-container");

    for (const url of feedUrls) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
            const data = await response.json();

            data.items.forEach(item => {
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");

                const title = document.createElement("h2");
                title.textContent = item.title;

                const description = document.createElement("p");
                description.innerHTML = item.description;

                const image = document.createElement("img");
                // Assuming the image is in the 'enclosure' property
                if (item.enclosure && item.enclosure.link) {
                    image.src = item.enclosure.link;
                    image.alt = item.title; // You can set alternative text for the image
                }

                const link = document.createElement("a");
                link.href = item.link;
                link.textContent = "Read more";

                newsItem.appendChild(title);
                newsItem.appendChild(description);
                newsItem.appendChild(image);
                newsItem.appendChild(link);
                newsContainer.appendChild(newsItem);
            });
        } catch (error) {
            console.error(`Error fetching news from ${url}:`, error);
        }
    }
}

fetchNews();
