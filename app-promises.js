const users = [{
  id: 1,
  name: 'Sofiane',
  schoolId: 101
}, {
  id: 2,
  name: 'Jessica',
  schoolId: 999
}, {
  id: 3,
  name: 'Jessica',
  schoolId: 200
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
},{
  id: 2,
  schoolId: 999,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if(user){
      resolve(user);
    } else {
      reject('User not found');
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  var user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;
    if(grades.length > 0){
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class.`;
  }).catch((e) => e);
};

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if(grades.length > 0){
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1).then((data) => {
  console.log(data);
}, (e) => {
  console.log(e);
});

// getUser(1).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });

// getGrades(101).then((grades) => {
//   console.log(grades);
// }).catch((e) => console(e));

// getStatus(4).then((data) => {
//   console.log(data);
// }).catch((e) => console.log(e));