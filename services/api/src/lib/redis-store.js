import session from 'express-session';

export class RedisStore extends session.Store {
  constructor(client) {
    super();
    this.client = client;
  }

  get(sid, callback) {
    this.client.get(`sess:${sid}`).then((data) => {
      callback(null, data ? JSON.parse(data) : null);
    }).catch(callback);
  }

  set(sid, sessionData, callback) {
    this.client.set(`sess:${sid}`, JSON.stringify(sessionData), 'EX', 60 * 60 * 24 * 14)
      .then(() => callback(null))
      .catch(callback);
  }

  destroy(sid, callback) {
    this.client.del(`sess:${sid}`).then(() => callback(null)).catch(callback);
  }
}
