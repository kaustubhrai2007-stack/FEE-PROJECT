// id,name,icon,category,body,hue,members,capacity,leader,meeting,place,description
const CLUBS=[
['athletica','Athletica Club','🏃','Sports','OSL',95,25,40,'Hardik Nakra','Tue & Thu, 6:00 PM','Sports Ground','Athletica Sports Club is dedicated to promoting sportsmanship, teamwork, discipline, and fitness among students. Through tournaments, recreational games, fitness challenges, and sporting events, the club gives students chances to stay active, represent the university, build confidence, and make lasting friendships.'],
['chess','Chess Paradox Club','♟️','Academic','OSL',220,85,100,'Aarav Mehta','Wed, 6:00 PM','Library Annex','Weekly puzzles, blitz nights and inter-college chess championships for players of every level.'],
['film','Film Making Club','🎬','Arts','OSA',280,60,80,'Simran Kaur','Sat, 3:00 PM','Media Lab','Write, shoot and edit short films, from campus documentaries to festival entries.'],
['mun','MUN Club','🏛️','Academic','OSA',210,110,120,'Ishaan Verma','Tue, 5:00 PM','Seminar Hall B','Represent nations, debate global issues, and compete at Model UN conferences nationwide.'],
['dj','DJ Club','🎧','Cultural','OSA',300,40,50,'Karan Malhotra','Thu, 7:00 PM','Sound Studio','Learn mixing and production, and play sets at the biggest nights on campus.'],
['karate','Karate Club','🥋','Sports','OSL',10,95,100,'Rohit Sharma','Mon/Wed/Fri, 6:00 AM','Sports Complex','Structured belt training, sparring and self-defence for beginners and black belts alike.'],
['research','Chitkara Research Club','🔬','Technical','OSA',190,70,80,'Dr. Neha Gupta (mentor)','Fri, 4:00 PM','Research Block','Work on real research papers, publish with faculty mentors, and present at conferences.'],
['canvas','Color Canvas Club','🎨','Arts','OSA',340,55,60,'Anika Sood','Sat, 11:00 AM','Art Studio','Painting, illustration and live-art events. All mediums, all skill levels welcome.'],
['f1','F1 Club','🏁','Other','OSL',0,65,80,'Dev Arora','Sun, 4:00 PM','Common Room','Race strategy discussions, sim-racing tournaments and a shared love for the sport.'],
['fin','Finprenuer','📈','Academic','OSL',150,80,90,'Mehak Jain','Tue, 6:00 PM','B-School Block','Stock market simulations, startup pitches and finance case competitions.'],
['animal','Animal Welfare Club','🐾','Volunteer','NSS',130,45,60,'Tanvi Bansal','Sun, 9:00 AM','Gate 2','Campus stray care, adoption drives and awareness campaigns.'],
['yoga','Yoga Club','🧘','Social','NSS',170,100,100,'Pooja Rani','Daily, 6:30 AM','Wellness Lawn','Morning yoga, breathwork and mindfulness sessions to start your day right.'],
['dsa','Data Structures & Algorithms','💻','Technical','OSA',230,120,150,'Yash Thakur','Mon & Thu, 5:00 PM','CS Lab 3','Weekly problem solving, mock interviews and contest practice for placements.'],
['writing','Writing Screen Arts','✍️','Arts','OSA',20,35,50,'Riya Chopra','Fri, 3:00 PM','Media Lab','Screenwriting workshops, script readings and storytelling sessions.'],
['fashion','Fashion Grooming','👗','Cultural','OSA',330,48,60,'Mansi Kapoor','Sat, 2:00 PM','Design Studio','Styling, grooming and ramp-walk training with a showcase every semester.'],
['reading','Reading Club','📚','Social','OSL',40,52,70,'Arjun Singh','Wed, 4:30 PM','Library Lounge','Monthly book picks, discussion circles and author talks.']
].map((r,i)=>({id:r[0],n:r[1],i:r[2],cat:r[3],b:r[4],h:r[5],m:r[6],cap:r[7],lead:r[8],meet:r[9],place:r[10],d:r[11],pe:5-(i%3)}));
const CORE=[['Rose Chawla','Discipline and management'],['Bharat Saini','Co-leader'],['Neev','Media head'],['Himanshu Tayal','Management']];
// id,title,category,date,time,venue,club,capacity,already registered,description
const EVENTS=[
['hack','Chitkara HackFest 2026','Technical','2026-10-24','10:00 AM','Innovation Lab','dsa',200,164,'A 24-hour hackathon to build bold, working tech.'],
['fiesta','Cultural Fiesta 2026','Cultural','2026-10-17','5:00 PM','Main Auditorium','dj',500,310,'An evening of dance, music and drama by student performers.'],
['sports','Inter-College Sports Meet','Sports','2026-10-12','8:00 AM','Sports Ground','athletica',300,120,'Compete against other colleges across multiple sports.'],
['ai','AI & Innovation Workshop','Workshop','2026-10-15','2:00 PM','Seminar Hall C','research',80,80,'Learn the basics of AI and how it is shaping innovation.'],
['blitz','Blitz Chess Championship','Competition','2026-10-20','4:00 PM','Library Annex','chess',64,40,'Fast-paced rated blitz tournament with prizes.'],
['mun26','Chitkara MUN 2026','Competition','2026-11-07','9:00 AM','Seminar Hall B','mun',150,95,'Two days of committee debates and crisis simulations.'],
['run','Sunrise 5K Run','Sports','2026-10-11','6:00 AM','Main Gate','athletica',250,88,'Open 5K fun run around campus, medals for all finishers.'],
['canv','Live Art Jam','Arts','2026-10-30','11:00 AM','Art Studio','canvas',60,22,'Paint live with fellow artists while music plays.'],
['yogaD','Wellness Morning Workshop','Workshop','2026-10-09','6:30 AM','Wellness Lawn','yoga',100,41,'Guided yoga and breathwork to start the day.'],
['meet','Freshers Meet & Greet','Social','2026-10-14','4:00 PM','Wellness Lawn','reading',120,50,'Meet seniors, clubs and new friends over snacks and games.'],
['past1','Annual Sports Day','Sports','2026-09-05','8:00 AM','Sports Ground','athletica',300,280,'Track and field events across all departments.'],
['past2','Freshers Film Night','Cultural','2026-09-14','6:00 PM','Main Auditorium','film',400,360,'Short film screenings for the new batch.'],
['past3','Quiz Mania','Competition','2026-09-20','3:00 PM','Seminar Hall A','fin',100,100,'Business and finance quiz with team rounds.']
].map(r=>({id:r[0],t:r[1],cat:r[2],date:r[3],time:r[4],v:r[5],club:r[6],cap:r[7],n:r[8],d:r[9]}));
