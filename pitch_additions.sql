-- ═══════════════════════════════════════════════════════════════
-- PITCH LIBRARY ADDITIONS — Agency, SaaS Founder, Creator
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Expand dm_templates constraint to include Agency + Creator Outreach
ALTER TABLE dm_templates DROP CONSTRAINT IF EXISTS dm_templates_template_type_check;
ALTER TABLE dm_templates ADD CONSTRAINT dm_templates_template_type_check
  CHECK (template_type IN (
    'Initial Outreach','Mockup Offer','Value-First','Follow-Up','Meeting Request',
    'SaaS Pitch','Tweet Library','LinkedIn Post','Agency Outreach','Creator Outreach'
  ));

DO $$
DECLARE uid uuid;
BEGIN
  SELECT id INTO uid FROM auth.users ORDER BY created_at LIMIT 1;

INSERT INTO dm_templates (user_id, name, template_type, content, use_case) VALUES

-- ─── AGENCY OUTREACH ────────────────────────────────────────────
(uid,'Agency Outreach — Subcontractor Pitch','Agency Outreach',
'Hey [Name],

Came across your work for [client/project].

I''m a motion designer focused on product animation, explainer visuals, and ad creatives.

If your team ever needs overflow support, white-label production, or someone to jump into a project quickly, I''d love to help.

Portfolio:
[link]

Happy to send a few relevant examples if useful.',
'HIGHEST PRIORITY. Agencies already sell motion — you become extra capacity. No begging, no pressure. Sound like a subcontractor, not a desperate freelancer.'),

-- ─── SAAS FOUNDER OUTREACH ──────────────────────────────────────
(uid,'SaaS Founder — Pitch Conversion (Not Motion)','SaaS Pitch',
'Hey [Name],

I''ve been looking through [Company].

One thing I noticed is that some of the product messaging could probably be explained much faster with motion.

A lot of SaaS companies are using short product animations for landing pages, launches, onboarding flows, and social content because users understand the product much faster.

Not pitching anything massive.

I put together a few ideas after looking through your site and can share them if useful.

Either way, love what you''re building.',
'Don''t pitch motion — pitch conversions. No mention of price. No portfolio immediately. Goal is conversation only.'),

-- ─── CREATOR BUSINESS OUTREACH ──────────────────────────────────
(uid,'Creator Business Outreach','Creator Outreach',
'Hey [Name],

I''ve been following your content around [topic].

One thing I noticed is that a lot of your clips already perform well, but there may be opportunities to make key ideas more visually memorable through motion graphics and animated breakdowns.

I work with creators and brands to turn complex ideas into highly engaging visual content.

If you''re experimenting with launches, products, or premium content this quarter, I''d be happy to share a few ideas.

Portfolio:
[link]',
'Target revenue creators (courses, communities, coaching, newsletters). Not small creators.'),

-- ─── FOLLOW-UP SEQUENCE ─────────────────────────────────────────
(uid,'Follow-Up #1 — Day 3 Bump','Follow-Up',
'Hey [Name],

Just wanted to bump this in case it got buried.

Happy to send a few ideas specific to [company/project] if helpful.',
'Send exactly 3 days after no reply. Short and non-pushy. Most money is in follow-ups, not first messages.'),

(uid,'Follow-Up #2 — Day 7 Observation','Follow-Up',
'Quick thought after revisiting your site.

The [specific page/product] seems like it could benefit from a short motion piece explaining the value proposition.

No pressure at all, but if that becomes a priority I''d love to help.',
'Send 7 days after no reply. Add a specific observation about their product or landing page. Make it feel like genuine analysis, not automation.'),

(uid,'Follow-Up #3 — Day 14 Close the Loop','Follow-Up',
'Going to close the loop after this.

If motion design, launch assets, or product animation become relevant later, feel free to reach out.

Wishing you continued success with [company].',
'Send 14 days after no reply. Closes respectfully. Leaves the door permanently open. The door open close is the highest-converting follow-up pattern.');

END $$;
