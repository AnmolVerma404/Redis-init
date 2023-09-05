const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Redis = require('redis');

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
    redisClient.GET('photos',async (error,photos)=>{
        if(error){
            console.log(error);
        }
        if(photos!=null){
            console.log("Cache Hit");
            return res.json(JSON.parse(photos));
        }else{
            console.log("Cache Miss");
            const { data } = await axios.get(
                'http://jsonplaceholder.typicode.com/photos',
                {
                    params: { albumId },
                }
            );
            redisClient.SETEX('photos', DEFAULT_EXPIRATION, JSON.stringify(data));
            res.json(data);
        }
    })
});

app.get('/photos/:id', async (req, res) => {
	const { data } = await axios.get(
		`http://jsonplaceholder.typicode.com/photos/${req.params.id}`
	);
	res.json(data);
});
app.listen(8080, () => {
	console.log('Running on -> http://localhost:8080');
});
