db = db.getSiblingDB('tutorials');

db.createUser({
    user: 'mongo_admin_tutorials',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'tutorials',
        },
    ],
});
