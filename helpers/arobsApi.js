import _ from 'lodash';

export const mapArobsUserData = arobsUserData => {
  let userData = _.pick(arobsUserData, [
    'Image',
    'EmployeePosition',
    'Department',
    'SkypeAddress',
    'Telephone',
    'LocationId',
    'LocationName',
    'SubsidiaryName',
    'SubsidiaryId',
    'EmployeeID',
    'FirstName',
    'LastName',
    'Email',
    'DepartmentID'
  ]);
  userData = _.mapKeys(userData, (value, key) => _.lowerFirst(key));
  const { firstName, lastName, ...restUserData } = userData;
  return {
    name: {
      first: firstName,
      last: lastName
    },
    ...restUserData
  };
};
