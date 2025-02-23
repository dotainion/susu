import { Share } from "./Share";
import $ from 'jquery';

class Copy{
    toClipboard(element) {
        if($(element).is('input')) this.toClipboard($(element).get(0));
        else this.clickNoneInput($(element).get(0));
        $(document).find('[data-coppied]').remove();
        const overlay = $('<div class="text-success position-absolute bg-white end-0 top-50 translate-middle-y pe-3" data-coppied>Coppied!</div>');
        $(element).append(overlay);
        $(element).parent().addClass('border border-success');
        setTimeout(() => {
            overlay.remove();
            $(element).parent().removeClass('border border-success');
        }, 2000);
    }

    clipInput(element) {
        element.select();
        element.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    clickNoneInput(copyContent) {      
        const textarea = document.createElement('textarea');
        textarea.value = copyContent.textContent;
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

class DateTime{
    dbFormat(dateInstance){
        if(!dateInstance) return '';
        dateInstance = new Date(dateInstance);
        
        const year = dateInstance.getFullYear();
        const month = String(dateInstance.getMonth() + 1).padStart(2, '0');
        const day = String(dateInstance.getDate()).padStart(2, '0');
        const hours = String(dateInstance.getHours()).padStart(2, '0');
        const minutes = String(dateInstance.getMinutes()).padStart(2, '0');
        const seconds = String(dateInstance.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    toLocalTime(dateInstance){
        if(!dateInstance) return '';
        return new Date(dateInstance).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    toLocalDate(dateInstance){
        if(!dateInstance) return '';
        return new Date(dateInstance).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    }

    toLocalDateTime(dateInstance){
        if(!dateInstance) return '';
        return `${this.toLocalDate(dateInstance)} ${this.toLocalTime(dateInstance)}`;
    }

    to2D(num){
        if(num.length === 1) return `0${num}`;
        return num;
    }
}

class Dom {
    element;
    events = [];

    setScrollElement(element){
      if (!element || !(element instanceof HTMLElement)) {
        console.error('Element is not found or is not a valid HTML element.');
      }
      this.element = element;
    }

    scroll(direction){
      if(!['LEFT', 'RIGHT'].includes(direction)){
        return console.error('Scroll direction can only be LEFT or RIGHT.');
      }
      const scrollAmount = direction === 'LEFT' ? -150 : 150;
      this.element.scrollBy({left: scrollAmount, behavior: 'smooth'});
      setTimeout(()=>this.events.forEach((event)=>event.cmd === 'scroll' && event.trigger()), 200);
    };

    scrollLeft(){
      this.scroll('LEFT');
    }

    scrollRight(){
      this.scroll('RIGHT');
    }

    on(cmd, fx){
      this.events.push({cmd, trigger: fx});
    }

    removeDragScroll() {
      if (!this.element || !(this.element instanceof HTMLElement)) {
        return console.error('Element is not found or is not a valid HTML element.');
      }
  
      this.element.removeEventListener('mousedown', this.mouseDownHandler);
      this.element.removeEventListener('mouseleave', this.mouseLeaveHandler);
      this.element.removeEventListener('mouseup', this.mouseUpHandler);
      this.element.removeEventListener('mousemove', this.mouseMoveHandler);
  
      this.element.removeEventListener('touchstart', this.touchStartHandler);
      this.element.removeEventListener('touchend', this.touchEndHandler);
      this.element.removeEventListener('touchmove', this.touchMoveHandler);
    }
  
    enableDragScroll() {
      if (!this.element || !(this.element instanceof HTMLElement)) {
        return console.error('Element is not found or is not a valid HTML element.');
      }
  
      let isDragging = false;
      let startX;
      let scrollLeft;
  
      this.mouseDownHandler = (e) => {
        isDragging = true;
        startX = e.pageX - this.element.offsetLeft;
        scrollLeft = this.element.scrollLeft;
      };
  
      this.mouseLeaveHandler = () => {
        isDragging = false;
      };
  
      this.mouseUpHandler = () => {
        isDragging = false;
      };
  
      this.mouseMoveHandler = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - this.element.offsetLeft;
        const walk = (x - startX) * 2;
        this.element.scrollLeft = scrollLeft - walk;
        this.events.forEach((event)=>event.cmd === 'scroll' && event.trigger());
      };
  
      this.touchStartHandler = (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - this.element.offsetLeft;
        scrollLeft = this.element.scrollLeft;
      };
  
      this.touchEndHandler = () => {
        isDragging = false;
      };
  
      this.touchMoveHandler = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - this.element.offsetLeft;
        const walk = (x - startX) * 2;
        this.element.scrollLeft = scrollLeft - walk;
        this.events.forEach((event)=>event.cmd === 'scroll' && event.trigger());
      };
  
      this.element.addEventListener('mousedown', this.mouseDownHandler);
      this.element.addEventListener('mouseleave', this.mouseLeaveHandler);
      this.element.addEventListener('mouseup', this.mouseUpHandler);
      this.element.addEventListener('mousemove', this.mouseMoveHandler);
  
      this.element.addEventListener('touchstart', this.touchStartHandler);
      this.element.addEventListener('touchend', this.touchEndHandler);
      this.element.addEventListener('touchmove', this.touchMoveHandler);
    }
}

class Utils{
    constructor(){
        this.share = new Share();
        this.date = new DateTime();
        this.copy = new Copy();
        this.dom = new Dom();
    }
}

export const utils = new Utils();