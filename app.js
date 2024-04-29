const express = require("express");
// const mysql = require("mysql ");
const app = express();
const port = 9000;

const axios = require("axios");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://passioncampagne-53a03-default-rtdb.firebaseio.com",
});

app.use(express.json());
app.get(
  "/",
  (req, res, next) => {
    axios
      .get(
        "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=getAllcategory"
      )
      .then((response) => {
        console.log(response.data);
        // Send product data to Firebase
        admin
          .database()
          .ref("getCategories")
          .set(response.data)
          .then(() => {
            console.log("Bien envoyé! Categories");
            next();
          })
          .catch((error) => {
            console.log("Erreur lors de l'envoi: " + error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
   
  },
  function (req, res,next) {
    axios
      .get(
        "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=produit"
      )
      .then((response) => {
        console.log(response.data);
        // Send product data to Firebase
        admin
          .database()
          .ref("getAllproductsBrut")
          .set(response.data)
          .then(() => {
            console.log("Bien envoyé! Produit");
            next();
          })
          .catch((error) => {
            console.log("Erreur lors de l'envoi: " + error);
          });

      })
      .catch((error) => {
        console.log(error);
      });
   
  },
  function (req, res,next) {
    axios
      .get(
        "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=getAllProductPromo"
      )
      .then((response) => {
        console.log(response.data);
        // Send product data to Firebase
        admin
          .database()
          .ref("getAllProductPromo")
          .set(response.data)
          .then(() => {
            console.log("Bien envoyé! Promo");
            next();
          })
          .catch((error) => {
            console.log("Erreur lors de l'envoi: " + error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  function (req, res, next) {
    axios
      .get(
        "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=getLatestProducts"
      )
      .then((response) => {
        console.log(response.data);
        // Send product data to Firebase
        admin
          .database()
          .ref("products")
          .set(response.data)
          .then(() => {
            console.log("Bien envoyé! Dernier produit");
            next();
          })
          .catch((error) => {
            console.log("Erreur lors de l'envoi: " + error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  function (req, res,next) {
    axios
      .get(
        "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=getProductDeclinaison"
      )
      .then((response) => {
        console.log(response.data);
        // Send product data to Firebase
        admin
          .database()
          .ref("productDeclinaisons")
          .set(response.data)
          .then(() => {
            console.log("Bien envoyé! declinaison");
            next();
          })
          .catch((error) => {
            console.log("Erreur lors de l'envoi: " + error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  function (req, res,next) {
    axios
      .get(
        "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=getProductDeclinaison"
      )
      .then((response) => {
        console.log(response.data);
        // Send product data to Firebase
        admin
          .database()
          .ref("reelProductDeclinaisons")
          .set(response.data)
          .then(() => {
            console.log("Bien envoyé! declinaison 2");
            next();
          })
          .catch((error) => {
            console.log("Erreur lors de l'envoi: " + error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

// app.use("/", (req, res) => {
//   axios
//     .get(
//       "https://www.passion-campagne2.projets-omega.net/mobile_data/root_url.php?type=getProductDeclinaison"
//     )
//     .then((response) => {
//       console.log(response.data);
//       // Send product data to Firebase
//       admin
//         .database()
//         .ref("productDeclinaisons")
//         .set(response.data)
//         .then(() => {
//           console.log("Bien envoyé!");
//         })
//         .catch((error) => {
//           console.log("Erreur lors de l'envoi: " + error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.listen(port, () => {
  console.log(` Back end connecté sur le port: ${port}`);
});
