const authResolver = require('./auth');
const projectsResolver = require('./projects');

const rootResolver = {
    ...authResolver,
    ...projectsResolver
};

module.exports = rootResolver;