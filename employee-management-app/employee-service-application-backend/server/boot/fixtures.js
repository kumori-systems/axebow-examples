

const fixturesData = require('../fixtures-data');
console.log('enter fixtures');

module.exports = function (app) {


    app.models.User.findOrCreate({email:"admin@gmail.com", password: "admin1234"}, function(err, userCreated) {
        if (err) {
        }

        if (userCreated) {
            console.log('[BOOT::FIXTURES]: findOrCreate user with id', userCreated.id);
        }
    })

    app.models.Department.count(function (err, countDepartments) {
        console.log('[BOOT::FIXTURES]: count departments', countDepartments);
        if (countDepartments === 0) {
            fixturesData.DEPARTMENT_FIXTURES.forEach((department)=> {
                    app.models.Department.findOrCreate(department, function(err, departmentCreated) {
                        if (departmentCreated) {
                            console.log('[BOOT::FIXTURES]: findOrCreate department with name', departmentCreated.name, 'and id', departmentCreated.id);
                        }
                    })
            })
        }
    });

    app.models.Employee.count(function (err, countEmployees) {
        console.log('[BOOT::FIXTURES]: count employees', countEmployees);
        if (countEmployees === 0) {
            app.models.Department.find({where: {name: 'Desarrollo'}}, function (err, foundDepartment) {
                try {
                    console.log('Found desarrollo', foundDepartment[0].id)
                    createEmployees(foundDepartment[0].id)
  
                }
                catch(err) {
                    if (foundDepartment[0] === undefined) {
                        app.models.Department.findOrCreate({name: 'Desarrollo'}, function(err, createdDepartment) {
                            console.log('Create or found desarrollo', createdDepartment)
                            createEmployees(createdDepartment.id)
                        })
                    }
                }
            })
        }
    });


    const createEmployees = function(departmentId){
        if (departmentId) {

            fixturesData.EMPLOYEE_FIXTURES.forEach((employee)=> {
                employeeToCreate = Object.assign(employee, {departmentId: departmentId ? departmentId : ''})
                    app.models.Employee.findOrCreate(employeeToCreate, function(err, employeeCreated) {
                        if (employeeCreated) {
                            console.log('[BOOT::FIXTURES]: findOrCreate employee with name', employeeCreated.name, 'and departamentId', departmentId);
                        }
                    })
            })
        
        }

    }
}

