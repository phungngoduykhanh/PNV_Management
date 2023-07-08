import { ref,onValue,query,orderByChild,equalTo  } from "firebase/database";
import { database } from "./config";
export const getChannels = (channelId) => {
    return new Promise((resolve, reject) => {
        let userDataArray = [];

        const channelsRef = ref(database, `channels/${channelId}`);

        onValue(channelsRef, (snapshot) => {
            const channelData = snapshot.val();
            if (channelData.mode === "public") {
                const chatroomId = channelData.chatroom_id;
                if (chatroomId) {
                    const enrollmentRef = ref(database, 'enrollments');
                    const enrollmentQuery = query(
                        enrollmentRef,
                        orderByChild('chatroom_id'),
                        equalTo(parseInt(chatroomId))
                    );

                    const enrollmentPromise = new Promise((resolve, reject) => {
                        onValue(enrollmentQuery, (enrollmentSnapshot) => {
                            const enrollmentData = enrollmentSnapshot.val();

                            if (enrollmentData) {
                                Object.keys(enrollmentData).forEach((enrollmentId) => {
                                    const enrollment = enrollmentData[enrollmentId];
                                    if (enrollment.status === "confirmed") {
                                        const userId = enrollment.user_id;

                                        const usersRef = ref(database, `users/${userId}`);

                                        onValue(usersRef, (userSnapshot) => {
                                            const userData = userSnapshot.val();
                                            userDataArray.push(userData);
                                        });
                                    }
                                });
                                resolve();
                            } else {
                                reject("No enrollment data found");
                            }
                        });
                    });

                    const chatroomRef = ref(database, 'chatrooms');
                    const chatroomQuery = query(
                        chatroomRef,
                        orderByChild('id'),
                        equalTo(parseInt(chatroomId))
                    );

                    const chatroomPromise = new Promise((resolve, reject) => {
                        onValue(chatroomQuery, (chatroomSnapshot) => {
                            const chatroomtData = chatroomSnapshot.val();
                            if (chatroomtData) {
                                Object.keys(chatroomtData).forEach((chatroomtID) => {
                                    const chatroom = chatroomtData[chatroomtID];
                                    const ownerID = chatroom.user_id;

                                    const ownerRef = ref(database, `users/${ownerID}`);
                                    onValue(ownerRef, (ownerSnapshot) => {
                                        const ownerData = ownerSnapshot.val();
                                        userDataArray.push(ownerData);
                                    });
                                });
                                resolve();
                            } else {
                                reject("No chatroom data found");
                            }
                        });
                    });

                    Promise.all([enrollmentPromise, chatroomPromise])
                        .then(() => {
                            resolve(userDataArray);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    reject("No chatroom ID found");
                }
            } else {
                reject("Invalid channel mode");
            }
        });
    });
};

