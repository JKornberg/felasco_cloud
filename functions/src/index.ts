import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
// //  functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// When athlete name is updated, update their name in all rosters
export const onUserUpdate =
functions.firestore.document("users/{user}/athletes/{athlete}").onUpdate(
    async (change) => {
      const after = change.after.data();
      const before = change.before.data();
      const bid = change.before.id;
      console.log(`BID: ${bid}`);

      const userId = change.before.ref.parent.parent?.id;
      if (after.firstName != before.firstName ||
        after.lastName != before.lastName ||
        after.alias != before.alias) {
        const snapshot =
      await db.collection(
          `users/${userId}/rosters`).where(
          "athletes.l0KIsU3KTY6lHAS8o6Kx.firstName", ">=", "").get();
        console.log(`athletes.${bid}`);
        const updatePromises : Array<Promise<any>> = [];
        snapshot.forEach((doc) => {
          console.log(doc.id);
          updatePromises.push(db.collection(`users/${userId}/rosters`)
              .doc(doc.id).update(`athletes.${bid}`,
                  {"firstName": after.firstName,
                    "lastName": after.lastName,
                    "alias": after.alias})
          );
        });

        await Promise.all(updatePromises);
      }
    });
