const Project = require("../models/project.model");

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find().sort({
      createdAt: -1
    });

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

exports.createProject = async (req, res) => {

  try {

    const project = await Project.create(req.body);

    res.status(201).json(project);

  } catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

};

exports.updateProject = async (req, res) => {

  try {

    const project = await Project.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
      }

    );

    res.json(project);

  } catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

};

exports.deleteProject = async (req, res) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

};