const STORAGE_KEY = "temulaku_public_jobs_v1";
const seedJobs = [
 {id:"demo-1",title:"Pramuniaga Toko",company:"Kios Sejahtera",type:"UMKM · Contoh",field:"Penjualan & pelayanan",location:"Bandung",pay:"Gaji dibicarakan saat wawancara",education:"Tidak ada syarat khusus",tags:["Pengalaman tidak wajib","Full-time"],description:"Membantu pelanggan, merapikan barang, dan menjaga area toko. Contoh lowongan untuk demonstrasi website.",contact:"Kontak demo belum tersedia",demo:true},
 {id:"demo-2",title:"Asisten Dapur",company:"Warung Rasa Ibu",type:"Toko / restoran · Contoh",field:"Makanan & minuman",location:"Bandung",pay:"Upah dibicarakan saat wawancara",education:"Tidak ada syarat khusus",tags:["Pelatihan di tempat","Shift"],description:"Membantu persiapan bahan, menjaga kebersihan dapur, dan bekerja sama dengan tim. Contoh lowongan untuk demonstrasi website.",contact:"Kontak demo belum tersedia",demo:true},
 {id:"demo-3",title:"Admin Pesanan Online",company:"Sahabat Usaha",type:"UMKM · Contoh",field:"Administrasi",location:"Bandung",pay:"Paruh waktu · negosiasi",education:"SMA/SMK",tags:["Paruh waktu","Dasar komputer"],description:"Mencatat pesanan, membalas pertanyaan pelanggan, dan membantu pembaruan data. Contoh lowongan untuk demonstrasi website.",contact:"Kontak demo belum tersedia",demo:true},
 {id:"demo-4",title:"Staf Gudang",company:"Ruang Kirim",type:"Perusahaan · Contoh",field:"Produksi & gudang",location:"Jakarta",pay:"Gaji mengikuti kebijakan perusahaan",education:"SMP",tags:["Full-time","Kerja tim"],description:"Membantu menata barang, menyiapkan pesanan, dan melakukan pencatatan stok. Contoh lowongan untuk demonstrasi website.",contact:"Kontak demo belum tersedia",demo:true},
 {id:"demo-5",title:"Crew Kedai",company:"Kopi Titik Temu",type:"UMKM · Contoh",field:"Makanan & minuman",location:"Jakarta",pay:"Upah dibicarakan saat wawancara",education:"SMP",tags:["Shift","Pelatihan tersedia"],description:"Membantu melayani pelanggan, menyiapkan minuman, dan menjaga area kedai. Contoh lowongan untuk demonstrasi website.",contact:"Kontak demo belum tersedia",demo:true},
 {id:"demo-6",title:"Petugas Layanan",company:"Rukun Mart",type:"Toko / restoran · Contoh",field:"Penjualan & pelayanan",location:"Surabaya",pay:"Gaji dibicarakan saat wawancara",education:"SMA/SMK",tags:["Full-time","Komunikatif"],description:"Melayani pelanggan dan membantu operasional toko. Contoh lowongan untuk demonstrasi website.",contact:"Kontak demo belum tersedia",demo:true}
];
const educationOrder = {"SD":1,"SMP":2,"SMA/SMK":3,"D3":4,"S1":5,"S2+":6,"Nonformal":0,"Tidak ada syarat khusus":0};
const $ = id => document.getElementById(id);
let toastTimer;
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),3600)}
function getUserJobs(){try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");return Array.isArray(value)?value:[]}catch(e){return []}}
function saveUserJobs(list){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(list));return true}catch(e){toast("Browser tidak mengizinkan penyimpanan. Coba periksa pengaturan penyimpanan.");return false}}
function allJobs(){return [...getUserJobs(),...seedJobs]}
function logoClass(job){if(job.demo)return job.id.endsWith("2")||job.id.endsWith("4")?"green":"terracotta";return ["terracotta","green","gold"][Math.abs(hash(job.company))%3]}
function hash(text){let h=0;for(let i=0;i<text.length;i++)h=((h<<5)-h)+text.charCodeAt(i)|0;return h}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showJob(job){
 $("dialog-title").textContent=job.title;
 $("dialog-company").textContent=`${job.company} · ${job.type.replace(" · Contoh","")}`;
 $("dialog-meta").innerHTML=[job.location,job.field,job.education==="Tidak ada syarat khusus"?"Pendidikan fleksibel":`Min. ${job.education}`,job.pay||"Gaji dibicarakan"].map(v=>`<span>${esc(v)}</span>`).join("");
 $("dialog-description").textContent=job.description||"Belum ada deskripsi tambahan.";
 $("dialog-contact").innerHTML=`<b>Kontak:</b> ${esc(job.contact||"Belum dicantumkan")}`;
 if(job.demo){$("dialog-contact").innerHTML="<b>Kontak:</b> Data contoh — kontak asli belum tersedia."}
 $("job-dialog").showModal();
}
function card(job){
 const div=document.createElement("article");div.className="job-card";
 const tags=(job.tags||[]).slice(0,3).map(t=>`<span>${esc(t)}</span>`).join("");
 div.innerHTML=`<div class="job-logo ${logoClass(job)}">${esc((job.company||"T").trim().charAt(0).toUpperCase())}</div><div class="job-content"><div class="job-line"><span class="job-type">${esc(job.type)}</span><span class="job-badge">● ${job.demo?"Contoh":"Ditambahkan di perangkat ini"}</span></div><h4>${esc(job.title)}</h4><p class="job-company">${esc(job.company)} · ${esc(job.location)}</p><div class="job-tags">${tags}</div>${job.pay?`<div class="job-pay">${esc(job.pay)}</div>`:""}</div><button class="job-detail" type="button">Lihat detail ↗</button>`;
 div.querySelector("button").addEventListener("click",()=>showJob(job));return div;
}
function render(list){const target=$("job-list");target.innerHTML="";if(!list.length){target.innerHTML='<div class="empty">Belum ada lowongan yang cocok dengan filter ini. Coba lokasi atau bidang lain.</div>'}else list.forEach(j=>target.appendChild(card(j)));$("job-count").textContent=`${list.length} lowongan`;return list.length}
function renderAll(){render(allJobs());renderOwn()}
function renderOwn(){const own=getUserJobs();const section=$("lowongan-saya");if(!own.length){section.hidden=true;return}section.hidden=false;const target=$("own-list");target.innerHTML="";own.forEach(j=>target.appendChild(card(j)))}
$("seeker-form").addEventListener("submit",e=>{
 e.preventDefault();
 const name=$("seeker-name").value.trim(), education=$("education").value, age=Number($("age").value), field=$("field").value, location=$("seeker-location").value.trim().toLowerCase();
 if(!name||!education||!age){toast("Lengkapi nama, pendidikan, dan usia terlebih dahulu.");return}
 let list=allJobs().filter(j=>{
  const locMatch=!location||j.location.toLowerCase().includes(location)||location.includes(j.location.toLowerCase());
  const fieldMatch=!field||j.field===field;
  const min=educationOrder[j.education]||0, applicant=educationOrder[education]||0;
  const eduMatch=j.education==="Tidak ada syarat khusus"||applicant>=min;
  return locMatch&&fieldMatch&&eduMatch;
 });
 if(!list.length){list=allJobs().filter(j=>(!field||j.field===field)).slice(0,4);$("results-title").textContent=`Pilihan lain untuk ${name.split(/\s+/)[0]}`;toast("Belum ada kecocokan tepat. Kami tampilkan beberapa peluang lain.");}
 else{$("results-title").textContent=`Peluang untuk ${name.split(/\s+/)[0]}`;toast(`Pencarian selesai. Ada ${list.length} peluang yang cocok dengan filtermu.`)}
 render(list.slice(0,8));$("cari-kerja").scrollIntoView({behavior:"smooth",block:"start"});
});
$("employer-form").addEventListener("submit",e=>{
 e.preventDefault();
 const job={
  id:"local-"+Date.now(),title:$("position").value.trim(),company:$("employer-name").value.trim(),
  type:$("employer-type").value,field:$("employer-field").value,location:$("employer-location").value.trim(),
  pay:$("pay").value.trim()||"Gaji / upah dibicarakan",education:$("minimum-education").value,
  tags:["Lowongan baru", "Hubungi pemberi kerja"],description:$("description").value.trim(),
  contact:$("contact").value.trim(),demo:false,createdAt:new Date().toISOString()
 };
 if(!job.title||!job.company||!job.location||!job.contact||!job.description){toast("Lengkapi semua informasi wajib sebelum menerbitkan.");return}
 const jobs=getUserJobs();jobs.unshift(job);
 if(saveUserJobs(jobs)){e.target.reset();renderAll();$("results-title").textContent="Lowongan terbaru dari komunitasmu";toast("Lowongan ditambahkan di browser ini dan muncul di daftar pencarian.");$("cari-kerja").scrollIntoView({behavior:"smooth",block:"start"});}
});
$("close-dialog").addEventListener("click",()=>$("job-dialog").close());
$("dialog-done").addEventListener("click",()=>$("job-dialog").close());
$("job-dialog").addEventListener("click",e=>{if(e.target===$("job-dialog"))$("job-dialog").close()});
renderAll();
