# Getting Started with Gateway

### `worker.js`

This file contains the code for the gateway worker.
To host this :
- Login into cloudflare.
- Create a gateway worker.
- Create 2 KV databases as `CONFIG` and `DATABASE` if not present already.
- Copy and paste the code to the worker created.
- Bind both databases with the worker.
- Link the worker to multiple domains.

### `adminWorker.js`

This file contains the code for the admin worker.
To host this :
- Login into cloudflare.
- Create a admin worker.
- Create a KV database as `CONFIG` if not present already.
- Copy and paste the code to the worker created.
- Bind the database with the worker.
- Link the worker to the admin domain.

### `sample.config.js`

This file contains a default configuration which can be saved by sending a post request to the admin domain / worker.

You can read more about workers and cloudflare at : https://developers.cloudflare.com/docs

