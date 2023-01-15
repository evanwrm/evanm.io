const readingTime = require("reading-time");
const slugify = require("slugify");

const slugifyTitle = title =>
    slugify(title, {
        lower: true,
        strict: false
    });

const readingStats = text => readingTime(text, { wordsPerMinute: 200 });

module.exports = {
    async beforeCreate(event) {
        if (event.params.data.title) event.params.data.slug = slugifyTitle(event.params.data.title);
        if (event.params.data.content) {
            const stats = readingStats(event.params.data.content);
            event.params.data.statsTime = Math.floor(stats.time / 1000);
            event.params.data.statsWords = stats.words;
        }
    },
    async beforeUpdate(event) {
        if (event.params.data.title) event.params.data.slug = slugifyTitle(event.params.data.title);
        if (event.params.data.content) {
            const stats = readingStats(event.params.data.content);
            event.params.data.statsTime = Math.floor(stats.time / 1000);
            event.params.data.statsWords = stats.words;
        }
    }
};
