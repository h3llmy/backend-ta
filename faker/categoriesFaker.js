import { faker } from '@faker-js/faker'
import Categories from '../model/categoriesModel.js'
import dotenv from 'dotenv'
import connectMongoDB from '../connection/mongoDB.js'
dotenv.config({path : '../../.env'})

connectMongoDB()

try {
    const totalData = 10
    let categories = []
    for (let i = 0; i < totalData; i++) {  
        const categoriesData = {
            name : faker.internet.userName()
        }
        categories.push(categoriesData)
    };
    
    const createCategories = await Categories.create(categories)
    if (!createCategories) {
    throw new Error('failed to generate Categories')
    }
    console.log('[32m%s[0m', "categoriesFaker success");
    process.exit(1)
} catch (error) {
    console.log('[31m%s[0m', "categoriesFaker failed : " + error.message);
    process.exit(1)
}