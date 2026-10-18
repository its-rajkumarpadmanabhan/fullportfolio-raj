/**
 * RAJKUMAR PORTFOLIO — CONTENT CREATOR GALLERY & LIGHTBOX
 * Manages:
 * 1. 44 Thumbnail & Story Visuals (thumbnail/)
 * 2. 14 2D Sketch & Fine Art Studies (art/)
 * 3. 13 High-Resolution Photographs (photography/)
 * 4. 13 Malayalam Poster Creatives (malayalam thumbnail/)
 *
 * Features:
 * - Initial 6 items displayed per gallery
 * - Dynamic "Show More" / "Show Less" toggle buttons with remaining item count badges
 * - Category filter tabs with instant state recalculation
 * - Interactive heart like counters
 * - Universal Fullscreen Lightbox with keyboard navigation (Esc, Left, Right)
 * - Real-time 24fps ticking timecode clock and NLE playhead tracking
 */

const INITIAL_VISIBLE_COUNT = 6;

// 1. MAIN THUMBNAIL GALLERY (44 ITEMS)
const mainGalleryItems = [
  {
    "file": "thumbnail/598643316_18091632251311044_7706457495267639127_n.jpg",
    "title": "598643316_18091632251311044_7706457495267639127_n",
    "badge": "Story",
    "cat": "stories",
    "likes": 137
  },
  {
    "file": "thumbnail/Beige%20and%20Purple%20Modern%20Freebie%20Offer%20Your%20Story.jpg",
    "title": "Beige and Purple Modern Freebie Offer Your Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 176
  },
  {
    "file": "thumbnail/Black%20Bold%20Photo%20Collage%20wit3.3h%20font%20Frame%20Adventure%20for%20instagram%20Story.png",
    "title": "Black Bold Photo Collage with font Frame Adventure for instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 215
  },
  {
    "file": "thumbnail/Black%20Grunge%20Background%20Instagram%20Story.png",
    "title": "Black Grunge Background Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 254
  },
  {
    "file": "thumbnail/Black%20Minimalist%20Beauty%20Makeup%20Before%20After%20Instagram%20Story.png",
    "title": "Black Minimalist Beauty Makeup Before After Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 293
  },
  {
    "file": "thumbnail/Black%20Red%20Bold%20Election%20Campaign%20Instagram%20Story.jpg",
    "title": "Black Red Bold Election Campaign Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 332
  },
  {
    "file": "thumbnail/Black%20and%20Brown%20Illustrative%20Vintage%20Movie%20Coming%20Soon%20Instagram%20Story.jpg",
    "title": "Black and Brown Illustrative Vintage Movie Coming Soon Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 371
  },
  {
    "file": "thumbnail/Black%20and%20Grey%20Modern%20Music%20Playlist%20Instagram%20Story.png",
    "title": "Black and Grey Modern Music Playlist Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 410
  },
  {
    "file": "thumbnail/Black%20and%20Yellow%20Modern%20Fashion%20YouTube%20Thumbnail.png",
    "title": "Black and Yellow Modern Fashion YouTube Thumbnail",
    "badge": "YouTube",
    "cat": "youtube",
    "likes": 449
  },
  {
    "file": "thumbnail/Blue%20Illust1rative%20Clean%20Health%20Insurance%20Instagram%20Story.jpg",
    "title": "Blue Illust1rative Clean Health Insurance Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 128
  },
  {
    "file": "thumbnail/Blue%20Orange%20Photocentric%20Illustrative%20Music%20Festival%20Edition%20Puzzle%20Game%20Instagram%20Story%20%281%29.png",
    "title": "Blue Orange Photocentric Illustrative Music Festival Edition Puzzle Game Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 167
  },
  {
    "file": "thumbnail/Blue%20simple%20Minimalist%20Typography%20M69y%20Ootd%20Instagram%20Stories.png",
    "title": "Blue simple Minimalist Typography M69y Ootd Instagram Stories",
    "badge": "Story",
    "cat": "stories",
    "likes": 206
  },
  {
    "file": "thumbnail/Brown%20and%20Beige%20Modern%20Travel%20Instagram%20Story.jpg",
    "title": "Brown and Beige Modern Travel Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 245
  },
  {
    "file": "thumbnail/Cream%20Illustration%20Back%20to%20School%20Greeting%20Inlstagram%20Story.jpg",
    "title": "Cream Illustration Back to School Greeting Inlstagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 284
  },
  {
    "file": "thumbnail/Gradient%20Modern%20Job%20Vacancy%20Your%20Story.png",
    "title": "Gradient Modern Job Vacancy Your Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 323
  },
  {
    "file": "thumbnail/Green%20and%20Blue%20Modern%20Online%20Course%20Your%20Story%20%281%29.png",
    "title": "Green and Blue Modern Online Course Your Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 362
  },
  {
    "file": "thumbnail/Green%20and%20White%20Modern%20Coding%20Course%20Mobile%20Video.jpg",
    "title": "Green and White Modern Coding Course Mobile Video",
    "badge": "Reel / Video",
    "cat": "reels",
    "likes": 401
  },
  {
    "file": "thumbnail/Illustrated%20Minimal%20Pink%20Blue%20Women%27s%20Day%20Instagram%20Story.png",
    "title": "Illustrated Minimal Pink Blue Women's Day Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 440
  },
  {
    "file": "thumbnail/Logo%20-%20Company%20Profile.jpg",
    "title": "Logo - Company Profile",
    "badge": "Cover & Brand",
    "cat": "covers",
    "likes": 479
  },
  {
    "file": "thumbnail/Navy%20Gaming%20Tonight%20Live%20Stream%20Instagram%20Story.jpg",
    "title": "Navy Gaming Tonight Live Stream Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 158
  },
  {
    "file": "thumbnail/Neutral%20Minimalist%20Photo%20Instagram%20Story.png",
    "title": "Neutral Minimalist Photo Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 197
  },
  {
    "file": "thumbnail/Orange%20Beige%20and%20Blue%20Anime%20Cartoon%20Illustrative%20Novel%20Story%20Book%20Cover.png",
    "title": "Orange Beige and Blue Anime Cartoon Illustrative Novel Story Book Cover",
    "badge": "Cover & Brand",
    "cat": "covers",
    "likes": 236
  },
  {
    "file": "thumbnail/Orange%20Purple%20Modern%20Open%20Mic%20Night%20Instagram%20Story%20%281%29.jpg",
    "title": "Orange Purple Modern Open Mic Night Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 275
  },
  {
    "file": "thumbnail/Orange%20and%20White%20Modern%20Make%20Money%20From%20Home%20Instagram%20Reel%20Cover.png",
    "title": "Orange and White Modern Make Money From Home Instagram Reel Cover",
    "badge": "Reel / Video",
    "cat": "reels",
    "likes": 314
  },
  {
    "file": "thumbnail/Pink%20%26%20Blue%20%26%20White%20Gradiednt%20Before%20%26%20After%20Youtube%20Thumbnail.png",
    "title": "Pink & Blue & White Gradiednt Before & After Youtube Thumbnail",
    "badge": "YouTube",
    "cat": "youtube",
    "likes": 353
  },
  {
    "file": "thumbnail/Purple%20and%20Black%20Modern%20Futuristic%20Artificial%20Intelligence%20Instagram%20Story.png",
    "title": "Purple and Black Modern Futuristic Artificial Intelligence Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 392
  },
  {
    "file": "thumbnail/Red%20Brown%20andl%20White%20Cartoon%20Anime%20illustrative%20Story%20Book%20Cover.jpg",
    "title": "Red Brown andl White Cartoon Anime illustrative Story Book Cover",
    "badge": "Cover & Brand",
    "cat": "covers",
    "likes": 431
  },
  {
    "file": "thumbnail/Red%20Illustration%20World%20Television%20Day%20Instagram%20Story.jpg",
    "title": "Red Illustration World Television Day Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 470
  },
  {
    "file": "thumbnail/Red%20Modern%20Science%20Fiction%20Book%20Cover%20%281%29.jpg",
    "title": "Red Modern Science Fiction Book Cover",
    "badge": "Cover & Brand",
    "cat": "covers",
    "likes": 149
  },
  {
    "file": "thumbnail/Red%20Retro%20Illustration%20Cinema%20Ticket%20Promo%20Tiktok%20Vgideo.jpg",
    "title": "Red Retro Illustration Cinema Ticket Promo Tiktok Vgideo",
    "badge": "Reel / Video",
    "cat": "reels",
    "likes": 188
  },
  {
    "file": "thumbnail/Red%20Retro%20Illustration%20Cinema%20Ticket%20Promo%20Tiktok%20Video.jpg",
    "title": "Red Retro Illustration Cinema Ticket Promo Tiktok Video",
    "badge": "Reel / Video",
    "cat": "reels",
    "likes": 227
  },
  {
    "file": "thumbnail/Red%20Tech%20Modern%20Cyber%20Security%20Mobile%20Video.jpg",
    "title": "Red Tech Modern Cyber Security Mobile Video",
    "badge": "Reel / Video",
    "cat": "reels",
    "likes": 266
  },
  {
    "file": "thumbnail/Red%20and%20Cream%20Typographic%20Day%20in%20my%20life%20Your%20Story.png",
    "title": "Red and Cream Typographic Day in my life Your Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 305
  },
  {
    "file": "thumbnail/Red%20and%20White%203D%20Illustrative%20Animated%20Merry%20Christmas%20Instagram%20Story.jpg",
    "title": "Red and White 3D Illustrative Animated Merry Christmas Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 344
  },
  {
    "file": "thumbnail/Red%20and%20White%20Bold%20Love%20Vibes%20YouTube%20Thumbnail.png",
    "title": "Red and White Bold Love Vibes YouTube Thumbnail",
    "badge": "YouTube",
    "cat": "youtube",
    "likes": 383
  },
  {
    "file": "thumbnail/Story%20Instagram%20Black%20Friday%20Promo%C3%A7%C3%A3o%20Preto%20Amarelo%20Vermelho%20Branco%20Moderno%20Divertido%20Animado.png",
    "title": "Black Friday Promoção Preto Amarelo Vermelho Branco Moderno Divertido Animado",
    "badge": "Story",
    "cat": "stories",
    "likes": 422
  },
  {
    "file": "thumbnail/Travel%20%28Your%20Story%29.png",
    "title": "Travel (Your Story)",
    "badge": "Story",
    "cat": "stories",
    "likes": 461
  },
  {
    "file": "thumbnail/Voter%20Education%20Election%20Instagram%20Story%202in%20Orange%20Black%20and%20White%20Editorial%20Mixed%20Media%20Style.jpg",
    "title": "Voter Education Election Instagram Story 2in Orange Black and White Editorial Mixed Media Style",
    "badge": "Story",
    "cat": "stories",
    "likes": 140
  },
  {
    "file": "thumbnail/White%20and%20Blue%20Illustration%20Cyber%20Securit%3By%20Instagram%20Story.jpg",
    "title": "White and Blue Illustration Cyber Securit;y Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 179
  },
  {
    "file": "thumbnail/Yellow%20And%20Black%20Modern%20Coming%20Soon%20Instagram%20Story.png",
    "title": "Yellow And Black Modern Coming Soon Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 218
  },
  {
    "file": "thumbnail/Yellow%20Black%20Bold%20Playful%20Design%20Services%20Instagram%20Story.jpg",
    "title": "Yellow Black Bold Playful Design Services Instagram Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 257
  },
  {
    "file": "thumbnail/Yellow%20Modern%20Job%20Vacancy%20Your%20Story%20%281%29.png",
    "title": "Yellow Modern Job Vacancy Your Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 296
  },
  {
    "file": "thumbnail/Yellow%20and%20Brown%20No%20War%20Happy%20Children%20Your%20Story.png",
    "title": "Yellow and Brown No War Happy Children Your Story",
    "badge": "Story",
    "cat": "stories",
    "likes": 335
  },
  {
    "file": "thumbnail/Yellow%20and%20Red%20Modern%20Minimal%20Holi%20Festival%20YouTube%20Thumbnail.jpg",
    "title": "Yellow and Red Modern Minimal Holi Festival YouTube Thumbnail",
    "badge": "YouTube",
    "cat": "youtube",
    "likes": 374
  }
];

// 2. MALAYALAM THUMBNAIL CREATIVE ITEMS (13 ITEMS)
const mlGalleryItems = [
  {
    "file": "malayalam%20thumbnail/Accounting%20with%20SAP%20Career%20Poster.png",
    "title": "Accounting with SAP Career Poster",
    "badge": "Career Roadmaps",
    "cat": "career",
    "likes": 342
  },
  {
    "file": "malayalam%20thumbnail/Content%20%E0%B4%AE%E0%B5%81%E0%B4%A4%E0%B5%BD%20Audience%20%E0%B4%B5%E0%B4%B0%E0%B5%86.png",
    "title": "Content മുതൽ Audience വരെ (Content to Audience)",
    "badge": "Audience Growth",
    "cat": "marketing",
    "likes": 489
  },
  {
    "file": "malayalam%20thumbnail/Data,%20Questions,%20and%20Answers.png",
    "title": "Data, Questions, and Answers",
    "badge": "Data Science",
    "cat": "tech",
    "likes": 298
  },
  {
    "file": "malayalam%20thumbnail/From%20Wrong%20Route%20to%20SAP%20Logistics.png",
    "title": "From Wrong Route to SAP Logistics",
    "badge": "SAP & Logistics",
    "cat": "logistics",
    "likes": 276
  },
  {
    "file": "malayalam%20thumbnail/Global%20Logistics%20Career%20Path.png",
    "title": "Global Logistics Career Path",
    "badge": "Supply Chain",
    "cat": "logistics",
    "likes": 315
  },
  {
    "file": "malayalam%20thumbnail/Like%20%E0%B4%95%E0%B4%BF%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%BF%E2%80%A6%20Lead%20%E0%B4%95%E0%B4%BF%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B4%A3%E0%B5%8D%E0%B4%9F%E0%B5%87_.png",
    "title": "Like കിട്ടി… Lead കിട്ടണ്ടേ? (Got Likes, Need Leads?)",
    "badge": "Viral Marketing",
    "cat": "marketing",
    "likes": 562
  },
  {
    "file": "malayalam%20thumbnail/Numbers%20%E0%B4%A8%E0%B5%8B%E0%B4%95%E0%B5%8D%E0%B4%95%E0%B4%BF%20Data%20Science%20Poster.png",
    "title": "Numbers നോക്കി Data Science Poster",
    "badge": "Tech & Analytics",
    "cat": "tech",
    "likes": 381
  },
  {
    "file": "malayalam%20thumbnail/Patient%20Care%20Meets%20Smart%20Management.png",
    "title": "Patient Care Meets Smart Management",
    "badge": "Healthcare Mgmt",
    "cat": "healthcare",
    "likes": 245
  },
  {
    "file": "malayalam%20thumbnail/SAP%20Career%20Path%20Study%20Poster.png",
    "title": "SAP Career Path Study Poster",
    "badge": "Education & Career",
    "cat": "career",
    "likes": 403
  },
  {
    "file": "malayalam%20thumbnail/Smart%20Systems%20for%20Better%20Buildings.png",
    "title": "Smart Systems for Better Buildings (MEP / BMS)",
    "badge": "Engineering Systems",
    "cat": "engineering",
    "likes": 290
  },
  {
    "file": "malayalam%20thumbnail/Stop%20Scrolling,%20Start%20Growing.png",
    "title": "Stop Scrolling, Start Growing",
    "badge": "Social Growth",
    "cat": "marketing",
    "likes": 612
  },
  {
    "file": "malayalam%20thumbnail/Stop%20the%20Scroll_%20Digital%20Marketing%20Mastery.png",
    "title": "Stop the Scroll: Digital Marketing Mastery",
    "badge": "Performance Ads",
    "cat": "marketing",
    "likes": 528
  },
  {
    "file": "malayalam%20thumbnail/Supply%20Chain%20Skills%20Unboxed.png",
    "title": "Supply Chain Skills Unboxed",
    "badge": "Logistics & Career",
    "cat": "career",
    "likes": 334
  }
];

// 3. 2D SKETCH ART & FINE ART COLLECTION (14 ITEMS FROM art/)
const artGalleryItems = [
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27162810%20%281%29.jpg",
    "title": "Fine Art Study #1 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 139
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27258901%20%281%29.jpg",
    "title": "Fine Art Study #2 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 186
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27370239.jpg",
    "title": "Fine Art Study #3 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 233
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27370244%20%281%29.jpg",
    "title": "Fine Art Study #4 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 280
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27370250.jpg",
    "title": "Fine Art Study #5 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 327
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27370251.jpg",
    "title": "Fine Art Study #6 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 374
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27370258.jpg",
    "title": "Fine Art Study #7 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 421
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-27370265.jpg",
    "title": "Fine Art Study #8 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 148
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-30057563.jpg",
    "title": "Fine Art Study #9 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 195
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-34268214.jpg",
    "title": "Fine Art Study #10 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 242
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-34268244.jpg",
    "title": "Fine Art Study #11 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 289
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-34655693.jpg",
    "title": "Fine Art Study #12 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 336
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-34750949.jpg",
    "title": "Fine Art Study #13 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 383
  },
  {
    "file": "art/pexels-r-rajkumar-padmanabhan-1342414039-34753315.jpg",
    "title": "Fine Art Study #14 — Atmospheric Perspective",
    "badge": "2D Art",
    "likes": 430
  }
];

// 4. ORIGINAL PHOTOGRAPHY COLLECTION (13 ITEMS FROM photography/)
const photoGalleryItems = [
  {
    "file": "photography/1767588000974~2.jpg",
    "title": "Lens Perspective #1 — Ambient Texture",
    "badge": "Cinematic",
    "likes": 139
  },
  {
    "file": "photography/1767588000984~2.jpg",
    "title": "Lens Perspective #2 — Ambient Texture",
    "badge": "Cinematic",
    "likes": 186
  },
  {
    "file": "photography/1767588001122~2.jpg",
    "title": "Lens Perspective #3 — Ambient Texture",
    "badge": "Cinematic",
    "likes": 233
  },
  {
    "file": "photography/1779028328755~4.png",
    "title": "Lens Perspective #4 — Ambient Texture",
    "badge": "Cinematic",
    "likes": 280
  },
  {
    "file": "photography/ChatGPT%20Image%20May%2023%2C%202026%2C%2007_50_42%20PM.png",
    "title": "AI Visual Prompt Concept — Dynamic Lighting",
    "badge": "AI Concept",
    "likes": 327
  },
  {
    "file": "photography/photo_2025-05-13_09-42-24.jpg",
    "title": "Visual Capture #6 — Light & Shadow",
    "badge": "Photography",
    "likes": 374
  },
  {
    "file": "photography/photo_2025-05-13_09-42-27.jpg",
    "title": "Visual Capture #7 — Light & Shadow",
    "badge": "Photography",
    "likes": 421
  },
  {
    "file": "photography/photo_2025-05-13_09-42-30.jpg",
    "title": "Visual Capture #8 — Light & Shadow",
    "badge": "Photography",
    "likes": 148
  },
  {
    "file": "photography/photo_2025-05-13_09-42-34.jpg",
    "title": "Visual Capture #9 — Light & Shadow",
    "badge": "Photography",
    "likes": 195
  },
  {
    "file": "photography/photo_2025-05-13_09-42-43.jpg",
    "title": "Visual Capture #10 — Light & Shadow",
    "badge": "Photography",
    "likes": 242
  },
  {
    "file": "photography/photo_2025-05-13_09-42-45%20%282%29.jpg",
    "title": "Visual Capture #11 — Light & Shadow",
    "badge": "Photography",
    "likes": 289
  },
  {
    "file": "photography/photo_2025-05-13_09-42-48.jpg",
    "title": "Visual Capture #12 — Light & Shadow",
    "badge": "Photography",
    "likes": 336
  },
  {
    "file": "photography/photo_2025-05-13_09-47-15.jpg",
    "title": "Visual Capture #13 — Light & Shadow",
    "badge": "Photography",
    "likes": 383
  }
];

// STATE MANAGEMENT
let activeGalleryType = 'main'; // 'main' | 'ml' | 'art' | 'photo'
let currentLightboxIndex = 0;

let isExpandedMain = false;
let isExpandedMl = false;
let isExpandedArt = false;
let isExpandedPhoto = false;

let currentFilterMain = 'all';
let currentFilterMl = 'all';

let activeVisibleIndicesMain = [];
let activeVisibleIndicesMl = [];
let activeVisibleIndicesArt = [];
let activeVisibleIndicesPhoto = [];

// DOM READY
document.addEventListener('DOMContentLoaded', () => {
  renderMainGallery();
  renderMalayalamGallery();
  renderPhotoGallery();
  renderArtGallery();

  initCreatorLightbox();
  initScrollPlayhead();
  initTimecodeClock();
});

// ==========================================
// 1. MAIN THUMBNAIL GALLERY LOGIC
// ==========================================
function renderMainGallery() {
  const container = document.getElementById('pinterestGrid');
  if (!container) return;

  container.innerHTML = mainGalleryItems.map((item, index) => {
    const badgeClass = item.cat === 'youtube' ? 'yt' : (item.cat === 'reels' ? 'reel' : (item.cat === 'covers' ? 'cover' : 'story'));
    return `
      <article class="pin-card" data-category="${item.cat}" data-index="${index}" onclick="openLightbox('main', ${index})" role="button" tabindex="0" aria-label="View ${escapeHtml(item.title)}">
        <div class="pin-img-wrap">
          <img src="${item.file}" alt="${escapeHtml(item.title)}" class="pin-img" loading="lazy" decoding="async">
          <div class="pin-overlay">
            <div class="pin-top-row">
              <span class="pin-badge ${badgeClass}">${item.badge}</span>
              <button class="pin-zoom-btn" onclick="event.stopPropagation(); openLightbox('main', ${index});" aria-label="Preview full size" title="Expand preview">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
            </div>
            <div class="pin-center">
              <button class="pin-like-btn" onclick="event.stopPropagation(); togglePinLike(this);" aria-label="Like work" title="Like">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="like-num">${item.likes}</span>
              </button>
            </div>
            <div class="pin-bottom">
              <div class="pin-title">${escapeHtml(item.title)}</div>
              <div class="pin-sub">Click to expand preview ↗</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  updateMainGalleryVisibility();
}

function updateMainGalleryVisibility() {
  const cards = document.querySelectorAll('#pinterestGrid .pin-card');
  const toggleBtn = document.getElementById('btnToggleThumbnails');
  const textSpan = document.getElementById('btnToggleThumbnailsText');
  const countSpan = document.getElementById('btnToggleThumbnailsCount');

  activeVisibleIndicesMain = [];
  const matchingIndices = [];

  cards.forEach((card, idx) => {
    const cardCat = card.getAttribute('data-category');
    if (currentFilterMain === 'all' || cardCat === currentFilterMain) {
      matchingIndices.push(idx);
    }
  });

  const totalMatching = matchingIndices.length;
  const visibleLimit = isExpandedMain ? totalMatching : Math.min(INITIAL_VISIBLE_COUNT, totalMatching);

  cards.forEach((card, idx) => {
    const matchPos = matchingIndices.indexOf(idx);
    if (matchPos !== -1 && matchPos < visibleLimit) {
      card.style.display = '';
      if (isExpandedMain && matchPos >= INITIAL_VISIBLE_COUNT) {
        card.classList.add('pin-revealed');
      }
      activeVisibleIndicesMain.push(idx);
    } else {
      card.style.display = 'none';
      card.classList.remove('pin-revealed');
    }
  });

  if (toggleBtn) {
    if (totalMatching <= INITIAL_VISIBLE_COUNT) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-flex';
      if (!isExpandedMain) {
        const remaining = totalMatching - INITIAL_VISIBLE_COUNT;
        toggleBtn.classList.remove('is-expanded');
        if (textSpan) textSpan.textContent = 'Show More Thumbnails';
        if (countSpan) {
          countSpan.textContent = `+${remaining}`;
          countSpan.style.display = '';
        }
      } else {
        toggleBtn.classList.add('is-expanded');
        if (textSpan) textSpan.textContent = 'Show Less';
        if (countSpan) countSpan.style.display = 'none';
      }
    }
  }
}

window.toggleThumbnailsExpand = function() {
  isExpandedMain = !isExpandedMain;
  updateMainGalleryVisibility();
  if (!isExpandedMain) {
    const section = document.getElementById('work');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.filterGallery = function(category, btnElem) {
  currentFilterMain = category;
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  if (btnElem) {
    btnElem.classList.add('active');
    btnElem.setAttribute('aria-selected', 'true');
  }

  isExpandedMain = false;
  updateMainGalleryVisibility();
};

// ==========================================
// 2. MALAYALAM THUMBNAIL GALLERY LOGIC
// ==========================================
function renderMalayalamGallery() {
  const container = document.getElementById('malayalamGrid');
  if (!container) return;

  container.innerHTML = mlGalleryItems.map((item, index) => {
    return `
      <article class="pin-card ml-pin-card" data-ml-category="${item.cat}" data-index="${index}" onclick="openLightbox('ml', ${index})" role="button" tabindex="0" aria-label="View ${escapeHtml(item.title)}">
        <div class="pin-img-wrap">
          <img src="${item.file}" alt="${escapeHtml(item.title)}" class="pin-img" loading="lazy" decoding="async">
          <div class="pin-overlay">
            <div class="pin-top-row">
              <span class="pin-badge ml-badge">${item.badge}</span>
              <button class="pin-zoom-btn" onclick="event.stopPropagation(); openLightbox('ml', ${index});" aria-label="Preview full size" title="Expand preview">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
            </div>
            <div class="pin-center">
              <button class="pin-like-btn" onclick="event.stopPropagation(); togglePinLike(this);" aria-label="Like work" title="Like">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="like-num">${item.likes}</span>
              </button>
            </div>
            <div class="pin-bottom">
              <div class="pin-title">${escapeHtml(item.title)}</div>
              <div class="pin-sub">Malayalam Creative · Click to preview ↗</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  updateMalayalamGalleryVisibility();
}

function updateMalayalamGalleryVisibility() {
  const cards = document.querySelectorAll('#malayalamGrid .ml-pin-card');
  const toggleBtn = document.getElementById('btnToggleMl');
  const textSpan = document.getElementById('btnToggleMlText');
  const countSpan = document.getElementById('btnToggleMlCount');

  activeVisibleIndicesMl = [];
  const matchingIndices = [];

  cards.forEach((card, idx) => {
    const cardCat = card.getAttribute('data-ml-category');
    let matches = false;
    if (currentFilterMl === 'all') matches = true;
    else if (currentFilterMl === 'career' && cardCat === 'career') matches = true;
    else if (currentFilterMl === 'marketing' && (cardCat === 'marketing' || cardCat === 'growth')) matches = true;
    else if (currentFilterMl === 'tech' && cardCat === 'tech') matches = true;
    else if (currentFilterMl === 'logistics' && cardCat === 'logistics') matches = true;
    else if (currentFilterMl === 'healthcare' && (cardCat === 'healthcare' || cardCat === 'engineering')) matches = true;

    if (matches) {
      matchingIndices.push(idx);
    }
  });

  const totalMatching = matchingIndices.length;
  const visibleLimit = isExpandedMl ? totalMatching : Math.min(INITIAL_VISIBLE_COUNT, totalMatching);

  cards.forEach((card, idx) => {
    const matchPos = matchingIndices.indexOf(idx);
    if (matchPos !== -1 && matchPos < visibleLimit) {
      card.style.display = '';
      if (isExpandedMl && matchPos >= INITIAL_VISIBLE_COUNT) {
        card.classList.add('pin-revealed');
      }
      activeVisibleIndicesMl.push(idx);
    } else {
      card.style.display = 'none';
      card.classList.remove('pin-revealed');
    }
  });

  if (toggleBtn) {
    if (totalMatching <= INITIAL_VISIBLE_COUNT) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-flex';
      if (!isExpandedMl) {
        const remaining = totalMatching - INITIAL_VISIBLE_COUNT;
        toggleBtn.classList.remove('is-expanded');
        if (textSpan) textSpan.textContent = 'Show More Malayalam Posters';
        if (countSpan) {
          countSpan.textContent = `+${remaining}`;
          countSpan.style.display = '';
        }
      } else {
        toggleBtn.classList.add('is-expanded');
        if (textSpan) textSpan.textContent = 'Show Less';
        if (countSpan) countSpan.style.display = 'none';
      }
    }
  }
}

window.toggleMlExpand = function() {
  isExpandedMl = !isExpandedMl;
  updateMalayalamGalleryVisibility();
  if (!isExpandedMl) {
    const section = document.getElementById('malayalam-thumbnails');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.filterMlGallery = function(category, btnElem) {
  currentFilterMl = category;
  const filterBtns = document.querySelectorAll('[data-ml-filter]');
  filterBtns.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  if (btnElem) {
    btnElem.classList.add('active');
    btnElem.setAttribute('aria-selected', 'true');
  }

  isExpandedMl = false;
  updateMalayalamGalleryVisibility();
};

// ==========================================
// 3. PHOTOGRAPHY GALLERY LOGIC (13 ITEMS)
// ==========================================
function renderPhotoGallery() {
  const container = document.getElementById('photoGrid');
  if (!container) return;

  container.innerHTML = photoGalleryItems.map((item, index) => {
    return `
      <article class="pin-card photo-card" data-index="${index}" onclick="openLightbox('photo', ${index})" role="button" tabindex="0" aria-label="View ${escapeHtml(item.title)}">
        <div class="pin-img-wrap">
          <img src="${item.file}" alt="${escapeHtml(item.title)}" class="pin-img" loading="lazy" decoding="async">
          <div class="pin-overlay">
            <div class="pin-top-row">
              <span class="pin-badge" style="border-color:rgba(56,189,248,0.5); color:#38bdf8;">${item.badge}</span>
              <button class="pin-zoom-btn" onclick="event.stopPropagation(); openLightbox('photo', ${index});" aria-label="Preview full size" title="Expand preview">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
            </div>
            <div class="pin-center">
              <button class="pin-like-btn" onclick="event.stopPropagation(); togglePinLike(this);" aria-label="Like photograph" title="Like">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="like-num">${item.likes}</span>
              </button>
            </div>
            <div class="pin-bottom">
              <div class="pin-title">${escapeHtml(item.title)}</div>
              <div class="pin-sub">Photography Archive · Click to expand ↗</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  updatePhotoGalleryVisibility();
}

function updatePhotoGalleryVisibility() {
  const cards = document.querySelectorAll('#photoGrid .photo-card');
  const toggleBtn = document.getElementById('btnTogglePhotos');
  const textSpan = document.getElementById('btnTogglePhotosText');
  const countSpan = document.getElementById('btnTogglePhotosCount');

  activeVisibleIndicesPhoto = [];
  const total = cards.length;
  const visibleLimit = isExpandedPhoto ? total : Math.min(INITIAL_VISIBLE_COUNT, total);

  cards.forEach((card, idx) => {
    if (idx < visibleLimit) {
      card.style.display = '';
      if (isExpandedPhoto && idx >= INITIAL_VISIBLE_COUNT) {
        card.classList.add('pin-revealed');
      }
      activeVisibleIndicesPhoto.push(idx);
    } else {
      card.style.display = 'none';
      card.classList.remove('pin-revealed');
    }
  });

  if (toggleBtn) {
    if (total <= INITIAL_VISIBLE_COUNT) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-flex';
      if (!isExpandedPhoto) {
        const remaining = total - INITIAL_VISIBLE_COUNT;
        toggleBtn.classList.remove('is-expanded');
        if (textSpan) textSpan.textContent = 'Show More Photography';
        if (countSpan) {
          countSpan.textContent = `+${remaining}`;
          countSpan.style.display = '';
        }
      } else {
        toggleBtn.classList.add('is-expanded');
        if (textSpan) textSpan.textContent = 'Show Less';
        if (countSpan) countSpan.style.display = 'none';
      }
    }
  }
}

window.togglePhotosExpand = function() {
  isExpandedPhoto = !isExpandedPhoto;
  updatePhotoGalleryVisibility();
  if (!isExpandedPhoto) {
    const section = document.getElementById('photography');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ==========================================
// 4. 2D ART & SKETCH GALLERY LOGIC (14 ITEMS)
// ==========================================
function renderArtGallery() {
  const container = document.getElementById('artGrid');
  if (!container) return;

  container.innerHTML = artGalleryItems.map((item, index) => {
    return `
      <article class="pin-card art-card" data-index="${index}" onclick="openLightbox('art', ${index})" role="button" tabindex="0" aria-label="View ${escapeHtml(item.title)}">
        <div class="pin-img-wrap">
          <img src="${item.file}" alt="${escapeHtml(item.title)}" class="pin-img" loading="lazy" decoding="async">
          <div class="pin-overlay">
            <div class="pin-top-row">
              <span class="pin-badge" style="border-color:rgba(216,180,254,0.5); color:#d8b4fe;">${item.badge}</span>
              <button class="pin-zoom-btn" onclick="event.stopPropagation(); openLightbox('art', ${index});" aria-label="Preview full size" title="Expand preview">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </button>
            </div>
            <div class="pin-center">
              <button class="pin-like-btn" onclick="event.stopPropagation(); togglePinLike(this);" aria-label="Like artwork" title="Like">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="like-num">${item.likes}</span>
              </button>
            </div>
            <div class="pin-bottom">
              <div class="pin-title">${escapeHtml(item.title)}</div>
              <div class="pin-sub">2D Art Archive · Click to expand ↗</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  updateArtGalleryVisibility();
}

function updateArtGalleryVisibility() {
  const cards = document.querySelectorAll('#artGrid .art-card');
  const toggleBtn = document.getElementById('btnToggleArt');
  const textSpan = document.getElementById('btnToggleArtText');
  const countSpan = document.getElementById('btnToggleArtCount');

  activeVisibleIndicesArt = [];
  const total = cards.length;
  const visibleLimit = isExpandedArt ? total : Math.min(INITIAL_VISIBLE_COUNT, total);

  cards.forEach((card, idx) => {
    if (idx < visibleLimit) {
      card.style.display = '';
      if (isExpandedArt && idx >= INITIAL_VISIBLE_COUNT) {
        card.classList.add('pin-revealed');
      }
      activeVisibleIndicesArt.push(idx);
    } else {
      card.style.display = 'none';
      card.classList.remove('pin-revealed');
    }
  });

  if (toggleBtn) {
    if (total <= INITIAL_VISIBLE_COUNT) {
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-flex';
      if (!isExpandedArt) {
        const remaining = total - INITIAL_VISIBLE_COUNT;
        toggleBtn.classList.remove('is-expanded');
        if (textSpan) textSpan.textContent = 'Show More Art & Sketches';
        if (countSpan) {
          countSpan.textContent = `+${remaining}`;
          countSpan.style.display = '';
        }
      } else {
        toggleBtn.classList.add('is-expanded');
        if (textSpan) textSpan.textContent = 'Show Less';
        if (countSpan) countSpan.style.display = 'none';
      }
    }
  }
}

window.toggleArtExpand = function() {
  isExpandedArt = !isExpandedArt;
  updateArtGalleryVisibility();
  if (!isExpandedArt) {
    const section = document.getElementById('art');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ==========================================
// 5. UNIVERSAL LIGHTBOX MODAL CONTROLS
// ==========================================
function initCreatorLightbox() {
  document.addEventListener('keydown', (e) => {
    const lightboxModal = document.getElementById('lightboxModal');
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });
}

function getGalleryArray(type) {
  if (type === 'main') return mainGalleryItems;
  if (type === 'ml') return mlGalleryItems;
  if (type === 'art') return artGalleryItems;
  if (type === 'photo') return photoGalleryItems;
  return mainGalleryItems;
}

function getVisibleIndices(type) {
  if (type === 'main') return activeVisibleIndicesMain;
  if (type === 'ml') return activeVisibleIndicesMl;
  if (type === 'art') return activeVisibleIndicesArt;
  if (type === 'photo') return activeVisibleIndicesPhoto;
  return activeVisibleIndicesMain;
}

window.openLightbox = function(type, index) {
  const lightboxModal = document.getElementById('lightboxModal');
  if (!lightboxModal) return;
  activeGalleryType = type;
  currentLightboxIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.closeLightboxOnBackdrop = function(e) {
  const lightboxModal = document.getElementById('lightboxModal');
  if (e.target === lightboxModal) {
    closeLightbox();
  }
};

window.prevLightbox = function() {
  const list = getVisibleIndices(activeGalleryType);
  if (!list.length) return;
  const pos = list.indexOf(currentLightboxIndex);
  if (pos > 0) {
    currentLightboxIndex = list[pos - 1];
  } else {
    currentLightboxIndex = list[list.length - 1];
  }
  updateLightboxContent();
};

window.nextLightbox = function() {
  const list = getVisibleIndices(activeGalleryType);
  if (!list.length) return;
  const pos = list.indexOf(currentLightboxIndex);
  if (pos !== -1 && pos < list.length - 1) {
    currentLightboxIndex = list[pos + 1];
  } else {
    currentLightboxIndex = list[0];
  }
  updateLightboxContent();
};

function updateLightboxContent() {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  if (!lightboxImg || !lightboxTitle || !lightboxCounter) return;

  const items = getGalleryArray(activeGalleryType);
  const visibleList = getVisibleIndices(activeGalleryType);
  const item = items[currentLightboxIndex];
  if (!item) return;

  lightboxImg.src = item.file;
  lightboxImg.alt = item.title;
  lightboxTitle.textContent = item.title + (item.badge ? ' (' + item.badge + ')' : '');
  const currentPos = visibleList.indexOf(currentLightboxIndex) + 1;
  lightboxCounter.textContent = (currentPos > 0 ? currentPos : 1) + ' / ' + visibleList.length;
}

window.togglePinLike = function(btn) {
  const isLiked = btn.classList.toggle('liked');
  const numSpan = btn.querySelector('.like-num');
  let num = parseInt(numSpan.textContent, 10) || 0;
  num = isLiked ? num + 1 : num - 1;
  numSpan.textContent = num;
};

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ==========================================
// 6. SCROLL PLAYHEAD & TIMECODE CLOCK
// ==========================================
function initScrollPlayhead() {
  const playhead = document.getElementById('playhead');
  if (!playhead) return;

  function onScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
    playhead.style.width = pct + '%';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initTimecodeClock() {
  const tcReadout = document.getElementById('tcReadout');
  if (!tcReadout) return;
  const startTime = performance.now();

  function pad(n) { return String(n).padStart(2, '0'); }

  function tickClock() {
    const elapsedMs = performance.now() - startTime;
    const totalFrames = Math.floor(elapsedMs / (1000 / 24));
    const ff = totalFrames % 24;
    const totalSeconds = Math.floor(totalFrames / 24);
    const ss = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const mm = totalMinutes % 60;
    const hh = Math.floor(totalMinutes / 60);
    tcReadout.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    requestAnimationFrame(tickClock);
  }
  requestAnimationFrame(tickClock);
}
