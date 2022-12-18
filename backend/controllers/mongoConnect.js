const { MongoClient, ServerApiVersion } = require("mongodb");
const DB_URI_ATLAS =
	"mongodb+srv://eaizmig:ji78ji78!@cluster0.iak1xpi.mongodb.net/?retryWrites=true&w=majority";
const uri = DB_URI_ATLAS;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
module.exports = client;
