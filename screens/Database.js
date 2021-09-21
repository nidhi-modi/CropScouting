import SQLite from "react-native-sqlite-storage";


SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "T&GScoutingDatabase.db";
const database_version = "2.0";
const database_displayname = "Scouting Offline Database";
const database_size = 20000000;


export default class Database {


    initDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql('SELECT * FROM CropScouting LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            }).catch((error) => {
                                console.log("Received error: ", error);
                                console.log("Database not yet ready ... populating data");
                                db.transaction((tx) => {
                                    tx.executeSql('DROP TABLE IF EXISTS CropScouting', []);
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS CropScouting (scoutID INTEGER PRIMARY KEY AUTOINCREMENT, weekNumber VARCHAR(30), scouterName VARCHAR(30), siteName VARCHAR(10), location VARCHAR(20), scoutType VARCHAR(50), rowNumber VARCHAR(10), header1 VARCHAR(30), header2 VARCHAR(30), header3 VARCHAR(30), header4 VARCHAR(30), miniBay VARCHAR(10), text1 VARCHAR(5), text2 VARCHAR(5), text3 VARCHAR(5), text4 VARCHAR(5))');
                                }).then(() => {
                                    console.log("Scouting Table created successfully");
                                }).catch(error => {
                                    console.log(error);
                                });
                            });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        }).catch(error => {
            console.log("echoTest failed - plugin not functional");
        });
    };


   

    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };



     //Add a function to get the list of data.
     listScoutData() {
        return new Promise((resolve) => {
            const scoutDetails = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT p.scoutID, p.weekNumber, p.scouterName, p.siteName, p.location, p.scoutType, p.rowNumber, p.header1, p.header2, p.header3, p.header4, p.miniBay, p.text1, p.text2, p.text3, p.text4 FROM CropScouting p', []).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.log(`Scout ID: ${row.scoutID}, Week Numbers: ${row.weekNumber}, Scouter Name: ${row.scouterName}, Scout Type: ${row.scoutType}`)
                            const { scoutID, weekNumber, scouterName, siteName, location, scoutType, rowNumber, header1, header2, header3, header4, miniBay, text1, text2, text3, text4 } = row;
                            scoutDetails.push({
                                scoutID,
                                weekNumber,
                                scouterName,
                                siteName,
                                location,
                                scoutType,
                                rowNumber,
                                header1,
                                header2,
                                header3,
                                header4,
                                miniBay,
                                text1,
                                text2,
                                text3,
                                text4
                            });
                        }
                        console.log(scoutDetails);
                        resolve(scoutDetails);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }



    addScoutingDetails(pts) {
        try {
            return new Promise((resolve) => {
                this.initDB().then((db) => {
                    db.transaction((tx) => {
                        tx.executeSql('INSERT INTO CropScouting VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [pts.scoutID, pts.weekNumber, pts.scouterName, pts.siteName, pts.location, pts.scoutType, pts.rowNumber, pts.header1, pts.header2, pts.header3, pts.header4, pts.miniBay, pts.text1, pts.text2, pts.text3, pts.text4]).then(([tx, results]) => {
                            resolve(results);
                            console.log('Details Added Successfully: ', results);
                        });
                    }).then((result_1) => {
                        console.log('Details Added Successfully: ', result_1);
                        this.closeDatabase(db);
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        catch (err_1) {
            console.log(err_1);
        }
    }


    //delete all data
    deleteAllData() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {

                    tx.executeSql('DELETE FROM CropScouting').then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }


}