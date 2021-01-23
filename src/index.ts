import { app } from './app'

// Starts our express app listening on port 8080
const start = async() => {
    app.listen(8080, () => {
        console.log('Listening on port 8080!!!!!')
    })
}

start()