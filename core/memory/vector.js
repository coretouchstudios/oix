

const {Pool}=require("pg")

const pool=new Pool({
 connectionString:process.env.DATABASE_URL
})

async function store(text,vector){

 await pool.query(
  "insert into memory(text,embedding) values($1,$2)",
  [text,vector]
 )

}

module.exports={store}

