const app=require('../app');

app.listen(process.env.PORT || '3000', () => {
    console.log(`🚀  Server ready at ${process.env.PORT || '3000'}`);
});

module.exports = server;