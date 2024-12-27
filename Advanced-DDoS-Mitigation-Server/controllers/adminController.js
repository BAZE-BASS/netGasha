const fs = require('fs');
const path = require('path');

const blacklistFile = path.join(__dirname, '../logs/blacklist.json');
const whitelistFile = path.join(__dirname, '../logs/whitelist.json');

const loadList = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
};

const saveList = (file, list) => {
  fs.writeFileSync(file, JSON.stringify(list, null, 2));
};

const clearBlacklist = (req, res) => {
  saveList(blacklistFile, []);
  res.send('Blacklist cleared.');
};

const addWhitelist = (req, res) => {
  const { ip } = req.body;
  const whitelist = loadList(whitelistFile);
  if (!ip || whitelist.includes(ip)) return res.status(400).send('Invalid or duplicate IP.');
  whitelist.push(ip);
  saveList(whitelistFile, whitelist);
  res.send(IP ${ip} added to whitelist.);
};

const removeWhitelist = (req, res) => {
  const { ip } = req.body;
  let whitelist = loadList(whitelistFile);
  if (!ip || !whitelist.includes(ip)) return res.status(400).send('IP not found.');
  whitelist = whitelist.filter((item) => item !== ip);
  saveList(whitelistFile, whitelist);
  res.send(IP ${ip} removed from whitelist.);
};

module.exports = { clearBlacklist, addWhitelist, removeWhitelist };