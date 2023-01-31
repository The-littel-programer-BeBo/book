const pages = document.querySelectorAll('.book .page')
let activePage = pages.length-1
const step = 100 / pages.length
let width = step;
let leftPages = 0;
let rightPages = pages.length;
let active = pages[pages.length-1];

progress.style.width = width + '%';

// next
next.addEventListener("click",nextEvent)
function nextEvent(){
  progress.style.width = `${width+=step}%`
  
  pages.forEach((page)=> {
    page.style.left = '50%'
  });

  pages[activePage].style.cssText += `
  transform:rotateY(-${180-leftPages/10}deg);
  `
  activePage -= 1
  if(activePage == 0){
    next.style.cssText=`visibility: hidden;`
  }
  
  previous.style.cssText=`visibility: visible;`
  next.removeEventListener("click",nextEvent)
  pages[activePage].addEventListener('transitionend',_=>next.addEventListener("click",nextEvent))

  leftPages += 1
  rightPages -= 1
  active = pages[activePage]
}

// pervious
previous.addEventListener("click",previousEvent)
function previousEvent(){
  setTimeout(_=>pages[activePage].style.cssText += `z-index:unset;`,250)
  progress.style.width = `${width-=step}%`
    activePage += 1
    pages[activePage].style.cssText += `
    transform:rotateY(0deg);
    `
    if(activePage == pages.length - 1){
      previous.style.cssText=`visibility: hidden;`
      pages.forEach((page,i)=> {
        page.style.cssText += `
        left:25%`
      });
    }
    next.style.cssText=`visibility: visible;`
  previous.removeEventListener("click",previousEvent)
  pages[activePage].addEventListener('transitionend',_=>previous.addEventListener("click",previousEvent))
  leftPages -= 1
  rightPages += 1
  active = pages[activePage]
}

let x = 0;
for(i=pages.length-1;i>=0;i--){
  pages[i].dataset.number = x
  x++
}
num.setAttribute('max',pages.length-1)

// go event
go.addEventListener('click',e=>{
  x = leftPages
  if(num.value >= pages.length){
    e.preventDefault()
  }else if(leftPages < num.value){
    for(i=0;i<num.value-x;i++){
      nextEvent()
    }
  }else{
    for(i=0;i<x-num.value;i++){
      previousEvent()
    }
  }
})