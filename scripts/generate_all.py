import os
import sys

# Add scripts directory to path
sys.path.append(r'e:/sopify/scripts')
from poster_engine import build_poster

CONFIGS = [
    # 1. Watch 1 (Chain Edition) - Apex 3D Wheel Rim Solid Steel Chain
    {
        'name': 'Apex Rim Chain Edition',
        'brand': 'MUBAR APEX',
        'tagline': 'AUTOMOTIVE KINETIC LUXURY',
        'title_line1': 'KINETIC RACING WHEEL',
        'title_line2': 'SOLID STEEL CHAIN',
        'subtitle': '3D SPINNING ROTOR | BREMBO CALIPER',
        'subtitle2': 'SOLID STAINLESS STEEL BRACELET',
        'price': 2499,
        'hero_image': r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-02.jpeg',
        'hero_x': 385,
        'hero_y': 238,
        'hero_h': 440,
        'swatches': [
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-02.jpeg', 'RED', (220, 40, 40)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-04.jpeg', 'BLUE', (30, 80, 200)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-06.jpeg', 'GREEN', (40, 180, 50)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-09.jpeg', 'YELLOW', (210, 160, 30)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-10.jpeg', 'TURBO', (70, 70, 70)),
        ],
        'zoom_cards': [
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-02.jpeg', (240, 240, 560, 560), 'SPINNING ROTOR', 'Freely Spins 360°'),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-02.jpeg', (410, 270, 640, 490), 'BREMBO CALIPER', 'Drilled Brake Rotor'),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-02.jpeg', (340, 540, 480, 760), 'STEEL BRACELET', 'Solid Link Chain'),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-02.jpeg', (520, 310, 660, 480), 'PREMIUM CASE', 'Matte Black Finish')
        ],
        'features': [
            ('SPINNING ROTOR', 'Freely Spins 360°'),
            ('SOLID STEEL CHAIN', 'Durable PVD Black'),
            ('BREMBO CALIPER', 'Bold Racing Detail'),
            ('WATER RESISTANT', 'Daily Splash Proof')
        ],
        'out_public': r'e:/sopify/public/images/posters/poster_apex_chain.jpg',
        'out_watch': r'e:/sopify/images/all-watches/watch 1/poster_apex_chain.jpg'
    },

    # 2. Watch 1 (Strap Edition) - Apex 3D Wheel Rim Silicone Sport Strap
    {
        'name': 'Apex Rim Strap Edition',
        'brand': 'MUBAR APEX',
        'tagline': 'LIGHTWEIGHT RACING TIMEPIECE',
        'title_line1': 'KINETIC RACING WHEEL',
        'title_line2': 'SILICONE SPORT STRAP',
        'subtitle': '3D SPINNING ROTOR | BREMBO CALIPER',
        'subtitle2': 'FLEXIBLE SPORT SILICONE STRAP',
        'price': 2199,
        'hero_image': r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-01.jpeg',
        'hero_x': 385,
        'hero_y': 238,
        'hero_h': 440,
        'swatches': [
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-01.jpeg', 'RED', (220, 40, 40)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-03.jpeg', 'GREEN', (40, 180, 50)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-05.jpeg', 'BLUE', (30, 80, 200)),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-07.jpeg', 'YELLOW', (210, 160, 30)),
        ],
        'zoom_cards': [
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-01.jpeg', (240, 240, 560, 560), 'SPINNING ROTOR', 'Freely Spins 360°'),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-01.jpeg', (410, 270, 640, 490), 'BREMBO CALIPER', 'Racing Brake Rotor'),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-01.jpeg', (340, 540, 480, 760), 'SILICONE STRAP', 'Flexible Sport Grip'),
            (r'e:/sopify/public/images/products/mubar-apex-wheel-rim/angle-01.jpeg', (520, 310, 660, 480), 'PREMIUM CASE', 'Lightweight Build')
        ],
        'features': [
            ('SPINNING ROTOR', 'Freely Spins 360°'),
            ('SILICONE STRAP', 'Lightweight & Flexible'),
            ('BREMBO CALIPER', 'Bold Racing Detail'),
            ('SHOCK RESISTANT', 'Made for Daily Use')
        ],
        'out_public': r'e:/sopify/public/images/posters/poster_apex_strap.jpg',
        'out_watch': r'e:/sopify/images/all-watches/watch 1/poster_apex_strap.jpg'
    },

    # 3. Watch (Executive Chronograph - watch)
    {
        'name': 'Executive Multi-Dial Chronograph',
        'brand': 'MUBAR EXECUTIVE',
        'tagline': "PREMIUM MEN'S WATCH",
        'title_line1': 'EXECUTIVE CHRONO',
        'title_line2': 'PANORAMIC CALENDAR',
        'subtitle': 'TRIPLE SUB-DIALS | DATE ARC',
        'subtitle2': 'HEAVY OYSTER SOLID STEEL',
        'price': 2199,
        'hero_image': r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (1).jpeg',
        'hero_x': 385,
        'hero_y': 238,
        'hero_h': 440,
        'swatches': [
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (1).jpeg', 'GOLD/BLACK', (180, 140, 40)),
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.17 PM (1).jpeg', 'SILVER/BLACK', (100, 100, 100)),
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (2).jpeg', 'GOLD/BLUE', (40, 80, 160)),
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.17 PM (2).jpeg', 'SILVER/BLUE', (60, 100, 180)),
        ],
        'zoom_cards': [
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (1).jpeg', (250, 250, 550, 550), 'TRIPLE SUB-DIALS', 'Multi-Dial Chrono'),
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (1).jpeg', (380, 280, 560, 480), 'PANORAMIC DATE', 'Curved Calendar Arc'),
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (1).jpeg', (330, 540, 490, 770), 'STEEL BRACELET', 'Solid Oyster Links'),
            (r'e:/sopify/images/all-watches/watch/WhatsApp Image 2026-10-04 at 6.45.16 PM (1).jpeg', (520, 310, 660, 490), 'DUAL PUSHERS', 'Precision Controls')
        ],
        'features': [
            ('QUARTZ MOVEMENT', 'Accurate Chrono Calibre'),
            ('PANORAMIC DATE', 'Curved Calendar Window'),
            ('SOLID STEEL OYSTER', 'Heavy Link Bracelet'),
            ('WATER RESISTANT', 'Daily Rain & Splash Proof')
        ],
        'out_public': r'e:/sopify/public/images/posters/poster_watch_executive.jpg',
        'out_watch': r'e:/sopify/images/all-watches/watch/poster_watch_executive.jpg'
    },

    # 4. Watch 3 (Motorsport Chronograph - watch 3)
    {
        'name': 'Grand Prix Motorsport Chronograph',
        'brand': 'MUBAR RACING',
        'tagline': 'FORMULA 1 MOTORSPORT EDITION',
        'title_line1': 'GRAND PRIX RACING',
        'title_line2': 'SPEEDOMETER CHRONO',
        'subtitle': 'ASPHALT TEXTURE | RALLY GAUGES',
        'subtitle2': 'RUGGED SOLID STEEL CHASSIS',
        'price': 2299,
        'hero_image': r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.06 PM.jpeg',
        'hero_x': 385,
        'hero_y': 238,
        'hero_h': 440,
        'swatches': [
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.06 PM.jpeg', 'RALLY RED', (220, 40, 40)),
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.07 PM (1).jpeg', 'ALL BLACK', (40, 40, 40)),
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.07 PM (2).jpeg', 'TWO-TONE', (180, 140, 40)),
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.07 PM (3).jpeg', 'ROYAL BLUE', (30, 80, 190)),
        ],
        'zoom_cards': [
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.06 PM.jpeg', (240, 240, 560, 560), 'ASPHALT DIAL', 'Multi-Layer Texture'),
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.06 PM.jpeg', (300, 180, 520, 360), 'RALLY GAUGES', 'Speedometer Accents'),
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.06 PM.jpeg', (330, 540, 490, 770), 'STEEL BRACELET', 'Solid Link Chassis'),
            (r'e:/sopify/images/all-watches/watch 3/WhatsApp Image 2026-10-04 at 6.46.06 PM.jpeg', (520, 310, 660, 490), 'RACING PUSHERS', 'Dual Chrono Controls')
        ],
        'features': [
            ('SPEEDOMETER DIAL', 'Cockpit Instrumentation'),
            ('OVERSIZED 12', 'Bold Rally Numeral'),
            ('TACHYMETER SCALE', 'Speed Calculation'),
            ('SOLID STEEL CHASSIS', 'Heavy & Rugged Build')
        ],
        'out_public': r'e:/sopify/public/images/posters/poster_watch3_motorsport.jpg',
        'out_watch': r'e:/sopify/images/all-watches/watch 3/poster_watch3_motorsport.jpg'
    },

    # 5. Watch 4 (Octa Geometric - watch 4)
    {
        'name': 'Octa Geometric Tachymeter Chronograph',
        'brand': 'MUBAR OCTA',
        'tagline': 'ROYAL OAK HOMAGE EDITION',
        'title_line1': 'OCTA TACHYMETER',
        'title_line2': 'ROYAL GEOMETRIC',
        'subtitle': 'OCTAGONAL BEZEL | TAPISSERIE',
        'subtitle2': 'INTEGRATED STAINLESS STEEL',
        'price': 2999,
        'hero_image': r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM (2).jpeg',
        'hero_x': 385,
        'hero_y': 238,
        'hero_h': 440,
        'swatches': [
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM (2).jpeg', 'ROYAL BLUE', (30, 70, 160)),
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM.jpeg', 'ARCTIC WHITE', (160, 160, 160)),
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.04 PM (1).jpeg', 'STEALTH BLACK', (40, 40, 40)),
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.04 PM (2).jpeg', 'TWO-TONE', (180, 140, 40)),
        ],
        'zoom_cards': [
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM (2).jpeg', (300, 300, 700, 700), 'OCTA BEZEL', 'Faceted Geometric Edge'),
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM (2).jpeg', (350, 350, 650, 650), 'TAPISSERIE PATTERN', 'Textured Waffle Dial'),
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM (2).jpeg', (380, 650, 620, 960), 'INTEGRATED LINKS', 'Solid Steel Taper'),
            (r'e:/sopify/images/all-watches/watch 4/WhatsApp Image 2026-10-04 at 6.31.03 PM (2).jpeg', (650, 400, 850, 620), 'CURVED DATE', 'Crown Protectors')
        ],
        'features': [
            ('OCTAGONAL BEZEL', 'Faceted Geometry'),
            ('TAPISSERIE DIAL', 'Waffle Texture Pattern'),
            ('INTEGRATED BRACELET', 'Solid Stainless Steel'),
            ('DAILY WATERPROOF', 'Splash & Rain Resistant')
        ],
        'out_public': r'e:/sopify/public/images/posters/poster_watch4_octa.jpg',
        'out_watch': r'e:/sopify/images/all-watches/watch 4/poster_watch4_octa.jpg'
    },

    # 6. Watch 5 (Yacht-Master Oysterflex - watch 5)
    {
        'name': 'MUBAR Yacht-Master Oysterflex',
        'brand': 'MUBAR HOROLOGY',
        'tagline': 'VIP FLAGSHIP COLLECTION',
        'title_line1': 'YACHT-MASTER',
        'title_line2': 'OYSTERFLEX EDITION',
        'subtitle': 'MATTE CERAMIC BEZEL | CYCLOPS DATE',
        'subtitle2': 'HIGH-DENSITY ELASTOMER STRAP',
        'price': 3999,
        'hero_image': r'e:/sopify/public/images/all-watches/watch 5/cutout_gold.png',
        'hero_x': 385,
        'hero_y': 240,
        'hero_h': 220,
        'sw_h': 80,
        'swatches': [
            (r'e:/sopify/public/images/all-watches/watch 5/cutout_gold.png', '18K GOLD', (180, 140, 40)),
            (r'e:/sopify/public/images/all-watches/watch 5/cutout_silver.png', 'PLATINUM', (120, 120, 120)),
        ],
        'zoom_cards': [
            (r'e:/sopify/public/images/all-watches/watch 5/01_gold_front_studio.jpg', (300, 300, 720, 720), 'CERAMIC BEZEL', 'Raised Matte Numerals'),
            (r'e:/sopify/public/images/all-watches/watch 5/01_gold_front_studio.jpg', (550, 450, 750, 650), 'DATE CYCLOPS', '2.5x Magnification'),
            (r'e:/sopify/public/images/all-watches/watch 5/01_gold_front_studio.jpg', (400, 750, 620, 980), 'OYSTERFLEX STRAP', 'High-Density Elastomer'),
            (r'e:/sopify/public/images/all-watches/watch 5/01_gold_front_studio.jpg', (680, 480, 850, 650), 'LUXURY CLASP', '18K Gold Finish')
        ],
        'features': [
            ('MATTE CERAMIC BEZEL', '60-Min Bidirectional'),
            ('CYCLOPS DATE', 'Magnifying Calendar'),
            ('OYSTERFLEX STRAP', 'High-Density Elastomer'),
            ('1-YEAR WARRANTY', 'VIP Flagship Grade')
        ],
        'out_public': r'e:/sopify/public/images/posters/poster_watch5_yachtmaster.jpg',
        'out_watch': r'e:/sopify/images/all-watches/watch 5/poster_watch5_yachtmaster.jpg'
    }
]

for cfg in CONFIGS:
    build_poster(cfg)

print("All 6 watch posters built successfully using REAL watch photos!")
