const mongoose = require("mongoose")
const Settings = require("../Helper's/Settings.json")
mongoose.connect(Settings.DatabaseCenter, {
useNewUrlParser: true,});
mongoose.connection.on("connected", () => {
console.log("Database Center'a Bağlanıldı.")})
mongoose.connection.on("eror", () => {
console.log("Database Center'a Bağlanılamadı.")})