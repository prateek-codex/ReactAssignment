

let LeaderBoard = {};

// SNo, Name, WinCount
LeaderBoard.Data = [];

LeaderBoard.GetLeaderBoard = function() {
    return LeaderBoard.Data;
}

LeaderBoard.UpdateLeaderBoard = function(name) {
    let position = -1, i;
    name = name ? name : 'Anonymous';
    for(i=0; i<LeaderBoard.Data.length; i++) {
        if(LeaderBoard.Data[i].Name.toLowerCase() === name.toLowerCase()) {
            position = i;
            break;
        }
    }

    if(position > -1){
        LeaderBoard.Data[i].WinCount++;
    }
    else
    {
        LeaderBoard.Data.push({SNo: (LeaderBoard.Data.length + 1), Name: name, WinCount:1});
    }
}

module.exports = LeaderBoard;
