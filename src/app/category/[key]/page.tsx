import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategories, getProfilesByCategory, getProfilesByCountry } from '@/lib/supabase'
import type { Profile, Category } from '@/types'
import Avatar from '@/components/Avatar'
import CategoryClient from '@/components/CategoryClient'
import styles from './category.module.css'

// ── STATIC GENERATION ─────────────────────────────────────
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(c => ({ key: c.key }))
}

// ── CATEGORY → PROFILE CATEGORY MAPPING ───────────────────
const CATEGORY_MAP: Record<string, string[]> = {
  footballers:     ['footballers', 'footballer'],
  basketball:      ['basketball'],
  singers:         ['singers', 'musician'],
  actors:          ['actors', 'actor'],
  creators:        ['creators', 'creator'],
  'tech-founders': ['tech-founders', 'founder'],
  politicians:     ['politicians', 'politician'],
  athletes:        ['athletes', 'athlete'],
  'ai-startups':   ['ai-startups', 'ai'],
  'tech-giants':   ['tech-giants', 'tech'],
  'startup-mrr':   ['startup-mrr', 'startup'],
  'indie-founders':['indie-founders', 'indie-founder', 'founder'],
  'onlyfans':['onlyfans', 'creator', 'content-creator'],
  'media-companies':['media-companies', 'media'],
  'sports-teams':  ['sports-teams', 'sports-team'],
  poland:          ['pl'], // filtered by country
}

// ── RICH SEO CONTENT PER CATEGORY ─────────────────────────
const CATEGORY_CONTENT: Record<string, {
  intro: string
  sections: Array<{ h2: string; body: string }>
  faqs: Array<{ q: string; a: string }>
  relatedCategories: string[]
}> = {
  footballers: {
    intro: `Football produces more centimillionaires and billionaires than almost any other profession on earth. The combination of elite salaries, global endorsement deals, social media reach and increasingly sophisticated investment portfolios has turned the world's top players into genuine business empires. This page tracks the net worth, career earnings and financial data for the world's wealthiest football players — updated regularly from Forbes estimates, reported contract values and public records.`,
    sections: [
      {
        h2: 'How do footballers make their money?',
        body: `The average person assumes footballers make money from their club salary. In reality, for elite players, the salary is often just the starting point. Cristiano Ronaldo earns an estimated $200 million per year in total — but his Al Nassr salary accounts for less than half of that. The rest comes from his lifetime Nike deal, his CR7 brand (hotels, clothing, fragrance), Instagram sponsored posts estimated at $3.2 million each, and various other business ventures.\n\nEndorsement deals are the real multiplier for top-tier footballers. Nike, Adidas and Puma fight aggressively for boot deals with the most visible players. A premium boot deal for a player at Ronaldo or Messi's level is believed to be worth $10-20 million per year — more than most Premier League players earn in salary. Below that tier, most professional footballers earn the majority of their income from their club contract.`
      },
      {
        h2: 'The hidden billionaires of football',
        body: `The wealthiest person connected to professional football is not Ronaldo or Messi. Faiq Bolkiah, a professional footballer who has played in several leagues, has an estimated net worth of over $20 billion — inherited from his family, the royal family of Brunei. Mathieu Flamini, who played for Arsenal and several other European clubs with little fanfare, co-founded GFBiochemicals while still playing and built a company estimated to be worth over $13 billion. Almost nobody in the stands knew.\n\nThis pattern — athlete as secret entrepreneur — is more common than the public realises. Marcus Rashford has built a significant publishing and charity empire alongside his Manchester United career. Didier Drogba co-founded a pharmaceutical company in Africa. The assumption that footballers simply earn and spend is increasingly outdated at the elite level.`
      },
      {
        h2: 'How has football player wealth changed over 20 years?',
        body: `In 2004, the highest-paid footballer in the world earned approximately £5 million per year. In 2026, Cristiano Ronaldo earns an estimated $200 million annually — a 40x increase in real terms over two decades. This explosion in player wealth reflects several forces operating simultaneously: the Premier League's global broadcast rights deals (now worth £10 billion per cycle), the rise of social media as a direct monetisation channel, the professionalisation of sports agency representing players in commercial negotiations, and the entry of sovereign wealth funds from the Gulf states into football ownership, creating a new salary tier.\n\nThe Saudi Pro League's recruitment of Ronaldo, Benzema, Neymar and others in 2023-24 created an entirely new compensation bracket. Players who would previously have earned £15-20 million per year at a European club were offered two to four times that sum in Saudi Arabia — fundamentally altering the global salary market.`
      }
    ],
    faqs: [
      { q: 'Who is the richest footballer in the world in 2026?', a: 'Faiq Bolkiah has the highest net worth of any professional footballer at over $20 billion, though this is inherited wealth. Among players whose fortunes were built through football itself, Cristiano Ronaldo leads with an estimated $1.1 billion net worth, followed by Lionel Messi at approximately $700 million.' },
      { q: 'How much does Cristiano Ronaldo earn per year?', a: 'Cristiano Ronaldo earns an estimated $200 million per year in total, combining his Al Nassr salary with endorsement income from Nike, Herbalife, and his CR7 brand, plus Instagram revenue estimated at $3.2 million per sponsored post.' },
      { q: 'How much does Lionel Messi earn?', a: 'Lionel Messi earns approximately $135 million per year in total. His Inter Miami contract is believed to include revenue sharing, and his endorsement portfolio includes Adidas, Pepsi, Hard Rock International and Apple.' },
      { q: 'Do footballers pay a lot of tax?', a: 'Tax varies significantly by country. Players at clubs in Spain, France and England face very different rates. Some players have historically relocated to lower-tax jurisdictions between contracts. Most elite players employ specialist tax advisors as part of their management team.' },
      { q: 'What happens to footballer wealth after retirement?', a: 'This varies widely. Players with professional management, diversified investments and business interests tend to sustain their wealth. Players without financial management often see significant wealth erosion. Research suggests a substantial proportion of NFL and NBA players face financial difficulty within years of retirement — football is likely similar.' },
    ],
    relatedCategories: ['basketball', 'athletes', 'singers']
  },

  basketball: {
    intro: `The NBA produces more individual wealth per player than almost any sport on earth. A combination of maximum salary contracts, increasingly lucrative shoe and endorsement deals, and a growing culture of athlete entrepreneurship has turned the league's top stars into genuine business empires. This page tracks net worth, salary data and career earnings for the world's wealthiest basketball players.`,
    sections: [
      {
        h2: 'NBA salaries — how the money works',
        body: `The NBA operates a salary cap system that limits how much teams can pay players in aggregate, but individual maximum contracts have grown dramatically. In the 2025-26 season, the maximum salary for a player with 10+ years of experience is approximately $60 million per year — more than most nations' GDP per capita. Stephen Curry earns $59 million annually from Golden State Warriors alone.\n\nBeyond salary, the real wealth multiplier for NBA stars is endorsement income. LeBron James earns more from Nike than from his Lakers contract — his lifetime Nike deal is estimated to be worth over $1 billion in total value. Michael Jordan's continuing Nike revenue (Air Jordan remains a multibillion-dollar annual business) means Jordan earns more from shoes today than any active player earns in salary.`
      },
      {
        h2: 'NBA players as investors and entrepreneurs',
        body: `Kevin Durant co-founded Boardroom, a sports media company, and has assembled a portfolio of over 30 startup investments. LeBron James co-owns a media company (SpringHill), holds a stake in Liverpool FC, and has investments across fast food, media production and sports franchises. Magic Johnson built a business empire worth over $1 billion after retiring in 1996.\n\nThis generation of NBA players is more financially literate and entrepreneurially active than any before it. The NBPA (players union) runs financial education programmes. Top players hire dedicated investment teams. The culture of "getting your business right" — modelled partly by LeBron and Jay-Z — has become a defining feature of the modern NBA star.`
      }
    ],
    faqs: [
      { q: 'Who is the richest NBA player of all time?', a: 'Michael Jordan is the richest NBA player in history with an estimated net worth of $3 billion, driven primarily by his continuing share of Nike\'s Air Jordan revenue rather than his playing salary.' },
      { q: 'Who is the highest paid NBA player in 2026?', a: 'Stephen Curry earns $59 million per year from Golden State Warriors, making him one of the highest-paid active players. Total compensation including endorsements pushes his annual earnings higher.' },
      { q: 'How does LeBron James make his money?', a: 'LeBron James earns approximately $50 million per year in NBA salary plus income from his lifetime Nike deal (estimated at $30M+ annually), his SpringHill entertainment company, and various investments including a stake in Liverpool FC.' },
      { q: 'Can NBA players have other jobs?', a: 'Yes. There are no restrictions on NBA players owning businesses, making investments or pursuing other commercial activities during or after their playing careers.' },
    ],
    relatedCategories: ['footballers', 'athletes', 'tech-founders']
  },

  singers: {
    intro: `The music industry's economics have been transformed twice in two decades — first by streaming, which collapsed album sale revenue, then by the live performance boom and direct fan monetisation that replaced it. Today's wealthiest musicians earn primarily through touring, catalog ownership, brand partnerships and business ventures rather than record sales. This page tracks net worth and earnings for the world's highest-earning singers, rappers and musicians.`,
    sections: [
      {
        h2: 'How do musicians make money in 2026?',
        body: `The streaming era permanently changed music economics. A Spotify stream pays approximately $0.003-0.005 per play — meaning an artist needs 250 million streams to earn $1 million from Spotify alone. Even Taylor Swift, with over 100 billion lifetime Spotify streams, earns relatively little directly from streaming compared to her touring and catalog income.\n\nThe real money for top artists is in three places. Live performance is the largest income source — Taylor Swift's Eras Tour grossed $2 billion across 150+ shows. Music catalog ownership provides compounding royalty income for decades — Swift's re-recorded masters are estimated to be worth $600 million. And brand partnerships and equity deals (Rihanna with LVMH for Fenty Beauty, Jay-Z selling his cognac brand for $750 million) have created billionaire musicians whose wealth comes primarily from outside music.`
      },
      {
        h2: 'The streaming effect on artist wealth',
        body: `Not all artists have benefited equally from the streaming era. Older artists with large pre-streaming catalogs — The Beatles, Led Zeppelin, Bruce Springsteen (who sold his masters for $500 million) — have seen catalog values explode as streaming creates perpetual royalty income. Newer artists without catalog depth depend more heavily on touring and brand deals.\n\nThe most financially sophisticated artists now treat catalog ownership as a long-term investment rather than an immediate income source. Taylor Swift's decision to re-record her first six albums — effectively creating a competing product to the masters she lost control of — is studied in business schools as a case study in IP strategy.`
      },
      {
        h2: 'Musicians who became business billionaires',
        body: `Jay-Z was the first hip-hop artist to become a billionaire, reaching the milestone in 2019. His wealth comes primarily from selling stakes in D'usse cognac to Bacardi and Armand de Brignac champagne to LVMH — business ventures funded by his music career but valued far beyond it. Rihanna became a billionaire through Fenty Beauty, which generates an estimated $600 million annually in partnership with LVMH.\n\nThis pattern — musician as business empire builder — is accelerating. Artists with large audiences increasingly view their following as distribution infrastructure for consumer brands. Paul McCartney ($1.3 billion net worth), Andrew Lloyd Webber ($1.2 billion) and Herb Alpert ($800 million) all built wealth primarily through catalog and publishing ownership rather than touring income.`
      }
    ],
    faqs: [
      { q: 'Who is the richest musician in the world in 2026?', a: 'Jay-Z leads with an estimated net worth of $2.5 billion, driven by his business ventures including D\'usse cognac (sold to Bacardi) and Armand de Brignac champagne (sold to LVMH) rather than music revenue alone.' },
      { q: 'How much did Taylor Swift earn from the Eras Tour?', a: 'The Eras Tour grossed over $2 billion in ticket sales, with Taylor Swift personally earning approximately $190 million post-tax according to Forbes estimates. The companion concert film added $262 million in gross revenue.' },
      { q: 'How does Rihanna make her money?', a: 'The majority of Rihanna\'s $1.4 billion net worth comes from Fenty Beauty, her cosmetics brand in partnership with LVMH, which generates an estimated $600 million in annual revenue. Her music career generates relatively little by comparison.' },
      { q: 'What is a music catalog and why is it valuable?', a: 'A music catalog is the collection of song rights an artist owns. When you own the masters to a song, you earn royalties every time it streams, plays on radio, appears in a film or TV show, or is used in advertising. Owning a large catalog of well-known songs generates compounding income for decades.' },
    ],
    relatedCategories: ['actors', 'creators', 'tech-founders']
  },

  actors: {
    intro: `Hollywood's highest-paid actors earn through a combination of upfront fees, backend profit participation, production company income and brand deals. The industry's economics have shifted significantly with streaming — while Netflix and Amazon pay large upfront fees, they typically exclude backend participation, meaning actors no longer benefit from a film's long-term success. This page tracks net worth and career earnings for the world's wealthiest actors and entertainers.`,
    sections: [
      {
        h2: 'How do the highest-paid actors make their money?',
        body: `The top tier of Hollywood actors earn through multiple channels simultaneously. Upfront salary for a major studio film ranges from $5 million for an established star to $50 million for the very top tier (Dwayne Johnson, Tom Cruise). Backend deals — a percentage of profits after the studio recoups costs — can dwarf upfront fees for blockbusters. Tom Cruise is believed to have earned over $100 million from Top Gun: Maverick through his backend participation.\n\nBeyond acting fees, the most commercially successful actors build production companies. Dwayne Johnson's Seven Bucks Productions, Reese Witherspoon's Hello Sunshine and George Clooney's Smokehouse Pictures all generate revenue independent of any individual film. Johnson's business portfolio also includes Teremana Tequila (approximately $200 million annual revenue) and ZOA Energy drinks.`
      },
      {
        h2: 'The streaming era and actor compensation',
        body: `Netflix changed Hollywood compensation fundamentally. The streaming giant pays actors large, guaranteed upfront fees — sometimes 2-3 times what a traditional studio would pay — but typically does not offer backend deals because it doesn't release traditional box office figures. For an actor choosing between a $15 million Netflix fee and a $5 million studio fee with backend, the Netflix deal can appear attractive even though it eliminates potential upside from a blockbuster.\n\nThis has created a two-tier system. Reliable streaming hits make Netflix a profitable employer for mid-tier stars. For genuine franchise stars like Tom Cruise, whose backend from Mission Impossible films generates tens of millions, traditional studio deals remain more lucrative. The calculus is different for every actor depending on their leverage and audience.`
      }
    ],
    faqs: [
      { q: 'Who is the highest paid actor in the world in 2026?', a: 'Dwayne Johnson earns the most per film at approximately $50 million upfront, with additional income from Teremana Tequila and ZOA Energy. His total annual earnings are estimated at over $100 million.' },
      { q: 'What is a backend deal in film?', a: 'A backend deal gives an actor a percentage of a film\'s profits after the studio recoups its production and marketing costs. For massive box office hits, backend deals can generate far more than upfront fees — Tom Cruise reportedly earned $100M+ from Top Gun: Maverick\'s backend.' },
      { q: 'Who is the richest actor of all time?', a: 'Jerry Seinfeld has an estimated net worth of over $1 billion, driven by his continuing revenue share from Seinfeld syndication. Among film actors, Tyler Perry has built a $1 billion fortune through his own production studio and distribution deals.' },
      { q: 'Does Dwayne Johnson own Teremana Tequila?', a: 'Yes. Dwayne Johnson co-founded Teremana Tequila in 2020. The brand has grown rapidly and generates an estimated $200 million in annual revenue, making it one of the fastest-growing premium spirits brands in history.' },
    ],
    relatedCategories: ['singers', 'creators', 'footballers']
  },

  creators: {
    intro: `Social media creators have built a genuinely new category of wealth in the past decade — one that didn't exist before YouTube monetised in 2012. The economics are different from traditional entertainment: no gatekeeper, direct audience relationships, multiple revenue streams, and businesses (merchandise, food brands, apps) that scale off the back of the audience. This page tracks net worth and earnings for the world's highest-earning YouTube, TikTok and Instagram creators.`,
    sections: [
      {
        h2: 'How do social media creators actually make money?',
        body: `The naive assumption is that creators make money from ad revenue (YouTube's AdSense programme). In reality, for the largest creators, AdSense is often the smallest income stream. MrBeast generates an estimated $80 million annually from YouTube ads — but his Feastables chocolate brand generates approximately $100 million in revenue, and sponsorships add another $50 million. The platform ad revenue funds the content that builds the audience that powers the real businesses.\n\nThe creator economy hierarchy in 2026 works roughly like this. Nano creators (under 10K followers) earn almost nothing from platforms directly — income comes from paid consulting, services or small sponsorships. Mid-tier creators (100K-1M) earn $50K-$500K annually from a mix of ads, sponsorships and merchandise. Top-tier creators (1M+) can earn $1M-$50M+ annually. The mega tier (MrBeast, PewDiePie) have transcended creator economics entirely and operate as media companies.`
      },
      {
        h2: 'From creator to business owner',
        body: `The most financially successful creators follow a consistent pattern: build audience, launch a product that the audience buys, use the business income to fund both personal wealth and further content production. MrBeast reinvests virtually all his YouTube income into content — the personal wealth comes from Feastables. Logan Paul and KSI built Prime Hydration into a $250 million revenue business using their combined audiences as distribution.\n\nThis model — audience as distribution for a consumer brand — is now well understood and increasingly copied. The question is whether a creator's audience trusts them enough to buy what they recommend. MrBeast's audience, built on genuine entertainment rather than lifestyle aspiration, proved surprisingly effective at converting to chocolate buyers. Not every creator has this kind of brand loyalty.`
      },
      {
        h2: 'How do social media creators actually make money?',
        body: `The public assumption is that creators make money from ads. In reality, for any creator above 100,000 followers, advertising revenue is rarely the biggest income source. Brand sponsorships pay 5–20x more per viewer than platform ad revenue. A YouTube creator with 1 million monthly views earns perhaps $3,000–$7,000 from AdSense — but a single sponsored integration can pay $15,000–$50,000.\n\nThe most financially sophisticated creators have moved beyond ads and sponsorships into owned businesses. MrBeast's Feastables chocolate brand, Mark Rober's CrunchLabs subscription box, and Logan Paul and KSI's Prime Hydration drink generate revenues that dwarf anything their YouTube channels earn directly. The creator becomes a distribution channel for a product business — a fundamentally more scalable economic model.`
      }
    ],
    faqs: [
      { q: 'Who is the richest YouTuber in the world?', a: 'MrBeast (Jimmy Donaldson) is the wealthiest individual YouTuber with an estimated net worth of $700 million, driven by Feastables chocolate brand revenue, YouTube AdSense and brand deals across his network of channels.' },
      { q: 'How much does MrBeast earn per year?', a: 'MrBeast\'s total annual revenue is estimated at over $250 million across all sources — approximately $80 million from YouTube AdSense, $100 million from Feastables, and $50 million+ from sponsorships and brand deals.' },
      { q: 'How much does a YouTube video earn?', a: 'YouTube pays roughly $2-10 per 1,000 views through AdSense, depending on audience location and topic. A video with 10 million views might earn $20,000-$100,000 from ads alone — far less than most viewers assume.' },
      { q: 'Can you make a living from TikTok?', a: 'TikTok Creator Fund pays approximately $0.02-0.04 per 1,000 views — far below YouTube rates. Most successful TikTok creators monetise through brand deals, driving traffic to other platforms, or selling their own products rather than through TikTok directly.' },
    ],
    relatedCategories: ['singers', 'actors', 'tech-founders']
  },

  'onlyfans': {
    intro: `OnlyFans has paid over $15 billion to creators since launching in 2016. The subscription platform allows creators to charge monthly fees for exclusive content, with creators keeping 80% of all revenue. The income distribution is extreme — the top 1% of creators earn the vast majority of platform revenue. This page tracks what the highest-earning OnlyFans creators actually make.`,
    sections: [
      {
        h2: 'How OnlyFans Creator Income Works',
        body: `OnlyFans operates on three revenue streams: monthly subscriptions (creators keep 80% of subscription fees), pay-per-view messages (individual content pieces sent directly to subscribers for an additional charge), and tips (direct payments from fans). The PPV model is where the highest earners make disproportionate income — a creator with 10,000 subscribers who sends a $15 PPV message with a 20% open rate earns $24,000 from a single message after the platform fee.\n\nSuccessful OnlyFans creators almost universally drive traffic from external platforms — Instagram, TikTok, X (Twitter) — rather than relying on in-platform discovery. The platform itself has minimal recommendation algorithms, meaning audience building happens almost entirely off-platform.`
      },
      {
        h2: 'Celebrity launches vs career creators',
        body: `The highest-publicised OnlyFans earnings — Bella Thorne's $1 million in 24 hours, Bhad Bhabie's $1 million in 6 hours — represent celebrity audience conversions, not sustainable creator income models. These figures are driven by millions of pre-existing fans converting on a novelty launch day.\n\nCareer OnlyFans creators operate differently. They build loyal subscriber bases over time, optimise PPV open rates through direct messaging strategies, and maintain consistent posting schedules. The top career creators — those who have built the platform as their primary business rather than a celebrity side venture — earn $50,000–$500,000 per month consistently.`
      }
    ],
    faqs: [
      { q: 'How much does OnlyFans take?', a: 'OnlyFans takes 20% of all creator revenue across subscriptions, pay-per-view content and tips. Creators keep 80% of everything they earn on the platform.' },
      { q: 'Who are the highest-paid OnlyFans creators?', a: 'Bella Thorne made $1M in 24 hours at launch. Bhad Bhabie made $1M in 6 hours. However, the highest-earning career creators are not always household names — consistent earners at the top of the platform earn $500K+ per month.' },
      { q: 'Can you make a living on OnlyFans?', a: 'Yes, but it requires significant external audience building. The median OnlyFans creator earns under $200 per month. Full-time income typically requires 500+ subscribers at a competitive subscription price, plus active PPV messaging.' },
    ],
    relatedCategories: ['creators', 'singers', 'actors']
  },

    'tech-founders': {
    intro: `Technology has created more billionaires in the past 30 years than any other industry in history. The combination of software scalability (one product can serve billions of customers with near-zero marginal cost), global distribution via the internet, and venture capital willing to fund losses during the growth phase has produced fortunes on a scale not seen since the industrial revolution. This page tracks the net worth and business data for the world's wealthiest technology founders.`,
    sections: [
      {
        h2: 'How tech founders become billionaires',
        body: `The mechanism for tech founder wealth is straightforward in theory and brutal in practice. A founder starts a company, takes a small salary, and holds a large equity stake (often 20-30% at founding). If the company grows and either goes public or is acquired, that equity becomes worth billions. Jeff Bezos founded Amazon with a 20% stake — today even a fraction of that stake, much diluted, is worth tens of billions.\n\nThe key variables are equity dilution (how much ownership is given away to investors and employees over time), exit valuation (what the company is worth when it IPOs or is sold), and timing (founders who hold too long through a falling market can see net worth collapse; those who sell too early leave billions on the table). Elon Musk's wealth is almost entirely paper wealth — shares in Tesla and SpaceX that he cannot easily sell without moving the market.`
      },
      {
        h2: 'The AI wealth explosion 2023-2026',
        body: `The emergence of large language models and generative AI in 2022-2023 created a new wealth generation event comparable to the dot-com boom or the smartphone era. Jensen Huang's net worth at NVIDIA grew from approximately $3 billion in 2020 to over $120 billion by 2026 as demand for AI chips drove NVIDIA's revenue from $10 billion to $130 billion in five years — the fastest revenue growth of any company at that scale in history.\n\nThe AI boom also created new billionaires at the application layer. Sam Altman at OpenAI, Dario Amodei at Anthropic, and founders of companies like Cursor and Midjourney built businesses worth tens of billions in 2-3 years. The common thread is that AI reduced the cost of building software dramatically, allowing very small teams to build very large businesses very quickly.`
      }
    ],
    faqs: [
      { q: 'Who is the richest tech founder in the world?', a: 'Elon Musk leads with an estimated net worth of $300 billion+, driven by his stakes in Tesla, SpaceX and xAI. Jeff Bezos ($240B+), Mark Zuckerberg ($200B+) and Bill Gates ($130B) follow.' },
      { q: 'How did Elon Musk get so rich?', a: 'Musk\'s wealth comes primarily from equity stakes in companies he co-founded or led: Tesla (electric vehicles, energy), SpaceX (rockets, Starlink internet), and xAI (Grok AI assistant). He retains large equity stakes that have grown in value as those companies scaled.' },
      { q: 'How much is Jensen Huang worth?', a: 'Jensen Huang has an estimated net worth of over $120 billion as of 2026, driven almost entirely by his approximately 3.5% stake in NVIDIA, whose market capitalisation reached $3.3 trillion following the AI chip demand explosion.' },
      { q: 'Did Bill Gates give away his money?', a: 'Bill Gates has donated over $60 billion to charity through the Gates Foundation since 2000, and has pledged to give away 99% of his wealth. Despite this giving, his net worth has continued to grow through investment returns, currently estimated at $130 billion.' },
    ],
    relatedCategories: ['ai-startups', 'tech-giants', 'indie-founders']
  },

  athletes: {
    intro: `Beyond football and basketball, professional sport produces extraordinary wealth across tennis, golf, Formula 1, boxing, and increasingly esports and niche disciplines. The common thread is elite performance at global scale — sports with worldwide television audiences create sponsorship markets that can generate tens of millions annually for a handful of athletes per discipline. This page tracks net worth and earnings for the world's highest-earning athletes outside of football and basketball.`,
    sections: [
      {
        h2: 'Golf — the most lucrative individual sport',
        body: `Golf has historically produced the wealthiest individual athletes outside of team sports. Tiger Woods' estimated net worth of $1.1 billion reflects 27 years of Nike partnership income, course design fees, his own golf club (Jupiter Links), and the continuing commercial value of his name even through injury and personal setbacks. Jack Nicklaus, despite earning a fraction of modern prize money during his playing career, built a $400 million fortune through course design — he has designed or co-designed over 300 courses worldwide.\n\nThe launch of LIV Golf in 2022, funded by the Saudi Public Investment Fund, created a new salary tier in golf similar to what the Saudi Pro League did for football. Players who joined LIV received appearance fees and salary guarantees that dwarfed traditional PGA Tour prize money, though at the cost of exclusion from Majors for a period.`
      },
      {
        h2: 'Formula 1 — growing wealth in a growing sport',
        body: `Formula 1's recent expansion into the American market — driven by the Drive to Survive Netflix series — has dramatically increased driver commercial value. Max Verstappen earns an estimated $65 million per year from Red Bull Racing, a figure that would have been unthinkable for a non-British, non-German driver a decade ago. Lewis Hamilton's move to Ferrari in 2025 is believed to be worth approximately $80 million per year including salary and endorsements.\n\nThe sport's unique characteristic is that driver wealth is heavily dependent on team performance. A driver in a dominant car (Verstappen at Red Bull) wins championships and maximises commercial value. A driver in a midfield car — regardless of individual talent — earns a fraction of that and has limited commercial leverage.`
      }
    ],
    faqs: [
      { q: 'Who is the richest athlete in the world?', a: 'Tiger Woods leads among non-team-sport athletes with an estimated net worth of $1.1 billion. When including all sports, LeBron James ($1.5B) and Cristiano Ronaldo ($1.1B) rank at the top.' },
      { q: 'How much does Max Verstappen earn?', a: 'Max Verstappen earns approximately $65 million per year from his Red Bull Racing contract, making him one of the highest-paid athletes in any sport. With endorsements from Nike, Samsung and others, total annual earnings are higher.' },
      { q: 'How did Roger Federer make his money?', a: 'Federer earned $130M+ in career prize money, with peak endorsement income estimated at $70M annually from partnerships with Rolex, Uniqlo, Wilson and others. He is also a minority investor in On Holdings, the Swiss athletic shoe company.' },
    ],
    relatedCategories: ['footballers', 'basketball', 'tech-founders']
  },

  'ai-startups': {
    intro: `The artificial intelligence industry has produced the fastest company revenue growth rates in the history of software. OpenAI grew from $1 billion to $3.7 billion in annual recurring revenue in a single year — faster than Stripe, Slack, Zoom or any other software product at comparable scale. This page tracks revenue, valuation and business data for the world's most valuable AI companies, with verified data where available and clearly labelled estimates where not.`,
    sections: [
      {
        h2: 'Why AI startups are growing faster than any software before',
        body: `Three factors are combining to produce growth rates that have no historical precedent in software. First, the product (AI models) is genuinely useful to a massive existing audience immediately — ChatGPT reached 100 million users in two months, faster than any product in history. Second, pricing is high — enterprise customers pay $20-300 per user per month for AI tools, compared to $5-15 for traditional SaaS. Third, switching costs are increasing as companies embed AI into their workflows.\n\nThe result is that AI companies are able to convert awareness into revenue at unprecedented speed. OpenAI grew from $0 to $3.7 billion in ARR in approximately 24 months. Cursor, the AI code editor, grew from zero to an estimated $500 million in ARR in under 18 months. These growth rates are simply without precedent in software history.`
      },
      {
        h2: 'The AI startup landscape in 2026',
        body: `The AI industry in 2026 has stratified into distinct layers. At the foundation model layer, OpenAI and Anthropic compete directly with Google's Gemini and Meta's Llama for dominance in underlying AI capability. These companies require billions in infrastructure investment and have valuations of $50-200 billion. The application layer — companies building on top of foundation models — includes Cursor (code editors), Midjourney (image generation), ElevenLabs (voice synthesis) and hundreds of vertical AI tools.\n\nThe most interesting dynamic is the bootstrapped tier: Midjourney built to $300 million ARR with 40 employees and zero venture capital funding. This efficiency is orders of magnitude beyond what traditional software companies achieved. The question for investors is whether the application layer can maintain defensibility as the underlying models become commoditised.`
      },
      {
        h2: 'How to evaluate AI startup revenue claims',
        body: `ARR (Annual Recurring Revenue) figures for private AI companies are almost always estimates — the companies do not publish audited financials. These estimates come from investor leaks, due diligence reports, employee disclosures, and triangulation from published metrics (pricing × estimated user counts). Treat all private company ARR figures as directional rather than precise.\n\nVerified data comes from companies that have filed with the SEC (US public companies), published audited accounts (UK and EU requirements), or had their metrics independently verified through payment processor data. On WhoEarns, every figure is clearly labelled as verified or estimated with its source.`
      }
    ],
    faqs: [
      { q: 'What is OpenAI\'s revenue in 2026?', a: 'OpenAI\'s annual recurring revenue is estimated at $3.7 billion as of end 2024, growing approximately 3.4x year on year. Revenue splits roughly between ChatGPT subscriptions (54%), API access (32%) and enterprise contracts (14%).' },
      { q: 'Is Midjourney profitable?', a: 'Midjourney is believed to be highly profitable. With approximately $300 million in ARR and only 40 employees, the company has very low operating costs relative to revenue. It has taken no venture capital funding and is fully bootstrapped.' },
      { q: 'What is the difference between ARR and revenue?', a: 'ARR (Annual Recurring Revenue) measures subscription income annualised — a company with 1,000 customers paying $100/month has $1.2M ARR. Total revenue may include one-time fees, professional services and other non-recurring income. For subscription SaaS businesses, ARR is the standard health metric.' },
      { q: 'Which AI company is growing fastest?', a: 'Cursor grew from zero to an estimated $500M ARR in under 18 months, making it arguably the fastest-growing developer tool in history. Lovable reached $100M ARR in approximately 10 weeks, which may be the fastest ARR growth of any software product ever recorded.' },
    ],
    relatedCategories: ['tech-giants', 'indie-founders', 'tech-founders']
  },

  'tech-giants': {
    intro: `The world's largest technology companies have become the most valuable businesses in human history. Apple, Microsoft, Nvidia and Amazon each have market capitalisations exceeding $2 trillion — larger than the GDP of most countries. Their revenues are verified through mandatory SEC filings, making them among the most transparent large organisations on earth. This page tracks revenue, profit and key financial metrics for the world's biggest technology companies.`,
    sections: [
      {
        h2: 'How tech giants generate their revenue',
        body: `Each of the major technology companies has a distinct business model, though all share the characteristic of very high operating leverage — the cost of serving an additional customer is near zero once the platform is built. Google earns 90%+ of its revenue from advertising against search queries. Microsoft earns from enterprise software subscriptions (Office 365, Azure cloud services, LinkedIn). Apple earns from hardware (iPhone, Mac, iPad) and a growing services segment (App Store, iCloud, Apple TV+). Amazon earns from e-commerce, Amazon Web Services (cloud computing), and advertising.\n\nThe highest-margin business among all of these is cloud computing. AWS, Azure and Google Cloud all generate operating margins of 30-40% — meaning for every $100 in cloud revenue, $30-40 falls to profit. This is why all three parent companies are aggressively investing in cloud and AI infrastructure.`
      },
      {
        h2: 'The AI investment cycle',
        body: `In 2025-2026, the major tech companies collectively announced capital expenditure plans of over $300 billion for AI infrastructure — data centres, custom chips, power capacity and cooling. Microsoft alone plans to spend $80 billion in 2025. This investment is both a response to genuine AI demand and a defensive move to ensure they are not disrupted by AI-native competitors.\n\nThe economics are complex. Training and running AI models is extremely expensive — OpenAI reportedly loses money on some of its cheapest subscription tiers because inference costs exceed subscription revenue. The companies investing most heavily in AI infrastructure are betting that the eventual revenue from AI products will justify the capital outlay. This is the defining bet of the current technology era.`
      }
    ],
    faqs: [
      { q: 'What is the most profitable tech company?', a: 'Apple and Microsoft compete for this title. Apple earned $94 billion in net profit on $391 billion revenue (24% margin) in FY2024. Microsoft earned $88 billion on $245 billion revenue (36% margin). Microsoft\'s higher margin reflects its software-heavy revenue mix.' },
      { q: 'How much revenue does Google make per day?', a: 'Google (Alphabet) generates approximately $841 million in revenue per day based on its 2024 annual revenue of $307 billion, verified through SEC filings.' },
      { q: 'Is Apple the most valuable company in the world?', a: 'Apple and Microsoft compete for the top position by market capitalisation, both hovering around $3-3.5 trillion as of April 2026. NVIDIA briefly exceeded both during its AI-driven share price surge.' },
      { q: 'How much does Amazon Web Services earn?', a: 'AWS generated $107 billion in revenue in 2024, verified through Amazon\'s SEC filings. It is the most profitable segment of Amazon\'s business despite representing less than 20% of total revenue.' },
    ],
    relatedCategories: ['ai-startups', 'tech-founders', 'indie-founders']
  },
}

// ── PAGE COMPONENT ─────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ key: string }> }
): Promise<Metadata> {
  const { key } = await params
  const categories = await getCategories()
  const cat = categories.find(c => c.key === key)
  if (!cat) return { title: 'Category Not Found · WhoEarns' }

  const year = new Date().getFullYear()
  const title = `${cat.label} Net Worth ${year} — Richest ${cat.label} Ranked`
  const desc = `${cat.title}. ${cat.subtitle}. Full net worth rankings, career earnings and financial data on WhoEarns.`

  return {
    title,
    description: desc,
    alternates: { canonical: `https://whoearns.com/category/${key}` },
    openGraph: {
      title, description: desc,
      url: `https://whoearns.com/category/${key}`,
      type: 'website', siteName: 'WhoEarns',
    },
    twitter: { card: 'summary_large_image', title, description: desc },
  }
}

export default async function CategoryPage(
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params
  const [categories, allProfiles] = await Promise.all([
    getCategories(),
    getProfilesByCategory(key),
  ])

  const cat = categories.find(c => c.key === key)
  if (!cat) notFound()

  // Get profiles — filter by country for regional categories
  let profiles: Profile[]
  if (key === 'poland') {
    profiles = await getProfilesByCountry('pl')
  } else {
    const cats = CATEGORY_MAP[key] || [key]
    profiles = allProfiles.filter(p => cats.some(c => p.category === c))
      .sort((a, b) => a.rank_order - b.rank_order)
  }

  const content = CATEGORY_CONTENT[key]
  const relatedCats = categories.filter(c =>
    content?.relatedCategories?.includes(c.key)
  )
  const year = new Date().getFullYear()

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat!.label} Net Worth ${year}`,
    description: cat!.subtitle,
    url: `https://whoearns.com/category/${key}`,
    hasPart: profiles.slice(0, 10).map(p => ({
      '@type': 'ProfilePage',
      name: p.name,
      url: `https://whoearns.com/${p.slug}`,
    })),
  }

  const faqLd = content?.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      {/* BREADCRUMB */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">WhoEarns</Link>
        <span>›</span>
        <span>{cat!.label}</span>
      </nav>

      <main className={styles.main}>

        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.eyebrow}>
              {cat!.subtitle}
            </div>
            <h1 className={styles.h1}>
              {profiles.length > 0
                ? `${profiles.length} Richest ${cat!.label} in ${year}`
                : `${cat!.label} — Net Worth Rankings ${year}`
              }
            </h1>
            <p className={styles.headerSub}>
              {content?.intro || cat!.subtitle}
            </p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.hstat}>
              <div className={styles.hstatNum}>{profiles.length}</div>
              <div className={styles.hstatLabel}>Profiles</div>
            </div>
            {profiles[0]?.stats?.[0] && (
              <div className={styles.hstat}>
                <div className={styles.hstatNum}>{profiles[0].stats[0].value}</div>
                <div className={styles.hstatLabel}>Highest {profiles[0].stats[0].label}</div>
              </div>
            )}
            <div className={styles.hstat}>
              <div className={styles.hstatNum}>{year}</div>
              <div className={styles.hstatLabel}>Last updated</div>
            </div>
          </div>
        </header>

        {/* INTERACTIVE CHART + TABLE — client component */}
        {profiles.length > 0 && (
          <CategoryClient profiles={profiles} categoryLabel={cat!.label} category={key} />
        )}

        {/* LONG-FORM SEO CONTENT */}
        {content && (
          <article className={styles.article}>
            {content.sections.map((s, i) => (
              <section key={i} className={styles.articleSection}>
                <h2 className={styles.articleH2}>{s.h2}</h2>
                {s.body.split('\n\n').map((para, j) => (
                  <p key={j} className={styles.articleP}>{para}</p>
                ))}
              </section>
            ))}
          </article>
        )}

        {/* FULL PROFILE LIST — HTML for SEO */}
        <section className={styles.profileList}>
          <h2 className={styles.sectionH2}>
            All {cat!.label} — Full Rankings
          </h2>
          <p className={styles.sectionSub}>
            Click any profile for full career stats, earnings breakdown and AI opportunity analysis.
          </p>
          <div className={styles.profileGrid}>
            {profiles.map((p, i) => (
              <Link key={p.slug} href={`/${p.slug}`} className={styles.profileCard}>
                <div className={styles.profileRank}>{i + 1}</div>
                <div className={styles.profileAva}>
                  <Avatar skin={p.avatar_skin} hair={p.avatar_hair}
                    style={p.avatar_style} jersey={p.avatar_jersey}
                    number={p.avatar_number} bg={p.avatar_bg}
                    accessory={p.avatar_accessory} size={48} name={p.name} />
                </div>
                <div className={styles.profileInfo}>
                  <div className={styles.profileName}>{p.name}</div>
                  <div className={styles.profileMeta}>
                    {p.meta?.[0]} · {p.tags?.[0]?.label}
                  </div>
                  {p.stats?.slice(1, 3).map((s, j) => (
                    <div key={j} className={styles.profileStat}>
                      {s.label}: <strong>{s.value}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.profileVal}>
                  <div className={styles.profileMoney}>{p.stats?.[0]?.value}</div>
                  <div className={styles.profileMoneyLabel}>{p.stats?.[0]?.label}</div>
                  {p.growth && (
                    <div className={`${styles.growth} ${p.growth.startsWith('-') ? styles.growthDn : styles.growthUp}`}>
                      {p.growth}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        {content?.faqs && (
          <section className={styles.faq}>
            <h2 className={styles.sectionH2}>
              Frequently Asked Questions — {cat!.label}
            </h2>
            <div className={styles.faqList}>
              {content.faqs.map((f, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{f.q}</summary>
                  <p className={styles.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* RELATED CATEGORIES */}
        {relatedCats.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.sectionH2}>Explore related categories</h2>
            <div className={styles.relatedGrid}>
              {relatedCats.map(rc => (
                <Link key={rc.key} href={`/category/${rc.key}`} className={styles.relatedCard}>
                  <div className={styles.relatedLabel}>{rc.label}</div>
                  <div className={styles.relatedHint}>{rc.hint}</div>
                  <div className={styles.relatedArr}>View rankings →</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* DATA DISCLAIMER */}
        <footer className={styles.disclaimer}>
          <p>
            All net worth figures marked <span className="badge estimated">est</span> are
            estimates from publicly available sources including Forbes, Bloomberg and reported
            deals — not verified financial statements. Figures marked{' '}
            <span className="badge verified">verified</span> are from official filings or APIs.
            Last reviewed: April {year}.{' '}
            <Link href="/disclaimer">Data Disclaimer</Link> ·{' '}
            <a href="mailto:hello@whoearns.com">Dispute data</a>
          </p>
        </footer>

      </main>
    </>
  )
}
