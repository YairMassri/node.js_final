module.exports = function(app, todos, fs, conn, crypto)
{
    //
    // list the todos
    //
    app.get('/', function(req, res){
        if(req.session.username) {
            // get the count of non-empty elements  
            var count = todos.filter(function(value) {return value !== undefined}).length;

            // render the page
            res.render('index', {title:"Todos", todos: todos, count:count, username: req.session.username});
        }
        else res.redirect('/login');
    });

    //
    // add a new todo
    //
    app.get('/add', function(req, res){
        if(req.session.username) {
            res.render('add', {title:"Add todo", username: req.session.username});
        }
        else res.redirect('/login');
    });

    app.get('/add-submit', function(req, res){
        // save todo to the array
        todos.push(req.query.name);

        // save todo to the database
        conn.query("INSERT INTO todos (name) VALUES ('"+req.query.name+"')");

        // redirect to home
        res.redirect('/');
    });

    // 
    // update a todo
    //
    app.get('/update', function(req, res){
        if(req.session.username) {
            res.render('update', {title:"Update todo", username: req.session.username});
        }
        else res.redirect('/login');
    });

    app.get('/update-submit', function(req, res){
        // update todo array
        todos.splice(req.query.pos, 1, req.query.name);

        // update todo from the database
        conn.query("UPDATE todos SET name='"+req.query.name+"' WHERE id='"+req.query.pos+"'");

        // redirect to home
        res.redirect('/');
    });

    //
    // delete a todo
    //
    app.get('/del', function(req, res){
        if(req.session.username) {
            res.render('delete', {title:"Delete todo", username: req.session.username});
        }
        else res.redirect('/login');
    });

    app.get('/del-submit', function(req, res){
        // delete from array
        todos.splice(req.query.pos, 1);

        // delete todo from the database
        conn.query("DELETE FROM todos WHERE id='"+req.query.pos+"'");

        // redirect to home
        res.redirect('/');
    });

    //
    // login and logout a user
    //
    app.get('/login', function(req, res){
        res.render('login', {title: "Login", hideLogin: true, error:req.query.error});
    });

    app.get('/login-submit', function(req, res){
        // test if user/pass exist in the database
        var passhash = crypto.createHash('md5').update(req.query.pass).digest('hex');
        var sql = "SELECT * FROM users WHERE username='"+req.query.user+"' AND password='"+passhash+"'";
        conn.query(sql, function(err, rows){
            // if exist, create session and redirect to home
            if(rows.length > 0) {
                req.session.username = req.query.user;
                res.redirect('/');
            // if do not exist, redict to login page
            } else {
                res.redirect('/login?error=true');
            }
        });
    });

    app.get('/logout-submit', function(req, res){
        req.session.username = false;
        res.send('You ended your session correctly');
    });

    //
    // ajax calls
    //
    app.get('/get-todos', function(req, res){
        res.json({todos: todos});
    });
}