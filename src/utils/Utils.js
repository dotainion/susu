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

class Element{
    nameToId(name, excludeHash){
        const hash = excludeHash ? '' : '#';
        return `${hash}${name.replace(/\s+/g, '').replace(/\//g, '')}`;
    }
}

class Utils{
    constructor(){
        this.share = new Share();
        this.date = new DateTime();
        this.copy = new Copy();
        this.element = new Element();
    }
}

export const utils = new Utils();