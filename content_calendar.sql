-- Content Calendar: June 18 2026 → Jan 1 2027
-- Motion Designer | AE · DaVinci Resolve · Blender | SaaS Client Acquisition
-- Run in Supabase SQL Editor

DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users ORDER BY created_at LIMIT 1;

INSERT INTO content_posts (user_id, platform, content_type, title, hook, scheduled_date, status, notes) VALUES

-- ── JUNE 2026 ─────────────────────────────────────────────────
(uid,'X','Value/Tips','3 AE expressions that replace 80% of your keyframing','Stop keyframing everything — these 3 lines of code do it better','2026-06-22','Scheduled','AE'),
(uid,'YouTube','Long Video','After Effects Expressions Masterclass for Motion Designers','You don''t need to code to use expressions — here''s proof','2026-06-23','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','The exact DM I sent to land a $1,500 SaaS explainer','People ask what I say in cold DMs — here it is, unedited','2026-06-24','Scheduled','Business'),
(uid,'X','Question','What''s your #1 struggle getting motion design clients?','I''m building something to help — drop your answer below','2026-06-25','Scheduled','Engagement'),
(uid,'YouTube','Short','wiggle() expression explained in 60 seconds','One expression, infinite motion — this is wiggle()','2026-06-26','Scheduled','AE Short'),
(uid,'X','Showcase','Just finished this SaaS launch video — breakdown in replies','60 seconds. 3 days. Here''s the full process','2026-06-27','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How to price motion design when you''re just starting out','I undercharged for 6 months — here''s the lesson','2026-06-28','Scheduled','Business'),

(uid,'X','Value/Tips','How to find SaaS companies that need motion designers right now','They''re on X every day — here''s exactly how to find them','2026-06-29','Scheduled','Leads'),
(uid,'YouTube','Long Video','DaVinci Resolve for Motion Designers — Full Workflow Guide','AE user switching to Resolve? This video is for you','2026-06-30','Scheduled','Resolve Tutorial'),
(uid,'X','Behind-Scenes','My entire client onboarding process — nothing held back','From DM to first payment in under a week','2026-07-01','Scheduled','Business'),
(uid,'X','Poll','Which tool do you use most for motion graphics?','After Effects vs DaVinci Resolve vs Blender — vote','2026-07-02','Scheduled','Engagement'),
(uid,'YouTube','Short','Color grade a SaaS demo in DaVinci Resolve (under 2 min)','Resolve''s color tools make every SaaS video look premium','2026-07-03','Scheduled','Resolve Short'),
(uid,'X','Showcase','Blender → After Effects pipeline for this product animation','3D + 2D motion — here''s how I do it without losing my mind','2026-07-04','Scheduled','Blender'),
(uid,'X','Value/Tips','Why your portfolio isn''t landing clients (and what to fix)','It''s not your skills — it''s how you''re presenting them','2026-07-05','Scheduled','Business'),

-- ── JULY 2026 ─────────────────────────────────────────────────
(uid,'X','Value/Tips','The "before and after" post that got me 3 DM inquiries in one day','Show the transformation, not just the final result','2026-07-06','Scheduled','Content Strategy'),
(uid,'YouTube','Long Video','Blender for Motion Designers — No 3D Background Required','You don''t need to model — here''s what actually matters for MoGraph','2026-07-07','Scheduled','Blender Tutorial'),
(uid,'X','Behind-Scenes','How I set up my AE project for every single client job','Same folder structure every time = zero confusion at 2am','2026-07-08','Scheduled','Workflow'),
(uid,'X','Value/Tips','5 types of SaaS videos you can offer as a motion designer','Each has a different price point — here''s the breakdown','2026-07-09','Scheduled','Business'),
(uid,'YouTube','Short','Blender Geometry Nodes for motion graphics in 90 seconds','This changed how I approach motion in Blender completely','2026-07-10','Scheduled','Blender Short'),
(uid,'X','Question','What would you pay for a 60-second SaaS explainer video?','Calibrating pricing — genuine question','2026-07-11','Scheduled','Engagement'),
(uid,'X','Showcase','Blender render → AE comp — full thread breakdown','Every step, setting, and export format','2026-07-12','Scheduled','Blender+AE'),

(uid,'X','Value/Tips','How to write a cold DM that doesn''t sound like a cold DM','1 observation + 1 value + 1 ask — the framework','2026-07-13','Scheduled','Outreach'),
(uid,'YouTube','Long Video','Motion Design Business: How to Get Your First $1,000 Client on X','No portfolio? No problem. The exact playbook','2026-07-14','Scheduled','Business'),
(uid,'X','Behind-Scenes','Breaking down my highest-converting portfolio piece','This one video got me 4 paid projects — here''s why','2026-07-15','Scheduled','Portfolio'),
(uid,'X','Value/Tips','After Effects project organization that actually scales','My revision count dropped by half when I did this','2026-07-16','Scheduled','AE Workflow'),
(uid,'YouTube','Short','Shape layer morph animation in After Effects — 5 minute technique','Smooth, satisfying, and endlessly reusable','2026-07-17','Scheduled','AE Short'),
(uid,'X','Repurposed','Thread: Everything I know about getting motion clients from X','Compiled my best business posts into one thread','2026-07-18','Scheduled','Thread'),
(uid,'X','Value/Tips','The $0 marketing strategy I use to generate inbound leads','It''s called content — here''s how to make it work harder','2026-07-19','Scheduled','Marketing'),

(uid,'X','Value/Tips','AE null objects — control your entire scene with one layer','One null = full scene control. Here''s the setup','2026-07-20','Scheduled','AE'),
(uid,'YouTube','Long Video','After Effects Shape Animations — From Zero to Advanced','Shapes are the heart of motion design — master them here','2026-07-21','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','Watch me build a logo reveal in AE with zero plugins','Pure AE, pure technique','2026-07-22','Scheduled','AE'),
(uid,'X','Question','If you could only use one tool for motion design, what would it be?','AE, Resolve, or Blender — and why?','2026-07-23','Scheduled','Engagement'),
(uid,'YouTube','Short','Loop expression in After Effects — set it and forget it','Every motion designer needs this in their muscle memory','2026-07-24','Scheduled','AE Short'),
(uid,'X','Showcase','New SaaS onboarding animation — process breakdown','6 scenes. 45 seconds. 3 revisions. Full story','2026-07-25','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How to handle revision requests without losing your margin','Set expectations in the proposal — here''s my exact wording','2026-07-26','Scheduled','Business'),

(uid,'X','Value/Tips','DaVinci Resolve Fusion vs After Effects — honest MoGraph comparison','I use both. Here''s when I reach for each one','2026-07-27','Scheduled','Tools'),
(uid,'YouTube','Long Video','DaVinci Resolve Fusion for Motion Designers — Practical Guide','Fusion is powerful and free — here''s what you need','2026-07-28','Scheduled','Resolve Tutorial'),
(uid,'X','Behind-Scenes','How I delivered a project 2 days early and turned it into a referral','Speed + quality = repeat clients','2026-07-29','Scheduled','Business'),
(uid,'X','Value/Tips','3 red flags in a client brief that predict a nightmare project','I learned these the hard way so you don''t have to','2026-07-30','Scheduled','Business'),
(uid,'YouTube','Short','DaVinci Resolve Smart Bins — speed up your edit in 2 minutes','If you''re not using Smart Bins you''re wasting time','2026-07-31','Scheduled','Resolve Short'),
(uid,'X','Poll','How long does your typical SaaS explainer take to produce?','1-2 days / 3-5 days / 1-2 weeks / 2+ weeks','2026-08-01','Scheduled','Engagement'),
(uid,'X','Value/Tips','What separates $500 motion designers from $2,000 ones','It''s not the software. It''s not even the skills.','2026-08-02','Scheduled','Mindset'),

-- ── AUGUST 2026 ───────────────────────────────────────────────
(uid,'X','Value/Tips','How to use X to build a pipeline of warm motion design leads','Engage before you pitch — the exact method','2026-08-03','Scheduled','Outreach'),
(uid,'YouTube','Long Video','Building a Motion Design Portfolio That Gets You Hired','The wrong portfolio is worse than no portfolio','2026-08-04','Scheduled','Business'),
(uid,'X','Behind-Scenes','My discovery call script — word for word','This is what I say to convert inquiries into projects','2026-08-05','Scheduled','Sales'),
(uid,'X','Value/Tips','Kinetic typography in After Effects — the technique most skip','It''s about timing, not just type','2026-08-06','Scheduled','AE'),
(uid,'YouTube','Short','Blender EEVEE vs Cycles for motion design — which renders faster?','For MoGraph work, the answer might surprise you','2026-08-07','Scheduled','Blender Short'),
(uid,'X','Showcase','Product teaser using only Blender + AE — full process thread','Blender for 3D, AE for everything else','2026-08-08','Scheduled','Portfolio'),
(uid,'X','Value/Tips','Why I stopped doing free test projects (and what I do instead)','Your time has value from day one','2026-08-09','Scheduled','Business'),

(uid,'X','Value/Tips','The AE render settings I use for every single client delivery','Resolution, codec, color space — my exact setup','2026-08-10','Scheduled','AE Workflow'),
(uid,'YouTube','Long Video','After Effects Camera Animation — Cinematic Motion for MoGraph','Make your 2D animations feel three-dimensional','2026-08-11','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','How I research a SaaS product before opening After Effects','5 things I look for before I animate anything','2026-08-12','Scheduled','Workflow'),
(uid,'X','Question','What''s your go-to AE plugin — and could you survive without it?','Testing how dependent we actually are on plugins','2026-08-13','Scheduled','Engagement'),
(uid,'YouTube','Short','AE motion blur — the settings that actually look real','The default settings are lying to you','2026-08-14','Scheduled','AE Short'),
(uid,'X','Repurposed','Thread: My complete AE workflow from blank comp to client delivery','Everything in one place — bookmark this','2026-08-15','Scheduled','Thread'),
(uid,'X','Value/Tips','How to write a proposal that closes without a call','One page. Clear scope. No fluff. Here''s the template','2026-08-16','Scheduled','Sales'),

(uid,'X','Value/Tips','3 Blender techniques that make motion design look expensive','You don''t need C4D — Blender does this too','2026-08-17','Scheduled','Blender'),
(uid,'YouTube','Long Video','Blender to After Effects — Complete Compositing Workflow','Move between 3D and 2D without friction','2026-08-18','Scheduled','Blender+AE Tutorial'),
(uid,'X','Behind-Scenes','Time-lapse: building a full SaaS explainer in 3 days','Every phase from brief to delivery','2026-08-19','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How I use X to warm up leads before sending a DM','Like, reply, then pitch — the sequence matters','2026-08-20','Scheduled','Outreach'),
(uid,'YouTube','Short','Blender Geometry Nodes — grid animation in 3 minutes','Procedural motion at its most satisfying','2026-08-21','Scheduled','Blender Short'),
(uid,'X','Poll','What''s your biggest bottleneck in motion design projects?','Scripting / Design / Animation / Revisions — vote','2026-08-22','Scheduled','Engagement'),
(uid,'X','Value/Tips','Motion design rates in 2026 — what the market actually pays','Based on my experience and what others have shared','2026-08-23','Scheduled','Business'),

(uid,'X','Value/Tips','How to batch create motion graphics with AE expressions','One template, infinite variations — here''s the system','2026-08-24','Scheduled','AE'),
(uid,'YouTube','Long Video','Freelance Motion Design Income Breakdown — How I Hit $3k/Month','Transparent numbers, real strategy','2026-08-25','Scheduled','Business'),
(uid,'X','Behind-Scenes','The brief that changed how I scope every project forever','One bad brief cost me 40 hours — never again','2026-08-26','Scheduled','Business'),
(uid,'X','Value/Tips','AE Essential Graphics panel — build reusable templates for clients','This is how you scale without working more hours','2026-08-27','Scheduled','AE'),
(uid,'YouTube','Short','AE stagger animation with one expression','Animate 100 layers with 3 words','2026-08-28','Scheduled','AE Short'),
(uid,'X','Showcase','Redesigned an old SaaS explainer — before and after thread','Same product, completely different energy','2026-08-29','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How to get motion clients without a huge following','Audience size matters less than you think','2026-08-30','Scheduled','Growth'),

-- ── SEPTEMBER 2026 ────────────────────────────────────────────
(uid,'X','Value/Tips','The discovery call mistake that costs most motion designers the job','Don''t pitch in the first call — do this instead','2026-08-31','Scheduled','Sales'),
(uid,'YouTube','Long Video','After Effects Liquid Animation — Professional Techniques','Fluid, organic motion that clients love','2026-09-01','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','I redesigned my portfolio from scratch — here''s what changed','3 case studies, clean layout, clear CTA','2026-09-02','Scheduled','Portfolio'),
(uid,'X','Value/Tips','DaVinci Resolve color grading for motion graphics (not film)','Most Resolve tutorials ignore MoGraph — this one doesn''t','2026-09-03','Scheduled','Resolve'),
(uid,'YouTube','Short','Liquid motion in AE — no plugins needed','Pure shape layers, pure technique','2026-09-04','Scheduled','AE Short'),
(uid,'X','Question','Do you niche down as a motion designer or stay a generalist?','This debate never gets old','2026-09-05','Scheduled','Engagement'),
(uid,'X','Value/Tips','5 questions to ask before accepting any motion design project','Most problems are visible in the brief — if you know where to look','2026-09-06','Scheduled','Business'),

(uid,'X','Value/Tips','How to position yourself as a SaaS motion designer specifically','Niche positioning gets you better clients and rates','2026-09-07','Scheduled','Positioning'),
(uid,'YouTube','Long Video','DaVinci Resolve Editing Workflow for Motion Designers','Cut, color, and deliver without leaving Resolve','2026-09-08','Scheduled','Resolve Tutorial'),
(uid,'X','Behind-Scenes','My client communication workflow — every tool I use','Loom + Notion + one rule that prevents 90% of misunderstandings','2026-09-09','Scheduled','Workflow'),
(uid,'X','Value/Tips','AE render farm on a budget — faster exports without a Mac Pro','Here''s what I actually use','2026-09-10','Scheduled','AE Performance'),
(uid,'YouTube','Short','DaVinci Resolve: Cut page vs Edit page — which is faster?','One of these saves 30 minutes per project','2026-09-11','Scheduled','Resolve Short'),
(uid,'X','Showcase','SaaS app walkthrough animation — concept to delivery in 5 days','The full project breakdown','2026-09-12','Scheduled','Portfolio'),
(uid,'X','Value/Tips','Building recurring income as a motion designer (retainer model)','Monthly retainers changed my business — here''s how to pitch one','2026-09-13','Scheduled','Business'),

(uid,'X','Value/Tips','Blender shader nodes for motion graphics — what you actually need','90% of what matters fits in one node tree','2026-09-14','Scheduled','Blender'),
(uid,'YouTube','Long Video','Blender Geometry Nodes for Motion Design — Visual Tutorial','No coding, pure nodes, infinite motion possibilities','2026-09-15','Scheduled','Blender Tutorial'),
(uid,'X','Behind-Scenes','My exact Blender scene setup for product animations','Lighting, camera, render — the settings I never change','2026-09-16','Scheduled','Blender'),
(uid,'X','Value/Tips','How to upsell motion packages without being pushy','Every project has adjacent work — here''s how to offer it','2026-09-17','Scheduled','Sales'),
(uid,'YouTube','Short','Blender to AE export settings — zero headaches workflow','One workflow. Every time.','2026-09-18','Scheduled','Blender Short'),
(uid,'X','Poll','What makes a motion design portfolio stand out to you?','Case studies / Variety / Technical quality / Specialization','2026-09-19','Scheduled','Engagement'),
(uid,'X','Value/Tips','The X content strategy that gets motion designers discovered by clients','Post this, not that — what actually works in 2026','2026-09-20','Scheduled','Content Strategy'),

(uid,'X','Value/Tips','How to write a SaaS demo video script that actually converts','The structure that works for every SaaS product','2026-09-21','Scheduled','Business'),
(uid,'YouTube','Long Video','After Effects Kinetic Typography — Advanced Techniques','Text that moves like it means something','2026-09-22','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','A client gave me full creative control — here''s what I made','And the feedback I got from it','2026-09-23','Scheduled','Portfolio'),
(uid,'X','Value/Tips','AE motion sketch — the most underrated animation tool in the panel','Capture organic movement in real time','2026-09-24','Scheduled','AE'),
(uid,'YouTube','Short','Kinetic type in AE — smooth word reveal technique','Clean, readable, and endlessly adaptable','2026-09-25','Scheduled','AE Short'),
(uid,'X','Repurposed','Thread: Every Blender tip I''ve shared this year — full archive','Geometry Nodes, EEVEE, Blender→AE — all in one place','2026-09-26','Scheduled','Thread'),
(uid,'X','Value/Tips','How I handle clients who ghost after delivery','It happens. Here''s how to prevent it and respond to it','2026-09-27','Scheduled','Business'),

-- ── OCTOBER 2026 ──────────────────────────────────────────────
(uid,'X','Value/Tips','The motion design "starter project" that builds your portfolio fast','Short, repeatable, and gets you paid','2026-09-28','Scheduled','Business'),
(uid,'YouTube','Long Video','After Effects vs Blender — Which Should Motion Designers Learn First?','Honest comparison from someone who uses both daily','2026-09-29','Scheduled','Tools'),
(uid,'X','Behind-Scenes','My full month in motion design — what I made, what I earned','Transparent numbers, honest reflection','2026-09-30','Scheduled','Business'),
(uid,'X','Value/Tips','How to analyze a SaaS product and write your own motion brief','Great animation starts with understanding the software','2026-10-01','Scheduled','Workflow'),
(uid,'YouTube','Short','AE: Parent vs expression link — when to use each one','Both are powerful — here''s the decision','2026-10-02','Scheduled','AE Short'),
(uid,'X','Showcase','Monthly output — every motion piece I made in September','9 videos. Here''s what I learned from all of them','2026-10-03','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How to raise your motion design rates without losing clients','The conversation most freelancers are terrified to have','2026-10-04','Scheduled','Business'),

(uid,'X','Value/Tips','Why "I''ll do it cheap to build my portfolio" is keeping you broke','The real math behind undercharging','2026-10-05','Scheduled','Mindset'),
(uid,'YouTube','Long Video','DaVinci Resolve Fusion Nodes — Motion Graphics Deep Dive','Fusion is a full compositor — here''s how to use it that way','2026-10-06','Scheduled','Resolve Tutorial'),
(uid,'X','Behind-Scenes','How I structure a 60-second explainer from script to export','Every decision I make and why','2026-10-07','Scheduled','Workflow'),
(uid,'X','Value/Tips','AE expressions: link color controls across multiple layers','One color controller for your whole scene','2026-10-08','Scheduled','AE'),
(uid,'YouTube','Short','DaVinci Resolve node-based color grading explained simply','If you''re new to nodes, start here','2026-10-09','Scheduled','Resolve Short'),
(uid,'X','Question','How many motion design clients are you working with right now?','1 / 2-3 / 4-5 / 0 (actively looking)','2026-10-10','Scheduled','Engagement'),
(uid,'X','Value/Tips','Turn one YouTube tutorial into 5 X posts — content repurposing','For motion designers who hate content creation','2026-10-11','Scheduled','Content Strategy'),

(uid,'X','Value/Tips','AE graph editor — the skill that separates good from great animation','Most people avoid it. That''s exactly why you should learn it','2026-10-12','Scheduled','AE'),
(uid,'YouTube','Long Video','After Effects Graph Editor Masterclass — Smooth Motion Every Time','The graph editor is not scary — it''s your secret weapon','2026-10-13','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','My creative process when I have zero inspiration','The system I use to go from blank to animated','2026-10-14','Scheduled','Workflow'),
(uid,'X','Value/Tips','Blender motion tracking — attach 2D elements to real footage','Practical uses for MoGraph work','2026-10-15','Scheduled','Blender'),
(uid,'YouTube','Short','AE graph editor: fix bouncy animation in 2 minutes','Smooth vs mechanical motion — the graph editor decides','2026-10-16','Scheduled','AE Short'),
(uid,'X','Showcase','Before vs after: how 3 rounds of client feedback improved this video','Revisions done right actually make the work better','2026-10-17','Scheduled','Portfolio'),
(uid,'X','Value/Tips','Getting motion design clients through referrals — the system','Your best clients come from your current clients','2026-10-18','Scheduled','Business'),

(uid,'X','Value/Tips','How to use AE templates without looking like you used a template','Customization is the real skill','2026-10-19','Scheduled','AE'),
(uid,'YouTube','Long Video','Making Money with Motion Design on YouTube — My Strategy','How I use YouTube to generate client leads, not just views','2026-10-20','Scheduled','Business'),
(uid,'X','Behind-Scenes','Real client feedback I received — and how I responded','Constructive criticism is a gift when you use it right','2026-10-21','Scheduled','Business'),
(uid,'X','Value/Tips','DaVinci Resolve speed ramping — the technique every editor needs','Match the energy of the footage, not just the beat','2026-10-22','Scheduled','Resolve'),
(uid,'YouTube','Short','DaVinci Resolve speed ramp — smooth slow motion in 90 seconds','The technique that makes action edits feel cinematic','2026-10-23','Scheduled','Resolve Short'),
(uid,'X','Poll','What content do you want more of on this channel?','AE tutorials / Blender / Business / Resolve — tell me','2026-10-24','Scheduled','Engagement'),
(uid,'X','Value/Tips','The 3-video portfolio rule — why quantity kills your conversion rate','Less is more when showcasing motion work','2026-10-25','Scheduled','Portfolio'),

-- ── NOVEMBER 2026 ─────────────────────────────────────────────
(uid,'X','Value/Tips','AE precomps — when to use them and when to avoid them','Precomps are powerful and dangerous — here''s the line','2026-10-26','Scheduled','AE'),
(uid,'YouTube','Long Video','Blender 3D Motion Design — Product Visualization Tutorial','Create a portfolio-ready product viz entirely in Blender','2026-10-27','Scheduled','Blender Tutorial'),
(uid,'X','Behind-Scenes','How I prepare for a client presentation — my exact checklist','First impressions on deliveries matter more than you think','2026-10-28','Scheduled','Business'),
(uid,'X','Value/Tips','Why motion designers should niche into SaaS specifically','Higher budgets, faster decisions, recurring work','2026-10-29','Scheduled','Positioning'),
(uid,'YouTube','Short','Blender product render — studio lighting in under 2 minutes','Make products look premium without a studio','2026-10-30','Scheduled','Blender Short'),
(uid,'X','Question','What was the hardest part of your first paid motion design project?','Mine was scoping. What was yours?','2026-10-31','Scheduled','Engagement'),
(uid,'X','Value/Tips','How to land your first SaaS client with zero case studies','Proof of skills beats proof of clients — here''s how','2026-11-01','Scheduled','Business'),

(uid,'X','Value/Tips','AE tip: use markers to plan your animation before you animate','30 minutes of planning saves 3 hours of rework','2026-11-02','Scheduled','AE Workflow'),
(uid,'YouTube','Long Video','After Effects for Beginners in 2026 — Complete Starter Guide','Everything you actually need to start making motion graphics','2026-11-03','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','I audited my best performing X content — here''s what I found','Not what I expected to learn about what works','2026-11-04','Scheduled','Content Strategy'),
(uid,'X','Value/Tips','How to write a motion design case study that gets clients','Show your thinking, not just your output','2026-11-05','Scheduled','Portfolio'),
(uid,'YouTube','Short','AE beginner tip: how to use the align panel properly','The most misunderstood panel in After Effects','2026-11-06','Scheduled','AE Short'),
(uid,'X','Showcase','6-month portfolio review — my best 5 pieces and what I''d change','Honest self-critique is how you grow','2026-11-07','Scheduled','Portfolio'),
(uid,'X','Value/Tips','Blender + DaVinci Resolve: the pipeline most motion designers miss','Render in Blender, finish in Resolve — here''s why','2026-11-08','Scheduled','Workflow'),

(uid,'X','Value/Tips','How to handle a client who wants changes after final approval','Common situation — here''s how to navigate it professionally','2026-11-09','Scheduled','Business'),
(uid,'YouTube','Long Video','DaVinci Resolve Color Science for Motion Designers','Color space, gamma, and why your exports look different on every screen','2026-11-10','Scheduled','Resolve Tutorial'),
(uid,'X','Behind-Scenes','My process for making a SaaS demo video — step by step','From nothing to a client-ready 90-second animation','2026-11-11','Scheduled','Workflow'),
(uid,'X','Value/Tips','After Effects RAM preview optimization — stop waiting for previews','These settings cut my preview time in half','2026-11-12','Scheduled','AE Performance'),
(uid,'YouTube','Short','DaVinci Resolve color space transform — explained in 2 minutes','This is why your colors look wrong on export','2026-11-13','Scheduled','Resolve Short'),
(uid,'X','Repurposed','Thread: The complete motion design business playbook','Every lesson from 1 year of freelancing — condensed','2026-11-14','Scheduled','Thread'),
(uid,'X','Value/Tips','The DM follow-up sequence that gets ghosted clients to respond','Timing and tone both matter more than the message','2026-11-15','Scheduled','Outreach'),

(uid,'X','Value/Tips','AE expressions: random() vs wiggle() — which to use when','Two tools, different jobs — the breakdown','2026-11-16','Scheduled','AE'),
(uid,'YouTube','Long Video','Blender Eevee for Fast Motion Design Renders — Full Workflow','Real-time rendering for motion graphics — the workflow','2026-11-17','Scheduled','Blender Tutorial'),
(uid,'X','Behind-Scenes','I pitched 20 SaaS companies in one week — here''s what happened','Full results: opens, replies, calls, projects booked','2026-11-18','Scheduled','Outreach'),
(uid,'X','Value/Tips','How to create a motion design reel that gets responses','Reel structure, music, pacing — the details that close deals','2026-11-19','Scheduled','Portfolio'),
(uid,'YouTube','Short','Blender EEVEE render settings for motion graphics','Fast, beautiful renders without Cycles wait times','2026-11-20','Scheduled','Blender Short'),
(uid,'X','Poll','How do you mainly get new motion design clients?','Inbound content / Outreach DMs / Referrals / Platforms','2026-11-21','Scheduled','Engagement'),
(uid,'X','Value/Tips','How to productize your motion design service','Packages beat hourly — here''s how to build them','2026-11-22','Scheduled','Business'),

(uid,'X','Value/Tips','What I''m grateful for as a freelance motion designer in 2026','The year in review — early edition','2026-11-23','Scheduled','Personal'),
(uid,'YouTube','Long Video','After Effects Workflow for Speed — Professional Shortcuts & Habits','Cut your production time in half with these AE habits','2026-11-24','Scheduled','AE Tutorial'),
(uid,'X','Behind-Scenes','The project that nearly broke me (and what I learned from it)','Sometimes the hardest projects teach you the most','2026-11-25','Scheduled','Story'),
(uid,'X','Value/Tips','Year-end: what actually moved my motion business forward','Actions with real ROI vs the ones that just felt productive','2026-11-26','Scheduled','Business'),
(uid,'YouTube','Short','AE shortcuts — the 10 I use on every single project','After Effects becomes a different tool when you know these','2026-11-27','Scheduled','AE Short'),
(uid,'X','Question','What''s the one motion design skill you want to improve in 2027?','Asking for content planning — genuinely curious','2026-11-28','Scheduled','Engagement'),
(uid,'X','Value/Tips','How to close out client projects cleanly and get the testimonial','The offboarding process that builds your reputation','2026-11-29','Scheduled','Business'),

-- ── DECEMBER 2026 ─────────────────────────────────────────────
(uid,'X','Value/Tips','My 2026 content year in review — what worked, what didn''t','Honest audit of every content type I tried','2026-11-30','Scheduled','Content Strategy'),
(uid,'YouTube','Long Video','Motion Design in 2027 — Trends and How to Prepare','Tools, client demand, and positioning for the next year','2026-12-01','Scheduled','Business'),
(uid,'X','Behind-Scenes','How I plan my content calendar for a whole quarter in one sitting','The system that keeps me consistent without burnout','2026-12-02','Scheduled','Content Strategy'),
(uid,'X','Value/Tips','AE 3D camera expressions — make anything feel spatial','Depth and parallax without a 3D layer in sight','2026-12-03','Scheduled','AE'),
(uid,'YouTube','Short','AE 3D camera — add depth to flat motion in 90 seconds','This one technique makes flat design feel alive','2026-12-04','Scheduled','AE Short'),
(uid,'X','Showcase','Final project of 2026 — my favorite piece I made this year','One video. All the techniques. Full breakdown','2026-12-05','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How to set up your motion design business for Q1 2027','The year-end setup that makes January actually profitable','2026-12-06','Scheduled','Business'),

(uid,'X','Value/Tips','Blender animation principles — the 12 principles applied to 3D','Old rules, new tool — still completely relevant','2026-12-07','Scheduled','Blender'),
(uid,'YouTube','Long Video','After Effects + Blender 3D Integration — Full Production Tutorial','Two tools, one seamless workflow, pro results','2026-12-08','Scheduled','AE+Blender Tutorial'),
(uid,'X','Behind-Scenes','My studio setup heading into 2027 — full breakdown','PC specs, software, peripherals — everything I use','2026-12-09','Scheduled','Setup'),
(uid,'X','Value/Tips','How to package and price a motion retainer for SaaS clients','The offer structure that converts cold leads to monthly income','2026-12-10','Scheduled','Business'),
(uid,'YouTube','Short','Blender particle animation for motion design — 90 second guide','Procedural particles that look custom-made','2026-12-11','Scheduled','Blender Short'),
(uid,'X','Repurposed','Thread: Every AE expression post from this year — your full reference','wiggle, loop, random, valueAtTime — all in one place','2026-12-12','Scheduled','Thread'),
(uid,'X','Value/Tips','Why January is the best month to land new SaaS clients','New budgets, new goals — be in front of them now','2026-12-13','Scheduled','Business'),

(uid,'X','Value/Tips','My exact DM outreach plan for January 2027','Starting the new year with a full pipeline','2026-12-14','Scheduled','Outreach'),
(uid,'YouTube','Long Video','DaVinci Resolve Fairlight Audio for Motion Designers','Good sound design makes your motion feel premium','2026-12-15','Scheduled','Resolve Tutorial'),
(uid,'X','Behind-Scenes','Year-end income report — my honest motion design revenue for 2026','Real numbers, real lessons','2026-12-16','Scheduled','Business'),
(uid,'X','Value/Tips','How to optimize your X profile to attract SaaS clients passively','Your bio is a landing page — here''s how to write it','2026-12-17','Scheduled','Growth'),
(uid,'YouTube','Short','Fairlight in DaVinci Resolve — clean audio mix in 2 minutes','Professional sound for motion projects — no DAW needed','2026-12-18','Scheduled','Resolve Short'),
(uid,'X','Question','Looking back at 2026 — what was your biggest win as a motion designer?','Celebrating before we close the year out','2026-12-19','Scheduled','Engagement'),
(uid,'X','Value/Tips','The 5 AE templates I''ll use on every project in 2027','Build once, use forever — start here','2026-12-20','Scheduled','AE Workflow'),

(uid,'X','Value/Tips','Year-end tool review — AE, Resolve, and Blender in 2026','What changed, what improved, what I wish was better','2026-12-21','Scheduled','Tools'),
(uid,'YouTube','Long Video','2026 Motion Design Year in Review — Lessons, Income, and What''s Next','The most transparent video I''ve made','2026-12-22','Scheduled','Business'),
(uid,'X','Behind-Scenes','My first post vs my latest — the difference one year makes','Growth is slow until it isn''t','2026-12-23','Scheduled','Story'),
(uid,'X','Value/Tips','Set your motion design rates for 2027 — the framework','Annual rate review is not optional if you want to grow','2026-12-24','Scheduled','Business'),
(uid,'YouTube','Short','My favorite AE technique of 2026 — quick breakdown','The one thing I kept coming back to all year','2026-12-26','Scheduled','AE Short'),
(uid,'X','Showcase','2026 showreel — every client project I made this year','The highlight reel of a year of motion work','2026-12-27','Scheduled','Portfolio'),
(uid,'X','Value/Tips','How to prepare your motion offer for the January surge','SaaS companies hit January with fresh budgets — be ready','2026-12-28','Scheduled','Business'),

(uid,'X','Value/Tips','What I''m doing differently in 2027 as a motion designer','Specific changes to tools, pricing, and client acquisition','2026-12-29','Scheduled','Business'),
(uid,'YouTube','Long Video','Motion Design Goals for 2027 — My Full Plan','Revenue targets, content strategy, tool investments','2026-12-30','Scheduled','Business'),
(uid,'X','Behind-Scenes','New Year''s Eve — reflecting on building a motion business from zero','One year ago I had no clients. Here''s the story.','2026-12-31','Scheduled','Story');

END $$;
