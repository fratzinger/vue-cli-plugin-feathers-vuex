module.exports = [
  {
    name: `serverUrl`,
    type: 'input',
    message: 'What is the url of your feathers server instance?',
    default: "http://localhost:3030",
  },
  {
    name: `isAuth`,
    type: 'confirm',
    message: 'Setup authentication (highly recommened)?',
    default: true,
  },
  {
    when: answers => answers.isAuth == true,
    name: `authIdField`,
    type: 'input',
    message: 'What is the id-key of your auth service?',
    default: "id",
  },
  {
    when: answers => answers.isAuth == true,
    name: `authUserService`,
    type: 'input',
    message: 'What is the name of your users-service for authentication?',
    default: "users",
  }
];