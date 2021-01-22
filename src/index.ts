import { app } from './app'

const start = async() => {
    app.listen(8080, () => {
        console.log('Listening on port 8080!!!!!')
    })
}

start()