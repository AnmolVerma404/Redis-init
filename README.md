# Redis

## How to install redis

### Windows

- You need to install a distros(distribution) for Linux lets take Ubuntu
- First you need wsl (Also disable your antivirus, because sometimes it cries. This is 100% safe)
  - Open cmd or powershell as admin
    - `wsl --install`
  - List out all distros
    - `wsl --list --online`
  - Install Ubuntu
    - `wsl --install -d Ubuntu`
  - Open Ubuntu from search bar
    - For the first time it will ask you to set name and password
    - Then install package universe `sudo add-apt-repository universe`, this will allow you to install all the open-source package like Redis which do not come under Ubuntu
    - Finally install Redis `sudo apt-get intall redis`
- Congratulations 🎉 You have installed Redis, now to start Redis Server on you local machine type `redis-server` in your Ubuntu terminal.
- Now open another Ubuntu terminal and type `redis-cli`, now you can communicate with your redis server
- Remember not to close your Redis Server

## Basic Commands

_Note - < abc > needs to be replaced by appropriate data_
**KV - Key-Value**

- `SET <KEY_NAME> <VALUE>`🔸Set a key-value in redis volitile storage
- `GET <KEY_NAME>`🔸Get the value for given KEY_NAME
- `KEYS *`🔸 Get all keys
- `EXISTS <KEY_NAME>`🔸Check if a key exists
- `FLUSHALL`🔸Removes all saved up key-value pairs
- `CLEAR`🔸Clear's the console
- `EXPIRE <KEY_NAME> <SECONDS>`🔸For existing key set expiration time
- `SETEX <KEY_NAME> <SECONDS> <VALUE>`🔸Set a new key with expiration time

### Array

- `LPUSH <KEY_NAME> <VALUE>`🔸Add's KV at the start
- `RPUSH <KEY_NAME> <VALUE>`🔸Add's KV at the end
- `LPOP <KEY_NAME>`🔸Remove's KV from start
- `RPOP <KEY_NAME>`🔸Remove's KV from end
- `LRANGE <KEY_NAME> <START> <END>`🔸 Log's all the KV's from range start to end

### Set _(Does not contain duplicates)_

- `SADD <KEY_NAME> <VALUE>`🔸Add KV in set
- `SMEMBERS <KEY_NAME>`🔸Log's all the KV pair's in set
- `SREM <KEY_NAME> <VALUE>`🔸Remove's KV from set

### Hashes

#### **Why even need Hash, as Redis is already built upon key-value pairs?**

##### Hash in Redis gives user's a way to store multiple field's and value's for a key. Additionally it allow user to store complex data.

- `HSET <KEY> <FIELD> <VALUE>`🔸 Add's key-{field, value} in hash
- `HGET <KEY> <FIELD>`🔸Get the value for a key's field
- `HGETALL <KEY>`🔸Get all Field and Values for a Key
- `HDEL <KEY> <FIELD>`🔸Removes Field and Value for a given field
- `HEXISTS <KEY> <FIELD>`🔸Check if a field exists
