const pages = document.querySelectorAll('.book .page')
let activePage = pages.length-1
const step = 100 / (pages.length-1)
let width = 0;

progress.style.width = width;

previous.addEventListener("click",previousEvent)
function previousEvent(){
  
  progress.style.width = `${width-=step}%`

  if(0 <= activePage && activePage < pages.length){
    activePage += 1
    pages[activePage].style.cssText += `
    transform:rotateY(0deg);
    z-index:${pages[activePage].style.zIndex}
    `
    setTimeout(_=>pages[activePage].style.cssText += `z-index:unset;`,400)

    if(activePage == pages.length - 1){
      previous.style.cssText=`visibility: hidden;`
      pages.forEach((page,i)=> {
        page.style.cssText += `
        left:25%`
      });
    }
    next.style.cssText=`visibility: visible;`
  }
  previous.removeEventListener("click",previousEvent)
  pages[activePage].addEventListener('transitionend',_=>previous.addEventListener("click",previousEvent))
}

next.addEventListener("click",nextEvent)
function nextEvent(){
  
  progress.style.width = `${width+=step}%`
  
  pages.forEach((page,i)=> {
    page.style.left = '50%'
  });

  pages[activePage].style.cssText += `
  transform:rotateY(-180deg);
  z-index:${pages.length - activePage}
  `

  activePage -= 1
  if(activePage == 0){
    next.style.cssText=`visibility: hidden;`
  }
  
  previous.style.cssText=`visibility: visible;`
  next.removeEventListener("click",nextEvent)
  pages[activePage].addEventListener('transitionend',_=>next.addEventListener("click",nextEvent))
}

// pages.forEach((page,i)=> {
//   page.style.cssText = `
//   z-index:${pages.length-i}`
// });