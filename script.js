const button = document.querySelector("button");

button.addEventListener("click", () => {
  //allow from user's browser to send notification
  Notification.requestPermission().then((perm) => {
    //if browser allowed us  for notification
    if (perm === "granted") {
      const notification = new Notification("title of notification", {
        body: "this is body for Notification",
        data: { key: "value" },
        icon: "./logo-alert.png",
        //"tag" property not allowed that resend notification everytime after click on own button just send one time for this unic id and over-right message for alert
        tag: "unic id",
      });

      //if we have error for send data of notifactions
      notification.addEventListener("close", (error) => {
        alert(error);
      });
    }
  });
});

//if Tab page of user closed

let notification;
let interval;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Come back", {
        body: `you have leave us for ${Math.round(
          (new Date() - leaveDate) / 1000
        )} seconds`,
        tag: "Come Back",
      });
    }, 100);
  } else {
    if (interval) clearInterval(interval);
    //if user come back to page then close notification
    if (notification) notification.close();
  }
});
