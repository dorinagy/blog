import * as path from 'path';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.TARGET || 'localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

app.use(express.static('./dist/ui'));

app.use('*', (req, res) => {
  res.sendFile(path.resolve('./dist/ui/index.html'));
});

app.listen(process.env.PORT || 4200);
