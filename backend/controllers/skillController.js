const Skill = require("../models/skill");

exports.createSkill = async (req, res) => {
  const skill = await Skill.create({ ...req.body, user: req.user.id });
  res.status(201).json(skill);
};

exports.getSkills = async (req, res) => {
  const skills = await Skill.find().populate("user", "name email");
  res.json(skills);
};