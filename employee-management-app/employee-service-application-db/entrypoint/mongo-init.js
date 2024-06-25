db.auth('admin', 'admin1234')

db = db.getSiblingDB('employee-and-department')

db.createUser({
  user: 'db-user',
  pwd: '12341234',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});

db.createCollection('Employee');