// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // videoJs Default Styles
import "videojs-contrib-quality-levels"; // videoJs Quality levels **
import "videojs-hls-quality-selector"; // videojs Quality 
//import _ from "videojs-contrib-quality-levels";
//import qualitySelector from "videojs-hls-quality-selector";

function VideoJS(props) {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
//  const [player, setPlayer] = React.useState(undefined);
  const { options, onReady } = props;

  React.useEffect(() => {
    videojs.Vhs.xhr.beforeRequest = function (options) {
      options.uri = `${options.uri}?token=${
        videojs.getAllPlayers()[0].options().token
      }`;
      return options;
    };

    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      // ini video js
      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        console.log("video Element", videoElement);
        onReady && onReady(player);
      }));
	    player.qualityLevels();
      player.hlsQualitySelector({
        displayCurrentQuality: true
      });
    } else {
      const player = playerRef.current;
    }
  }, [options]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video
        id="videojs"
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
}

export default VideoJS;
