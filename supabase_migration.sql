-- ============================================================
-- WHOEARNS — SUPABASE SCHEMA UPDATE FOR NEXT.JS APP
-- Run this in Supabase SQL Editor
-- This ADDS columns to your existing profiles table
-- Safe to run — uses IF NOT EXISTS / ALTER TABLE ADD COLUMN
-- ============================================================

-- ── ADD MISSING COLUMNS TO PROFILES TABLE ────────────────

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS tags         jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS stats        jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS career_table jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS career_total_apps    integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS career_total_goals   integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS career_total_assists integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS info_box_1   jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS info_box_2   jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ai_enabled   boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS ai_data      jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS show_claim   boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_verified  boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_reviewed text DEFAULT 'April 2026',
  ADD COLUMN IF NOT EXISTS growth       text,
  ADD COLUMN IF NOT EXISTS rank_order   integer DEFAULT 999,
  ADD COLUMN IF NOT EXISTS seo_title    text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS seo_content  text,
  ADD COLUMN IF NOT EXISTS avatar_skin  text DEFAULT '#c8845a',
  ADD COLUMN IF NOT EXISTS avatar_hair  text DEFAULT '#1a0f08',
  ADD COLUMN IF NOT EXISTS avatar_style text DEFAULT 'short',
  ADD COLUMN IF NOT EXISTS avatar_jersey text DEFAULT '#cc2200',
  ADD COLUMN IF NOT EXISTS avatar_number text DEFAULT '',
  ADD COLUMN IF NOT EXISTS avatar_bg    text DEFAULT '#111116',
  ADD COLUMN IF NOT EXISTS avatar_accessory text DEFAULT '';

-- ── INDEXES FOR PERFORMANCE ───────────────────────────────

CREATE INDEX IF NOT EXISTS profiles_category_idx  ON profiles(category);
CREATE INDEX IF NOT EXISTS profiles_country_idx   ON profiles(country);
CREATE INDEX IF NOT EXISTS profiles_rank_idx      ON profiles(category, rank_order);
CREATE INDEX IF NOT EXISTS profiles_ai_idx        ON profiles(ai_enabled);

-- ── SEED: UPDATE LEWANDOWSKI WITH ALL FIELDS ─────────────
-- Update the existing Lewandowski profile with all new fields

UPDATE profiles SET
  tags = '[
    {"label":"Footballer","type":"s"},
    {"label":"Active","type":"a"},
    {"label":"Poland Record","type":"r"},
    {"label":"Intl. Retirement Likely","type":"a"}
  ]',
  social_links = '[
    {"icon":"Instagram","label":"@lewy_official · 30M","url":"https://instagram.com/lewy_official"},
    {"icon":"X","label":"@lewy_official · 5M","url":"https://x.com/lewy_official"}
  ]',
  stats = '[
    {"label":"Net Worth","value":"$200M","color":"gold","note":"Forbes est. 2025","estimated":true},
    {"label":"Intl Caps","value":"165","color":"blue","note":"Poland all-time record","verified":true},
    {"label":"Intl Goals","value":"89","color":"gold","note":"Poland all-time top scorer","verified":true},
    {"label":"Career Goals","value":"620+","color":"","note":"All clubs combined","verified":true}
  ]',
  career_table = '[
    {"club":"Lech Poznan","flag":"PL","years":"2007–10","apps":82,"goals":41,"assists":11},
    {"club":"Borussia Dortmund","flag":"DE","years":"2010–14","apps":131,"goals":74,"assists":38},
    {"club":"Bayern Munich","flag":"DE","years":"2014–22","apps":374,"goals":344,"assists":92},
    {"club":"FC Barcelona","flag":"ES","years":"2022–now","apps":110,"goals":80,"assists":25}
  ]',
  career_total_apps = 697,
  career_total_goals = 539,
  career_total_assists = 166,
  info_box_1 = '{
    "title":"Earnings",
    "rows":[
      {"key":"Net Worth","value":"$200M","color":"gold","estimated":true},
      {"key":"Annual Earnings","value":"~$35M","estimated":true},
      {"key":"Barcelona salary","value":"€16M/yr base","verified":true},
      {"key":"Endorsements","value":"Nike, Gillette, 4F, Oshee, OANDA"},
      {"key":"RL9 Brand","value":"Own clothing line"}
    ]
  }',
  info_box_2 = '{
    "title":"International Career",
    "rows":[
      {"key":"Country","value":"Poland"},
      {"key":"Caps","value":"165","verified":true},
      {"key":"Goals","value":"89","verified":true},
      {"key":"World Cups","value":"2018, 2022"},
      {"key":"Contract","value":"Barcelona until Jun 2026"},
      {"key":"Status","value":"Intl. retirement likely"}
    ]
  }',
  ai_enabled = true,
  ai_data = '{
    "name":"Robert Lewandowski",
    "weakness":"<strong>One of the most underrepresented superstars</strong> in global media. Massively famous in Europe, almost invisible in English-language content despite being an all-time great striker.",
    "market":"<strong>Polish diaspora of 21M+ people worldwide</strong> and European football fans who know Lewandowski is exceptional but have no English-language destination for his story.",
    "opportunity":"<strong>English-language Polish football platform.</strong> Lewandowski as the entry point — his career, his records, the Poland national team story told properly for an international audience.",
    "difficulty":"<strong>Easy.</strong> Pure content play with a massively underserved audience already looking for this.",
    "build_name":"Polska Football",
    "build_description":"English-language newsletter and YouTube covering Polish football. Lewandowski, the Bundesliga years, the national team. 20,000 subscribers at €5/month = €100K MRR.",
    "layout":"c",
    "product_name":"Polska Football",
    "product_tagline":"The Polish football story. In English.",
    "product_cta":"Subscribe Free",
    "product_features":["Lewandowski career deep dives","Bundesliga from Poland perspective","National team coverage","English language"],
    "product_url":"polskafootball.com",
    "product_bg":"#1a0508",
    "product_accent":"#dc143c"
  }',
  show_claim = true,
  is_verified = false,
  last_reviewed = 'April 2026',
  growth = '+8%',
  rank_order = 8,
  meta = ARRAY['Aug 21, 1988','Leszno, Poland','Polish','Age 37'],
  seo_title = 'Robert Lewandowski Net Worth 2026 — Career Stats, Salary and Earnings',
  seo_description = 'Robert Lewandowski net worth estimated at $200M in 2026. 165 international caps, 89 goals — Poland all-time records. FC Barcelona salary, endorsements and full career stats.',
  seo_content = '<p>Robert Lewandowski is one of the greatest strikers in football history and Poland''s most iconic sportsman. As of April 2026, his net worth is estimated at $200 million, built through a career spanning Polish, German, and Spanish football at the very highest level.</p>
<p>Lewandowski earns approximately €16 million per year in base salary at FC Barcelona, where his contract runs until June 2026. With performance bonuses and commercial income, his total annual earnings are estimated at $35 million or more. His key endorsements include Nike, Gillette, 4F clothing, Oshee sports drinks, and OANDA trading. He terminated his Huawei deal in March 2022 in response to the invasion of Ukraine.</p>
<p>His international career reached its conclusion in spring 2026 after Poland failed to qualify for the 2026 FIFA World Cup, losing 3-2 to Sweden in the playoff final on 31 March 2026. Lewandowski posted a farewell image on Instagram that night, strongly signalling international retirement. He ends his Poland career as the all-time record holder for both caps (165) and goals (89).</p>
<p>Career earnings across all clubs are estimated at over $340 million. His business ventures include the RL9 clothing brand. Lewandowski has been named Polish Footballer of the Year a record thirteen times and won the Best FIFA Men''s Player award in 2020 and 2021.</p>',
  avatar_skin = '#d4a87a',
  avatar_hair = '#c8a060',
  avatar_style = 'short',
  avatar_jersey = '#dc143c',
  avatar_number = '9',
  avatar_bg = '#1a0508',
  avatar_accessory = 'stubble'
WHERE slug = 'robert-lewandowski';


-- ── INSERT REMAINING PROFILES ─────────────────────────────
-- Each profile with all fields populated

INSERT INTO profiles (
  slug, name, category, country, flag, meta,
  tags, social_links, stats, career_table,
  career_total_apps, career_total_goals, career_total_assists,
  info_box_1, info_box_2,
  ai_enabled, ai_data, show_claim, is_verified,
  last_reviewed, growth, rank_order,
  seo_title, seo_description, seo_content,
  avatar_skin, avatar_hair, avatar_style,
  avatar_jersey, avatar_number, avatar_bg, avatar_accessory
) VALUES

-- CRISTIANO RONALDO
(
  'cristiano-ronaldo','Cristiano Ronaldo','footballer','pt','PT',
  ARRAY['Feb 5, 1985','Madeira, Portugal','Portuguese','Age 41'],
  '[{"label":"Footballer","type":"s"},{"label":"Active","type":"a"},{"label":"World Record","type":"r"}]',
  '[{"icon":"Instagram","label":"@Cristiano · 650M","url":"https://instagram.com/cristiano"},{"icon":"X","label":"@Cristiano · 113M","url":"https://x.com/Cristiano"}]',
  '[{"label":"Net Worth","value":"$1.1B","color":"gold","note":"Forbes est. 2025","estimated":true},{"label":"Intl Caps","value":"217","color":"blue","note":"World record","verified":true},{"label":"Intl Goals","value":"135","color":"gold","note":"World record","verified":true},{"label":"Career Goals","value":"782","color":"","note":"All clubs combined","verified":true}]',
  '[{"club":"Sporting CP","flag":"PT","years":"2002–03","apps":31,"goals":5,"assists":6},{"club":"Manchester United","flag":"EN","years":"2003–09, 2021–23","apps":346,"goals":145,"assists":75},{"club":"Real Madrid","flag":"ES","years":"2009–18","apps":438,"goals":450,"assists":131},{"club":"Juventus","flag":"IT","years":"2018–21","apps":134,"goals":101,"assists":22},{"club":"Al Nassr","flag":"SA","years":"2023–now","apps":97,"goals":81,"assists":24}]',
  1046, 782, 258,
  '{"title":"Earnings","rows":[{"key":"Net Worth","value":"$1.1B","color":"gold","estimated":true},{"key":"Annual Earnings","value":"~$200M","estimated":true},{"key":"Endorsements","value":"Nike (lifetime), Herbalife, CR7"},{"key":"Instagram per post","value":"~$3.2M","estimated":true},{"key":"CR7 Hotels","value":"10+ properties worldwide"}]}',
  '{"title":"International Career","rows":[{"key":"Country","value":"Portugal"},{"key":"Caps","value":"217","verified":true},{"key":"Goals","value":"135","verified":true},{"key":"World Cups","value":"5 appearances"},{"key":"EURO","value":"2016 winner"},{"key":"UCL titles","value":"5x"}]}',
  true,
  '{"name":"Cristiano Ronaldo","weakness":"<strong>CR7 brand is entirely personality-dependent.</strong> 650M followers with no owned subscription product, no community platform, no direct fan monetisation beyond passive social.","market":"<strong>650M Instagram followers</strong> who can only consume content passively — no membership, no exclusive access, no direct relationship.","opportunity":"<strong>A fan membership platform</strong> — exclusive training content, nutrition insights, behind-the-scenes access. He has the world''s largest individual audience with no product for it.","difficulty":"<strong>Easy concept.</strong> Challenge is athlete involvement. White-label platform for 100K–10M follower athletes is more buildable as a starting point.","build_name":"AthletePass","build_description":"White-label membership platform for athletes. They bring the audience, you provide the platform. 20% revenue share. Target athletes with 100K–10M followers.","layout":"d","product_name":"AthletePass","product_tagline":"Your favourite athletes. Exclusive access.","product_cta":"Start Free Trial","product_features":["Exclusive training content","Behind the scenes access","Early merchandise drops","Monthly live Q and A"],"product_url":"athletepass.io","product_bg":"#0a150a","product_accent":"#22c97a"}',
  true, false, 'April 2026', '+5%', 3,
  'Cristiano Ronaldo Net Worth 2026 — Career Stats, Salary and Endorsements',
  'Cristiano Ronaldo net worth $1.1B in 2026. World record 217 caps and 135 international goals. Al Nassr salary $200M/year total. Full career stats across Man United, Real Madrid and Juventus.',
  '<p>Cristiano Ronaldo is the wealthiest active footballer in history, with an estimated net worth of $1.1 billion as of 2026. His fortune has been built through 20 years at the top of world football, a record-breaking Al Nassr contract, and one of sport''s most valuable personal brands.</p>
<p>Ronaldo earns approximately $200 million per year in total, combining his Al Nassr salary with commercial income. His endorsement portfolio includes a lifetime deal with Nike, Herbalife, and his own CR7 brand covering hotels, clothing, fragrance and gyms. At 650 million Instagram followers, he earns an estimated $3.2 million per sponsored post.</p>
<p>His international career with Portugal stands at 217 caps and 135 goals — both world records for men''s international football that are unlikely to be broken for decades. He first broke the caps record in 2021, overtaking Bader Al-Mutawa of Kuwait.</p>
<p>Career club statistics total 782 goals in 1,046 appearances across Sporting CP, Manchester United, Real Madrid, Juventus and Al Nassr. His Real Madrid spell (2009-2018, 438 appearances, 450 goals) is considered one of the greatest individual runs in football history.</p>',
  '#c8845a','#100808','short','#006600','7','#051405','stubble'
),

-- OPENAI
(
  'openai','OpenAI','ai','us','US',
  ARRAY['Founded 2015','San Francisco, CA','3,000+ employees','$157B valuation'],
  '[{"label":"AI Company","type":"c"},{"label":"Private","type":"a"},{"label":"Fastest Growing","type":"r"}]',
  '[{"icon":"Web","label":"openai.com","url":"https://openai.com"},{"icon":"X","label":"@OpenAI · 3.5M","url":"https://x.com/OpenAI"}]',
  '[{"label":"ARR","value":"$3.7B","color":"gold","note":"End 2024 — reported","estimated":true},{"label":"Valuation","value":"$157B","color":"green","note":"2024 funding round","estimated":true},{"label":"Weekly Users","value":"300M+","color":"blue","note":"ChatGPT WAU","estimated":true},{"label":"Revenue Growth","value":"3.4x","color":"","note":"Year on year","estimated":true}]',
  '[]', 0, 0, 0,
  '{"title":"Revenue Breakdown","rows":[{"key":"ChatGPT subscriptions","value":"~$2B (54%)","estimated":true},{"key":"API Revenue","value":"~$1.2B (32%)","estimated":true},{"key":"Enterprise","value":"~$500M (14%)","estimated":true},{"key":"Microsoft investment","value":"$13B total"},{"key":"CEO","value":"Sam Altman"}]}',
  '{"title":"Company","rows":[{"key":"Founded","value":"2015"},{"key":"Key backer","value":"Microsoft — $13B invested"},{"key":"Products","value":"ChatGPT, GPT-4o, Sora, DALL-E"},{"key":"Weekly users","value":"300M+","estimated":true},{"key":"Valuation","value":"$157B","estimated":true}]}',
  true,
  '{"name":"OpenAI","weakness":"<strong>Serves everyone which means it serves no one perfectly.</strong> Medical, legal and finance professionals all need specialist AI trained on domain-specific knowledge.","market":"<strong>50M+ professional knowledge workers</strong> who use ChatGPT generically but would pay 3x more for domain-specific AI.","opportunity":"<strong>Vertical AI</strong> — build one product for one profession. Domain-specific training, domain-specific workflows. €99–299/month instead of €20.","difficulty":"<strong>Medium difficulty.</strong> AI infrastructure already exists. The work is building the knowledge and workflow layer.","build_name":"LegalSnap","build_description":"AI built specifically for small law firms. Document analysis, contract drafting, case research, compliance checks. €149/month per lawyer. 500 firms = €75K MRR.","layout":"d","product_name":"LegalSnap","product_tagline":"AI built for lawyers. Not everyone.","product_cta":"Start Free Trial","product_features":["Document analysis and review","Contract drafting","Case research automation","Compliance-aware responses"],"product_url":"legalsnap.ai","product_bg":"#080808","product_accent":"#a78bfa"}',
  false, false, 'April 2026', '+340%', 2,
  'OpenAI Revenue and Valuation 2026 — ARR, Business Model and Growth',
  'OpenAI ARR $3.7B in 2026. $157B valuation. 300M+ weekly ChatGPT users. Revenue breakdown across subscriptions, API and enterprise. Fastest growing software company in history.',
  '<p>OpenAI is the most valuable AI company and the fastest growing software business in history. Annual recurring revenue reached $3.7 billion by the end of 2024, growing 3.4x in 12 months from $1.1 billion at the start of that year.</p>
<p>The $157 billion valuation from its 2024 funding round reflects a business that moved from research lab to commercial powerhouse in under three years. Microsoft has invested approximately $13 billion and embeds OpenAI technology across its entire product suite.</p>
<p>Revenue splits three ways: ChatGPT subscriptions generate roughly $2 billion (54%). Developer API access generates approximately $1.2 billion (32%). Enterprise contracts generate approximately $500 million.</p>
<p>ChatGPT has over 300 million weekly active users. Key products include ChatGPT, GPT-4o, DALL-E, Sora video generation, and the enterprise API platform. The company was founded in 2015 by Sam Altman, Greg Brockman, and Elon Musk (who later departed the board).</p>',
  '#8090a0','#101010','bald','#1a1a20','AI','#080808',''
)

ON CONFLICT (slug) DO UPDATE SET
  tags = EXCLUDED.tags,
  social_links = EXCLUDED.social_links,
  stats = EXCLUDED.stats,
  career_table = EXCLUDED.career_table,
  career_total_apps = EXCLUDED.career_total_apps,
  career_total_goals = EXCLUDED.career_total_goals,
  career_total_assists = EXCLUDED.career_total_assists,
  info_box_1 = EXCLUDED.info_box_1,
  info_box_2 = EXCLUDED.info_box_2,
  ai_enabled = EXCLUDED.ai_enabled,
  ai_data = EXCLUDED.ai_data,
  show_claim = EXCLUDED.show_claim,
  is_verified = EXCLUDED.is_verified,
  last_reviewed = EXCLUDED.last_reviewed,
  growth = EXCLUDED.growth,
  rank_order = EXCLUDED.rank_order,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  seo_content = EXCLUDED.seo_content,
  avatar_skin = EXCLUDED.avatar_skin,
  avatar_hair = EXCLUDED.avatar_hair,
  avatar_style = EXCLUDED.avatar_style,
  avatar_jersey = EXCLUDED.avatar_jersey,
  avatar_number = EXCLUDED.avatar_number,
  avatar_bg = EXCLUDED.avatar_bg,
  avatar_accessory = EXCLUDED.avatar_accessory,
  meta = EXCLUDED.meta,
  updated_at = now();


-- ── VERIFY ────────────────────────────────────────────────
SELECT slug, name, category, rank_order, seo_title IS NOT NULL as has_seo
FROM profiles
ORDER BY rank_order
LIMIT 20;
