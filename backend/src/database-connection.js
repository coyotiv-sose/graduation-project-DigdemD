const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log('Connected to Mongo DB'))

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Pamuk' })
// kitty.save().then(() => console.log('meow'))
