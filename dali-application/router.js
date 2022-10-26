let express = require('express');
let sqlite3 = require('sqlite3')
let path = require('path')
const router = express.Router();

const fs = require('fs')

// Create and initialize database
let file = path.join(__dirname, "/database.db");
let exists = fs.existsSync(file);

if (!exists) {
    fs.openSync(file, "w");
}
let db = new sqlite3.Database(file);

if (!exists) {
    db.run(
        `CREATE TABLE 'users' (id integer primary key, name TEXT, year TEXT, 
            picture TEXT, gender TEXT, ethnicity TEXT, major TEXT, minor TEXT, modification TEXT,
            birthday DATE, role TEXT, home TEXT, quote TEXT, favoriteShoe TEXT, favoriteArtist TEXT, 
            favoriteColor TEXT, phoneType TEXT)`,
            (result, error) => {
                console.log(result)
                console.error(error)
            }
    )

    //process JSON file and put data into database
    let content = JSON.parse(fs.readFileSync('./raw_data.json').toString())

    for(let person of content){
        let list = []
        let keys = Object.keys(person)
        let ethnicity = ""

        for(let i = 0; i < keys.length; i++){
            //combine all the different ethnicity tags into one
            if(i >= 4 && i <= 11){
                if(ethnicity.length > 0 && person[keys[i]].length > 0)
                    ethnicity += " "
                ethnicity += person[keys[i]]
                
                if(i == 11){
                    list.push(ethnicity)
                }
                
                continue
            }
            list.push(person[keys[i]])
        }

        //hooray for really long SQL queries and SQL params!
        db.run(`INSERT INTO 'users' (name, year, picture, gender, ethnicity, major, minor, modification, birthday, role, home, quote, favoriteShoe, favoriteArtist, favoriteColor, phoneType)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, list)
    }
}

//get all users from the table -- might not be a good idea to have this exposed to the public LOL, 
//great way to get DDoSed. However, this will make do for now -- perhaps authorization would be a good idea
//to implement later
router.get('/allusers', (req, res) => {
    //Don't fetch ALL users at once -- specify a limit so we don't clog the front end
    let {offset, limit} = req.query

    if(!offset)
        offset = 0

    if(!limit)
        limit = -1

    db.all(`SELECT * FROM 'users' LIMIT ? OFFSET ?`, [limit, offset], (e, r) => {
        if(e || !r){
            console.error(e)
            res.json({success: false})
            return
        }
        res.json(r)
    })
})

//get all users with the specified attribute, use url query params
//e.g. http://localhost:8080/users?major=Biology
//  or http://localhost:8080/users?year='20
router.get('/users', (req, res) => {
    let keys = Object.keys(req.query)
    let values = Object.values(req.query)

    //screw cybersecurity!
    let querystring = ''
    for(let i of keys){
        if(querystring.length == 0)
            querystring = "WHERE"
        querystring += ' ' + i + ' = ?'
    }

    //shush, security concerns do not exist
    db.all(`SELECT * FROM 'users' ${querystring}`, values, (e, r) => {
        if(e || !r){
            console.error(e)
            res.json({success: false})
            return
        }
        res.json(r)
    })
})

//search for all users whose names start with req.query.name
router.get('/search', (req, res) => {
    let name = req.query.name

    //yay, I suddenly started caring about cybersecurity again! Hooray for SQL parameters protecting against
    //injection attacks!
    db.all(`SELECT * FROM 'users' WHERE name LIKE ? || '%'`, [name], (e, r) => {
        if(e || !r){
            console.error(e)
            res.json({success: false})
            return
        }
        res.json(r)
    })
})

//change someone's quote -- use postman to test b/c req.body
router.post('/changequote', (req, res) => {
    //for post requests, data is stored in req.body
    //JS destructuring! :D XD
    let {name, quote} = req.body

    db.run(`UPDATE 'users' SET quote = ? WHERE name = ?`, [quote, name], (e) => {
        if(e){
            res.json({success: false})
            return
        }
        res.json({success: true})
    })
})

module.exports = router;
