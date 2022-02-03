CREATE TASK:
route: '/api/tasks';
type request: req.body;
params: 
    - name (
        notEmpty, there shouldn't be a task with that name.
    )
    - done (
        boolean.
    )
#########################################################################
GET TASKS:
route: '/api/tasks';
type request: req.query;
params: 
    - filterBy (
        'all' or 'done' or 'undone'.
    );
    - order (
        'asc' or 'desc'.
    );
    - pp (
        number of tasks into response, from 5 to 20.
    );
    - page (
        pagination page number.
    )
##########################################################################
DELETE TASK:
route: '/api/tasks';
type request: req.query;
params: 
    - uuid;
##########################################################################
PATCH TASK:
route: '/api/tasks';
type request: req.body;
params: 
    - uuid;
    - done (
        boolean, optional.
    );
    -name (
        notEmpty, there shouldn't be a task with that name, optional.
    )

