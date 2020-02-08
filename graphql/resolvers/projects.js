const Project = require('../../models/project');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const { transformProject } = require('./merge');

module.exports = {
    projects: async () => {
        try {
            const projects = await Project.find();
            return await projects.map(project => {
                return transformProject(project);
            });
        } catch (err) {
            throw err;
        }
    },
    createProject: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unaunthenticated!');
        }
        const project = new Project({
            title: args.projectInput.title,
            description: args.projectInput.description,
            createdDate: dateToString(args.projectInput.createdDate),
            lastAccessDate: dateToString(args.projectInput.lastAccessDate),
            lastUpdateDate: dateToString(args.projectInput.lastUpdateDate),
            image: args.projectInput.image,
            creator: req.userId,
            canvasJSON: args.projectInput.canvasJSON,
            especJSON: args.projectInput.especJSON
        });
        let createdProject;
        try {
            const result = await project.save();
            createdProject = transformProject(result);
            const creator = await User.findById(req.userId);

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdProjects.push(project);
            await creator.save();

            return createdProject;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    deleteProject: async (args, req) => {
        try {
            await User.findOneAndUpdate({ _id: req.userId }, { $pull: { createdProjects: args.projectId } });
            await Project.findByIdAndDelete({ _id: args.projectId });
        } catch (err) {
            throw err;
        }
    },
    updateProject: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unaunthenticated!');
            }
            await Project.findOneAndUpdate(
                {
                    _id: args.projectUpdate.projectId
                },
                {
                    $set: {
                        title: args.projectUpdate.title,
                        description: args.projectUpdate.description,
                        lastUpdateDate: dateToString(args.projectUpdate.lastUpdateDate)
                    }
                },
                {
                    useFindAndModify: false
                }
            )
        } catch (err) {
            throw err;
        }
    },
    saveProject: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unaunthenticated!');
            }

            await Project.findOneAndUpdate(
                {
                    _id: args.projectSave.projectId
                },
                {
                    $set: {
                        canvasJSON: args.projectSave.canvasJSON,
                        lastAccessDate: dateToString(args.projectSave.lastAccessDate),
                        lastUpdateDate: dateToString(args.projectSave.lastUpdateDate),
                        image: args.projectSave.image
                    }
                },
                {
                    useFindAndModify: false
                }
            )
        } catch (err) {
            throw err;
        }
    }
};