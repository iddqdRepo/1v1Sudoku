/*
! Created rooms and users in those rooms stored in users.js object array, this is where the rooms, users are controlled
    * If room is empty, it is removed from the list
    * If a user leaves a room whilst in game, the room is removed from the list
    * If a room is full, it won't allow any more users to enter the room

* User creates a room
    // Routed to URL with code at the end
    Waiting screen with room code (while < 2 users in the room)

    Sends data to users array on server and joins socket.io room
    If user closes tab with 1 user in the room, room is deleted
    

* User Joins a room 
    Check if URL is a valid room in users.js
        Routed to URL with room code at the end (room code user entered)

    Join waiting screen with loading icon (Setting up your game)
        Check if there are
        


! The emit from the server to the client (current user, all users etc) isnt working
! There is no way to track which user the person playing is, or which room they're in, right?


*/
