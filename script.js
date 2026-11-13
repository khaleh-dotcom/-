const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));

// پنل آزمایشی: رمز زیر در کد عمومی سایت قابل مشاهده است و امنیت واقعی ایجاد نمی‌کند.
const DEMO_PASSWORD = "246810";
const modal=document.getElementById("adminModal");
const loginView=document.getElementById("loginView");
const editorView=document.getElementById("editorView");
const openAdmin=document.getElementById("openAdmin");
const closeAdmin=document.getElementById("closeAdmin");
const passwordInput=document.getElementById("adminPassword");
const loginMessage=document.getElementById("loginMessage");
const saveMessage=document.getElementById("saveMessage");

function openPanel(){
  modal.hidden=false;
  loginView.hidden=false;
  editorView.hidden=true;
  passwordInput.value="";
  loginMessage.textContent="";
}
function closePanel(){modal.hidden=true;}
openAdmin.addEventListener("click",openPanel);
closeAdmin.addEventListener("click",closePanel);
modal.addEventListener("click",e=>{if(e.target===modal)closePanel();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel();});

function applySavedContent(){
  const data=JSON.parse(localStorage.getItem("siteLocalEdits")||"{}");
  if(data.siteTitle){
    document.title=data.siteTitle;
    document.getElementById("brandName").textContent=data.siteTitle;
  }
  if(data.heroTitle) document.getElementById("heroTitle").textContent=data.heroTitle;
  if(data.heroDescription) document.getElementById("heroDescription").textContent=data.heroDescription;
}
applySavedContent();

document.getElementById("loginButton").addEventListener("click",()=>{
  if(passwordInput.value===DEMO_PASSWORD){
    loginView.hidden=true;
    editorView.hidden=false;
    const data=JSON.parse(localStorage.getItem("siteLocalEdits")||"{}");
    document.getElementById("siteTitleInput").value=data.siteTitle||document.getElementById("brandName").textContent;
    document.getElementById("heroTitleInput").value=data.heroTitle||document.getElementById("heroTitle").textContent.replace(/\s+/g," ").trim();
    document.getElementById("heroDescInput").value=data.heroDescription||document.getElementById("heroDescription").textContent;
  }else{
    loginMessage.textContent="رمز آزمایشی اشتباه است.";
  }
});
passwordInput.addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("loginButton").click();});

document.getElementById("saveChanges").addEventListener("click",()=>{
  const data={
    siteTitle:document.getElementById("siteTitleInput").value.trim(),
    heroTitle:document.getElementById("heroTitleInput").value.trim(),
    heroDescription:document.getElementById("heroDescInput").value.trim()
  };
  if(!data.siteTitle){saveMessage.textContent="نام سایت را وارد کن.";return;}
  localStorage.setItem("siteLocalEdits",JSON.stringify(data));
  applySavedContent();
  saveMessage.textContent="ذخیره شد؛ فقط در همین مرورگر دیده می‌شود. برای تغییر عمومی باید فایل‌ها را در GitHub به‌روزرسانی کنی.";
});
document.getElementById("logoutButton").addEventListener("click",()=>{
  editorView.hidden=true;
  loginView.hidden=false;
  passwordInput.value="";
  loginMessage.textContent="";
});
