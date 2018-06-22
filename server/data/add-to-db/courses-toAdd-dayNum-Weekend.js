'use strict'
//WEEKEND MEALS

require('dotenv').config()
//const { mongoose, models: { Course } } = require('data')
const mongoose = require('mongoose')
const { Course } = require('../models')

const { env: { DB_URL } } = process

const course2 = { category: 'secondCourse', image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-19_trinxat.jpg', dishName: 'Trinxat', temp: 'hot', baseFood: 'green', dayAvail: '0' }
const course3 =
{

    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204552/1-2_beetroot-salad.jpg',
    dishName: 'Beetroot salad',
    temp: 'cold',
    baseFood: 'green',
    dayAvail: '0'

}

const course5 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-17_salmon-teryaki.jpg',
    dishName: 'Teriyaki Salmon',
    temp: 'hot',
    baseFood: 'fish',
    dayAvail: '0'
}

const course7 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-18_tomato-pasta.jpg',
    dishName: 'Pasta tomato',
    temp: 'hot',
    baseFood: 'pasta',
    dayAvail: '6'
}

const course9 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-15_potaje.jpg',
    dishName: 'Garbanzos & meatballs ',
    temp: 'hot',
    baseFood: 'beans',
    dayAvail: '6'
}
const course10 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-14_peus-de-porc.jpg',
    dishName: 'Pork feet',
    temp: 'hot',
    baseFood: 'meat',
    dayAvail: '6'
}

const course14 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-8_fideua.jpg', 
    dishName: 'Fideuà',
    temp: 'hot',
    baseFood: 'pasta',
    dayAvail: '0'
}

const course18 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-3_bacalla.jpg',
    dishName: 'Coat fish',
    temp: 'hot',
    baseFood: 'fish',
    dayAvail: '6'
}

const course20 =
{
    category: 'secondCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-2_bacalla-amb-samfaina.jpg',
    dishName: 'Coat fish & veggies',
    temp: 'hot',
    baseFood: 'fish',
    dayAvail: '0'
}

const course22 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-18_salad_plate.jpg',
    dishName: 'Green salad',
    temp: 'cold',
    baseFood: 'green',
    dayAvail: '0'
}

const course24 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-17_risotto.png',
    dishName: 'Risotto',
    temp: 'hot',
    baseFood: 'rice',
    dayAvail: '0'
}

const course26 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-19_salad-pomegranate.jpg',
    dishName: 'Pomegranate salad',
    temp: 'cold',
    baseFood: 'green',
    dayAvail: '0'
}
const course27 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-15_macaroni-salad.jpg',
    dishName: 'Macaroni salad',
    temp: 'cold',
    baseFood: 'pasta',
    dayAvail: '6'
}
const course28 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-16_mango-salad.jpg',
    dishName: 'Mango salad',
    temp: 'cold',
    baseFood: 'pasta',
    dayAvail: '6'
}

const course31 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-13_green-spagetthi-salad.jpg',
    dishName: 'Spaghetti salad',
    temp: 'cold',
    baseFood: 'green',
    dayAvail: '6'
}


const course35 =
{
    category: 'firstCourse',
    image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-5_eggplant-goatcheese.jpg',
    dishName: 'Eggplant & goatcheese',
    temp: 'hot',
    baseFood: 'green',
    dayAvail: '6'
}


mongoose.connect(DB_URL)
    .then(() =>
        Promise.all([
            Course.create(course2),
            Course.create(course3),
            Course.create(course5),
            Course.create(course7),
            Course.create(course9),
            Course.create(course10),
            Course.create(course14),
            Course.create(course18),
            Course.create(course20),
            Course.create(course22),
            Course.create(course24),
            Course.create(course26),
            Course.create(course27),
            Course.create(course28),
            Course.create(course35),
            Course.create(course31),
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('done'))



