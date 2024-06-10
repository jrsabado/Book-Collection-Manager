const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/books',
        createProxyMiddleware({
            target: 'https://www.googleapis.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api/books': '/books/v1/volumes',
            },
        })
    );
};
