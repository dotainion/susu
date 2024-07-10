export class Share{
    share(data){
        data.via = 'Susu'; // Optional
        data.dialogTitle = 'Share this article'; // Optional/**/
        // Share the data
        return navigator.share(data);
    }

    url(url, title){
        return this.share({url: `${window.location.origin}/#${url}`, title});
    }

    content(text, title){
        return this.share({text, title});
    }

    images(images, title){
        let files = [];
        images.forEach((file)=>{
            if(!file.file) console.error('each images just contain attribute file');
            if(!file.fileName) console.error('each images just contain attribute fileName');
            if(!file.fileType) console.error('each images just contain attribute fileType');
            files.push(new File([file.file], file.fileName, {type: file.fileType}));
        });
        return this.share({files, title});
    }
}


