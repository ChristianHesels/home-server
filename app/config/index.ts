const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'http://localhost';
export const cms = dev ? 'http://localhost:1337' : 'http://localhost:1337';
