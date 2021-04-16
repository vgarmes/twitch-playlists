async function getVideoInfo(videoID) {
  const options = {
    width: 100,
    height: 100,
    video: videoID,
  };

  const parentDIV = document.getElementById("root");
  const hiddenDIV = document.createElement("div");
  hiddenDIV.setAttribute("id", "hidden-video");
  parentDIV.appendChild(hiddenDIV);

  const player = await new window.Twitch.Player("hidden-video", options);
  player.addEventListener(window.Twitch.Player.PAUSE, function () {
    console.log("paused");
  });

  const iframe = hiddenDIV.firstChild;

  console.log(player);

  /*const userData = iframe.contentWindow.document.querySelector(
    'a[data-test-selector="stream-info-card-component__title-link"]'
  );

  console.log(userData);

  const titleData = document.querySelectorAll(
    'p[data-test-selector="stream-info-card-component__subtitle"]'
  )[0];

  const user = userData ? userData.innerText : "";
  const title = titleData ? titleData.innerText : "";

  return { user, title };*/
}

export default getVideoInfo;
