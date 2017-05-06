// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

// if (!window.indexedDB) {
//    window.alert("Your browser doesn't support a stable version of IndexedDB.")
// }

// function testDatabase() {
//     var db;
//     var request = indexedDB.open("MyTestDatabase");
//     request.onerror = function (event) {
//         alert("Why didn't you allow my web app to use IndexedDB?!");
//     };
//     request.onsuccess = function (event) {
//         db = event.target.result;
//     };
// }

// function createLargestJkpgLan(geojson) {
//     const dbName = "largestJkpgLan";
//     var request = indexedDB.open(dbName, 1);
//     request.onerror = function (event) {
//         console.log("there was an error with indexDb");

//     };

//     var objstore = db.transaction([largestJkpgLan], "readwrite").objectStore(largestJkpgLan);
//     for (i = 0; i < geojson.length; i++) {
//         objstore.put(geojson[i]);
//     }

//     var transaction = db.transaction(["customers"], "readwrite");

//     var objectStore = transaction.objectStore("customers");
//     for (var i in customerData) {
//         var request = objectStore.add(customerData[i]);
//         request.onsuccess = function (event) {
//             // event.target.result == customerData[i].ssn;
//         };
//     }
// }

const DB_NAME = 'largest1000Trees';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'trees';

var db;


function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Better use "this" than "req" to get the result to avoid problems with
        // garbage collection.
        // db = req.result;
        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'Id', autoIncrement: false });

        // store.createIndex('Stamomkret', 'Stamomkret', { unique: false });
        // store.createIndex('Tradslag', 'Tradslag', { unique: false });
        // store.createIndex('Kommun', 'Kommun', { unique: false });
    };
}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(db_name, store_name, mode) {
    var tx = db.transaction(db_name, mode);
    return tx.objectStore(store_name);
}

function addTrees(geojson) {
    console.log("adding trees", geojson);

    var store = getObjectStore(DB_NAME, DB_STORE_NAME, 'readwrite');
    for (var i = 0; i < geojson.length; i++) {
        store.put(geojson[i]);
    } 
}

// function clearObjectStore(store_name) {
//     var store = getObjectStore(DB_STORE_NAME, 'readwrite');
//     var req = store.clear();
//     req.onsuccess = function (evt) {
//         displayActionSuccess("Store cleared");
//         displayPubList(store);
//     };
//     req.onerror = function (evt) {
//         console.error("clearObjectStore:", evt.target.errorCode);
//         displayActionFailure(this.error);
//     };
// }

// function getBlob(key, store, success_callback) {
//     var req = store.get(key);
//     req.onsuccess = function (evt) {
//         var value = evt.target.result;
//         if (value)
//             success_callback(value.blob);
//     };
// }

// function addTrees(geojson) {
//     console.log("adding trees", geojson);

//     var store = getObjectStore(DB_STORE_NAME, 'readwrite');
//     for (i = 0; i < geojson.length; i++) {
//         store.put(geojson[i]);
//     }    
//     // var req;
//     // try {
//     //   req = store.add(obj);
//     // } catch (e) {
//     //   if (e.name == 'DataCloneError')
//     //     displayActionFailure("This engine doesn't know how to clone a Blob, " +
//     //                          "use Firefox");
//     //   throw e;
//     // }
//     // req.onsuccess = function (evt) {
//     //   console.log("Insertion in DB successful");
//     //   displayActionSuccess();
//     //   displayPubList(store);
//     // };
//     // req.onerror = function() {
//     //   console.error("addPublication error", this.error);
//     //   displayActionFailure(this.error);
//     // };
//   }

//     const dbName = "largestJkpgLan";
//     var request = indexedDB.open(dbName, 1);
//     request.onerror = function (event) {
//         console.log("there was an error with indexDb");

//     };

//     var objstore = db.transaction([largestJkpgLan], "readwrite").objectStore(largestJkpgLan);
//     for (i = 0; i < geojson.length; i++) {
//         objstore.put(geojson[i]);
//     }

//     var transaction = db.transaction(["customers"], "readwrite");

//     var objectStore = transaction.objectStore("customers");
//     for (var i in customerData) {
//         var request = objectStore.add(customerData[i]);
//         request.onsuccess = function (event) {
//             // event.target.result == customerData[i].ssn;
//         };
//     }


// function CopycreateLargestJkpgLan() {
//     const dbName = "LargestJkpgLan";

//     var request = indexedDB.open(dbName, 2);

//     request.onerror = function (event) {
//         console.log("there was an error with indexDb");

//     };
//     request.onupgradeneeded = function (event) {
//         var db = event.target.result;

//         // Create an objectStore to hold information about our customers. We're
//         // going to use "ssn" as our key path because it's guaranteed to be
//         // unique - or at least that's what I was told during the kickoff meeting.
//         var objectStore = db.createObjectStore("trees", { keyPath: "Id" });

//         // Create an index to search customers by name. We may have duplicates
//         // so we can't use a unique index.
//         objectStore.createIndex("name", "name", { unique: false });

//         // Create an index to search customers by email. We want to ensure that
//         // no two customers have the same email, so use a unique index.
//         objectStore.createIndex("email", "email", { unique: true });

//         // Use transaction oncomplete to make sure the objectStore creation is 
//         // finished before adding data into it.
//         objectStore.transaction.oncomplete = function (event) {
//             // Store values in the newly created objectStore.
//             var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
//             for (var i in customerData) {
//                 customerObjectStore.add(customerData[i]);
//             }
//         };
//     };
// }

// // This is what our customer data looks like.
// const customerData = [
//     { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//     { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
// ];

// function createNameDb() {
//     const dbName = "the_name";

//     var request = indexedDB.open(dbName, 2);

//     request.onerror = function (event) {
//         // Handle errors.
//     };
//     request.onupgradeneeded = function (event) {
//         var db = event.target.result;

//         // Create an objectStore to hold information about our customers. We're
//         // going to use "ssn" as our key path because it's guaranteed to be
//         // unique - or at least that's what I was told during the kickoff meeting.
//         var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

//         // Create an index to search customers by name. We may have duplicates
//         // so we can't use a unique index.
//         objectStore.createIndex("name", "name", { unique: false });

//         // Create an index to search customers by email. We want to ensure that
//         // no two customers have the same email, so use a unique index.
//         objectStore.createIndex("email", "email", { unique: true });

//         // Use transaction oncomplete to make sure the objectStore creation is 
//         // finished before adding data into it.
//         objectStore.transaction.oncomplete = function (event) {
//             // Store values in the newly created objectStore.
//             var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
//             for (var i in customerData) {
//                 customerObjectStore.add(customerData[i]);
//             }
//         };
//     };
// }

export { openDb, addTrees };