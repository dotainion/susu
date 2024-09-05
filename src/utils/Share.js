export class Share{
    async share(data){
        data.via = 'Susu'; // Optional
        data.dialogTitle = 'Share this article'; // Optional/**/
        // Share the data
        return await navigator.share(data);
    }

    async url(url='', title){
        const origin = window.location.origin;
        const directory = window.location.href.replace(origin, '').split('#')[0];
        const route = window.location.href.replace(origin, '').split('/#')[1];
        return await this.share({url: `${origin}${directory}#${url}`, title});
    }

    async content(text, title){
        return await this.share({text, title});
    }

    async images(images, title){
        let files = [];
        images.forEach((file)=>{
            if(!file.file) console.error('each images just contain attribute file');
            if(!file.fileName) console.error('each images just contain attribute fileName');
            if(!file.fileType) console.error('each images just contain attribute fileType');
            files.push(new File([file.file], file.fileName, {type: file.fileType}));
        });
        return await this.share({files, title});
    }
}


