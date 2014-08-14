// http://stackoverflow.com/questions/10470825/how-to-make-javascript-time-automatically-update
function updateTime(){
    /*var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";*/
    /*if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }*/

    //playTime.duration += (new Date() - playTime.startTime);
    playTime.duration += 1000;
    

    // milliseconds
    //var ms = playTime.duration;
    /*var x = ms / 1000;
    var seconds = parseInt(x % 60);
    x /= 60;
    var minutes = parseInt(x % 60);
    x /= 60;
    var hours = parseInt(x % 24);
    */
    // this won't pad the minutes and seconds :(
    //var durationStr = " " + minutes + ":" + seconds;
    var durationStr = moment.utc(playTime.duration).format("mm:ss");
    /* doesn't work because duration isn't a Date object and
       converting it back in to a Date object doesn't make sense
       
    var ms = new Date(playTime.duration);
    var options = {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    };
    var durationStr = ms.toLocaleTimeString("en-us", options);*/

    $('#textPlayTime').text(durationStr);
    
    //$("#labelTime" + team[i].name).innerHTML = t_str;
    var team = team1.team;
    for (var i = 0; i < team.length; i++) {
        if (team[i].currentlyPlaying) {
            team[i].totalPlayingTime += 1000;
            var durationStr = moment.utc(team[i].totalPlayingTime).format("mm:ss");
            // update the playing time
            $("#labelTime" + team[i].name)
                .text(durationStr);
        }
    }
}
// to kick it off- setInterval(updateTime, 1000);

// to cancel - window.clearInterval()
var updateTimeInterval;
function togglePlayingTime(event) {
    //console.log("updateTime");
    if (playTime.playing) {
        //playTime.duration += (new Date() - playTime.startTime);
        //playTime.playing = false;

        // milliseconds
        //var ms = playTime.duration;
        /*var x = ms / 1000;
        var seconds = parseInt(x % 60);
        x /= 60;
        var minutes = parseInt(x % 60);
        x /= 60;
        var hours = parseInt(x % 24);
        */
        // this won't pad the minutes and seconds :(
        //var durationStr = " " + minutes + ":" + seconds;
        //var durationStr = moment.utc(ms).format("mm:ss");
        /* doesn't work because duration isn't a Date object and
           converting it back in to a Date object doesn't make sense
           
        var ms = new Date(playTime.duration);
        var options = {
            hour: "2-digit", minute: "2-digit", second: "2-digit"
        };
        var durationStr = ms.toLocaleTimeString("en-us", options);*/

        //$('#textPlayTime').text(durationStr);
        playTime.playing = false;
        $('#buttonPlayTime').css( "background-color", "red" );
        clearInterval(updateTimeInterval);
    } else {
        playTime.startTime = new Date();
        playTime.playing = true;
        $('#buttonPlayTime').css( "background-color", "green" );
        updateTimeInterval = setInterval(updateTime, 1000);
    }
}

function updateCurrentlyPlayingPlayer(player) {
    "use strict";
    if (player.playing && !player.currentlyPlaying) {
        player.currentlyPlaying = true;
        /*if (playTime.playing) {
            player.intervalStartTime = new Date();
        }*/
        
    } else if (player.currentlyPlaying) {
        player.currentlyPlaying = false;
        /*if (playTime.playing) {
            var now = new Date();
            player.totalPlayingTime += (now - player.intervalStartTime);
        }*/
    }
}
function actionOff(event) {
    "use strict";
    console.log("actionOff: " + event.data.name);
    var playerArr = jQuery.grep(team1.team, function( n, i ) {
        return ( n.name === event.data.name );
    });
    
    if (playerArr.length === 0) {
      alert("Couldn't find player " + event.data.name );
    } else if (playerArr.length === 1) {
        updateCurrentlyPlayingPlayer(playerArr[0]);

    } else {
      alert("Found multiple (" + playerArr.length + ") players for " + event.data.name );
    }

    createAndUpdateUI();
}

function actionPlaying(event) {
    console.log("actionPlaying: " + event.data.name);

    // find and toggle the currentlyPlaying for the player
    playerArr = jQuery.grep(team1.team, function( n, i ) {
        return ( n.name === event.data.name );
    });
    
    if (playerArr.length === 0) {
      alert("Couldn't find player " + event.data.name );
    } else if (playerArr.length === 1) {
        if (event.target.checked) {
            playerArr[0].playing = true;
        } else {
            playerArr[0].playing = false;
            playerArr[0].currentlyPlaying = false;
        }
      
    } else {
      alert("Found multiple (" + playerArr.length + ") players for " + event.data.name );
    }

    createAndUpdateUI();
}

// TODO the "team" map can be removed
var team1 =
{
"team": [
    {
        "name": "Julia",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Tegan",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Emily",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Zahli",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Joven",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Irene",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Abbey",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    },
    {
        "name": "Isabella",
        "playing": false,
        "currentlyPlaying": false,
        "intervalStartTime": 0,
        "totalPlayingTime": 0
    }
        ]
};

// TODO startTime can be renamed to startDuration
var playTime = {
    "startTime": 0.0,
    "endTime" : 0.0,
    "duration" : 0.0,
    "playing": false
};

function sortTeam() {


  team1.team.sort(function(a, b)
  {
    if (a.playing > b.playing) {
      return true;
    } else if (b.playing > a.playing) {
     return false;
    } else if (a.currentlyPlaying > b.currentlyPlaying) {
      return true;
    } else if (b.currentlyPlaying > a.currentlyPlaying) {
     return false;
    } else if (a.totalPlayingTime > b.totalPlayingTime) {
      return true;
    } else if (b.totalPlayingTime > a.totalPlayingTime) {
     return false;
    }
  });

  console.log(team1);
}



function createAndUpdateUI() {
    "use strict";
    sortTeam();
    // need to update the subs
    $("[id^=buttonSub]").remove();
    var team = team1.team;
    for (var i = 0; i < team.length; i++) {
        // TODO grid layout http://api.jquerymobile.com/grid-layout/
        
        // first column is the "Playing?" button
        // check if already exists
        if ( $("#checkPlay" + team[i].name ).length ) {
            // it does exist so update
        } else {
            // is doesn't exist so create
            $('#buttonGrid')
                .append("<div id=\"ui-block-a" + team[i].name + "\" class=\"ui-block-a\">");
            $("#ui-block-a" + team[i].name)
                .append("<label id=\"labelPlaying" + team[i].name + "\">");
            $("#labelPlaying" + team[i].name)
                .append("<input type=\"checkbox\" data-mini=\"true\"  id=\"checkPlay" + team[i].name +
                 "\">")
                .append("<label for=\"checkPlay" + team[i].name + "\" id=\"labelTime" + team[i].name + "\">0:00</label>");
            $("#checkPlay"+ team[i].name)
                .click({ name:  team[i].name }, actionPlaying )
                .css("float", "left");
            $("#labelTime" + team[i].name)
                .css("float", "left");
        }

        // second column is the "Name" button
        // check if already exists
        if ( $("#buttonName" + team[i].name ).length ) {
            // it does exist so update
        } else {
            // is doesn't exist so create
            $('#buttonGrid')
                .append("<div id=\"ui-block-b" + team[i].name + "\" class=\"ui-block-b\">");
            $("#ui-block-b" + team[i].name)
                .append("<input type=\"button\" data-theme=\"a\" data-mini=\"true\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonName" +
                    team[i].name + "\" value=" + team[i].name + ">");
                //removed in an attempt to fit it all in .append("<p id=\"playingTime" + team[i].name + "\">0:00</p>");
            $("#playingTime" + team[i].name)
                .css("float", "left");
            $("#buttonName"+ team[i].name)
                .click({ name:  team[i].name }, actionOff )
                .css( "float", "left");
            
            
        }

        // update the name colours
        if (team[i].playing) {
            if (team[i].currentlyPlaying) {
                $("#buttonName"+ team[i].name)
                    .css( "background-color", "green" );
            } else {
                $("#buttonName"+ team[i].name)
                    .css( "background-color", "orange" );
            }
        } else {
            $("#buttonName"+ team[i].name)
                .css( "background-color", "grey" );
        }

        //var durationStr = moment.utc(team[i].totalPlayingTime).format("mm:ss");
        // update the playing time
        // TODO - doesn't currently work - totalPlayingTime quickly becomes a massive number
        //$("#labelTime" + team[i].name)
        //    .text(durationStr);

        $('#buttonGrid')
                .append("<div id=\"ui-block-c" + team[i].name + "\" class=\"ui-block-c\">")
                .append("<div id=\"ui-block-d" + team[i].name + "\" class=\"ui-block-d\">")
                .append("<div id=\"ui-block-e" + team[i].name + "\" class=\"ui-block-e\">");

        // third, forth and fifth columns are for subsitutes and so only exist when a player is currently on
        if (team[i].currentlyPlaying) {
            // add possible subsitutes
            for (var j = i, cnt = 0, added = 0; 
                  cnt < team.length && added < 3;
                  j = (j + 1)%team.length, cnt++) {
                if (team[j].playing && !team[j].currentlyPlaying) {
                    // can be added as a subsistute
                    added++;
                    // The only reason for the "if" statement is to add it to the correct column (/grid/block) e.g. ui-block-c
                    if (added === 1) {
                        $("#ui-block-c" + team[i].name)
                            //.append("<input type=\"button\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonSub\" value=" + team[j].name + ">");
                            .append("<input type=\"button\" data-mini=\"true\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonSub" +
                                added + team[i].name + "\" value=" + team[j].name + ">");
                        $("#buttonSub"+ added + team[i].name)
                            .click({ name:  team[i].name, sub: team[j].name }, actionSwitchPlayers );
                    } else if (added === 2) {
                        $("#ui-block-d" + team[i].name)
                            //.append("<input type=\"button\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonSub\" value=" + team[j].name + ">");
                            .append("<input type=\"button\" data-mini=\"true\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonSub" +
                                added + team[i].name + "\" value=" + team[j].name + ">");
                        $("#buttonSub"+ added + team[i].name)
                            .click({ name:  team[i].name, sub: team[j].name }, actionSwitchPlayers );
                    } else if (added === 3) {
                        $("#ui-block-e" + team[i].name)
                            //.append("<input type=\"button\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonSub\" value=" + team[j].name + ">");
                            .append("<input type=\"button\" data-mini=\"true\" class=\"ui-btn ui-corner-all ui-shadow\" id=\"buttonSub" +
                                added + team[i].name + "\" value=" + team[j].name + ">");
                        $("#buttonSub"+ added + team[i].name)
                            .click({ name:  team[i].name, sub: team[j].name }, actionSwitchPlayers );
                    } else {
                        alert("Too many subsitutes added: " + added);
                    }
                }
            }
        }
    } 
}

function actionSwitchPlayers (event) {
    console.log("actionSwitchPlayers: player: " + event.data.name + ", sub: " + event.data.sub);
    // get 
    $("#buttonName"+ event.data.name)
        .css( "background-color", "orange" );
    $("#buttonName"+ event.data.sub)
        .css( "background-color", "green" );
    
    // find and set the currentlyPlaying to true for the sub
    subArr = jQuery.grep(team1.team, function( n, i ) {
        return ( n.name === event.data.sub );
    });
    if (subArr.length === 0) {
      alert("Couldn't find sub " + event.data.sub );
    } else if (subArr.length === 1) {
      //subArr[0].currentlyPlaying = true;
      updateCurrentlyPlayingPlayer(subArr[0]);
    } else {
      alert("Found multiple (" + subArr.length + ") subs for " + event.data.sub );
    }

    // find and set the currentlyPlaying to false for the player
    playerArr = jQuery.grep(team1.team, function( n, i ) {
        return ( n.name === event.data.name );
    });
    if (playerArr.length === 0) {
      alert("Couldn't find player " + event.data.name );
    } else if (playerArr.length === 1) {
      //playerArr[0].currentlyPlaying = false;
      updateCurrentlyPlayingPlayer(playerArr[0]);
    } else {
      alert("Found multiple (" + playerArr.length + ") players for " + event.data.name );
    }

    createAndUpdateUI();
}
/*function actionOff() {
    console.log("actionOff: " + this.id);
}*/
// TODO
// 1. jshint
// 2. mocha
// 3. heroku npm setup
// 4. grunt for mocha and jshint
// 5. update Readme
// 6. code coverage
// 7. make sure only 5 are playing at a time
// 8. store the times and subsitutions back to mongodb/postgres
// 9. allow somewhere to update the team names