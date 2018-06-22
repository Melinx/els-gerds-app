'use strict'

require('dotenv').config()
//const { mongoose, models: { Course } } = require('data')
const mongoose = require('mongoose')
const { Course } = require('../models')

const { env: { DB_URL } } = process

const course1 = { category: 'secondCourse', image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204568/2-20_tuna-tataki.jpg', dishName: 'Tuna tataki', temp: 'cold', baseFood: 'fish', dayAvail: '1' }
const course2 = { category: 'secondCourse', image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-19_trinxat.jpg', dishName: 'Trinxat', temp: 'hot', baseFood: 'green', dayAvail: '3' }
const course3 =
    {

        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204552/1-2_beetroot-salad.jpg',
        dishName: 'Beetroot salad',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '3'

    }
const course4 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-12_paella-mar-muntanya.jpg',
        dishName: 'Paella',
        temp: 'hot',
        baseFood: 'rice',
        dayAvail: '4'
    }
const course5 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-17_salmon-teryaki.jpg',
        dishName: 'Teriyaki Salmon',
        temp: 'hot',
        baseFood: 'fish',
        dayAvail: '3'
    }
const course6 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-10_gall-peix.jpg',
        dishName: 'Chicken',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '5'
    }
const course7 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-18_tomato-pasta.jpg',
        dishName: 'Pasta tomato',
        temp: 'hot',
        baseFood: 'pasta',
        dayAvail: '2'
    }
const course8 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-16_romesco-de-conill.jpg',
        dishName: 'Rabbit romesco',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '4'
    }
const course9 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-15_potaje.jpg',
        dishName: 'Garbanzos & meatballs ',
        temp: 'hot',
        baseFood: 'beans',
        dayAvail: '2'
    }
const course10 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-14_peus-de-porc.jpg',
        dishName: 'Pork feet',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '2'
    }
const course11 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-13_pasta-truffle-carbonara.jpg',
        dishName: 'Truffle carbonara',
        temp: 'hot',
        baseFood: 'pasta',
        dayAvail: '4'
    }
const course12 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204567/2-11_mandonguilles.jpg',
        dishName: 'Meatballs & peas',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '1'
    }
const course13 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-9_fricando.jpg',
        dishName: 'Fricandó',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '4'
    }
const course14 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-8_fideua.jpg',
        dishName: 'Fideuà',
        temp: 'hot',
        baseFood: 'pasta',
        dayAvail: '3'
    }
const course15 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-6_cargols-a-la-launa.jpg',
        dishName: '"Canned" snails',
        temp: 'hot',
        baseFood: 'pasta',
        dayAvail: '5'
    }
const course16 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-4_black-rice.jpg',
        dishName: 'Black rice',
        temp: 'hot',
        baseFood: 'rice',
        dayAvail: '1'
    }
const course17 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1529348752/chickpea-potato-salad.jpg',
        dishName: 'Cheakpea salad',
        temp: 'cold',
        baseFood: 'beans',
        dayAvail: '5'
    }
const course18 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-3_bacalla.jpg',
        dishName: 'Coat fish',
        temp: 'hot',
        baseFood: 'fish',
        dayAvail: '2'
    }
const course19 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/v1529656116/botifarra.jpg',
        dishName: 'Botifarra & white beans',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '5'
    }
const course20 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/2-2_bacalla-amb-samfaina.jpg',
        dishName: 'Coat fish & veggies',
        temp: 'hot',
        baseFood: 'fish',
        dayAvail: '3'
    }
const course21 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204566/1-20_salmon-salad-and-sauce.jpg',
        dishName: 'Salmon salad',
        temp: 'cold',
        baseFood: 'meat',
        dayAvail: '4'
    }
const course22 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-18_salad_plate.jpg',
        dishName: 'Green salad',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '3'
    }
const course23 =
    {
        category: 'secondCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/2-1_bacalla-amb-escabetx-de-rovellons.jpg',
        dishName: 'Marinated coat fish',
        temp: 'cold',
        baseFood: 'fish',
        dayAvail: '1'
    }
const course24 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-17_risotto.png',
        dishName: 'Risotto',
        temp: 'hot',
        baseFood: 'rice',
        dayAvail: '3'
    }
const course25 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-14_kinoa-salad.jpg',
        dishName: 'Kinoa salad',
        temp: 'cold',
        baseFood: 'rice',
        dayAvail: '5'
    }
const course26 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-19_salad-pomegranate.jpg',
        dishName: 'Pomegranate salad',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '3'
    }
const course27 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-15_macaroni-salad.jpg',
        dishName: 'Macaroni salad',
        temp: 'cold',
        baseFood: 'pasta',
        dayAvail: '2'
    }
const course28 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204565/1-16_mango-salad.jpg',
        dishName: 'Mango salad',
        temp: 'cold',
        baseFood: 'pasta',
        dayAvail: '2'
    }
const course29 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-12_green-pasta.jpg',
        dishName: 'Pesto pasta',
        temp: 'cold',
        baseFood: 'pasta',
        dayAvail: '1'
    }
const course30 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-11_gazpacho.jpg',
        dishName: 'Gazpacho',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '1'
    }
const course31 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-13_green-spagetthi-salad.jpg',
        dishName: 'Spaghetti salad',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '2'
    }
const course32 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-9_esqueixada-bacalla.jpg',
        dishName: 'Coat esqueixada',
        temp: 'cold',
        baseFood: 'fish',
        dayAvail: '4'
    }
const course33 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/ar_1:1,c_fill,g_auto,e_art:hokusai/v1529391222/1-6_ensaladilla-rusa.jpg',
        dishName: 'Ensaladilla rusa',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '5'
    }
const course34 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-10_faves-ofegades-menta.jpg',
        dishName: 'Green broad beans',
        temp: 'cold',
        baseFood: 'green',
        dayAvail: '1'
    }
const course35 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-5_eggplant-goatcheese.jpg',
        dishName: 'Eggplant & goatcheese',
        temp: 'hot',
        baseFood: 'green',
        dayAvail: '2'
    }
const course36 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-8_esparrecs-verds-al-forn.jpg',
        dishName: 'Green asparagus',
        temp: 'hot',
        baseFood: 'green',
        dayAvail: '5'
    }
const course37 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-4_carpaccio.jpg',
        dishName: 'Carpaccio',
        temp: 'cold',
        baseFood: 'meat',
        dayAvail: '4'
    }
const course38 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-3_canelons.jpg',
        dishName: 'Canelonni',
        temp: 'hot',
        baseFood: 'meat',
        dayAvail: '4'
    }
const course39 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204564/1-7_escudella-carn-olla.jpg',
        dishName: 'Escudella',
        temp: 'hot',
        baseFood: 'pasta',
        dayAvail: '5'
    }
const course40 =
    {
        category: 'firstCourse',
        image: 'https://res.cloudinary.com/elsgerds/image/upload/ar_1:1,c_fill,g_auto,e_art:hokusai/v1528204552/1-1_basmati-salad.jpg',
        dishName: 'Basmati rice salad',
        temp: 'cold',
        baseFood: 'rice',
        dayAvail: '1'
    }


mongoose.connect(DB_URL)
    .then(() =>
        Promise.all([
            Course.create(course1),
            Course.create(course2),
            Course.create(course3),
            Course.create(course4),
            Course.create(course5),
            Course.create(course6),
            Course.create(course7),
            Course.create(course8),
            Course.create(course9),
            Course.create(course10),
            Course.create(course11),
            Course.create(course12),
            Course.create(course13),
            Course.create(course14),
            Course.create(course15),
            Course.create(course16),
            Course.create(course17),
            Course.create(course18),
            Course.create(course19),
            Course.create(course20),
            Course.create(course21),
            Course.create(course22),
            Course.create(course23),
            Course.create(course24),
            Course.create(course25),
            Course.create(course26),
            Course.create(course27),
            Course.create(course28),
            Course.create(course29),
            Course.create(course30),
            Course.create(course31),
            Course.create(course32),
            Course.create(course33),
            Course.create(course34),
            Course.create(course35),
            Course.create(course36),
            Course.create(course37),
            Course.create(course38),
            Course.create(course39),
            Course.create(course40)
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('done'))



