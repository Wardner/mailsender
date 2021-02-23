const Fonos = require('@fonos/sdk')
const callManager = new Fonos.CallManager()

// A number you want to call and the application identifier
callManager.call({
 from: '+19106376140',
 to: '+18492200638',
 app: 'Sh_HWM4C1l'
})
.then(r => console.log(r))
.catch(e => console.error(e))