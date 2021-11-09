const users = [];

export const addUser = ({ userId, username, room }) => {
  const numUsersInRoom = users.filter((user) => user.room === room).length;
  if (numUsersInRoom === 2) {
    return { error: "Room Full" }; //if the room is full return the error
  }

  const newUser = { userId, username, room };
  users.push(newUser);

  //This returns an object because then when I call "const { error, newUser} = addUser("
  //It will just return error as undefined and newUser as the input and carry on if there is no error
  //otherwise it will return an error object, which will be picked up with if(error) return callback(error)
  //This could also be done with a boolean? or checking if the newUser is set to error with
  // if (numUsersInRoom === 2) {
  //   return { room: "Room Full" }}
  //and just checking if room === "error", right?

  return { newUser };
};

export const removeUser = (userId) => {
  const removeIndex = users.findIndex((user) => user.userId === userId);

  if (removeIndex !== -1) {
    return users.splice(removeIndex, 1)[0];
  }
};

export const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// export const validRoom = (room) =>{
//   users.filter
// }

export const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

export const getDataInUserList = () => {
  return [...users];
};

// module.exports = { addUser, removeUser, getUser, getUsersInRoom };
