const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const S={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
{const us=S.get('cc_users',[]);[['Demo Student','demo@chitkara.edu.in','demo123','student'],['Campus Admin','admin@chitkara.edu.in','admin123','admin'],['Club Leader','leader@chitkara.edu.in','leader123','leader']].forEach((r,i)=>{if(!us.some(u=>u.email==r[1]))us.push({name:r[0],email:r[1],roll:'241000000'+i,pw:r[2],role:r[3],club:r[3]=='leader'?'athletica':'',clubs:[],events:[]})});S.set('cc_users',us);S.get('cc_events',[]).forEach(e=>EVENTS.push(e))}
const me=()=>S.get('cc_user',null);
const save=u=>{S.set('cc_user',u);S.set('cc_users',S.get('cc_users',[]).map(x=>x.email==u.email?u:x))};
const page=document.body.dataset.page||(location.pathname.split('/').pop().replace('.html','')||'index');
const qs=new URLSearchParams(location.search);
const grad=h=>`linear-gradient(135deg,hsl(${h} 65% 32%),hsl(${(h+35)%360} 75% 14%))`;
const dt=s=>{const d=new Date(s+'T00:00');return{d:String(d.getDate()).padStart(2,'0'),m:d.toLocaleString('en',{month:'short'}),past:d<new Date(new Date().toDateString())}};
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.append(t)}t.textContent=m;t.className='show';clearTimeout(t._t);t._t=setTimeout(()=>t.className='',2400)}
function needLogin(){toast('Please log in first');setTimeout(()=>location.href='login.html?next='+encodeURIComponent(location.pathname.split('/').pop()+location.search),700)}
const joined=c=>(me()?.clubs||[]).includes(c.id), reg=e=>(me()?.events||[]).includes(e.id);
const members=c=>c.m+(joined(c)?1:0), taken=e=>e.n+(reg(e)?1:0);
const clubOf=id=>CLUBS.find(c=>c.id==id);


const LOGO={athletica:'images/athletica-logo.jpg'};
const banner=(c,wide)=>{const W=wide?1600:800,H=400,w=c.n.replace(/&/g,'').split(' ')[0].toUpperCase(),fs=Math.min(wide?300:220,W*.66/(w.length*.62)),k=`hsl(${c.h} 70% 36%)`;
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${c.h} 20% 94%)'/><stop offset='1' stop-color='hsl(${c.h} 35% 68%)'/></linearGradient></defs><rect width='${W}' height='${H}' fill='url(#g)'/><g fill='${k}' opacity='.28'><polygon points='0,50 170,0 215,0 0,105'/><polygon points='0,135 95,85 120,85 0,170'/></g><text x='${W*.04}' y='${H*.64}' font-family='Impact,Arial Black,sans-serif' font-style='italic' font-weight='900' font-size='${fs}' fill='${k}' opacity='.92' transform='skewX(-8)'>${w}</text><text x='${W*.84}' y='${H*.74}' font-size='${wide?260:190}' text-anchor='middle'>${c.i}</text></svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g,'%27')}')`};
const bg=(c,wide)=>`background-image:url('images/${c.id}.jpg'),${banner(c,wide)}`;
function navbar(){
  const u=me(),L=[['index.html','Home'],['clubs.html','Clubs'],['events.html','Events'],['index.html#about','About']];
  if(u)L.push(['dashboard.html','My Space']);if(u&&['admin','leader'].includes(u.role))L.push(['admin.html','Admin']);
  const h=`<header class="navbar"><div class="container navbar-inner"><a href="index.html" class="logo"><span class="logo-mark">CC</span><span class="logo-text-group"><span class="logo-title">Chitkara</span><span class="logo-subtitle">CAMPUS CONNECT</span></span></a>
  <nav class="menu" id="menu">${L.map(l=>`<a href="${l[0]}" class="${page==l[0].replace('.html','')?'on':''}">${l[1]}</a>`).join('')}</nav>
  <div class="nav-actions">${u?`<span class="hi">Hi, ${u.name.split(' ')[0]}</span><button class="btn btn-primary" id="lo">Logout</button>`:`<a class="btn btn-outline" href="login.html">⇥ Login</a><a class="btn btn-primary" href="register.html">Sign Up</a>`}</div>
  <button class="burger" id="bg" aria-label="Menu">☰</button></div></header>`;
  $('.navbar').outerHTML=h;
  $('#bg').onclick=()=>$('#menu').classList.toggle('open');
  $('#lo')&&($('#lo').onclick=()=>{localStorage.removeItem('cc_user');toast('Logged out');setTimeout(()=>location.href='index.html',500)});
}
const hero=(a,b,c)=>`<section class="phero"><div class="container"><span class="ey"><i></i>${a}</span><h1>${b}</h1><p>${c}</p></div></section>`;
const clubCard=c=>`<a class="ccard" href="club.html?id=${c.id}"><div class="cb" style="${bg(c)}"><span class="pill">${c.cat}</span><span class="ico">${c.i}</span></div><div class="cbd"><h3>${c.n}</h3><p>${c.d.slice(0,85)}…</p><div class="cm"><span>👥 ${members(c)}/${c.cap}</span><span class="bdg">${c.b}</span></div></div></a>`;
function evCard(e){const x=dt(e.date),c=clubOf(e.club),t=taken(e),full=t>=e.cap,r=reg(e);
  return `<article class="evc"><div class="evb" style="${bg(c)}"><span class="edate"><strong>${x.d}</strong>${x.m}</span><span class="pill">${e.cat}</span></div><div class="evd"><h3>${e.t}</h3><p class="em">🕒 ${e.time} · 📍 ${e.v}</p><p class="em"><a href="club.html?id=${c.id}">${c.n}</a></p><p class="ed">${e.d}</p>
  <div class="bar"><i style="width:${Math.min(100,t/e.cap*100)}%"></i></div><p class="em">${t}/${e.cap} registered</p>
  ${x.past?'<button class="btn btn-outline btn-block" disabled>Event ended</button>':`${r?`<button class="btn btn-primary btn-block" data-tk="${e.id}">🎟 View ticket</button>`:''}<button class="btn ${r?'btn-outline':'btn-primary'} btn-block" data-ev="${e.id}" ${full&&!r?'disabled':''}>${r?'Cancel registration':full?'Sold out':'Register'}</button>`}</div></article>`}

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-ev],[data-club],[data-tk]');if(!b)return;
  const u=me();if(!u)return needLogin();
  if(b.dataset.tk)return ticket(b.dataset.tk);
  if(b.dataset.ev){const k=u.events,i=k.indexOf(b.dataset.ev);i<0?k.push(b.dataset.ev):k.splice(i,1);toast(i<0?'Registered for event 🎉':'Registration cancelled')}
  else{const k=u.clubs,i=k.indexOf(b.dataset.club);i<0?k.push(b.dataset.club):k.splice(i,1);toast(i<0?'Welcome to the club! 🎉':'You left the club')}
  save(u);window.redraw&&redraw();window.sug&&sug();if(b.dataset.ev&&u.events.includes(b.dataset.ev))ticket(b.dataset.ev);
});
function filters(st,draw){$$('[data-k]').forEach(b=>b.onclick=()=>{st[b.dataset.k]=b.dataset.v;$$(`[data-k="${b.dataset.k}"]`).forEach(x=>x.classList.toggle('on',x==b));draw()});$('#q').oninput=e=>{st.q=e.target.value.toLowerCase();draw()}}
const btns=(k,a,s)=>a.map((v,i)=>`<button data-k="${k}" data-v="${v}" class="${(s?v==s:!i)?'on':''}">${v}</button>`).join('');
const EC=['All','Technical','Cultural','Sports','Workshop','Competition','Arts','Social'];
const CATS=['All','Cultural','Technical','Sports','Arts','Academic','Social','Volunteer','Other'];

const P={};
P.index=()=>{const up=EVENTS.filter(e=>!dt(e.date).past).length,s=$$('.hero-stats strong');$('.hero-badge')&&($('.hero-badge').lastChild.textContent=` ${up} upcoming events`);if(s[2]){s[0].textContent=CLUBS.length;s[1].textContent=EVENTS.length;s[2].textContent=CLUBS.reduce((x,c)=>x+c.m,0);s[2].nextElementSibling.textContent='Members'}
  $('#clubs .eyebrow')&&($('#clubs .eyebrow').textContent=CLUBS.length+' communities');if($('.club-card-more')){$('.club-card-more h3').textContent=`View all ${CLUBS.length} clubs`;$('.club-card-more .club-tag').textContent='Search by stream & interest'}
  $$('.category-card').forEach(c=>{const t=c.querySelector('h3').textContent.trim();c.style.cursor='pointer';c.onclick=()=>location.href='events.html?cat='+({Workshops:'Workshop',Competitions:'Competition',Music:'Cultural'}[t]||t)});const g=$('.event-grid');if(g){window.redraw=()=>g.innerHTML=EVENTS.filter(e=>!dt(e.date).past).sort((a,b)=>a.date>b.date?1:-1).slice(0,4).map(evCard).join('');redraw()}
  $$('a[href="#events"].btn').forEach(a=>a.href='events.html');$$('a[href="#clubs"].btn').forEach(a=>a.href='clubs.html');$('.club-card-more')&&($('.club-card-more').href='clubs.html')};
P.clubs=()=>{const st={q:'',b:'All',c:'All'};
  $('#app').innerHTML=hero('Student Clubs','Find Your Community',`Explore ${CLUBS.length}+ active clubs across sports, arts, academics, and more.`)+`<div class="container"><div class="search">🔍<input id="q" placeholder="Search clubs by name or description…"></div><div class="tabs">${btns('b',['All','OSL','OSA','NSS'])}</div><div class="chips">${btns('c',CATS)}</div><p class="count" id="cn"></p><div class="cgrid" id="gr"></div></div>`;
  window.redraw=()=>{const r=CLUBS.filter(c=>(st.b=='All'||c.b==st.b)&&(st.c=='All'||c.cat==st.c)&&(c.n+c.d).toLowerCase().includes(st.q));$('#gr').innerHTML=r.map(clubCard).join('')||'<p class="empty">No clubs match your search.</p>';$('#cn').innerHTML=`Showing <b>${r.length}</b> of <b>${CLUBS.length}</b> clubs`};
  filters(st,redraw);redraw()};
P.events=()=>{const st={q:'',t:'Upcoming',c:EC.includes(qs.get('cat'))?qs.get('cat'):'All'};
  $('#app').innerHTML=hero('Campus Events','Never Miss a Moment','Register for fests, workshops and competitions in one tap.')+`<div class="container"><div class="search">🔍<input id="q" placeholder="Search events…"></div><div class="tabs">${btns('t',['Upcoming','Past','My Events'])}</div><div class="chips">${btns('c',EC,st.c)}</div><p class="count" id="cn"></p><div class="cgrid" id="gr"></div></div>`;
  window.redraw=()=>{const r=EVENTS.filter(e=>{const p=dt(e.date).past;return(st.t=='Past'?p:st.t=='My Events'?reg(e):!p)&&(st.c=='All'||e.cat==st.c)&&(e.t+e.d).toLowerCase().includes(st.q)}).sort((a,b)=>a.date>b.date?1:-1);$('#gr').innerHTML=r.map(evCard).join('')||'<p class="empty">No events found.</p>';$('#cn').innerHTML=`Showing <b>${r.length}</b> events`};
  filters(st,redraw);redraw()};
P.club=()=>{const c=clubOf(qs.get('id'));if(!c)return $('#app').innerHTML='<p class="empty" style="padding:120px 0">Club not found. <a href="clubs.html">Back to clubs</a></p>';
  document.title=c.n+' — Chitkara Campus Connect';let more=false;
  window.redraw=()=>{const m=members(c),j=joined(c),up=EVENTS.filter(e=>e.club==c.id&&!dt(e.date).past),pe=EVENTS.filter(e=>e.club==c.id&&dt(e.date).past).length||c.pe,full=m>=c.cap&&!j,txt=c.d+(c.d.length<200?' Everyone is welcome, whatever your experience level. Come along to a session and see if it fits.':'');
  $('#app').innerHTML=`<section class="chero" style="${bg(c,1)}"><div class="container"><a href="clubs.html" class="back">← All Clubs</a><div class="chrow"><div class="clogo">${LOGO[c.id]?`<img src="${LOGO[c.id]}" alt="">`:c.i}</div><div><span class="pill">${c.cat}</span> <span class="pill ol">${c.b}</span><h1>${c.n}</h1><p>👥 ${m} / ${c.cap} members</p></div></div></div></section>
  <div class="container cwrap"><div><h2 class="h2">About the Club</h2><div class="about ${more?'':'clamp'}">${txt}</div><button class="lnk" id="mo">${more?'Show less ↑':'Show more ↓'}</button>
  <h2 class="h2">Core Members <span class="cnt">4</span></h2><div class="mgrid">${CORE.map((p,i)=>`<div class="mem"><span class="av av${i}">${p[0].split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</span><div><b>${p[0]}</b><small>${p[1]}</small><em>Core Member</em></div></div>`).join('')}</div>
  <h2 class="h2">Upcoming Events</h2>${up.length?`<div class="cgrid two">${up.map(evCard).join('')}</div>`:'<div class="emptybox">📅 No upcoming events yet. Check back soon.</div>'}</div>
  <aside><div class="side"><h4>Club Info</h4><p class="row">👥 <span><small>MEMBERS</small>${m} / ${c.cap}</span></p><p class="row">🗓️ <span><small>MEETS</small>${c.meet}</span></p><p class="row">📍 <span><small>LOCATION</small>${c.place}</span></p><div class="bar"><i style="width:${m/c.cap*100}%"></i></div>
  <button class="btn ${j?'btn-outline':'btn-primary'} btn-block" data-club="${c.id}" ${full?'disabled':''}>${j?'✓ Joined · Leave club':full?'Club is full':'Join this club'}</button>
  <h4>Club Leader</h4><div class="lead"><span class="av av1">${c.lead.split(' ').map(w=>w[0]).join('').slice(0,2)}</span><b>${c.lead}</b></div></div>
  <div class="side"><h4>Statistics</h4><div class="stats"><div><strong>${m}</strong>Members</div><div><strong>${pe}</strong>Past Events</div></div></div>
  <div class="side"><h4>Find us online</h4><a class="ig" href="https://www.instagram.com/" target="_blank" rel="noopener">◎</a></div></aside></div>`;
  $('#mo').onclick=()=>{more=!more;redraw()}};redraw()};
P.dashboard=()=>{const u=me();if(!u)return needLogin();
  window.redraw=()=>{const u=me();$('#app').innerHTML=hero('My Space',`Welcome, ${u.name.split(' ')[0]}`,`${u.email} · Roll no. ${u.roll||'—'}`)+`<div class="container"><h2 class="h2">My Clubs <span class="cnt">${u.clubs.length}</span></h2><div class="cgrid">${u.clubs.map(i=>clubCard(clubOf(i))).join('')||'<div class="emptybox">You have not joined any club. <a href="clubs.html">Browse clubs</a></div>'}</div>
  <h2 class="h2">My Events <span class="cnt">${u.events.length}</span></h2><div class="cgrid">${u.events.map(i=>evCard(EVENTS.find(e=>e.id==i))).join('')||'<div class="emptybox">No registrations yet. <a href="events.html">Find events</a></div>'}</div></div>`};redraw()};


const tid=(u,e)=>'CC-'+[...(u.email+e.id)].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7).toString(36).toUpperCase();
const tp=(e,add=0)=>{const m=e.time.match(/(\d+):(\d+)\s*(AM|PM)/i),d=new Date(e.date+'T00:00'),z=n=>String(n).padStart(2,'0');d.setHours(+m[1]%12+(/pm/i.test(m[3])?12:0)+add,+m[2]);return d.getFullYear()+z(d.getMonth()+1)+z(d.getDate())+'T'+z(d.getHours())+z(d.getMinutes())+'00'};
function ticket(id){const u=me(),e=EVENTS.find(x=>x.id==id),c=clubOf(e.club),x=dt(e.date),code=tid(u,e);let m=$('#tm');if(!m){m=document.createElement('div');m.id='tm';m.className='ov';document.body.append(m)}
  const g=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.t)}&dates=${tp(e)}/${tp(e,2)}&location=${encodeURIComponent(e.v+', Chitkara University')}&details=${encodeURIComponent(e.d)}`;
  m.innerHTML=`<div class="fbox tk"><button class="fx" id="tx">✕</button><div class="tkh" style="${bg(c)}"><span class="pill">${e.cat}</span><h3>${e.t}</h3></div><div class="tkb"><div class="tkq" id="qr"></div><div><small>ATTENDEE</small><b>${u.name}</b><small>ROLL NO.</small><b>${u.roll||'—'}</b><small>DATE &amp; TIME</small><b>${x.d} ${x.m} · ${e.time}</b><small>VENUE</small><b>${e.v}</b></div></div><p class="tkc">${code}</p><div class="fa"><a href="${g}" target="_blank" rel="noopener">＋ Google Calendar</a><button id="ics">⬇ .ics file</button></div></div>`;
  m.classList.add('show');const mk=()=>new QRCode($('#qr'),{text:`CC|${e.id}|${u.email}|${code}`,width:120,height:120});
  window.QRCode?mk():Object.assign(document.head.appendChild(document.createElement('script')),{src:'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',onload:mk,onerror:()=>$('#qr').textContent=code});
  $('#ics').onclick=()=>{const t=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nUID:${code}@campusconnect\r\nDTSTART:${tp(e)}\r\nDTEND:${tp(e,2)}\r\nSUMMARY:${e.t}\r\nLOCATION:${e.v}\r\nDESCRIPTION:${e.d}\r\nEND:VEVENT\r\nEND:VCALENDAR`,l=document.createElement('a');l.href=URL.createObjectURL(new Blob([t],{type:'text/calendar'}));l.download=e.id+'.ics';l.click()};
  $('#tx').onclick=()=>m.classList.remove('show');m.onclick=ev=>ev.target==m&&m.classList.remove('show')}
P.admin=()=>{const u=me();if(!u||!['admin','leader'].includes(u.role))return $('#app').innerHTML=hero('Restricted','Admin Panel','Sign in with an admin or club-leader account.')+'<div class="container"><div class="emptybox" style="margin:40px 0">Demo: <b>admin@chitkara.edu.in / admin123</b> or <b>leader@chitkara.edu.in / leader123</b>. <a href="login.html?next=admin.html">Login</a></div></div>';
  const cl=u.role=='admin'?CLUBS:CLUBS.filter(c=>c.id==u.club),ids=cl.map(c=>c.id);
  window.redraw=()=>{const us=S.get('cc_users',[]),ev=EVENTS.filter(e=>ids.includes(e.club)).sort((a,b)=>a.date<b.date?1:-1),mem=us.filter(x=>x.clubs.some(i=>ids.includes(i))),regs=us.reduce((n,x)=>n+x.events.filter(i=>ev.some(e=>e.id==i)).length,0);
  const I=(l,n,t='text',x='')=>`<label class="field-label">${l}</label><input name="${n}" type="${t}" required ${x}>`;
  $('#app').innerHTML=hero(u.role=='admin'?'Admin panel':'Club leader panel','Manage Events',`Signed in as ${u.name}. ${u.role=='admin'?'You can manage every club.':'You manage '+cl[0].n+'.'}`)+`<div class="container"><div class="astats"><div><strong>${cl.length}</strong>Clubs</div><div><strong>${ev.length}</strong>Events</div><div><strong>${mem.length}</strong>Members joined</div><div><strong>${regs}</strong>Registrations</div></div>
  <div class="acols"><form id="ef" class="side"><h4>Create event</h4>${I('Title','t')}<label class="field-label">Club</label><select name="club">${cl.map(c=>`<option value="${c.id}">${c.n}</option>`).join('')}</select><label class="field-label">Category</label><select name="cat">${EC.slice(1).map(c=>`<option>${c}</option>`).join('')}</select>${I('Date','date','date')}${I('Time','time','time')}${I('Venue','v')}${I('Capacity','cap','number','min=1 value=100')}<label class="field-label">Description</label><textarea name="d" rows="2"></textarea><button class="btn btn-primary btn-block">Publish event</button></form>
  <div><h2 class="h2">Events &amp; registrations</h2><div class="tw"><table><tr><th>Event</th><th>Date</th><th>Registered</th><th></th></tr>${ev.map(e=>{const r=us.filter(x=>x.events.includes(e.id));return `<tr><td><b>${e.t}</b><small>${clubOf(e.club).n}${r.length?' · '+r.map(x=>x.name).join(', '):''}</small></td><td>${e.date}</td><td>${e.n+r.length}/${e.cap}</td><td>${e.custom?`<button class="del" data-del="${e.id}">Delete</button>`:''}</td></tr>`}).join('')}</table></div>
  <h2 class="h2">Members <span class="cnt">${mem.length}</span></h2><div class="tw"><table><tr><th>Name</th><th>Roll no.</th><th>Year</th><th>Club</th></tr>${mem.map(x=>`<tr><td>${x.name}<small>${x.email}</small></td><td>${x.roll}</td><td>${x.year||'—'}</td><td>${x.clubs.filter(i=>ids.includes(i)).map(i=>clubOf(i).n).join(', ')}</td></tr>`).join('')||'<tr><td colspan=4>No members yet.</td></tr>'}</table></div></div></div></div>`;
  $('#ef').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),v=k=>f.get(k),[H,M]=v('time').split(':'),n={id:'c'+Date.now(),t:v('t'),cat:v('cat'),date:v('date'),time:`${H%12||12}:${M} ${H<12?'AM':'PM'}`,v:v('v'),club:v('club'),cap:+v('cap'),n:0,d:v('d')||'Join us for this event.',custom:1};S.set('cc_events',[...S.get('cc_events',[]),n]);EVENTS.push(n);toast('Event published 🎉');redraw()};
  $$('[data-del]').forEach(b=>b.onclick=()=>{S.set('cc_events',S.get('cc_events',[]).filter(e=>e.id!=b.dataset.del));EVENTS.splice(EVENTS.findIndex(e=>e.id==b.dataset.del),1);toast('Event deleted');redraw()})};redraw()};
function auth(){
  const f=$('.auth-form');if(!f)return;const next=qs.get('next')||'dashboard.html';
  if(page=='register'){
    $('#club').innerHTML='<option value="" selected disabled>Choose a club</option>'+CLUBS.map(c=>`<option value="${c.id}">${c.n}</option>`).join('')+'<option value="none">Other / Not sure yet</option>';
    $('#reason').previousElementSibling.insertAdjacentHTML('beforebegin','<label class="field-label" for="pw">Create Password *</label><input type="password" id="pw" placeholder="At least 6 characters" minlength="6" required>');
    const pre=qs.get('club');if(pre)$('#club').value=pre;
  }
  f.onsubmit=e=>{e.preventDefault();const us=S.get('cc_users',[]);
    if(page=='login'){const id=$('#email').value.trim().toLowerCase(),u=us.find(x=>(x.email.toLowerCase()==id||x.roll==id)&&x.pw==$('#password').value);
      if(!u)return toast('Wrong email or password. Try demo@chitkara.edu.in / demo123');S.set('cc_user',u);toast('Welcome back!');}
    else{const em=$('#email').value.trim().toLowerCase();if(us.some(x=>x.email==em))return toast('An account with this email already exists');
      const cl=$('#club').value,u={name:$('#fullname').value.trim(),email:em,roll:$('#roll').value.trim(),pw:$('#pw').value,clubs:CLUBS.some(c=>c.id==cl)?[cl]:[],events:[],role:'student',year:$('#year').value,reason:$('#reason').value};
      S.set('cc_users',[...us,u]);S.set('cc_user',u);toast('Account created!');}
    setTimeout(()=>location.href=next,600)};
}

const TESTI=[
['Being part of the Drama Society helped me overcome stage fright. Now I perform in front of hundreds of students, something I never thought possible.','Aliza Khan','Drama Club','Member',330],
['Running the Entrepreneurship Club connected me with mentors and fellow founders. We launched a startup together that is now generating real revenue.','Aman Verma','Finprenuer','Founder',150],
['The Photography Club gave me a place to learn, shoot and exhibit. The weekend photo walks are the highlight of my week.','Simar Raza','Color Canvas Club','Member',340],
['Captaining the basketball side taught me leadership and discipline. The friendships from tournaments are for life.','James Okonkwo','Athletica Club','Captain',95],
['Volunteering opportunities through Student Life have been so rewarding. It is amazing how much a small group of students can change.','Tanvi Bansal','Animal Welfare Club','Volunteer',130],
['MUN pushed me to research, speak and negotiate. I went from nervous first-year to chairing a committee.','Ishaan Verma','MUN Club','Chair',210],
['Weekly DSA sessions and mock interviews were the reason I cleared my placement rounds with confidence.','Yash Thakur','Data Structures & Algorithms','Lead',230],
['Morning yoga on the lawn changed how I handle exam stress. I never miss a session now.','Pooja Rani','Yoga Club','Member',170],
['Our short film made it to a festival. Starting from zero with the Film Making Club felt unreal.','Simran Kaur','Film Making Club','Director',280]];
function testimonials(){const w=$('#tcols');if(!w)return;
  const card=t=>`<figure class="tcard"><blockquote>${t[0]}</blockquote><figcaption><span class="tav" style="background:${grad(t[4])}">${t[1].split(' ').map(x=>x[0]).join('')}</span><div><b>${t[1]}</b><small>${t[2]} — ${t[3]}</small></div></figcaption></figure>`;
  w.innerHTML=[0,1,2].map(i=>{const g=`<div class="tg">${TESTI.filter((_,j)=>j%3==i).map(card).join('')}</div>`;return `<div class="tcol"><div class="ttrack" style="animation-duration:${26+i*6}s;animation-delay:-${i*7}s">${g}${g}</div></div>`}).join('')}

const KEYS={athletica:'sports fitness running football cricket basketball athlete health physical education bpe tournament',chess:'chess strategy puzzle logic thinking games maths mathematics',film:'film cinema video editing direction media journalism mass communication multimedia animation acting',mun:'mun debate diplomacy public speaking politics law llb international relations leadership english',dj:'music dj mixing sound dance party singing cultural performance',karate:'karate martial arts self defence fitness discipline sports',research:'research paper publication science engineering btech mtech phd innovation biotech pharmacy lab higher studies',canvas:'art painting drawing design sketch architecture fine arts creative illustration',f1:'f1 formula racing cars automobile mechanical motorsport engineering',fin:'finance stock market startup startups business entrepreneur entrepreneurship bba mba commerce bcom economics investing management banking',animal:'animal volunteer social service nss environment veterinary charity community',yoga:'yoga meditation wellness mindfulness stress mental health fitness',dsa:'coding programming dsa algorithms placement software cse it computer science btech bca mca developer web ai data',writing:'writing script screenplay story content english literature journalism creative blog',fashion:'fashion styling grooming modeling design ramp personality',reading:'reading books literature novels library english psychology'};
const SCH=[['B.Tech CSE','btech cse coding'],['BBA / MBA','bba mba business'],['Design','design art creative'],['Law','law debate'],['Pharmacy','pharmacy research'],['Mass Comm','mass communication media'],['Coding','coding'],['Music','music'],['Sports','sports'],['Startups','startup'],['Wellness','wellness'],['Public speaking','public speaking']];
function recommend(txt){const T=[...new Set(txt.toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>1))];
  return CLUBS.map(c=>{const kw=(KEYS[c.id]+' '+c.cat+' '+c.n).toLowerCase().split(/\s+/),hit=T.filter(t=>kw.some(k=>k==t||(t.length>3&&k.length>3&&(k.startsWith(t)||t.startsWith(k)))));return{c,hit,s:hit.length}}).filter(r=>r.s).sort((x,y)=>y.s-x.s||y.c.m-x.c.m).slice(0,4)}
function finder(){if(['login','register'].includes(page))return;
  document.body.insertAdjacentHTML('beforeend',`<button id="fb">✨ Find my club</button><div id="fm"><div class="fbox"><button class="fx" id="fx">✕</button><h3>Find the right club for you</h3><p>Tell us your stream, course or interests and we'll suggest clubs that fit.</p><input id="fi" placeholder="e.g. B.Tech CSE, coding, startups, music…" autocomplete="off"><div class="fch">${SCH.map(s=>`<button data-t="${s[1]}">${s[0]}</button>`).join('')}</div><div id="fr"></div></div></div>`);
  const open=v=>{$('#fm').classList.toggle('show',v);v&&$('#fi').focus()};
  window.sug=()=>{const v=$('#fi').value.trim(),r=$('#fr');if(!v)return r.innerHTML='<p class="fh">Start typing or tap a chip above 👆</p>';
    let m=recommend(v),fb=!m.length;if(fb)m=CLUBS.slice().sort((a,b)=>b.m-a.m).slice(0,3).map(c=>({c,hit:[],s:0}));
    r.innerHTML=(fb?'<p class="fh">No exact match. Here are our most popular clubs:</p>':'<p class="fh">Top matches for you</p>')+m.map(({c,hit,s})=>{const ev=EVENTS.filter(e=>e.club==c.id&&!dt(e.date).past).sort((a,b)=>a.date>b.date?1:-1)[0];
    return `<div class="fres"><span class="fic" style="background:${grad(c.h)}">${c.i}</span><div class="fin"><b>${c.n}</b>${fb?'':`<span class="fp">${Math.min(98,50+s*16)}% match</span>`}<small>${hit.length?'Matches: '+hit.join(', '):c.cat+' · '+c.meet}</small>${ev?`<small>📅 Next: ${ev.t} (${dt(ev.date).d} ${dt(ev.date).m})</small>`:''}<div class="fa"><a href="club.html?id=${c.id}">View club →</a><button data-club="${c.id}">${joined(c)?'✓ Joined':'Join'}</button></div></div></div>`}).join('')};
  $('#fb').onclick=()=>open(1);$('#fx').onclick=()=>open(0);$('#fm').onclick=e=>e.target.id=='fm'&&open(0);$('#fi').oninput=sug;
  $$('.fch button').forEach(b=>b.onclick=()=>{const i=$('#fi');i.value=(i.value?i.value+', ':'')+b.dataset.t;sug()});
  document.addEventListener('keydown',e=>e.key=='Escape'&&open(0));sug()}
navbar();auth();finder();testimonials();P[page]&&P[page]();
