import Link from "../models/Link.js";

const isValidUrl = (u) => {
  try {
    new URL(u);
    return true;
  } catch {
    return false;
  }
};

// POST /api/links
export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!isValidUrl(url)) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ message: "Code already exists" });

    const newLink = await Link.create({ url, code });
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/links
export const getLinks = async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
};

// GET /api/links/:code
export const getLinkStats = async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ message: "Not found" });

  res.json(link);
};

// DELETE /api/links/:code
export const deleteLink = async (req, res) => {
  const deleted = await Link.findOneAndDelete({ code: req.params.code });
  if (!deleted) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
};

// REDIRECT
export const redirectLink = async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });

  if (!link) return res.status(404).json({ message: "Not found" });

  link.clicks += 1;
  link.lastClicked = new Date();
  await link.save();

  return res.redirect(302, link.url);
};
