const translate = require('translate-google');

translate('aku sayang kamu',{from:'id',to:'en'}).then(resp => {
    console.log(resp)
}).catch(err => {
    console.log(err)
})