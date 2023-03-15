import express from 'express'
import morgan from 'morgan'
import connectDB from '../../DB/connection.js'
import { globalError } from '../services/handelError.js'
import authRouter from './auth/auth.router.js'
import carRouter from './car/car.router.js'
import userRouter from './user/user.router.js'
import cors from 'cors'


export const appRouter = (app) => {

    //convert Buffer Data
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    //setup cors
    app.use(cors({}))
    // setup morgan MOOD
    if (process.env.MOOD === "DEV") {
        app.use(morgan("dev"));
    } else {
        app.use(morgan('combined'))
    }
    //Base URL
    const baseUrl = process.env.BASEURL
    //Setup API Routing 
    app.use(`${baseUrl}/auth`, authRouter)
    app.use(`${baseUrl}/user`, userRouter)
    app.use(`${baseUrl}/car`, carRouter)

    // in-valid page
    app.use('*', (req, res, next) => {
        return res.send("In-valid Routing Plz check url  or  method")
    })

    // global handling Error
    app.use(globalError);
    //connection DB
    connectDB()
}

