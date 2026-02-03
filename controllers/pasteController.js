import Paste from "../models/pasteModel.js";
import getNow from "../utils/time.js";
import escapeHtml from "../utils/escapeHTML.js";

// Health Check
const healthCheck = async (req, res) => {
  try {
    await Paste.findOne(); // check DB access
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
};

//  Create Paste
const createPaste = async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const now = getNow(req);
  const expiresAt = ttl_seconds ? now + ttl_seconds * 1000 : null;

  const paste = await Paste.create({
    content,
    createdAt: now,
    expiresAt,
    maxViews: max_views || null,
    views: 0,
  });

  res.status(201).json({
    id: paste._id.toString(),
    url: `${process.env.BASE_URL}/p/${paste._id}`,
  });
};

// Fetch Paste (API)
const getPaste = async (req, res) => {
  const paste = await Paste.findById(req.params.id);

  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views: paste.maxViews ? paste.maxViews - paste.views : null,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
};

// View Paste (HTML)
const viewPasteHTML = async (req, res) => {
  const paste = await Paste.findById(req.params.id);

  if (!paste) return res.status(404).send("Not found");

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return res.status(404).send("Expired");
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return res.status(404).send("Limit exceeded");
  }

  paste.views += 1;
  await paste.save();

  res.send(`
    <html>
      <body>
        <pre>${escapeHtml(paste.content)}</pre>
      </body>
    </html>
  `);
};

export default { healthCheck, createPaste, getPaste, viewPasteHTML };
