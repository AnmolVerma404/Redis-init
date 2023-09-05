const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Redis = require('redis');
const { resolve } = require('path');

const DEFAULT_EXPIRATION = 3600;

/**
 * @param empty for local environment
 * @param '{url}' give the url of your redis instance
 */
const redisClient = Redis.createClient();

const app = express();
app.use(cors());

app.get('/photos', async (req, res) => {
	const albumId = req.query.albumId;
	const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
		const { data } = await axios.get(
			'http://jsonplaceholder.typicode.com/photos',
			{
				params: { albumId },
			}
		);
		return data;
	});
	res.json(photos);
});

app.get('/photos/:id', async (req, res) => {
    const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
		const { data } = await axios.get(
			`http://jsonplaceholder.typicode.com/photos/${req.params.id}`
		);
		return data;
	});
	res.json(photo);
});

function getOrSetCache(key, cb) {
	return new Promise((resolve, reject) => {
		redisClient.get(key, async (error, data) => {
			if (error) return reject(error);
			if (data != null) return resolve(JSON.parse(data));
			const freshData = await cb();
			redisClient.SETEX(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
			resolve(freshData);
		});
	});
}

app.listen(8080, () => {
	console.log('Running on -> http://localhost:8080');
});
