import { EmergencyLibraryTopic } from '../types';

export const EMERGENCY_LIBRARY: EmergencyLibraryTopic[] = [
  {
    id: 'snake_bite',
    titleEn: 'Snake Bite',
    titleUr: 'سانپ کا کاٹنا',
    category: 'Poisoning & Environmental',
    iconName: 'Zap',
    descriptionEn: 'Poisonous or non-poisonous snake bite in rural or urban outdoor areas.',
    descriptionUr: 'دیہاتی یا شہری علاقوں میں سانپ کا کاٹنا۔',
    stepsEn: [
      'Keep the victim completely calm, still, and sitting down. Panic speeds up venom circulation.',
      'Immobilize the bitten limb below the level of the heart using a splint or rolled cloth.',
      'Remove any tight rings, watches, or restrictive clothing around the bitten area before swelling starts.',
      'Wash the wound gently with clean water and soap if available. Cover loosely with a clean cloth.',
      'Call Rescue 1122 immediately or arrange urgent transport to a major hospital with Anti-Snake Venom (ASV).'
    ],
    stepsUr: [
      'مریض کو بالکل پرسکون، ساکت اور بٹھا کر رکھیں۔ گھبراہٹ سے زہر تیزی سے پھیلتا ہے۔',
      'متاثرہ حصے کو دل کی سطح سے نیچے رکھیں اور ہلنے جلنے نہ دیں۔',
      'انگوٹھی، گھڑی یا تنگ کپڑے سوجن شروع ہونے سے پہلے اتار دیں۔',
      'زخم کو صاف پانی سے ہلکا سا دھوئین اور صاف کپڑے سے ڈھانپ دیں۔',
      'فوری طور پر ریسکیو 1122 کو کال کریں یا اینٹی سنیک وینم (ASV) والے اسپتال منتقل کریں۔'
    ],
    doNotsEn: [
      'Do NOT cut the wound or try to suck out venom with your mouth.',
      'Do NOT apply a tight tourniquet, rope, or band that stops blood flow completely.',
      'Do NOT apply ice, cold water, herbs, or kerosene oil to the wound.',
      'Do NOT give the victim tea, coffee, alcohol, or painkiller medications.'
    ],
    doNotsUr: [
      'زخم پر کٹ نہ لگائیں اور نہ ہی منہ سے زہر چوسنے کی کوشش کریں۔',
      'خت کپڑا، رسی یا ٹورنیکیٹ ہرگز نہ باندھیں جس سے خون کی گردش رک جائے۔',
      'برف، جڑی بوٹیاں یا مٹی کا تیل نہ لگائیں۔',
      'مریض کو چائے، کافی یا درد کش ادویات نہ دیں۔'
    ],
    call1122Immediate: true,
    callReasonEn: 'Snake venom can cause rapid respiratory failure or severe tissue damage requiring urgent Anti-Snake Venom (ASV).',
    callReasonUr: 'سانپ کا زہر جلدی پھیلاؤ اور سانس کی بندش کا باعث بن سکتا ہے، جس کے لیے اینٹی وینم کی فوری ضرورت ہوتی ہے۔'
  },
  {
    id: 'electric_shock',
    titleEn: 'Electric Shock',
    titleUr: 'بجلی کا جھٹکا',
    category: 'Trauma & Environmental',
    iconName: 'Zap',
    descriptionEn: 'High or low voltage electrical contact from appliances, broken wires, or water exposure.',
    descriptionUr: 'کھلے تاروں، پانی یا بجلی کے آلات سے شدید کرنٹ لگنا۔',
    stepsEn: [
      'DO NOT touch the victim directly if they are still in contact with the live electrical source.',
      'Immediately switch off the main power breaker or unplug the electrical supply if safe to do so.',
      'If power cannot be cut, use a dry, non-conductive object (dry wooden stick, dry rubber mat) to separate victim from wire.',
      'Check breathing and consciousness once safely away from the wire.',
      'If not breathing, begin CPR chest compressions immediately and dial Rescue 1122.'
    ],
    stepsUr: [
      'اگر متاثرہ شخص اب بھی تار سے جڑا ہے تو اسے ننگے ہاتھوں سے ہرگز نہ چھوئیں۔',
      'سب سے پہلے بجلی کا مین سوئچ (بریکر) بند کریں۔',
      'اگر سوئچ بند نہ ہو سکے تو خشک لکڑی کے ڈنڈے یا پلاسٹک کی چیز سے تار کو ہٹائیں۔',
      'بجلی سے الگ کرنے کے بعد مریض کے سانس اور ہوش کو چیک کریں۔',
      'اگر سانس نہ آ رہا ہو تو فوری CPR شروع کریں اور 1122 پر کال کریں۔'
    ],
    doNotsEn: [
      'Do NOT use wet objects, metal rods, or bare hands to rescue the person.',
      'Do NOT apply water or ice directly to electrical burn entry/exit spots.',
      'Do NOT give food or water if the person is semi-conscious or dazed.'
    ],
    doNotsUr: [
      'گیلی اشیاء، لوہے کے ڈنڈے یا ننگے ہاتھ استعمال نہ کریں۔',
      'جلنے کے نشانات پر پانی یا برف نہ لگائیں۔',
      'بے ہوشی کی حالت میں پانی یا خوراک نہ دیں۔'
    ],
    call1122Immediate: true,
    callReasonEn: 'Electric shock can cause silent heart arrhythmia, internal burns, or muscle collapse needing hospital monitoring.',
    callReasonUr: 'بجلی کا جھٹکا دل کی دھڑکن بند کرنے اور اندرونی جلاؤ کا سبب بنتا ہے۔'
  },
  {
    id: 'heatstroke',
    titleEn: 'Heatstroke / Sunstroke',
    titleUr: 'لو لگنا / ہیٹ اسٹروک',
    category: 'Environmental',
    iconName: 'Sun',
    descriptionEn: 'Extreme summer heat exposure resulting in confusion, fainting, hot dry skin, or rapid fever.',
    descriptionUr: 'شدید گرمی اور دھوپ میں تیز بخار، بے ہوشی اور گرم جلد۔',
    stepsEn: [
      'Immediately move the person to a cool, shaded area or an air-conditioned room.',
      'Loosen or remove excessive heavy clothing to allow cooling.',
      'Cool the body rapidly by splashing cool (not ice freezing) water over the skin and fanning vigorously.',
      'Place ice packs or cold damp clothes under the armpits, neck, and groin area.',
      'If conscious and alert, give slow sips of cool water or ORS (Oral Rehydration Solution).'
    ],
    stepsUr: [
      'مریض کو فوری طور پر سائے، ٹھنڈی جگہ یا پنکھے/اے سی کے نیچے منتقل کریں۔',
      'فالتو کپڑے اتار دیں یا ڈھیلے کر دیں۔',
      'جسم پر ٹھنڈا پانی چھڑکیں اور پنکھا جھالیں۔',
      'بغلوں، گردن اور رانوں کے پاس ٹھنڈی پٹیاں یا برف رکھیں۔',
      'اگر مریض ہوش میں ہو تو او آر ایس (ORS) یا ٹھنڈا پانی گھونٹ گھونٹ کر کے پلائیں۔'
    ],
    doNotsEn: [
      'Do NOT pour icy water quickly over a semi-conscious person.',
      'Do NOT force liquids into the mouth if the victim is vomiting or unconscious.',
      'Do NOT give aspirin, paracetamol, or fever medicines (heatstroke is not an infection fever).'
    ],
    doNotsUr: [
      'بے ہوش مریض کے منہ میں زبردستی پانی نہ ڈالیں۔',
      'بخار کی عام ادویات (پیراسیٹامول وغیرہ) نہ دیں، یہ ہیٹ اسٹروک میں کام نہیں کرتی۔'
    ],
    call1122Immediate: true,
    callReasonEn: 'Heatstroke is a medical emergency that can lead to brain swelling, organ damage, or coma without rapid cooling.',
    callReasonUr: 'ہیٹ اسٹروک سے دماغی سوجن اور اعضاء کے فلج ہونے کا خطرہ ہوتا ہے۔'
  },
  {
    id: 'choking_adult',
    titleEn: 'Choking (Adult & Child)',
    titleUr: 'سانس کی نالی میں کھانا اٹکنا',
    category: 'Airway & Breathing',
    iconName: 'Wind',
    descriptionEn: 'Blockage of windpipe by food, object, or liquid preventing breathing or coughing.',
    descriptionUr: 'خوراک یا اشیاء کی وجہ سے سانس کی نالی کی مکمل یا جزوی بندش۔',
    stepsEn: [
      'If the person is coughing forcefully, encourage them to keep coughing. Do NOT interfere.',
      'If they CANNOT speak, breathe, or cough (silent choking), stand behind them.',
      'Give 5 firm back blows between the shoulder blades with the heel of your hand.',
      'If back blows fail, perform abdominal thrusts (Heimlich maneuver): place fist above navel and pull inward & upward 5 times.',
      'Repeat alternating 5 back blows and 5 abdominal thrusts until object clears or person loses consciousness.'
    ],
    stepsUr: [
      'اگر مریض کھانس رہا ہے تو اسے مزید کھانسنے دیں۔ مداخلت نہ کریں۔',
      'اگر سانس یا آواز بالکل بند ہو تو مریض کے پیچھے کھڑے ہوں۔',
      'دستی کی ہتھیلی سے دونوں کندھوں کے درمیان 5 بار مضبوطی سے تھپکی دیں۔',
      'اگر فائدہ نہ ہو تو پیٹ پر دباؤ (ہیملیچ طریقہ) دیں: ناف کے اوپر مٹھی رکھ کر اوپر اور اندر کی طرف 5 بار دبائیں۔',
      'جب تک چیز باہر نہ نکلے یہ عمل دہراتے رہیں۔'
    ],
    doNotsEn: [
      'Do NOT perform blind finger sweeps inside the mouth; you may push the object deeper down.',
      'Do NOT give water to swallow while choked.',
      'Do NOT perform abdominal thrusts on pregnant women or infants under 1 year (use chest thrusts).'
    ],
    doNotsUr: [
      'منہ میں اندھا دھند انگلیاں نہ ڈالیں، اس سے چیز مزید اندر جا سکتی ہے۔',
      'دم گھٹنے کے دوران پانی نہ پلائیں۔',
      'حاملہ خواتین یا چھوٹے بچوں پر پیٹ کے دباؤ کے بجائے چھاتی کا دباؤ دیں۔'
    ],
    call1122Immediate: true,
    callReasonEn: 'Severe choking deprives the brain of oxygen within 3-4 minutes causing brain damage or cardiac arrest.',
    callReasonUr: 'آکسیجن کی کمی سے 3 سے 4 منٹ میں دماغ کو ناقابل تلافی نقصان پہنچ سکتا ہے۔'
  },
  {
    id: 'heavy_bleeding',
    titleEn: 'Heavy Bleeding Control',
    titleUr: 'شدید خون کا بہنا',
    category: 'Wounds & Circulation',
    iconName: 'Droplet',
    descriptionEn: 'Arterial or severe venous bleeding from deep cuts, glass, knives, or gunshot trauma.',
    descriptionUr: 'گہرے کٹ، شیشے یا حادثے سے تیز رفتار خون بہنا۔',
    stepsEn: [
      'Apply direct, firm pressure over the bleeding wound using a clean cloth, towel, or sterile gauze.',
      'Maintain continuous firm pressure with your hands for at least 10–15 minutes without lifting the cloth.',
      'Elevate the injured bleeding limb above heart level if no bone fracture is suspected.',
      'If blood soaks through, add another cloth layer directly on top. Do NOT remove the original cloth.',
      'Once bleeding slows, secure tightly with a bandage roll and call Rescue 1122.'
    ],
    stepsUr: [
      'زخم کے اوپر صاف کپڑا یا پٹی رکھ کر ہاتھوں سے مسلسل اور مضبوط دباؤ ڈالیں۔',
      'کم از کم 10 سے 15 منٹ تک بغیر کپڑا اٹھائے مسلسل دباؤ برقرار رکھیں۔',
      'اگر ہڈی ٹوٹنے کا خدشہ نہ ہو تو متاثرہ ہاتھ یا پاؤں کو دل کی سطح سے اونچا اٹھائیں۔',
      'اگر خون کپڑے سے باہر آئے تو پہلا کپڑا ہٹائے بغیر اس کے اوپر مزید کپڑا رکھیں۔',
      'خون رکنے پر پٹی مضبوطی سے باندھیں اور 1122 کو اطلاع دیں۔'
    ],
    doNotsEn: [
      'Do NOT remove embedded objects (e.g. glass piece or knife); press around them instead.',
      'Do NOT remove the first blood-soaked bandage layer as it breaks forming blood clots.',
      'Do NOT apply dirt, cow dung, ashes, or coffee powder to bleeding wounds.'
    ],
    doNotsUr: [
      'زخم میں پیوست شیشہ یا چھری باہر نہ نکالیں، اس کے سائیڈوں پر دباؤ دیں۔',
      'خون سے لت پت پہلا کپڑا نہ ہٹائیں۔',
      'زخم پر مٹی، راکھ یا ہلدی نہ چھڑکیں۔'
    ],
    call1122Immediate: true,
    callReasonEn: 'Uncontrolled heavy arterial blood loss leads to fatal hemorrhagic shock within minutes.',
    callReasonUr: 'زیادہ خون بہنے سے مریض فوری شاک میں جا سکتا ہے۔'
  },
  {
    id: 'burns_firstaid',
    titleEn: 'Burns & Scalds',
    titleUr: 'جلنے کا ابتدائی علاج',
    category: 'Skin & Thermal',
    iconName: 'Flame',
    descriptionEn: 'Thermal burns from hot water, oil, fire, steam, or heated metal surfaces.',
    descriptionUr: 'گرم پانی، چائے، تیل یا آگ سے جلنا۔',
    stepsEn: [
      'Immediately cool the burn wound with cool running tap water for at least 10–20 minutes.',
      'Gently remove rings, watches, shoes, or tight clothing near the burned area before swelling develops.',
      'Cover the burn loosely with clean cling wrap (plastic film) or a clean non-fluffy cloth.',
      'Keep the burn clean and dry. Offer water to drink if victim is conscious.',
      'Seek medical treatment if burn is larger than victim’s palm or on face, hands, or groin.'
    ],
    stepsUr: [
      'جلنے کی جگہ پر فوری طور پر کم از کم 10 سے 20 منٹ تک نل کا ٹھنڈا (عام) پانی بہائیں۔',
      'سوجن انے سے پہلے زیورات، گھڑی اور تنگ کپڑے احتیاط سے اتار دیں۔',
      'زخم کو صاف پلاسٹک ریپ یا صاف کپڑے سے ہلکا سا ڈھانپیں۔',
      'مریض کو ہوش میں ہونے پر پانی پلائیں۔',
      'اگر زخم ہتھیلی سے بڑا ہو یا چہرے پر ہو تو فوری اسپتال لے جائیں۔'
    ],
    doNotsEn: [
      'Do NOT apply ice, ice water, butter, toothpaste, oil, or ghee to the burn.',
      'Do NOT pop, burst, or prick fluid blisters.',
      'Do NOT pull away clothing that is burnt and stuck directly into melted skin.'
    ],
    doNotsUr: [
      'ٹوپتھ پیسٹ، مکھن، تیل، گھی یا برف ہرگز نہ لگائیں۔',
      'جلنے کے چھالوں کو نہ پھوڑیں۔',
      'جلد کے ساتھ چپکے ہوئے کپڑے کو زبردستی نہ کھینچیں۔'
    ],
    call1122Immediate: false,
    callReasonEn: 'Call 1122 immediately for severe third-degree burns, electrical/chemical burns, or facial involvement.',
    callReasonUr: 'چہرے کے جلنے، یا تیسرے درجے کے شدید زخم کی صورت میں 1122 پر کال کریں۔'
  }
];
