const { createClient } = require('redis')



;(async () => {
    const client = createClient(6379, 'localhost')
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    await client.connect();
  
    await client.set('hello', 'this is 20220228');
    const value = await client.get('hello');
    console.log('redis hello ', value);

    const keys = await client.keys('*')
    console.log('keys', keys)
  })();