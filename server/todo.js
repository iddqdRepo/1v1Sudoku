/*
! Created rooms and users in those rooms stored in users.js object array, this is where the rooms, users are controlled
    * If room is empty, it is removed from the list
    * If a user leaves a room whilst in game, the room is removed from the list
    * If a room is full, it won't allow any more users to enter the room
    


* Homepage
    User can choose easy, medium or hard from a radio button
        >When selected it passes the value through usehistory props to the createGame board and the correct sudoku board is fetched

* User creates a room
    // Routed to URL with code at the end
    // Waiting screen with room code (while < 2 users in the room)


    // Sends data to users array on server and joins socket.io room
    If user closes tab with 1 user in the room, room is deleted
    Allow user to select difficulty with radio button


    // When second player joins, start game button appears
    //     >When start button is pressed
    //         >Sends board data to socket
    //             >Emits board data to player 2
    //         >Joins both players into a sucoku room with the same board

    

* User Joins a room 
    Check if URL is a valid room in users.js
        Routed to URL with room code at the end (room code user entered)

    // Join waiting screen with loading icon (Setting up your game)
        
    If host closes tab, it informs them the game is closed with a button to go back to home screen

 * Sudoku board
    Add hards
    UI  


   

!BUGS
    // Host creates game, hits back button to go back to home screen > on create a new game again, just infinite loading - when room is joined only 1 person in it
        socket.disconnect caused this
    !if you click joinRoom and get an error joining room, click join button again it joins the room even though it is full
    !Create game screen page refresh crashes app
    !If players are in sudoku game on server restart Error: listen EADDRINUSE: address already in use :::5000
        ?Because players are in the suoku game and it's looking for the players/rooms, but server restarted so they no longer exist?
    !Creategame refresh 
        */
