const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'http://homeserver.local';
export const cms = dev
  ? 'http://localhost:1337'
  : 'http://homeserver.local:1337';
