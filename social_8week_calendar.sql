-- ═══════════════════════════════════════════════════════════════════
-- SOCIAL CONTENT — 8-Week Calendar (June 22 – August 16, 2026)
-- X (Twitter), LinkedIn, Instagram
-- Phase 1: Foundation — Creative Generalist Brand
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- Add Instagram + TikTok to content_posts platform options
ALTER TABLE content_posts DROP CONSTRAINT IF EXISTS content_posts_platform_check;
ALTER TABLE content_posts ADD CONSTRAINT content_posts_platform_check
  CHECK (platform IN ('X', 'YouTube', 'LinkedIn', 'Instagram', 'TikTok'));

DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users ORDER BY created_at LIMIT 1;

-- ═══════════════════════════════════════════════════════════════════
-- X (TWITTER) — 8 WEEKS
-- Pillar mix: 35% Psychology · 25% Building in Public · 15% Motion Design
--             15% Productivity · 10% Builder/Entrepreneur Mindset
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES

-- ── WEEK 1 (Jun 22–28): Cybersecurity Journey Kickoff ────────────
(uid,'X','Value/Tips','Cybersecurity Journey Kickoff — Thread','I''m starting a public cybersecurity learning journey as a motion designer. Here''s why.','2026-06-22','Draft','X Week 1 · Mon Thread · Series: Cyber for Creatives'),
(uid,'X','Poll','Generalist vs Specialist Poll','Would you rather be a specialist or creative generalist in 2027?','2026-06-22','Draft','X Week 1 · Mon Poll'),
(uid,'X','Behind-Scenes','Day 1 Cyber','Day 1 of cybersecurity learning. Already feeling out of my depth.','2026-06-22','Draft','X Week 1 · Mon Single'),

(uid,'X','Value/Tips','Psychology of Starting Something New — Thread','The psychology of starting something completely new (and why most people quit)','2026-06-23','Draft','X Week 1 · Tue Thread · Pillar: Psychology'),
(uid,'X','Question','Skill you wish you started earlier','What''s one skill you wish you started earlier?','2026-06-23','Draft','X Week 1 · Tue Question'),
(uid,'X','Behind-Scenes','Biggest fear learning cyber','Biggest fear about learning cybersecurity as a creative','2026-06-23','Draft','X Week 1 · Tue Single'),

(uid,'X','Value/Tips','Cybersecurity for Creatives Part 1 — Thread','Cybersecurity for Creatives – Part 1: Why motion designers and devs are high-value targets','2026-06-24','Draft','X Week 1 · Wed Thread · Series: Cyber for Creatives'),
(uid,'X','Value/Tips','VPN win','Small win: Finally understood what a VPN actually does','2026-06-24','Draft','X Week 1 · Wed Single'),
(uid,'X','Value/Tips','Brain treats new skills like threats','Psychology fact: Your brain treats new skills like a threat','2026-06-24','Draft','X Week 1 · Wed Single'),

(uid,'X','Value/Tips','After Effects Expressions — Thread','After Effects expressions I use in almost every project','2026-06-25','Draft','X Week 1 · Thu Thread · Pillar: Motion Design'),
(uid,'X','Behind-Scenes','First Blender AE attempt','First day trying to bring something from Blender into After Effects','2026-06-25','Draft','X Week 1 · Thu Single'),
(uid,'X','Poll','Cyber makes you a better designer?','Do you think learning cybersecurity will make you a better designer?','2026-06-25','Draft','X Week 1 · Thu Poll'),

(uid,'X','Value/Tips','What I Learned This Week — Thread','What I Learned This Week (Cyber + Motion Design)','2026-06-26','Draft','X Week 1 · Fri Thread · Series: Weekly Recap'),
(uid,'X','Behind-Scenes','Generalist feels behind','The weirdest part of being a creative generalist is feeling behind in everything','2026-06-26','Draft','X Week 1 · Fri Single'),
(uid,'X','Value/Tips','Psychological principle for consistency','One psychological principle helping me stay consistent','2026-06-26','Draft','X Week 1 · Fri Single'),

(uid,'X','Value/Tips','Music changed animation timing','Music production session today changed how I timed an animation','2026-06-27','Draft','X Week 1 · Sat Single · Pillar: Music'),
(uid,'X','Question','What skill are you learning?','What skill are you currently learning?','2026-06-27','Draft','X Week 1 · Sat Question'),

(uid,'X','Behind-Scenes','Weekly Reflection — Thread','Weekly reflection: Cybersecurity feels like learning a new language','2026-06-28','Draft','X Week 1 · Sun Thread · Series: Weekly Reflection'),
(uid,'X','Value/Tips','Rest day','Rest day. Sometimes doing nothing is the move.','2026-06-28','Draft','X Week 1 · Sun Single'),

-- ── WEEK 2 (Jun 29 – Jul 5): Motion Design Focus ─────────────────
(uid,'X','Value/Tips','AE Tips for Premium Feel — Thread','After Effects tips that made my work feel more premium','2026-06-29','Draft','X Week 2 · Mon Thread · Pillar: Motion Design'),
(uid,'X','Behind-Scenes','Integrating 3D from Blender','Trying to integrate a simple 3D element from Blender this week','2026-06-29','Draft','X Week 2 · Mon Single'),
(uid,'X','Poll','2D vs 3D motion design','Do you prefer 2D or 3D motion design?','2026-06-29','Draft','X Week 2 · Mon Poll'),

(uid,'X','Value/Tips','Psychology of Expensive-Feeling Animations — Thread','The psychology of why some animations feel expensive','2026-06-30','Draft','X Week 2 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','First Blender AE export','First successful Blender → After Effects export. Felt huge.','2026-06-30','Draft','X Week 2 · Tue Single'),
(uid,'X','Value/Tips','Blender changes spatial thinking','Learning Blender is changing how I think spatially in After Effects','2026-06-30','Draft','X Week 2 · Tue Single'),

(uid,'X','Value/Tips','Cybersecurity for Creatives Part 2 — Thread','Cybersecurity for Creatives – Part 2: Basic security habits every creative should have','2026-07-01','Draft','X Week 2 · Wed Thread · Series: Cyber for Creatives'),
(uid,'X','Behind-Scenes','Securing client files','Spent today securing my client files and projects','2026-07-01','Draft','X Week 2 · Wed Single'),
(uid,'X','Question','Biggest security concern','What''s your biggest security concern as a creative?','2026-07-01','Draft','X Week 2 · Wed Question'),

(uid,'X','Value/Tips','5 Blender Techniques for 2D Motion Designers — Thread','5 Blender techniques that actually help 2D motion designers','2026-07-02','Draft','X Week 2 · Thu Thread · Pillar: Motion Design'),
(uid,'X','Behind-Scenes','Blender is hard but addictive','Blender is hard… but the clicks feel addictive','2026-07-02','Draft','X Week 2 · Thu Single'),
(uid,'X','Value/Tips','Skill plateau psychology','Psychology of skill plateaus — why you feel worse before you improve','2026-07-02','Draft','X Week 2 · Thu Single'),

(uid,'X','Value/Tips','What I Learned This Week — Thread (Motion Design)','What I Learned This Week (Motion Design heavy)','2026-07-03','Draft','X Week 2 · Fri Thread · Series: Weekly Recap'),
(uid,'X','Behind-Scenes','Game dev improving animation systems','Game dev logic is quietly improving my animation systems','2026-07-03','Draft','X Week 2 · Fri Single'),
(uid,'X','Value/Tips','Juggling tools exhausting and exciting','Juggling multiple tools is both exhausting and exciting','2026-07-03','Draft','X Week 2 · Fri Single'),

(uid,'X','Value/Tips','Music production weekend reset','Music production weekend reset','2026-07-04','Draft','X Week 2 · Sat Single · Pillar: Music'),
(uid,'X','Poll','Hardest skill alongside motion design','Which skill is hardest to learn alongside motion design?','2026-07-04','Draft','X Week 2 · Sat Poll'),

(uid,'X','Behind-Scenes','Weekly Reflection — Thread','Weekly reflection + what I''m testing next week','2026-07-05','Draft','X Week 2 · Sun Thread · Series: Weekly Reflection'),
(uid,'X','Value/Tips','Rest and planning','Rest + planning','2026-07-05','Draft','X Week 2 · Sun Single'),

-- ── WEEK 3 (Jul 6–12): Productivity & Multi-Skill Systems ────────
(uid,'X','Value/Tips','Managing Motion Design + Cyber + Music Without Burnout — Thread','How I''m currently managing motion design, cyber, and music without burning out','2026-07-06','Draft','X Week 3 · Mon Thread · Pillar: Productivity'),
(uid,'X','Behind-Scenes','Daily system for learning','My current daily system for learning new skills','2026-07-06','Draft','X Week 3 · Mon Single'),
(uid,'X','Poll','Deep work scheduling','Do you schedule deep work or go with the flow?','2026-07-06','Draft','X Week 3 · Mon Poll'),

(uid,'X','Value/Tips','Psychology of Context Switching — Thread','The psychology of context switching between creative and technical work','2026-07-07','Draft','X Week 3 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Batching cyber study mixed results','Tried batching cybersecurity study this week — mixed results','2026-07-07','Draft','X Week 3 · Tue Single'),
(uid,'X','Value/Tips','Productivity experiment this month','One productivity experiment I''m running this month','2026-07-07','Draft','X Week 3 · Tue Single'),

(uid,'X','Value/Tips','Cybersecurity for Creatives Part 3 — Thread','Cybersecurity for Creatives – Part 3: Tools I''m actually using right now','2026-07-08','Draft','X Week 3 · Wed Thread · Series: Cyber for Creatives'),
(uid,'X','Behind-Scenes','Building in public update','Building in public update — what I''m shipping this week','2026-07-08','Draft','X Week 3 · Wed Single'),
(uid,'X','Question','How do you decide what to learn next?','Fullstack dev is on my radar. How do you decide what to learn next?','2026-07-08','Draft','X Week 3 · Wed Question'),

(uid,'X','Value/Tips','Blender Improved My AE Workflow — Thread','How learning basic Blender concepts improved my After Effects workflow','2026-07-09','Draft','X Week 3 · Thu Thread · Pillar: Motion Design'),
(uid,'X','Value/Tips','Game dev thinking for animation systems','Game dev thinking applied to animation systems','2026-07-09','Draft','X Week 3 · Thu Single'),
(uid,'X','Value/Tips','Decision fatigue with too many skills','Psychology of decision fatigue when you have too many skills','2026-07-09','Draft','X Week 3 · Thu Single'),

(uid,'X','Value/Tips','What I Learned This Week — Thread (Systems)','What I Learned This Week (Systems focus)','2026-07-10','Draft','X Week 3 · Fri Thread · Series: Weekly Recap'),
(uid,'X','Behind-Scenes','Generalist chooses what to get good at','Being a creative generalist means constantly choosing what to get good at','2026-07-10','Draft','X Week 3 · Fri Single'),
(uid,'X','Question','What to prioritize when learning too many things?','How do you decide what to prioritize when you have too many things you want to learn?','2026-07-10','Draft','X Week 3 · Fri Question'),

(uid,'X','Value/Tips','Music as creative fuel','Music production this weekend — using it as creative fuel','2026-07-11','Draft','X Week 3 · Sat Single · Pillar: Music'),
(uid,'X','Behind-Scenes','What actually matters in week 3','What actually matters in week 3 of building across multiple skills','2026-07-11','Draft','X Week 3 · Sat Single'),

(uid,'X','Behind-Scenes','Weekly Review + Systems to Improve — Thread','Weekly review + systems I want to improve','2026-07-12','Draft','X Week 3 · Sun Thread · Series: Weekly Reflection'),
(uid,'X','Behind-Scenes','Planning next week','Planning the next week','2026-07-12','Draft','X Week 3 · Sun Single'),

-- ── WEEK 4 (Jul 13–19): Multi-Skill Reflection (1-Month Mark) ───
(uid,'X','Value/Tips','1 Month of Cybersecurity — Honest Update — Thread','One month into my cybersecurity journey — honest update','2026-07-13','Draft','X Week 4 · Mon Thread · Series: Monthly Update'),
(uid,'X','Value/Tips','Biggest lesson from outside comfort zone','Biggest lesson from learning something completely outside my comfort zone','2026-07-13','Draft','X Week 4 · Mon Single'),
(uid,'X','Poll','Has a new skill changed your creative work?','Has learning a new technical skill changed how you approach creative work?','2026-07-13','Draft','X Week 4 · Mon Poll'),

(uid,'X','Value/Tips','Marathon Mindset for Skill Building — Thread','Psychology of long-term skill building (marathon mindset)','2026-07-14','Draft','X Week 4 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Blender progress: slow but compounding','Blender progress this month: Still slow but compounding','2026-07-14','Draft','X Week 4 · Tue Single'),
(uid,'X','Value/Tips','Fullstack connections starting to appear','Fullstack dev feels intimidating but connections are starting to appear','2026-07-14','Draft','X Week 4 · Tue Single'),

(uid,'X','Value/Tips','Cybersecurity for Creatives Part 4 — Thread','Cybersecurity for Creatives – Part 4: How security thinking improves client work','2026-07-15','Draft','X Week 4 · Wed Thread · Series: Cyber for Creatives'),
(uid,'X','Behind-Scenes','Building in public update','Building in public update','2026-07-15','Draft','X Week 4 · Wed Single'),
(uid,'X','Value/Tips','Confidence from learning hard things','The weird confidence that comes from learning hard things','2026-07-15','Draft','X Week 4 · Wed Single'),

(uid,'X','Value/Tips','All Skills Influencing Each Other — Thread','How different disciplines are starting to influence each other','2026-07-16','Draft','X Week 4 · Thu Thread · Pillar: Multi-skill'),
(uid,'X','Value/Tips','AE architectural thinking with null objects','Motion design tip: thinking architecturally with null objects in After Effects','2026-07-16','Draft','X Week 4 · Thu Single'),
(uid,'X','Value/Tips','Music as favorite creative reset','Music production is becoming my favorite creative reset','2026-07-16','Draft','X Week 4 · Thu Single'),

(uid,'X','Behind-Scenes','What I Learned This Month — Thread','What I Learned This Month (Across all skills)','2026-07-17','Draft','X Week 4 · Fri Thread · Series: Monthly Recap'),
(uid,'X','Behind-Scenes','Staying a generalist reflection','Reflective post about staying a generalist when everything pulls you to specialize','2026-07-17','Draft','X Week 4 · Fri Single'),
(uid,'X','Behind-Scenes','Going deeper next month','Planning to go deeper into one area next month','2026-07-17','Draft','X Week 4 · Fri Single'),

(uid,'X','Behind-Scenes','Personality post','A day in the life of building across too many disciplines at once','2026-07-18','Draft','X Week 4 · Sat Single'),
(uid,'X','Poll','Which skill to see content about?','Which skill would you most want to see content about?','2026-07-18','Draft','X Week 4 · Sat Poll'),

(uid,'X','Behind-Scenes','Month 1 Goals — Thread','End of month reflection + goals for next month','2026-07-19','Draft','X Week 4 · Sun Thread · Series: Monthly Reflection'),
(uid,'X','Value/Tips','Rest and planning','Rest + planning','2026-07-19','Draft','X Week 4 · Sun Single'),

-- ── WEEK 5 (Jul 20–26): Deeper Cybersecurity + Psychology ────────
(uid,'X','Value/Tips','Cybersecurity for Creatives Part 5 — Thread','Cybersecurity for Creatives – Part 5: Common myths creatives believe about security','2026-07-20','Draft','X Week 5 · Mon Thread · Series: Cyber for Creatives'),
(uid,'X','Value/Tips','What I learned about passwords','What I learned about passwords this week (it''s not what you think)','2026-07-20','Draft','X Week 5 · Mon Single'),
(uid,'X','Poll','Do you use a password manager?','Do you use a password manager?','2026-07-20','Draft','X Week 5 · Mon Poll'),

(uid,'X','Value/Tips','Psychology of Imposter Syndrome While Learning — Thread','Psychology of imposter syndrome while learning new skills','2026-07-21','Draft','X Week 5 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Blender experiment that failed spectacularly','Blender experiment that failed spectacularly (but taught me something)','2026-07-21','Draft','X Week 5 · Tue Single'),
(uid,'X','Value/Tips','Music improves motion design timing','How music production helps with timing in motion design','2026-07-21','Draft','X Week 5 · Tue Single'),

(uid,'X','Value/Tips','AE Workflow After Learning 3D — Thread','After Effects workflow improvements after learning basic 3D concepts','2026-07-22','Draft','X Week 5 · Wed Thread · Pillar: Motion Design'),
(uid,'X','Behind-Scenes','Building in public update','Building in public update','2026-07-22','Draft','X Week 5 · Wed Single'),
(uid,'X','Question','What are you struggling to learn right now?','What''s one thing you''re struggling to learn right now?','2026-07-22','Draft','X Week 5 · Wed Question'),

(uid,'X','Value/Tips','Psychology of Staying Consistent Across Multiple Skills — Thread','The psychology of staying consistent with multiple skills','2026-07-23','Draft','X Week 5 · Thu Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Tried a new productivity system','Tried a new productivity system this week','2026-07-23','Draft','X Week 5 · Thu Single'),
(uid,'X','Value/Tips','Game dev thinking for problem solving','Game dev thinking applied to problem solving in motion design','2026-07-23','Draft','X Week 5 · Thu Single'),

(uid,'X','Behind-Scenes','What I Learned This Week — Thread','What I Learned This Week','2026-07-24','Draft','X Week 5 · Fri Thread · Series: Weekly Recap'),
(uid,'X','Value/Tips','Generalists always feel behind','Being a generalist means accepting you''ll always feel behind in something','2026-07-24','Draft','X Week 5 · Fri Single'),
(uid,'X','Question','What keeps you motivated when not making progress?','What keeps you motivated when you feel like you''re not making progress?','2026-07-24','Draft','X Week 5 · Fri Question'),

(uid,'X','Behind-Scenes','Music production update','Music production update','2026-07-25','Draft','X Week 5 · Sat Single · Pillar: Music'),
(uid,'X','Value/Tips','Rest as a creative skill','The psychology of rest as a creative skill','2026-07-25','Draft','X Week 5 · Sat Single'),

(uid,'X','Behind-Scenes','Weekly Reflection — Thread','Weekly reflection','2026-07-26','Draft','X Week 5 · Sun Thread · Series: Weekly Reflection'),
(uid,'X','Behind-Scenes','Planning the week ahead','Planning the week ahead','2026-07-26','Draft','X Week 5 · Sun Single'),

-- ── WEEK 6 (Jul 27 – Aug 2): Cross-Skill Influence ───────────────
(uid,'X','Value/Tips','Game Dev Logic Improving Motion Design — Thread','How game dev logic is improving my motion design','2026-07-27','Draft','X Week 6 · Mon Thread · Pillar: Crossover'),
(uid,'X','Behind-Scenes','Blender progress update','Blender progress update','2026-07-27','Draft','X Week 6 · Mon Single'),
(uid,'X','Poll','Applied logic from one skill to another?','Have you ever applied logic from one skill to another?','2026-07-27','Draft','X Week 6 · Mon Poll'),

(uid,'X','Value/Tips','Psychology of Creative Flow Across Different Tools — Thread','Psychology of creative flow across different tools','2026-07-28','Draft','X Week 6 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Cybersecurity small win','Cybersecurity small win this week','2026-07-28','Draft','X Week 6 · Tue Single'),
(uid,'X','Value/Tips','Music influencing animation pacing','Music production influencing my animation pacing','2026-07-28','Draft','X Week 6 · Tue Single'),

(uid,'X','Value/Tips','Cybersecurity for Creatives Part 6 — Thread','Cybersecurity for Creatives – Part 6: Securing your creative workflow','2026-07-29','Draft','X Week 6 · Wed Thread · Series: Cyber for Creatives'),
(uid,'X','Behind-Scenes','Building in public','Building in public','2026-07-29','Draft','X Week 6 · Wed Single'),
(uid,'X','Behind-Scenes','Fullstack experiments starting soon','Fullstack experiments starting soon','2026-07-29','Draft','X Week 6 · Wed Single'),

(uid,'X','Value/Tips','AE + Blender Hybrid Projects — Thread','After Effects + Blender hybrid projects I''m testing','2026-07-30','Draft','X Week 6 · Thu Thread · Pillar: Motion Design'),
(uid,'X','Behind-Scenes','Productivity experiment results','Productivity experiment results','2026-07-30','Draft','X Week 6 · Thu Single'),
(uid,'X','Value/Tips','Skills getting clearer connections','The connections between disciplines are starting to get clearer','2026-07-30','Draft','X Week 6 · Thu Single'),

(uid,'X','Behind-Scenes','What I Learned This Week — Thread','What I Learned This Week','2026-07-31','Draft','X Week 6 · Fri Thread · Series: Weekly Recap'),
(uid,'X','Value/Tips','All skills getting clearer','The connections between all my skills are getting clearer','2026-07-31','Draft','X Week 6 · Fri Single'),
(uid,'X','Question','Most unexpected benefit from learning something new?','What''s the most unexpected benefit you''ve gotten from learning something new?','2026-07-31','Draft','X Week 6 · Fri Question'),

(uid,'X','Behind-Scenes','Personality post','Fun personality post','2026-08-01','Draft','X Week 6 · Sat Single'),
(uid,'X','Poll','Best community for motion designers?','Which platform has the best community for motion designers?','2026-08-01','Draft','X Week 6 · Sat Poll'),

(uid,'X','Behind-Scenes','Weekly Review — Thread','Weekly review + next week focus','2026-08-02','Draft','X Week 6 · Sun Thread · Series: Weekly Reflection'),
(uid,'X','Value/Tips','Rest','Rest','2026-08-02','Draft','X Week 6 · Sun Single'),

-- ── WEEK 7 (Aug 3–9): Deeper Building in Public ──────────────────
(uid,'X','Value/Tips','Cybersecurity for Creatives Part 7 — Thread','Cybersecurity for Creatives – Part 7: What I wish I knew 2 months ago','2026-08-03','Draft','X Week 7 · Mon Thread · Series: Cyber for Creatives'),
(uid,'X','Behind-Scenes','Blender milestone','Blender milestone this week','2026-08-03','Draft','X Week 7 · Mon Single'),
(uid,'X','Poll','How important is building in public?','How important is building in public to you?','2026-08-03','Draft','X Week 7 · Mon Poll'),

(uid,'X','Value/Tips','Tracking Progress Across Many Skills — Thread','Psychology of tracking progress across many skills','2026-08-04','Draft','X Week 7 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Fullstack less scary','Fullstack learning starting to feel less scary','2026-08-04','Draft','X Week 7 · Tue Single'),
(uid,'X','Value/Tips','Music as creative recharge tool','Music production as a creative recharge tool','2026-08-04','Draft','X Week 7 · Tue Single'),

(uid,'X','Value/Tips','Motion Design Process Evolution After Blender — Thread','How my motion design process has evolved after learning Blender','2026-08-05','Draft','X Week 7 · Wed Thread · Pillar: Motion Design'),
(uid,'X','Behind-Scenes','Building in public update','Building in public update','2026-08-05','Draft','X Week 7 · Wed Single'),
(uid,'X','Behind-Scenes','Productivity system tweaks','Productivity system tweaks','2026-08-05','Draft','X Week 7 · Wed Single'),

(uid,'X','Value/Tips','Psychology of Long-Term Learning — Thread','The psychology of long-term learning','2026-08-06','Draft','X Week 7 · Thu Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Cybersecurity update','Cybersecurity update','2026-08-06','Draft','X Week 7 · Thu Single'),
(uid,'X','Value/Tips','Reflective post on creative identity','Reflective post about creative identity — who I''m becoming through this process','2026-08-06','Draft','X Week 7 · Thu Single'),

(uid,'X','Behind-Scenes','What I Learned This Week — Thread','What I Learned This Week','2026-08-07','Draft','X Week 7 · Fri Thread · Series: Weekly Recap'),
(uid,'X','Value/Tips','Creative generalist feels chaotic and powerful','Being a creative generalist in 2026 feels both chaotic and powerful','2026-08-07','Draft','X Week 7 · Fri Single'),
(uid,'X','Question','Hardest part of learning in public?','What''s the hardest part of learning in public for you?','2026-08-07','Draft','X Week 7 · Fri Question'),

(uid,'X','Behind-Scenes','Music update','Music update','2026-08-08','Draft','X Week 7 · Sat Single · Pillar: Music'),
(uid,'X','Value/Tips','Light post on rest and learning','The best learning days often come after the rest days','2026-08-08','Draft','X Week 7 · Sat Single'),

(uid,'X','Behind-Scenes','Weekly Reflection — Thread','Weekly reflection','2026-08-09','Draft','X Week 7 · Sun Thread · Series: Weekly Reflection'),
(uid,'X','Behind-Scenes','Planning','Planning','2026-08-09','Draft','X Week 7 · Sun Single'),

-- ── WEEK 8 (Aug 10–16): 2-Month Review & Momentum ───────────────
(uid,'X','Value/Tips','2 Months Multi-Skill Journey — Honest Update — Thread','2 months into my multi-skill journey — honest update','2026-08-10','Draft','X Week 8 · Mon Thread · Series: Monthly Update'),
(uid,'X','Value/Tips','Biggest mindset shift so far','Biggest mindset shift so far','2026-08-10','Draft','X Week 8 · Mon Single'),
(uid,'X','Poll','Generalist: advantage or disadvantage?','Do you think being a generalist is an advantage or disadvantage?','2026-08-10','Draft','X Week 8 · Mon Poll'),

(uid,'X','Value/Tips','Building Momentum Across Multiple Skills — Thread','Psychology of building momentum across multiple skills','2026-08-11','Draft','X Week 8 · Tue Thread · Pillar: Psychology'),
(uid,'X','Behind-Scenes','Blender + AE workflow improvements','Blender + After Effects workflow improvements','2026-08-11','Draft','X Week 8 · Tue Single'),
(uid,'X','Behind-Scenes','Cybersecurity is starting to click','Cybersecurity is starting to click more','2026-08-11','Draft','X Week 8 · Tue Single'),

(uid,'X','Value/Tips','Cybersecurity for Creatives Part 8 — Thread','Cybersecurity for Creatives – Part 8: How far I''ve come in 2 months','2026-08-12','Draft','X Week 8 · Wed Thread · Series: Cyber for Creatives'),
(uid,'X','Behind-Scenes','Building in public','Building in public','2026-08-12','Draft','X Week 8 · Wed Single'),
(uid,'X','Value/Tips','Game dev thinking for creative problem solving','Game dev thinking applied to creative problem solving','2026-08-12','Draft','X Week 8 · Wed Single'),

(uid,'X','Value/Tips','All Skills Influencing Each Other — Thread','How all my skills are starting to influence each other','2026-08-13','Draft','X Week 8 · Thu Thread · Pillar: Multi-skill'),
(uid,'X','Value/Tips','Music rhythm applied to animation timing','Using rhythm from music to time animations — the specific technique','2026-08-13','Draft','X Week 8 · Thu Single'),
(uid,'X','Value/Tips','Music production influence on timing','Music production influence on timing — 2 months in','2026-08-13','Draft','X Week 8 · Thu Single'),

(uid,'X','Behind-Scenes','2-Month Review — Thread','What I Learned This Month (2-month review)','2026-08-14','Draft','X Week 8 · Fri Thread · Series: Monthly Recap'),
(uid,'X','Value/Tips','Staying consistent as a generalist','Reflections on staying consistent as a generalist','2026-08-14','Draft','X Week 8 · Fri Single'),
(uid,'X','Behind-Scenes','Planning focus for next month','Planning focus for next month','2026-08-14','Draft','X Week 8 · Fri Single'),

(uid,'X','Behind-Scenes','Fun post','After 2 months of this — a genuine reflection on what it feels like','2026-08-15','Draft','X Week 8 · Sat Single'),
(uid,'X','Poll','Most valuable content from this journey so far?','After 2 months of following this journey, which content has been most valuable?','2026-08-15','Draft','X Week 8 · Sat Poll'),

(uid,'X','Behind-Scenes','8-Week Reflection + Goals Forward — Thread','End of 8-week reflection + goals moving forward','2026-08-16','Draft','X Week 8 · Sun Thread · Series: Phase Review'),
(uid,'X','Value/Tips','Rest + planning the next phase','Rest + planning the next phase','2026-08-16','Draft','X Week 8 · Sun Single');

-- ═══════════════════════════════════════════════════════════════════
-- LINKEDIN — 8 WEEKS (3 posts/week)
-- Pillar: 40% Cyber Learning · 25% Transferable Skills · 20% Professional Dev · 15% Projects
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES

-- Week 1
(uid,'LinkedIn','Value/Tips','Starting Cybersecurity as a Motion Designer — Why','I''m starting a public cybersecurity learning journey as a motion designer. Here''s why I''m making this transition and what I hope to gain.','2026-06-22','Draft','LinkedIn Week 1 · Mon'),
(uid,'LinkedIn','Showcase','Why Creatives Should Understand Cybersecurity (Carousel)','Why creatives (especially motion designers) should understand basic cybersecurity in 2026','2026-06-24','Draft','LinkedIn Week 1 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','Week 1 Cybersecurity Takeaway','Day 1–7 of learning cybersecurity — my biggest takeaway so far is how much it overlaps with systems thinking in design.','2026-06-26','Draft','LinkedIn Week 1 · Fri'),

-- Week 2
(uid,'LinkedIn','Value/Tips','Week 2 Cyber Update — Feels Like Learning a New Creative Tool','Week 2 in cybersecurity learning. The biggest surprise? How much it feels like learning a new creative tool.','2026-06-29','Draft','LinkedIn Week 2 · Mon'),
(uid,'LinkedIn','Showcase','Motion Design Detail → Security Concepts (Carousel)','How motion design attention to detail is already helping me understand security concepts','2026-07-01','Draft','LinkedIn Week 2 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','Cyber Making Me More Intentional About Creative Files','One thing I''ve noticed: Learning cybersecurity is making me more intentional about how I organize my own creative files and client work.','2026-07-03','Draft','LinkedIn Week 2 · Fri'),

-- Week 3
(uid,'LinkedIn','Value/Tips','Week 3 — Building Basic Security Habits','Week 3 update: I''ve started building basic security habits. Here are the first three I''ve implemented.','2026-07-06','Draft','LinkedIn Week 3 · Mon'),
(uid,'LinkedIn','Showcase','3 Cybersecurity Habits Every Creative Should Adopt (Carousel)','3 cybersecurity habits every creative professional should adopt (even if you''re not in tech)','2026-07-08','Draft','LinkedIn Week 3 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','Small Win: Proper Password Management','Small win this week: I finally set up proper password management across my creative tools and client projects.','2026-07-10','Draft','LinkedIn Week 3 · Fri'),

-- Week 4
(uid,'LinkedIn','Value/Tips','Week 4 — Creative Problem-Solving Applies to Security','Week 4 in cybersecurity. The more I learn, the more I see how creative problem-solving directly applies to security thinking.','2026-07-13','Draft','LinkedIn Week 4 · Mon'),
(uid,'LinkedIn','Showcase','Motion Design Skills That Transfer to Cybersecurity (Carousel)','How skills from motion design (systems thinking, attention to detail, user behavior) translate to cybersecurity','2026-07-15','Draft','LinkedIn Week 4 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','1 Month Reflection — What Surprised Me Most','Monthly reflection: After one month of learning cybersecurity, here''s what''s surprised me most about the transition from creative work.','2026-07-17','Draft','LinkedIn Week 4 · Fri'),

-- Week 5
(uid,'LinkedIn','Value/Tips','Week 5 — Challenging My Creative Workflow in Interesting Ways','Week 5 update: Cybersecurity learning is challenging my usual creative workflow in interesting ways.','2026-07-20','Draft','LinkedIn Week 5 · Mon'),
(uid,'LinkedIn','Value/Tips','Learning Outside Your Field Makes You Better at Your Craft','Why learning something completely outside your main field can actually make you better at your original craft','2026-07-22','Draft','LinkedIn Week 5 · Wed'),
(uid,'LinkedIn','Value/Tips','Documenting the Learning Process Intentionally','This week I started documenting my learning process more intentionally. Here''s why I believe public learning builds better long-term habits.','2026-07-24','Draft','LinkedIn Week 5 · Fri'),

-- Week 6
(uid,'LinkedIn','Value/Tips','Week 6 — Applying Security to Creative Projects','Week 6 in cybersecurity. I''ve started applying basic security principles to how I handle client files and motion design projects.','2026-07-27','Draft','LinkedIn Week 6 · Mon'),
(uid,'LinkedIn','Showcase','Securing My Creative Workflow as a Motion Designer (Carousel)','How I''m currently securing my creative workflow as a motion designer','2026-07-29','Draft','LinkedIn Week 6 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','Win: Improved Security on a Client Project','Small but meaningful win: I reviewed and improved the security of one of my ongoing client projects this week.','2026-07-31','Draft','LinkedIn Week 6 · Fri'),

-- Week 7
(uid,'LinkedIn','Value/Tips','Week 7 — Cyber Changing How I Think About Systems','Week 7 update: Cybersecurity is changing how I think about systems and processes in motion design.','2026-08-03','Draft','LinkedIn Week 7 · Mon'),
(uid,'LinkedIn','Showcase','Unexpected Ways Cyber Improves My Motion Design (Carousel)','Unexpected ways learning cybersecurity is improving my approach to motion design projects','2026-08-05','Draft','LinkedIn Week 7 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','2-Month Reflection — Creative Perspective Shifted','Monthly reflection: Two months in, here''s how my perspective on creative work has started to shift because of cybersecurity learning.','2026-08-07','Draft','LinkedIn Week 7 · Fri'),

-- Week 8
(uid,'LinkedIn','Value/Tips','2 Months In — Honest Update','Two months into my cybersecurity learning journey as a motion designer — honest update.','2026-08-10','Draft','LinkedIn Week 8 · Mon'),
(uid,'LinkedIn','Showcase','Key Lessons from 2 Months of Cyber Learning (Carousel)','Key lessons from the first two months of learning cybersecurity from a creative background','2026-08-12','Draft','LinkedIn Week 8 · Wed · Carousel'),
(uid,'LinkedIn','Value/Tips','8-Week Phase Reflection — What''s Next','End of this 8-week phase reflection: What I''ve learned, what surprised me, and what I''m focusing on next in my cybersecurity journey.','2026-08-14','Draft','LinkedIn Week 8 · Fri');

-- ═══════════════════════════════════════════════════════════════════
-- INSTAGRAM — 8 WEEKS
-- Focus: Motion design identity (AE + Blender) · Process + psychology
-- Reels → content_type: Short · Feed/Carousel → Showcase or Value/Tips
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES

-- Week 1: Core After Effects Focus
(uid,'Instagram','Short','AE Tip That Instantly Improved My Animations (Reel)','After Effects tip that instantly improved my animations','2026-06-22','Draft','IG Week 1 · Mon Reel'),
(uid,'Instagram','Short','Timelapse of a Recent Animation (Reel)','Short timelapse of a recent animation','2026-06-23','Draft','IG Week 1 · Tue Reel'),
(uid,'Instagram','Showcase','Finished Motion Design Piece (Feed)','Motion design piece I shipped this week — here''s what I was going for','2026-06-23','Draft','IG Week 1 · Tue Feed Post'),
(uid,'Instagram','Short','AE Expression I Use Constantly (Reel)','Quick After Effects expression I use constantly','2026-06-24','Draft','IG Week 1 · Wed Reel'),
(uid,'Instagram','Short','Before & After Animation Comparison (Reel)','Before & after animation comparison','2026-06-25','Draft','IG Week 1 · Thu Reel'),
(uid,'Instagram','Value/Tips','5 AE Techniques in Almost Every Project (Carousel)','5 After Effects techniques I use in almost every project','2026-06-25','Draft','IG Week 1 · Thu Carousel'),
(uid,'Instagram','Short','Process Breakdown of One Animation Section (Reel)','Process breakdown of one section of a project','2026-06-26','Draft','IG Week 1 · Fri Reel'),
(uid,'Instagram','Short','Fun Animation Experiment (Reel)','Experimenting with a new motion style this weekend','2026-06-27','Draft','IG Week 1 · Sat Reel'),

-- Week 2: Introducing Blender Elements
(uid,'Instagram','Short','First 3D Element from Blender in AE (Reel)','First time adding a simple 3D element from Blender into After Effects','2026-06-29','Draft','IG Week 2 · Mon Reel'),
(uid,'Instagram','Short','Timelapse: Importing Blender Asset into AE (Reel)','Timelapse of importing a Blender asset into After Effects','2026-06-30','Draft','IG Week 2 · Tue Reel'),
(uid,'Instagram','Showcase','Finished Piece Using a Blender Element (Feed)','Finished piece that used a Blender element — the 3D made all the difference','2026-06-30','Draft','IG Week 2 · Tue Feed Post'),
(uid,'Instagram','Short','Blender as AE Extension — How I''m Using It (Reel)','How I''m using Blender as an extension for my After Effects work','2026-07-01','Draft','IG Week 2 · Wed Reel'),
(uid,'Instagram','Short','Exporting from Blender for AE — Quick Tip (Reel)','Quick tip on exporting from Blender for After Effects','2026-07-02','Draft','IG Week 2 · Thu Reel'),
(uid,'Instagram','Value/Tips','My AE + Blender Hybrid Workflow (Carousel)','My current After Effects + Blender hybrid workflow','2026-07-02','Draft','IG Week 2 · Thu Carousel'),
(uid,'Instagram','Short','Full Pipeline Process Video (Reel)','Process video showing the full AE + Blender pipeline','2026-07-03','Draft','IG Week 2 · Fri Reel'),
(uid,'Instagram','Short','Hybrid Project Showcase (Reel)','Finished hybrid project showcase','2026-07-04','Draft','IG Week 2 · Sat Reel'),

-- Week 3: Process & Psychology
(uid,'Instagram','Short','Psychology: Why This Animation Feels Premium (Reel)','The psychology behind why this animation feels premium','2026-07-06','Draft','IG Week 3 · Mon Reel'),
(uid,'Instagram','Short','Process Breakdown of a Recent Animation (Reel)','Detailed process breakdown of a recent animation','2026-07-07','Draft','IG Week 3 · Tue Reel'),
(uid,'Instagram','Showcase','Finished Work — Design Decision Breakdown (Feed)','Finished piece + the thinking behind every design choice','2026-07-07','Draft','IG Week 3 · Tue Feed Post'),
(uid,'Instagram','Short','How Human Attention Works in Motion Design (Reel)','How human attention works in motion design (simple breakdown)','2026-07-08','Draft','IG Week 3 · Wed Reel'),
(uid,'Instagram','Short','Timelapse + Voiceover on Creative Decisions (Reel)','Timelapse + voiceover explaining creative decisions','2026-07-09','Draft','IG Week 3 · Thu Reel'),
(uid,'Instagram','Value/Tips','Psychology Principles I Apply to Motion Design (Carousel)','Psychology principles I apply to my motion design','2026-07-09','Draft','IG Week 3 · Thu Carousel'),
(uid,'Instagram','Short','Before & After — The Impact of Small Changes (Reel)','Before & after showing the impact of small changes','2026-07-10','Draft','IG Week 3 · Fri Reel'),
(uid,'Instagram','Short','Light Creative Experiment (Reel)','Light creative experiment this week','2026-07-11','Draft','IG Week 3 · Sat Reel'),

-- Week 4: Deeper After Effects Techniques
(uid,'Instagram','Short','Advanced AE Technique I Wish I Knew Earlier (Reel)','Advanced After Effects technique I wish I knew earlier','2026-07-13','Draft','IG Week 4 · Mon Reel'),
(uid,'Instagram','Short','Complex Animation Section Process (Reel)','Process video of a complex animation section','2026-07-14','Draft','IG Week 4 · Tue Reel'),
(uid,'Instagram','Showcase','High-Quality Finished Motion Piece (Feed)','One of my best pieces this month — here''s what went into it','2026-07-14','Draft','IG Week 4 · Tue Feed Post'),
(uid,'Instagram','Short','Expression Controls That Changed My Workflow (Reel)','Expression controls that changed my workflow','2026-07-15','Draft','IG Week 4 · Wed Reel'),
(uid,'Instagram','Short','Tutorial-Style Tip on a Specific Technique (Reel)','Tutorial-style tip on a specific After Effects technique','2026-07-16','Draft','IG Week 4 · Thu Reel'),
(uid,'Instagram','Value/Tips','My Top 5 AE Time-Savers in 2026 (Carousel)','My top 5 After Effects time-savers in 2026','2026-07-16','Draft','IG Week 4 · Thu Carousel'),
(uid,'Instagram','Short','Full Project Process Condensed (Reel)','Full project process (condensed)','2026-07-17','Draft','IG Week 4 · Fri Reel'),
(uid,'Instagram','Short','Behind-the-Scenes of Learning New Techniques (Reel)','Behind-the-scenes of learning new techniques this week','2026-07-18','Draft','IG Week 4 · Sat Reel'),

-- Week 5: Blender Integration Deep Dive
(uid,'Instagram','Short','How I''m Using Blender to Enhance AE Projects (Reel)','How I''m currently using Blender to enhance my After Effects projects','2026-07-20','Draft','IG Week 5 · Mon Reel'),
(uid,'Instagram','Short','Timelapse of a Hybrid Project (Reel)','Timelapse of a hybrid AE + Blender project','2026-07-21','Draft','IG Week 5 · Tue Reel'),
(uid,'Instagram','Showcase','Finished Animation Using Blender Elements (Feed)','Finished animation that used Blender elements — here''s the breakdown','2026-07-21','Draft','IG Week 5 · Tue Feed Post'),
(uid,'Instagram','Short','Blender Tips for AE-First Motion Designers (Reel)','Blender tips for motion designers who mainly use After Effects','2026-07-22','Draft','IG Week 5 · Wed Reel'),
(uid,'Instagram','Short','Full Blender → After Effects Pipeline (Reel)','Process showing the full pipeline (Blender → After Effects)','2026-07-23','Draft','IG Week 5 · Thu Reel'),
(uid,'Instagram','Value/Tips','My Evolving AE + Blender Workflow (Carousel)','My evolving After Effects + Blender workflow','2026-07-23','Draft','IG Week 5 · Thu Carousel'),
(uid,'Instagram','Short','Before & After: Adding 3D Elements (Reel)','Before & after of adding 3D elements from Blender','2026-07-24','Draft','IG Week 5 · Fri Reel'),
(uid,'Instagram','Short','Hybrid Work Showcase (Reel)','Hybrid work showcase — 2D + 3D motion design','2026-07-25','Draft','IG Week 5 · Sat Reel'),

-- Week 6: Psychology + Creative Decisions
(uid,'Instagram','Short','Why This Small Animation Choice Makes a Big Difference (Reel)','Why this small animation choice makes a big difference','2026-07-27','Draft','IG Week 6 · Mon Reel'),
(uid,'Instagram','Short','Thinking Behind Design Decisions Process Video (Reel)','Process video explaining the thinking behind design decisions','2026-07-28','Draft','IG Week 6 · Tue Reel'),
(uid,'Instagram','Showcase','Finished Piece with Thoughtful Caption (Feed)','The small decision that elevated this piece — a breakdown','2026-07-28','Draft','IG Week 6 · Tue Feed Post'),
(uid,'Instagram','Short','Psychology of Motion Design — Attention & Emotion (Reel)','Psychology of motion design – attention & emotion','2026-07-29','Draft','IG Week 6 · Wed Reel'),
(uid,'Instagram','Short','Detailed Breakdown of One Animation Section (Reel)','Detailed breakdown of one animation section','2026-07-30','Draft','IG Week 6 · Thu Reel'),
(uid,'Instagram','Value/Tips','How I Make Design Decisions in Animations (Carousel)','How I make design decisions in my animations','2026-07-30','Draft','IG Week 6 · Thu Carousel'),
(uid,'Instagram','Short','Full Project with Process Highlights (Reel)','Full project with process highlights','2026-07-31','Draft','IG Week 6 · Fri Reel'),
(uid,'Instagram','Short','Multi-Skill Life Glimpse (Reel)','A glimpse into the multi-skill creative life — motion, cyber, music','2026-08-01','Draft','IG Week 6 · Sat Reel'),

-- Week 7: Refined Workflows
(uid,'Instagram','Short','Workflow Improvements After Learning Blender (Reel)','Workflow improvements I made after learning basic Blender','2026-08-03','Draft','IG Week 7 · Mon Reel'),
(uid,'Instagram','Short','Timelapse of a Refined Animation (Reel)','Timelapse of a refined animation','2026-08-04','Draft','IG Week 7 · Tue Reel'),
(uid,'Instagram','Showcase','High-Quality Finished Work (Feed)','High-quality finished work — the result of 2 months of compounding practice','2026-08-04','Draft','IG Week 7 · Tue Feed Post'),
(uid,'Instagram','Short','My Optimized AE + Blender Pipeline (Reel)','My current optimized After Effects + Blender pipeline','2026-08-05','Draft','IG Week 7 · Wed Reel'),
(uid,'Instagram','Short','Efficiency Improvements in Motion Design Process (Reel)','Process video showing efficiency improvements','2026-08-06','Draft','IG Week 7 · Thu Reel'),
(uid,'Instagram','Value/Tips','How My Motion Design Process Evolved This Month (Carousel)','How my motion design process evolved this month','2026-08-06','Draft','IG Week 7 · Thu Carousel'),
(uid,'Instagram','Short','Project Showcase with Workflow Explanation (Reel)','Project showcase with workflow explanation','2026-08-07','Draft','IG Week 7 · Fri Reel'),
(uid,'Instagram','Short','Creative Experiments (Reel)','Creative experiments this weekend','2026-08-08','Draft','IG Week 7 · Sat Reel'),

-- Week 8: 2-Month Review & Reflection
(uid,'Instagram','Short','What I Learned About Motion Design in 2 Months (Reel)','What I learned about motion design in the last 2 months','2026-08-10','Draft','IG Week 8 · Mon Reel'),
(uid,'Instagram','Short','Process Highlights from Recent Projects (Reel)','Process highlights from recent projects','2026-08-11','Draft','IG Week 8 · Tue Reel'),
(uid,'Instagram','Showcase','Best Work from the Last 8 Weeks (Feed)','Best work from the last 8 weeks — a progression','2026-08-11','Draft','IG Week 8 · Tue Feed Post'),
(uid,'Instagram','Short','How My AE + Blender Approach Changed (Reel)','How my After Effects + Blender approach has changed','2026-08-12','Draft','IG Week 8 · Wed Reel'),
(uid,'Instagram','Short','Key Techniques Learned — Summary (Reel)','Summary of key techniques learned over 8 weeks','2026-08-13','Draft','IG Week 8 · Thu Reel'),
(uid,'Instagram','Value/Tips','Motion Design Lessons from 2 Months (Carousel)','Motion design lessons from the last 2 months','2026-08-13','Draft','IG Week 8 · Thu Carousel'),
(uid,'Instagram','Short','Reflective Process Video (Reel)','Reflective process video — how this phase of work shaped me','2026-08-14','Draft','IG Week 8 · Fri Reel'),
(uid,'Instagram','Short','Strong Work Showcase (Reel)','Strong work showcase — end of Phase 1','2026-08-15','Draft','IG Week 8 · Sat Reel');

END $$;
