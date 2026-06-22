-- ═══════════════════════════════════════════════════════════════════
-- TIKTOK — 8-Week Calendar (June 22 – August 16, 2026)
-- Phase 1: Foundation — Creative Generalist Brand
-- 5–7 videos/week following recurring series:
--   • Day X of Learning Cybersecurity (2–3×/week)
--   • AE / Blender Hack of the Week (1×/week)
--   • Things I Wish I Knew Earlier (1×/week)
--   • Creative Generalist Life (2×/week)
--   • Psychology of [Topic] (bi-weekly)
--   • Weekly Skill Update (1×/week)
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════

DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users ORDER BY created_at LIMIT 1;

INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES

-- ── WEEK 1 (Jun 22–28): Cybersecurity Journey Start ──────────────
(uid,'TikTok','Behind-Scenes','Day 1 of Learning Cybersecurity as a Motion Designer','Day 1. I have no idea what I''m doing. Here''s why I''m starting anyway.','2026-06-22','Draft','TikTok W1 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','AE Hack — Null Objects Are Not Organizational Tools','Everyone uses null objects for organization. I use them for total scene control. Here''s the difference.','2026-06-22','Draft','TikTok W1 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Day 1 of Building Publicly','Motion design in the morning. Cybersecurity in the afternoon. Music in the evening. This is what my day actually looks like.','2026-06-23','Draft','TikTok W1 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Motion Design Edition','If I could go back to my first year in After Effects and tell myself one thing, it would be this.','2026-06-24','Draft','TikTok W1 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Day 3 of Cybersecurity — This Is Harder Than I Expected','Day 3. Already questioning everything. Your brain genuinely treats new technical skills like a threat.','2026-06-25','Draft','TikTok W1 · Thu · Series: Day X Cyber'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Week 1 Chaos Recap','Honest end-of-week snapshot. Motion work, cyber study, music session. What actually happened vs what I planned.','2026-06-26','Draft','TikTok W1 · Fri · Series: Creative Generalist Life'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — Week 1 Across All Skills','Week 1 update. Motion design, cybersecurity, Blender, music. Where I started, where I am, what surprised me.','2026-06-27','Draft','TikTok W1 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 2 (Jun 29 – Jul 5): Motion Design Focus ─────────────────
(uid,'TikTok','Behind-Scenes','Day 8 — Cybersecurity Progress Update','Day 8 of cybersecurity. First thing that actually made sense. Here''s the moment it clicked.','2026-06-29','Draft','TikTok W2 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','AE Hack — Graph Editor Is Not Optional','Most people never touch the graph editor. The people with premium-feeling animations never leave it.','2026-06-29','Draft','TikTok W2 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Juggling 5 Skills Without Losing Your Mind','The honest system I use to make progress in motion design, cyber, fullstack, Blender, and music without everything falling apart.','2026-06-30','Draft','TikTok W2 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Blender for AE Designers','If you''re an After Effects motion designer avoiding Blender, this is what I wish someone told me before I waited 2 years.','2026-07-01','Draft','TikTok W2 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Day 11 — First Cybersecurity Small Win','Day 11. Small win today. I finally understood what a VPN actually does beyond marketing speak.','2026-07-02','Draft','TikTok W2 · Thu · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','Psychology of Starting Something New (Quick Take)','The reason you want to quit on Day 3 of learning anything new is biological. Here''s the 30-second version.','2026-07-03','Draft','TikTok W2 · Fri · Series: Psychology of [Topic]'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — Week 2','Week 2. Motion design leveled up. Cyber is confusing. Blender export finally worked. Music session was great.','2026-07-04','Draft','TikTok W2 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 3 (Jul 6–12): Productivity & Multi-Skill Systems ────────
(uid,'TikTok','Behind-Scenes','Day 15 — Cybersecurity Is Changing How I Think','Day 15. Cybersecurity is starting to change how I think about my creative files, client work, and my whole workflow.','2026-07-06','Draft','TikTok W3 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','Blender Hack — Exporting Alpha Channels for After Effects','The exact Blender export settings I use to bring 3D elements cleanly into After Effects. No green screen, no mess.','2026-07-06','Draft','TikTok W3 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — How I Actually Structure My Day','I don''t time-block by hour. I time-block by energy. Here''s the full system I use across 5 disciplines.','2026-07-07','Draft','TikTok W3 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Game Dev Thinking for Motion Design','Game dev has state machines, event-driven behavior, and modular design. After Effects should too. Here''s how I apply it.','2026-07-08','Draft','TikTok W3 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Day 18 — First Cybersecurity Concept That Actually Clicked','Day 18. Defense in depth. The moment I understood it as a creative principle, everything changed.','2026-07-09','Draft','TikTok W3 · Thu · Series: Day X Cyber'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — The Honest Chaos','Not every day is productive. Here''s a real day: 3 context switches, 1 failed Blender export, 1 good music session.','2026-07-10','Draft','TikTok W3 · Fri · Series: Creative Generalist Life'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — 3 Weeks In','3 weeks. Cyber is getting clearer. Blender pipeline is working. Motion design work is stronger. Music is the reset.','2026-07-11','Draft','TikTok W3 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 4 (Jul 13–19): 1-Month Mark ─────────────────────────────
(uid,'TikTok','Behind-Scenes','Day 22 — 1 Month of Cybersecurity — Honest Review','1 month of cybersecurity as a motion designer. What I thought it would be vs what it actually is.','2026-07-13','Draft','TikTok W4 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','AE Hack — wiggle() Is Not About Randomness','Everyone uses wiggle() for random movement. The actually useful version is controlled entropy. Here''s the difference.','2026-07-13','Draft','TikTok W4 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — What a Good Multi-Skill Day Looks Like','This is what a day looks like when all the skills compound instead of compete.','2026-07-14','Draft','TikTok W4 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Productivity for Multi-Passionate People','If you have more than 2 things you''re seriously learning, this is the productivity framework that actually works.','2026-07-15','Draft','TikTok W4 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Value/Tips','Psychology of Long-Term Skill Building (Quick Take)','Month 1 is exciting. Month 2 is disorienting. Month 3 is the danger zone. Here''s what happens and why.','2026-07-16','Draft','TikTok W4 · Thu · Series: Psychology of [Topic]'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Month 1 Reflection','One month of building publicly across motion design, cyber, Blender, and music. Honest reflection.','2026-07-17','Draft','TikTok W4 · Fri · Series: Creative Generalist Life'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — 4 Weeks / 1 Month','4 weeks in. Every skill is progressing differently. Cyber is surprising me the most.','2026-07-18','Draft','TikTok W4 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 5 (Jul 20–26): Deeper Cybersecurity + Psychology ────────
(uid,'TikTok','Value/Tips','Day 29 — Cybersecurity Myths Creatives Believe','Day 29. The biggest myths I had about cybersecurity before I started learning it as a motion designer.','2026-07-20','Draft','TikTok W5 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','Blender Hack — Geometry Nodes Basics for Motion Designers','Geometry nodes are to Blender what expressions are to After Effects. Here''s the 60-second version for AE people.','2026-07-20','Draft','TikTok W5 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — The Blender Struggle Is Real','Week 5 and Blender is still hard. Here''s the honest reality of learning a 3D tool while doing motion design work.','2026-07-21','Draft','TikTok W5 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Security for Creatives','The 3 security habits I wish I had set up from day one as a freelance motion designer.','2026-07-22','Draft','TikTok W5 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Day 32 — Cybersecurity Is Starting to Make Sense','Day 32. The confusion is lifting. Here''s the specific concept that made everything start to click.','2026-07-23','Draft','TikTok W5 · Thu · Series: Day X Cyber'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Productivity System Update','Updated my multi-skill system this week. Here''s what changed and why.','2026-07-24','Draft','TikTok W5 · Fri · Series: Creative Generalist Life'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — Week 5','Week 5. Cyber is clicking. Blender is compounding slowly. Motion design work is better than ever.','2026-07-25','Draft','TikTok W5 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 6 (Jul 27 – Aug 2): Cross-Skill Influence ───────────────
(uid,'TikTok','Behind-Scenes','Day 36 — How Cyber Changed My Creative Thinking','Day 36. Learning cybersecurity is changing how I think about client work, file organization, and trust.','2026-07-27','Draft','TikTok W6 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','AE Hack — Using Expressions to Link Properties Across Layers','This expression replaced 40 separate keyframes in a recent project. Here''s how to use it.','2026-07-27','Draft','TikTok W6 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — When Game Dev Thinking Helped My Motion Design','I was stuck on an animation system. Then I thought about it like a game developer. Here''s what happened.','2026-07-28','Draft','TikTok W6 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Psychology of Creative Flow — Quick Take','Why flow state in After Effects feels different from coding flow — and how to engineer both intentionally.','2026-07-29','Draft','TikTok W6 · Wed · Series: Psychology of [Topic]'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Full AE + Blender Pipeline','The exact pipeline I wish I had set up from the start: AE for timing, Blender for 3D, back to AE for comp.','2026-07-30','Draft','TikTok W6 · Thu · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Week 6 Honest Recap','Not everything went to plan this week. Here''s what actually happened across all 5 disciplines.','2026-07-31','Draft','TikTok W6 · Fri · Series: Creative Generalist Life'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — 6 Weeks In','6 weeks in. The skills are starting to talk to each other. Here''s the surprising crossover I noticed this week.','2026-08-01','Draft','TikTok W6 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 7 (Aug 3–9): Deeper Building in Public ──────────────────
(uid,'TikTok','Value/Tips','Day 43 — What I Wish I Knew Before Starting Cybersecurity','Day 43. The 3 things I wish someone told me before I started learning cybersecurity as a creative.','2026-08-03','Draft','TikTok W7 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','Blender Hack — Quick Win for Motion Designers New to 3D','The single Blender skill that unlocked the most value fastest for my After Effects workflow.','2026-08-03','Draft','TikTok W7 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — Music Production Meets Motion Design','Music session this week directly influenced an animation I was working on. Here''s the exact connection.','2026-08-04','Draft','TikTok W7 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — Fullstack Edition','Starting to learn fullstack development as a motion designer. The thing I wish I knew first.','2026-08-05','Draft','TikTok W7 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Day 46 — Almost 2 Months of Cybersecurity','Day 46. Almost 2 months. Here''s what surprised me most about the journey so far.','2026-08-06','Draft','TikTok W7 · Thu · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','Psychology of Building in Public — Quick Take','Building in public forces a kind of psychological honesty that private work never demands. Here''s why that matters.','2026-08-07','Draft','TikTok W7 · Fri · Series: Psychology of [Topic]'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — Almost 2 Months','Almost 2 months in. Every discipline has leveled up in different ways. Here''s the honest breakdown.','2026-08-08','Draft','TikTok W7 · Sat · Series: Weekly Skill Update'),

-- ── WEEK 8 (Aug 10–16): 2-Month Review & Wrap ────────────────────
(uid,'TikTok','Behind-Scenes','Day 50 — 2-Month Cybersecurity Learning Honest Review','Day 50. 2 months of learning cybersecurity as a motion designer. What I know, what I still don''t know, what changed.','2026-08-10','Draft','TikTok W8 · Mon · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','AE Hack — The Best Expression I Use in Almost Every Project','This is the After Effects expression I reach for constantly. Saved more time than any other technique I know.','2026-08-10','Draft','TikTok W8 · Mon · Series: AE/Blender Hack'),
(uid,'TikTok','Behind-Scenes','Creative Generalist Life — 2-Month Honest Reflection','2 months of building publicly across motion design, cyber, Blender, fullstack, and music. The real story.','2026-08-11','Draft','TikTok W8 · Tue · Series: Creative Generalist Life'),
(uid,'TikTok','Value/Tips','Things I Wish I Knew Earlier — 8-Week Edition','The single most important thing I''ve learned across 8 weeks of building in public.','2026-08-12','Draft','TikTok W8 · Wed · Series: Things I Wish I Knew'),
(uid,'TikTok','Behind-Scenes','Day 53 — What''s Next After 2 Months','Day 53. Closing out Phase 1. Here''s what I''m going deeper into in Phase 2.','2026-08-13','Draft','TikTok W8 · Thu · Series: Day X Cyber'),
(uid,'TikTok','Value/Tips','Psychology of Multi-Skill Learning — 2-Month Take','After 2 months of building across 5 disciplines, here''s what the psychology of multi-skill learning actually looks like from the inside.','2026-08-14','Draft','TikTok W8 · Fri · Series: Psychology of [Topic]'),
(uid,'TikTok','Behind-Scenes','Weekly Skill Update — 2-Month Wrap','8 weeks. 5 disciplines. 1 honest recap. This is where every skill stands heading into Phase 2.','2026-08-15','Draft','TikTok W8 · Sat · Series: Weekly Skill Update');

END $$;
