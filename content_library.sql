-- ═══════════════════════════════════════════════════════════════════
-- ACTIONABLE — Extended Content Library
-- Creative Generalist: Motion Design · Cyber · Dev · Music · SaaS
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- Expand dm_templates type constraint to support tweet + LinkedIn libraries
ALTER TABLE dm_templates DROP CONSTRAINT IF EXISTS dm_templates_template_type_check;
ALTER TABLE dm_templates ADD CONSTRAINT dm_templates_template_type_check
  CHECK (template_type IN (
    'Initial Outreach','Mockup Offer','Value-First','Follow-Up','Meeting Request',
    'SaaS Pitch','Tweet Library','LinkedIn Post'
  ));

DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users ORDER BY created_at LIMIT 1;

-- ─────────────────────────────────────────────────────────────────
-- 1. YOUTUBE LONG-FORM (28 videos — Thursdays)
--    Brand: Creative Generalist · Motion · Cyber · Dev · Music
-- ─────────────────────────────────────────────────────────────────
INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES

-- June–July: Foundations
(uid,'YouTube','Long Video','Why Learning Multiple Creative & Technical Skills Makes You a Better Motion Designer','The jack-of-all-trades debate is dead — here''s why multi-disciplinary depth wins','2026-06-25','Scheduled','Series: Foundations'),
(uid,'YouTube','Long Video','My Cybersecurity Journey as a Motion Designer (After Effects + Fullstack Background)','What made a motion designer go deep into cyber — and what it changed about everything','2026-07-02','Scheduled','Series: Multi-skill'),
(uid,'YouTube','Long Video','The Psychology of Juggling Many Skills (Motion Design, Cyber, Dev, Music)','Your brain isn''t switching contexts — it''s carrying residue. Here''s how to use that intentionally','2026-07-09','Scheduled','Series: Psychology'),
(uid,'YouTube','Long Video','After Effects to Blender Workflow: When & Why I Add 3D Elements','Not every project needs 3D. Here''s the exact decision framework I use','2026-07-16','Scheduled','Series: AE+Blender'),
(uid,'YouTube','Long Video','How Game Dev Thinking Improves Motion Design Projects','State machines, event-driven behavior, modular design — motion design needed this','2026-07-23','Scheduled','Series: Crossovers'),

-- August: Motion Design Focus
(uid,'YouTube','Long Video','Advanced After Effects Techniques I Wish I Knew Earlier (2026 Edition)','These aren''t beginner tips. If you''ve been in AE for a year, this is your next level','2026-07-30','Scheduled','Series: AE'),
(uid,'YouTube','Long Video','Using Blender as an Extension for After Effects Projects (Workflow + Export Tips)','Blender isn''t replacing AE — it''s extending what AE can''t do on its own','2026-08-06','Scheduled','Series: AE+Blender'),
(uid,'YouTube','Long Video','The Psychology of Creative Flow in Motion Design','Why flow states in AE feel different from coding flow — and how to engineer both','2026-08-13','Scheduled','Series: Psychology'),
(uid,'YouTube','Long Video','Building a Simple SaaS Tool as a Motion Designer (Fullstack Beginner Notes)','What happens when a motion designer tries to ship code. Honest, messy, educational.','2026-08-20','Scheduled','Series: Dev'),
(uid,'YouTube','Long Video','Music Production as a Tool for Better Motion Design Timing & Emotion','A music session changed how I think about animation pacing forever','2026-08-27','Scheduled','Series: Music'),

-- September: Cybersecurity + Crossovers
(uid,'YouTube','Long Video','Cybersecurity for Creatives – Why Motion Designers & Devs Are Targets','Your client files, source assets, and SaaS accounts are more exposed than you think','2026-09-03','Scheduled','Series: Cyber'),
(uid,'YouTube','Long Video','How Learning Cybersecurity Changed My Approach to Client Projects','Defense in depth is a creative principle too. Here''s the full crossover.','2026-09-10','Scheduled','Series: Cyber'),
(uid,'YouTube','Long Video','After Effects + Blender + Cyber: Securing My Creative Pipeline','End-to-end security for a motion design workflow — tools, habits, and mindset','2026-09-17','Scheduled','Series: Cyber+Motion'),
(uid,'YouTube','Long Video','The Psychology Behind Strong Habits When Learning New Skills (Cyber + Blender)','Habit formation when the skill feels foreign. The neuroscience and the practical system','2026-09-24','Scheduled','Series: Psychology'),
(uid,'YouTube','Long Video','Game Dev Principles Applied to Motion Design Animation','How I use game dev logic to plan and build animation systems in AE','2026-10-01','Scheduled','Series: Crossovers'),

-- October: Productivity & Systems
(uid,'YouTube','Long Video','My System for Managing Motion Design, Cyber, Fullstack & Music at Once','The exact tools, routines, and mental model that keeps me functional across 6 disciplines','2026-10-08','Scheduled','Series: Productivity'),
(uid,'YouTube','Long Video','Psychology of Context Switching Between Creative & Technical Work','The brain science of switching from AE to terminal to Blender to DAW — and back','2026-10-15','Scheduled','Series: Psychology'),
(uid,'YouTube','Long Video','After Effects Motion Design Workflow + Blender 3D Extensions (Full Breakdown)','My complete hybrid workflow — every tool, every decision, every export step','2026-10-22','Scheduled','Series: AE+Blender'),
(uid,'YouTube','Long Video','Cybersecurity for Creatives – Protecting Your Code, Assets & SaaS Projects','Practical security for people who create: what to lock down and how','2026-10-29','Scheduled','Series: Cyber'),
(uid,'YouTube','Long Video','How Music Production Improves My Motion Design Storytelling','Rhythm, tension, release — these music concepts are animation principles too','2026-11-05','Scheduled','Series: Music'),

-- November: Deeper Building
(uid,'YouTube','Long Video','Building in Public: My Current Stack (Motion Design + Fullstack + Cyber)','Every tool, language, and framework I''m actively using — full honest breakdown','2026-11-12','Scheduled','Series: Building'),
(uid,'YouTube','Long Video','Cybersecurity for Creatives – Practical Tools I''m Using Daily','Not theory. The actual tools and workflows protecting my creative business','2026-11-19','Scheduled','Series: Cyber'),
(uid,'YouTube','Long Video','Blender as an Extension Tool for Complex After Effects Projects','Advanced cases: when and why I reach for Blender mid-AE project','2026-11-26','Scheduled','Series: AE+Blender'),
(uid,'YouTube','Long Video','The Psychology of Learning Game Dev While Doing Motion Design','Cognitive load, identity resistance, and the unexpected benefits of dual-discipline learning','2026-12-03','Scheduled','Series: Psychology'),
(uid,'YouTube','Long Video','Creative Generalist Career Paths in 2026–2027 (Motion Design + Tech Skills)','What does a multi-disciplinary creative actually do for work? Real options, real tradeoffs','2026-12-10','Scheduled','Series: Career'),

-- December: Year Review
(uid,'YouTube','Long Video','2026 Review: What Learning Cyber, Blender, Fullstack & Music Taught Me About Creativity','The unexpected lessons from a year of aggressive multi-disciplinary learning','2026-12-17','Scheduled','Series: Year Review'),
(uid,'YouTube','Long Video','Psychology of Year-End Reflection for Multi-Passionate Creatives','How to actually learn from a year of scattered but intentional growth','2026-12-24','Scheduled','Series: Psychology'),
(uid,'YouTube','Long Video','My 2027 Plan as a Creative Generalist (Motion Design, Cyber, Dev & Music)','Clear goals, honest constraints, and the exact skills I''m doubling down on','2026-12-31','Scheduled','Series: Planning');

-- ─────────────────────────────────────────────────────────────────
-- 2. YOUTUBE SHORTS (Motion · Cyber · Multi-skill)
-- ─────────────────────────────────────────────────────────────────
INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES
(uid,'YouTube','Short','AE tip that saved me hours this week','Nobody tells you about this panel until you''ve wasted 40 hours without it','2026-06-20','Scheduled','AE Short'),
(uid,'YouTube','Short','When I add Blender to an AE project (and when I don''t)','The decision isn''t about complexity — it''s about what the scene needs to feel','2026-07-04','Scheduled','AE+Blender Short'),
(uid,'YouTube','Short','This small 3D element completely changed the feel of my 2D animation','One Blender render. One composite. Completely different energy.','2026-07-11','Scheduled','AE+Blender Short'),
(uid,'YouTube','Short','After Effects expression I use in almost every project','3 words of code that replaced 20 keyframes','2026-07-18','Scheduled','AE Short'),
(uid,'YouTube','Short','Day 30 of learning cybersecurity as a motion designer','What changed in my thinking — and what surprised me most','2026-07-25','Scheduled','Cyber Short'),
(uid,'YouTube','Short','Biggest security mistake most creatives make','And it''s not the password. It''s what comes before the password.','2026-08-01','Scheduled','Cyber Short'),
(uid,'YouTube','Short','How I protect my After Effects projects & client files','3 tools, 1 habit, zero paranoia','2026-08-08','Scheduled','Cyber Short'),
(uid,'YouTube','Short','How I balance motion design, cyber, fullstack & music','The honest answer: badly, then better, then differently','2026-08-15','Scheduled','Multi-skill Short'),
(uid,'YouTube','Short','The psychology trick that helps me switch between creative & technical work','Your brain leaves a residue between tasks. Here''s how to use it.','2026-08-22','Scheduled','Psychology Short'),
(uid,'YouTube','Short','Why learning game dev is making me a better motion designer','State machines changed how I plan AE animation systems','2026-08-29','Scheduled','Crossover Short'),
(uid,'YouTube','Short','Music habit that improved my animation timing','I started producing music. My motion got better. Here''s why.','2026-09-05','Scheduled','Music Short'),
(uid,'YouTube','Short','One psychological principle every multi-passionate creator needs','Without this your skills stay shallow forever','2026-09-12','Scheduled','Psychology Short'),
(uid,'YouTube','Short','Why your brain resists learning new tools (and how to push through)','It''s not laziness. It''s identity protection.','2026-09-19','Scheduled','Psychology Short'),
(uid,'YouTube','Short','The hidden cost of context switching between skills','It''s not confusion. It''s depth debt.','2026-09-26','Scheduled','Psychology Short'),
(uid,'YouTube','Short','Blender geometry nodes in 60 seconds — the AE parallel','What expressions are to AE, nodes are to Blender','2026-10-03','Scheduled','Blender Short'),
(uid,'YouTube','Short','Cybersecurity principle that changed my creative workflow','Defense in depth. For your files, your clients, your business.','2026-10-10','Scheduled','Cyber Short'),
(uid,'YouTube','Short','AE null object tip most people miss','This isn''t organization. It''s control infrastructure.','2026-10-17','Scheduled','AE Short'),
(uid,'YouTube','Short','What building a SaaS tool taught me in 60 seconds','When you build what you animate, you animate it differently','2026-10-24','Scheduled','Dev Short'),
(uid,'YouTube','Short','The 3-second rule applies in motion design and music','If you haven''t grabbed them, you''ve already lost them','2026-10-31','Scheduled','Music Short'),
(uid,'YouTube','Short','Game dev state machines for AE animation systems','Plan your animation like a game designer — it''ll show','2026-11-07','Scheduled','Crossover Short');

-- ─────────────────────────────────────────────────────────────────
-- 3. X POSTS — Creative Generalist Brand Angle (Draft)
-- ─────────────────────────────────────────────────────────────────
INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES
(uid,'X','Value/Tips','AE is still my main tool. Blender is becoming my secret weapon.','The workflow shift took 2 months. The visual upgrade was immediate.','2026-06-19','Draft','Creative Generalist'),
(uid,'X','Value/Tips','Learning cybersecurity while doing motion design changes how you see client work','You start noticing vulnerabilities. In code, in process, in trust.','2026-06-21','Draft','Cyber angle'),
(uid,'X','Value/Tips','The psychology of context switching between creative and technical work','Your brain doesn''t actually switch. It carries residue. Use it intentionally.','2026-06-23','Draft','Psychology'),
(uid,'X','Value/Tips','Game dev logic is quietly improving how I approach animation systems','State machines. Event-driven behavior. Modular design. Motion design needed these.','2026-06-26','Draft','Crossover'),
(uid,'X','Value/Tips','Music production session today directly influenced my animation pacing','Rhythm isn''t just for audio.','2026-06-28','Draft','Music'),
(uid,'X','Value/Tips','The hidden cost of learning 6 skills at once isn''t confusion — it''s depth debt','You have to circle back and go deeper or they stay surface level forever.','2026-07-03','Draft','Psychology'),
(uid,'X','Value/Tips','Building a SaaS product as a motion designer is revealing','You start designing UI you''ll actually animate. The feedback loop is everything.','2026-07-05','Draft','Dev'),
(uid,'X','Value/Tips','Cybersecurity principle that changed my creative work: defense in depth','Don''t rely on one layer of protection — for your files, workflow, or clients.','2026-07-10','Draft','Cyber'),
(uid,'X','Value/Tips','The generalist vs specialist debate misses the real question','What''s the depth of your generalism? Surface-level many things = weak.','2026-07-12','Draft','Career'),
(uid,'X','Value/Tips','Motion design teaches you to care about milliseconds. Cybersecurity about microseconds.','Both teach you that precision is a mindset, not a setting.','2026-07-17','Draft','Crossover'),
(uid,'X','Value/Tips','Building in public forces psychological honesty that private work never demands','You can''t bullshit an audience who watches you work.','2026-07-19','Draft','Building'),
(uid,'X','Value/Tips','Every creative skill I''ve picked up made my motion design better in a non-obvious way','Cyber made me precise. Music made me feel timing differently. Dev made me think in systems.','2026-07-24','Draft','Multi-skill'),
(uid,'X','Value/Tips','Why we resist learning new tools: it''s not laziness. It''s identity protection.','I''m not a Blender person really means I''m afraid of being bad at something again.','2026-07-26','Draft','Psychology'),
(uid,'X','Value/Tips','Most motion designers use keyframes like notes on a page','The best ones use keyframes like syllables in speech. Timing is the language.','2026-07-31','Draft','Motion Design'),
(uid,'X','Value/Tips','Cybersecurity for Creatives — Lesson 1','Your creative assets are more valuable than you think. Treat them like it.','2026-08-02','Draft','Cyber'),
(uid,'X','Value/Tips','The music and motion design crossover no one talks about','Both live and die by the 3-second hook. If you haven''t grabbed them, you''ve lost them.','2026-08-07','Draft','Music'),
(uid,'X','Value/Tips','What game dev taught me about motion design: plan for user states','Your animation doesn''t exist in a vacuum — it exists after a click, a scroll, a frustration.','2026-08-09','Draft','Crossover'),
(uid,'X','Value/Tips','Productivity principle borrowed from cybersecurity: threat modeling for your time','What are the realistic attacks on your focus today? Plan around them.','2026-08-14','Draft','Productivity'),
(uid,'X','Value/Tips','Motion design is the only discipline where the output is temporal','You''re not making a thing — you''re making an experience that lives in time.','2026-08-16','Draft','Philosophy'),
(uid,'X','Value/Tips','The psychology of year-long skill development','First 3 months = suffering. Then something clicks. Then you feel dumb at a higher level. Repeat.','2026-08-21','Draft','Psychology');

-- ─────────────────────────────────────────────────────────────────
-- 4. LINKEDIN POSTS (Draft — schedule from content page)
-- ─────────────────────────────────────────────────────────────────
INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES
(uid,'LinkedIn','Long Video','Why I''m Building Across Motion Design, Cybersecurity, Dev, and Music at the Same Time','Most people tell you to niche down. I went the other direction — and here''s why it''s working.','2026-07-01','Draft','LinkedIn - Identity'),
(uid,'LinkedIn','Long Video','The Psychology of Being a Creative Generalist in 2026','There''s a specific cognitive pattern behind people who thrive across many disciplines. It took me a year to understand it.','2026-07-15','Draft','LinkedIn - Psychology'),
(uid,'LinkedIn','Long Video','What Cybersecurity Taught Me About Client Work as a Motion Designer','When you understand how systems fail, you start protecting the ones you build.','2026-08-01','Draft','LinkedIn - Cyber'),
(uid,'LinkedIn','Long Video','How Adding Blender to My After Effects Workflow Changed My Client Results','I resisted 3D for two years. Here''s what changed when I stopped resisting.','2026-08-15','Draft','LinkedIn - AE+Blender'),
(uid,'LinkedIn','Long Video','Building a SaaS Tool as a Motion Designer — What I''ve Learned So Far','When you build the product you''d animate, everything about the work changes.','2026-09-01','Draft','LinkedIn - Dev'),
(uid,'LinkedIn','Long Video','Music Production Made Me a Better Motion Designer. Here''s the Specific Reason.','Pacing, tension, release. These aren''t music concepts — they''re storytelling concepts that music clarified for me.','2026-09-15','Draft','LinkedIn - Music'),
(uid,'LinkedIn','Long Video','The Case for Depth-First Generalism in Creative Careers','Not shallow knowledge of many things. Deep roots in one, genuine explorations in others.','2026-10-01','Draft','LinkedIn - Career'),
(uid,'LinkedIn','Long Video','Cybersecurity for Motion Designers — The Threats Most Creatives Don''t Know About','Your workflow has vulnerabilities. Your clients'' assets have vulnerabilities. Here''s where to start.','2026-10-15','Draft','LinkedIn - Cyber'),
(uid,'LinkedIn','Long Video','Game Dev Logic Is Changing How I Plan Motion Design Projects','State machines, event-driven behavior, and modular thinking aren''t just for games.','2026-11-01','Draft','LinkedIn - Crossover'),
(uid,'LinkedIn','Long Video','2026 Creative Generalist Reflection — Motion Design, Cyber, Dev, Music & What''s Next','A year of aggressive multi-disciplinary learning. Here''s what it actually taught me.','2026-12-15','Draft','LinkedIn - Year Review');

END $$;

-- ─────────────────────────────────────────────────────────────────
-- 5. SAAS PITCH LIBRARY (dm_templates)
-- ─────────────────────────────────────────────────────────────────
DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users ORDER BY created_at LIMIT 1;

INSERT INTO dm_templates (user_id, name, template_type, content, use_case) VALUES

(uid,'SaaS Pitch — Mockup Offer','SaaS Pitch',
'Hey [Name], saw your post about [specific thing they shared]. I make motion videos for SaaS products — launch videos, onboarding animations, explainers.

Put together a rough 20-second concept using [Product Name]''s screenshots. Loom attached — took me about 15 mins. No strings at all, just thought it was worth showing.

Would love your honest reaction on it.',
'Use after watching their content. Works best when you actually made a quick concept.'),

(uid,'SaaS Pitch — Value First','SaaS Pitch',
'Hey [Name], love what you''re building with [Product]. Quick thought — your core workflow ([specific feature]) is genuinely hard to explain in text. A 60-second motion video could make that click instantly for new signups.

I make exactly these kinds of videos for SaaS products. Happy to send 2-3 examples from similar tools if it''s useful timing.',
'Best when you genuinely understand their product and can name a specific feature.'),

(uid,'SaaS Pitch — New Launch','SaaS Pitch',
'Hey [Name], congrats on the launch — [Product] looks sharp.

I specialize in SaaS motion design: launch videos, onboarding animations, explainers. The first 30 days post-launch are when a great video pays for itself multiple times.

Open to a quick chat about what that could look like for [Product]? No pressure either way.',
'Send within 48 hours of a product launch announcement.'),

(uid,'SaaS Pitch — Creative Generalist Angle','SaaS Pitch',
'Hey [Name], I''m a motion designer but I also build in fullstack and have a background in cybersecurity — so I understand SaaS products differently than a typical video freelancer.

For [Product], I''d approach the video from a user-flow perspective, not just visually. That tends to produce animations that actually convert rather than just look nice.

Worth a 15-minute call to see if there''s a fit?',
'Use when targeting technical SaaS founders. The multi-disciplinary angle resonates.'),

(uid,'SaaS Pitch — Psychology Angle','SaaS Pitch',
'Hey [Name], been following [Product] — the core problem you''re solving is one where the average user takes [X time] to understand the value without seeing it in motion.

I make motion videos specifically to close that gap. Most SaaS onboarding drops off in the first 90 seconds — a well-timed animation fixes that.

Happy to talk through what that could look like for your specific use case.',
'Use when you can identify a specific user psychology problem with their product.'),

(uid,'SaaS Pitch — Retainer','SaaS Pitch',
'Hey [Name], I work with a handful of SaaS companies on an ongoing monthly basis — new feature videos, social clips, onboarding updates as the product evolves.

[Product] looks like it''s moving fast. Monthly motion content keeps your marketing and onboarding current without the overhead of one-off project negotiation each time.

Interested in seeing how that structure works?',
'Use after a successful first project or when a company clearly ships frequently.'),

(uid,'SaaS Follow-Up — Day 3','SaaS Pitch',
'Hey [Name], just circling back on the concept I sent over. Happy to tweak the direction if it''s not quite right — or just let me know if the timing''s off.',
'Send exactly 3 days after first outreach with no reply.'),

(uid,'SaaS Follow-Up — Day 7 Value Add','SaaS Pitch',
'Hey [Name], not trying to be annoying — just wanted to send this over since it felt relevant. [Relevant article/observation about their space].

Still happy to chat about motion content for [Product] whenever the timing works.',
'Send day 7. Add a genuine piece of value — article, observation, or insight about their market.'),

(uid,'SaaS Pitch — Referral Intro','SaaS Pitch',
'Hey [Name], [Referrer Name] suggested I reach out — I helped them with [type of video] for [their product] and they thought there might be a good fit with what you''re building.

I make motion videos for SaaS products. Happy to share what I made for [Referrer] if that''s useful context.',
'Use when reaching out via a warm referral. Always name the person who referred you first.'),

(uid,'SaaS Pitch — Reconnect','SaaS Pitch',
'Hey [Name], we connected a while back about [Product]. Looks like you''ve shipped [new thing I noticed] since then — impressive progress.

Timing might be better now for that motion video conversation. Open to revisiting?',
'Use when re-engaging a lead that went cold 30-90 days ago. Reference something specific they shipped.');

-- ─────────────────────────────────────────────────────────────────
-- 6. TWEET LIBRARY (copy-paste ready, stored in dm_templates)
-- ─────────────────────────────────────────────────────────────────
INSERT INTO dm_templates (user_id, name, template_type, content, use_case) VALUES

(uid,'Tweet — AE + Blender Secret Weapon','Tweet Library',
'After Effects is still my main tool. But Blender is becoming my secret weapon for shots that need that extra dimension.

The workflow shift took 2 months.
The visual upgrade was immediate.',
'Motion Design · AE+Blender · Tools'),

(uid,'Tweet — Cyber Changes Creative Work','Tweet Library',
'Learning cybersecurity while doing motion design is making me think differently about client work.

You start seeing vulnerabilities.
In code, in process, in trust.

It changes everything.',
'Cybersecurity · Creative Crossover'),

(uid,'Tweet — Context Switching Psychology','Tweet Library',
'The psychology of context switching between creative and technical work:

Your brain doesn''t actually switch.
It carries residue.

The trick is using that residue intentionally instead of fighting it.',
'Psychology · Productivity · Multi-skill'),

(uid,'Tweet — Game Dev + Motion Design','Tweet Library',
'Game dev logic is quietly improving how I approach animation systems.

State machines.
Event-driven behavior.
Modular design.

Motion design needed these ideas and didn''t know it.',
'Game Dev · Motion Design · Crossover'),

(uid,'Tweet — Music + Animation Pacing','Tweet Library',
'Music production session today directly influenced the pacing of my latest motion piece.

Rhythm isn''t just for audio.',
'Music · Motion Design · Timing'),

(uid,'Tweet — Depth Debt','Tweet Library',
'The hidden cost of learning 6 skills at once isn''t confusion.

It''s depth debt.

You have to circle back and go deeper on each one or they stay surface level forever.

Breadth without depth is just a long list of hobbies.',
'Multi-skill · Psychology · Generalism'),

(uid,'Tweet — Generalist Framing','Tweet Library',
'The generalist vs specialist debate misses the real question:

What''s the depth of your generalism?

Surface-level many things = weak.
Deep roots in one, genuine explorations in others = powerful.

It''s not about how many skills. It''s about how far you went in each.',
'Career · Generalism · Philosophy'),

(uid,'Tweet — Identity Resistance to New Tools','Tweet Library',
'The psychology of why we resist learning new tools:

It''s not laziness.
It''s identity protection.

"I''m not a Blender person" really means "I''m afraid of being bad at something again."

The resistance is the signal. Go toward it.',
'Psychology · Learning · Growth'),

(uid,'Tweet — Building in Public','Tweet Library',
'Building in public forces a kind of psychological honesty that private work never demands.

You can''t bullshit an audience who watches you work.

That accountability is uncomfortable at first.
Then it becomes the point.',
'Building · Accountability · Public'),

(uid,'Tweet — Cross-skill Benefits','Tweet Library',
'Every creative skill I''ve picked up made my motion design better in a non-obvious way.

Cyber → made me precise
Music → made me feel timing differently
Dev → made me think in systems
Game dev → made me plan motion architecturally

Skills compound. They don''t compete.',
'Multi-skill · Growth · Motion Design'),

(uid,'Tweet — Keyframes as Language','Tweet Library',
'Most motion designers use keyframes like notes on a page.

The best ones use keyframes like syllables in speech.

The timing is the language.
The easing is the tone.
The pause is the meaning.',
'Motion Design · Philosophy · Craft'),

(uid,'Tweet — Cyber Defense in Depth for Creatives','Tweet Library',
'Cybersecurity principle that changed how I think about creative work:

Defense in depth.

Don''t rely on one layer of protection.
Not for your files.
Not for your workflow.
Not for your clients.

Layer it. Assume each layer will fail eventually.',
'Cybersecurity · Creative Work · Systems'),

(uid,'Tweet — Motion Design is Temporal','Tweet Library',
'Motion design is the only discipline I know where the output is temporal.

You''re not making a thing.
You''re making an experience that lives in time.

That''s fundamentally different from every other visual art form.',
'Motion Design · Philosophy'),

(uid,'Tweet — 3-Second Hook (Music + Motion)','Tweet Library',
'The crossover between music production and motion design no one talks about:

Both live and die by the 3-second hook.

If you haven''t grabbed them, you''ve already lost them.

Structure follows the hook. Everything else is detail.',
'Music · Motion Design · Hook'),

(uid,'Tweet — AE Null Objects','Tweet Library',
'AE tip: null objects aren''t organizational tools.

They''re control infrastructure.

One null can run an entire scene.
Position, rotation, scale — all parented, all controlled.

Start thinking architecturally.',
'After Effects · Tips · Workflow'),

(uid,'Tweet — Threat Modeling for Focus','Tweet Library',
'Productivity principle borrowed from cybersecurity:

Threat model your time.

What are the realistic attacks on your focus today?
Who/what is most likely to interrupt it?
What''s your mitigation?

Plan around the threat. Don''t wait for it to hit.',
'Productivity · Cybersecurity · Focus'),

(uid,'Tweet — Building a SaaS as Motion Designer','Tweet Library',
'Building a SaaS product as a motion designer is revealing.

You start designing UI you''ll actually animate.
You understand the states.
You know what''s possible.

The feedback loop between creator and builder is something else.',
'Dev · Motion Design · Building'),

(uid,'Tweet — Year-Long Skill Development','Tweet Library',
'The psychology of year-long skill development:

Month 1-3: mostly suffering
Month 4: something clicks
Month 5-6: feel dumb again, but at a higher level

This repeats.
Forever.

The suffering is the signal you''re at the edge of your current level.',
'Psychology · Learning · Growth'),

(uid,'Tweet — Creative Generalist Diary Opener','Tweet Library',
'I''m a motion designer who also does cybersecurity, builds fullstack, makes music, and is learning game dev.

People ask how I manage it.

Honestly: badly at first.
Then with systems.
Then with a kind of flow I didn''t expect.

Building in public from here.',
'Identity · Building in Public · Intro'),

(uid,'Tweet — Motion Design Timing','Tweet Library',
'Motion design timing is the thing tutorials don''t teach well.

You learn keyframes.
You learn eases.
But timing — knowing when something should happen — that only comes from watching a lot of great work slowly.

Watch frame by frame. That''s the school.',
'Motion Design · Craft · Timing'),

(uid,'Tweet — Cyber Asset Protection','Tweet Library',
'Creatives underestimate the value of their digital assets.

Your AE project files.
Your Blender scenes.
Your client source footage.
Your SaaS codebase.

All of it is a target. Most of it is unprotected.

Cybersecurity for creatives isn''t optional anymore.',
'Cybersecurity · Creatives · Assets'),

(uid,'Tweet — Game Dev User States','Tweet Library',
'What game dev taught me about motion design:

Plan for user states.

Your animation doesn''t exist in a vacuum.
It exists at the end of a click, a scroll, a frustration, a celebration.

Design the motion for the moment. Not just the sequence.',
'Game Dev · Motion Design · UX'),

(uid,'Tweet — Blender Geometry Nodes','Tweet Library',
'Blender''s geometry nodes are what expressions are to After Effects.

A way to make the tool think for you once you''ve taught it how.

The syntax is different.
The philosophy is identical.',
'Blender · After Effects · Nodes'),

(uid,'Tweet — Music Session Ritual','Tweet Library',
'I started a ritual: 20 minutes of music production before a long AE session.

What I noticed: my animation timing got sharper.
My sense of rhythm in motion got cleaner.

Skills don''t stay in their lanes once they get deep enough.',
'Music · Motion Design · Ritual · Productivity'),

(uid,'Tweet — Precision as Mindset','Tweet Library',
'Motion design teaches you to care about milliseconds.
Cybersecurity teaches you to care about microseconds.

Both teach you the same deeper thing:

Precision is a mindset, not a setting.

The tools enforce it. The mindset builds it first.',
'Motion Design · Cybersecurity · Mindset');

-- ─────────────────────────────────────────────────────────────────
-- 7. LINKEDIN POST LIBRARY (long-form copy, stored in dm_templates)
-- ─────────────────────────────────────────────────────────────────
INSERT INTO dm_templates (user_id, name, template_type, content, use_case) VALUES

(uid,'LinkedIn — Why I Chose Generalism','LinkedIn Post',
'Most career advice tells you to niche down.

I went the other direction — and here''s what I''ve found after a year of aggressive multi-disciplinary learning.

I''m a motion designer by trade. But over the last 12 months I''ve been going deep into cybersecurity, fullstack development, game dev, and music production — while still running client projects in After Effects and Blender.

The conventional wisdom says this is a mistake. You''re spreading too thin. You''ll be mediocre at everything.

Here''s what actually happened:

My motion design got sharper — because game dev logic changed how I plan animation systems. My client work improved — because cybersecurity changed how I think about protecting and presenting client assets. My timing and emotion in animation deepened — because music production gave me a new language for pacing and tension.

Skills don''t compete when they''re all pointing at the same goal: building better creative work.

What I''ve learned: Generalism is only a weakness when it''s shallow. Depth-first generalism — going genuinely deep in multiple directions — is a different thing entirely.

I''m building in public from here. If you''re on the multi-disciplinary path too, follow along.',
'Use for first LinkedIn post establishing the creative generalist identity.'),

(uid,'LinkedIn — Cyber for Creatives','LinkedIn Post',
'I''m a motion designer who started learning cybersecurity. Here''s what I found that nobody warned me about.

Most creatives are deeply exposed.

Client project files sitting in unencrypted cloud folders.
Source assets shared over email with no version control.
SaaS credentials reused across every tool in the stack.
No incident response plan if something goes wrong.

This isn''t a criticism — it''s just not something the creative industry talks about. We''re trained to care about color accuracy, frame rates, and compression artifacts. Not attack surfaces.

But as someone now building my own SaaS products, working with sensitive client materials, and operating across a fullstack environment — I realized the risk was real.

Here''s what I changed first:

1. Encrypted storage for all client source files
2. Password manager for every creative tool account
3. Two-factor on every client-facing portal
4. Local encrypted backups for every delivered project

If you''re a freelance creative or small studio, your assets are worth protecting. The technical barrier to doing so is lower than you think.

Happy to share the specific tools I use if this is useful — just drop a comment.',
'Use to establish authority at the intersection of creativity and cybersecurity.'),

(uid,'LinkedIn — AE + Blender Workflow','LinkedIn Post',
'I resisted learning Blender for two years.

I told myself After Effects was enough. And for most projects, it is.

But there was always a category of motion work — product visualizations, certain transitions, anything requiring convincing depth — where my AE-only output felt flat. Not technically wrong. Just flat.

So I finally learned Blender. Not as a replacement for AE. As an extension of it.

Here''s the workflow shift that changed my client results:

1. Everything starts in AE as usual — storyboard, timing, 2D animation system
2. Anything that needs genuine 3D (not fake-3D) gets built in Blender
3. I render from Blender with an alpha channel in the exact frame range I need
4. Back into AE for comp, color match, and export

The result: 2D motion design that has tactile, spatial moments at exactly the right beats.

Clients don''t always know why it feels different. But they feel it.

If you''re an AE motion designer who''s been avoiding Blender — start with just the export workflow. You don''t need to become a 3D artist. You just need to know when and how to reach for it.',
'Use when targeting motion designers considering expanding their toolkit.'),

(uid,'LinkedIn — Psychology of Multi-skill Learning','LinkedIn Post',
'The psychology of learning multiple skills simultaneously — what nobody tells you.

Month 1 is exciting.
Month 2 is disorienting.
Month 3 is the danger zone.

The danger zone is when you''re deep enough in each skill to know how much you don''t know — but not deep enough in any of them to feel competent. Everything feels slow. You question the strategy.

Most people quit here.

What I''ve learned from going through this across motion design, cybersecurity, fullstack dev, and music production:

The disorientation is the signal, not the problem.

Your brain is building cross-domain connections that don''t exist yet. The confusion is the architecture being laid. Push through the confusion — don''t pivot away from it.

Two things that helped me:

1. Anchor in the skill you already have. For me, motion design stays the center. Everything else is informed by it and feeds back into it.
2. Document the crossovers. Every time a concept from one discipline clarifies something in another, write it down. Those are the most valuable insights.

The creative generalist path isn''t for everyone. But if you''re someone who genuinely can''t stop learning new things — leaning into it intentionally is a much better strategy than fighting it.',
'Use for a psychology/learning-focused LinkedIn post. High engagement with multi-passionate audience.'),

(uid,'LinkedIn — Building SaaS as Motion Designer','LinkedIn Post',
'What happens when a motion designer tries to build a SaaS product.

I''ve been doing fullstack development on the side for the last year — building a business management tool for my own freelance motion design work.

What I didn''t expect: building the product changed how I animate products for clients.

When you understand how a feature actually works — the state it exists in before a user clicks, the transition it makes, the empty state, the error state — you animate it completely differently.

Instead of guessing what looks cool, you''re designing for real user moments.

The transitions make sense because you know what''s changing in the data.
The loading states feel right because you know how long async actually takes.
The onboarding animations land because you built an onboarding flow yourself and know where users drop off.

I don''t think every motion designer needs to learn to code. But building something — even a small tool — gives you a model of digital products that purely visual work can''t.

It''s made me a better motion designer. And a more useful collaborator for the SaaS founders I work with.',
'Use to position as both a builder and motion designer. Resonates with technical founders.'),

(uid,'LinkedIn — Music and Motion Design','LinkedIn Post',
'Music production made me a better motion designer. Here''s the specific reason.

I started producing music seriously about 8 months ago. Not because I thought it would help my motion work — I just wanted to do it.

Two months in, I noticed something. My animation timing got sharper. My sense of when to hold a still frame and when to move became more intuitive. I started thinking in terms of tension and release, not just keyframes.

Here''s what I think happened:

Music forces you to feel time at a very precise level. Not just duration — the emotional weight of duration. Why a 3-second hold feels like patience in one piece and defeat in another. Why a fast cut can feel exciting or anxious depending on what came before it.

Motion design operates on the exact same principles. But most of us learn it visually, through tutorials and reference. We learn what fast and slow look like. Music teaches you what they feel like.

If you do motion design and you''ve never tried music production — even at a basic level — I think you''d find something useful there.

The tools are different. The underlying grammar is the same.',
'Music + Motion crossover post. Good for differentiation and creative audience engagement.'),

(uid,'LinkedIn — Creative Generalist Career Paths','LinkedIn Post',
'What does a creative generalist actually do for work in 2026?

I get this question a lot. I''m a motion designer who also does cybersecurity work, builds fullstack, makes music, and is learning game dev.

The honest answer: more than I expected when I started.

Here''s what the multi-disciplinary creative path actually looks like in practice:

1. Client work stays specialized. Clients hire you for the skill they need. Mine hire me for motion design. The other skills make the motion design better and the conversations more useful.

2. The crossovers become a differentiator. Being able to talk to a SaaS founder about their technical architecture, then animate their product flow accurately, is a different value proposition than pure motion work.

3. The personal projects start to compound. My SaaS tool, my music, my security side projects — they''re all building assets and knowledge that feed each other.

4. New opportunities emerge at the intersections. Cybersecurity visualization. Animated explainers for developer tools. Motion design for game UI. These didn''t exist as obvious opportunities before the skills overlapped.

The career risk of being a generalist is real — you have to maintain genuine depth in at least one primary discipline. Breadth without a foundation is just scattered hobbies.

But depth-first generalism, where you go genuinely deep in one thing and use it as a lens on everything else — that''s a career path that compounds in unexpected ways.',
'Career positioning post. Good for LinkedIn audience navigating multi-disciplinary career questions.');

END $$;
