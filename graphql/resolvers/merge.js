const DataLoader = require('dataloader');

const Project = require('../../models/project');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const projectLoader = new DataLoader(async(projectIds) => {
    return await projects(projectIds);
});

const userLoader = new DataLoader(async(userIds) => {
    return await User.find({_id: {$in: userIds}});
});

const projects = async projectIds => {
    try {
        const projects = await Project.find({ _id: { $in: projectIds } })
        projects.sort((a,b) => {
            return projectIds.indexOf(a._id.toString()) - projectIds.indexOf(b._id.toString());
        });
        return projects.map(project => {
            return transformProject(project);
        });
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            createdProjects: () => projectLoader.loadMany(user._doc.createdProjects)
        };
    } catch (err) {
        throw err;
    }
};

const transformProject = project => {
    return {
        ...project._doc,
        _id: project.id,
        createdDate: dateToString(project._doc.createdDate),
        lastAccessDate: dateToString(project._doc.lastAccessDate),
        lastUpdateDate: dateToString(project._doc.lastUpdateDate),
        creator: user.bind(this, project.creator)
    };
};

exports.transformProject = transformProject;

//exports.user = user;
//exports.projects = projects;