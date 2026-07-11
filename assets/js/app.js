/* ============================================================
   FitForge AI Planner — app.js
   ============================================================ */

/* ── DATA ── */
const EXERCISES = [
  { id:1, name:'Barbell Bench Press', muscle:'chest', muscleDisplay:'Chest', difficulty:'intermediate', location:['gym'], image:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80', videoId:'SCVCLChPQFY', description:'The king of chest exercises. Builds overall chest mass and anterior deltoid strength.', injuries:['shoulder'], instructions:['Lie flat, grip bar slightly wider than shoulders','Unrack and lower to mid-chest with control','Press explosively back to lockout','Keep feet flat and back slightly arched'], tips:['Don\'t bounce the bar','Keep elbows at ~45°','Full range of motion for best results'] },
  { id:2, name:'Pull-Up / Chin-Up', muscle:'back', muscleDisplay:'Back', difficulty:'intermediate', location:['gym','home'], image:'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&h=300&fit=crop&q=80', videoId:'eGo4IYlbE5g', description:'Best upper-back compound movement. Overhand builds width; underhand targets biceps.', injuries:[], instructions:['Hang with arms fully extended','Pull chest to bar, driving elbows down','Lower with control to full hang','Cross ankles to reduce swinging'], tips:['Squeeze shoulder blades at the top','Add weight when you can do 12+ reps','Neutral grip is easiest on wrists'] },
  { id:3, name:'Barbell Back Squat', muscle:'legs', muscleDisplay:'Legs', difficulty:'advanced', location:['gym'], image:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop&q=80', videoId:'ultWZbUMPL8', description:'The foundational lower-body movement for quad, glute and hamstring development.', injuries:['knee','back'], instructions:['Bar on upper traps, feet shoulder-width','Brace core, push knees out as you descend','Squat to parallel or below','Drive through heels to stand'], tips:['Don\'t let knees cave in','Keep chest tall throughout','Film yourself to check depth'] },
  { id:4, name:'Overhead Press', muscle:'shoulders', muscleDisplay:'Shoulders', difficulty:'intermediate', location:['gym'], image:'https://images.unsplash.com/photo-1567598508481-65a7a5553e10?w=400&h=300&fit=crop&q=80', videoId:'2yjwXTZQDDI', description:'Primary shoulder mass builder targeting the anterior and lateral deltoids plus triceps.', injuries:['shoulder'], instructions:['Hold bar at shoulder level, elbows forward','Press bar straight up past face','Lock out overhead, squeeze glutes','Lower with control to starting position'], tips:['Engage your core throughout','Don\'t hyperextend the lower back','Use a slightly wider grip if wrists ache'] },
  { id:5, name:'Romanian Deadlift', muscle:'legs', muscleDisplay:'Legs / Hamstrings', difficulty:'intermediate', location:['gym'], image:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&q=80', videoId:'JCXUYuzwNEc', description:'Targets the hamstrings and glutes through a hip hinge with minimal knee bend.', injuries:['back'], instructions:['Stand hip-width, bar against thighs','Hinge at hips, pushing them back','Lower until hamstring stretch is felt','Drive hips forward to stand tall'], tips:['Keep bar close to legs the entire way','Don\'t round your lower back','Stop when hips can no longer push back further'] },
  { id:6, name:'Dumbbell Incline Press', muscle:'chest', muscleDisplay:'Chest (Upper)', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop&q=80', videoId:'8iPEnn-ltC8', description:'Targets the upper chest to build a more complete and aesthetic chest appearance.', injuries:['shoulder'], instructions:['Set bench to 30–45 degrees','Press dumbbells from shoulder level to lockout','Lower slowly with control','Keep wrists stacked over elbows'], tips:['Lighter weight than flat press is normal','Slight squeeze at the top helps muscle activation','Don\'t let elbows flare excessively'] },
  { id:7, name:'Seated Cable Row', muscle:'back', muscleDisplay:'Back', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1590507621108-433608c97823?w=400&h=300&fit=crop&q=80', videoId:'GZbfZ033f74', description:'Builds mid-back thickness and teaches proper scapular retraction mechanics.', injuries:[], instructions:['Sit tall, grab cable handle with neutral grip','Pull handle to lower chest/upper abs','Squeeze shoulder blades at the end','Extend arms slowly back to start'], tips:['Don\'t rock back to create momentum','Initiate with your elbows, not hands','Keep chest tall throughout'] },
  { id:8, name:'Bulgarian Split Squat', muscle:'legs', muscleDisplay:'Legs / Glutes', difficulty:'intermediate', location:['gym','home'], image:'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&h=300&fit=crop&q=80', videoId:'2C-uNgKwPLE', description:'Unilateral quad and glute developer that exposes side-to-side imbalances.', injuries:['knee'], instructions:['Rear foot elevated on bench at hip height','Front foot forward enough to allow vertical shin','Lower knee toward floor with control','Drive through front heel to stand'], tips:['Start with bodyweight to learn the movement','Most weight should be on front foot','Keep torso upright for quad focus'] },
  { id:9, name:'Lateral Raise', muscle:'shoulders', muscleDisplay:'Shoulders (Side)', difficulty:'beginner', location:['gym','home'], image:'https://images.unsplash.com/photo-1616803689943-5601631c7fec?w=400&h=300&fit=crop&q=80', videoId:'3VcKaXpzqRo', description:'Isolates the medial deltoid to build shoulder width and the coveted V-taper.', injuries:['shoulder'], instructions:['Stand with dumbbells at sides','Raise arms to shoulder height with slight elbow bend','Pause briefly at the top','Lower with control for 2-3 seconds'], tips:['Use lighter weight than you think','Lead with elbows, not hands','Avoid shrugging the traps'] },
  { id:10, name:'Tricep Pushdown', muscle:'arms', muscleDisplay:'Triceps', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop&q=80', videoId:'2-LAMcpzODU', description:'Isolates all three tricep heads using a cable for constant tension throughout the range.', injuries:[], instructions:['Face cable machine, grip bar overhand','Tuck elbows in at your sides','Extend arms fully downward','Resist on the way back up slowly'], tips:['Don\'t let elbows flare or lift','Full extension at bottom for peak contraction','Rope attachment hits both heads simultaneously'] },
  { id:11, name:'Barbell Curl', muscle:'arms', muscleDisplay:'Biceps', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400&h=300&fit=crop&q=80', videoId:'kwG2ipFRgfo', description:'Classic mass builder for the biceps. Allows heavier loading than dumbbell curls.', injuries:[], instructions:['Stand with barbell using supinated grip','Curl bar toward shoulders keeping elbows back','Squeeze biceps at the top','Lower with 2-3 second negative'], tips:['Don\'t swing — use strict form','EZ-bar reduces wrist strain','Slight forward lean is acceptable at peak'] },
  { id:12, name:'Plank', muscle:'core', muscleDisplay:'Core', difficulty:'beginner', location:['gym','home'], image:'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=300&fit=crop&q=80', videoId:'ASdvN_XEl_c', description:'The foundational isometric core exercise that builds anti-extension strength and stability.', injuries:['back'], instructions:['Start in push-up position on forearms','Create straight line from head to heels','Squeeze glutes, brace abs, breathe steadily','Hold target time without compensating'], tips:['Don\'t let hips sag or pike up','Quality beats duration every time','Progress to RKC plank for added intensity'] },
  { id:13, name:'Hip Thrust', muscle:'legs', muscleDisplay:'Glutes', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=300&fit=crop&q=80', videoId:'xDmFkJxPzeM', description:'The most effective glute isolation exercise using a barbell for progressive overload.', injuries:['back'], instructions:['Upper back on bench, bar over hips with pad','Plant feet flat, hip-width apart','Drive hips up to full extension and squeeze','Lower under control without touching floor'], tips:['The pause and squeeze at the top is key','Feet position affects which glute muscles fire','Protect your hips with a pad — always'] },
  { id:14, name:'Push-Up', muscle:'chest', muscleDisplay:'Chest', difficulty:'beginner', location:['gym','home'], image:'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop&q=80', videoId:'IODxDxX7oi4', description:'The universal bodyweight pressing exercise. Effective for chest, shoulders and triceps.', injuries:['shoulder'], instructions:['Start in high plank, hands slightly wider than shoulders','Lower chest to just above floor','Keep elbows at ~45° from body','Press back up to lockout powerfully'], tips:['Keep core engaged throughout','Elevate feet for upper chest emphasis','Place hands wider for more chest; narrower for more triceps'] },
  { id:15, name:'Goblet Squat', muscle:'legs', muscleDisplay:'Legs / Quads', difficulty:'beginner', location:['gym','home'], image:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop&q=80', videoId:'MeIiIdhvXT4', description:'Beginner-friendly squat pattern that auto-corrects depth and teaches proper mechanics.', injuries:['knee'], instructions:['Hold dumbbell/kettlebell at chest','Stand feet shoulder-width, toes slightly out','Squat deep keeping chest tall and upright','Drive through heels to stand'], tips:['Elbows should push knees out at the bottom','Start with a light weight to nail technique','Great for mobility improvement too'] },
  { id:16, name:'Cable Fly', muscle:'chest', muscleDisplay:'Chest', difficulty:'intermediate', location:['gym'], image:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80', videoId:'Iwe6AmxVf7o', description:'Isolates the chest through a wide arc movement for the full peak contraction.', injuries:['shoulder'], instructions:['Set cables at chest height, step forward','Arms wide with slight elbow bend','Bring hands together in front of chest','Slowly reverse to feel the stretch'], tips:['Don\'t go too heavy — this is an isolation move','Squeeze hard at the peak','Adjust cable height for upper/mid/lower chest'] },
  { id:17, name:'Dumbbell Row', muscle:'back', muscleDisplay:'Back', difficulty:'beginner', location:['gym','home'], image:'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&h=300&fit=crop&q=80', videoId:'roCP3I_7pTM', description:'Builds unilateral back strength and allows a greater range of motion than barbell rows.', injuries:[], instructions:['Place opposite hand and knee on bench','Pull dumbbell to hip, driving elbow straight up','Squeeze back at the top','Lower with full extension at bottom'], tips:['Keep hips square to the bench','Think about driving your elbow, not lifting weight','Rotate torso slightly for more range'] },
  { id:18, name:'Leg Press', muscle:'legs', muscleDisplay:'Quads / Glutes', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&q=80', videoId:'IZxyjW7MPJQ', description:'Machine-based quad and glute builder allowing heavy loading with lower spine stress.', injuries:['knee'], instructions:['Set seat so knees are at 90° when loaded','Place feet shoulder-width at mid-plate','Press to near-lockout without locking out','Lower with control until 90° or below'], tips:['Don\'t let knees cave in on the way up','Foot position higher = more glutes; lower = more quads','Never lock knees out at the top'] },
  { id:19, name:'Face Pull', muscle:'shoulders', muscleDisplay:'Rear Delts / Rotator', difficulty:'beginner', location:['gym'], image:'https://images.unsplash.com/photo-1567598508481-65a7a5553e10?w=400&h=300&fit=crop&q=80', videoId:'rep-qVOkqgk', description:'Essential for shoulder health and rear deltoid development. Counteracts internal rotation from pressing.', injuries:[], instructions:['Set cable at face height, use rope','Pull rope to face, elbows flared at 90°','Externally rotate shoulders at end range','Return with control'], tips:['Light weight and perfect form always','One of the most important shoulder health exercises','Include this in every upper body workout'] },
  { id:20, name:'Ab Wheel Rollout', muscle:'core', muscleDisplay:'Core', difficulty:'intermediate', location:['gym','home'], image:'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=300&fit=crop&q=80', videoId:'LR9GCNkqSZo', description:'Advanced anti-extension core exercise that builds functional abdominal strength.', injuries:['back'], instructions:['Kneel with ab wheel under shoulders','Roll out slowly keeping hips in line','Go as far as core can control','Pull back to start using abs only'], tips:['Start with partial rollouts if full is too hard','Don\'t let hips sag or pike at any point','Slow and controlled beats fast and sloppy'] },
  { id:21, name:'Bodyweight Squat', muscle:'legs', muscleDisplay:'Legs', difficulty:'beginner', location:['home'], image:'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop&q=80', videoId:'aclHkVaku9U', description:'Foundation of all lower body training. Perfect for beginners and warm-ups.', injuries:['knee'], instructions:['Stand feet shoulder-width, toes slightly out','Push hips back and bend knees together','Lower until thighs parallel to floor','Drive through entire foot to stand'], tips:['Keep weight balanced on entire foot','Arms forward for counterbalance','Add a pause at the bottom for mobility gains'] },
  { id:22, name:'Resistance Band Row', muscle:'back', muscleDisplay:'Back', difficulty:'beginner', location:['home'], image:'https://images.unsplash.com/photo-1590507621108-433608c97823?w=400&h=300&fit=crop&q=80', videoId:'xQNrFHEMhI4', description:'Effective home alternative to cable rows for building upper back thickness.', injuries:[], instructions:['Anchor band at chest height','Hold with neutral grip, step back for tension','Pull handles to lower ribs, elbows tight','Control the extension back'], tips:['The stiffer the band, the harder it is','Great superset with push-ups for push/pull balance','Try single-arm for more range of motion'] },
  { id:23, name:'Mountain Climbers', muscle:'cardio', muscleDisplay:'Cardio / Core', difficulty:'beginner', location:['gym','home'], image:'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=300&fit=crop&q=80', videoId:'nmwgirgXLYM', description:'High-intensity bodyweight cardio that also strengthens the core and shoulder girdle.', injuries:['back','shoulder'], instructions:['Start in high plank position','Drive one knee toward chest rapidly','Alternate legs as fast as you can maintain form','Keep hips level, don\'t bounce up and down'], tips:['Slow down if hips start rising','Wear socks on a smooth floor to reduce friction','Great as finisher or cardio warmup'] },
  { id:24, name:'Tricep Dip', muscle:'arms', muscleDisplay:'Triceps / Chest', difficulty:'intermediate', location:['gym','home'], image:'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop&q=80', videoId:'6kALZikXxLc', description:'Compound pressing movement for triceps and lower chest. Can be done on parallel bars or a chair.', injuries:['shoulder'], instructions:['Grip bars (or chair edge) with arms straight','Lower body until elbows are at ~90°','Press back up powerfully to lockout','Keep body upright for tricep focus'], tips:['Leaning forward shifts emphasis to chest','Bent knees reduces bodyweight load','Add a weight belt when bodyweight is easy'] },
  { id:25, name:'Burpee', muscle:'cardio', muscleDisplay:'Full Body / Cardio', difficulty:'intermediate', location:['gym','home'], image:'https://images.unsplash.com/photo-1535743686920-55e4145369b9?w=400&h=300&fit=crop&q=80', videoId:'TU8QYVW0gDU', description:'The ultimate full-body conditioning exercise. Combines a push-up, squat and jump for maximal calorie burn.', injuries:['knee','shoulder','back'], instructions:['Stand, then squat and place hands on floor','Jump or step feet back to plank','Perform a push-up','Jump feet to hands, then jump up with arms overhead'], tips:['Modify by stepping instead of jumping','Keep a steady rhythm over going as fast as possible','Scale to 10-minute EMOMs if full burpees are too hard'] }
];

const FOODS = [
  { name:'Chicken Breast', category:'protein', serving:'100g cooked', calories:165, protein:31, carbs:0, fat:3.6, image:'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop&q=80' },
  { name:'Salmon Fillet', category:'protein', serving:'100g cooked', calories:208, protein:28, carbs:0, fat:10, image:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&q=80' },
  { name:'Whole Eggs', category:'protein', serving:'2 large eggs', calories:143, protein:13, carbs:1, fat:10, image:'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=400&h=300&fit=crop&q=80' },
  { name:'Greek Yogurt', category:'protein', serving:'200g (0% fat)', calories:118, protein:20, carbs:9, fat:0.4, image:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&q=80' },
  { name:'Oatmeal', category:'carbs', serving:'80g dry', calories:307, protein:11, carbs:55, fat:6, image:'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop&q=80' },
  { name:'Brown Rice', category:'carbs', serving:'100g cooked', calories:123, protein:2.7, carbs:26, fat:1, image:'https://images.unsplash.com/photo-1536304993881-ff86e0c9e5f4?w=400&h=300&fit=crop&q=80' },
  { name:'Sweet Potato', category:'carbs', serving:'150g baked', calories:129, protein:3, carbs:30, fat:0.1, image:'https://images.unsplash.com/photo-1596097407038-d2bd3769e959?w=400&h=300&fit=crop&q=80' },
  { name:'Avocado', category:'fats', serving:'Half (75g)', calories:120, protein:1.5, carbs:6.4, fat:11, image:'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop&q=80' },
  { name:'Almonds', category:'fats', serving:'30g (small handful)', calories:173, protein:6, carbs:6, fat:15, image:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=300&fit=crop&q=80' },
  { name:'Banana', category:'fruits', serving:'1 medium (120g)', calories:107, protein:1.3, carbs:27, fat:0.4, image:'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=300&fit=crop&q=80' },
  { name:'Blueberries', category:'fruits', serving:'150g', calories:86, protein:1.1, carbs:21, fat:0.5, image:'https://images.unsplash.com/photo-1454425064867-5ba516caf601?w=400&h=300&fit=crop&q=80' },
  { name:'Broccoli', category:'veggies', serving:'200g steamed', calories:68, protein:5.6, carbs:11, fat:0.8, image:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&q=80' },
  { name:'Spinach', category:'veggies', serving:'100g raw', calories:23, protein:2.9, carbs:3.6, fat:0.4, image:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&q=80' },
  { name:'Cottage Cheese', category:'protein', serving:'200g', calories:162, protein:24, carbs:6, fat:4.4, image:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&q=80' },
  { name:'Quinoa', category:'carbs', serving:'100g cooked', calories:120, protein:4.4, carbs:21, fat:1.9, image:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&q=80' }
];

/* Diet-specific meal plans */
const MEAL_PLANS = {
  standard: {
    'fat-loss': {
      breakfast: { name:'Scrambled Eggs + Oatmeal', desc:'3 whole eggs scrambled with spinach + 60g oats with berries', protein:35, carbs:44, fat:14, cals:438 },
      lunch: { name:'Chicken Rice Bowl', desc:'150g chicken breast, 100g brown rice, broccoli, hot sauce', protein:48, carbs:38, fat:5, cals:389 },
      dinner: { name:'Salmon + Sweet Potato', desc:'180g salmon fillet, 150g sweet potato, steamed asparagus', protein:42, carbs:28, fat:12, cals:388 },
      snack: { name:'Greek Yogurt + Almonds', desc:'200g 0% Greek yogurt, 20g almonds, drizzle of honey', protein:22, carbs:12, fat:10, cals:226 }
    },
    'muscle-gain': {
      breakfast: { name:'Protein Pancakes', desc:'4 eggs, 80g oats, banana, whey protein — blended and cooked', protein:52, carbs:72, fat:14, cals:628 },
      lunch: { name:'Big Chicken Rice Bowl', desc:'200g chicken breast, 150g brown rice, avocado, mixed veg', protein:58, carbs:56, fat:12, cals:572 },
      dinner: { name:'Beef + Pasta', desc:'200g lean beef mince, 120g wholemeal pasta, tomato sauce, veggies', protein:52, carbs:72, fat:14, cals:628 },
      snack: { name:'Cottage Cheese + Banana', desc:'250g cottage cheese, 1 banana, 30g almonds', protein:35, carbs:32, fat:10, cals:358 }
    },
    recomposition: {
      breakfast: { name:'Egg White Omelette', desc:'5 egg whites + 2 whole eggs, veggies, 50g oats on the side', protein:38, carbs:30, fat:10, cals:362 },
      lunch: { name:'Turkey Rice Bowl', desc:'150g turkey breast, 100g rice, mixed roasted veg, olive oil', protein:42, carbs:38, fat:8, cals:394 },
      dinner: { name:'Salmon + Quinoa', desc:'180g salmon, 100g quinoa, steamed veg, lemon', protein:44, carbs:22, fat:12, cals:372 },
      snack: { name:'Greek Yogurt Parfait', desc:'200g 0% Greek yogurt, berries, granola, chia seeds', protein:22, carbs:24, fat:6, cals:238 }
    },
    strength: {
      breakfast: { name:'Steak + Eggs', desc:'150g lean steak, 3 eggs, sourdough toast, spinach', protein:55, carbs:34, fat:18, cals:518 },
      lunch: { name:'Chicken + Rice + Avocado', desc:'200g chicken, 150g rice, half avocado, broccoli', protein:52, carbs:52, fat:14, cals:548 },
      dinner: { name:'Beef + Potato', desc:'200g lean beef, 200g baked potato, green salad', protein:48, carbs:42, fat:14, cals:494 },
      snack: { name:'Protein Shake + Banana', desc:'2 scoops whey in milk, 1 banana, handful of almonds', protein:42, carbs:38, fat:10, cals:410 }
    },
    endurance: {
      breakfast: { name:'Porridge + Eggs', desc:'100g oats with milk and honey, 2 boiled eggs', protein:28, carbs:72, fat:10, cals:490 },
      lunch: { name:'Pasta Power Bowl', desc:'150g wholegrain pasta, tuna, cherry tomatoes, olive oil', protein:36, carbs:64, fat:10, cals:490 },
      dinner: { name:'Chicken + Sweet Potato Mash', desc:'150g chicken, 200g sweet potato, greens, olive oil', protein:38, carbs:46, fat:8, cals:408 },
      snack: { name:'Rice Cakes + Nut Butter', desc:'4 rice cakes, 2 tbsp peanut butter, banana', protein:14, carbs:48, fat:16, cals:390 }
    },
    general: {
      breakfast: { name:'Yogurt + Fruit Bowl', desc:'200g Greek yogurt, banana, blueberries, granola, honey', protein:22, carbs:44, fat:6, cals:318 },
      lunch: { name:'Chicken Salad Wrap', desc:'Wholegrain wrap, 130g chicken, salad, hummus, veggies', protein:38, carbs:36, fat:10, cals:386 },
      dinner: { name:'Salmon + Veggies', desc:'160g salmon, roasted mixed veg, small side of rice', protein:36, carbs:28, fat:12, cals:364 },
      snack: { name:'Apple + Almond Butter', desc:'1 large apple, 2 tbsp almond butter, handful of walnuts', protein:8, carbs:30, fat:18, cals:306 }
    }
  },
  vegetarian: {
    'fat-loss': {
      breakfast: { name:'Egg & Veggie Scramble', desc:'3 eggs scrambled with peppers, spinach, onion, 50g oats', protein:28, carbs:36, fat:12, cals:360 },
      lunch: { name:'Lentil Soup + Toast', desc:'300ml red lentil soup, 2 slices sourdough, mixed salad', protein:22, carbs:48, fat:6, cals:334 },
      dinner: { name:'Tofu Stir Fry', desc:'200g firm tofu, broccoli, snap peas, soy sauce, brown rice', protein:26, carbs:38, fat:8, cals:328 },
      snack: { name:'Greek Yogurt + Berries', desc:'200g 0% Greek yogurt, mixed berries, chia seeds', protein:20, carbs:16, fat:2, cals:164 }
    },
    'muscle-gain': {
      breakfast: { name:'Protein Oats', desc:'100g oats, 2 eggs, protein powder, nut butter, banana', protein:48, carbs:70, fat:14, cals:606 },
      lunch: { name:'Chickpea Power Bowl', desc:'200g chickpeas, quinoa, roasted veg, tahini dressing', protein:26, carbs:58, fat:14, cals:466 },
      dinner: { name:'Paneer Curry + Rice', desc:'200g paneer, lentil dal, 150g basmati rice, naan', protein:42, carbs:72, fat:18, cals:626 },
      snack: { name:'Cottage Cheese + Fruit', desc:'250g cottage cheese, banana, 30g mixed nuts', protein:32, carbs:32, fat:12, cals:364 }
    },
    recomposition: {
      breakfast: { name:'Greek Yogurt Bowl', desc:'200g yogurt, 2 boiled eggs, granola, blueberries', protein:34, carbs:30, fat:10, cals:358 },
      lunch: { name:'Lentil Buddha Bowl', desc:'200g lentils, quinoa, roasted veg, feta, lemon tahini', protein:28, carbs:44, fat:10, cals:378 },
      dinner: { name:'Egg Fried Quinoa', desc:'100g quinoa, 3 eggs, edamame, spring onion, soy sauce', protein:30, carbs:32, fat:12, cals:356 },
      snack: { name:'Edamame + Hummus', desc:'150g edamame, 80g hummus, carrot and celery sticks', protein:22, carbs:18, fat:10, cals:250 }
    },
    strength: {
      breakfast: { name:'Egg & Cheese Omelette', desc:'4 eggs, 40g cheddar, mushrooms, spinach, 2 slices toast', protein:42, carbs:36, fat:22, cals:506 },
      lunch: { name:'Paneer Rice Bowl', desc:'200g paneer, 150g rice, chickpea curry, raita', protein:42, carbs:54, fat:18, cals:546 },
      dinner: { name:'Tofu + Noodles', desc:'250g extra-firm tofu, soba noodles, stir fry veg, peanut sauce', protein:32, carbs:52, fat:14, cals:462 },
      snack: { name:'Protein Shake + Banana', desc:'Plant protein shake with oat milk, 1 banana, almond butter', protein:36, carbs:44, fat:8, cals:392 }
    },
    endurance: {
      breakfast: { name:'Banana Oat Pancakes', desc:'80g oats, 2 eggs, banana, maple syrup, Greek yogurt side', protein:28, carbs:72, fat:8, cals:474 },
      lunch: { name:'Pasta + Lentil Bolognese', desc:'150g wholegrain pasta, lentil ragù, parmesan', protein:28, carbs:68, fat:8, cals:458 },
      dinner: { name:'Veggie Curry + Rice', desc:'Mixed vegetable curry with chickpeas, 150g rice, naan', protein:18, carbs:68, fat:10, cals:434 },
      snack: { name:'Energy Balls', desc:'Oats, almond butter, honey, dark chocolate chips, dates', protein:12, carbs:44, fat:12, cals:328 }
    },
    general: {
      breakfast: { name:'Smoothie Bowl', desc:'Blended banana, berries, oat milk, topped with granola, seeds', protein:14, carbs:48, fat:8, cals:318 },
      lunch: { name:'Falafel Wrap', desc:'Wholegrain wrap, 4 falafels, hummus, mixed salad, tzatziki', protein:22, carbs:44, fat:14, cals:390 },
      dinner: { name:'Egg Fried Rice', desc:'100g rice, 3 eggs, mixed veg, soy sauce, sesame oil', protein:22, carbs:46, fat:10, cals:362 },
      snack: { name:'Apple + Peanut Butter', desc:'1 large apple, 2 tbsp peanut butter, 5 walnuts', protein:8, carbs:30, fat:18, cals:306 }
    }
  },
  vegan: {
    'fat-loss': {
      breakfast: { name:'Tofu Scramble', desc:'150g firm tofu scrambled with turmeric, peppers, spinach, 50g oats', protein:24, carbs:36, fat:8, cals:312 },
      lunch: { name:'Black Bean Bowl', desc:'200g black beans, 80g quinoa, roasted veg, salsa, lime', protein:20, carbs:44, fat:4, cals:292 },
      dinner: { name:'Tempeh Stir Fry', desc:'200g tempeh, broccoli, snap peas, soy sauce, brown rice (100g)', protein:28, carbs:42, fat:10, cals:370 },
      snack: { name:'Edamame + Nuts', desc:'150g edamame, 30g mixed nuts, apple', protein:20, carbs:20, fat:14, cals:282 }
    },
    'muscle-gain': {
      breakfast: { name:'Peanut Butter Protein Oats', desc:'100g oats, plant protein powder, peanut butter, banana, oat milk', protein:44, carbs:74, fat:14, cals:606 },
      lunch: { name:'Tempeh Rice Bowl', desc:'200g tempeh, 150g brown rice, edamame, avocado, teriyaki sauce', protein:38, carbs:62, fat:16, cals:546 },
      dinner: { name:'Lentil Dal + Naan', desc:'300g red lentil dal, 150g basmati rice, 1 naan, coconut yogurt', protein:30, carbs:78, fat:10, cals:522 },
      snack: { name:'Soy Protein Shake + Nuts', desc:'2 scoops soy protein in oat milk, 30g mixed nuts, dates', protein:38, carbs:36, fat:12, cals:408 }
    },
    recomposition: {
      breakfast: { name:'Chia Pudding', desc:'80g chia seeds soaked in oat milk, topped with mixed berries, granola', protein:16, carbs:42, fat:16, cals:368 },
      lunch: { name:'Buddha Bowl', desc:'Roasted chickpeas, quinoa, kale, avocado, tahini dressing', protein:22, carbs:44, fat:16, cals:406 },
      dinner: { name:'Tofu & Vegetable Curry', desc:'200g tofu, coconut milk curry, broccoli, 100g brown rice', protein:24, carbs:42, fat:14, cals:386 },
      snack: { name:'Hummus & Veg', desc:'120g hummus, cucumber, carrots, red peppers, pitta bread', protein:14, carbs:36, fat:12, cals:306 }
    },
    strength: {
      breakfast: { name:'High Protein Oats', desc:'100g oats, 2 scoops plant protein, almond butter, banana, oat milk', protein:50, carbs:74, fat:14, cals:622 },
      lunch: { name:'Seitan + Rice Power Bowl', desc:'200g seitan, 150g rice, stir fried veg, peanut sauce', protein:50, carbs:62, fat:12, cals:548 },
      dinner: { name:'Lentil Shepherd\'s Pie', desc:'300g green lentils, sweet potato mash topping, mixed veg', protein:28, carbs:58, fat:6, cals:402 },
      snack: { name:'Protein Smoothie', desc:'Soy milk, plant protein, peanut butter, banana, cocoa powder', protein:38, carbs:46, fat:10, cals:426 }
    },
    endurance: {
      breakfast: { name:'Energy Oat Bowl', desc:'100g oats, oat milk, banana, mixed seeds, maple syrup, berries', protein:18, carbs:78, fat:8, cals:454 },
      lunch: { name:'Pasta Primavera', desc:'150g wholegrain pasta, seasonal veg, olive oil, nutritional yeast', protein:16, carbs:70, fat:10, cals:434 },
      dinner: { name:'Sweet Potato + Bean Chilli', desc:'Mixed bean chilli, 200g sweet potato, avocado, corn tortilla', protein:20, carbs:62, fat:10, cals:418 },
      snack: { name:'Medjool Dates + Almond Butter', desc:'4 medjool dates stuffed with almond butter', protein:6, carbs:56, fat:12, cals:354 }
    },
    general: {
      breakfast: { name:'Acai Smoothie Bowl', desc:'Acai, banana, berries, topped with granola, coconut flakes, seeds', protein:10, carbs:54, fat:8, cals:326 },
      lunch: { name:'Falafel & Hummus Bowl', desc:'4 falafels, 80g hummus, quinoa, roasted veg, tahini', protein:20, carbs:48, fat:16, cals:408 },
      dinner: { name:'Thai Tofu Curry', desc:'200g tofu, coconut milk, Thai green curry paste, jasmine rice', protein:22, carbs:46, fat:16, cals:414 },
      snack: { name:'Trail Mix & Fruit', desc:'30g mixed nuts and seeds, dried fruit, 1 orange', protein:8, carbs:36, fat:14, cals:298 }
    }
  }
};

const TIPS = [
  { emoji:'🏋️', title:'Progressive Overload', text:'Consistently adding small amounts of weight or reps over time is the single most important driver of strength and muscle growth. Even 1kg per week compounds dramatically over months.' },
  { emoji:'😴', title:'Sleep Is Non-Negotiable', text:'Muscle is built during sleep, not in the gym. Growth hormone peaks during deep sleep. Aim for 7–9 hours to maximise recovery, body composition, and hormonal balance.' },
  { emoji:'💧', title:'Hydration & Performance', text:'Even 2% dehydration reduces strength output by up to 10%. Drink water throughout the day — especially before, during, and after sessions.' },
  { emoji:'🥩', title:'Protein Timing', text:'Spread protein across 3–5 meals to maximise muscle protein synthesis. Aim for 20–40g per meal. Pre-sleep protein (cottage cheese or casein) reduces overnight muscle breakdown.' },
  { emoji:'🧘', title:'Mind-Muscle Connection', text:'Consciously focusing on the muscle you\'re training increases activation by up to 22%. Slow down, reduce weight if needed, and feel the target muscle working.' },
  { emoji:'📈', title:'Track Everything', text:'You cannot manage what you cannot measure. Log your workouts, weights, and nutrition. Even a simple note on your phone will reveal patterns and plateau-breaking opportunities.' },
  { emoji:'🔄', title:'Deload Weeks', text:'Schedule one lighter training week every 4–6 weeks. Deloads allow connective tissue and the nervous system to recover, preventing overtraining and often resulting in new personal bests after.' },
  { emoji:'⚡', title:'Warm Up Properly', text:'A proper warm-up increases nerve conduction velocity, lubricates joints, and reduces injury risk. 5 min light cardio + 2–3 warm-up sets before working weight is all you need.' },
  { emoji:'🎯', title:'Compound First, Isolation Second', text:'Start every session with multi-joint movements (squat, press, row, hinge) while your energy is highest. Isolation work is the finishing touch, not the foundation.' }
];

const FAQS = [
  { q:'How accurate is the calorie calculation?', a:'We use the Mifflin-St Jeor equation — the most clinically validated formula for estimating metabolic rate. Paired with your activity multiplier and goal adjustment, it\'s accurate within 5-10% for most people. Use it as a strong starting point and adjust by ±100kcal based on 2-week weight trends.' },
  { q:'Do I need equipment for the home workouts?', a:'Bodyweight-only plans are fully supported. If you select "Home" with bodyweight equipment, every exercise can be performed with zero equipment. Adding resistance bands or dumbbells significantly expands the exercise options and overload potential.' },
  { q:'How long until I see results?', a:'Visible results typically appear in 4–8 weeks with consistent training and nutrition. Strength improvements begin within 2 weeks as your nervous system adapts. Body composition changes require 6–12 weeks of adherence to become clearly visible. Patience and consistency are the real secret.' },
  { q:'Should I train if I have an injury?', a:'This planner flags exercises based on your declared injuries. However, always get clearance from a physiotherapist or medical professional before training through pain. "Working around" an injury is different from "training through" pain — the former is smart, the latter can cause long-term damage.' },
  { q:'How much protein do I actually need?', a:'Research supports 1.6–2.2g of protein per kg of bodyweight daily for active individuals seeking muscle gain or body recomposition. Higher intakes (up to 3g/kg) are safe and can be beneficial during aggressive fat loss to preserve muscle mass.' },
  { q:'Can I build muscle in a calorie deficit?', a:'Yes — particularly if you\'re a beginner, returning to training, or have above-average body fat. This is called "body recomposition". Select the Recomposition goal for a maintenance-calorie plan that supports simultaneous fat loss and muscle gain.' },
  { q:'How do I know if my workout split is right?', a:'Your split is determined by your available training days. 1–2 days uses Full Body, 3–4 days uses Upper/Lower, and 5–7 days uses Push/Pull/Legs. Each split allows sufficient recovery for each muscle group relative to your training frequency.' },
  { q:'Can I modify the generated plan?', a:'Absolutely. The plan is a science-based starting point, not a rigid prescription. Swap exercises for equivalents that suit your preferences, available equipment, or injury needs. The key is maintaining similar muscle group targets and progressive overload over time.' }
];

/* ── STATE ── */
const userData = {
  name: '', gender: null, age: 25,
  height: 175, heightUnit: 'cm',
  weight: 75, weightUnit: 'kg',
  goal: null, targetWeight: null, targetWeightSkipped: false, timeline: '6months',
  experience: null, activityLevel: null,
  location: null, gymType: null, equipment: ['bodyweight'],
  days: 4, sessionDuration: '60min', trainingStyle: null,
  injuries: ['none'],
  dietType: null, proteinPref: null, mealsPerDay: 3,
  sleep: 7, waterIntake: 2, stressLevel: null, foodBudget: null
};

let currentStep = 1;
const TOTAL_STEPS = 12;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPlanner();
  initExerciseLibrary();
  initNutritionLibrary();
  initBmiCalculator();
  initTips();
  initFaq();
  initIntersectionObserver();
  initHeroCounters();
  initMobileMenu();
});

/* ── NAVBAR ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const links = menu.querySelectorAll('.mobile-link, .mobile-cta');

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });
  links.forEach(l => l.addEventListener('click', () => {
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }));
}

/* ── HERO COUNTERS ── */
function initHeroCounters() {
  const counters = document.querySelectorAll('.hero-stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ── PLANNER INIT ── */
function initPlanner() {
  setupOptionCards();
  setupNumberInputs();
  setupSliders();
  setupUnitToggles();
  setupDayButtons();
  setupStepNavButtons();
  setupDurationCards();
  setupMealPills();
  setupTimelinePills();
  setupInjuryCheckboxes();
  setupEquipmentCheckboxes();
  setupSkipTarget();

  document.getElementById('generateBtn').addEventListener('click', generatePlan);
  document.getElementById('restartBtn').addEventListener('click', restartPlanner);
}

/* ── OPTION CARDS ── */
function setupOptionCards() {
  document.querySelectorAll('.option-card[data-field]').forEach(card => {
    card.addEventListener('click', () => {
      const field = card.dataset.field;
      const value = card.dataset.value;

      // Deselect siblings
      document.querySelectorAll(`.option-card[data-field="${field}"]`).forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');

      userData[field] = value;

      // Side effects
      if (field === 'location') handleLocationChange(value);
      if (field === 'dietType') handleDietTypeChange(value);
    });
  });
}

function handleLocationChange(val) {
  const gymSection = document.getElementById('gymTypeSection');
  const homeSection = document.getElementById('homeEquipmentSection');
  gymSection.classList.toggle('hidden', val !== 'gym');
  homeSection.classList.toggle('hidden', val !== 'home');
}

function handleDietTypeChange(val) {
  const proteinSection = document.getElementById('proteinPrefSection');
  proteinSection.classList.toggle('hidden', val !== 'standard');
}

/* ── NUMBER INPUTS ── */
function setupNumberInputs() {
  const makeNumControl = (inputId, downId, upId, sliderId, field, min, max, step) => {
    const input = document.getElementById(inputId);
    const down = document.getElementById(downId);
    const up = document.getElementById(upId);
    const slider = sliderId ? document.getElementById(sliderId) : null;
    if (!input) return;

    const update = (val) => {
      val = Math.min(max, Math.max(min, Math.round(val / step) * step));
      input.value = val;
      if (slider) { slider.value = val; updateSliderFill(slider); }
      if (field) userData[field] = val;
      if (inputId === 'daysCount') updateDaysHint(val);
    };

    down.addEventListener('click', () => update(parseFloat(input.value) - step));
    up.addEventListener('click', () => update(parseFloat(input.value) + step));
    input.addEventListener('change', () => update(parseFloat(input.value)));
    if (slider) slider.addEventListener('input', () => update(parseFloat(slider.value)));
    update(parseFloat(input.value));
  };

  makeNumControl('ageInput', 'ageDown', 'ageUp', 'ageSlider', 'age', 13, 80, 1);
  makeNumControl('heightInput', 'heightDown', 'heightUp', 'heightSlider', 'height', 100, 250, 1);
  makeNumControl('weightInput', 'weightDown', 'weightUp', 'weightSlider', 'weight', 30, 300, 0.5);

  // Target weight
  const twInput = document.getElementById('targetWeightInput');
  const twDown = document.getElementById('targetWeightDown');
  const twUp = document.getElementById('targetWeightUp');
  if (twInput && twDown && twUp) {
    twDown.addEventListener('click', () => { const v = parseFloat(twInput.value || userData.weight); twInput.value = Math.max(30, v - 1); userData.targetWeight = parseFloat(twInput.value); });
    twUp.addEventListener('click', () => { const v = parseFloat(twInput.value || userData.weight); twInput.value = Math.min(300, v + 1); userData.targetWeight = parseFloat(twInput.value); });
    twInput.addEventListener('change', () => { userData.targetWeight = parseFloat(twInput.value) || null; });
  }
}

/* ── SLIDERS ── */
function updateSliderFill(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const val = parseFloat(slider.value);
  const pct = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--slider-progress', pct + '%');
}

function setupSliders() {
  // Lifestyle sliders
  const sleepSlider = document.getElementById('sleepSlider');
  const sleepVal = document.getElementById('sleepVal');
  sleepSlider.addEventListener('input', () => {
    userData.sleep = parseFloat(sleepSlider.value);
    sleepVal.textContent = sleepSlider.value + 'h';
    updateSliderFill(sleepSlider);
  });
  updateSliderFill(sleepSlider);

  const waterSlider = document.getElementById('waterSlider');
  const waterVal = document.getElementById('waterVal');
  waterSlider.addEventListener('input', () => {
    userData.waterIntake = parseFloat(waterSlider.value);
    waterVal.textContent = parseFloat(waterSlider.value).toFixed(1) + ' L';
    updateSliderFill(waterSlider);
  });
  updateSliderFill(waterSlider);
}

/* ── UNIT TOGGLES ── */
function setupUnitToggles() {
  const makeToggle = (btnA, btnB, inputId, labelId, unitA, unitB, convAtoB, convBtoA, rangeA, rangeB) => {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    let currentUnit = unitA;

    document.getElementById(btnA).addEventListener('click', () => {
      if (currentUnit === unitA) return;
      currentUnit = unitA;
      document.getElementById(btnA).classList.add('active');
      document.getElementById(btnB).classList.remove('active');
      input.value = Math.round(convBtoA(parseFloat(input.value)));
      input.min = rangeA[0]; input.max = rangeA[1];
      if (label) label.textContent = unitA;
    });
    document.getElementById(btnB).addEventListener('click', () => {
      if (currentUnit === unitB) return;
      currentUnit = unitB;
      document.getElementById(btnB).classList.add('active');
      document.getElementById(btnA).classList.remove('active');
      input.value = Math.round(convAtoB(parseFloat(input.value)));
      input.min = rangeB[0]; input.max = rangeB[1];
      if (label) label.textContent = unitB;
    });
  };

  makeToggle('heightCm', 'heightFt', 'heightInput', 'heightUnitLabel',
    'cm', 'ft',
    v => +(v / 30.48).toFixed(1), v => Math.round(v * 30.48),
    [100, 250], [3, 8]);

  makeToggle('weightKg', 'weightLbs', 'weightInput', 'weightUnitLabel',
    'kg', 'lbs',
    v => Math.round(v * 2.205), v => Math.round(v / 2.205),
    [30, 300], [66, 660]);

  // Sync unit with userData
  document.getElementById('heightCm').addEventListener('click', () => { userData.heightUnit = 'cm'; });
  document.getElementById('heightFt').addEventListener('click', () => { userData.heightUnit = 'ft'; });
  document.getElementById('weightKg').addEventListener('click', () => { userData.weightUnit = 'kg'; });
  document.getElementById('weightLbs').addEventListener('click', () => { userData.weightUnit = 'lbs'; });

  // Target weight unit label sync
  document.getElementById('weightKg').addEventListener('click', () => { document.getElementById('targetWeightUnit').textContent = 'kg'; });
  document.getElementById('weightLbs').addEventListener('click', () => { document.getElementById('targetWeightUnit').textContent = 'lbs'; });
}

/* ── DAY BUTTONS ── */
function setupDayButtons() {
  document.querySelectorAll('.day-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-pill').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-checked','true');
      const days = parseInt(btn.dataset.days);
      userData.days = days;
      document.getElementById('daysCount').textContent = days;
      updateDaysHint(days);
    });
  });
}

function updateDaysHint(days) {
  const hints = { 1:'Full Body', 2:'Full Body × 2', 3:'Upper / Lower + Full Body', 4:'Upper / Lower Split', 5:'Push / Pull / Legs', 6:'Push / Pull / Legs × 2', 7:'Daily Training' };
  const el = document.getElementById('daysHint');
  if (el) el.textContent = hints[days] || '';
}

/* ── DURATION CARDS ── */
function setupDurationCards() {
  document.querySelectorAll('.duration-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.duration-card').forEach(c => { c.classList.remove('selected'); c.setAttribute('aria-checked','false'); });
      card.classList.add('selected');
      card.setAttribute('aria-checked','true');
      userData.sessionDuration = card.dataset.value;
    });
  });
}

/* ── TIMELINE PILLS ── */
function setupTimelinePills() {
  document.querySelectorAll('.timeline-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.timeline-pill').forEach(p => { p.classList.remove('selected'); p.setAttribute('aria-checked','false'); });
      pill.classList.add('selected');
      pill.setAttribute('aria-checked','true');
      userData.timeline = pill.dataset.value;
    });
  });
}

/* ── MEAL PILLS ── */
function setupMealPills() {
  document.querySelectorAll('.meal-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.meal-pill').forEach(p => { p.classList.remove('active'); p.setAttribute('aria-checked','false'); });
      pill.classList.add('active');
      pill.setAttribute('aria-checked','true');
      userData.mealsPerDay = parseInt(pill.dataset.meals);
    });
  });
}

/* ── INJURY CHECKBOXES ── */
function setupInjuryCheckboxes() {
  const noneBox = document.querySelector('.injury-check[value="none"]');
  const others = document.querySelectorAll('.injury-check:not([value="none"])');

  noneBox.addEventListener('change', () => {
    if (noneBox.checked) others.forEach(o => { o.checked = false; });
    syncInjuries();
  });
  others.forEach(box => {
    box.addEventListener('change', () => {
      if (box.checked) noneBox.checked = false;
      syncInjuries();
    });
  });
}

function syncInjuries() {
  const checked = Array.from(document.querySelectorAll('.injury-check:checked')).map(c => c.value);
  userData.injuries = checked.length ? checked : ['none'];
}

/* ── EQUIPMENT CHECKBOXES ── */
function setupEquipmentCheckboxes() {
  document.querySelectorAll('.equip-check').forEach(box => {
    box.addEventListener('change', () => {
      userData.equipment = Array.from(document.querySelectorAll('.equip-check:checked')).map(c => c.value);
      if (!userData.equipment.length) { box.checked = true; userData.equipment = [box.value]; }
    });
  });
}

/* ── SKIP TARGET ── */
function setupSkipTarget() {
  document.getElementById('skipTarget').addEventListener('click', () => {
    document.getElementById('targetWeightInput').value = '';
    userData.targetWeight = null;
    userData.targetWeightSkipped = true;
  });
}

/* ── STEP NAVIGATION ── */
function setupStepNavButtons() {
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep + 1, 'forward'));
  });
  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep - 1, 'back'));
  });
  document.getElementById('step1Next').addEventListener('click', () => {
    userData.name = document.getElementById('nameInput').value.trim() || 'Champion';
    goToStep(2, 'forward');
  });
}

function goToStep(targetStep, direction) {
  if (targetStep < 1 || targetStep > TOTAL_STEPS) return;

  const current = document.getElementById(`step-${currentStep}`);
  const target = document.getElementById(`step-${targetStep}`);

  const exitClass = direction === 'forward' ? 'exiting' : 'exiting-back';
  const enterClass = direction === 'forward' ? '' : 'entering-back';

  current.classList.add(exitClass);
  setTimeout(() => {
    current.classList.remove('active', exitClass);
    target.classList.add('active');
    if (enterClass) { target.classList.add(enterClass); setTimeout(() => target.classList.remove(enterClass), 400); }
    currentStep = targetStep;
    updateProgress();
  }, 250);
}

function updateProgress() {
  const pct = (currentStep / TOTAL_STEPS) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressFill').parentElement.setAttribute('aria-valuenow', Math.round(pct));
  document.getElementById('stepCounter').textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;

  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 < currentStep) dot.classList.add('completed');
    else if (i + 1 === currentStep) dot.classList.add('active');
  });
}

/* ── CALCULATIONS ── */
function getWeightKg() {
  const w = parseFloat(document.getElementById('weightInput').value) || userData.weight;
  const unit = document.getElementById('weightLbs').classList.contains('active') ? 'lbs' : 'kg';
  return unit === 'lbs' ? w / 2.205 : w;
}

function getHeightCm() {
  const h = parseFloat(document.getElementById('heightInput').value) || userData.height;
  const unit = document.getElementById('heightFt').classList.contains('active') ? 'ft' : 'cm';
  return unit === 'ft' ? h * 30.48 : h;
}

function calculateCalories() {
  const weightKg = getWeightKg();
  const heightCm = getHeightCm();
  const age = parseInt(document.getElementById('ageInput').value) || userData.age;
  const gender = userData.gender || 'male';

  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  const activityMultipliers = { sedentary:1.2, 'lightly-active':1.375, 'moderately-active':1.55, 'very-active':1.725, athlete:1.9 };
  const multiplier = activityMultipliers[userData.activityLevel] || 1.375;
  let tdee = bmr * multiplier;

  // Sleep penalty
  if (userData.sleep < 6) tdee *= 0.95;
  else if (userData.sleep < 7) tdee *= 0.97;

  // Stress penalty
  if (userData.stressLevel === 'high') tdee *= 0.97;

  const goalAdjustments = { 'fat-loss': -500, 'muscle-gain': 300, recomposition: -150, strength: 200, endurance: 100, general: 0 };
  const targetCals = Math.round(tdee + (goalAdjustments[userData.goal] || 0));

  // Protein anchored to goal (g/kg) — not experience
  const proteinMultipliers = { 'fat-loss':2.2, 'muscle-gain':2.0, recomposition:2.2, strength:2.0, endurance:1.6, general:1.7 };
  const proteinGPerKg = proteinMultipliers[userData.goal] || 1.8;
  const proteinG = Math.round(weightKg * proteinGPerKg);
  const proteinCals = proteinG * 4;

  // Fat: goal-specific % of calories
  const fatPctMap = { 'fat-loss':0.22, 'muscle-gain':0.28, recomposition:0.25, strength:0.26, endurance:0.25, general:0.26 };
  const fatPct = fatPctMap[userData.goal] || 0.26;
  const fatCals = Math.round(targetCals * fatPct);
  const fatG = Math.round(fatCals / 9);

  // Carbs: remainder
  const carbCals = targetCals - proteinCals - fatCals;
  const carbG = Math.max(0, Math.round(carbCals / 4));

  // BMI
  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

  // Water target: weight(kg) × 0.033 + training bonus
  const trainingBonus = userData.days >= 5 ? 0.6 : userData.days >= 3 ? 0.4 : 0.2;
  const waterL = +(weightKg * 0.033 + trainingBonus).toFixed(1);

  return { calories: targetCals, protein: proteinG, carbs: carbG, fat: fatG, bmr: Math.round(bmr), tdee: Math.round(tdee), bmi, weightKg, heightCm, waterL, age };
}

function calculateReadinessScore() {
  let score = 10;
  if (userData.sleep < 6) score -= 3;
  else if (userData.sleep < 7) score -= 1.5;
  else if (userData.sleep >= 8) score += 0.5;
  if (userData.stressLevel === 'high') score -= 2;
  else if (userData.stressLevel === 'medium') score -= 1;
  if (userData.waterIntake < 1.5) score -= 1;
  else if (userData.waterIntake >= 2.5) score += 0.5;
  if (userData.activityLevel === 'sedentary') score -= 0.5;
  return Math.max(1, Math.min(10, Math.round(score)));
}

function calculateBmiCategory(bmi) {
  if (bmi < 18.5) return { label:'Underweight', color:'#3B82F6', desc:'You are below the healthy weight range. Focus on calorie surplus and strength training to build lean mass.' };
  if (bmi < 25) return { label:'Normal Weight', color:'#10B981', desc:'You are in the healthy range. Focus on improving body composition through training and balanced nutrition.' };
  if (bmi < 30) return { label:'Overweight', color:'#F59E0B', desc:'A modest calorie deficit, consistent training, and improved nutrition will move you into the healthy range.' };
  return { label:'Obese', color:'#EF4444', desc:'Prioritise sustainable dietary changes and regular low-impact activity. Consider consulting a healthcare provider.' };
}

function calculateTimeline() {
  const timelineMap = { '1month':30, '3months':90, '6months':180, '12months':365, 'no-rush':365 };
  const days = timelineMap[userData.timeline] || 180;
  const now = new Date();
  const milestones = [];

  const week1 = new Date(now); week1.setDate(now.getDate() + 7);
  const month1 = new Date(now); month1.setDate(now.getDate() + 30);
  const month2 = new Date(now); month2.setDate(now.getDate() + 60);
  const month3 = new Date(now); month3.setDate(now.getDate() + 90);
  const goalDate = new Date(now); goalDate.setDate(now.getDate() + days);

  const fmt = d => d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });

  milestones.push({ date: fmt(week1), title:'Week 1 Complete', desc:'Nervous system adaptation begins. Strength goes up fast — celebrate every PR.', badge:'🌱' });
  milestones.push({ date: fmt(month1), title:'First Month Down', desc:'Visible improvements in energy, endurance and first signs of body composition change.', badge:'🔥' });
  milestones.push({ date: fmt(month2), title:'Two Months In', desc:'Significant strength gains and visible physique improvements. Habits are now automatic.', badge:'⚡' });
  if (days >= 90) milestones.push({ date: fmt(month3), title:'Quarterly Checkpoint', desc:'Time to reassess and adjust your plan. Celebrate how far you\'ve come.', badge:'🏆' });
  milestones.push({ date: fmt(goalDate), title:'Goal Deadline', desc:'Your target date. Track progress photos and measurements from Week 1 to see the full transformation.', badge:'🎯' });

  return milestones;
}

/* ── WORKOUT PLAN GENERATION ── */
function getExercisesForLocation() {
  if (userData.location === 'home') {
    return EXERCISES.filter(e => e.location.includes('home'));
  }
  return EXERCISES.filter(e => e.location.includes('gym'));
}

function filterInjuryExercises(exList) {
  const injuries = userData.injuries;
  if (injuries.includes('none')) return exList;
  return exList.filter(ex => !ex.injuries.some(inj => injuries.includes(inj)));
}

function getExercisesByMuscle(muscle, limit) {
  const pool = filterInjuryExercises(getExercisesForLocation());
  const filtered = pool.filter(e => e.muscle === muscle);
  return filtered.slice(0, limit);
}

function getSetsAndReps() {
  const style = userData.trainingStyle;
  const duration = userData.sessionDuration;

  const volumeMap = { '30min': { exercises: 3, label:'3' }, '45min': { exercises: 5, label:'5' }, '60min': { exercises: 5, label:'5–6' }, '90min': { exercises: 7, label:'7–8' } };
  const vol = volumeMap[duration] || volumeMap['60min'];

  if (style === 'strength') return { sets: 5, reps: '3–5', rest: '3–5 min', volumeExercises: vol.exercises };
  if (style === 'hypertrophy') return { sets: 4, reps: '8–12', rest: '60–90 sec', volumeExercises: vol.exercises };
  if (style === 'cardio') return { sets: 3, reps: '15–20', rest: '30 sec', volumeExercises: vol.exercises };
  return { sets: 3, reps: '8–12', rest: '90 sec', volumeExercises: vol.exercises };
}

function generateWorkoutDays() {
  const d = userData.days;
  const { sets, reps, rest, volumeExercises } = getSetsAndReps();

  const label = `${sets}×${reps} (Rest: ${rest})`;
  const getEx = (muscle, n) => getExercisesByMuscle(muscle, n).map(e => ({ name: e.name, sets: label, note: null }));
  const addNote = (muscle, note) => getEx(muscle, 1).map(e => ({ ...e, note }));

  const injNote = (muscle) => {
    if (userData.injuries.includes('knee') && muscle === 'legs') return 'Injury: low-impact only';
    if (userData.injuries.includes('back') && (muscle === 'legs' || muscle === 'back')) return 'Injury: avoid spinal load';
    if (userData.injuries.includes('shoulder') && (muscle === 'chest' || muscle === 'shoulders')) return 'Injury: reduce range of motion';
    return null;
  };

  const day = (name, type, muscles) => ({
    name, type, badge: type,
    exercises: muscles.flatMap(([muscle, count]) => {
      const exs = getEx(muscle, count);
      const note = injNote(muscle);
      return exs.map(e => ({ ...e, note: e.note || note }));
    }).slice(0, volumeExercises)
  });

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const rest_day = (name) => ({ name, type: 'Rest / Recovery', badge: 'Rest', exercises: [] });

  if (d === 1) return [day(days[0], 'Full Body', [['chest',1],['back',1],['legs',1],['shoulders',1],['core',1]])];
  if (d === 2) return [
    day(days[0], 'Full Body A', [['chest',1],['back',1],['legs',1],['core',1]]),
    day(days[3], 'Full Body B', [['legs',1],['shoulders',1],['arms',1],['core',1]])
  ];
  if (d === 3) return [
    day(days[0], 'Full Body A', [['chest',1],['back',1],['legs',1],['core',1]]),
    day(days[2], 'Full Body B', [['back',1],['legs',1],['shoulders',1],['arms',1]]),
    day(days[4], 'Full Body C', [['chest',1],['legs',1],['shoulders',1],['core',1]])
  ];
  if (d === 4) return [
    day(days[0], 'Upper A', [['chest',2],['back',2],['shoulders',1],['arms',1]]),
    day(days[1], 'Lower A', [['legs',3],['core',2]]),
    day(days[3], 'Upper B', [['chest',1],['back',2],['shoulders',2],['arms',1]]),
    day(days[4], 'Lower B', [['legs',3],['core',2]])
  ];
  if (d === 5) return [
    day(days[0], 'Push', [['chest',2],['shoulders',2],['arms',1]]),
    day(days[1], 'Pull', [['back',3],['arms',1],['core',1]]),
    day(days[2], 'Legs', [['legs',4],['core',1]]),
    day(days[3], 'Push', [['chest',2],['shoulders',2],['arms',1]]),
    day(days[4], 'Pull', [['back',3],['arms',1]])
  ];
  if (d === 6) return [
    day(days[0], 'Push', [['chest',2],['shoulders',2],['arms',1]]),
    day(days[1], 'Pull', [['back',3],['arms',1],['core',1]]),
    day(days[2], 'Legs', [['legs',4],['core',1]]),
    day(days[3], 'Push', [['chest',2],['shoulders',2],['arms',1]]),
    day(days[4], 'Pull', [['back',3],['arms',1]]),
    day(days[5], 'Legs', [['legs',4],['core',1]])
  ];
  // 7 days
  return [
    day(days[0], 'Push', [['chest',2],['shoulders',2],['arms',1]]),
    day(days[1], 'Pull', [['back',3],['arms',1],['core',1]]),
    day(days[2], 'Legs', [['legs',4],['core',1]]),
    day(days[3], 'Push', [['chest',2],['shoulders',2],['arms',1]]),
    day(days[4], 'Pull', [['back',3],['arms',1]]),
    day(days[5], 'Legs', [['legs',3],['core',2]]),
    day(days[6], 'Active Recovery', [['core',2],['cardio',1]])
  ];
}

/* ── GENERATE PLAN ── */
function generatePlan() {
  // Collect final values
  userData.name = document.getElementById('nameInput').value.trim() || 'Champion';
  userData.age = parseInt(document.getElementById('ageInput').value) || 25;
  userData.height = parseFloat(document.getElementById('heightInput').value) || 175;
  userData.weight = parseFloat(document.getElementById('weightInput').value) || 75;

  showLoading(() => {
    const calc = calculateCalories();
    const readiness = calculateReadinessScore();
    const workoutDays = generateWorkoutDays();
    const milestones = calculateTimeline();
    const bmiCat = calculateBmiCategory(calc.bmi);
    const dietType = userData.dietType || 'standard';
    const goalKey = userData.goal || 'general';
    const meals = (MEAL_PLANS[dietType] || MEAL_PLANS.standard)[goalKey] || MEAL_PLANS.standard.general;

    buildResultsSummaryCard(calc);
    buildSummaryTab(calc, readiness, bmiCat);
    buildTrainingTab(workoutDays);
    buildNutritionTab(calc, meals);
    buildRoadmapTab(milestones, calc);

    document.getElementById('results').classList.remove('hidden');
    document.getElementById('planner').classList.add('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });

    initResultsTabs();
    animateMacroRings(calc);
  });
}

function showLoading(callback) {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.remove('hidden');

  const messages = ['Analysing your profile…','Calculating your metabolism…','Building your workout plan…','Optimising your nutrition…'];
  const steps = ['ls1','ls2','ls3','ls4'];
  let i = 0;

  const interval = setInterval(() => {
    document.getElementById('loadingText').textContent = messages[i] || messages[messages.length-1];
    if (i > 0) document.getElementById(steps[i-1]).classList.add('active');
    i++;
    if (i >= steps.length + 1) {
      clearInterval(interval);
      document.getElementById(steps[steps.length-1]).classList.add('active');
      setTimeout(() => {
        overlay.classList.add('hidden');
        callback();
      }, 600);
    }
  }, 700);
}

/* ── BUILD RESULTS ── */
function buildResultsSummaryCard(calc) {
  const goalLabels = { 'fat-loss':'Fat Loss','muscle-gain':'Muscle Gain','recomposition':'Recomposition','strength':'Strength','endurance':'Endurance','general':'General Fitness' };
  const name = userData.name;
  const goal = goalLabels[userData.goal] || 'General Fitness';
  const bmi = calc.bmi;
  const water = calc.waterL;

  document.getElementById('resultsSummaryCard').innerHTML = `
    <div class="results-summary-card">
      <div class="results-summary-inner">
        <div class="results-greeting">
          <div class="results-greeting-badge">✦ Your Plan is Ready</div>
          <div class="results-name">Hey, ${name}! 👋</div>
          <div class="results-goal-label">Goal: <strong>${goal}</strong> · ${userData.days} days/week · ${userData.sessionDuration}</div>
        </div>
        <div class="results-stats-mini">
          <div class="results-stat-mini"><div class="rsm-value">${calc.calories.toLocaleString()}</div><div class="rsm-label">Calories</div></div>
          <div class="results-stat-mini"><div class="rsm-value">${calc.protein}g</div><div class="rsm-label">Protein</div></div>
          <div class="results-stat-mini"><div class="rsm-value">${bmi}</div><div class="rsm-label">BMI</div></div>
          <div class="results-stat-mini"><div class="rsm-value">${water}L</div><div class="rsm-label">Water</div></div>
        </div>
      </div>
    </div>`;
}

function buildSummaryTab(calc, readiness, bmiCat) {
  const readinessLabel = readiness >= 8 ? 'Excellent Recovery State' : readiness >= 6 ? 'Good to Train' : readiness >= 4 ? 'Train but Monitor Recovery' : 'Prioritise Recovery First';
  const readinessDesc = readiness >= 8 ? 'Your sleep, hydration and stress levels are supporting optimal adaptation. Make the most of it.' :
    readiness >= 6 ? 'Good baseline. Small lifestyle improvements could unlock faster results.' :
    readiness >= 4 ? 'Your lifestyle is creating some recovery debt. Address sleep or stress for better results.' :
    'Your current lifestyle is limiting your results significantly. Prioritise sleep and stress management alongside training.';

  const stars = Array.from({length:10}, (_,i) => `<span class="readiness-star ${i < readiness ? 'filled' : ''}">★</span>`).join('');

  const tdeeLabel = userData.goal === 'fat-loss' ? 'in a 500kcal deficit' : userData.goal === 'muscle-gain' ? 'in a 300kcal surplus' : 'at maintenance';

  const recoveryRecs = getRecoveryRecs();
  const lifestyleRecs = getLifestyleRecs();

  const bmiGaugeOffset = Math.round(283 * (1 - Math.min(calc.bmi / 40, 1)));

  document.getElementById('summaryTabContent').innerHTML = `
    <div class="readiness-card">
      <div class="readiness-score-wrap">
        <div class="readiness-score">${readiness}</div>
        <div class="readiness-denom">/10</div>
      </div>
      <div class="readiness-text">
        <h4>Readiness Score — ${readinessLabel}</h4>
        <p>${readinessDesc}</p>
        <div class="readiness-stars">${stars}</div>
      </div>
    </div>

    <div class="results-section-title">🔥 Calorie & Macro Targets</div>
    <div class="results-stats-grid">
      <div class="result-stat-card" style="--card-color: linear-gradient(135deg,#10B981,#059669)">
        <div class="rsc-icon">🎯</div>
        <div class="rsc-value">${calc.calories.toLocaleString()}</div>
        <div class="rsc-unit">kcal/day</div>
        <div class="rsc-label">Daily Target</div>
      </div>
      <div class="result-stat-card" style="--card-color: linear-gradient(135deg,#6366F1,#4F46E5)">
        <div class="rsc-icon">💪</div>
        <div class="rsc-value">${calc.protein}g</div>
        <div class="rsc-unit">per day</div>
        <div class="rsc-label">Protein Target</div>
      </div>
      <div class="result-stat-card" style="--card-color: linear-gradient(135deg,#F97316,#EA580C)">
        <div class="rsc-icon">⚡</div>
        <div class="rsc-value">${calc.carbs}g</div>
        <div class="rsc-unit">per day</div>
        <div class="rsc-label">Carbohydrates</div>
      </div>
      <div class="result-stat-card" style="--card-color: linear-gradient(135deg,#F59E0B,#D97706)">
        <div class="rsc-icon">🥑</div>
        <div class="rsc-value">${calc.fat}g</div>
        <div class="rsc-unit">per day</div>
        <div class="rsc-label">Fats</div>
      </div>
    </div>
    <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:24px;margin-top:-16px;">Based on BMR of ${calc.bmr.toLocaleString()} kcal · TDEE ${calc.tdee.toLocaleString()} kcal · ${tdeeLabel}</p>

    <div class="macros-section">
      <div class="macros-title">Macronutrient Distribution</div>
      <div class="macros-grid">
        <div class="macro-ring-wrap">
          <svg class="macro-ring-svg" viewBox="0 0 100 100">
            <circle class="macro-ring-bg" cx="50" cy="50" r="39"/>
            <circle class="macro-ring-fill" id="proteinRing" cx="50" cy="50" r="39" stroke="#6366F1"/>
            <text class="macro-ring-text" x="50" y="46"><tspan class="macro-ring-value" x="50" dy="0">${calc.protein}</tspan><tspan class="macro-ring-unit-text" x="50" dy="12">g</tspan></text>
          </svg>
          <div class="macro-ring-label">Protein</div>
          <div class="macro-ring-cal">${calc.protein * 4} kcal</div>
        </div>
        <div class="macro-ring-wrap">
          <svg class="macro-ring-svg" viewBox="0 0 100 100">
            <circle class="macro-ring-bg" cx="50" cy="50" r="39"/>
            <circle class="macro-ring-fill" id="carbsRing" cx="50" cy="50" r="39" stroke="#10B981"/>
            <text class="macro-ring-text" x="50" y="46"><tspan class="macro-ring-value" x="50" dy="0">${calc.carbs}</tspan><tspan class="macro-ring-unit-text" x="50" dy="12">g</tspan></text>
          </svg>
          <div class="macro-ring-label">Carbs</div>
          <div class="macro-ring-cal">${calc.carbs * 4} kcal</div>
        </div>
        <div class="macro-ring-wrap">
          <svg class="macro-ring-svg" viewBox="0 0 100 100">
            <circle class="macro-ring-bg" cx="50" cy="50" r="39"/>
            <circle class="macro-ring-fill" id="fatRing" cx="50" cy="50" r="39" stroke="#F97316"/>
            <text class="macro-ring-text" x="50" y="46"><tspan class="macro-ring-value" x="50" dy="0">${calc.fat}</tspan><tspan class="macro-ring-unit-text" x="50" dy="12">g</tspan></text>
          </svg>
          <div class="macro-ring-label">Fats</div>
          <div class="macro-ring-cal">${calc.fat * 9} kcal</div>
        </div>
      </div>
    </div>

    <div class="results-section-title">📊 BMI Analysis</div>
    <div class="results-bmi-card">
      <div class="bmi-split">
        <div class="bmi-result-value">
          <div class="bmi-number-big" style="color:${bmiCat.color}">${calc.bmi}</div>
          <div class="bmi-category-label" style="color:${bmiCat.color}">${bmiCat.label}</div>
          <div class="bmi-description">${bmiCat.desc}</div>
        </div>
        <div>
          <div class="bmi-scale">
            <div class="bmi-scale-item" style="--clr:#3B82F6"><span>Underweight</span><span>&lt; 18.5</span></div>
            <div class="bmi-scale-item" style="--clr:#10B981"><span>Normal</span><span>18.5–24.9</span></div>
            <div class="bmi-scale-item" style="--clr:#F59E0B"><span>Overweight</span><span>25–29.9</span></div>
            <div class="bmi-scale-item" style="--clr:#EF4444"><span>Obese</span><span>≥ 30</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="water-card">
      <div>
        <div class="water-amount">${calc.waterL}<span class="water-unit-label"> L</span></div>
        <div class="water-glasses">${Array.from({length:Math.ceil(calc.waterL * 4)}, (_,i) => `<span class="water-glass ${i < Math.ceil(calc.waterL * 4) ? 'filled' : ''}">💧</span>`).slice(0,10).join('')}</div>
      </div>
      <div class="water-desc">
        <strong>Daily Water Target</strong><br/>
        Based on your weight (${Math.round(calc.weightKg)}kg) × 0.033 plus a training bonus for your ${userData.days} training days. Hydration directly impacts strength output and recovery.
      </div>
    </div>

    <div class="results-section-title">🔄 Recovery Recommendations</div>
    <div class="recs-grid">${recoveryRecs.map(r => `<div class="rec-card"><div class="rec-card-icon">${r.icon}</div><h5>${r.title}</h5><p>${r.text}</p></div>`).join('')}</div>

    <div class="results-section-title">🌿 Lifestyle Recommendations</div>
    <div class="recs-grid">${lifestyleRecs.map(r => `<div class="rec-card"><div class="rec-card-icon">${r.icon}</div><h5>${r.title}</h5><p>${r.text}</p></div>`).join('')}</div>
  `;
}

function getRecoveryRecs() {
  const recs = [];
  const age = parseInt(document.getElementById('ageInput').value) || 25;

  if (userData.days >= 5) recs.push({ icon:'💤', title:'Prioritise Sleep', text:'Training 5+ days/week demands 7.5–9 hours of sleep. This is when growth hormone peaks and muscle fibres repair.' });
  else recs.push({ icon:'💤', title:'Sleep Quality', text:'Aim for 7–9 hours in a dark, cool room. Poor sleep undermines all your training gains.' });

  if (userData.sleep < 7) recs.push({ icon:'⚠️', title:'Sleep Debt Detected', text:`You reported ${userData.sleep}h of sleep. This is below optimal. Even 30–60 minutes more per night will noticeably improve recovery and body composition.` });
  else recs.push({ icon:'🛁', title:'Active Recovery', text:'On rest days, light walks, foam rolling, or yoga improve blood flow and reduce soreness without adding training stress.' });

  if (age >= 40) recs.push({ icon:'🧘', title:'Mobility Work', text:'At 40+, dedicating 10 minutes per session to joint mobility and flexibility pays dividends in longevity and injury prevention.' });
  else recs.push({ icon:'🏃', title:'Cardio Integration', text:'2–3 moderate cardio sessions weekly supports heart health, accelerates fat loss, and improves workout recovery.' });

  recs.push({ icon:'🧊', title:'Manage Soreness', text:'Cold exposure (cold shower, ice bath) reduces DOMS and accelerates readiness for the next session. Contrast therapy (hot/cold alternating) is particularly effective.' });
  return recs.slice(0,4);
}

function getLifestyleRecs() {
  const recs = [];
  if (userData.stressLevel === 'high') recs.push({ icon:'🧠', title:'Stress Management', text:'Chronic high stress elevates cortisol, which impairs fat loss and muscle gain. Daily 10-min meditation, breathing exercises, or nature walks measurably reduce cortisol levels.' });
  else recs.push({ icon:'🧠', title:'Mental Recovery', text:'Mental stress counts as physical stress. Build in screen-free time and activities you genuinely enjoy to keep cortisol in check.' });

  recs.push({ icon:'💧', title:`Water Target: ${userData.waterL || 2}L+`, text:`Your target is ${userData.waterL || 2}L daily. Start with a large glass on waking, and carry a water bottle. If your urine is pale yellow, you're well hydrated.` });

  if (userData.foodBudget === 'low') recs.push({ icon:'💵', title:'Budget Nutrition Tips', text:'Frozen veg, eggs, canned fish, oats and lentils are budget superfoods. Buy whole ingredients rather than supplements to maximise nutrition per pound spent.' });
  else if (userData.foodBudget === 'high') recs.push({ icon:'💎', title:'Premium Nutrition', text:'Invest in high-quality whole foods: wild-caught fish, grass-fed beef, organic produce. The quality of your food source matters, especially for micronutrient density.' });
  else recs.push({ icon:'💳', title:'Smart Shopping', text:'Meal prep 3–4 days at a time to reduce food costs and ensure you always have healthy options available, reducing impulse eating.' });

  recs.push({ icon:'📱', title:'Track Your Macros', text:'Even tracking loosely for 2–4 weeks builds nutritional awareness that lasts years. Apps like MyFitnessPal make this effortless — the data usually reveals surprising patterns.' });
  return recs.slice(0,4);
}

function buildTrainingTab(workoutDays) {
  const hasInjuries = !userData.injuries.includes('none');
  let html = '';

  if (hasInjuries) {
    html += `<div class="rec-card" style="border-color:var(--accent);background:rgba(249,115,22,0.05);margin-bottom:20px;">
      <div class="rec-card-icon">⚠️</div>
      <h5>Injury Modifications Applied</h5>
      <p>Your plan has been adjusted for: <strong>${userData.injuries.filter(i=>i!=='none').join(', ')}</strong>. Exercises with high injury risk for these areas have been excluded or flagged.</p>
    </div>`;
  }

  html += `<div class="results-section-title">📅 Weekly Workout Schedule</div>
  <div class="workout-schedule">`;

  workoutDays.forEach((day, idx) => {
    const isRest = day.badge === 'Rest';
    html += `<div class="workout-day-card">
      <div class="workout-day-header" onclick="this.nextElementSibling.classList.toggle('open')">
        <span class="workout-day-label">${day.name}</span>
        <span class="workout-day-badge">${day.badge}</span>
        <span class="workout-day-type">${isRest ? '— Rest &amp; Recover' : `${day.exercises.length} exercises`}</span>
      </div>
      <div class="workout-day-body ${idx === 0 ? 'open' : ''}">
        ${isRest ? '<div class="exercise-list-item">Active recovery — light walk, stretching or foam rolling</div>' :
          day.exercises.map(ex => `
            <div class="exercise-list-item">
              <span class="eli-name">${ex.name}</span>
              <span class="eli-sets">${ex.sets}</span>
              ${ex.note ? `<span class="eli-note">${ex.note}</span>` : ''}
            </div>`).join('')}
      </div>
    </div>`;
  });

  html += `</div>`;

  // Exercise recommendations
  const pool = filterInjuryExercises(getExercisesForLocation()).slice(0,6);
  html += `<div class="results-section-title">💡 Recommended Exercises For Your Profile</div>
  <div class="recs-grid">
    ${pool.slice(0,4).map(ex => `<div class="rec-card">
      <div class="rec-card-icon">🏋️</div>
      <h5>${ex.name}</h5>
      <p>${ex.description}</p>
    </div>`).join('')}
  </div>`;

  document.getElementById('trainingTabContent').innerHTML = html;
}

function buildNutritionTab(calc, meals) {
  const dietLabels = { standard:'Standard', vegetarian:'Vegetarian', vegan:'Vegan' };
  const dietLabel = dietLabels[userData.dietType] || 'Standard';
  const mealIcons = { breakfast:'🌅', lunch:'☀️', dinner:'🌙', snack:'🍎' };
  const mealNames = { breakfast:'Breakfast', lunch:'Lunch', dinner:'Dinner', snack:'Snack' };

  const mealKeys = userData.mealsPerDay <= 2 ? ['breakfast','dinner'] :
    userData.mealsPerDay === 3 ? ['breakfast','lunch','dinner'] :
    userData.mealsPerDay === 4 ? ['breakfast','lunch','dinner','snack'] :
    ['breakfast','lunch','dinner','snack','breakfast'];

  const uniqueKeys = ['breakfast','lunch','dinner','snack'].slice(0, Math.min(userData.mealsPerDay, 4));

  let html = `<div class="results-section-title">🍽️ ${dietLabel} Meal Plan · ${userData.mealsPerDay} Meals/Day</div>
  <div class="meals-plan">`;

  uniqueKeys.forEach(key => {
    if (!meals[key]) return;
    const m = meals[key];
    const approxCals = Math.round(calc.calories / uniqueKeys.length);
    html += `<div class="meal-plan-card">
      <div class="mpc-header">
        <span class="mpc-icon">${mealIcons[key]}</span>
        <span class="mpc-title">${mealNames[key]}</span>
        <span class="mpc-cals">~${approxCals} kcal</span>
      </div>
      <div class="mpc-body">
        <div class="mpc-name">${m.name}</div>
        <div class="mpc-desc">${m.desc}</div>
        <div class="mpc-macros">
          <span class="mpc-macro">🥩 <strong>${m.protein}g</strong> protein</span>
          <span class="mpc-macro">⚡ <strong>${m.carbs}g</strong> carbs</span>
          <span class="mpc-macro">🥑 <strong>${m.fat}g</strong> fat</span>
        </div>
      </div>
    </div>`;
  });

  html += `</div>`;

  // Nutrition progress targets
  html += `<div class="results-section-title">📈 Estimated Progress Expectations</div>`;
  const pct = (goal) => {
    const map = { 'fat-loss':75, 'muscle-gain':60, recomposition:55, strength:70, endurance:65, general:70 };
    return map[goal] || 65;
  };
  const progressItems = [
    { label:'Goal Achievement Likelihood', pct: pct(userData.goal), note:'Based on your consistency inputs' },
    { label:'Estimated Weekly Fat Loss', pct: userData.goal === 'fat-loss' ? 80 : userData.goal === 'recomposition' ? 50 : 20, note: userData.goal === 'fat-loss' ? '~0.5–0.75kg/week at 500kcal deficit' : 'Secondary outcome' },
    { label:'Estimated Strength Gain (Month 1)', pct: 70, note:'Beginners gain faster due to neural adaptations' },
    { label:'Cardio Endurance Improvement', pct: userData.goal === 'endurance' ? 85 : 60, note: userData.goal === 'endurance' ? 'Primary focus — rapid improvement expected' : '~15% VO2 max gain over 3 months' }
  ];
  html += progressItems.map(p => `
    <div class="progress-bar-wrap">
      <div class="progress-bar-label"><span>${p.label}</span><span>${p.pct}%</span></div>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${p.pct}%"></div></div>
      <div style="font-size:0.75rem;color:var(--text-muted);margin-top:3px;">${p.note}</div>
    </div>`).join('');

  document.getElementById('nutritionTabContent').innerHTML = html;
}

function buildRoadmapTab(milestones, calc) {
  let html = `<div class="results-section-title">🗺️ Your Achievement Roadmap</div>
  <div class="roadmap-timeline">
    ${milestones.map(m => `
      <div class="roadmap-milestone">
        <div class="milestone-date">${m.date}</div>
        <div class="milestone-title">${m.title}</div>
        <div class="milestone-desc">${m.desc}</div>
        <div class="milestone-badge">${m.badge}</div>
      </div>`).join('')}
  </div>`;

  // Key principles
  html += `<div class="results-section-title" style="margin-top:40px;">🔑 Key Principles for Success</div>
  <div class="recs-grid">
    <div class="rec-card"><div class="rec-card-icon">📸</div><h5>Progress Photos</h5><p>Take photos in the same lighting and pose every 4 weeks. The mirror lies; photos don't. This will be your most motivating data point.</p></div>
    <div class="rec-card"><div class="rec-card-icon">📋</div><h5>Log Everything</h5><p>Track your lifts, food, and how you feel after sessions. Data removes guesswork and reveals what's actually working.</p></div>
    <div class="rec-card"><div class="rec-card-icon">🔁</div><h5>Reassess Monthly</h5><p>Return to this planner monthly to update your weight and goals. Your plan should evolve as you do.</p></div>
    <div class="rec-card"><div class="rec-card-icon">🤝</div><h5>Accountability</h5><p>Training partners, coaches, or online communities dramatically increase adherence. Make yourself accountable to someone.</p></div>
  </div>`;

  document.getElementById('roadmapTabContent').innerHTML = html;
}

/* ── RESULTS TABS ── */
function initResultsTabs() {
  document.querySelectorAll('.result-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.result-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      document.querySelectorAll('.results-tab-content').forEach(c => c.classList.add('hidden'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      document.getElementById(`${target}TabContent`).classList.remove('hidden');
    });
  });
}

function animateMacroRings(calc) {
  requestAnimationFrame(() => {
    const totalCals = calc.calories;
    const proteinPct = (calc.protein * 4) / totalCals;
    const carbsPct = (calc.carbs * 4) / totalCals;
    const fatPct = (calc.fat * 9) / totalCals;

    const animate = (id, pct) => {
      const el = document.getElementById(id);
      if (el) { el.style.strokeDashoffset = 245 - (245 * Math.min(pct, 1)); }
    };

    setTimeout(() => {
      animate('proteinRing', proteinPct);
      animate('carbsRing', carbsPct);
      animate('fatRing', fatPct);
    }, 300);
  });
}

/* ── RESTART ── */
function restartPlanner() {
  document.getElementById('results').classList.add('hidden');
  document.getElementById('planner').classList.remove('hidden');
  currentStep = 1;
  updateProgress();
  document.querySelectorAll('.planner-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-1').classList.add('active');
  document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
}

/* ── EXERCISE LIBRARY ── */
function initExerciseLibrary() {
  renderExercises('all');

  document.getElementById('exerciseFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('#exerciseFilters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderExercises(btn.dataset.filter);
  });

  initExerciseModal();
}

function renderExercises(filter) {
  const grid = document.getElementById('exerciseGrid');
  const filtered = filter === 'all' ? EXERCISES : EXERCISES.filter(e => e.muscle === filter);
  const diffClass = { beginner:'tag-easy', intermediate:'tag-medium', advanced:'tag-hard' };

  grid.innerHTML = filtered.map(ex => `
    <div class="exercise-card" role="listitem" data-id="${ex.id}" tabindex="0" aria-label="Open ${ex.name} tutorial">
      <div class="exercise-card-img-wrap">
        <img class="exercise-card-img" src="${ex.image}" alt="${ex.name}" loading="lazy" width="400" height="300" onerror="this.src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&q=80'" />
        <div class="exercise-card-overlay" aria-hidden="true">
          <div class="exercise-play-btn">▶</div>
        </div>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-card-muscle">${ex.muscleDisplay}</div>
        <div class="exercise-card-name">${ex.name}</div>
        <div class="exercise-card-tags">
          <span class="exercise-tag ${diffClass[ex.difficulty]}">${ex.difficulty}</span>
          ${ex.location.map(l => `<span class="exercise-tag tag-easy">${l}</span>`).join('')}
        </div>
        ${ex.equipment ? `<div class="exercise-equip-tag">${ex.equipment}</div>` : ''}
      </div>
    </div>`).join('');

  grid.querySelectorAll('.exercise-card').forEach(card => {
    card.addEventListener('click', () => openExerciseModal(parseInt(card.dataset.id)));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openExerciseModal(parseInt(card.dataset.id)); } });
  });
}

function initExerciseModal() {
  const modal = document.getElementById('exerciseModal');
  const close = document.getElementById('modalClose');

  close.addEventListener('click', closeExerciseModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeExerciseModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeExerciseModal(); });
}

function openExerciseModal(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;

  document.getElementById('modalTitle').textContent = ex.name;
  document.getElementById('modalMuscle').textContent = ex.muscleDisplay;
  document.getElementById('modalDifficulty').textContent = ex.difficulty;
  document.getElementById('modalDesc').textContent = ex.description;
  document.getElementById('modalInstructions').innerHTML = ex.instructions.map(i => `<li>${i}</li>`).join('');
  document.getElementById('modalTips').innerHTML = ex.tips.map(t => `<li>${t}</li>`).join('');
  document.getElementById('modalEquipment').textContent = ex.equipment || 'Bodyweight';
  const mistakes = ex.mistakes || [];
  document.getElementById('modalMistakes').innerHTML = mistakes.map(m => `<li>${m}</li>`).join('');
  document.querySelector('.modal-mistakes-section').classList.toggle('hidden', mistakes.length === 0);
  document.getElementById('modalVideo').src = `https://www.youtube.com/embed/${ex.videoId}?rel=0`;

  document.getElementById('exerciseModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}

function closeExerciseModal() {
  document.getElementById('modalVideo').src = '';
  document.getElementById('exerciseModal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ── NUTRITION LIBRARY ── */
function initNutritionLibrary() {
  renderFoods('all');
  document.querySelector('.nutrition-filter-bar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.nutrition-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFoods(btn.dataset.nfilter);
  });
}

function renderFoods(filter) {
  const grid = document.getElementById('nutritionGrid');
  const filtered = filter === 'all' ? FOODS : FOODS.filter(f => f.category === filter);
  const maxMacro = 60;

  grid.innerHTML = filtered.map(f => `
    <div class="food-card" role="listitem">
      <div class="food-card-img-wrap">
        <img class="food-card-img" src="${f.image}" alt="${f.name}" loading="lazy" width="400" height="300" onerror="this.src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&q=80'" />
      </div>
      <div class="food-card-body">
        <div class="food-card-category">${f.category}</div>
        <div class="food-card-name">${f.name}</div>
        <div class="food-card-serving">${f.serving}</div>
        <div class="food-macros">
          <div class="food-macro-row">
            <span class="food-macro-label">Protein</span>
            <div class="food-macro-bar-wrap"><div class="food-macro-bar bar-protein" style="width:${Math.min(100,(f.protein/maxMacro)*100)}%"></div></div>
            <span class="food-macro-val protein">${f.protein}g</span>
          </div>
          <div class="food-macro-row">
            <span class="food-macro-label">Carbs</span>
            <div class="food-macro-bar-wrap"><div class="food-macro-bar bar-carbs" style="width:${Math.min(100,(f.carbs/maxMacro)*100)}%"></div></div>
            <span class="food-macro-val carbs">${f.carbs}g</span>
          </div>
          <div class="food-macro-row">
            <span class="food-macro-label">Fat</span>
            <div class="food-macro-bar-wrap"><div class="food-macro-bar bar-fat" style="width:${Math.min(100,(f.fat/maxMacro)*100)}%"></div></div>
            <span class="food-macro-val fat">${f.fat}g</span>
          </div>
        </div>
        <div class="food-calories-row">
          <span class="food-calories">${f.calories} kcal</span>
          <span class="food-cal-label">per serving</span>
        </div>
      </div>
    </div>`).join('');
}

/* ── BMI CALCULATOR ── */
function initBmiCalculator() {
  let bmiHeightUnit = 'cm';
  let bmiWeightUnit = 'kg';

  document.getElementById('bmiHeightCm').addEventListener('click', () => {
    bmiHeightUnit = 'cm';
    document.getElementById('bmiHeightCm').classList.add('active');
    document.getElementById('bmiHeightFt').classList.remove('active');
  });
  document.getElementById('bmiHeightFt').addEventListener('click', () => {
    bmiHeightUnit = 'ft';
    document.getElementById('bmiHeightFt').classList.add('active');
    document.getElementById('bmiHeightCm').classList.remove('active');
  });
  document.getElementById('bmiWeightKg').addEventListener('click', () => {
    bmiWeightUnit = 'kg';
    document.getElementById('bmiWeightKg').classList.add('active');
    document.getElementById('bmiWeightLbs').classList.remove('active');
  });
  document.getElementById('bmiWeightLbs').addEventListener('click', () => {
    bmiWeightUnit = 'lbs';
    document.getElementById('bmiWeightLbs').classList.add('active');
    document.getElementById('bmiWeightKg').classList.remove('active');
  });

  document.getElementById('calcBmi').addEventListener('click', () => {
    let h = parseFloat(document.getElementById('bmiHeight').value);
    let w = parseFloat(document.getElementById('bmiWeight').value);
    if (!h || !w || h <= 0 || w <= 0) { document.getElementById('bmiCategory').textContent = 'Please enter valid values'; return; }

    if (bmiHeightUnit === 'ft') h = h * 30.48;
    if (bmiWeightUnit === 'lbs') w = w / 2.205;

    const bmi = +(w / ((h/100)**2)).toFixed(1);
    const cat = calculateBmiCategory(bmi);

    document.getElementById('bmiGaugeNumber').textContent = bmi;
    document.getElementById('bmiCategory').textContent = `${bmi} — ${cat.label}`;
    document.getElementById('bmiCategory').style.color = cat.color;
    document.getElementById('bmiGaugeFill').style.stroke = cat.color;

    // Animate gauge — BMI 15 = 0%, 35 = 100%
    const progress = Math.min(1, Math.max(0, (bmi - 15) / 20));
    document.getElementById('bmiGaugeFill').style.strokeDashoffset = 283 - (283 * progress);
    document.getElementById('bmiNote').textContent = cat.desc;
  });
}

/* ── TIPS ── */
function initTips() {
  document.getElementById('tipsGrid').innerHTML = TIPS.map((t, i) => `
    <div class="tip-card animate-on-scroll" role="listitem">
      <span class="tip-card-num" aria-hidden="true">${String(i+1).padStart(2,'0')}</span>
      <span class="tip-card-emoji" aria-hidden="true">${t.emoji}</span>
      <h3>${t.title}</h3>
      <p>${t.text}</p>
    </div>`).join('');
}

/* ── FAQ ── */
function initFaq() {
  const grid = document.getElementById('faqGrid');

  grid.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${i}">
        ${f.q}
        <span class="faq-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      <div class="faq-answer" id="faq-ans-${i}" role="region" aria-labelledby="faq-q-${i}">
        <div class="faq-answer-inner">${f.a}</div>
      </div>
    </div>`).join('');

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });
}

/* ── INTERSECTION OBSERVER ── */
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('animated'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}
